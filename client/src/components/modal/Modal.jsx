import { useEffect } from 'react';

import '@/App.css'
import styles from './modal.module.css'

import logo from '@/assets/logo.png'
import logoSad from '@/assets/logo-sad.png'

import Btn from "@/components/button/Btn"

const Modal = ({
    onClose,
    title,
    description,
    rewardLabel,
    reward,
    rewardDescription,
    buttons = [],
    type = 'default',
}) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, []);

    return (
        <div
            className={styles.overlay}
            onClick={onClose}
        >
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={
                        type === 'danger'
                            ? logoSad
                            : logo
                    }
                    alt='logo'
                    className={styles.logo}
                />

                <h2 className={styles.title}>
                    {title}
                </h2>

                {description && (
                    <p className={styles.description}>
                        {description}
                    </p>
                )}

                <div className={styles.rewardBox}>
                    <span className={styles.rewardLabel}>
                        {rewardLabel}
                    </span>

                    <div className={styles.reward}>
                        {reward}
                    </div>

                    <span
                        className={styles.rewardDescription}
                    >
                        {rewardDescription}
                    </span>
                </div>

                <div className={styles.notice}>
                    {type === 'danger'
                        ? '해지 후에는 기존 금리를 복구할 수 없어요'
                        : '꾸준히 모은 도토리가 태산이 되는 그날까지'}
                </div>

                <div className={styles.buttonWrapper}>
                    {buttons.map((button, index) => (
                        <Btn
                            key={index}
                            name={button.name}
                            size="big"
                            active={button.active}
                            value={button.value}
                            onClick={button.onClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;