import { BaseModel } from "./BaseModel";

export interface IProperty extends BaseModel{
  title:string,
  address:string,
  description:string,
  disable?:Date,
  status:string
}
