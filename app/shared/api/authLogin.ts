import { ResponseErrorType } from "../types/responseErrorType";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface AuthType {
  acessToken: string;
}

interface NextFetchOptions extends RequestInit {
  method?: "GET" | "POST";
  body?: BodyInit;
  next?: {
    tags?: string[];
    revalidate?: number;
  };
}

export const authLogin = async (
  url: string,
  options: NextFetchOptions,
  token?: string
): Promise<{ auth?: AuthType; error?: ResponseErrorType }> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const isLogin = await fetch(baseURL + url, {
    method: "POST",
    headers,
    body: options.body,
  });

  if (!isLogin.ok) {
    return { error: await isLogin.json() };
  }

  const auth: AuthType = await isLogin.json();
  return { auth };
};
