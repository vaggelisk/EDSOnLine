import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../screens/Dashboard'
import VesselView from '../screens/VesselView'
import EngineFaults from '../screens/EngineFaults'
import EnginePerformance from '../screens/EnginePerformance'
import UserSettings from '../screens/UserSettings'

Vue.use(Router);

var router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "Dashboard"
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/vessel-view',
      name: 'Vessel View',
      component: VesselView
    },
    {
      path: '/engine-faults',
      name: 'Engine Faults',
      component: EngineFaults
    },
    {
      path: '/engine-performance',
      name: 'Engine Performance',
      component: EnginePerformance
    },
    {
      path: '/user-settings',
      name: 'Settings',
      component: UserSettings
    }

  ]
});


export default router;

