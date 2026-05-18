import React from "react";
import Btn from "@/components/button/Btn";
import styles from "./filterGroup.module.css"

const FilterGroup = ({options,selected,onChange,}) => {
    return (
        <div className={styles.filterWrap}>
            {options.map((option) => (
                <Btn
                    key={option}
                    type="radio"
                    name={option}
                    active={selected === option}
                    onClick={() =>
                        onChange(option)
                    }
                />
            ))}
        </div>
    );
};

export default FilterGroup;