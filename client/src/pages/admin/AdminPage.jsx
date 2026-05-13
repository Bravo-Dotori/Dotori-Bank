import React from 'react'
import DataTable from './DataTable'

const Adminpage = () => {

  // 임시데이터
  const columns = [
    { key: "date", label: "일시" },
    { key: "withdrawAccount", label: "출금 계좌" },
    { key: "depositAccount", label: "입금 계좌" },
    { key: "amount", label: "금액" },
    { key: "status", label: "상태" },
    { key: "memo", label: "메모" },
  ];

  const data = [
    {
      id: 1,
      date: "2025.05.09 14:32",
      withdrawAccount: "1234-56-789012",
      depositAccount: "0번 (어드민)",
      amount: "3,000,000원",
      status: "고액",
      memo: "메모",
    },
    {
      id: 2,
      date: "2025.05.09 14:32",
      withdrawAccount: "1234-56-789012",
      depositAccount: "0번 (어드민)",
      amount: "3,000,000원",
      status: "",
      memo: "",
    },
    {
      id: 3,
      date: "2025.05.09 14:32",
      withdrawAccount: "1234-56-789012",
      depositAccount: "0번 (어드민)",
      amount: "3,000,000원",
      status: "",
      memo: "",
    },
    {
      id: 4,
      date: "2025.05.09 02:15",
      withdrawAccount: "555-12-345678",
      depositAccount: "999-99-888888",
      amount: "15,000,000원",
      status: "고액 변경",
      memo: "",
    },
    {
      id: 5,
      date: "2025.05.09 09:30",
      withdrawAccount: "987-65-432109",
      depositAccount: "1234-56-789012",
      amount: "50,000원",
      status: "",
      memo: "",
    },
    {
      id: 6,
      date: "2025.05.09 09:30",
      withdrawAccount: "987-65-432109",
      depositAccount: "1234-56-789012",
      amount: "50,000원",
      status: "",
      memo: "",
    },
    {
      id: 7,
      date: "2025.05.09 02:15",
      withdrawAccount: "555-12-345678",
      depositAccount: "999-99-888888",
      amount: "15,000,000원",
      status: "",
      memo: "",
    },
    {
      id: 8,
      date: "2025.05.08 23:48",
      withdrawAccount: "444-55-667788",
      depositAccount: "333-22-111000",
      amount: "9,500,000원",
      status: "",
      memo: "",
    },
    {
      id: 9,
      date: "2025.05.08 14:20",
      withdrawAccount: "0번 (어드민)",
      depositAccount: "555-12-345678",
      amount: "3,000,000원",
      status: "",
      memo: "",
    },
    {
      id: 10,
      date: "2025.05.04 16:45",
      withdrawAccount: "1234-56-789012",
      depositAccount: "444-55-667788",
      amount: "50,000원",
      status: "",
      memo: "",
    },
  ];
  return (
    <>
      <DataTable 
        title="거래내역" date="2023-10-01" transactionCount={10} columns={columns} data={data}/>
    </>
  )
}

export default Adminpage