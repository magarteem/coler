import { PropsModalData, useModal } from "@/app/core/provider/ModalProvider";
import styles from "./orderModal.module.scss";
import { Button } from "../../ui/button/Button";
import { Title } from "../../ui/title/Title";
import { InfoBlockTariff } from "@/app/features/infoBlockTariff/InfoBlockTariff";
import { Check, ErrorIcon, SuccessIcon } from "@/public/images";
import { useState } from "react";
import { InputField } from "../../ui/input/InputField";

const icon = {
  success: <Check className={styles.iconSuccess} />,
  error: <ErrorIcon />,
  warning: <ErrorIcon className={styles.iconWarning} />,
};

export const OrderModal = ({ data }: { data: PropsModalData }) => {
  const { openModal } = useModal();
  const [inputValue, setInputValue] = useState("");
  const [checkPromoCode, setCheckPromoCode] = useState<
    "success" | "error" | "warning" | undefined
  >();

  const sendPromoCode = () => {
    setCheckPromoCode("success");
  };
  const click = () => {
    openModal("actionModal", {
      modalTitle: checkPromoCode === "success" ? "Вітаємо!" : "Увага!",
      iconModalTitle:
        checkPromoCode === "success" ? <SuccessIcon /> : <ErrorIcon />,
      size: "sm",
    });
  };

  return (
    <form action={click} className={styles.orderModal}>
      <div className={styles.infoOrder}>
        <InfoBlockTariff textTitle="Інформація про замовлення" fzTitle={16} />
      </div>

      <div className={styles.promoCode}>
        <Title text="Використати Промокод" fs={16} fw={600} />
        <div className={styles.promoCodeFields}>
          <div className={styles.widthSizeInput}>
            <InputField
              icon={checkPromoCode && !!inputValue && icon[checkPromoCode]}
              titleText="Промокод"
              placeholder="Введіть свій промокод"
              errorText="44444443"
              onChange={(e) => setInputValue(e.currentTarget.value)}
              value={inputValue}
            />
          </div>

          <Button
            size="lg"
            variant="outline"
            classNameContainer={styles.btn}
            disabled={!inputValue}
            type="button"
            onClick={sendPromoCode}
          >
            Застосувати
          </Button>
        </div>

        {!!inputValue &&
          checkPromoCode &&
          (checkPromoCode === "success" ? (
            <p className={styles.textNotesSuccess}>
              Промокод дійсний. Будь ласка, перевірте інформацію про тариф та
              натисніть Сплатити
            </p>
          ) : checkPromoCode === "warning" ? (
            <p className={styles.textNotesWarning}>
              Цей промокод призначений для тарифу{" "}
              <a href="#" className={styles.colorOther}>
                Початковий
              </a>
              . Щоб скористуватися промокодом,{" "}
              <a href="#" className={styles.colorOther}>
                перейти сюди
              </a>
            </p>
          ) : (
            <p className={styles.textNotesError}>
              Промокод не дійсний. Будь ласка, перевірте та повторіть спробу
            </p>
          ))}
      </div>

      <div className={styles.howMatch}>
        <Title text="Всього до оплати:" fs={16} fw={600} />
        <Title text="95 грн" fs={16} fw={600} />
      </div>

      <Button
        size="lg"
        variant="primary"
        classNameContainer={styles.btn}
        type="submit"
        //disabled={!!inputValue && checkPromoCode !== "success"}
      >
        Сплатити
      </Button>
    </form>
  );
};
