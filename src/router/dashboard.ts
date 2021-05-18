export default [
    {
        path: '',
        name: 'Home',
        redirect: {name: 'Dashboard'},
        meta: {
            auth: true
        },
        component: () => import('@/views/Layout.vue'),
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/views/Dashboard.vue'),
            },
            {
                path: '/profile',
                name: 'Profile',
                component: () => import('@/views/Profile.vue'),
            },
            {
                path: '/system-settings',
                name: 'System Settings',
                meta: {
                    requiresModuleAccess: 'system_settings',
                },
                component: () => import('@/views/SystemSettings.vue'),
            },
            {
                path: '/admins',
                name: 'Admins',
                component: () => import('@/views/admins/Layout.vue'),
                redirect: {name: 'All Admins'},
                children: [
                    {
                        path: '',
                        name: 'All Admins',
                        meta: {
                            requiresModuleAccess: 'admins',
                        },
                        component: () => import('@/views/admins/AllAdmins.vue'),
                    },
                    {
                        path: 'create',
                        name: 'Create Admin',
                        meta: {
                            requiresModuleAccess: 'admins',
                        },
                        component: () => import('@/views/admins/CreateAdmin.vue'),
                    },
                    {
                        path: 'edit/:id',
                        name: 'Edit Admin',
                        meta: {
                            requiresModuleAccess: 'admins',
                        },
                        component: () => import('@/views/admins/EditAdmin.vue'),
                    },
                ]
            }
        ]
    },
];