import { Collection, Db,MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as unknown as MongoClient | any,
  uri: null as unknown as string,
  session: null as unknown as any,
  async connect(connectionUrl: string) {
    this.uri = connectionUrl;
    this.client = await MongoClient.connect(connectionUrl, {
      retryReads: true,   // tentará automaticamente novamente operações de leitura que falharam devido a certos erros de rede ou servidor
      retryWrites: true, // tentará automaticamente novamente operações de escrita que falharam devido a certos erros de rede ou servidor.
    });
    return this?.client?.connect?.();
  },
  async disconnect() {
    if (this?.client) {
      await this.endSession();
      await this.client.close();
      this.client = null;
    }
  },
  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri);
    }
    const db: Db = this.client.db(); // Use the client's db method to get the database
    return db.collection(name);
  },
  mapPassword(collection: any): any {
    return { ...collection, password: null };
  },
  mapCollectionPassword(collection: any[]): any[] {
    return collection?.map?.((coll) => MongoHelper.mapPassword(coll));
  },
  async startSession() {
    const session = await this?.client?.startSession?.();
    this.session = session;
    return session;
  },
  async getSession() {
    return this.session;
  },
  async endSession() {
    if (this.session) {
      await this.session.endSession();
    }
    this.session = null;
  },
};