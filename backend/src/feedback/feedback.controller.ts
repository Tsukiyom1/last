import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/role.guard";



@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService:FeedbackService){}

  @Get()
  getFeedbacks() {
    return this.feedbackService.getFeedbacks()
  }


  @Get(':id')
  getFeedback(@Param('id') id:string) {
    return this.feedbackService.getFeedbackByPlace(Number(id))
  }

  @Post()
   @UseGuards(AuthGuard)
  createFeedback(@Body() dto:CreateFeedbackDto) {
    return this.feedbackService.createFeedback(dto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard,new RolesGuard(['admin']))
  deleteFeedback(@Param('id') id:string) {
    return this.feedbackService.deleteFeedback(Number(id))
  }
}