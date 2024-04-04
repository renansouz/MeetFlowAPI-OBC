import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { PhotoData } from "@/slices/photo/entities";

import {
  AddPhotoRepository,
  DeletePhotoRepository,
  UpdatePhotoRepository,
} from "./contracts";
export class PhotoRepository
implements
        AddPhotoRepository,
        DeletePhotoRepository,
        UpdatePhotoRepository
{
  constructor(private readonly repository: Repository) {}
  async addPhoto(photo: PhotoData): Promise<PhotoData | null> {
    return this.repository.add(photo);
  }
  async deletePhoto(query: Query): Promise<PhotoData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async updatePhoto(query: Query, data: PhotoData): Promise<PhotoData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}