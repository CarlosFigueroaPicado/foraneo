import Constants from 'expo-constants';

type Environment = 'development' | 'staging' | 'production';

type EnvConfig = {
  environment: Environment;
  apiBaseUrl: string;
};

const manifest = Constants.expoConfig;

const environment = (manifest?.extra?.environment as Environment) ?? 'development';
const apiBaseUrl = (manifest?.extra?.apiBaseUrl as string) ?? 'http://localhost:3333';

export const env: EnvConfig = {
  environment,
  apiBaseUrl,
};
