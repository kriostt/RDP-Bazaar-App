import React, { useState } from "react";


function Chats({ conversations, onConversationSelect }) {

    console.log("convo",conversations);
    // Group conversations by sender and receiver
    // console.log("onConversationSelect--->",onConversationSelect)
    const conversationsBySenderReceiver = {};
    const conversationsByReceiver={};

    conversations.forEach((conversation) => {
        const senderId = conversation.senderUser.userId;
        const receiverId = conversation.receiverUser.userId;
    
        const key = `${senderId}_${receiverId}`;
    
        if (!conversationsBySenderReceiver[key]) {
            conversationsBySenderReceiver[key] = [];
        }

        const keyreceive = `${receiverId}`;
    
        if (!conversationsByReceiver[keyreceive]) {
            conversationsByReceiver[keyreceive] = [];
        }
    
        // Filter out receiverUser that is equal to sessionStorage value
        // if (receiverId != sessionStorage.getItem('decryptuserID') || senderId != sessionStorage.getItem('decryptuserID')  ) {
            // console.log(receiverId +" != "+ sessionStorage.getItem('decryptuserID') + " || "+ senderId + "!=" + sessionStorage.getItem('decryptuserID'))
            conversationsBySenderReceiver[key].push(conversation);

            conversationsByReceiver[keyreceive].push(conversation);
        // }
    });
    // console.log("current user id logged in"+sessionStorage.getItem('decryptuserID'));

    const [selectedConversation, setSelectedConversation] = useState(null);
    
    const handleChatItemClick = (receiverUserId) => {
        // Find the conversation based on the receiverUserId and pass it to the Chat component
        const selectedConversation = conversations.filter(
            (conversation) => (conversation.receiverUser.userId === receiverUserId || conversation.senderUser.userId === receiverUserId) 
        );        
        // console.log("selected conversation",selectedConversation);
        setSelectedConversation(selectedConversation);
        onConversationSelect(selectedConversation);
        
        
    };

    // console.log("kachat napasa sa chats component",conversationsBySenderReceiver);

    return (
        <div className='chats'>
             {/* Render user chat information for each sender and receiver */}
             {Object.keys(conversationsBySenderReceiver).map((key) => {
                const conversations = conversationsBySenderReceiver[key];
                 let lastMessage = "";
;                {Object.keys(conversationsByReceiver).map((keyreceive) => {
                    const convofromReceiver = conversationsByReceiver[keyreceive];
                     lastMessage = convofromReceiver[convofromReceiver.length - 1]; // Get the last message
                })}
                
               
                 
                if(conversations[0].receiverUser.userId != sessionStorage.getItem('usrID') )
                {               
                    console.log(conversations[0].receiverUser.userId+"!="+ sessionStorage.getItem('usrID'));
                    return (
                        <div key={lastMessage.receiverUser.receiveruserid} 
                            className="userChat"
                            onClick={() => handleChatItemClick(lastMessage.receiverUser.userId)}
                        >
                            <img src={lastMessage.receiverUser.imgurl} alt="User Avatar" />
                            <div className="userChatInfo">
                                <span>{lastMessage.receiverUser.fname}</span>
                                <p>{lastMessage.message}</p>
                            </div>
                        </div>
                    );
                }   
            })}

            {/* Pass selectedConversation data to Chat component if it's not null */}
            {/* {selectedConversation && <Home selectedConversation={selectedConversation} />} */}
        </div>
    );
}

export default Chats;
