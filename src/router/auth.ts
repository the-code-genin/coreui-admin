export default [
    {
        path: '',
        name: 'Auth',
        redirect: {name: 'Login'},
        component: () => import('@/views/auth/Layout.vue'),
        children: [
            {
                path: '/login',
                name: 'Login',
                meta: {
                    guest: true,
                },
                component: () => import('@/views/auth/Login.vue'),
            },
            // {
            //     path: '/forgot-password',
            //     name: 'ForgotPassword',
            //     meta: {
            //         guest: true,
            //     },
            //     component: () => import('@/views/auth/ForgotPassword.vue'),
            // },
            // {
            //     path: '/reset-password',
            //     name: 'ResetPassword',
            //     component: () => import('@/views/auth/ResetPassword.vue'),
            // },
            // {
            //     path: '/password-reset',
            //     name: 'PasswordReset',
            //     component: () => import('@/views/auth/PasswordReset.vue'),
            // },
        ]
    }
];