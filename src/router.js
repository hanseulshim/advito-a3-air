import Vue from 'vue';
import Router from 'vue-router';
import AirManager from './views/AirManager';
import Project from './views/Project';
import ProjectSettings from '@/components/ProjectSettings';

import DataSet from '@/components/DataSet';
import PosTrends from '@/components/DataSet/PosTrends';
import PosTickets from '@/components/DataSet/PosTrends/Tickets';
import PosSegments from '@/components/DataSet/PosTrends/Segments';
import PosFarePaid from '@/components/DataSet/PosTrends/FarePaid';
import DivisionTrends from '@/components/DataSet/DivisionTrends';
import DivisionTickets from '@/components/DataSet/DivisionTrends/Tickets';
import DivisionSegments from '@/components/DataSet/DivisionTrends/Segments';
import DivisionFarePaid from '@/components/DataSet/DivisionTrends/FarePaid';
import ImportErrors from '@/components/DataSet/ImportErrors';
import ImportedTickets from '@/components/DataSet/ImportErrors/ImportedTickets';
import ErrorTickets from '@/components/DataSet/ImportErrors/ErrorTickets';
import ErrorRatio from '@/components/DataSet/ImportErrors/ErrorRatio';

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
              component: PosTrends,
              children: [
                {
                  path: 'tickets',
                  component: PosTickets
                },
                {
                  path: 'segments',
                  component: PosSegments
                },
                {
                  path: 'fare-paid',
                  component: PosFarePaid
                }
              ]
            },
            {
              path: 'division-trends',
              component: DivisionTrends,
              children: [
                {
                  path: 'tickets',
                  component: DivisionTickets
                },
                {
                  path: 'segments',
                  component: DivisionSegments
                },
                {
                  path: 'fare-paid',
                  component: DivisionFarePaid
                }
              ]
            },
            {
              path: 'import-errors',
              component: ImportErrors,
              children: [
                {
                  path: 'imported-tickets',
                  component: ImportedTickets
                },
                {
                  path: 'error-tickets',
                  component: ErrorTickets
                },
                {
                  path: 'error-ratio',
                  component: ErrorRatio
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});
