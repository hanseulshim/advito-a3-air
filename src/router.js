import Vue from 'vue';
import Router from 'vue-router';
import AirManager from './views/AirManager';
import Project from './views/Project';
import ProjectSettings from '@/components/ProjectSettings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: AirManager
    },
    {
      path: '/project',
      name: 'project',
      component: Project,
      children: [
        {
          path: 'program-settings',
          component: ProjectSettings
        }
      ]
    }
  ]
});
