"use client";

import { createPortal } from 'react-dom';

import type { ModalProps } from '@/app/types/modal';

import styles from './Modal.module.css';

const Modal = ({ children, showModal, onClose }: ModalProps) => {
  return (
    <dialog>{children}</dialog>
  )
}

const ModalPortal = ({ children, showModal, onClose }: ModalProps) => {
    const modalRoot = document.getElementById("modal__root");

    if(!modalRoot) return;

    return (
        createPortal(<Modal showModal={showModal} onClose={onClose}>{children}</Modal>, modalRoot)
    );
};

export default ModalPortal;