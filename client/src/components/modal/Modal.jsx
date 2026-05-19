import { useEffect } from 'react';

import '@/App.css'
import styles from './modal.module.css'

import logo from '@/assets/logo.png'
import logoSad from '@/assets/logo-sad.png'

import Btn from "@/components/button/Btn"
import { Children } from 'react';

const Modal = ({
    onClose,
    showLogo,
    title,
    amount,
    description,
    rewardLabel,
    reward,
    rewardDescription,
    buttons = [],
    type = 'default',
    transferInfo,
    children
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

                {showLogo && (
                    <img
                        src={
                            type === 'danger'|| type === 'fail'
                                ? logoSad
                                : logo
                        }
                        alt='logo'
                        className={styles.logo}
                    />
                )}

                <h2 className={styles.title}>
                    {title}
                </h2>

                {description && (
                    <p className={styles.description}>
                        {amount && (
                            <p className={styles.amount}>
                                {amount.toLocaleString()}원
                            </p>
                        )}
                        {description}
                    </p>
                )}

                {type !== 'default' && type !== 'fail'&& (
                    <div className={styles.rewardBox}>
                        <span className={styles.rewardLabel}>
                            {rewardLabel}
                        </span>

                        <div className={styles.reward}>
                            {reward}
                        </div>

                        {rewardDescription && (
                            <span className={styles.rewardDescription}>
                                {rewardDescription}
                            </span>
                        )}

                        {type === 'transfer' && (
                            <div className={styles.transferInfoBox}>
                                <div className={styles.transferRow}>
                                    <span className={styles.label}>출금 계좌</span>
                                    <span className={styles.value}>
                                        {transferInfo?.senderAccount}
                                    </span>
                                </div>

                                <div className={styles.transferRow}>
                                    <span className={styles.label}>입금 계좌</span>
                                    <span className={styles.value}>
                                        {transferInfo?.receiverAccount}
                                    </span>
                                </div>

                                <div className={styles.transferRow}>
                                    <span className={styles.label}>이체 후 잔액</span>
                                    <span className={styles.value}>
                                        {transferInfo?.afterBalance.toLocaleString()}원
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {type !== 'default' && type !== 'fail' && (
                    <div className={styles.notice}>
                        {type === 'danger'
                            ? '해지 후에는 기존 금리를 복구할 수 없어요'
                            : type === 'transfer'
                                ? ''
                                : '꾸준히 모은 도토리가 태산이 되는 그날까지'}
                    </div>
                )}
                
                <div
                    className={`
                        ${styles.buttonWrapper}
                        ${type === 'transfer' ? styles.transferButtons : ''}
                    `}
                >
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
                {children}
            </div>
        </div>
    );
};

export default Modal;