import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";


@Injectable()
export class FeedbackService {
  constructor(private readonly prisma:PrismaService) {}

  async getFeedbacks() {
    return await this.prisma.feedback.findMany()
  }

  async getFeedbackByPlace(placeId:number) {
    return this.prisma.feedback.findMany({
      where:{id:placeId},
      include:{
        user:true,
        place:true
      },
      orderBy:{datetime:'desc'}
    })
  }


  async createFeedback(dto:CreateFeedbackDto) {
    return await this.prisma.feedback.create({data:dto})
  }


  async deleteFeedback(id:number) {
    await this.prisma.feedback.delete({where:{id}})
  }
}