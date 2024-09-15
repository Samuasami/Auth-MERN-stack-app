import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import SummeryApi from "../common";
import {useNavigate} from 'react-router-dom'

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handlegoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch(SummeryApi.google.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log("Could not login with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handlegoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-80"
    >
      continue with google
    </button>
  );
};

export default Oauth;
