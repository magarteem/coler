"use client";

import styles from "./header.module.scss";
import { usePathname } from "next/navigation";
import { RouteNames } from "@/app/shared/types/RouteNames";
import { Logo } from "@/app/shared/ui/link/logo/Logo";
import { MobileMenu } from "@/public/images";
import { SideBarMobile } from "../sideBar/SideBarMobile";
import { useState } from "react";
import { MyPlanType } from "@/app/shared/types/myPlanType";
import { SendPromoCodeBtn } from "@/app/features/sendPromoCodeBtn/SendPromoCodeBtn";
import { LogOutBtn } from "@/app/features/logOutBtn/LogOutBtn";

const ROUTE_TITLES: Record<string, string> = {
  [RouteNames.HOME]: "Профайл",
  [RouteNames.SUBSCRIPTION]: "Підписка",
  [RouteNames.TARIFFS]: "Тарифи",
};

interface Props {
  myPlan: MyPlanType[] | undefined;
}
export const Header = ({ myPlan }: Props) => {
  const pathName = usePathname();
  const [mobileSideBar, setMobileSideBar] = useState(false);

  const checkPage =
    pathName === RouteNames.TARIFFS || pathName === RouteNames.SUBSCRIPTION;

  const showSideBar = () => setMobileSideBar((prev) => !prev);

  const btnByPlan =
    pathName === RouteNames.TARIFFS ||
    (pathName === RouteNames.SUBSCRIPTION && myPlan && myPlan.length === 0);

  const textBtn =
    pathName === RouteNames.TARIFFS
      ? "Використати промокод"
      : "Купити підписку";

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

          {!checkPage && <LogOutBtn />}
          {btnByPlan && <SendPromoCodeBtn myPlan={myPlan} text={textBtn} />}
        </div>
      </header>

      <SideBarMobile showSideBar={showSideBar} mobileSideBar={mobileSideBar} />
    </>
  );
};

//const setPromoCode = () => {
//  openModal("promoCode", {
//    modalTitle: "Промокод",
//    iconModalTitle: <PromoCodeIcon />,
//  });
//};

//{btnByPlan && (
//  <SendPromoCodeBtn myPlan={myPlan} text={textBtn} />
//  //<Button
//  //  disabled={myPlan && myPlan.length > 0}
//  //  size="md"
//  //  variant="primary"
//  //  onClick={setPromoCode}
//  //>
//  //  Купити підписку
//  //</Button>
//)}
//{pathName === RouteNames.TARIFFS && (
//  <Button
//    disabled={myPlan && myPlan.length > 0}
//    size="md"
//    variant="primary"
//    onClick={setPromoCode}
//  >
//    Використати промокод
//  </Button>
//)}
