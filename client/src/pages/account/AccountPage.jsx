import styles from "./account.module.css";

import PageHeader from "@/components/pageHeader/PageHeader";
import AccountCard from "@/components/card/accountCard/AccountCard";
import TransactionSection from "@/components/transaction/TransactionSection";
import StatusCard from "@/components/card/StatusCard/StatusCard";

import { useAccountsQuery } from "@/hooks/useAccountsQuery";
import { useTransactionsQuery } from "@/hooks/useTransactionsQuery";

const AccountPage = () => {
  const {data, isLoading, isError, error} = useAccountsQuery();

  const {
    data: log,
    isLoading: transactionLoading,
    isError: transactionError,
    error: transactionErr,
  } = useTransactionsQuery();

  const accounts = data?.data || [];
  const account = accounts[0];

  const transactionData = log?.data;

  const transactions =
    transactionData?.transactions?.slice(0, 5) || [];

    console.log(transactions);

  return (
    <div className="main">
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
            <StatusCard
              title={error.message}
              isError
            />
          ) : (
            <AccountCard account={account} />
          )}

          {transactionLoading ? (
            <StatusCard title="거래내역을 불러오고 있어요" />
          ) : transactionError ? (
            <StatusCard
              title={transactionErr.message}
              isError
            />
          ) : (
            <TransactionSection
              title="최근 거래"
              transactions={transactions}
              accountId={transactionData?.account_id}
              more
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

