import {provider, auth} from "../Firebase/Configure"
import {signInWithPopup, signInWithEmailAndPassword} from "firebase/auth"
import {useNavigate} from "react-router-dom"
import { useState } from "react"


const Login = ()=>{
    const [mail, setMail] = useState("")
    const[password, setPassword] = useState("")



    const navigate = useNavigate()


    const SignInWithGoogle = async ()=>{
       const result = await signInWithPopup(auth, provider)
    //    console.log(result);
    navigate("/home")
        
    }


    const handleLogIn = (e)=>{
        e.preventDefault()
         signInWithEmailAndPassword(auth, mail, password)
         .then((userCredential) => {
           
            const user = userCredential.user;
            console.log(user);
            navigate("/home")
          })
          .catch((error) => {
           alert(error)
          });
        

    }



    return(
       <>
        <button onClick={SignInWithGoogle}> Continue with Google</button>
        <form action="">
       
        <input type="text" placeholder="enter ur email" onChange={(e)=> setMail(e.target.value)} /> <br />
        <input type="password" placeholder="enter password" onChange={(e)=> setPassword(e.target.value)} /> <br />
        <button type="submit" onClick={handleLogIn}>login</button>

        </form>
       </>
    )
}

export default Login