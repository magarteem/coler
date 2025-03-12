"use server";

import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { ResponseErrorType } from "../shared/types/responseErrorType";

interface NextFetchOptions extends RequestInit {
  method?: "GET" | "POST";
  body?: BodyInit;
  next?: {
    tags?: string[];
    revalidate?: number;
  };
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchClient = async <TResponse>(
  url: string,
  options?: NextFetchOptions //FetchOptions
): Promise<{
  response?: TResponse;
  error?: ResponseErrorType;
  status?: number;
}> => {
  const session: Session | null = await getServerSession(authOptions);
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (session) {
    headers["Authorization"] = `Bearer ${session?.accessToken}`;
  }

  const fetchOptions: RequestInit = {
    method: options?.method || "GET",
    headers,
  };

  if (options?.method === "POST" && options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(baseURL + url, fetchOptions);
  if (!response.ok) {
    return {
      error: (await response.json()) as unknown as ResponseErrorType,
      status: response.status,
    };
  }

  const returnData: TResponse = await response.json();
  return { response: returnData, status: response.status };
};

//!

//interface FetchOptions {
//  method?: "GET" | "POST";
//  body?: BodyInit;
//}

//export const apiClient = async <T>(
//  url: string,
//  method: "GET" | "POST" = "GET",
//  params?: any
//): Promise<{ response?: T; error?: ResponseErrorType; status?: number }> => {
//  const session: Session | null = await getServerSession(authOptions);

//  //  console.log("session", await session);
//  const response = await fetch(baseURL + url, {
//    method,
//    headers: {
//      "Content-Type": "application/json",
//      //@ts-ignore
//      Authorization: session ? `Bearer ${session.accessToken} ` : {},
//    },
//    ...params,
//  });

//  if (!response.ok) {
//    return { error: response as unknown as ResponseErrorType };
//  }

//  const returnData: T = await response.json();
//  return { response: returnData };
//};
