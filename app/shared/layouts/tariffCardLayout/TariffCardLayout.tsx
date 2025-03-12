import styles from "./tariffCardLayout.module.scss";
import cn from "classnames";
import { Check } from "@/public/images";
import { ByButton } from "@/app/features/byButton/ByButton";
import { Plan } from "../../types/plan";

type Props = {
  tariffItem: Plan;
  stateSwitch: boolean;
};

const lib = {
  Initial: "Початковий",
  Extended: "Розширений",
  Base: "Базовий",
  Advanced: "Просунутий",
};
export const TariffCardLayout = ({ tariffItem, stateSwitch }: Props) => {
  const myPlan = tariffItem.title === "Base";

  return (
    <div
      className={cn(styles.tariffCardLayout, {
        [styles.bkgTariff]: tariffItem.title === "Base",
      })}
    >
      <div className={styles.tariffName}>
        <h2 className={styles.tariffNameText}>{lib[tariffItem.title]}</h2>
        {!stateSwitch && <span className={styles.discount}>-60%</span>}
      </div>

      <div className={styles.price}>
        <span className={styles.sum}>
          {stateSwitch ? tariffItem.annualCost : tariffItem.baseCost}
        </span>
        <span className={styles.tearText}>грн/міс</span>
        {!stateSwitch && (
          <p className={styles.benefit}>
            <s>{tariffItem.annualCost} грн/рік</s>
            <span>{tariffItem.annualCostPromo} грн/рік</span>
            {/*<s>{tariffItem.benefit.from} грн/рік</s>
          <span>{tariffItem.benefit.to} грн/рік</span>*/}
          </p>
        )}
      </div>

      <div className={styles.tariffIncludes}>
        <h3 className={styles.title}>Тариф включає:</h3>

        <div className={styles.includesItem}>
          {tariffItem.planOptions.base.map((x) => (
            <div key={x} className={styles.item}>
              <div className={styles.icon}>
                <Check width={16} height={16} />
              </div>
              <p>{x}</p>
            </div>
          ))}
        </div>
      </div>

      {!!tariffItem?.costOfCompensation && (
        <div className={styles.compensation}>
          <h3 className={styles.title}>Сума компенсації</h3>
          <p>{tariffItem.costOfCompensation.toLocaleString("ru-RU")} грн</p>
        </div>
      )}

      {!!tariffItem.planOptions.additional.length && (
        <div className={styles.phoneProtection}>
          <Check width={16} height={16} />
          {tariffItem.planOptions.additional.map((x) => (
            <p key={x}>{x}</p>
          ))}
        </div>
      )}

      {!!tariffItem.costOfCompensationOptions && (
        <div className={styles.compensation}>
          <h3 className={styles.title}>Сума компенсації</h3>
          <p>
            {tariffItem.costOfCompensationOptions.toLocaleString("ru-RU")} грн
          </p>
        </div>
      )}

      <ByButton myPlan={myPlan} />
    </div>
  );
};
