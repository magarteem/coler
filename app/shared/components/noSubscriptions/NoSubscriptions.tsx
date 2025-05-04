import Link from "next/link";
import styles from "./noSubscriptions.module.scss";
import { RouteNames } from "../../types/RouteNames";

export const NoSubscriptions = () => {
  return (
    <p className={styles.textCreateSub}>
      Активної підписки немає. Щоб придбати підписку
      <Link href={RouteNames.TARIFFS} className={styles.createSubscription}>
        натисніть тут
      </Link>
    </p>
  );
};
