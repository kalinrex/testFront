import { IActivity } from "./IActivity";

export interface ISurvey {
  id?: any,
  activity_id: number,
  answers: string,
  create_at?: Date,
  activity?: IActivity
}
