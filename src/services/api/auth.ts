import connector from './api-connector'
import { AxiosResponse } from 'axios'
import Admin from '@/models/admin'
import moment from 'moment'


export default {
    /**
     * Get the current logged in user.
     */
    async index(): Promise<Admin> {
        let token = await this.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get('api/v1/auth', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return Admin.fromJson(response.data.payload.data);
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
        localStorage.removeItem('access_token_expires_at');

        return response.data.payload;
    },

    /**
     * Login
     */
    async login(data: {
        email: string, 
        password: string
    }): Promise<{
        data: Admin,
        access_token: string,
        token_type: string,
        expires_in: number
    }> {
        let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/auth/login', data);

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        // Set the expiry.
        let expiry = moment().add(<number>response.data.payload.expires_in, 'seconds');

        // Save the api token.
        localStorage.setItem('access_token', <string>response.data.payload.access_token);
        localStorage.setItem('access_token_expires_at', expiry.unix().toString());

        return {
            data: Admin.fromJson(response.data.payload.data),
            access_token: response.data.payload.access_token as string,
            token_type: response.data.payload.token_type as string,
            expires_in: response.data.payload.expires_in as number,
        };
    },

    // /**
    //  * Request password reset email for the user.
    //  */
    // async requestPasswordResetEmail(data: {email: string}): Promise<object> {
    //     let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/auth/request-password-reset-email', data);

    //     if (response.status != 200) throw 'An error occured while contacting the server.';
    //     if (!response.data.success) throw response.data.error.message;

    //     return response.data.payload;
    // },

    /**
     * Update the user profile
     */
    async updateProfile(data: {
        name?: string,
        password?: string,
    }): Promise<Admin> {
        let token = await this.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.patch('api/v1/auth', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return Admin.fromJson(response.data.payload.data);
    },

    /**
     * Get the api access token.
     */
    async getToken(): Promise<string> {
        let token = <string> localStorage.getItem('access_token');
        let tokenExpiresAt = Number(localStorage.getItem('access_token_expires_at'));
        if (!/^.+\..+\..+$/.test(token) || tokenExpiresAt == null) {
            throw new Error('Access token not set');
        }

        // Expired token
        if (moment.unix(tokenExpiresAt).isSameOrBefore(moment())) {
            let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/auth/refresh', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status != 200) throw 'An error occured while contacting the server.';
            if (!response.data.success) throw response.data.error.message;

            // Set the expiry.
            let expiry = moment().add(<number>response.data.payload.expires_in, 'seconds');

            // Save the api token.
            localStorage.setItem('access_token', <string>response.data.payload.access_token);
            localStorage.setItem('access_token_expires_at', expiry.unix().toString());

            return <string>response.data.payload.access_token;
        } else return token;
    }
}