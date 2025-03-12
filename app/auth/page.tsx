import styles from "./auth.module.scss";
import { Logo } from "@/app/shared/ui/link/logo/Logo";
import { Button } from "@/app/shared/ui/button/Button";
import { LinkElement } from "@/app/shared/ui/link/LinkElement";
import Link from "next/link";
import cn from "classnames";
import { RouteNames } from "@/app/shared/types/RouteNames";

export default function Login() {
  return (
    <div className={styles.fromLogin}>
      <Logo size="lg" />

      <LinkElement
        to={RouteNames.LOGIN}
        classNameContainer={styles.customMargin}
      >
        <Button variant="outline" type="button" size="full_width_btn">
          Увійти
        </Button>
      </LinkElement>

      <LinkElement to={RouteNames.REGISTRATION}>
        <Button variant="ghost" type="button" classNameContainer={styles.info}>
          Зареєструватися
        </Button>
      </LinkElement>

      <div className={styles.privacy}>
        Реєструючись ви погоджуєтеся з
        <Link href="/#" className={styles.linkText}>
          Умовами використання
        </Link>
        та
        <Link href="/#" className={cn(styles.linkText, styles.block)}>
          Політикою конфіденційності
        </Link>
      </div>
    </div>
  );
}
