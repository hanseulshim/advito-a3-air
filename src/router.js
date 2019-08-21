import Vue from 'vue';
import Router from 'vue-router';
import AirManager from './views/AirManager';
import Project from './views/Project';
import ProjectSettings from '@/components/ProjectSettings';

import Login from '@/components/Login';
import DataSet from '@/components/DataSet';
import PosTrends from '@/components/DataSet/PosTrends';
import DivisionTrends from '@/components/DataSet/DivisionTrends';
import ImportErrors from '@/components/DataSet/ImportErrors';

import Contracts from '@/components/Contracts';
import ContractList from '@/components/Contracts/ContractList';
import PricingTerms from '@/components/Contracts/PricingTerms';
import TargetTerms from '@/components/Contracts/TargetTerms';

import Process from '@/components/Process';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: AirManager
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/project/:projectId',
      name: 'project',
      component: Project,
      children: [
        {
          path: 'program-settings',
          component: ProjectSettings
        },
        {
          path: 'contracts',
          component: Contracts,
          children: [
            {
              path: '',
              component: ContractList
            },
            {
              path: 'pricing-terms',
              component: PricingTerms
            },
            {
              path: 'target-terms',
              component: TargetTerms
            }
          ]
        },
        {
          path: 'data',
          component: DataSet,
          children: [
            {
              path: 'import-errors/:path',
              component: ImportErrors
            },
            {
              path: 'division-trends/:path',
              component: DivisionTrends
            },
            {
              path: 'pos-trends/:path',
              component: PosTrends
            }
          ]
        },
        {
          path: 'process',
          component: Process
        }
      ]
    }
  ]
});
