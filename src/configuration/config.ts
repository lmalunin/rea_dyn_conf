export interface DynamicConfig {
  apiUrl: string;
  environment: 'DEV' | 'PROD';
}

export const defaultConfig: DynamicConfig = {
  apiUrl: '111',
  environment: 'DEV'
};

export const dynamicConfigUrl = 'config.json';
