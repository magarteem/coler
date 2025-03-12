import { fetchClient } from "@/app/api/client";
import { PlanType } from "../types/plan";

export const getPlanList = async () => {
  return await fetchClient<PlanType[]>("/plan");
};
