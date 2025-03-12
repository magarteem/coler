import styles from "./mainContentLayout.module.scss";

type Props = {
  children: React.ReactNode;
};

export const MainContentLayout = ({ children }: Props) => {
  return <div className={styles.mainContentLayout}>{children}</div>;
};
