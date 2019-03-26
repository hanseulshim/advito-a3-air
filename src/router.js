import Vue from 'vue';
import Router from 'vue-router';
import AirManager from './views/AirManager';
import Project from './views/Project';
import ProjectSettings from '@/components/ProjectSettings';
import DataSet from '@/components/DataSet';
import PosTrends from '@/components/DataSet/PosTrends';
import DivisionTrends from '@/components/DataSet/DivisionTrends';
import ImportErrors from '@/components/DataSet/ImportErrors';

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
        },
        {
          path: 'data',
          component: DataSet,
          children: [
            {
              path: 'pos-trends',
              component: PosTrends
            },
            {
              path: 'division-trends',
              component: DivisionTrends
            },
            {
              path: 'import-errors',
              component: ImportErrors
            }
          ]
        }
      ]
    }
  ]
});
