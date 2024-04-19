import React from "react";
import Input from "./Input";
import Messages from "./Messages";

function Chat({ selectedConversation,onConversationSelect }) {
    if (!selectedConversation || !Array.isArray(selectedConversation)) {
        return <div className="chat">No conversation selected</div>;
    }

    console.log("selected Conversation in Chat component",selectedConversation);
   
    // Extracting the first conversation from selectedConversation to use its data
    const firstConversation = selectedConversation[0];

    if (!firstConversation) {
        return <div className="chat">No conversation data available</div>;
    }

    const { receiverUser, messages,senderUser } = firstConversation;
    let receiverUsr = "";
    let senderImgUrl = "";
    
     
     
     
    if (sessionStorage.getItem('usrID') == senderUser.userId) {
      receiverUsr = receiverUser.userId;  
      senderImgUrl = senderUser.imgurl;  
    } else {
      receiverUsr = senderUser.userId// Assign receiver's first name to receiverUsr
      senderImgUrl = receiverUser.imgurl; // Assign sender's image URL to senderImgUrl
    }
    return (
        <div className="chat">
            <div className="chatInfo">                
                <span>{receiverUser.fname}</span>
                <div className="chatIcons">
                    <img src={receiverUser.imgurl} alt="" />
                </div>               
            </div>
            <Messages selectedConversation={selectedConversation} />          
            <Input receiverUsrID = {receiverUsr} senderImg = {senderImgUrl} receiverUser = {receiverUser}  onConversationSelect={onConversationSelect} selectedConversation={selectedConversation} />
        </div>
 
    );
}

export default Chat;
