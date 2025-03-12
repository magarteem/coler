"use client";

import cn from "classnames";
import { Logo } from "@/app/shared/ui/link/logo/Logo";
import { NavigationBlock } from "./navigationBlock/NavigationLink";
import styles from "./sideBarMobile.module.scss";
import { Button } from "@/app/shared/ui/button/Button";
import { useModal } from "@/app/core/provider/ModalProvider";
import { Close } from "@/public/images";

interface Props {
  showSideBar: () => void;
  mobileSideBar: boolean;
}
export const SideBarMobile = ({ showSideBar, mobileSideBar }: Props) => {
  const { openModal } = useModal();

  const openModalFu = () => {
    openModal("writeToSupport", {
      modalTitle: "Написати в підтримку",
    });
  };

  return (
    <>
      <div
        className={cn(styles.bkg, { [styles.showSideBar]: mobileSideBar })}
        onClick={showSideBar}
      />
      <div
        className={cn(styles.sideBarMobile, {
          [styles.showSideBar]: mobileSideBar,
        })}
      >
        <div className={styles.popUpHeader}>
          <Logo size="sm" />

          <Close onClick={showSideBar} className={styles.iconClose} />
        </div>

        <div className={styles.navigationBlock}>
          <NavigationBlock showSideBar={showSideBar} />

          <div className={styles.btnWrap}>
            <Button
              onClick={openModalFu}
              size="full_width_btn"
              variant="outline"
            >
              Написати в підтримку
            </Button>
          </div>
        </div>

        <div className={styles.terms}>
          <div className={styles.privacy}>
            <p>Політика конфіденційності</p>
            <p>Умови використання</p>
          </div>

          <p className={styles.rights}>2025 ШахрайСтоп. Всі права захищені</p>
        </div>
      </div>
    </>
  );
};
