import { useNavigate } from "react-router-dom"

import styles from "./breadcrumb.module.css"

const Breadcrumb = ({ items }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.breadcrumb}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={styles.itemWrapper}
                >
                    <span
                        className={
                            index === items.length - 1
                                ? styles.current
                                : styles.item
                        }
                        onClick={() => {
                            if (index !== items.length - 1) {
                                navigate(item.path);
                            }
                        }}
                    >
                        {item.label}
                    </span>

                    {index !== items.length - 1 && (
                        <span className={styles.arrow}>
                            ›
                        </span>
                    )}
                </div>
            ))
            }
        </div >
    )
}

export default Breadcrumb