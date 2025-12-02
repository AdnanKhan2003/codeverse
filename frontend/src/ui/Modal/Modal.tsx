"use client";

import { createPortal } from 'react-dom';
import { MdClose } from "react-icons/md";

import type { ModalProps } from '@/types/modal';

import styles from './Modal.module.css';
import { MouseEvent, useEffect, useRef, useState } from 'react';

const Modal = ({ children, showModal, onClose }: ModalProps) => {
  const dialogElementRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogElementRef.current;
    if(!dialog) return;

    if (showModal) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      document.body.style.width = "";
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }, [showModal]);


  return (
    <dialog ref={dialogElementRef} onCancel={onClose} className={`${styles.container__dialog}`}>
      <MdClose className={`${styles.btn__close__modal}`} onClick={onClose} />
      {showModal && children}
    </dialog>
  )
}

const ModalPortal = ({ children, showModal, onClose }: ModalProps) => {
    const [ modalRoot, setModalRoot ] = useState<HTMLElement | null>(null);

    useEffect(() => {
      const root = document.getElementById("modal__root");
      setModalRoot(root);
    }, []);

    if(!modalRoot) return;

    return (
        createPortal(<Modal showModal={showModal} onClose={onClose}>{children}</Modal>, modalRoot)
    );
};

export default ModalPortal;