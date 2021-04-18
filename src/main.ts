import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { webPushInit } from './commons/functions/initalize-web-push';
import { createDocument } from './swagger/swagger';
import {config} from 'dotenv'
config()
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      cors: true,
    },
  );
  webPushInit();
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.use(function(req, res, next) { //allow cross origin requests
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, HEAD, PUT, OPTIONS, DELETE, GET');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });
  const port: number = parseInt(`${process.env.PORT}`) || 4000;
  SwaggerModule.setup('api/v1', app, createDocument(app));
  await app.listen(port);
  console.log(process.env.SECRET_KEY)
}

bootstrap().then(() => {
  console.log(` the application run the app ✔✔✔🎉✔ `)

});













// function rhombusArea(matrix:Array<Array<number>>,i:number,  j:number, radius:number) {
// 	if(radius == 0) return matrix[i][j];
// 	let sum = - (matrix[i][j - radius] +
//    matrix[i - radius][j] + 
//    matrix[i][j + radius] + 
//    matrix[i + radius][j]);	
//   for(let t = 0, row = i, col = j - radius; t <= radius; t++) {
// 		sum += matrix[row--][col++];
// 	}
// 	for(let t = 0, row = i - radius, col = j; t <= radius; t++) {
// 		sum += matrix[row++][col++];
// 	}
// 	for(let t = 0, row = i, col = j + radius; t <= radius; t++) {
// 		sum += matrix[row++][col--];
// 	}
// 	for(let t = 0, row = i + radius, col = j; t <= radius; t++) {
// 		sum += matrix[row--][col--];
// 	}
// 	return sum;
// }



// function rhombicAreaFrame( matrix:Array<Array<number>>,  radius:number) {
//   const  arr:Array<number>=[]
//   if(radius == 0) return matrix[0][0];
//   let sum=0
//   for (let row = radius-1; row <radius*2-2; row++) {
//     for (let col = radius-1; col < matrix[0].length-radius-1; col++) {
//       sum=matrix[row][col]+matrix[row][]
//       arr.push(sum)
//     }
  
//   }
//   return

// }










