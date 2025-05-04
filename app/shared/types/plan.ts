export type PlanName = "Initial" | "Extended" | "Base" | "Advanced";

export type PlanOptionsBase =
  | "fraud protection"
  | "anti-boring protection"
  | "ad protection"
  | "potentially dangerous numbers marking"
  | "number complaints"
  | "active fraud prevention during a call";

export type PlanOptionsAdditional = "phone theft protection";

export interface PlanType {
  id: number;
  title: PlanName;
  baseCost: number;
  annualCost: number;
  annualCostPromo: number;
  durationDaysTrial: number;
  costOfCompensation: number;
  costOfCompensationOptions: number;
  planOptions: {
    base: PlanOptionsBase[];
    additional: PlanOptionsAdditional[];
  };
}
