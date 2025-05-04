"use server";

import { fetchClient } from "@/app/api/client";
import { FetchTagsNames } from "../types/FetchTagsNames";
import { ResponseValidateCoupon } from "../types/responseValidateCoupon";
import { revalidateTag } from "next/cache";

export const validateCoupon = async (coupon: string) => {
  const response = await fetchClient<ResponseValidateCoupon>(
    `/coupon?coupon=${coupon}`,
    {
      next: {
        tags: [FetchTagsNames.GET_RESPONSE_VALIDATE_COUPON],
      },
    }
  ).then((res) => {
    console.log("res", res);
    revalidateTag(FetchTagsNames.GET_MY_PLAN);
    return res;
  });

  return response;
};
