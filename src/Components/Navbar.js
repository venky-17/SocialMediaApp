import {Link} from "react-router-dom"
import {provider, auth} from "../Firebase/Configure"
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"
import {useNavigate} from "react-router-dom"

const Navbar = ()=>{
    const navigate = useNavigate()

    const [user] = useAuthState(auth)
    const handleLogOut = async ()=>{
        await signOut(auth)
        navigate("/")


    }
    return(
        <>
            <Link to="/">Home</Link>
          

                <div>
                    <p>{!user &&   (

                        <>  <Link to="/login">Login</Link>
                               <Link to="/signup">SignUp</Link>
                        </>
                    )}</p>
                </div>

            <div>
               {user && (
                <div>
                <p>{user?.displayName}</p>
                 {(!user?.displayName ? `${user?.email}`: "")}
                <img src={user?.photoURL} alt="" />
                <Link to="/createpost">Create Post</Link>
                <button onClick={handleLogOut}>Logout</button>
                </div>
               )
               
               }
            </div>
            
         

        </>
    )
}

export default Navbar