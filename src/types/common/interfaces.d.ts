// Declare interfaces

declare module 'nanobar' {
    export default class Nanobar {
        go(to: number): void
    }
}

declare interface CoreUIStoreState {
    sidebarShow: 'responsive' | boolean,
    sidebarMinimize: boolean,
    [key: string]: any
}

declare interface ApiResponse {
    success: boolean,
    payload: {
        [key: string]: any
    },
    error: {
        code: number,
        type: string,
        message: string,
    }
}

// Static modules
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.json';