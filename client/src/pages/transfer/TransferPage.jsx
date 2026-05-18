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
    id: null,
    accountName: '',
    accountNumber: '',
    balance: 0
  });
  const [receiver, setReceiver] = useState({
    bank: '도토리뱅크',
    accountNumber: '',
    userName: ''
  });

  const [amount, setAmount] = useState(0); // 이체 금액
  const [receiverError, setReceiverError] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  // 보내는 분 계좌 조회
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

      const sender = data.data[0];

      setSender({
        id: sender.id,
        accountName: '도토리뱅크 입출금계좌',
        accountNumber: sender.account_number,
        balance: sender.balance,
      });

    } catch (error) {
      console.log(error);
    }
  };

  // 받는 분 계좌 조회
  const fetchReceiverAccount = async (accountNumber) => {
    try {
      if (sender.accountNumber === accountNumber) {
        setReceiver((prev) => ({
          ...prev,
          userName: '',
        }));

        setReceiverError('보내는 분과 받는 분의 계좌가 같을 수 없습니다.');

        return;
      }

      const response = await fetch('/api/accounts/toAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          account_number: accountNumber,
        }),
      });

      const data = await response.json();

      console.log(data);

      // 계좌가 존재하지 않을 때
      if (!response.ok || !data.success) {
        setReceiver((prev) => ({
          ...prev,
          userName: '',
        }));

        setReceiverError('존재하지 않는 계좌입니다.');

        return;
      }

      setReceiver((prev) => ({
        ...prev,
        userName: data.data[0].name,
      }));

      setReceiverError('');

    } catch (error) {
      console.log(error);
    }
  };

  // 이체하기
  const transferAmount = async () => {
    try {
      const response = await fetch('/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          from_account_id: sender.id,
          to_account_number: receiver.accountNumber,
          amount: amount,
          memo: '테스트 이체',
        }),
      });

      const data = await response.json();

      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };

  // 금액 입력 처리
  const handleAmount = (value) => {
    setAmount((prev) => prev + value);
  };

  // 받는 분 계좌 입력 처리
  const handleReceiverAccount = (value) => {
    const onlyNumber = value.replace(/\D/g, '').slice(0, 13);

    let formatted = onlyNumber;

    if (onlyNumber.length > 3 && onlyNumber.length <= 7) {
      formatted = `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`;
    }

    if (onlyNumber.length > 7) {
      formatted = `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 7)}-${onlyNumber.slice(7)}`;
    }

    setReceiver((prev) => ({
      ...prev,
      accountNumber: formatted,
      userName: '',
    }));

    setReceiverError('');

    // 계좌번호를 모두 작성했을 때 조회
    if (formatted.length === 15) {
      fetchReceiverAccount(formatted);
    }
  };

  const handleClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleTransfer = () => {
    transferAmount();
    setIsConfirmModalOpen(false);
    setIsCompleteModalOpen(true);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

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
            errorMessage={receiverError}
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
              onClick: () => navigate('/history'),
            },
          ]}
        />
      )}
    </div>
  )
}

export default TransferPage