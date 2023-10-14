import { useState } from "react"
import {auth, provider} from "../Firebase/Configure"
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import {useNavigate} from "react-router-dom"

const SignUp = ()=>{

    const navigate = useNavigate()

   const [mail, setMail] = useState("")
   const[password, setPassword] = useState("")

   const handleSignUp = (e)=>{
    e.preventDefault()
    createUserWithEmailAndPassword(auth, mail, password)
    .then((userCredential)=>{
        const userDetails = userCredential.user;
        console.log(userDetails);
        navigate("/home")
    })
    .catch((error)=>{
        console.log(error);
    })


   }
     

   const SignInWithGoogle = async ()=>{
    const result = await signInWithPopup(auth, provider)
 //    console.log(result);
 navigate("/home")
     
 }
    return(
        <>
        <button onClick={SignInWithGoogle}>Continue with Google</button>
        <form action="">
        <p>Create Account</p>
        <input type="text" placeholder="enter ur email" onChange={(e)=> setMail(e.target.value)} /> <br />
        <input type="password" placeholder="enter password" onChange={(e)=> setPassword(e.target.value)} /> <br />
        <button type="submit" onClick={handleSignUp}>SignUp</button>

        </form>
       </>
    )
}

export default SignUp