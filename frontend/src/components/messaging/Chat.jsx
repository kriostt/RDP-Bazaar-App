import React from "react";
import Input from "./Input";
import Messages from "./Messages";
import { Link } from "react-router-dom";

function Chat({ selectedConversation,onConversationSelect }) {
    // if (!selectedConversation || !Array.isArray(selectedConversation)) {
    //     return <div className="chat">No conversation selected</div>;
    // }

    // console.log("selected Conversation in Chat component",selectedConversation);
   
    // Extracting the first conversation from selectedConversation to use its data
    // const firstConversation = selectedConversation[0];

    // if (!firstConversation) {
    //     return <div className="chat">No conversation data available</div>;
    // }

    // const { receiverUser, messages,senderUser } = firstConversation;
    // let receiverUsr = "";
    // let senderImgUrl = "";
    
     
     
     
    // if (sessionStorage.getItem('usrID') == senderUser.userId) {
    //   receiverUsr = receiverUser.userId;  
    //   senderImgUrl = senderUser.imgurl;  
    // } else {
    //   receiverUsr = senderUser.userId// Assign receiver's first name to receiverUsr
    //   senderImgUrl = receiverUser.imgurl; // Assign sender's image URL to senderImgUrl
    // }

    const receiverUsr = sessionStorage.getItem("recieverUserId");  
    const recieverfirstName = sessionStorage.getItem("recieverfirstName");
    const receiverimgurl = sessionStorage.getItem("recieverimgurl");

    const senderImgUrl = sessionStorage.getItem("senderimgurl");
    

    return (
        <div className="chat">
            <div className="chatInfo">   
                <div className="chatIcons">             
                    <span>{recieverfirstName}</span>
                
                    <img src={receiverimgurl} alt="" />
                </div>  
                <Link to="/sellersCatalog" className='nav-link'>
                        <button>Back</button>
                </Link>             
            </div>
            {selectedConversation && (
                <Messages selectedConversation={selectedConversation} />
            )}
            
            <Input receiverUsrID = {receiverUsr} senderImg = {senderImgUrl} receiverUser = {receiverUsr}  onConversationSelect={onConversationSelect} selectedConversation={selectedConversation} />
        </div>
 
    );
}

export default Chat;
