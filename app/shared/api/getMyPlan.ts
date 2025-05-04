import { fetchClient } from "@/app/api/client";
import { MyPlanType } from "../types/myPlanType";
import { FetchTagsNames } from "../types/FetchTagsNames";

export const getMyPlan = async () => {
  const myPlan = await fetchClient<MyPlanType[]>("/user/purchase/status", {
    next: {
      tags: [FetchTagsNames.GET_MY_PLAN],
    },
  });

  return myPlan;
};
