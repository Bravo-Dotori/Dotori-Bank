import React from "react";
import styles from "./dataTable.module.css";

const DataTable = ({title, date, totalCount, columns, data}) => {
    return (
        <div className={styles.tableWrap}>
            <div className={styles.tableTitle}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.desc}>
                    {totalCount}건
                </span>
            </div>

            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {col.render
                                        ? col.render(item[col.accessor], item)
                                        : item[col.accessor]
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;