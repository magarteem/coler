"use client";

import { useModal } from "@/app/core/provider/ModalProvider";
import { MyPlanType } from "@/app/shared/types/myPlanType";
import { Button } from "@/app/shared/ui/button/Button";
import { PromoCodeIcon } from "@/public/images";

interface Props {
  text: string;
  myPlan: MyPlanType[] | undefined;
}

export const SendPromoCodeBtn = ({ myPlan, text }: Props) => {
  const { openModal } = useModal();

  const setPromoCode = () => {
    openModal("promoCodeModal", {
      modalTitle: "Промокод",
      iconModalTitle: <PromoCodeIcon />,
    });
  };

  return (
    <Button
      disabled={myPlan && myPlan.length > 0}
      size="md"
      variant="primary"
      onClick={setPromoCode}
    >
      {text}
    </Button>
  );
};
