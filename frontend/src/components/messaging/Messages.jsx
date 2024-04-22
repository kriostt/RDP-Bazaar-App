import Message from "./Message"

const Messages = (selectedConversation) => 
{
    //console.log("selected messages in Messages Component",selectedConversation)
    // console.log("data passed in Messages component",selectedConversation)
      return (                 
                  <div className='messages'>                 
                    <Message selectedConversation= {selectedConversation.selectedConversation}/>         
                  </div>                              
    );      
}

export default Messages    