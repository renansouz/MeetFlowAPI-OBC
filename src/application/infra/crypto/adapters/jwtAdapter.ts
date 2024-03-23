import jwt from "jsonwebtoken";

import { TokenDecrypter, TokenGenerator } from "@/application/infra/crypto/protocols";

export class JwtAdapter implements TokenDecrypter, TokenGenerator {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(privateKey: string, publicKey: string, private readonly expirationTime: string) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.expirationTime = expirationTime;
  }

  async decrypt(value: string): Promise<string> {
    return jwt.verify(value, this.publicKey) as any;
  }

  async generate(_id: string): Promise<string> {
    return jwt.sign({ _id }, this.privateKey, { expiresIn: this.expirationTime, algorithm: "RS256" });
  }
}