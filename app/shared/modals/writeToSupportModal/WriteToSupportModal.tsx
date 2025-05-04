"use client";

import { useModal } from "@/app/core/provider/ModalProvider";
import styles from "./writeToSupportModal.module.scss";
import { Button } from "../../ui/button/Button";
import { writeToSupport } from "../../api/writeToSupport";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInputField } from "./formFields/TextInputField";
import { TextAreaInputField } from "./formFields/TextAreaInputField";

const schemePhoneZod = z.object({
  email: z.string().email(),
  text: z.string().min(3, "minimum number of characters 3"),
});

export type ValidationSchema = z.infer<typeof schemePhoneZod>;

export const WriteToSupportModal = () => {
  const { closeModal } = useModal();

  const form = useForm<ValidationSchema>({
    defaultValues: {
      email: "",
      text: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schemePhoneZod),
  });

  const onSubmit = async (formData: ValidationSchema) => {
    await writeToSupport({
      email: formData.email,
      text: formData.text,
    })
      .then((res) => console.log("res", res))
      .catch((ERROR) => console.log("ERRRRRRRRRRR", ERROR));

    closeModal();
  };

  console.log("form.formState", form.formState.errors);
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={styles.writeToSupportModal}
    >
      <TextInputField
        name="email"
        form={form}
        titleText="Пошта для зворотнього звʼязку"
        placeholder="example@email.com"
      />

      <TextAreaInputField
        form={form}
        name="text"
        titleText="Повідомлення"
        placeholder="Напишіть ваше повідомлення"
      />

      <Button
        disabled={!form.formState.isValid}
        size="lg"
        variant="primary"
        classNameContainer={styles.btn}
        type="submit"
      >
        Відправити
      </Button>
    </form>
  );
};
