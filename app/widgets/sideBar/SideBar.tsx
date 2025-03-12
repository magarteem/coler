"use client";

import cn from "classnames";
import { Logo } from "@/app/shared/ui/link/logo/Logo";
import { NavigationBlock } from "./navigationBlock/NavigationLink";
import styles from "./sideBar.module.scss";
import { Button } from "@/app/shared/ui/button/Button";
import { useModal } from "@/app/core/provider/ModalProvider";

export const SideBar = () => {
  const { openModal } = useModal();

  const openModalFu = () => {
    openModal("writeToSupport", {
      modalTitle: "Написати в підтримку",
    });
  };

  return (
    <aside className={styles.sideBar}>
      <Logo classNameContainer={styles.customStyles} />

      <div className={styles.navigationBlock}>
        <NavigationBlock />

        <div className={styles.btnWrap}>
          <Button onClick={openModalFu} size="full_width_btn" variant="outline">
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
    </aside>
  );
};
