exports.routes = [
    { path: '/', name: 'home', component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue') },
    { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "home" */ '../views/About.vue') },
    {
        path: '/:group',
        name: 'group',
        component: () => import(/* webpackChunkName: "home" */ '../views/Group.vue'),
        meta: {
            sitemap: {
                slugs: [
                    'sites',
                    'games',
                ],
            }
        }
    },
    { path: '*', name: '404', name: '404', component: () => import(/* webpackChunkName: "home" */ '../views/NotFound.vue') }
]