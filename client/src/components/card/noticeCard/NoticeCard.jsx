import { useState } from 'react';

import styles from "./noticeCard.module.css"

import Form from '@/components/form/Form'
import Btn from '@/components/button/Btn'

const NoticeCard = ({
    infoType,
    noticeTitle,
    noticeText,
    agreements,
    setAgreements,
    selectedPeriod,
    setSelectedPeriod,
    joinAmount,
    setJoinAmount,
    minPeriod,
    maxPeriod,
    minAmount,
    maxAmount,
}) => {
    const agreementKeys = [
        'product',
        'trade',
        'description',
        'privacy',
    ];

    const periods = [3, 6, 12, 24]
        .filter(
            (period) =>
                period >= minPeriod &&
                period <= maxPeriod
        );

    const isAllChecked =
        agreements &&
        Object.values(agreements).every(Boolean);

    const joinAmountNumber =
        Number(joinAmount);

    const amountError =
        joinAmount !== '' &&
            (
                joinAmountNumber < minAmount ||
                joinAmountNumber > maxAmount
            )
            ? `${Number(minAmount).toLocaleString()}원 ~ ${Number(maxAmount).toLocaleString()}원 사이로 입력해주세요`
            : '';

    const handleAllCheck = (checked) => {
        setAgreements({
            product: checked,
            trade: checked,
            description: checked,
            privacy: checked,
        });
    };

    const handleCheck = (key, checked) => {
        setAgreements((prev) => ({
            ...prev,
            [key]: checked,
        }));
    };

    return (
        <div
            className={`
                ${styles.noticeCard}
                ${infoType === 'warning'
                    ? styles.warning
                    : infoType === 'agreement'
                        ? styles.agreement
                        : infoType === 'join'
                            ? styles.join
                            : styles.notice
                }
            `}
        >
            <div className={styles.noticeTitle}>
                {noticeTitle}
            </div>

            {(infoType === 'warning'
                || infoType === 'notice') && (
                    <>
                        {noticeText.map((item, index) => (
                            <div
                                className={styles.text}
                                key={index}
                            >
                                · {item}
                            </div>
                        ))}
                    </>
                )}

            {infoType === 'agreement' && (
                <>
                    <div className={styles.allAgreement}>
                        <div className={styles.left}>
                            <input
                                className={styles.checkbox}
                                type="checkbox"
                                checked={isAllChecked}
                                onChange={(e) =>
                                    handleAllCheck(
                                        e.target.checked
                                    )
                                }
                            />

                            <div className={styles.allText}>
                                전체 동의
                            </div>
                        </div>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.agreementList}>
                        {noticeText.map((item, index) => {
                            const key = agreementKeys[index];

                            return (
                                <div
                                    className={styles.agreementItem}
                                    key={index}
                                >
                                    <div className={styles.left}>
                                        <input
                                            className={styles.checkbox}
                                            type="checkbox"
                                            checked={
                                                agreements[key]
                                            }
                                            onChange={(e) =>
                                                handleCheck(
                                                    key,
                                                    e.target
                                                        .checked
                                                )
                                            }
                                        />

                                        <div className={styles.text}>
                                            <span className={styles.necessary}>[필수]</span>
                                            {item}
                                        </div>
                                    </div>

                                    <div className={styles.arrow}>›</div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {infoType === 'join' && (
                <div className={styles.joinWrapper}>
                    <div className={styles.section}>
                        <div className={styles.label}>
                            가입 기간
                        </div>

                        <div className={styles.periodList}>
                            {periods.map((item, index) => (
                                <Btn
                                    key={index}
                                    type="radio"
                                    name={`${item}개월`}
                                    active={
                                        selectedPeriod ===
                                        item
                                    }
                                    onClick={() =>
                                        setSelectedPeriod(
                                            item
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.label}>
                            월 가입 금액
                        </div>

                        <div className={styles.inputWrapper}>
                            <Form
                                name=""
                                type="number"
                                placeholder="300000"
                                value={joinAmount}
                                onChange={(e) =>
                                    setJoinAmount(
                                        e.target.value
                                    )
                                }
                                unit="원"
                                error={amountError}
                            />
                        </div>

                        <div className={styles.caption}>
                            월 {Number(minAmount).toLocaleString()}원 ~ {Number(maxAmount).toLocaleString()}원
                            사이로 입력해주세요
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoticeCard;