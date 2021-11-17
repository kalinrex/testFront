import { BaseModel } from "./BaseModel";
import { IActivity } from "./IActivity";

export interface IProperty extends BaseModel{
  title:        string,
  address:      string,
  description:  string,
  disable?:     Date,
  status:       string,
  activities?:  IActivity[]
}
