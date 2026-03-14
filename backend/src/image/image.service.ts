import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateImageDto } from "./dto/create-image.dto";


@Injectable()
export class ImageService {
  constructor(private readonly prisma:PrismaService){}

  async getImages() {
    return this.prisma.images.findMany()
  }

  createImage(dto:CreateImageDto) {
    return this.prisma.images.create({
      data:dto
    })
  }


    async getImageByPlace(placeId:number) {
    return this.prisma.images.findMany({
      where:{id:placeId},
      include:{
        user:true,
        place:true
      },
    })
  }

   async deleteImage(id:number){
    const image = await this.prisma.images.findUnique({
      where:{id}
    })

    if(!image) {
      throw new NotFoundException('image with this id '  +  id + 'not found')
    }

    await this.prisma.images.delete({
      where:{id}
    })
   }
}