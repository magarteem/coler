import cn from "classnames";
import Image from "next/image";
import styles from "./authLayout.module.scss";
import ImgPreview from "@/images/imgPreview.webp";
type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <main className={styles.authLayout}>
      <section className={cn(styles.positionContent, styles.imgScreen)}>
        <Image src={ImgPreview} alt="ImgPreview" />
      </section>
      <section className={styles.positionContent}>{children}</section>;
    </main>
  );
};
