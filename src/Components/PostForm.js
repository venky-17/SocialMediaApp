import  {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { database } from "../Firebase/Configure"
import {addDoc, collection} from "firebase/firestore"
import {useAuthState} from "react-firebase-hooks/auth"
import {provider, auth} from "../Firebase/Configure"
import {useNavigate} from "react-router-dom"



const PostForm =()=>{

    const navigate = useNavigate()

    const [user] = useAuthState(auth)

const schema = yup.object().shape({
    title: yup.string().required("add a title"),
    description : yup.string().required("add a desc"),

})

const {register, handleSubmit, formState: {errors}} = useForm({
    resolver:yupResolver(schema)
})



const postRef = collection(database, "posts")

const createPost = async (data)=>{

    // console.log(data);
     await addDoc(postRef,{
        title : data.title,
        description : data.description,
        username : user?.displayName,
       userId: user?.uid, 


     })
    navigate("/home")
   


}


    return(
        <>
           
            <form action="" onSubmit={handleSubmit(createPost)}>
                <input type="text" placeholder="title" {...register("title")} />
                <p style={{color:"red"}}>{errors?.title?.message}</p>
                <textarea type="text" placeholder="description" {...register("description")}/>
                <p style={{color:"red"}}>   {errors?.description?.message}</p>
                <input type="submit"  />
            </form>
        </>
    )
}

export default PostForm