import connector from './api-connector'
import { AxiosResponse } from 'axios'
import CarouselImage from '@/models/carousel-image'
import AuthService from './auth'
import ApiResponse from '@/lib/api-response';
import Base64Encoder from '@/lib/base64-encoder';


export default class CarouselImageService {
    static async getAll(params?: {
        page?: number,
        perPage?: number,
        keyword?: string,
        order?: string,
    }): Promise<{ [key: string]: number | CarouselImage[] }> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get('api/v1/carousel-images', {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        let payload = response.data.payload;
        payload.data = payload.data.map((data: any) => CarouselImage.fromJSON(data));

        return payload;
    }

    static async get(id: number): Promise<CarouselImage> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get(`api/v1/carousel-images/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        return CarouselImage.fromJSON(response.data.payload.data);
    }

    static async store(data: {
        title: string,
        image: File
    }): Promise<CarouselImage> {
        let token = await AuthService.getToken();

        let dataToBeSent = {
            ...data, 
            image: await Base64Encoder.encode(data.image), 
            image_name: data.image.name
        };

        let response: AxiosResponse<ApiResponse> = await connector.post('api/v1/carousel-images', dataToBeSent, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 201) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return CarouselImage.fromJSON(response.data.payload.data);
    }

    static async update(id: number, data: {
        title?: string,
        image?: File
    }): Promise<CarouselImage> {
        let token = await AuthService.getToken();

        // Parse data to be sent
        let dataToBeSent: any = {...data};
        if (data.image != null) {
            dataToBeSent.image = await Base64Encoder.encode(data.image);
            dataToBeSent.image_name = data.image.name;
        }

        let response: AxiosResponse<ApiResponse> = await connector.patch(`api/v1/carousel-images/${id}`, dataToBeSent, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return CarouselImage.fromJSON(response.data.payload.data);
    }

    static async delete(id: number): Promise<Boolean> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.delete(`api/v1/carousel-images/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return true;
    }
}