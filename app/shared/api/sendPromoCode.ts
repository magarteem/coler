"use server";

import { fetchClient } from "@/app/api/client";
import { UserType } from "../types/profileType";

export const sendPromoCode = async (code: string) => {
  const response = await fetchClient<UserType>(`/auth/verify`, {
    method: "POST",
    body: { code },
    cache: "no-cache",
  });

  return response;
};
