import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { FeedbackController } from "./feedback.controller";
import { FeedbackService } from "./feedback.service";
import { AuthGuard } from "src/common/guards/auth.guard";



@Module({
  imports:[AuthModule],
  controllers:[FeedbackController],
  providers:[FeedbackService,AuthGuard]
})
export class FeedbackModule{}