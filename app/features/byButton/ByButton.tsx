"use client";

import { Button } from "@/app/shared/ui/button/Button";
import styles from "./byButton.module.scss";
import { useModal } from "@/app/core/provider/ModalProvider";
import { Basket } from "@/public/images";

interface Props {
  myPlan?: boolean;
}
export const ByButton = ({ myPlan }: Props) => {
  const { openModal } = useModal();

  const setPromoCode = () => {
    openModal("orderModal", {
      modalTitle: "Замовлення",
      iconModalTitle: <Basket />,
    });
  };

  return (
    <div className={styles.btnWrap}>
      <Button
        size="md"
        variant="primary"
        classNameContainer={styles.btnCard}
        onClick={setPromoCode}
        disabled={myPlan}
      >
        {myPlan ? "Купити" : "Дізнатись"}
      </Button>
    </div>
  );
};
