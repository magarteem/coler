"use client";

import { PropsModalData, useModal } from "@/app/core/provider/ModalProvider";
import styles from "./actionModal.module.scss";
import { Button } from "../../ui/button/Button";

export const ActionModal = ({ data }: { data: PropsModalData }) => {
  const { closeModal } = useModal();
  const click = () => closeModal();

  return (
    <form action={click} className={styles.actionModal}>
      {data.success ? (
        <p className={styles.text}>
          Оплата пройшла успішно! <br />
          Тарифний план Просунутий активовано.
        </p>
      ) : (
        <p className={styles.text}>
          Оплата не пройшла! Будь ласка, перевірте дані та повторіть операцію
        </p>
      )}

      <Button
        size="lg"
        variant="primary"
        classNameContainer={styles.btn}
        type="submit"
      >
        Закрити
      </Button>
    </form>
  );
};
