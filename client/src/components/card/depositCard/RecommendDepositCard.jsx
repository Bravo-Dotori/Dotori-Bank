import { useState } from "react"

import styles from "./recommendDepositCard.module.css"

import Btn from "@/components/button/Btn"

const RecommendDepositCard = ({ name, rate }) => {

    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.badge}>
                    🏆 1순위 추천
                </div>

                <div className={styles.matchText}>
                    {name}님 답변과 가장 잘 맞아요
                </div>
            </div>

            <div className={styles.title}>
                도토리 정기예금
            </div>

            <div className={styles.rate}>
                연 {rate}%
            </div>

            <div className={styles.infoWrapper}>
                <div className={styles.infoBox}>
                    <div className={styles.infoTitle}>가입 기간</div>
                    <div className={styles.infoValue}>24개월</div>
                </div>

                <div className={styles.infoBox}>
                    <div className={styles.infoTitle}>최소 금액</div>
                    <div className={styles.infoValue}>월 10만원~</div>
                </div>

                <div className={styles.infoBox}>
                    <div className={styles.infoTitle}>이자 지급</div>
                    <div className={styles.infoValue}>만기 일시</div>
                </div>
            </div>

            <div className={styles.reasonBox}>
                <div className={styles.reasonTitle}>
                    왜 추천하나요?
                </div>

                <div className={styles.reason}>
                    · 장기 노후 준비에 적합한 24개월 만기
                </div>

                <div className={styles.reason}>
                    · 월 10~50만원 저축에 최적화
                </div>

                <div className={styles.reason}>
                    · 안정적인 고정 금리
                </div>
            </div>

            <Btn
                name="가입하기"
                size="big"
                active
                value="/depositDetail"
            />
        </div>
    )
}

export default RecommendDepositCard