import { PropsModalData, useModal } from "@/app/core/provider/ModalProvider";
import styles from "./promoCodeModal.module.scss";
//import { Input } from "../../ui/input/InputField";
import { Button } from "../../ui/button/Button";
import { useState } from "react";
import { Check, ErrorIcon, SuccessIcon } from "@/public/images";
import { InfoBlockTariff } from "@/app/features/infoBlockTariff/InfoBlockTariff";
import { InputField } from "../../ui/input/InputField";

const doneSendData = true;

export const PromoCodeModal = ({ data }: { data: PropsModalData }) => {
  const { openModal } = useModal();
  const [inputValue, setInputValue] = useState("");
  const [checkPromoCode, setCheckPromoCode] = useState(false);

  const setPromoCode = () => {
    openModal("actionModal", {
      modalTitle: doneSendData ? "Вітаємо!" : "Увага!",
      iconModalTitle: doneSendData ? <SuccessIcon /> : <ErrorIcon />,
      size: "sm",
    });
  };

  const click = () => {
    checkPromoCode ? setPromoCode() : setCheckPromoCode(true);
  };

  return (
    <form action={click} className={styles.promoCodeModal}>
      <div>
        <InputField
          icon={
            checkPromoCode && (
              <Check className={styles.iconSuccess} width={16} height={16} />
            )
          }
          titleText="Промокод"
          placeholder="Введіть свій промокод"
          errorText=""
          onChange={(e) => setInputValue(e.currentTarget.value)}
          value={inputValue}
        />

        <p className={styles.text}>
          Промокод дійсний. Будь ласка, перевірте інформацію про тариф та
          натисніть “Підтвердити”
        </p>
      </div>

      {checkPromoCode && <InfoBlockTariff />}

      <Button
        size="lg"
        variant="primary"
        classNameContainer={styles.btn}
        type="submit"
        disabled={!inputValue}
      >
        {checkPromoCode ? "Підтвердити" : "Застосувати"}
      </Button>
    </form>
  );
};
