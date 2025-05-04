import { useState } from "react";
import styles from "./infoBlockTariff.module.scss";
import cn from "classnames";
import { ShowMore } from "@/app/shared/components/showMore/ShowMore";
import { Title } from "@/app/shared/ui/title/Title";
import { PlanType } from "@/app/shared/types/plan";
import { planLibraryName } from "@/app/shared/helpers/planLibraryName";
import { addMonths, format } from "date-fns";
import {
  libPlanOptions,
  libPlanOptionsAdditional,
} from "@/app/shared/helpers/libPlanOptions";

interface Props {
  textTitle?: string;
  fzTitle?: number;
  planData: PlanType;
}
export const InfoBlockTariff = ({ textTitle, fzTitle, planData }: Props) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div className={styles.successPromoCode}>
      {textTitle && <Title text={textTitle} fs={fzTitle} fw={600} />}

      <div className={styles.info}>
        <div className={styles.gridPosition}>
          <p className={styles.title}>Назва тарифу</p>
          <p className={styles.title}>Цінау</p>
          <p className={styles.text}>{planLibraryName[planData.title]}</p>
          <p className={styles.text}>{planData.baseCost} грн/міс</p>
          <p className={styles.title}>Дата оформлення</p>
          <p className={styles.title}>Дата наступної оплати</p>
          <p className={styles.text}>{format(new Date(), "dd.MM.yyyy")}</p>
          <p className={styles.text}>
            {format(addMonths(new Date(), 1), "dd.MM.yyyy")}
          </p>
        </div>

        <div
          className={cn(styles.gridShow, {
            [styles.noShow]: !showMoreInfo,
          })}
        >
          <div className={cn(styles.line)} />
          {!!planData.costOfCompensation ? (
            <div className={cn(styles.gridPosition)}>
              <p className={styles.title}>Тариф включає</p>
              <p className={styles.title}>Сума компенсації</p>
              <p className={styles.text}>
                {planData.planOptions.base.map((x) => (
                  <span key={x} className={styles.itemText}>
                    {libPlanOptions[x]}
                  </span>
                ))}
              </p>
              <p className={styles.text}>
                {planData.costOfCompensation.toLocaleString("ru-RU")} грн
              </p>
              {planData.planOptions.additional.length > 0 && (
                <p className={styles.title}>Додатково</p>
              )}
              {!!planData.costOfCompensationOptions && (
                <p className={styles.title}>Сума компенсації</p>
              )}
              {planData.planOptions.additional.length > 0 &&
                planData.planOptions.additional.map((x) => (
                  <p key={x} className={styles.text}>
                    {libPlanOptionsAdditional[x]}
                  </p>
                ))}

              {!!planData.costOfCompensationOptions && (
                <p className={styles.text}>
                  {planData.costOfCompensationOptions.toLocaleString("ru-RU")}{" "}
                  грн
                </p>
              )}
            </div>
          ) : (
            <div className={cn(styles.gridPositionOneColum)}>
              <p className={styles.title}>Тариф включає</p>

              <p className={styles.text}>
                {planData.planOptions.base.map((x) => (
                  <span key={x} className={styles.itemText}>
                    {libPlanOptions[x]}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>

        <ShowMore
          showMoreInfo={showMoreInfo}
          setShowMoreInfo={setShowMoreInfo}
        />
      </div>
    </div>
  );
};
