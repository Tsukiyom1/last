import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AuthGuard } from "src/common/guards/auth.guard";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";


@Module({
 imports:[AuthModule],
  controllers:[ImageController],
  providers:[ImageService,AuthGuard]
})
export class ImageModule{}