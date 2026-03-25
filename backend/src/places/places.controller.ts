import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { PlacesService } from "./places.service";
import { CreatePlaceBodyDto } from "./dto/create-place-body.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadStorage } from "src/common/upload.config";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/role.guard";

interface MulterFile {
	filename: string;
}
@Controller("places")
export class PlacesController {
	constructor(private readonly placesService: PlacesService) {}

	@Get()
	// @UseGuards(AuthGuard)
	getAllPlaces() {
		return this.placesService.getAllPlaces();
	}

	@Get(":id")
	@UseGuards(AuthGuard)
	getPlaceById(@Param("id") id: number) {
		return this.placesService.getPlaceById(Number(id));
	}

	@Post()
	@UseInterceptors(FileInterceptor("main_image", { storage: uploadStorage }))
	@UseGuards(AuthGuard)
	createPlace(
		@Body() body: CreatePlaceBodyDto,
		@UploadedFile() file?: MulterFile,
	) {
		const checked = body.checked;

		if (checked === false) {
			throw new Error(
				"Please check the checkbox to confirm that you are not a robot.",
			);
		}

		const dto = new CreatePlaceDto();
		dto.name = body.name ?? "";
		dto.description = body.description ?? "";
		dto.userId = Number(body.userId!);
		if (file) {
			dto.main_image = file.filename;
		}

		return this.placesService.createPlace(dto);
	}

	@Delete(":id")
	@UseGuards(AuthGuard, new RolesGuard(["admin"]))
	deletePlace(@Param("id") id: number) {
		return this.placesService.deletePlace(Number(id));
	}
}
