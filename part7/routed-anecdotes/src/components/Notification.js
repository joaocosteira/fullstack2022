const Notification = ({ notification }) =>{
    
    if(notification === null){
        return null
    }else{
        return <p>{notification}</p>
    }

}

export default Notification