import { useSelector } from "react-redux";

const Notification = () => {

  const notification = useSelector(s => s.notification);

  if (notification.msg === null) {
    return null;
  }

  const style = {
    color: notification.style === "succ" ? "green" : "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    <div style={style} className={notification.style}>
      {notification.msg}
    </div>
  );
};

export default Notification;
