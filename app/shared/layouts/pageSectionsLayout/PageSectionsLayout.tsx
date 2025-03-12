import cn from "classnames";
import styles from "./pageSectionsLayout.module.scss";

type Props = {
  children: React.ReactNode;
  classNamesContainer?: string;
};

export const PageSectionsLayout = ({
  children,
  classNamesContainer,
}: Props) => {
  return (
    <section className={cn(styles.pageSectionsLayout, classNamesContainer)}>
      {children}
    </section>
  );
};
