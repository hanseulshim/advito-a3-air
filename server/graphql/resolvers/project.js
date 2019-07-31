const { PROJECT_LOOKUP } = require('../constants');

exports.project = {
  Query: {
    projectList: async (_, { clientId }, { db, user }) => {
      return clientId
        ? await db('project_list as pl')
            .select({
              ...projectSelect,
              ...getFavorite(db, user)
            })
            .where('isdeleted', false)
            .andWhere('clientid', clientId)
        : await db('project_list as pl')
            .select({ ...projectSelect, ...getFavorite(db, user) })
            .where('isdeleted', false);
    },
    projectTypeList: async (_, __, { db }) => {
      return await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', PROJECT_LOOKUP.PROJECT_TYPE);
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
      { db, user }
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
      return await getProject(db, newId, user);
    },
    editProject: async (
      _,
      {
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
      { db, user }
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
      return await getProject(db, id, user);
    },
    deleteProject: async (_, { id }, { db }) => {
      await db.raw(`
        SELECT project_delete(${id})
      `);
      return id;
    },
    toggleFavoriteProject: async (_, { id }, { db, user }) => {
      await db.raw(`
        SELECT project_favorite(${id}, ${user.id})
      `);
      return await getProject(db, id, user);
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

const getFavorite = (db, user) => ({
  favorite: db.raw(
    `COALESCE(EXISTS(SELECT p.id FROM projectuserfavourite as p GROUP BY p.id HAVING userid=${
      user.id
    } AND projectid=pl.id),FALSE)`
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
