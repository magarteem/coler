import styles from "./blockColorLayout.module.scss";
import cn from "classnames";

interface Props {
  children: React.ReactNode;
  classNamesContainer?: string;
}

export const BlockColorLayout = ({ children, classNamesContainer }: Props) => {
  return (
    <div className={cn(styles.blockColorLayout, classNamesContainer)}>
      {children}
    </div>
  );
};
