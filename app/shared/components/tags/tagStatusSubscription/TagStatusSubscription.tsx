import styles from "./tagStatusSubscription.module.scss";
import cn from "classnames";

interface PropsTag {
  type: "active" | "noActive";
}

export const TagStatusSubscription = ({ type }: PropsTag) => {
  const element = (text: string) => {
    return (
      <div className={cn(styles.tagStatusSubscription, styles[type])}>
        {text}
      </div>
    );
  };

  switch (type) {
    case "active":
      return element("Активна");
    default:
      return element("Не активна");
  }
};
