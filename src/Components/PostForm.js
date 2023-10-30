import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { database } from "../Firebase/Configure";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Configure";
import { useNavigate } from "react-router-dom";
import "./CSS/PostForm.css"; // Import the CSS file

const PostForm = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    title: yup.string().required("Add a title"),
    description: yup.string().required("Add a description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postRef = collection(database, "posts");

  const createPost = async (data) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/home");
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit(createPost)} className="post-form">
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="form-input"
        />
        <p className="error-message">{errors?.title?.message}</p>
        <textarea
          placeholder="Description"
          {...register("description")}
          className="form-textarea"
        />
        <p className="error-message">{errors?.description?.message}</p>
        <input type="submit" value="Create Post" className="submit-button" />
      </form>
    </div>
  );
};

export default PostForm;
