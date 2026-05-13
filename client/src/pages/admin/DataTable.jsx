import React from 'react'
import styles from './DataTable.module.css'
import Pagination from './Pagination '

const DataTable = ({ title, date, transactionCount, columns, data }) => {
  return (
    <>
      <div className={styles.tableWrap}>
        <div className={styles.tableTitle}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.desc}>{transactionCount}건</span>
        </div>
        <div className={styles.tableDate}>{date}</div>

        <table>
          <thead>
            <tr>
              {columns.map(item => ( // 임시 설정
                <th key={item.key}>
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.withdrawAccount}</td>
                <td>{item.depositAccount}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>{item.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
  )
}

export default DataTable