import { type FC, useState } from "react";
import "../styles/Login.scss";
import { loginAPI } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LinkedinLogo from "../assets/linkedinLogo.png";

interface ICredentials {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const [credentails, setCredentials] = useState<ICredentials>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await loginAPI(credentails.email, credentails.password);
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email as string);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Please Check your Credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
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
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
