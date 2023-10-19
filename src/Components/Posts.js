import { getDocs, collection } from "firebase/firestore";
import { database } from "../Firebase/Configure";
import { useEffect, useState } from "react";

const Post = (props) => {
  const postRef = collection(database, "posts");
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPosts(data.docs.map((doc)=> ({...doc.data(), id:doc.id})));
  };

  useEffect(() => {
    getPosts(); // This will run getPosts when the component mounts (only once).
  }, []); // The empty dependency array [] ensures that this effect runs only on mount.

//   console.log(posts.description); // Corrected: Log the 'posts' state here.

  return (
    <>
        
        {posts?.map((post) => (
          <div key={post?.id} className="post">
            <h2>{post?.title}</h2>
            <p>{post?.description}</p>
            <h5>@{post?.username}</h5>
          </div>
        ))}
    </>
  );
};

export default Post;
