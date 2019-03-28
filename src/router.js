import Vue from 'vue';
import Router from 'vue-router';
import AirManager from './views/AirManager';
import Project from './views/Project';
import ProjectSettings from '@/components/ProjectSettings';

import DataSet from '@/components/DataSet';
import PosTickets from '@/components/DataSet/PosTrends/Tickets';
import PosSegments from '@/components/DataSet/PosTrends/Segments';
import PosFarePaid from '@/components/DataSet/PosTrends/FarePaid';
import DivisionTickets from '@/components/DataSet/DivisionTrends/Tickets';
import DivisionSegments from '@/components/DataSet/DivisionTrends/Segments';
import DivisionFarePaid from '@/components/DataSet/DivisionTrends/FarePaid';
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
              path: 'pos-trends/tickets',
              component: PosTickets
            },
            {
              path: 'pos-trends/segments',
              component: PosSegments
            },
            {
              path: 'pos-trends/fare-paid',
              component: PosFarePaid
            },
            {
              path: 'division-trends/tickets',
              component: DivisionTickets
            },
            {
              path: 'division-trends/segments',
              component: DivisionSegments
            },
            {
              path: 'division-trends/fare-paid',
              component: DivisionFarePaid
            },
            {
              path: 'import-errors/imported-tickets',
              component: ImportedTickets
            },
            {
              path: 'import-errors/error-tickets',
              component: ErrorTickets
            },
            {
              path: 'import-errors/error-ratio',
              component: ErrorRatio
            }
          ]
        }
      ]
    }
  ]
});
