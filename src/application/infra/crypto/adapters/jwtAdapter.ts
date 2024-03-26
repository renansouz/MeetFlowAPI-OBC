import jwt from "jsonwebtoken";

import { TokenDecrypter, TokenGenerator } from "@/application/infra/crypto/protocols";

export class JwtAdapter implements TokenDecrypter, TokenGenerator {
  constructor(private readonly secret: string, private readonly expirationTime: string) {
    this.secret = secret;
    this.expirationTime = expirationTime;
  }
  async decrypt(value: string): Promise<string> {
    return jwt.verify(value, this.secret) as any;
  }
  async generate(_id: string): Promise<string> {
    return jwt.sign({ _id }, this.secret, { expiresIn: this.expirationTime });
  }
}

// export class JwtAdapter implements TokenDecrypter, TokenGenerator {
//   private readonly privateKey: string;
//   private readonly publicKey: string;
// 
//   constructor(privateKey: any, publicKey: any, private readonly expirationTime: string) {
//     this.privateKey = privateKey;
//     this.publicKey = publicKey;
//     this.expirationTime = expirationTime;
//   }
// 
//   async decrypt(value: string): Promise<string> {
//     const publicKeyBuffer = Buffer.from(this.publicKey, "base64");
//     return jwt.verify(value, publicKeyBuffer) as any;
//   }
// 
//   async generate(_id: string): Promise<string> {
//     const privateKeyBuffer = Buffer.from(this.privateKey, "base64");
//     return jwt.sign({ _id }, privateKeyBuffer, { expiresIn: this.expirationTime, algorithm: "RS256"});
//   }
// }