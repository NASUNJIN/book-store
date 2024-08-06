import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

function Modal({ children, isOpen, onClose }: Props) {
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    // X 버튼 닫기
    const handleClose = () => {
        setIsFadingOut(true); // 진짜 닫긴거 아님
        // onClose();
    };

    // Fadeout
    const handleAnimationEnd = () => {
        if (isFadingOut) {
            onClose();
        }
    };

    // 외부영역 클릭했을 경우 닫기
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleClose();
        }
    };

    // Esc 닫기
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handleClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            setIsFadingOut(false); // 모달이 열릴 때 isFadingOut 상태 초기화
            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <ModalStyle className={isFadingOut ? "fade-out" : "fade-in"} 
            onClick={handleOverlayClick} onAnimationEnd={handleAnimationEnd}
        >
            <div className="modal-body" ref={modalRef}>
                <div className="modal-contents">{children}</div>
                <button className="modal-close" onClick={handleClose}>
                    <FaPlus />
                </button>
            </div>
        </ModalStyle>,
        document.body
    );
};

const ModalStyle = styled.div`
    @keyframes fade-in {
        from {
        opacity: 0;
        }
        to {
        opacity: 1;
        }
    }

    @keyframes fade-out {
        from {
        opacity: 1;
        }
        to {
        opacity: 0;
        }
    }

    &.fade-in {
        animation: fade-in 0.3s ease-in-out forwards;
    }

    &.fade-out {
        animation: fade-out 0.3s ease-in-out forwards;
    }

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);

    .modal-body {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);  // x, y 좌표
        padding: 56px 32px;
        border-radius: ${({ theme }) => theme.borderRadius.default};
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

        background-color: #fff;
        max-width: 80%;
    }

    .modal-close {
        border: none;
        background-color: transparent;
        cursor: pointer;
        position: absolute;

        top: 0;
        right: 0;
        padding: 12px;

        svg {
            width: 20px;
            height: 20px;
            transform: rotate(45deg);
        }
    }
`;

export default Modal;