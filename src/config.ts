/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-namespace
// tslint:disable-next-line:no-namespace
import {config} from 'dotenv'
config()
import {  TypeOrmModuleOptions } from "@nestjs/typeorm";

// tslint:disable-next-line:no-namespace
export namespace Config {
  export const Db:TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    
      ssl: {     
        rejectUnauthorized: false 
    },
    port: Number(process.env.DB_PORT)  ||5432,
    database: process.env.DB_DATABASE ,
    username: process.env.DB_USERNAME ,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  };

  export const Stripe= {
    secretKey:process.env.STRIPE_SECRET_KEY ,
    apiVersion: '2020-08-27'
  }

  export const Aws = {
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    cdnUrl: process.env.cdnUrl,
    region:process.env.region,
  };
  export const NodeMailerOptions = {
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        username: 'username',
        pass: 'pass',
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  };
  export const VapidKeys = {
    subject:process.env.VapidKeys_subject,
    publicKey: process.env.VapidKeys_PUBLICKEY ,
    privateKey: process.env.VapidKeys_PRIVATE,
  };



  export const Auth = {
    secretKey: process.env.SECRET_KEY,
    strategies: 'jwt',
    expiresIn: '10hr',
  };
  export const FrontEndKeys = {
    url: 'https://global-market-demo.herokuapp.com',
    endpoints: ['auth/reset-password', 'auth/verify-email'],
  };


export const Email={
  from:"mhamad.aa1997.aa@gmail.com",
  to:"mhamad.aa1997.aa@gmail.com"
}
}



// pno=should beadd value or all of them 
// &propno=&qs=&propnameop=&propname=&pop=&pn=&pop2=&pn2=&cop=&cn=