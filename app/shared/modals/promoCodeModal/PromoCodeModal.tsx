"use client";

import { z } from "zod";
import { PropsModalData, useModal } from "@/app/core/provider/ModalProvider";
import styles from "./promoCodeModal.module.scss";
import { Button } from "../../ui/button/Button";
import { useState } from "react";
import { Check, ErrorIcon, SuccessIcon } from "@/public/images";
import { InfoBlockTariff } from "@/app/features/infoBlockTariff/InfoBlockTariff";
import { sendPromoCode } from "../../api/sendPromoCode";
import { validateCoupon } from "../../api/validateCoupon";
import { ResponseValidateCoupon } from "../../types/responseValidateCoupon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PromoCodeField } from "./formFields/TextInputField";
import { useSession } from "next-auth/react";
import { revalidatePlan } from "../../api/revalidatePlan/revalidatePlan";

const schemePhoneZod = z.object({
  promoCode: z.string().min(1, "minimum number of characters 1"),
});

export type ValidationSchema = z.infer<typeof schemePhoneZod>;

export const PromoCodeModal = ({ data }: { data: PropsModalData }) => {
  const { update } = useSession();
  const { openModal } = useModal();

  const [planThisCode, setPlanThisCode] = useState<
    ResponseValidateCoupon | undefined
  >();
  const [isValidPromoCode, setIsValidPromoCode] = useState(false);

  const form = useForm<ValidationSchema>({
    defaultValues: {
      promoCode: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schemePhoneZod),
  });

  const setPromoCode = (doneActivateCode: boolean) => {
    openModal("actionModal", {
      success: doneActivateCode,
      modalTitle: doneActivateCode ? "Вітаємо!" : "Увага!",
      iconModalTitle: doneActivateCode ? <SuccessIcon /> : <ErrorIcon />,
      size: "sm",
    });
  };

  const onSubmit = async (formData: ValidationSchema) => {
    if (!planThisCode) {
      const { response, error, status } = await validateCoupon(
        formData.promoCode.trim()
      );

      if (error) {
        form.setError("promoCode", { message: "Invalid promo code" });
      } else {
        setPlanThisCode(response);
        setIsValidPromoCode(true);
      }
    } else {
      //activate code
      const { response, error } = await sendPromoCode(
        formData.promoCode.trim()
      );
      if (error) {
        setPromoCode(false);
      } else {
        //if (response) {
        //  await signIn("credentials", {
        //    redirect: false,
        //    token: response.acessToken,
        //    code: "1234", // если требуется
        //  }).then(async () => {
        //    await revalidatePlan();
        //  });
        //}

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
        setPromoCode(true);
      }
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={styles.promoCodeModal}
    >
      <div>
        <PromoCodeField
          form={form}
          disabled={isValidPromoCode}
          name="promoCode"
          titleText="Промокод"
          placeholder="Введіть свій промокод"
          icon={
            planThisCode && (
              <Check className={styles.iconSuccess} width={16} height={16} />
            )
          }
        />

        {planThisCode && (
          <p className={styles.text}>
            Промокод дійсний. Будь ласка, перевірте інформацію про тариф та
            натисніть “Підтвердити”
          </p>
        )}
      </div>

      {planThisCode && <InfoBlockTariff planData={planThisCode.plan} />}

      <Button
        size="lg"
        variant="primary"
        classNameContainer={styles.btn}
        type="submit"
        disabled={!form.formState.isValid}
      >
        {planThisCode ? "Підтвердити" : "Застосувати"}
      </Button>
    </form>
  );
};
