import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UsersModule } from './modules/users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AreasModule } from './modules/areas/areas.module';
import { ProcessModule } from './modules/process/process.module'
import { PersonModule } from './modules/person/person.module'
import { ToolsModule } from './modules/tools/tools.module'
import { DocumentModule } from './modules/documents/documents.module'
import { DashboardModule } from 'src/modules/dashboard/dashboard.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('DB_SYNC'),
      }),
    }),

    UsersModule,
    AuthModule,
    AreasModule,
    ProcessModule,
    PersonModule,
    ToolsModule,
    DocumentModule,
    DashboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}