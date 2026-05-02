import { useModal } from "@app/modals/useModal";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const { openModals, closeModal } = useModal();

  return (
    <>
      {children}
      {openModals?.map((modal) => {
        const ModalComponent = modal.component;
        return (
          <ModalComponent
            key={modal.modalId}
            {...modal.payload} // Pass dynamic payload here
            onClose={() => closeModal(modal.modalId)}
          />
        );
      })}
    </>
  );
};
