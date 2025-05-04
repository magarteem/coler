import { PlanType } from "./plan";

export interface ResponseValidateCoupon {
  code: string;
  expires_in: number;
  expires_in_unit: string;
  plan: PlanType;
  active: boolean;
  activated: string;
}
