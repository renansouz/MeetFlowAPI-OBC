/* eslint-disable no-unsafe-optional-chaining */
import {
  badRequest,
  HttpRequest,
  HttpResponse,
  success,
  Validation,
} from "@/application/helpers";
import { Delete } from "@/application/infra";
import { Controller } from "@/application/infra/contracts";
import { DeletePhoto } from "@/slices/photo/useCases";
import { UpdateUser } from "@/slices/user/useCases";

export class DeletePhotoController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deletePhoto: DeletePhoto,
    private readonly deleted: Delete,
    private readonly updateUser: UpdateUser
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }

    await this.deleted.delete({
      fileName: httpRequest?.query?.url,
    });

    const photoDeleted = await this.deletePhoto({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });

    await this.updateUser({
      fields: { _id: httpRequest?.userId },
      options: {},
    }, {
      photoUrl: "",
      photoId: "",
    }
    );

    return success(photoDeleted);
  }
}
