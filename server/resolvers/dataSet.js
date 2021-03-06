import moment from 'moment';

export const dataSet = {
  Query: {
    dataSetCountryList: async (_, { projectId }, { db }) =>
      projectId
        ? await db('geo_country_stats as g')
            .select({
              id: 'g.id',
              name: 'l.name',
              ticketsTotal: 'g.trend_count_tickets',
              segmentsTotal: 'g.trend_count_segments',
              farePaidTotal: 'g.stat_sum_farepaid',
              importedTicketsTotal: 'g.trend_count_imported',
              errorTicketsTotal: 'g.trend_count_error',
              errorRatioTotal: 'g.stat_ratio_error',
              numberDatasets: db.raw(
                `(SELECT COUNT(*) from geo_country_stats_activity where geo_country_stats_id = g.id and project_id = ${projectId} and isdeleted = FALSE)`
              ),
              annMonths: 'g.ann_months'
            })
            .leftJoin('location as l', 'g.geo_country_id', 'l.id')
            .where('g.isdeleted', false)
            .andWhere('g.project_id', projectId)
            .orderBy('g.id')
        : [],
    dataSetDivisionList: async (_, { projectId }, { db }) =>
      projectId
        ? await db('division_stats as ds')
            .select({
              id: 'ds.id',
              name: 'd.name',
              ticketsTotal: 'ds.trend_count_tickets',
              segmentsTotal: 'ds.trend_count_segments',
              farePaidTotal: 'ds.stat_sum_farepaid',
              numberDatasets: db.raw(
                `(SELECT COUNT(*) from division_stats_activity where division_stats_id = ds.id and project_id = ${projectId} and isdeleted = FALSE)`
              ),
              annMonths: 'ds.ann_months'
            })
            .leftJoin('division as d', 'ds.division_id', 'd.id')
            .where('ds.isdeleted', false)
            .andWhere('ds.project_id', projectId)
            .orderBy('ds.id')
        : [],
    dataSetColumnList: async (_, { projectId }, { db }) => {
      if (!projectId) return [];
      const colList = await db('geo_country_stats_activity')
        .distinct('stat_month as month', 'stat_year as year')
        .orderBy(['stat_year', 'stat_month'])
        .where('isdeleted', false)
        .andWhere('project_id', projectId);
      const dataList = colList.map(async ({ month, year }) => {
        const [qcData] = await db('geo_country_stats_activity')
          .limit(1)
          .where('isdeleted', false)
          .andWhere('stat_month', month)
          .andWhere('stat_year', year)
          .andWhere('project_id', projectId);
        const { qc, lastUpdated } = qcData ? qcData : {};
        const { rows: countryRows } = await db.raw(
          `select * from geo_country_stats_activity
          where stat_month = ${month} and stat_year = ${year} and project_id = ${projectId}
          order by geo_country_stats_id;`
        );
        const mappedCountryRows = countryRows.map(row => ({
          tickets: row.trend_count_tickets,
          segments: row.trend_count_segments,
          farePaid: row.stat_sum_farepaid,
          importedTickets: row.trend_count_imported,
          errorTickets: row.trend_count_error,
          errorRatio: row.stat_ratio_error
        }));
        const { rows: divisionRows } = await db.raw(
          `select * from division_stats_activity
          where stat_month = ${month} and stat_year = ${year} and project_id = ${projectId}
          order by division_stats_id;`
        );
        const mappedDivisionRows = divisionRows.map(row => ({
          tickets: row.trend_count_tickets,
          segments: row.trend_count_segments,
          farePaid: row.stat_sum_farepaid
        }));
        return {
          name: moment.utc(`${year}-${month}`).format('YYYY-MM'),
          date: moment.utc(`${year}-${month}`),
          dateUpdated: lastUpdated,
          qc,
          countryData: mappedCountryRows,
          divisionData: mappedDivisionRows
        };
      });
      return await Promise.all(dataList);
    }
  },
  Mutation: {
    toggleDataSet: async (_, { projectId, month, year, qc }, { db }) => {
      await db.raw(`
          SELECT dataset_update_qc(${projectId}, ${month}, ${year}, ${qc})
        `);
    },
    deleteDataSet: async (_, { projectId, month, year }, { db }) => {
      await db.raw(`
        SELECT dataset_delete( ${projectId}, ${month}, ${year})
      `);
    },
    setAnnualization: async (_, { type = 1, annMonthsList }, { db }) => {
      const functionName =
        type === 1 ? 'geo_country_stats_update' : 'division_stats_update';
      const queries = annMonthsList.map(({ id, annMonths }) =>
        db.raw(`
          SELECT ${functionName}(${id}, ${annMonths})
        `)
      );
      await Promise.all(queries);
    }
  }
};
