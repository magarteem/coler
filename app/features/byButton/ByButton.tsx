"use client";

import { Button } from "@/app/shared/ui/button/Button";
import styles from "./byButton.module.scss";
import { useModal } from "@/app/core/provider/ModalProvider";
import { Basket } from "@/public/images";
import { PlanType } from "@/app/shared/types/plan";

interface Props {
  myPlan?: boolean;
  stateSwitch: boolean;
  tariffItem: PlanType;
}
export const ByButton = ({ myPlan, tariffItem, stateSwitch }: Props) => {
  const { openModal } = useModal();

  const setPromoCode = () => {
    openModal("orderModal", {
      modalTitle: "Замовлення",
      iconModalTitle: <Basket />,
      plan: tariffItem,
      stateSwitch: stateSwitch,
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
        {myPlan === undefined ? "Купити" : myPlan ? "Купити" : "Дізнатись"}
      </Button>
    </div>
  );
};
