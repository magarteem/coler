"use client";

import { Button } from "@/app/shared/ui/button/Button";
import styles from "./goBack.module.scss";
import { ArrowGoBack } from "@/public/images";
import { redirect } from "next/navigation";

export const GoBack = () => {
  return (
    <Button
      iconLeft={<ArrowGoBack width={16} height={16} />}
      type="button"
      variant="ghost"
      classNameContainer={styles.customStyleBtn}
      onClick={() => redirect("/auth")}
    >
      Назад
    </Button>
  );
};
