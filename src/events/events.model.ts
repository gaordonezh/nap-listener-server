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
export class Event {
  @prop({ required: true, type: String })
  room: string;

  @prop({ required: true, type: String })
  title: string;

  @prop({ required: true, type: String })
  description: string;

  @prop({ required: true, type: String })
  package: string;

  @prop({ required: true, type: Date })
  datetime: Date;

  @prop({ required: true, type: String })
  sender: string;

  @prop({ required: true, type: Number })
  amount: number;

  @prop({ required: true, type: String })
  securityCode: string;
}
