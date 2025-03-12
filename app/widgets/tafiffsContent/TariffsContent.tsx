"use client";

import styles from "./tariffsContent.module.scss";
import { SwitcherPrise } from "@/app/shared/components/switcherPrise/SwitcherPrise";
import { TariffCardLayout } from "@/app/shared/layouts/tariffCardLayout/TariffCardLayout";
import { TariffGallery } from "@/app/entities/tariffGallery/TariffGallery";
import { useState } from "react";
import { PlanType } from "@/app/shared/types/plan";

interface Props {
  data: PlanType[] | undefined;
}
export const TariffsContent = ({ data }: Props) => {
  const [stateSwitch, setStateSwitch] = useState(false);

  if (!data?.length) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <SwitcherPrise
        stateSwitch={stateSwitch}
        setStateSwitch={setStateSwitch}
      />

      <div className={styles.forDesktop}>
        {/* for Desktop */}
        {data.map((x) => (
          <TariffCardLayout
            key={x.id}
            tariffItem={x}
            stateSwitch={stateSwitch}
          />
        ))}
      </div>

      <div className={styles.forMobile}>
        {/* for Mobile */}
        <TariffGallery stateSwitch={stateSwitch} data={data} />
      </div>
    </>
  );
};
