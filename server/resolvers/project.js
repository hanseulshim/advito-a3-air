import { PROJECT_LOOKUP } from '../constants';
import { Project, ProjectList, ProjectUserFavorite } from '../models';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import { raw } from 'objection';

export const project = {
  Query: {
    projectList: async (_, { clientId = null, userId = null }) =>
      getProject(userId, null, clientId),
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
      }
    ) => {
      const nameVal = getProjectName(
        projectTypeName,
        clientName,
        effectiveFrom,
        effectiveTo
      );
      const project = await Project.query().insert({
        clientId,
        nameVal,
        projectTypeId,
        savingsTypeId,
        effectiveFrom,
        effectiveTo,
        reportFrom,
        reportTo,
        description,
        projectManagerId,
        leadAnalystId,
        dataSpecialistId,
        currencyTypeId: currencyId,
        distanceTypeId: distanceUnitId,
        control: uuidv4()
      });
      const promiseArr = [
        project.$relatedQuery('projectDataRef').insert({
          projectId: project.id,
          dataRefType: 1,
          dataRefId: 1,
          status: 1
        }),
        project.$relatedQuery('projectDataRef').insert({
          projectId: project.id,
          dataRefType: 2,
          dataRefId: 1,
          status: 1
        }),
        project.$relatedQuery('projectDataRef').insert({
          projectId: project.id,
          dataRefType: 3,
          dataRefId: 1,
          status: 1
        })
      ];
      await Promise.all(promiseArr);
      return await getProject(userId, project.id);
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
      }
    ) => {
      const project = await ProjectList.query().findById(id);
      const nameVal = getProjectName(
        project.projectTypeName,
        project.clientName,
        effectiveFrom,
        effectiveTo
      );
      await Project.query()
        .findById(id)
        .patch({
          nameVal,
          savingsTypeId,
          effectiveFrom,
          effectiveTo,
          reportFrom,
          reportTo,
          description,
          projectManagerId,
          leadAnalystId,
          dataSpecialistId,
          currencyTypeId: currencyId,
          distanceTypeId: distanceUnitId
        });
      return await getProject(userId, id);
    },
    deleteProject: async (_, { id }) => {
      await Project.query().deleteById(id);
      return id;
    },
    toggleFavoriteProject: async (_, { id, userId }) => {
      const projectUserFavorite = await ProjectUserFavorite.query()
        .where('projectId', id)
        .andWhere('userId', userId)
        .first();
      if (projectUserFavorite) {
        await ProjectUserFavorite.query()
          .delete()
          .where('projectId', id);
      } else {
        await ProjectUserFavorite.query().insert({
          projectId: id,
          userId
        });
      }
      return await getProject(userId, id);
    }
  }
};

const getProjectName = (
  projectTypeName,
  clientName,
  effectiveFrom,
  effectiveTo
) => {
  const effectiveFromYear = moment.utc(effectiveFrom).year();
  const effectiveToYear = moment.utc(effectiveTo).year();
  const yearRange =
    effectiveFromYear !== effectiveToYear
      ? `${effectiveFromYear} - ${effectiveToYear.toString().substr(-2)}`
      : effectiveFromYear;
  return `${clientName} ${yearRange} ${projectTypeName}`;
};

const getProject = async (userId, id = null, clientId = null) => {
  const favorite = `COALESCE((SELECT count(*) FROM project_user_favorite WHERE user_id=${userId} AND project_id=p.id) > 0,FALSE)`;
  if (id) {
    return ProjectList.query()
      .alias('p')
      .select(['p.*', raw(favorite).as('favorite')])
      .findById(id);
  } else if (clientId) {
    return ProjectList.query()
      .alias('p')
      .select(['p.*', raw(favorite).as('favorite')])
      .where('clientId', clientId);
  }
  return ProjectList.query()
    .alias('p')
    .select(['p.*', raw(favorite).as('favorite')]);
};
