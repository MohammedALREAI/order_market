import { Config } from './config';
import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return Config.Db as TypeOrmModuleOptions
  }
}