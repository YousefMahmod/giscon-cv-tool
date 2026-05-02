// src/modals/useModal.tsx
import { create } from "zustand";
import type { ModalPayloadMap } from ".";

export const useModal = create<ModalStore>((set) => ({
  modals: {},
  openModals: [],

  registerModal: (modalId, modalComponent) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: { component: modalComponent } },
    })),
  openModal: (modalId, modalPayload) =>
    set((state) => {
      const existingModal = state.modals[modalId];
      const existingOpenModal = state.openModals?.find(
        (modal) => modal?.modalId === modalId,
      );
      if (existingOpenModal) return state;

      return {
        openModals: [
          ...state.openModals,
          {
            modalId,
            component: existingModal.component,
            payload: modalPayload,
          },
        ],
      };
    }),

  closeModal: (modalId) =>
    set((state) => ({
      openModals: state.openModals.filter((modal) => modal.modalId !== modalId),
    })),
  closeAllModals: () => set(() => ({ openModals: [] })),
  updateModalProps: (modalId, newProps) =>
    set((state) => ({
      openModals: state.openModals.map((modal) =>
        modal.modalId === modalId
          ? { ...modal, payload: { ...modal.payload, ...newProps } }
          : modal,
      ),
    })),
}));

export type ModalID = keyof ModalPayloadMap;

interface ModalInstance {
  modalId: ModalID;
  component: React.FC<any>;
  payload: any;
}

interface ModalStore {
  modals: Record<ModalID, { component: React.FC<any> }>;
  openModals: ModalInstance[];
  registerModal: (modalId: ModalID, modalComponent: React.FC<any>) => void;
  openModal: <T extends ModalID>(
    modalId: T,
    modalPayload?: ModalPayloadMap[T],
  ) => void;
  updateModalProps: <T extends ModalID>(
    modalId: T,
    newProps: Partial<ModalPayloadMap[T]>,
  ) => void;
  closeModal: (modalId: ModalID) => void;
  closeAllModals: () => void;
}
