"use client";

import { PlanType } from "@/app/shared/types/plan";
import React, { createContext, useState, useContext, ReactNode } from "react";

export type ModalIdType =
  | "writeToSupport"
  | "promoCodeModal"
  | "actionModal"
  | "orderModal";

export interface PropsModalData {
  success?: boolean;
  stateSwitch?: boolean;
  modalTitle?: string;
  iconModalTitle?: React.ReactNode;
  size?: "sm" | "md" | "auto";
  classNames?: string;
  plan?: PlanType;
  //buttonAction: {
  //  name: string;
  //  fu: () => void;
  //};
}

interface ModalState {
  isOpen: boolean;
  modalId: ModalIdType | null;
  data?: PropsModalData | null;
}

interface ModalContextType {
  modal: ModalState;
  openModal: (name: ModalIdType, data: PropsModalData) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  modal: { isOpen: false, modalId: null, data: null },
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    modalId: null,
    data: null,
  });

  const openModal = (name: ModalIdType, data: PropsModalData) => {
    setModal({ isOpen: true, modalId: name, data: data });
  };
  const closeModal = () =>
    setModal({ isOpen: false, modalId: null, data: null });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => useContext(ModalContext);
