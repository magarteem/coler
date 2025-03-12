"use client";

import { z } from "zod";
import styles from "./login.module.scss";
import { GoBack } from "@/app/features/goBack/GoBack";
import { Entrance } from "@/app/shared/layouts/entrance/Entrance";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/app/shared/components/formFields/PhoneInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TextInputField } from "@/app/shared/components/formFields/TextInputField";
import { Button } from "@/app/shared/ui/button/Button";
import { authLogin } from "@/app/shared/api/authLogin";

const createDirectoryZod = z.object({
  phone: z.string().length(12, "Invalid phone number"),
  codeVerify: z.string().max(4, "max char").optional(),
});

export type ValidationSchema = z.infer<typeof createDirectoryZod>;

const noes1 =
  "Введіть номер телефону, на який буде відправлено код для відновлення";
const noes2 = "Введіть код з СМС або код для відновлення";

export default function Login() {
  const { push } = useRouter();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const form = useForm<ValidationSchema>({
    defaultValues: {
      phone: "",
      codeVerify: "",
    },
    resolver: zodResolver(createDirectoryZod),
  });

  const onSubmit = async (dataForm: ValidationSchema) => {
    try {
      if (!accessToken) {
        //LOGIN
        const isLogin = await authLogin("/auth/register", {
          body: JSON.stringify({ phone: dataForm.phone }),
        });

        if (isLogin.error) {
          form.setError("phone", {
            type: "custom",
            message: isLogin.error.errors[0].message,
          });
        } else {
          form.clearErrors;
          setAccessToken(isLogin.auth?.acessToken);
        }
      } else {
        //VERIFI
        const verify = await signIn("credentials", {
          redirect: false,
          token: accessToken,
          code: dataForm.codeVerify,
        });

        if (!verify?.ok) {
          form.setError("codeVerify", {
            type: "custom",
            message: "Не верный код",
          });
        } else {
          push("/");
        }
      }
    } catch (error) {
      console.log("ERROR >> ", error);
    }
  };

  console.log("watch", form.watch("phone"));
  return (
    <>
      <GoBack />
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.login}>
        <Entrance title="Вхід" notes={!!accessToken ? noes2 : noes1}>
          {accessToken ? (
            <TextInputField form={form} name="codeVerify" placeholder="XXXX" />
          ) : (
            <PhoneInput form={form} name="phone" />
          )}

          <Button
            disabled={!form.formState.isValid}
            variant="primary"
            size="lg"
            type="submit"
          >
            Продовжити
          </Button>
        </Entrance>
      </form>
    </>
  );
}
