import { modelOptions, Severity, prop } from '@typegoose/typegoose';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    timestamps: true,
    versionKey: false,
    toObject: {
      getters: true,
      virtuals: false,
    },
  },
})
export class Client {
  @prop({ required: true, type: String })
  phone: string;

  @prop({ required: true, type: String })
  name: string;
}
