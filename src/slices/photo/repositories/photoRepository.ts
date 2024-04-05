import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { PhotoData } from "@/slices/photo/entities";

import {
  AddPhotoRepository,
  DeletePhotoRepository,
} from "./contracts";
export class PhotoRepository
implements
        AddPhotoRepository,
        DeletePhotoRepository
{
  constructor(private readonly repository: Repository) {}
  async addPhoto(photo: PhotoData): Promise<PhotoData | null> {
    return this.repository.add(photo);
  }
  async deletePhoto(query: Query): Promise<PhotoData | null> {
    return this.repository.deleteOne(query?.fields);
  }
}