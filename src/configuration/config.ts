export interface DynamicConfig {
  apiUrl: string;
  environment: 'DEV' | 'PROD';
}

export const defaultConfig: DynamicConfig = {
  apiUrl: '',
  environment: 'DEV'
};

export const dynamicConfigUrl = 'config.json';
