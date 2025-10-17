import '../index.css'
import { useSelector} from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    return (
        <>
        {
            notification.content && <div className={notification.type}>{notification.content}</div>
        }
        </>
    )
}

export default Notification
