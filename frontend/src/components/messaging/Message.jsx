import React, { useEffect, useRef } from "react";

const Message = ({ selectedConversation }) => {
    const messagesEndRef = useRef(null);

    // Scroll to the bottom of the messages container when selectedConversation changes
    useEffect(() => {
        scrollToBottom();
    }, [selectedConversation]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Check if selectedConversation exists and contains messages
    if (!selectedConversation || selectedConversation.length === 0) {
        return <div className="message">No messages available</div>;
    }

    return (
        <div>
            {selectedConversation.map((conversation, index) => (
                <div key={index} className={`message ${conversation.senderUser.usrid == sessionStorage.getItem('usrID') && "owner"}`}>
                    <div className="messageInfo">
                        <img src={conversation.senderUser.imgurl} alt="User" />
                        <span>{formatDate(conversation.createdAt)}</span>
                    </div>
                    <div className="messageContent">
                        <p>{conversation.message}</p>
                    </div>
                </div>
            ))}
            {/* Empty div used as a reference to scroll to */}
            <div ref={messagesEndRef} />
        </div>
    );
};

// Helper function to format date
const formatDate = (dateArray) => {
    if (dateArray && Array.isArray(dateArray) && dateArray.length >= 5) {
        const [year, month, day, hours, minutes] = dateArray;

        // Month names array
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];

        // Determine AM or PM
        const period = hours >= 12 ? "pm" : "am";

        // Convert 24-hour time to 12-hour format
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = String(minutes).padStart(2, "0");

        // Construct the formatted date string
        const formattedDate = `${monthNames[month - 1]} ${day}, ${year} at ${formattedHours}:${formattedMinutes} ${period}`;

        return formattedDate;
    }

    return "Just Now";
};

export default Message;
