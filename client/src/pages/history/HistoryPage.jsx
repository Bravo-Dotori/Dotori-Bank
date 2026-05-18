import { useState } from "react";

import styles from "./history.module.css"

import PageHeader from "@/components/pageHeader/PageHeader"
import TransactionSection from "@/components/transaction/TransactionSection"
import Btn from "@/components/button/Btn"
import Pagination from "@/components/pagination/Pagination";

const HistoryPage = () => {
    
    const [page, setPage] = useState(1);
  const transactions = [
    {
      id: 1,
      type: "withdraw",
      title: "도토리 정기예금",
      description: "예금 가입",
      date: "2026.05.09 14:32",
      amount: "- 3,000,000원",
      period: "3개월",
    },
    {
      id: 2,
      type: "deposit",
      title: "가입 축하금",
      description: "입금",
      date: "2026.05.09 14:30",
      amount: "+ 3,000,000원",
      period: "1개월",
    },
    {
      id: 3,
      type: "deposit",
      title: "김아람님으로부터",
      description: "이체 받음",
      date: "2026.03.08 09:15",
      amount: "+ 50,000원",
      period: "6개월",
    },
    {
      id: 4,
      type: "withdraw",
      title: "박민수님께",
      description: "이체",
      date: "2026.02.07 18:42",
      amount: "- 120,000원",
      period: "1년",
    },
    {
      id: 5,
      type: "withdraw",
      title: "도토리 카페",
      description: "결제",
      date: "2026.01.07 12:08",
      amount: "- 4,500원",
      period: "3개월",
    },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState("1개월");
  const [selectedType, setSelectedType] = useState("전체");

  const periodOptions = [
    "1개월",
    "3개월",
    "6개월",
    "1년",
  ];

  const typeOptions = [
    "전체",
    "입금",
    "출금",
  ];

  const filteredTransactions = transactions.filter((item) => {
    const transactionDate = new Date(item.date.replace(/\./g, '-'));
    const currentDate = new Date();

    const diffTime = currentDate - transactionDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    let maxDays = 30;

    if (selectedPeriod === "3개월") {
      maxDays = 90;
    }

    if (selectedPeriod === "6개월") {
      maxDays = 180;
    }

    if (selectedPeriod === "1년") {
      maxDays = 365;
    }

    const periodMatch = diffDays <= maxDays;

    const typeMatch =
      selectedType === "전체" ||
      (selectedType === "입금" && item.type === "deposit") ||
      (selectedType === "출금" && item.type === "withdraw");

    return periodMatch && typeMatch;
  });

  return (
    <div className='main'>
      <div className={styles.container}>
        <div className={styles.history}>
          <PageHeader
            title="거래 내역"
            description="입출금계좌의 모든 거래를 확인하세요"
            big
            left
          />

          <div className={styles.filterWrapper}>
            <div className={styles.filterGroup}>
              {periodOptions.map((option) => (
                <Btn
                  key={option}
                  type="radio"
                  name={option}
                  active={selectedPeriod === option}
                  onClick={() => setSelectedPeriod(option)}
                />
              ))}
            </div>

            <div className={styles.filterGroup}>
              {typeOptions.map((option) => (
                <Btn
                  key={option}
                  type="radio"
                  name={option}
                  active={selectedType === option}
                  onClick={() => setSelectedType(option)}
                />
              ))}
            </div>
          </div>

          <TransactionSection
            title="전체 거래내역"
            transactions={filteredTransactions}
          />

          
            
            <Pagination
            currentPage={page}
            totalPages={5}
            onPageChange={setPage}
            />

        </div>
      </div>
    </div>
  )
}

export default HistoryPage