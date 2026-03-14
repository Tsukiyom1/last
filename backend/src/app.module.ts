import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PlacesModule } from './places/places.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ImageModule } from './image/image.module';


@Module({
  imports: [ConfigModule.forRoot(), PrismaModule,PlacesModule,AuthModule, FeedbackModule,ImageModule,ServeStaticModule.forRoot({
    rootPath:join(process.cwd(), "public", "uploads"),
    serveRoot:"/uploads",
    serveStaticOptions: {index: false}
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
