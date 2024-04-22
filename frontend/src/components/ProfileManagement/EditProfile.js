import React from "react"; // Importing React hooks for managing component state
import "../../App.css";
import { useParams } from "react-router-dom"; // Importing useParams hook
import ProfileManagement from "./ProfileManagement";

// Edit Profile Page
const EditProfile = () => {
  const { userId } = useParams();
  return (
    <div className="App">
      <h2 className="profile-heading">My Profile</h2>
      <ProfileManagement userId={userId} />
    </div>
  );
};

export default EditProfile;
