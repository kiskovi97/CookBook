import styles from './SmallReceipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { useNavigate  } from 'react-router';

const DBReceipt = ({proj, hidden}) => {
    const navigate = useNavigate();
    const handleClick = (index) => navigate("/" + index);

    var dishId = proj.dishId;
    return (
        <div hidden={hidden}>
            <ScrollAnimation animateIn={"fadeIn"} animateOnce duration={0.6} offset={0}>
                <div className={styles.receipt} onClick={() => handleClick("dbdish/" + dishId)} >
                    <div className={styles.image} >
                        <img src={proj.image} hidden={!proj.image} alt="" className={styles.background} />
                    </div>
                    <div className={styles.description} >
                        <div className={styles.title}>{proj.title}</div>
                        <div className={styles.details}>{proj.details}</div>
                    </div>
                </div>
            </ScrollAnimation>
        </div>
        )
};

export default DBReceipt