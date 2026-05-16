import { useState } from 'react';

import styles from "./deposit.module.css"

import Breadcrumb from "@/components/breadcrumb/Breadcrumb"
import PageHeader from "@/components/pageHeader/PageHeader"

import RateCard from "@/components/card/rateCard/RateCard"
import InfoCard from "@/components/card/infoCard/InfoCard"
import NoticeCard from "@/components/card/noticeCard/NoticeCard"
import SelectedCard from "@/components/card/selectedCard/SelectedCard"

import Modal from "@/components/modal/Modal"

import Btn from "@/components/button/Btn"

const DepositApplyPage = () => {
    const [interestRate, setInterestRate] = useState(4.0);

    const [noticeTitle, setNoticeTitle] = useState('상품 안내');
    const [noticeText, setNoticeText] = useState([
        '본 상품은 24개월 만기 정기 예금으로 안정적인 이자 수익을 제공합니다',
        '가입 대상: 도토리은행 입출금계좌 보유 회원',
        '가입 금액: 월 10만원 ~ 1,000만원 / 만기 일시 이자 지급',
        '만기 후: 자동 해지 또는 동일 조건 자동 재가입 선택 가능',
        '본 상품은 예금자 보호법에 따라 1인당 최고 5천만원까지 보호됩니다',
    ]);

    const [agreementTitle, setAgreementTitle] = useState('필수 동의 사항');
    const [agreementText, setAgreementText] = useState([
        '예금 상품 약관',
        '예금 거래 약관',
        '상품 설명서',
        '개인정보 수집·이용 동의',
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='main'>
            <div className={styles.container}>
                <div className={styles.depositDetail}>
                    <Breadcrumb
                        items={[
                            {
                                label: '예금상품',
                                path: '/deposit',
                            },
                            {
                                label: '도토리 정기예금',
                                path: '/deposit/1',
                            },
                            {
                                label: '가입',
                                path: '/deposit/1/form',
                            },
                        ]}
                    />

                    <PageHeader
                        title="예금 가입"
                        description="선택하신 상품 정보를 확인하고 가입을 완료해주세요"
                        big
                        left
                    />

                    <SelectedCard
                        interestRate={interestRate}
                    />

                    <NoticeCard
                        infoType={'notice'}
                        noticeTitle={noticeTitle}
                        noticeText={noticeText}
                    />

                    <NoticeCard
                        infoType={'agreement'}
                        noticeTitle={agreementTitle}
                        noticeText={agreementText}
                    />

                    <NoticeCard
                        infoType={'join'}
                        noticeTitle={'가입 정보'}
                    />

                    <div className={styles.buttonSection}>
                        <Btn
                            name="가입하기"
                            size="big"
                            active
                            onClick={() => setIsModalOpen(true)}
                        />
                        <div className={styles.notice}>예금자 보호법에 따라 1인당 5천만원까지 보호 · 본 상품은 비과세 한도 내에서 우대 적용</div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    showLogo
                    title='가입이 완료되었어요!'
                    description='도토리 정기예금에 가입하셨습니다'
                    rewardLabel='24개월 후 받을 이자'
                    reward='+ 304,500원'
                    rewardDescription='만기 수령액 7,504,500원'
                    buttons={[
                        {
                            name: '가입 상품 목록 보기',
                            value: '/products',
                            active: true,
                        }
                    ]}
                />
            )
            }
        </div>
    )
}

export default DepositApplyPage