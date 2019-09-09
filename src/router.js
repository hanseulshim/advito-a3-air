import Vue from 'vue';
import Router from 'vue-router';
import AirManager from './views/AirManager';
import Home from './views/Home';
import Project from './views/Project';
import ProjectSettings from '@/components/ProjectSettings';

import Login from '@/components/Login';
import ResetPassword from '@/components/Login/ResetPassword';

import DataSet from '@/components/DataSet';
import PosTrends from '@/components/DataSet/PosTrends';
import DivisionTrends from '@/components/DataSet/DivisionTrends';
import ImportErrors from '@/components/DataSet/ImportErrors';

import Contracts from '@/components/Contracts';
import ContractList from '@/components/Contracts/ContractList';
import PricingTerms from '@/components/Contracts/PricingTerms';
import TargetTerms from '@/components/Contracts/TargetTerms';

import ScenarioSettings from '@/components/ScenarioSettings';
import ScenarioName from '@/components/ScenarioSettings/EditScenario/ScenarioName';
import ScenarioContracts from '@/components/ScenarioSettings/EditScenario/ScenarioContracts';
import ScenarioPreferredAirlines from '@/components/ScenarioSettings/EditScenario/ScenarioPreferredAirlines';
import ScenarioParameters from '@/components/ScenarioSettings/EditScenario/ScenarioParameters';
import ScenarioTripDistribution from '@/components/ScenarioSettings/EditScenario/ScenarioTripDistribution';

import Process from '@/components/Process';

import { getToken } from './helper';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'home-redirect',
          redirect: { name: 'root' }
        },
        {
          path: 'projectList',
          name: 'root',
          component: AirManager
        },
        {
          path: '/:projectId',
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
              path: 'scenario-settings',
              name: 'scenario-settings',
              component: ScenarioSettings,
              children: [
                {
                  path: 'edit-scenario/scenario-name',
                  name: 'scenario-name',
                  component: ScenarioName
                },
                {
                  path: 'edit-scenario/scenario-contracts',
                  component: ScenarioContracts
                },
                {
                  path: 'edit-scenario/scenario-preferred-airlines',
                  component: ScenarioPreferredAirlines
                },
                {
                  path: 'edit-scenario/scenario-parameters',
                  component: ScenarioParameters
                },
                {
                  path: 'edit-scenario/scenario-trip-distribution',
                  component: ScenarioTripDistribution
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
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login') {
    if (getToken()) {
      next('/');
    }
  }

  //trying to capture the route when user is coming in from the note sending SES
  // if (/\d/.test(to.fullPath)) {
  //   const path = to.fullPath;
  //   if (next.fullPath === '/login') {
  //     next(path);
  //   }
  // }
  next();
});

export default router;
