import React from "react";

import styles from "./toggle.module.css";

const Toggle = ({checked,onClick,}) => {
    return (
        <button className={`${styles.switch} ${checked ? styles.active: styles.inactive}`} onClick={onClick}>
            <span className={styles.circle}/>
        </button>
    );
};

export default Toggle;