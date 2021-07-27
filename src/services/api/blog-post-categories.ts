import connector from './api-connector'
import { AxiosResponse } from 'axios'
import BlogPostCategory from '@/models/blog-post-category'
import AuthService from './auth'
import ApiResponse from '@/lib/api-response';


export default class BlogPostCategoryService {
    static async getAll(params?: {
        page?: number,
        perPage?: number,
        keyword?: string,
        order?: string,
    }): Promise<{ [key: string]: number | BlogPostCategory[] }> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get('api/v1/blog-post-categories', {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        let payload = response.data.payload;
        payload.data = payload.data.map((data: any) => BlogPostCategory.fromJSON(data));

        return payload;
    }

    static async get(id: number): Promise<BlogPostCategory> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get(`api/v1/blog-post-categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        return BlogPostCategory.fromJSON(response.data.payload.data);
    }

    static async store(data: {
        name: string,
    }): Promise<BlogPostCategory> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/blog-post-categories', data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 201) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return BlogPostCategory.fromJSON(response.data.payload.data);
    }

    static async update(id: number, data: {
        name?: string,
    }): Promise<BlogPostCategory> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.patch(`api/v1/blog-post-categories/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return BlogPostCategory.fromJSON(response.data.payload.data);
    }

    static async delete(id: number): Promise<Boolean> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.delete(`api/v1/blog-post-categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return true;
    }
}