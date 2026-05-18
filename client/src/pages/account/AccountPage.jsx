import { useState } from "react";

import styles from "./account.module.css"

import PageHeader from "@/components/pageHeader/PageHeader"
import AccountCard from "@/components/card/accountCard/AccountCard"
import TransactionSection from "@/components/transaction/TransactionSection"
import StatusCard from "@/components/card/StatusCard/StatusCard";

import { useAccountsQuery } from "@/hooks/useAccountsQuery";

const AccountPage = () => {
  const { data, isLoading, isError, error } = useAccountsQuery();
  const accounts = data?.data || [];
  const account = accounts[0];

  
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

          {isLoading ? (
              <StatusCard title="계좌를 불러오고 있어요" />
          ) : isError ? (
              <StatusCard title={error.message} isError />

          ) : (
              <AccountCard
                account={account}
              />
          )}

          {/* <TransactionSection
            title="최근 거래"
            transactions={transactions}
            more
          /> */}
        </div>
      </div>
    </div>
  )
}

export default AccountPage