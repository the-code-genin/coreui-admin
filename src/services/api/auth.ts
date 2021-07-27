import connector from './api-connector'
import { AxiosResponse } from 'axios'
import User from '@/models/user'
import ApiResponse from '@/lib/api-response'


export default {
    /**
     * Get the current logged in user.
     */
    async index(): Promise<User> {
        let token = await this.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get('api/v1/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return User.fromJSON(response.data.payload.data);
    },

    // /**
    //  * Get the dashboard stats for the logged in user.
    //  */
    // async getDashboardStats(): Promise<AdminDashboardStats> {
    //     let token = await this.getToken();

    //     let response: AxiosResponse<ApiResponse> = await connector.get('api/v1/auth/admin/dashboard-stats', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });

    //     if (response.status != 200) throw 'An error occured while contacting the server.';
    //     if (!response.data.success) throw response.data.error.message;

    //     return response.data.payload.data as AdminDashboardStats;
    // },

    /**
     * Logout the current logged in user.
     */
    async logout(): Promise<object> {
        let token = await this.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        // Remove the token from storage.
        localStorage.removeItem('access_token');

        return response.data.payload;
    },

    /**
     * Login
     */
    async login(data: {
        email: string,
        password: string
    }): Promise<{
        data: User,
        access_token: string,
        token_type: string
    }> {
        let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/auth/login', data);

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        // Save the api token.
        localStorage.setItem('access_token', <string>response.data.payload.access_token);

        return {
            data: User.fromJSON(response.data.payload.data),
            access_token: response.data.payload.access_token as string,
            token_type: response.data.payload.token_type as string
        };
    },

    /**
     * Request password reset email for the user.
     */
    async requestPasswordResetEmail(data: { email: string }): Promise<object> {
        let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/auth/request-password-reset-email', data);

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return response.data.payload;
    },

    /**
     * Reset password
     */
    async resetPassword(data: { email: string, reset_token: string, password: string }): Promise<object> {
        let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/auth/reset-email', data);

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return response.data.payload;
    },

    /**
     * Update the user profile
     */
    async updateProfile(data: {
        name?: string,
        password?: string,
    }): Promise<User> {
        let token = await this.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.patch('api/v1/auth', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return User.fromJSON(response.data.payload.data);
    },

    /**
     * Get the api access token.
     */
    async getToken(): Promise<string> {
        let token = <string>localStorage.getItem('access_token');
        if (!/^.+\..+\..+$/.test(token)) {
            throw new Error('Access token not set');
        }

        return token;
    }
}