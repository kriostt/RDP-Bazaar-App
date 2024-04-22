import { useEffect, useState } from "react";

import axios from "axios";
import bcrypt from 'bcryptjs';
import "./style.scss";
import Sidebar from "../../components/messaging/Sidebar";
import Chat from "../../components/messaging/Chat";
const POLLING_INTERVAL = 5000; // Polling interval in milliseconds (e.g., every 5 seconds)

function Home() {

    const [users, setUsers] = useState([]); 
    const [matchingUsrID, setMatchingUsrID] = useState(null);
    const [senderConversations, setSenderConversations] = useState([]);

    const [selectedConversation, setSelectedConversation] = useState(null);

    const handleConversationSelect = (conversation) => {
        setSelectedConversation(conversation);       
       
       // console.log("updated convo",senderConversations);       
    };

    
    // useEffect(() => {
    //     // Extract hashedUsrID from URL query parameters
    //     const queryParams = new URLSearchParams(window.location.search);
    //     const hashedUsrID = queryParams.get('hashedUsrID');

    //     if (hashedUsrID) {
    //         // Store the hashedUsrID in sessionStorage (treat it as a hashed value)
    //         sessionStorage.setItem('hashedUsrID', hashedUsrID);
    //     }
    // }, []);

    
    
     

   
    // Retrieve the hashedUsrID from sessionStorage
    const hashedUsrID = sessionStorage.getItem('usrID');
   
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9090/api/conversation/users");
                setUsers(response.data); // Set users fetched from the API
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, []); // Fetch data on component mount

   


    useEffect(() => {
        // Compare hashedUsrID with each user's usrid using bcrypt
        if (hashedUsrID && users.length > 0) 
        {
            for (const user of users) {
                // const isMatch = bcrypt.compare(hashedUsrID, user.usrid.toString());
                // console.log("loop user",user.usrid.toString())
                // if (isMatch) 
                // {
                //     setMatchingUsrID(user.usrid); // Set the matching usrid if found                    
                //     break;
                // }
                if(hashedUsrID == user.userId.toString())
                {
                    setMatchingUsrID(user.userId); // Set the matching usrid if found                    
                    break;
                }
            }
        }
    }, [hashedUsrID, users]);

   // console.log("user logged in messaging",matchingUsrID)
    // useEffect(() => {
    //     const fetchSenderConversations = async () => {
    //         try {
    //             if (matchingUsrID) {
    //                 // sessionStorage.setItem('decryptuserID', matchingUsrID);
    //                 const response = await axios.get(`http://localhost:9090/api/conversation/by-sender/${matchingUsrID}`);
    //                 console.log("list of conversation",response.data)
    //                 setSenderConversations(response.data); // Set conversations fetched for the matching user                   
                    
    //             }
    //         } catch (error) {
    //             console.error("Error fetching sender conversations:", error);
    //         }
    //     };

    //     fetchSenderConversations();
        
    //     // Set up polling with setInterval
    //     const intervalId = setInterval(fetchSenderConversations, POLLING_INTERVAL);

    //     // Clean up the interval on component unmount
    //     return () => clearInterval(intervalId);
    // }, [matchingUsrID,selectedConversation]); // Fetch sender conversations when matchingUsrID changes
    // console.log("ka chat niya",senderConversations);
    useEffect(() => {
        const fetchSenderConversations = async () => {
            try {
                if (matchingUsrID) {
                    const response = await axios.get(`http://localhost:9090/api/conversation/by-sender/${matchingUsrID}`);
                    //console.log("list of conversation", response.data);
    
                    // Filter conversations based on senderUser and receiverUser conditions
                    const filteredConversations = response.data.filter(conversation => {
                        const { senderUser, receiverUser } = conversation;
                        const loggedInUserId = sessionStorage.getItem('usrID');
                        const receiverUserId = sessionStorage.getItem('recieverUserId');
                        // console.log("senderUser",senderUser.userId)
                        // console.log("loggedInUserId",loggedInUserId);
                        // console.log("receiverUserId",receiverUserId);
    
                        // Check if senderUser is equal to loggedInUserId and receiverUser is equal to receiverUserId
                        const condition1 = senderUser.userId == loggedInUserId && receiverUser.userId == receiverUserId;
    
                        // Check if senderUser is equal to receiverUserId and receiverUser is equal to loggedInUserId
                        const condition2 = senderUser.userId == receiverUserId && receiverUser.userId == loggedInUserId;
    
                        return condition1 || condition2;
                    });
    
                    setSenderConversations(filteredConversations);
                    // console.log("fetch from axios",response)
                    // console.log("sender and receiver convo",senderConversations)
                    
                }
            } catch (error) {
                console.error("Error fetching sender conversations:", error);
            }
        };
    
        fetchSenderConversations();
    
        // Set up polling with setInterval
        const intervalId = setInterval(fetchSenderConversations, POLLING_INTERVAL);
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [matchingUsrID,selectedConversation ,sessionStorage.getItem('usrID'), sessionStorage.getItem('recieverUserId')]);
    

     
    
    

    return (
        <div className='home'>
            <div className="container">              
                {/* <Sidebar conversations={senderConversations} onConversationSelect={handleConversationSelect }  />                      */}
                <Chat selectedConversation = {senderConversations}  onConversationSelect={handleConversationSelect } />
                
            </div>
        </div>
    );
}

export default Home;
