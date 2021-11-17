import { BaseModel } from "./BaseModel";
import {IProperty} from "./IProperty"
import { ISurvey } from "./Survey";
export interface IActivity extends BaseModel {
  title:string,
  property_id:number,
  schedule:Date,
  status?:string,
  condition?: string,
  property?: IProperty
  survey?: ISurvey
}
