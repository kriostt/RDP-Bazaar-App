import Chats from "./Chats"
import Navbar from "./Navbar"
import Search from "./Search"

const Sidebar = ({ conversations,onConversationSelect  }) => {
    return (
      <div className='sidebar'>
          <Navbar conversations={conversations} />
          <Search />
          <Chats conversations={conversations} onConversationSelect={onConversationSelect}  />
      </div>
    )
  }
  
  export default Sidebar