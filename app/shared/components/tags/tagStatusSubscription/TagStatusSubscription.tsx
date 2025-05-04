import styles from "./tagStatusSubscription.module.scss";
import cn from "classnames";

interface PropsTag {
  type: boolean;
}

export const TagStatusSubscription = ({ type }: PropsTag) => {
  return (
    <div className={cn(styles.tagStatusSubscription, styles["active"])}>
      {type ? "Активна" : "Не активна"}
    </div>
  );
};
