"use server";

import { getServerSession, Session } from "next-auth";
import { ResponseErrorType } from "../shared/types/responseErrorType";
import { authOptions } from "./auth/authOptions";

interface NextFetchOptions extends Omit<RequestInit, "body"> {
  method?: "GET" | "POST";
  body?: BodyInit | Record<string, any>;
  next?: {
    tags?: string[];
    revalidate?: number;
  };
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchClient = async <TResponse>(
  url: string,
  options?: NextFetchOptions
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
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  const fetchOptions: RequestInit = {
    method: options?.method || "GET",
    headers,
    next: options?.next,
  };

  if (options?.method === "POST" && options.body) {
    fetchOptions.body =
      typeof options.body === "string"
        ? options.body
        : JSON.stringify(options.body);
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

//"use server";

//import { getServerSession, Session } from "next-auth";
//import { ResponseErrorType } from "../shared/types/responseErrorType";
//import { authOptions } from "./auth/authOptions";

////Исключить боди чтоб переопределить его так как не позволяет передать просто объектом
//interface NextFetchOptions extends Omit<RequestInit, "body"> {
//  method?: "GET" | "POST";
//  body?: BodyInit | Record<string, any>;
//  next?: {
//    tags?: string[];
//    revalidate?: number;
//  };
//}

//const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

//export const fetchClient = async <TResponse>(
//  url: string,
//  options?: NextFetchOptions //FetchOptions
//): Promise<{
//  response?: TResponse;
//  error?: ResponseErrorType;
//  status?: number;
//}> => {
//  const session: Session | null = await getServerSession(authOptions);

//  const makeRequest = async (token?: string) => {
//    const headers: HeadersInit = {
//      "Content-Type": "application/json",
//    };

//    if (token) {
//      headers["Authorization"] = `Bearer ${token}`;
//    }

//    const fetchOptions: RequestInit = {
//      method: options?.method || "GET",
//      headers,
//      next: options?.next,
//    };

//    if (options?.method === "POST" && options.body) {
//      fetchOptions.body =
//        typeof options.body === "string"
//          ? options.body
//          : JSON.stringify(options.body);
//    }

//    const response = await fetch(baseURL + url, fetchOptions);
//    return response;
//  };

//  // 1. Первый запрос
//  let res = await makeRequest(session?.accessToken);

//  // 2. Если accessToken истёк
//  if (res.status === 401 && session?.refreshToken) {
//    console.log('');
//    // Попытка обновления токена
//    const refreshRes = await fetch(baseURL + "/api/auth/refresh-token", {
//      method: "POST",
//      headers: { "Content-Type": "application/json" },
//      body: JSON.stringify({ refreshToken: session.refreshToken }),
//    });

//    if (refreshRes.ok) {
//      const newTokens = await refreshRes.json();

//      // ❗ Здесь ты должен обновить токены в `next-auth`, если это нужно
//      // Вариант — использовать куки, хранилище или вызвать api/endpoint, сохраняющий сессию

//      // Повторный запрос с новым accessToken
//      res = await makeRequest(newTokens.accessToken);
//    }
//  }

//  const returnData: TResponse = await res.json();
//  return { response: returnData, status: res.status };
//};
