import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import SummeryApi from "../common";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setformData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("current user is ", currentUser);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    try {
      dispatch(updateUserStart());
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          setImageError(true); // Handle errors during upload
        },
        () => {
          // Handle successful upload
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setformData({ ...formData, profilepicture: downloadURL });
          });
        }
      );
    } catch (error) {
      console.log("There is an error here:", error);
    }
  };
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const userId = currentUser.id || currentUser._id;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const url = `${SummeryApi.update.url}/${userId}`;
      console.log("Request URL:", url);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      console.log("Response Status:", res.status);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      if (data.success === false) {
        dispatch(updateUserFailure(data));
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
      console.log("Fetch Error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const url = `${SummeryApi.delete.url}/${userId}`;
      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));

      console.log("Error deleting account:", error);
    }
  };

  const handleSignOut = async () => {
    // Dispatch sign-out action to update the app state
    dispatch(signOut());
  
    try {
      const url = `${SummeryApi.signout.url}`;
      const res = await fetch(url, {
        method: "GET",
        credentials: "include", // Include cookies for authentication
      });
  
      // Check if the response was successful
      if (!res.ok) {
        const errorData = await res.json(); // Get error response if available
        throw new Error(errorData.message || "Sign-out failed");
      }
  
      console.log("Successfully signed out");
    } catch (error) {
      // Log the error with more detail
      console.error("Sign-out error:", error.message || error);
    }
  };
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="tet-3xl font-semiboald text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
          src={
            formData.profilepicture
              ? formData.profilepicture
              : currentUser.profilepicture
          }
          alt="profile"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm text-center">
          {imageError ? (
            <span className="text-red-700">Error Uploading image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">
              {`Uploading: ${imagePercent} %`}
            </span>
          ) : imagePercent === 100 ? (
            <span className="text-slate-900">Image upload successfuly</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          defaultValue={currentUser.username}
          id="username"
          placeholder="UserName"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong"}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "User Updated successfully"}
      </p>
    </div>
  );
};

export default Profile;
