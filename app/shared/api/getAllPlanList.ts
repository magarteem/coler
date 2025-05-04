import { fetchClient } from "@/app/api/client";
import { PlanType } from "../types/plan";
import { FetchTagsNames } from "../types/FetchTagsNames";

export const getAllPlanList = async () => {
  return await fetchClient<PlanType[]>("/plan", {
    next: {
      tags: [FetchTagsNames.GET_ALL_PLAN_LIST],
    },
  });
};
