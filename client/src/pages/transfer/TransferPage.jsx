import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from "./transfer.module.css"

import PageHeader from "@/components/pageHeader/PageHeader"
import DepositCard from "@/components/card/depositCard/DepositCard"

const TransferPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "안심 정기예금",
      rate: 3.5,
      period: "12개월 가입",
      description: "안정적인 첫 예금 — 매월 이자 지급",
    },
    {
      id: 2,
      title: "도토리 정기예금",
      rate: 4.0,
      period: "24개월 가입",
      description: "긴 호흡으로 더 큰 이자를 받으세요",
    },
    {
      id: 3,
      title: "꾸준 정기예금",
      rate: 4.5,
      period: "36개월 가입",
      description: "오래 묶을수록 커지는 우대 금리",
    },
    {
      id: 4,
      title: "태산 우대예금",
      rate: 5.0,
      period: "12개월 한정",
      description: "신규 가입자를 위한 특별 우대",
    },
    {
      id: 5,
      title: "청년 도약예금",
      rate: 5.5,
      period: "24개월 청년",
      description: "만 19~34세 청년을 위한 고금리 예금",
    },
    {
      id: 6,
      title: "안심 시니어예금",
      rate: 4.2,
      period: "12개월 시니어",
      description: "만 60세 이상 안정 예금",
    },
    {
      id: 7,
      title: "맘대로 예금",
      rate: 3.0,
      period: "6개월 가입",
      description: "짧게 굴리고 싶은 분께",
    },
  ]);

  return (
    <div className='main'>
      <div className={styles.container}>
        <div className={styles.transfer}>
          <PageHeader
            title="이체"
            description="받는 분 정보를 입력하고 금액을 확인해주세요"
            big
            left
          />
        </div>
      </div>
    </div>
  )
}

export default TransferPage