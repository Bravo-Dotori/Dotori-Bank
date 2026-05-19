import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { createDeposit } from '@/api/depositApi';

import styles from "./deposit.module.css"

import Breadcrumb from "@/components/breadcrumb/Breadcrumb"
import PageHeader from "@/components/pageHeader/PageHeader"
import Btn from "@/components/button/Btn"

import NoticeCard from "@/components/card/noticeCard/NoticeCard"
import SelectedCard from "@/components/card/selectedCard/SelectedCard"

import Modal from "@/components/modal/Modal"

const DepositApplyPage = () => {
    const location = useLocation();
    const { depositId } = useParams();
    const [depositErrorMessage, setDepositErrorMessage] = useState('');

    const {
        product,
        amount,
        expectedInterest,
        period,
    } = location.state || {};

    const noticeTitle = '상품 안내';
    const noticeText = [
        '본 상품은 24개월 만기 정기 예금으로 안정적인 이자 수익을 제공합니다',
        '가입 대상: 도토리은행 입출금계좌 보유 회원',
        `가입 금액: 월 ${Number(product?.min_amount).toLocaleString()}원 ~ ${Number(product?.max_amount).toLocaleString()}원 / 만기 일시 이자 지급`,
        '만기 후: 자동 해지 또는 동일 조건 자동 재가입 선택 가능',
        '본 상품은 예금자 보호법에 따라 1인당 최고 5천만원까지 보호됩니다',
    ];
    const agreementTitle = '필수 동의 사항';
    const agreementText = [
        '예금 상품 약관',
        '예금 거래 약관',
        '상품 설명서',
        '개인정보 수집·이용 동의',
    ];

    const [agreements, setAgreements] = useState({
        product: false,
        trade: false,
        description: false,
        privacy: false,
    });

    const [selectedPeriod, setSelectedPeriod] = useState(product?.max_period_months);

    const selectedInterest =
        product?.interests?.find(
            (item) =>
                item.period_months ===
                selectedPeriod
        );

    const interestRate = selectedInterest?.interest_rate || 0;

    const [joinAmount, setJoinAmount] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isAgreementChecked = Object.values(agreements).every(Boolean);
    const joinAmountNumber = Number(joinAmount);

    const isJoinValid =
        selectedPeriod !== null &&
        joinAmount !== '' &&
        joinAmountNumber >= 100000 &&
        joinAmountNumber <= 10000000;

    const isButtonDisabled = !isAgreementChecked || !isJoinValid;

    const handleCreateDeposit = async () => {
        try {
            const data = await createDeposit({
                product_id: product.id,
                target_period_months: selectedPeriod,
                target_amount: Number(joinAmount),
            });

            console.log(data);

            setIsModalOpen(true);

        } catch (error) {
            console.error("error:", error);
            setDepositErrorMessage(error.message);
        }
    };

    return (
        <div className='main'>
            <div className={styles.container}>
                <div className={styles.depositApply}>
                    <Breadcrumb
                        items={[
                            {
                                label: '예금상품',
                                path: '/deposit',
                            },
                            {
                                label: product?.product_name,
                                path: `/depositDetail/${depositId}`,
                            },
                            {
                                label: '가입',
                                path: `/depositApply/${depositId}`,
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
                        title={product?.product_name}
                        interestRate={interestRate}
                        amount={amount}
                        period={selectedPeriod}
                        expectedInterest={expectedInterest}
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
                        agreements={agreements}
                        setAgreements={setAgreements}
                    />

                    <NoticeCard
                        infoType={'join'}
                        noticeTitle={'가입 정보'}
                        selectedPeriod={selectedPeriod}
                        setSelectedPeriod={setSelectedPeriod}
                        joinAmount={joinAmount}
                        setJoinAmount={setJoinAmount}
                        minPeriod={product?.min_period_months}
                        maxPeriod={product?.max_period_months}
                        minAmount={product?.min_amount}
                        maxAmount={product?.max_amount}
                    />

                    <div className={styles.buttonSection}>
                        <Btn
                            name="가입하기"
                            size="big"
                            active={!isButtonDisabled}
                            disabled={isButtonDisabled}
                            onClick={handleCreateDeposit}
                        />
                        <div className={styles.notice}>예금자 보호법에 따라 1인당 5천만원까지 보호 · 본 상품은 비과세 한도 내에서 우대 적용</div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    showLogo
                    title='가입이 완료되었어요!'
                    description={`${product?.product_name}에 가입하셨습니다`}
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
            {depositErrorMessage && (
                <Modal
                    showLogo
                    type = 'fail'
                    title="예금 가입에 실패했어요"
                    description={depositErrorMessage}
                    buttons={[
                        {
                            name: '확인',
                            active: true,
                            onClick: () => setDepositErrorMessage(''),
                        },
                    ]}
                />
            )}
        </div>
    )
}

export default DepositApplyPage