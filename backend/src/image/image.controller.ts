import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
	UseInterceptors,
	UploadedFile,
	BadRequestException,
} from "@nestjs/common";
import { ImageService } from "./image.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadStorage } from "src/common/upload.config";
import { ImageBody } from "./dto/image-body.dto";
import { CreateImageDto } from "./dto/create-image.dto";
import { RolesGuard } from "src/common/guards/role.guard";

interface MulterFile {
	filename: string;
}

@Controller("image")
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Get()
	getImages() {
		return this.imageService.getImages();
	}

	@Get(":id")
	getImageByPlace(@Param("id") id: string) {
		return this.imageService.getImageByPlace(Number(id));
	}

	@Post()
	@UseGuards(AuthGuard)
	@UseInterceptors(FileInterceptor("image", { storage: uploadStorage }))
	createImage(@Body() body: ImageBody, @UploadedFile() file: MulterFile) {
		if (!file) {
			throw new BadRequestException("Image file is required");
		}
		const dto = new CreateImageDto();
		dto.placeId = Number(body.placeId);
		dto.userId = Number(body.userId);

		dto.image = file.filename;
		console.log(dto);

		return this.imageService.createImage(dto);
	}

	@Delete(":id")
	@UseGuards(AuthGuard, new RolesGuard(["admin"]))
	deleteImage(@Param("id") id: string) {
		return this.imageService.deleteImage(Number(id));
	}
}
