import React from 'react'
import styles from './pagination.module.css'

const Pagination  = (current, total, onPageChange ) => {
  return (
    <div className={styles.pagination}>
      <button type="button" onClick={() => onPageChange}>이전</button>
      
      <ol>
        <li>ff</li>
      </ol>

    </div>
  )
}

export default Pagination 