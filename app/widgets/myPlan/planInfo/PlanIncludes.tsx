import cn from "classnames";
import styles from "./planStyles.module.scss";
import { PlanType } from "@/app/shared/types/plan";
import { libPlanOptions } from "@/app/shared/helpers/libPlanOptions";

interface Props {
  planData: PlanType;
}

export const PlanIncludes = ({ planData }: Props) => {
  return (
    <div
      className={cn(
        !!planData.costOfCompensation
          ? styles.gridPosition
          : styles.gridPositionOneColumn
      )}
    >
      <p className={cn(styles.title, styles.tariffEnableTitle)}>
        Тариф включає
      </p>
      {!!planData.costOfCompensation && (
        <p className={styles.title}>Сума компенсації</p>
      )}
      <div className={styles.flexGap}>
        {planData.planOptions.base.map((x) => (
          <p key={x} className={styles.text}>
            {libPlanOptions[x]}
          </p>
        ))}
      </div>
      {!!planData.costOfCompensation && (
        <p className={styles.text}>
          {planData.costOfCompensation.toLocaleString("ru-RU")} грн
        </p>
      )}
    </div>
  );
};
