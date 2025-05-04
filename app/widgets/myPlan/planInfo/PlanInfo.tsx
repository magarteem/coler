import { TagStatusSubscription } from "@/app/shared/components/tags/tagStatusSubscription/TagStatusSubscription";
import styles from "./planStyles.module.scss";
import { planLibraryName } from "@/app/shared/helpers/planLibraryName";
import { PlanType } from "@/app/shared/types/plan";
import { MyPlanType } from "@/app/shared/types/myPlanType";
import cn from "classnames";

interface Props {
  plan: MyPlanType;
  planData: PlanType;
}

export const PlanInfo = ({ plan, planData }: Props) => {
  return (
    <div className={cn(styles.gridPosition)}>
      <TagStatusSubscription type={plan.active} />
      <p />
      <p className={styles.title}>Назва тарифу</p>
      <p className={styles.title}>Цінау</p>

      <p className={styles.text}>{planLibraryName[planData.title]}</p>

      <p className={styles.text}>{planData.baseCost} грн/міс</p>
    </div>
  );
};
