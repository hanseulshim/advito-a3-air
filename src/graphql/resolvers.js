import defaults from './defaults';
import router from '../router';

export default {
  Mutation: {
    updateClient: (_, { client = defaults.client }, { cache }) => {
      cache.writeData({
        data: {
          client: {
            ...client
          }
        }
      });
      return null;
    },
    updateProject: (_, { project = defaults.project }, { cache }) => {
      if (project.id) {
        router.push('project');
      } else {
        router.push('/');
      }
      cache.writeData({
        data: {
          project: {
            ...project
          }
        }
      });
      return null;
    }
  }
};
