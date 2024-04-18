import { useState } from "react";
import axios from "axios";

function Input({ receiverUsrID,senderImg,receiverUser, onConversationSelect,selectedConversation}) {
    const [text, setText] = useState("");
    const [currentTime,setCurrTime] = useState("");
    console.log("receiver user",receiverUsrID);
    
    //  console.log("selected conversationss in INput Component",selectedConversation);
     const [convo, setSelectedConversation] = useState(null);
    const handleSendClick = async () => {
        // Get the current date and time
        const currentDate = new Date();
        // Subtract 6 hours
        currentDate.setHours(currentDate.getHours() - 6);
        // Convert the adjusted date to ISO string
        const adjustedDateTime = currentDate.toISOString();

        const data = {
            message: text,
            createdAt: adjustedDateTime, // Current timestamp
            senderUser: {
                userId: sessionStorage.getItem('usrID') 
            },
            receiverUser: {
                userId: receiverUsrID
            }
        };

        try {
            // Send the POST request to the API endpoint
            const response = await axios.post("http://localhost:9090/api/conversation", data);

            // Invoke the onConversationSelect callback with the updated conversation

            const selectedConvo = selectedConversation.filter(
                (conversation) => ((conversation.receiverUser.userId === receiverUsrID || conversation.senderUser.userId === sessionStorage.getItem('usrID')) || (conversation.receiverUser.userId === sessionStorage.getItem('usrID')  || conversation.senderUser.userId === receiverUsrID ) ) 
            );      

            const addeddata = {
                message: text,
                createdAt: "Just Now", // Current timestamp
                senderUser: {
                    userId: sessionStorage.getItem('usrID'), 
                    imgurl:senderImg
                },
                receiverUser: {
                    userId: receiverUser.userId
                }
            };
    


             // Create a new array by combining selectedConvo and response.data
            const updatedSelectedConvo = [...selectedConvo, addeddata];

            // Update the state with the updated conversation array
            setSelectedConversation(updatedSelectedConvo);

            // Invoke the onConversationSelect callback with the updated conversation
            onConversationSelect(updatedSelectedConvo);
            
            // setSelectedConversation(selectedConvo);
            // onConversationSelect(selectedConvo);

            // Handle success (optional)
            console.log("Message sent successfully:", updatedSelectedConvo);

            // Clear the input after sending
            setText("");

        } catch (error) {
            // Handle error (optional)
            console.error("Error sending message:", error);
        }
    };

    

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">               
                <button onClick={handleSendClick}>Send</button>
            </div>
        </div>
    );
}

export default Input;
