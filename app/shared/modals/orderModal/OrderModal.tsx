"use client";

import { z } from "zod";
import styles from "./orderModal.module.scss";
import { PropsModalData, useModal } from "@/app/core/provider/ModalProvider";
import { Button } from "../../ui/button/Button";
import { Title } from "../../ui/title/Title";
import { InfoBlockTariff } from "@/app/features/infoBlockTariff/InfoBlockTariff";
import { Check, ErrorIcon, SuccessIcon } from "@/public/images";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PromoCodeField } from "./formFields/TextInputField";
import { validateCoupon } from "../../api/validateCoupon";
import { sendPromoCode } from "../../api/sendPromoCode";
import { useSession } from "next-auth/react";
import { revalidatePlan } from "../../api/revalidatePlan/revalidatePlan";
import { planLibraryName } from "../../helpers/planLibraryName";
import { ResponseValidateCoupon } from "../../types/responseValidateCoupon";

const icon = {
  success: <Check className={styles.iconSuccess} />,
  error: <ErrorIcon />,
  warning: <ErrorIcon className={styles.iconWarning} />,
};

const schemePhoneZod = z.object({
  promoCode: z.string().min(1, "minimum number of characters 1"),
});

export type ValidationSchema = z.infer<typeof schemePhoneZod>;

export const OrderModal = ({ data }: { data: PropsModalData }) => {
  const { update } = useSession();
  const { openModal } = useModal();
  const [checkPromoCode, setCheckPromoCode] = useState<
    "success" | "error" | "warning" | undefined
  >();
  const [validatePlan, setValidatePlan] = useState<ResponseValidateCoupon>();

  const form = useForm<ValidationSchema>({
    defaultValues: {
      promoCode: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schemePhoneZod),
  });

  const valueInput = form.watch("promoCode").trim();

  const validateCode = async () => {
    const { response, error } = await validateCoupon(valueInput);

    if (error) {
      form.setError("promoCode", { message: "Invalid promo code" });
      setCheckPromoCode("error");
    } else {
      form.clearErrors();
      if (response?.plan.id !== data.plan?.id) {
        setValidatePlan(response);
        setCheckPromoCode("warning");
      } else setCheckPromoCode("success");
    }
  };

  const onSubmit = async (formData: ValidationSchema) => {
    const { response, error } = await sendPromoCode(formData.promoCode.trim());

    if (error) {
      console.log("Error apply Code");
    } else {
      if (response) {
        await update({
          accessToken: response.acessToken,
          refreshToken: response.refreshToken,
          activeSubscriptions: response.activeSubscriptions,
          phone: response.phone,
        }).then(async () => {
          await revalidatePlan();
        });
      }
    }

    openModal("actionModal", {
      modalTitle: checkPromoCode === "success" ? "Вітаємо!" : "Увага!",
      iconModalTitle: error ? <ErrorIcon /> : <SuccessIcon />,
      size: "sm",
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.orderModal}>
      {data.plan && (
        <div className={styles.infoOrder}>
          <InfoBlockTariff
            planData={data.plan}
            textTitle="Інформація про замовлення"
            fzTitle={16}
          />
        </div>
      )}

      <div className={styles.promoCode}>
        <Title text="Використати Промокод" fs={16} fw={600} />
        <div className={styles.promoCodeFields}>
          <div className={styles.widthSizeInput}>
            {/*<InputField
              icon={checkPromoCode && !!inputValue && icon[checkPromoCode]}
              titleText="Промокод"
              placeholder="Введіть свій промокод"
              errorText="44444443"
              onChange={(e) => setInputValue(e.currentTarget.value)}
              value={inputValue}
            />*/}

            <PromoCodeField
              form={form}
              disabled={checkPromoCode === "success"}
              name="promoCode"
              titleText="Промокод"
              placeholder="Введіть свій промокод"
              icon={checkPromoCode && icon[checkPromoCode]}
            />
          </div>

          <Button
            size="lg"
            variant="outline"
            classNameContainer={styles.btn}
            disabled={checkPromoCode === "success" || !valueInput}
            type="button"
            onClick={validateCode}
          >
            Застосувати
          </Button>
        </div>

        {!!valueInput && checkPromoCode === "success" ? (
          <p className={styles.textNotesSuccess}>
            Промокод дійсний. Будь ласка, перевірте інформацію про тариф та
            натисніть Сплатити
          </p>
        ) : checkPromoCode === "warning" ? (
          <p className={styles.textNotesWarning}>
            Цей промокод призначений для тарифу
            <a href="#" className={styles.colorOther}>
              {validatePlan && planLibraryName[validatePlan.plan.title]}
            </a>
            . Щоб скористуватися промокодом,
            <a href="#" className={styles.colorOther}>
              перейти сюди
            </a>
          </p>
        ) : checkPromoCode === "error" ? (
          <p className={styles.textNotesError}>
            Промокод не дійсний. Будь ласка, перевірте та повторіть спробу
          </p>
        ) : (
          ""
        )}
      </div>

      <div className={styles.howMatch}>
        <Title text="Всього до оплати:" fs={16} fw={600} />
        <Title
          text={`${
            data.stateSwitch ? data.plan?.annualCost : data.plan?.baseCost
          } грн`}
          fs={16}
          fw={600}
        />
      </div>

      <Button
        size="lg"
        variant="primary"
        classNameContainer={styles.btn}
        type="submit"
      >
        Сплатити
      </Button>
    </form>
  );
};
