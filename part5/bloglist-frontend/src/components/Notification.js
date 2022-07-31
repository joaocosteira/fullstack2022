const Notification = ({ notification }) => {
    if (notification.message === null) {
      return null
    }

    const style = {
        "color": notification.style === "succ" ? "green" : "red",
        "background": "lightgrey",
        "fontSize": "20px",
        "borderStyle": "solid",
        "borderRadius": "5px",
        "padding": "10px",
        "marginBottom": "10px"
      }
  
    return (
      <div style={style} className={notification.type}>
        {notification.message}
      </div>
    )
  }
  
  export default Notification