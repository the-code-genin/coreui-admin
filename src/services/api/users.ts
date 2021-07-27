import connector from './api-connector'
import { AxiosResponse } from 'axios'
import User from '@/models/user'
import AuthService from './auth'
import ApiResponse from '@/lib/api-response';


export default class UserService {
    static async getAll(params?: {
        status?: "active" | "banned",
        page?: number,
        perPage?: number,
        keyword?: string,
        order?: string,
    }): Promise<{ [key: string]: number | User[] }> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get('api/v1/users', {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        let payload = response.data.payload;
        payload.data = payload.data.map((data: any) => User.fromJSON(data));

        return payload;
    }

    static async get(id: number): Promise<User> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get(`api/v1/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        return User.fromJSON(response.data.payload.data);
    }

    static async store(data: {
        name: string,
        email: string,
        password: string
    }): Promise<User> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/users', data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return User.fromJSON(response.data.payload.data);
    }

    static async update(id: number, data: {
        name?: string,
        email?: string,
        password?: string,
        status?: 'active' | 'banned'
    }): Promise<User> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.patch(`api/v1/users/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return User.fromJSON(response.data.payload.data);
    }

    static async delete(id: number): Promise<Boolean> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.delete(`api/v1/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return true;
    }
}