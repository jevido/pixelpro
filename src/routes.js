import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'

// /** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { 
		path: '/', 
		component: Home, 
    navTitle: 'Dashboard',
		meta: {
      title: 'Dashboard'
    } 
	},
  {
    path: '/about',
    navTitle: 'About',
    meta: { 
      title: 'About'
    },
    component: () => import('@/pages/About.vue'),
  },
  {
    path: '/login',
    component: () => import('@/pages/Login.vue'),
    meta: {
      title: 'Login',
    }
  },
  {
    path: '/profile',
    component: () => import('@/pages/Profile.vue'),
    meta: {
      title: 'My Profile',
    }
  },
  {
    path: '/file/:id',
    component: () => import('@/pages/FileViewer.vue'),
    meta: {
      title: 'File viewer',
    }
  },

  {
		path: '/:path(.*)', 
  	component: NotFound 
	},
]

