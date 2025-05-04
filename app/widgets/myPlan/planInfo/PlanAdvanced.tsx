import styles from "./planStyles.module.scss";
import { PlanType } from "@/app/shared/types/plan";
import { libPlanOptionsAdditional } from "@/app/shared/helpers/libPlanOptions";

interface Props {
  planData: PlanType;
}

export const PlanAdvanced = ({ planData }: Props) => {
  return (
    <div className={styles.gridPosition}>
      <p className={styles.title}>Додатково</p>
      {!!planData.costOfCompensationOptions && (
        <p className={styles.title}>Сума компенсації</p>
      )}

      <div className={styles.flexGap}>
        {planData.planOptions.additional.map((x) => (
          <p key={x} className={styles.text}>
            {libPlanOptionsAdditional[x]}
          </p>
        ))}
      </div>

      {!!planData.costOfCompensationOptions && (
        <p className={styles.text}>
          {planData.costOfCompensationOptions.toLocaleString("ru-RU")} грн
        </p>
      )}
    </div>
  );
};
