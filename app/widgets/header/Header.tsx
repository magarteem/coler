"use client";

import { Button } from "@/app/shared/ui/button/Button";
import styles from "./header.module.scss";
import { usePathname } from "next/navigation";
import { RouteNames } from "@/app/shared/types/RouteNames";
import { Logo } from "@/app/shared/ui/link/logo/Logo";
import { useModal } from "@/app/core/provider/ModalProvider";
import { LogOut, MobileMenu, PromoCodeIcon } from "@/public/images";
import { SideBarMobile } from "../sideBar/SideBarMobile";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const ROUTE_TITLES: Record<string, string> = {
  [RouteNames.HOME]: "Профайл",
  [RouteNames.SUBSCRIPTION]: "Підписка",
  [RouteNames.TARIFFS]: "Тарифи",
};

export const Header = () => {
  //const session = useSession();
  //
  //console.log("session", session);
  const { openModal } = useModal();
  const pathName = usePathname();
  const [mobileSideBar, setMobileSideBar] = useState(false);

  const checkPage = pathName === RouteNames.TARIFFS;

  const setPromoCode = () => {
    openModal("promoCode", {
      modalTitle: "Промокод",
      iconModalTitle: <PromoCodeIcon />,
    });
  };

  const showSideBar = () => setMobileSideBar((prev) => !prev);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerForMobile}>
          <Logo size="sm" />

          <MobileMenu
            width={24}
            height={24}
            title="Logo"
            onClick={showSideBar}
            className={styles.iconBurger}
          />
        </div>

        <div className={styles.headerForDesktop}>
          <h1 className={styles.thisPage}>{ROUTE_TITLES[pathName]}</h1>

          {checkPage ? (
            <Button size="md" variant="primary" onClick={setPromoCode}>
              Використати промокод
            </Button>
          ) : (
            <Button
              icon={<LogOut />}
              size="md"
              variant="primary"
              onClick={() => signOut()}
            >
              Вийти
            </Button>
          )}
        </div>
      </header>

      <SideBarMobile showSideBar={showSideBar} mobileSideBar={mobileSideBar} />
    </>
  );
};
