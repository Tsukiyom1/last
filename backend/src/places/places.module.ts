import { Module } from "@nestjs/common";
import { PlacesService } from "./places.service";
import { PlacesController } from "./places.controller";
import { AuthModule } from "src/auth/auth.module";


@Module({
  imports: [AuthModule],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}