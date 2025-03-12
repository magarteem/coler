import { LogoIcons } from "@/public/images";
import styles from "./logo.module.scss";
import Image from "next/image";
import cn from "classnames";

interface Props {
  classNameContainer?: string;
  size?: "sm" | "md" | "lg";
}
export const Logo = ({ classNameContainer, size = "md" }: Props) => {
  return (
    <div className={cn(styles.logo, styles[size], classNameContainer)}>
      <Image
        src={LogoIcons}
        alt="logo"
        width={30}
        height={30}
        className={styles.icon}
      />

      <p className={styles.name}>ШахрайСтоп</p>
    </div>
  );
};
