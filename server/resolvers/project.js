import { PROJECT_LOOKUP } from '../constants';

export const project = {
  Query: {
    projectList: async (_, { clientId = null, userId = null }, { db }) =>
      clientId
        ? await db('project_list as pl')
            .select({
              ...projectSelect,
              ...getFavorite(db, userId)
            })
            .where('isdeleted', false)
            .andWhere('clientid', clientId)
        : await db('project_list as pl')
            .select({
              ...projectSelect,
              ...getFavorite(db, userId)
            })
            .where('isdeleted', false),
    projectTypeList: async (_, __, { db }) => {
      return await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', PROJECT_LOOKUP.PROJECT_TYPE)
        .whereNot('id', PROJECT_LOOKUP.SOURCING);
    },
    savingsTypeList: async (_, __, { db }) => {
      return await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', PROJECT_LOOKUP.SAVINGS_TYPE);
    }
  },
  Mutation: {
    addProject: async (
      _,
      {
        userId,
        clientId,
        clientName,
        projectTypeId,
        projectTypeName,
        savingsTypeId,
        effectiveFrom,
        effectiveTo,
        reportFrom,
        reportTo,
        description,
        projectManagerId,
        leadAnalystId,
        dataSpecialistId,
        currencyId,
        distanceUnitId
      },
      { db }
    ) => {
      const name = getProjectName(
        projectTypeName,
        clientName,
        effectiveFrom,
        effectiveTo
      );
      const { rows } = await db.raw(`
        SELECT project_create(
          ${clientId},
          '${name}',
          ${projectTypeId},
          ${savingsTypeId},
          '${effectiveFrom}',
          '${effectiveTo}',
          '${reportFrom}',
          '${reportTo}',
          ${description ? `'${description}'` : null},
          ${projectManagerId},
          ${leadAnalystId},
          ${dataSpecialistId},
          ${currencyId},
          ${distanceUnitId}
        )
      `);
      const [{ project_create: newId }] = rows;
      return await getProject(db, newId, userId);
    },
    editProject: async (
      _,
      {
        userId,
        id,
        savingsTypeId,
        effectiveFrom,
        effectiveTo,
        reportFrom,
        reportTo,
        description,
        projectManagerId,
        leadAnalystId,
        dataSpecialistId,
        currencyId,
        distanceUnitId
      },
      { db }
    ) => {
      await db.raw(`
        SELECT project_update(
          ${id},
          ${savingsTypeId},
          '${effectiveFrom}',
          '${effectiveTo}',
          '${reportFrom}',
          '${reportTo}',
          ${description ? `'${description}'` : null},
          ${projectManagerId},
          ${leadAnalystId},
          ${dataSpecialistId},
          ${currencyId},
          ${distanceUnitId}
        )
      `);
      return await getProject(db, id, userId);
    },
    deleteProject: async (_, { id }, { db }) => {
      await db.raw(`
        SELECT project_delete(${id})
      `);
      return id;
    },
    toggleFavoriteProject: async (_, { id, userId }, { db }) => {
      await db.raw(`
        SELECT project_favorite(${id}, ${userId})
      `);
      return await getProject(db, id, userId);
    }
  }
};

const getProjectName = (
  projectTypeName,
  clientName,
  effectiveFrom,
  effectiveTo
) => {
  const effectiveFromYear = new Date(effectiveFrom).getFullYear();
  const effectiveToYear = new Date(effectiveTo).getFullYear();
  const yearRange =
    effectiveFromYear !== effectiveToYear
      ? `${effectiveFromYear} - ${effectiveToYear.toString().substr(-2)}`
      : effectiveFromYear;
  return `${clientName} ${yearRange} ${projectTypeName}`;
};

const getProject = async (db, id, user) => {
  const [project] = await db('project_list as pl')
    .select({ ...projectSelect, ...getFavorite(db, user) })
    .where('id', id);
  return project;
};

const getFavorite = (db, userId) => ({
  favorite: db.raw(
    `COALESCE((SELECT count(*) FROM projectuserfavourite as p WHERE userid=${userId} AND projectid=pl.id) > 0,FALSE)`
  )
});

const projectSelect = {
  id: 'id',
  clientId: 'clientid',
  clientName: 'clientname',
  name: 'name',
  description: 'description',
  projectTypeId: 'projecttypeid',
  projectTypeName: 'projecttypename',
  savingsTypeId: 'savingstypeid',
  savingsTypeName: 'savingstypename',
  effectiveFrom: 'effectivefrom',
  effectiveTo: 'effectiveto',
  reportFrom: 'reportfrom',
  reportTo: 'reportto',
  projectManagerId: 'projectmanagerid',
  projectManagerName: 'projectmanagername',
  projectManagerEmail: 'projectmanageremail',
  leadAnalystId: 'leadanalystid',
  leadAnalystName: 'leadanalystname',
  leadAnalystEmail: 'leadanalystemail',
  dataSpecialistId: 'dataspecialistid',
  dataSpecialistName: 'dataspecialistname',
  dataSpecialistEmail: 'dataspecialistemail',
  currencyId: 'currencyid',
  currencyName: 'currencyname',
  distanceUnitId: 'distanceunitid',
  distanceUnitName: 'distanceunitname'
};
