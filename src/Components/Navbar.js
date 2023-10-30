import React from "react";
import { Link } from "react-router-dom";
import { provider, auth } from "../Firebase/Configure";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./CSS/Navbar.css"; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <Link to="/home" className="nav-link">
        Home
      </Link>

      <div>
        <p>
          {!user && (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                SignUp
              </Link>
            </>
          )}
        </p>
      </div>

      {user && (
        <div className="user-info">
          <p>
            {user?.displayName ? user?.displayName : user?.email}
          </p>
          <img src={user?.photoURL} alt="" />
          <Link to="/createpost" className="nav-link">
            Create Post
          </Link>
          <button onClick={handleLogOut} className="user-info-button">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
