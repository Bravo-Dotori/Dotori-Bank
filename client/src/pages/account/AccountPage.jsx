import { useState } from "react";

import styles from "./account.module.css"

import PageHeader from "@/components/pageHeader/PageHeader"
import AccountCard from "@/components/card/accountCard/AccountCard"
import TransactionSection from "@/components/transaction/TransactionSection"

const AccountPage = () => {
  const transactions = [
    {
      id: 1,
      type: "withdraw",
      title: "도토리 정기예금",
      description: "예금 가입",
      date: "2025.05.09 14:32",
      amount: "- 3,000,000원",
    },
    {
      id: 2,
      type: "deposit",
      title: "가입 축하금",
      description: "입금",
      date: "2025.05.09 14:30",
      amount: "+ 3,000,000원",
    },
    {
      id: 3,
      type: "deposit",
      title: "김아람님으로부터",
      description: "이체 받음",
      date: "2025.05.08 09:15",
      amount: "+ 50,000원",
    },
    {
      id: 4,
      type: "withdraw",
      title: "박민수님께",
      description: "이체",
      date: "2025.05.07 18:42",
      amount: "- 120,000원",
    },
    {
      id: 5,
      type: "withdraw",
      title: "도토리 카페",
      description: "결제",
      date: "2025.05.07 12:08",
      amount: "- 4,500원",
    },
  ];

  const [account, setAccount] = useState({
    bank: "도토리뱅크",
    accountNumber: "1234-56-789012",
    amount: 3000000,
  });

  return (
    <div className='main'>
      <div className={styles.container}>
        <div className={styles.account}>
          <PageHeader
            title="내 계좌"
            description="잔액과 거래내역을 한눈에 확인하세요"
            big
            left
          />

          <AccountCard
            account={account}
          />

          <TransactionSection
            title="최근 거래"
            transactions={transactions}
            more
          />
        </div>
      </div>
    </div>
  )
}

export default AccountPage