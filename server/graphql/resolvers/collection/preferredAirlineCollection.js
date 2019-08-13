const { PREFERRED_AIRLINE_LOOKUP } = require('../../constants');

exports.preferredAirlineCollection = {
  Query: {
    preferredAirlineCollectionList: async (
      _,
      { clientId = null, projectId = null },
      { db }
    ) =>
      await db('preferredcarriergroup as p')
        .select({
          id: 'id',
          name: 'name',
          description: 'description',
          dateUpdated: 'updated',
          airlineCount: db.raw(
            `(SELECT COUNT(*) FROM pcgcarrier WHERE pcgroupid = p.id AND isdeleted = FALSE)`
          ),
          active: db.raw(
            `COALESCE((SELECT COUNT(*) FROM projectdataref as pd WHERE pd.datarefid = p.id AND pd.projectid = ${projectId} AND status = 1 AND datareftype = 4) = 1, FALSE)`
          )
        })
        .where('isdeleted', false)
        .andWhere('clientid', clientId),
    preferredAirlineCollection: async (_, { projectId, id }, { db }) =>
      await getPreferredAirlineCollection(db, id, projectId),
    preferredAirlineList: async (_, { groupId }, { db }) => {
      const preferredAirlineList = await db('pcgcarrier as p')
        .select({
          id: 'p.id',
          airlineId: 'carrierid',
          name: 'c.name',
          preferenceLevelId: 'preferencelevelid',
          preferenceLevelName: 'l.name_val',
          effectiveStartDate: 'effectivedatestart',
          effectiveEndDate: 'effectivedateend',
          active: db.raw(`TRUE`)
        })
        .leftJoin('carrier as c', 'c.id', 'p.carrierid')
        .leftJoin('lov_lookup as l', 'l.id', 'p.preferencelevelid')
        .where('p.isdeleted', false)
        .andWhere('pcgroupid', groupId)
        .orderBy('p.id');
      const preferredAirlineRequests = preferredAirlineList.map(
        async preferredAirline => {
          const posList = await db('pcgcpointofsale as p')
            .select({
              id: 'p.id',
              locationId: 'p.locationid',
              name: 'l.name',
              code: 'l.code'
            })
            .leftJoin('location as l', 'p.locationid', 'l.id')
            .where('p.pcgcarrierid', preferredAirline.id)
            .andWhere('p.isdeleted', false);
          preferredAirline.posList = posList;
        }
      );
      await Promise.all(preferredAirlineRequests);
      return preferredAirlineList;
    },
    preferenceLevelList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', PREFERRED_AIRLINE_LOOKUP.PREFERENCE_LEVEL_TYPE)
  },
  Mutation: {
    editPreferredAirlineCollection: async (
      _,
      { projectId, id, name, description },
      { db }
    ) => {
      await db.raw(
        `SELECT preferred_carrier_group_update(
            ${id},
            '${name}',
            ${description ? `'${description}'` : null}
          )`
      );
      return await getPreferredAirlineCollection(db, id, projectId);
    },
    deletePreferredAirlineCollection: async (_, { id, projectId }, { db }) => {
      await db.raw(
        `SELECT preferred_carrier_group_delete(${id}, ${projectId})`
      );
    },
    togglePreferredAirlineCollection: async (_, { id, projectId }, { db }) => {
      await db.raw(
        `SELECT preferred_carrier_group_toggle(${id}, ${projectId})`
      );
    },
    addPreferredAirline: async (_, { groupId, airlineList }, { db }) => {
      airlineList.forEach(
        async ({
          airlineId,
          preferenceLevelId,
          effectiveStartDate,
          effectiveEndDate,
          posIdList
        }) => {
          const { rows } = await db.raw(
            `SELECT pcg_carrier_create(${groupId}, ${airlineId}, ${preferenceLevelId}, ${
              effectiveStartDate
                ? `'${new Date(effectiveStartDate).toISOString()}'`
                : null
            },
            ${
              effectiveEndDate
                ? `'${new Date(effectiveEndDate).toISOString()}'`
                : null
            })`
          );
          const [{ pcg_carrier_create: newId }] = rows;
          const posRequests = posIdList.map(id =>
            db.raw(`SELECT pcgc_pos_create(${newId}, ${id})`)
          );
          await Promise.all(posRequests);
        }
      );
    },
    editPreferredAirline: async (_, { groupId, airlineList }, { db }) => {
      airlineList.forEach(
        async ({
          id,
          airlineId,
          preferenceLevelId,
          effectiveStartDate,
          effectiveEndDate,
          deleted,
          posIdList
        }) => {
          const { rows } = await db.raw(
            `SELECT pcg_carrier_update(${groupId}, ${id}, ${airlineId}, ${preferenceLevelId}, ${
              effectiveStartDate
                ? `'${new Date(effectiveStartDate).toISOString()}'`
                : null
            },
            ${
              effectiveEndDate
                ? `'${new Date(effectiveEndDate).toISOString()}'`
                : null
            },
            ${deleted})`
          );

          const [{ pcg_carrier_update: newId }] = rows;
          const posRequests = posIdList.map(id =>
            db.raw(`SELECT pcgc_pos_create(${newId}, ${id})`)
          );
          await Promise.all(posRequests);
        }
      );
    },
    deletePreferredAirline: async (_, { id }, { db }) => {
      await db.raw(`SELECT pcg_carrier_delete(${id})`);
    }
  }
};

const getPreferredAirlineCollection = async (db, id, projectId) => {
  const [preferredAirlineCollection] = await db('preferredcarriergroup as p')
    .select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'updated',
      airlineCount: db.raw(
        `(SELECT COUNT(*) FROM pcgcarrier WHERE pcgroupid = p.id AND isdeleted = FALSE)`
      ),
      active: db.raw(
        `COALESCE((SELECT COUNT(*) FROM projectdataref as pd WHERE pd.datarefid = p.id AND pd.projectid = ${projectId} AND status = 1 AND datareftype = 4) = 1, FALSE)`
      )
    })
    .where('id', id);
  return preferredAirlineCollection;
};
