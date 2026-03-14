import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePlaceDto } from "./dto/create-place.dto";



@Injectable()
export class PlacesService {
  constructor(private readonly prisma:PrismaService) {}

  async getAllPlaces() {
    const places =  await this.prisma.places.findMany({
      include:{
        images:true,
        feedbacks:true
      }
    })

    return places.map((place) => {
      const feedbacks = place.feedbacks

      const avgFood = feedbacks.length === 0 ? 0 : Number((feedbacks.reduce((sum,acc) => sum +  acc.food ,0) / feedbacks.length).toFixed(1))
      const avgService = feedbacks.length === 0 ? 0 : Number((feedbacks.reduce((sum,acc) => sum +  acc.service ,0) / feedbacks.length).toFixed(1))
      const avgInterior = feedbacks.length === 0 ? 0 : Number((feedbacks.reduce((sum,acc) => sum +  acc.interior ,0) / feedbacks.length).toFixed(1))

      const total = Number(((avgFood + avgService + avgInterior) / 3).toFixed(1))

      return {
        ...place,

        feedbacks:[...place.feedbacks].sort((a,b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()),
        rating: { food: avgFood, service: avgService, interior: avgInterior, total }
        
      }})

  }

  async getPlaceById(id: number) {
    const place =  await this.prisma.places.findUnique({
      where:{id},
      include:{
        images:true,
        feedbacks:{
          orderBy:{datetime:'desc'}
        }
      }
    })

    if (!place) {
      throw new NotFoundException(`Place with id: ${id} not found`);
    }

       const avgFood = place.feedbacks.length === 0 ? 0 : Number((place.feedbacks.reduce((sum,acc) => sum +  acc.food ,0) / place.feedbacks.length).toFixed(1))
      const avgService = place.feedbacks.length === 0 ? 0 : Number((place.feedbacks.reduce((sum,acc) => sum +  acc.service ,0) / place.feedbacks.length).toFixed(1))
      const avgInterior = place.feedbacks.length === 0 ? 0 : Number((place.feedbacks.reduce((sum,acc) => sum +  acc.interior ,0) / place.feedbacks.length).toFixed(1))

      const total = Number(((avgFood + avgService + avgInterior) / 3).toFixed(1))

      return [{
        ...place,
        rating:{ food: avgFood, service: avgService, interior: avgInterior, total }
      }]

  }

  async createPlace(dto:CreatePlaceDto) {
    return await this.prisma.places.create({
      data:{

        name:dto.name,
        description:dto.description,
        main_image:dto.main_image??'',
        userId:dto.userId
      }
    })

  }

  async deletePlace(id:number) {

    const place = await this.prisma.places.findUnique({
      where:{id}
    })

    if (!place) {
      throw new NotFoundException(`Place with id: ${id} not found`);
    }
    
    await this.prisma.places.delete({
      where:{id}
    })
  }

}