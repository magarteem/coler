import cn from "classnames";
import styles from "./myPlanLayout.module.scss";
import { PlanType } from "@/app/shared/types/plan";
import { MyPlanType } from "@/app/shared/types/myPlanType";
import { PlanInfo } from "./planInfo/PlanInfo";
import { PlanIncludes } from "./planInfo/PlanIncludes";
import { PlanAdvanced } from "./planInfo/PlanAdvanced";
import { PlanDateOfIssue } from "./planInfo/PlanDateOfIssue";
import { BlockColorLayout } from "@/app/shared/layouts/blockColorLayout/BlockColorLayout";

interface Props {
  plan: MyPlanType;
  planData: PlanType;
}
export const MyPlanLayout = ({ plan, planData }: Props) => {
  return (
    <BlockColorLayout
      classNamesContainer={cn(styles.positionContent, {
        [styles.otherColorBlock]: planData.title === "Advanced",
      })}
    >
      <PlanInfo plan={plan} planData={planData} />

      <PlanIncludes planData={planData} />

      {(!!planData.costOfCompensationOptions ||
        !!planData.planOptions.additional.length) && (
        <PlanAdvanced planData={planData} />
      )}
      <PlanDateOfIssue plan={plan} />
    </BlockColorLayout>
  );
};
