import { type FC } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/authContext";
import Button from "../../../../components/Button";
import { logoutAPI } from "../../../../api/authApi";

interface IProps {
  onClose: () => void;
}

const ProfilePopup: FC<IProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  return (
    <div className="popup-card">
      <p className="name">{currentUser?.name}</p>
      {/* <p className="headline">{currentUser?.headline}</p> */}
      <Button
        title="View Profile"
        onClick={() => {
          onClose();
          navigate("/profile", {
            state: {
              id: currentUser?.userID,
            },
          });
        }}
      />
      <Button
        title="Log out"
        onClick={() => {
          onClose();
          logoutAPI();
        }}
      />
    </div>
  );
};

export default ProfilePopup;
