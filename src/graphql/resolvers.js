import defaults from './defaults';
import router from '../router';
import { GET_PROJECT_STATUS_LIST } from './queries';

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
    updateProject: (
      _,
      { project = defaults.project, route = 'program-settings' },
      { cache }
    ) => {
      if (project.id) {
        if (route.includes('contracts')) {
          router.push(`/project/${project.id}/contracts`);
        } else {
          router.push(`/project/${project.id}/${route}`);
        }
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
    },
    updateContract: (
      _,
      { selectedContract = defaults.selectedContract },
      { cache }
    ) => {
      cache.writeData({
        data: {
          selectedContract: {
            ...selectedContract
          }
        }
      });
      return null;
    },
    updateProjectStatus: (_, { id, status }, { cache }) => {
      const data = cache.readQuery({
        query: GET_PROJECT_STATUS_LIST
      });
      const project = data.projectStatusList.filter(p => p.id === id)[0];
      if (project.status !== status) {
        project.status = status;
        cache.writeData({
          data: {
            projectStatusList: data.projectStatusList
          }
        });
      }
      return null;
    }
  }
};
