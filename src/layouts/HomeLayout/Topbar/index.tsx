import { useState, type FC } from "react";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import userIcon from "../../../assets/user.png";
import "./style.scss";
import { useAuthContext } from "../../../contexts/authContext";
import ProfilePopup from "./ProfilePopup";

const Topbar: FC = () => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  return (
    <div className="topbar-main">
      {popupVisible && (
        <div className="popup-position">
          <ProfilePopup onClose={() => setPopupVisible(false)} />
        </div>
      )}
      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
      <div className="react-icons">
        <AiOutlineSearch size={30} className="react-icon" />
        <AiOutlineHome
          size={30}
          className="react-icon"
          onClick={() => navigate("/")}
        />
        <AiOutlineUserSwitch
          size={30}
          className="react-icon"
          onClick={() => navigate("/connections")}
        />
        <BsBriefcase size={30} className="react-icon" />
        <AiOutlineMessage size={30} className="react-icon" />
        <AiOutlineBell size={30} className="react-icon" />
      </div>
      <img
        className="user-logo"
        src={currentUser?.imageLink || userIcon}
        alt="user"
        onClick={() => setPopupVisible(!popupVisible)}
      />
    </div>
  );
};

export default Topbar;
