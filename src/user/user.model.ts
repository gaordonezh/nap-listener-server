import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { UserRolesEnum } from './user.enum';

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
export class User {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  lastname: string;

  @prop({ required: true, enum: UserRolesEnum, type: [String] })
  roles: Array<UserRolesEnum>;

  @prop({ required: false, type: String })
  username: string;

  @prop({ required: false, type: String })
  password: string;

  @prop({ required: false, type: Boolean, default: true })
  isActive: boolean;
}
