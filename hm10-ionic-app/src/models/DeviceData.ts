export interface DeviceData {
    characteristics: Characteristic[];
    id: string;
    state: string;
    services: string[];
    name: string;
}

export interface Characteristic {
    properties: string[];
    isNotifying: boolean;
    characteristic: string;
    service: string[];
}