import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {

  const notification = useSelector(s => s.notification);

  if (notification.msg === null) {
    return null;
  }


  return (
    <Alert variant={notification.style === "succ" ? "success" : "danger"} className={notification.style}>
      {notification.msg}
    </Alert>
  );
};

export default Notification;
