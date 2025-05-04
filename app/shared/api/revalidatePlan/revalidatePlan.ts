"use server";

import { revalidateTag } from "next/cache";
import { FetchTagsNames } from "../../types/FetchTagsNames";

export async function revalidatePlan() {
  revalidateTag(FetchTagsNames.GET_MY_PLAN);
}
