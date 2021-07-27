import connector from './api-connector'
import { AxiosResponse } from 'axios'
import SystemSetting from '@/models/system-setting'
import AuthService from './auth'
import ApiResponse from '@/lib/api-response';


export default class SystemSettingService {
    static async getAll(params?: {
        page?: number,
        perPage?: number,
        keyword?: string,
        order?: string,
    }): Promise<{ [key: string]: number | SystemSetting[] }> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get('api/v1/system-settings', {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        let payload = response.data.payload;
        payload.data = payload.data.map((data: any) => SystemSetting.fromJSON(data));

        return payload;
    }

    static async get(id: number): Promise<SystemSetting> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.get(`api/v1/system-settings/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while connecting with the API';
        else if (!response.data.success) throw response.data.error.message;

        return SystemSetting.fromJSON(response.data.payload.data);
    }

    static async update(id: number, data: {
        config_value?: string,
    }): Promise<SystemSetting> {
        let token = await AuthService.getToken();

        let response: AxiosResponse<ApiResponse> = await connector.patch(`api/v1/system-settings/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status != 200) throw 'An error occured while contacting the server.';
        if (!response.data.success) throw response.data.error.message;

        return SystemSetting.fromJSON(response.data.payload.data);
    }
}