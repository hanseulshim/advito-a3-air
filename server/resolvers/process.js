import { Project, Report } from '../models';

export const process = {
  Query: {
    process: async (_, { projectId }) => {
      const project = await Project.query().findById(projectId);
      if (!project) return null;
      const report = await Report.query()
        .where('projectid', projectId)
        .andWhere('isdeleted', false)
        .orderBy('id', 'desc')
        .limit(1)
        .first();
      project.procStart = report ? report.procStart : null;
      project.procEnd = report ? report.procEnd : null;
      project.processing = !(report && report.procEnd);
      return project;
    },
    recentProcessList: async (_, { projectId }) =>
      await Report.query()
        .where('projectid', projectId)
        .andWhere('isdeleted', false)
        .orderBy('id', 'desc')
        .limit(5)
  },
  Mutation: {
    startProcess: async (_, { projectId, projectName }, { db, user }) => {
      await db.raw(`
        SELECT advito_a3_processproject(
          ${projectId},
          '${projectName}',
          '${user.name}'
        )
      `);
    },
    stopProcess: async (_, { projectId }) => {
      await Report.query()
        .where('projectid', projectId)
        .andWhere('isdeleted', false)
        .orderBy('id', 'desc')
        .limit(1)
        .first()
        .patch({ procEnd: new Date() });
    }
  }
};
