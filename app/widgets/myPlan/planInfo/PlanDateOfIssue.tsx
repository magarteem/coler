import styles from "./planStyles.module.scss";
import { format } from "date-fns";
import { MyPlanType } from "@/app/shared/types/myPlanType";

interface Props {
  plan: MyPlanType;
}

export const PlanDateOfIssue = ({ plan }: Props) => {
  return (
    <div className={styles.gridPosition}>
      <p className={styles.title}>Дата оформлення</p>
      <p className={styles.title}>Дата наступної оплати</p>
      <p className={styles.text}>{format(plan.startDate, "dd.MM.yyyy")}</p>
      <p className={styles.text}>{format(plan.endDate, "dd.MM.yyyy")}</p>
    </div>
  );
};
