import styles from './SmallReceipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { Link } from 'react-router'

const SmallReceipt = ({proj, hidden}) => {

    var imageLink = proj?.image?.replace("static/media", "images");
    var id = proj.id;
    return (
        <div hidden={hidden}>
            <ScrollAnimation animateIn={"fadeIn"} animateOnce duration={0.6} offset={0}>
                <Link className={styles.receipt} to={"/dbdish/" + id} >
                    <div className={styles.image} >
                        <img src={imageLink} hidden={!proj.image} alt="" className={styles.background} />
                    </div>
                    <div className={styles.description} >
                        <div className={styles.title}>{proj.title}</div>
                        <div className={styles.details}>{proj.details}</div>
                    </div>
                </Link>
            </ScrollAnimation>
        </div>
        )
};

export default SmallReceipt