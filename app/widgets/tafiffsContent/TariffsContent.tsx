"use client";

import styles from "./tariffsContent.module.scss";
import { SwitcherPrise } from "@/app/shared/components/switcherPrise/SwitcherPrise";
import { TariffCardLayout } from "@/app/shared/layouts/tariffCardLayout/TariffCardLayout";
import { TariffGallery } from "@/app/entities/tariffGallery/TariffGallery";
import { useState } from "react";
import { PlanType } from "@/app/shared/types/plan";
import { MyPlanType } from "@/app/shared/types/myPlanType";

interface Props {
  data: PlanType[];
  myPlan: MyPlanType[];
}
export const TariffsContent = ({ data, myPlan }: Props) => {
  const [stateSwitch, setStateSwitch] = useState(false);

  if (!data?.length) {
    return <p>Loading...</p>;
  }

  const sort = data.sort(
    (accumulator, currentValue) => accumulator.id - currentValue.id
  );
  return (
    <>
      <SwitcherPrise
        stateSwitch={stateSwitch}
        setStateSwitch={setStateSwitch}
      />

      <div className={styles.forDesktop}>
        {/* for Desktop */}
        {sort.map((x) => (
          <TariffCardLayout
            myPlan={myPlan[0]}
            key={x.id}
            tariffItem={x}
            stateSwitch={stateSwitch}
          />
        ))}
      </div>

      <div className={styles.forMobile}>
        {/* for Mobile */}
        <TariffGallery stateSwitch={stateSwitch} data={sort} myPlan={myPlan} />
      </div>
    </>
  );
};
