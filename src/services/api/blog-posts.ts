import connector from './api-connector'
import { AxiosResponse } from 'axios'
import BlogPost from '@/models/blog-post'
import AuthService from './auth'
import ApiResponse from '@/lib/api-response';
import Base64Encoder from '@/lib/base64-encoder';


export default class BlogPostService {
    static async getAll(params?: {
        status?: 'published' | 'draft',
        page?: number,
        perPage?: number,
        keyword?: string,
        order?: string,
    }): Promise<{ [key: string]: number | BlogPost[] }> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get('api/v1/blog-posts', {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        let payload = response.data.payload;
        payload.data = payload.data.map((data: any) => BlogPost.fromJSON(data));

        return payload;
    }

    static async get(id: number): Promise<BlogPost> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get(`api/v1/blog-posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        return BlogPost.fromJSON(response.data.payload.data);
    }

    static async store(data: {
        blog_post_category_id: number,
        title: string,
        contents: string,
        summary: string,
        publish_by: string,
        feature_image: File
    }): Promise<BlogPost> {
        let token = await AuthService.getToken();

        let dataToBeSent = {
            ...data, 
            feature_image: await Base64Encoder.encode(data.feature_image), 
            feature_image_name: data.feature_image.name
        };

        let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/blog-posts', dataToBeSent, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 201) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return BlogPost.fromJSON(response.data.payload.data);
    }

    static async update(id: number, data: {
        blog_post_category_id?: number,
        title?: string,
        contents?: string,
        summary?: string,
        publish_by?: string,
        feature_image?: File,
        status?: 'published' | 'draft'
    }): Promise<BlogPost> {
        let token = await AuthService.getToken();

        // Parse data to be sent
        let dataToBeSent: any = {...data};
        if (data.feature_image != null) {
            dataToBeSent.feature_image = await Base64Encoder.encode(data.feature_image);
            dataToBeSent.feature_image_name = data.feature_image.name;
        }

        let response: AxiosResponse<ApiResponse> = await connector.patch(`api/v1/blog-posts/${id}`, dataToBeSent, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return BlogPost.fromJSON(response.data.payload.data);
    }

    static async delete(id: number): Promise<Boolean> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.delete(`api/v1/blog-posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return true;
    }
}