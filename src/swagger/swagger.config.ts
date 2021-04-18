
 interface SwaggerConfig {
    title: string;
    description: string;
    version: string;
    tags: string[];
    setLicense:string
  }

/**
 * Configuration for the swagger UI (found at /api).
 * Change this to suit your app!
 */
export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'global  order system js',
  description: 'global  order system that used to make order to account with typeorm as postgress  as rest Api  ',
  version: '1.0',
  tags: ['user'],
  setLicense:"Mohammed alreai 2021"
  
};