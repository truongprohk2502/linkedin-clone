import { type FC, useState } from "react";
import "../styles/Login.scss";
import { registerAPI } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { postUserData } from "../api/firestoreApi";
import uuid from "react-uuid";

interface ICredentials {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: FC = () => {
  const [credentails, setCredentials] = useState<ICredentials>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await registerAPI(credentails.email, credentails.password);
      toast.success("Account Created!");
      await postUserData({
        userID: uuid(),
        name: credentails.name,
        email: credentails.email,
        imageLink:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      });
      navigate("/");
      localStorage.setItem("userEmail", res.user.email as string);
    } catch (err) {
      console.error(err);
      toast.error("Cannot Create your Account");
    }
  };

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/login")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
