"use server";

import { fetchClient } from "@/app/api/client";

interface MessageType {
  email: string;
  text: string;
}

export const writeToSupport = async (message: MessageType) => {
  const response = await fetchClient(`/support`, {
    method: "POST",
    body: message,
    cache: "no-cache",
  });
  return response;
};
