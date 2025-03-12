"use client";

import cn from "classnames";
import styles from "./switcherPrise.module.scss";

interface Props {
  stateSwitch: boolean;
  setStateSwitch: (result: boolean) => void;
}
export const SwitcherPrise = ({ stateSwitch, setStateSwitch }: Props) => {
  return (
    <div
      className={cn(
        styles.plan,
        stateSwitch ? styles.stateSwitchOn : styles.stateSwitchOff
      )}
    >
      <div onClick={() => setStateSwitch(true)} className={styles.mount}>
        Місяць
      </div>

      <div onClick={() => setStateSwitch(false)} className={styles.discount}>
        <p className={styles.year}>Рік</p>
        <p className={styles.sum}>до -60%</p>
      </div>
    </div>
  );
};
