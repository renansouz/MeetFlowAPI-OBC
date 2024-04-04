/* eslint-disable no-unsafe-optional-chaining */
import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
} from "@/application/helpers";
import { Uploader } from "@/application/infra";
import { Controller } from "@/application/infra/contracts";
import { AddPhoto } from "@/slices/photo/useCases";
import { UpdateUser } from "@/slices/user/useCases";

export class AddPhotoController extends Controller {
  constructor(
    private readonly addPhoto: AddPhoto,
    private readonly updateUser: UpdateUser,
    private readonly uploader: Uploader
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const file = httpRequest?.file;
    
    if (!file) {
      return badRequest("File is required");
    }

    if(!httpRequest?.userId) {
      return badRequest("User is required");
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    if (!allowedTypes.includes(file.mimetype)) {
      return badRequest("Invalid file type");
    }

    const {url} = await this.uploader.upload({
      fileName: file.originalname, 
      fileType: file.mimetype,
      body: file.buffer
    });    
    const Photo = await this.addPhoto({
      title: file.originalname,
      url,
      createdById: httpRequest?.userId,
    });

    const idPhoto = Photo?._id;
    await this.updateUser({
      fields: { _id: httpRequest?.userId },
      options: {},
    }, {
      photoUrl: url,
      photoId: idPhoto,
    }
    );

    return success({url});
  }
}
