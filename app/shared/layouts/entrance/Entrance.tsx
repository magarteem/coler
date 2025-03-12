import { ReactNode } from "react";
import styles from "./entrance.module.scss";

interface Props {
  title: string;
  notes: string;
  children: ReactNode;
}

export const Entrance = ({ title, notes, children }: Props) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.notes}>{notes}</p>

      {children}
    </>
  );
};
