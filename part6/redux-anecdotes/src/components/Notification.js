//import { useSelector } from "react-redux"
import { connect } from 'react-redux'

const Notification = (props) => {

  //const notification = useSelector(s => s.notification)
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log("Notification", notification);
  
  if(notification.msg === null){
    return null
  }else{
    return (
      <div style={style}>{notification.msg}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

//export default Notification
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification