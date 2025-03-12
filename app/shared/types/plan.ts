type PlanName = "Initial" | "Extended" | "Base" | "Advanced";

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
    base: string[];
    additional: string[];
  };
}
