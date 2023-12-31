import { Model, Schema, models, model } from "mongoose";

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    const newDoc = await this.model.create({ ...obj });
    return newDoc;
  }

  public async getConversationsByUserId(userId: string): Promise<T[]> {
    const allDocs = await this.model.find({ userId });
    return allDocs;
  }
}

export default AbstractODM;
