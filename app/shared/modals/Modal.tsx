"use client";

import styles from "./modal.module.scss";
import React, { useEffect } from "react";
import cn from "classnames";
import { useModal } from "@/app/core/provider/ModalProvider";
import { WriteToSupportModal } from "./writeToSupportModal/WriteToSupportModal";
import { Button } from "../ui/button/Button";
import { PromoCodeModal } from "./promoCodeModal/PromoCodeModal";
import { ActionModal } from "./actionModal/ActionModal";
import { OrderModal } from "./orderModal/OrderModal";

export function Modal() {
  const { modal, closeModal } = useModal();

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div
      className={cn(styles.modalWrap, modal.isOpen && styles.active, {
        modalOpen: modal.isOpen,
      })}
    >
      <div className={styles.modalBkg} onClick={() => closeModal()} />
      <div
        className={cn(
          styles.modalContent,
          modal.isOpen && styles.active,
          modal.data?.size ? styles[modal.data.size] : styles.md,
          modal.data?.classNames
        )}
      >
        <div className={styles.titleWrap}>
          {modal.data?.iconModalTitle && modal.data.iconModalTitle}
          <h3 className={styles.titleModal}>{modal.data?.modalTitle}</h3>
        </div>

        {modal.data && (
          <>
            {modal.modalId === "writeToSupport" && <WriteToSupportModal />}

            {modal.modalId === "promoCodeModal" && (
              <PromoCodeModal data={modal.data} />
            )}
            {modal.modalId === "actionModal" && (
              <ActionModal data={modal.data} />
            )}
            {modal.modalId === "orderModal" && <OrderModal data={modal.data} />}
          </>
        )}
      </div>
    </div>
  );
}
