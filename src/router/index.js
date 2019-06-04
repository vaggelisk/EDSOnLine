import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../screens/Dashboard'
import VesselView from '../screens/VesselView'
import EngineFaults from '../screens/EngineFaults'
import EnginePerformance from '../screens/EnginePerformance'
import UserSettings from '../screens/UserSettings'
import Register from '../screens/Register'
import Login from '../screens/Login'
import Alerts from '../screens/Alerts'
import DailyReport from '../screens/DailyReport'
import FaultsHistory from '../screens/FaultsHistory'


Vue.use(Router);

var router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
        beforeEnter: (to, from, next) => {
            const { uri } = to.query;
            if (uri != null && uri != '/') {
                next(false);
                router.push(uri);
            } else {
                next();
            }
        },
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
      path: '/faults-history/:id',
      name: 'Faults History',
      component: FaultsHistory
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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: Alerts,
    },
    {
      path: '/report',
      name: 'Report',
      component: DailyReport,
    }
  ]
});


export default router;


// router.beforeEach( (to, from, next) => {
//     // redirect to login page if not logged in and trying to access a restricted page
//     const publicPages = ['/login', '/register'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = globalStore.loggedIn;
//
//     // if (authRequired && auth!==1) {
//     if (!loggedIn) {
//         // return next('Login');
//         console.log('DEN EINAI LOGGED');
//         next('/login');
//     } else if (to.path == '/login' ) {
//         next('/');
//     } else {
//         next();
//     }

    // return next();
// });


