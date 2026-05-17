import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from "./transfer.module.css"

import PageHeader from "@/components/pageHeader/PageHeader"
import Btn from "@/components/button/Btn"
import TransferAccountCard from "@/components/card/transferAccountCard/TransferAccountCard"
import TransferAmountCard from "@/components/card/transferAmountCard/TransferAmountCard"
import Modal from "@/components/modal/Modal"

const TransferPage = () => {
  const navigate = useNavigate();

  const [sender, setSender] = useState({
    accountName: '도토리뱅크 입출금계좌',
    accountNumber: '',
    balance: 0
  });

  const [receiver, setReceiver] = useState({
    bank: '도토리뱅크',
    accountNumber: '',
    userName: ''
  });

  const [amount, setAmount] = useState(0);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch('/api/accounts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        console.log(data);

        if (!response.ok || !data.success) {
          return;
        }

        const account = data.data[0];

        setSender({
          accountName: '도토리뱅크 입출금계좌',
          accountNumber: account.account_number,
          balance: account.balance,
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchAccount();
  }, []);

  const handleAmount = (value) => {
    setAmount((prev) => prev + value);
  };

  const handleReceiverAccount = (value) => {
    const onlyNumber = value.replace(/\D/g, '').slice(0, 12);

    let formatted = onlyNumber;

    if (onlyNumber.length > 3 && onlyNumber.length <= 7) {
      formatted = `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`;
    }

    if (onlyNumber.length > 7) {
      formatted = `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 7)}-${onlyNumber.slice(7)}`;
    }

    setReceiver((prev) => ({
      ...prev,
      accountNumber: formatted
    }));

    if (formatted === '987-6590-43219') {
      setReceiver((prev) => ({
        ...prev,
        accountNumber: formatted,
        userName: '김아람'
      }));
    } else {
      setReceiver((prev) => ({
        ...prev,
        accountNumber: formatted,
        userName: ''
      }));
    }
  };

  const handleClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleTransfer = () => {
    setIsConfirmModalOpen(false);
    setIsCompleteModalOpen(true);
  };

  return (
    <div className='main'>
      <div className={styles.container}>
        <div className={styles.transfer}>
          <PageHeader
            title="이체하기"
            description="받는 분 정보를 입력하고 금액을 확인해주세요"
            big
            left
          />

          <TransferAccountCard
            type="send"
            accountName={sender.accountName}
            accountNumber={sender.accountNumber}
            balance={sender.balance}
          />

          <TransferAccountCard
            type="receive"
            bank={receiver.bank}
            accountNumber={receiver.accountNumber}
            userName={receiver.userName}
            onChange={handleReceiverAccount}
          />

          <TransferAmountCard
            amount={amount}
            setAmount={setAmount}
            handleAmount={handleAmount}
            userAmount={sender.balance}
          />

          <Btn
            name="다음"
            size="big"
            active={
              amount > 0 &&
              amount <= sender.balance &&
              receiver.userName
            }
            disabled={
              amount <= 0 ||
              amount > sender.balance ||
              !receiver.userName
            }
            onClick={() => setIsConfirmModalOpen(true)}
          />
        </div>
      </div>

      {isConfirmModalOpen && (
        <Modal
          type="transfer"
          title="이체하시겠어요?"
          amount={amount.toLocaleString()}
          description={`${receiver.userName}님께 이체합니다`}
          transferInfo={{
            userName: receiver.userName,
            senderAccount: sender.accountNumber,
            receiverAccount: receiver.accountNumber,
            afterBalance: sender.balance - amount,
          }}
          buttons={[
            {
              name: "취소",
              onClick: handleClose,
              active: false,
            },
            {
              name: "이체하기",
              onClick: handleTransfer,
              active: true,
            }
          ]}
        />
      )}

      {isCompleteModalOpen && (
        <Modal
          showLogo
          title="이체가 완료되었어요"
          amount={amount.toLocaleString()}
          description={`${receiver.userName}님께 보냈어요`}
          rewardLabel="갱신된 잔액"
          reward={`${(sender.balance - amount).toLocaleString()}원`}
          rewardDescription={sender.accountNumber}
          buttons={[
            {
              name: '확인',
              active: true,
              onClick: () => navigate('/'),
            },
          ]}
        />
      )}
    </div>
  )
}

export default TransferPage