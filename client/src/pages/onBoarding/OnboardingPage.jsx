import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import styles from "./onboarding.module.css"

import PageHeader from "@/components/pageHeader/PageHeader"
import QuestionCard from "@/components/card/questionCard/QuestionCard"
import Btn from "@/components/button/Btn"

const OnboardingPage = () => {
    const navigate = useNavigate();

    const [selected, setSelected] = useState({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
    })

    const questions = [
        {
            number: 1,
            title: "월 소득은 어느 정도인가요?",
            options: [
                '100만원 미만',
                '100~200만원',
                '200~300만원',
                '300만원 이상',
            ],
        },
        {
            number: 2,
            title: "저축 목표가 있나요?",
            options: [
                '단기 비상금',
                '투자금',
                '목돈 마련',
                '여행 자금',
                '주거 자금',
            ],
        },
        {
            number: 3,
            title: "얼마 동안 자금을 묶어둘 수 있나요?",
            options: [
                '3개월',
                '6개월',
                '1년',
                '2년',
            ],
        },
        {
            number: 4,
            title: "어떤 유형의 상품을 원하시나요?",
            options: [
                '안정형',
                '균형형',
                '수익형',
            ],
        },
        {
            number: 5,
            title: "현재 보유 금액은 얼마인가요?",
            options: [
                '100만원 미만',
                '100~400만원',
                '400~700만원',
                '700~1000만원',
                '1000만원 이상',
            ],
        },
    ]

    return (
        <div className='main'>
            <div className={styles.container}>
                <div className={styles.onboarding}>
                    <PageHeader
                        title="몇 가지 질문에 답해주세요"
                        description="도토리님께 가장 잘 맞는 예금 상품을 추천해드릴게요  ·  약 1분 소요"
                        big
                    />

                    {questions.map((question) => (
                        <QuestionCard
                            key={question.number}
                            number={question.number}
                            title={question.title}
                            options={question.options}
                            selected={selected[question.number]}
                            onSelect={(value) =>
                                setSelected((prev) => ({
                                    ...prev,
                                    [question.number]: value,
                                }))
                            }
                        />
                    ))}

                    <div className={styles.buttonSection}>
                        <Btn
                            name="추천 결과 보기"
                            size="big"
                            active
                            value="/recommend"
                        />
                        <div className={styles.skip} onClick={() => navigate('/')}>건너뛰고 전체 상품 둘러보기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnboardingPage