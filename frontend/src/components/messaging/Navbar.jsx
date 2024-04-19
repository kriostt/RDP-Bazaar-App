import { Link, useHistory } from "react-router-dom";



function Navbar(conversations) {
 

  return (
    <div className='navbar'>
           <span className="logo">RDP messaging</span> 
           <div className="user">
                {/* <img src="" alt="" /> */}
                {/* <span>display name here</span> */}
                <Link to="/seller" className='nav-link'>
                        <button>Back</button>
                </Link>
           </div>
    </div>
  )
}

export default Navbar