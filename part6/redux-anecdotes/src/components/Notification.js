import { useSelector } from "react-redux"

const Notification = () => {

  const notification = useSelector(s => s.notification)
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

export default Notification