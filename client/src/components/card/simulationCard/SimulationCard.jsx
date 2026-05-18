import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '@/App.css'
import styles from './simulationCard.module.css'

import Btn from '@/components/button/Btn'

import Form from '@/components/form/Form'

const SimulationCard = ({ product }) => {
    const navigate = useNavigate();

    const [amount, setAmount] = useState(0); // 납입금
    const interestRate = product?.interests?.[0]?.interest_rate || 0; // 기본 금리
    const [expectedInterest, setExpectedInterest] = useState(0); // 예상 이자

    const totalAmount =
        Number(amount) + Number(expectedInterest);

    const handleFormChange = (e) => {
        const onlyNumber =
            e.target.value.replace(/\D/g, '');

        setAmount(
            onlyNumber === '' ? 0 : onlyNumber
        );
    };

    useEffect(() => {
        const newExpectedInterest = amount * (interestRate / 100);
        setExpectedInterest(newExpectedInterest === '' ? 0 : newExpectedInterest);
    }, [amount]);

    return (
        <div className={styles.simulationCard}>
            <div className={styles.simulationTitle}>
                가입 시뮬레이션
            </div>

            <div className={styles.inputWrapper}>
                <Form
                    name="가입 금액"
                    type="text"
                    value={Number(amount).toLocaleString()}
                    placeholder="300,000"
                    onChange={handleFormChange}
                    unit="원"
                />
            </div>

            <div className={styles.resultCard}>
                <div className={styles.resultRow}>
                    <div>납입금</div>
                    <div>{amount.toLocaleString()}원</div>
                </div>

                <div className={styles.resultRow}>
                    <div>가입 기간</div>
                    <div>{product?.max_period_months}개월</div>
                </div>

                <div className={styles.resultRow}>
                    <div>예상 이자</div>
                    <div>+ {expectedInterest.toLocaleString()}원</div>
                </div>

                <div className={styles.resultDivider}></div>

                <div className={styles.totalRow}>
                    <div>만기 수령액</div>
                    <div className={styles.totalAmount}>
                        {totalAmount.toLocaleString()}원
                    </div>
                </div>
            </div>

            <Btn
                name="가입하기"
                active
                size="big"
                onClick={() =>
                    navigate(`/depositApply/${product.id}`, {
                        state: {
                            product,
                            amount,
                            expectedInterest,
                            period: product?.max_period_months,
                        },
                    })
                }
            />

            <div className={styles.protectText}>
                예금자 보호법에 따라 1인당 5천만원까지 보호
            </div>
        </div>
    );
};

export default SimulationCard;