import connector from './api-connector'
import { AxiosResponse } from 'axios'
import Admin from '@/models/admin'
import auth from './auth'


export default {
    async getAll(params?: {
        page?: number,
        perPage?: number,
        keyword?: string,
        order?: string,
    }): Promise<{[key: string]: number|Admin[]}> {
        let token = await auth.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get('api/v1/admins', {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        let payload = response.data.payload;
        payload.data = payload.data.map((role: any) => Admin.fromJson(role));

        return payload;
    },

    async get(id: number): Promise<Admin> {
        let token = await auth.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get(`api/v1/admins/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        return Admin.fromJson(response.data.payload.data);
    },

    async store(data: {
        name: string,
        email: string,
        password: string
    }): Promise<Admin> {
        let token = await auth.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/admins', data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return Admin.fromJson(response.data.payload.data);
    },

    async update(id: number, data: {
        name?: string,
        email?: string,
        password?: string,
        status?: 'active'|'banned'
    }): Promise<Admin> {
        let token = await auth.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.patch(`api/v1/admins/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return Admin.fromJson(response.data.payload.data);
    },

    async delete(id: number): Promise<Boolean> {
        let token = await auth.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.delete(`api/v1/admins/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return true;
    }
}