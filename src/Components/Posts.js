import { getDocs, collection, addDoc, query, where, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/Configure";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { provider, auth } from "../Firebase/Configure";

const Post = (props) => {
  const [likeNumbers, setLikeNumbers] = useState({});
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const likesRef = collection(database, "likes");
  const postRef = collection(database, "posts");
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const getPosts = async () => {
    const data = await getDocs(postRef);
    const postList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPosts(postList);

    // Set up real-time listeners for like counts
    data.docs.forEach((postDoc) => {
      const postId = postDoc.id;
      const likesQuery = query(likesRef, where("postId", "==", postId));
      const unsubscribe = onSnapshot(likesQuery, (querySnapshot) => {
        setLikeNumbers((prevLikeNumbers) => ({
          ...prevLikeNumbers,
          [postId]: querySnapshot.size,
        }));
      });
    });
  };

  const getUserLikedPosts = async () => {
    if (user) {
      const userId = user.uid;
      const likedPostQuery = query(likesRef, where("userId", "==", userId));
      const likedPostData = await getDocs(likedPostQuery);
      const likedPostIds = likedPostData.docs.map((doc) => doc.data().postId);
      setLikedPosts(likedPostIds);
    }
  };

  useEffect(() => {
    getPosts();
    getUserLikedPosts();
  }, [user]);

  const toggleLike = async (post) => {
    const postId = post.id;
    const userId = user.uid;

    if (!userId) {
      // User not logged in, handle accordingly
      return;
    }

    // Check if the user has already liked the post
    const likedPostQuery = query(likesRef, where("userId", "==", userId), where("postId", "==", postId));
    const likedPostSnapshot = await getDocs(likedPostQuery);

    if (likedPostSnapshot.empty) {
      // If the user hasn't liked the post, add a like
      await addDoc(likesRef, { userId, postId });
      setLikedPosts([...likedPosts, postId]);
    } else {
      // If the user has already liked the post, remove the like
      const likeId = likedPostSnapshot.docs[0].id;
      await deleteDoc(doc(likesRef, likeId));
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    }

    // Update liked posts
    navigate("/home");
  };

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <h5>@{post.username}</h5>
          <button onClick={() => toggleLike(post)}>
            {likedPosts.includes(post.id) ? "Dislike" : "Like"} &#128077;
          </button>
          <p>Likes: {likeNumbers[post.id] || 0}</p>
        </div>
      ))}
    </>
  );
};

export default Post;
