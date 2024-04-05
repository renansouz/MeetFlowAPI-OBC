import { randomUUID } from "node:crypto";

import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import {env} from "@/application/infra";

export class R2Storage {
  private client: S3Client;

  constructor() {
    const accountId = env.cloudflareAccountId;

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId: env.awsAccessKeyId,
        secretAccessKey: env.awsSecretAccessKey,
      },
    });
  }

  async upload({
    fileName,
    fileType,
    body,
  }: any): Promise<{ url: string }> {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: env.awsBucketName,
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      })
    );

    return {
      url: uniqueFileName,
    };
  }

  async delete({ fileName }: any): Promise<boolean> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: env.awsBucketName,
        Key: fileName,
      })
    );
    return true;
  }
}