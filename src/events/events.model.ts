import { modelOptions, Severity, prop } from '@typegoose/typegoose';

// export class Content {
//   @Prop({ required: true, enum: ContentTypeMessageEnum })
//   type: ContentTypeMessageEnum;

//   @Prop({ required: true, type: String })
//   value: string;
// }

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
  //   @Prop({ required: true, type: Content })
  //   content: Content;

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
}
