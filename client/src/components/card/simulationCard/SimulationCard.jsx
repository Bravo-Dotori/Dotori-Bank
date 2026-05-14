import { useEffect, useState } from 'react';

import '@/App.css'
import styles from './simulationCard.module.css'

import Btn from '@/components/button/Btn'

import Form from '@/components/form/Form'

const SimulationCard = () => {
    const [amount, setAmount] = useState(0); // 납입금
    const [interestRate, setInterestRate] = useState(4.0); // 기본 금리
    const [expectedInterest, setExpectedInterest] = useState(0); // 예상 이자

    const handleFormChange = (e) => {
        const value = e.target.value;
        setAmount(value === '' ? 0 : value);
    };

    useEffect(() => {
        const newExpectedInterest = amount * interestRate;
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
                    type="number"
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
                    <div>24개월</div>
                </div>

                <div className={styles.resultRow}>
                    <div>예상 이자</div>
                    <div>+ {expectedInterest.toLocaleString()}원</div>
                </div>

                <div className={styles.resultDivider}></div>

                <div className={styles.totalRow}>
                    <div>만기 수령액</div>

                    <div className={styles.totalAmount}>
                        7,504,500원
                    </div>
                </div>
            </div>

            <Btn
                name="가입하기"
                active
                size="big"
                value="/depositApply"
            />

            <div className={styles.protectText}>
                예금자 보호법에 따라 1인당 5천만원까지 보호
            </div>
        </div>
    );
};

export default SimulationCard;