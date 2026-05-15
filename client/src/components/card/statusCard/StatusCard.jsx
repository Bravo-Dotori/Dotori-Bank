import styles from './status.module.css'

import logo from '@/assets/logo.png'
import logoSad from '@/assets/logo-sad.png'

const StatusCard = ({
    isError,
    title,
    desc,
    children
}) => {
    console.log(styles);
  return (
    <div className={styles.card}>
        <div className={styles.img}>
            <img src={isError ? logoSad : logo} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
        {children}
    </div>
  )
}

export default StatusCard