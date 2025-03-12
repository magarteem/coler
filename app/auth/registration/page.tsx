"use client";

import { Entrance } from "@/app/shared/layouts/entrance/Entrance";
import styles from "./registration.module.scss";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/app/shared/components/formFields/PhoneInput";
import { useState } from "react";
import { InputField } from "@/app/shared/ui/input/InputField";
import { GoBack } from "@/app/features/goBack/GoBack";
import { Button } from "@/app/shared/ui/button/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { authLogin } from "@/app/shared/api/authLogin";
import { TextInputField } from "@/app/shared/components/formFields/TextInputField";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const createDirectoryZod = z.object({
  phone: z.string().length(12, "Invalid phone number"),
  codeVerify: z.string().max(4, "max char").optional(),
});
export type ValidationSchema = z.infer<typeof createDirectoryZod>;

const title1 = "Реєстрація";
const title2 = "Дякуємо за реєстрацію!";

const noes1 =
  "Введіть номер телефону, на який буде відправлено код для для реєстрації акаунту";
const noes2 =
  "На ваш номер було відправлено СМС з кодом для реєстрації акаунту";
const noes3 =
  "Вітаємо! Ви створили обліковий запис. Натисніть “Продовжити”, щоб увійти в Особистий Кабінет.";

export default function Registration() {
  const { push } = useRouter();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [codeVerify, setCodeVerify] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
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
        //REG
        const isLogin = await authLogin("/register", {
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
          //push("/");
          setRegSuccess(true);
        }
      }
    } catch (error) {
      console.log("ERROR >> ", error);
    }
  };

  return (
    <>
      <GoBack />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.registration}
      >
        <Entrance
          title={regSuccess ? title2 : title1}
          notes={regSuccess ? noes3 : accessToken ? noes2 : noes1}
        >
          {!regSuccess &&
            (accessToken ? (
              //<InputField
              //  placeholder="Введіть код з СМС"
              //  type="number"
              //  name="codeVerify"
              ///>
              <TextInputField
                form={form}
                name="codeVerify"
                placeholder="Введіть код з СМС"
              />
            ) : (
              <PhoneInput form={form} name="phone" />
            ))}

          <Button
            disabled={!form.formState.isValid}
            variant="primary"
            size="lg"
            type="submit"
            onClick={() => (regSuccess ? push("/") : {})}
          >
            Продовжити
          </Button>
        </Entrance>
      </form>
    </>
  );
}
