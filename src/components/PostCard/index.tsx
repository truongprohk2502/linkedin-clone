import { type FC } from "react";
import "./style.scss";
import { BsPencil, BsTrash } from "react-icons/bs";
import userIcon from "../../assets/user.png";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import { deletePost } from "../../api/firestoreApi";

interface IProps {
  id: string;
  status: string;
  timeStamp: string;
  isOwn: boolean;
  userImage: string | null | undefined;
  userID: string;
  userName: string;
  headline: string;
  onEdit: () => void;
}

const PostCard: FC<IProps> = ({
  id,
  status,
  timeStamp,
  isOwn,
  userImage,
  userID,
  userName,
  headline,
  onEdit,
}) => {
  const navigate = useNavigate();

  return (
    <div className="posts-card">
      <div className="post-image-wrapper">
        {isOwn && (
          <div className="action-container">
            <BsPencil size={20} className="action-icon" onClick={onEdit} />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(id)}
            />
          </div>
        )}
        <img
          alt="profile-image"
          className="profile-image"
          src={userImage || userIcon}
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: userID },
              })
            }
          >
            {userName}
          </p>
          <p className="headline">{headline}</p>
          <p className="timestamp">{timeStamp}</p>
        </div>
      </div>
      <p dangerouslySetInnerHTML={{ __html: status }} className="status" />
      <LikeButton postId={id} />
    </div>
  );
};

export default PostCard;
