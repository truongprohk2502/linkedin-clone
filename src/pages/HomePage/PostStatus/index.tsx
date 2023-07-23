import { useState, type FC, useEffect } from "react";
import userIcon from "../../../assets/user.png";
import "./style.scss";
import PostModal from "../../../components/PostModal";
import {
  getAllStatus,
  postStatus,
  updatePostStatus,
} from "../../../api/firestoreApi";
import PostCard from "../../../components/PostCard";
import moment from "moment";
import { useAuthContext } from "../../../contexts/authContext";
import { toast } from "react-toastify";

export interface IStatus {
  id: string;
  userID: string;
  userEmail: string;
  userName: string | null;
  status: string;
  timeStamp: string;
}

const PostStatus: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [postingStatus, setPostingStatus] = useState<boolean>(false);
  const [allStatuses, setAllStatuses] = useState<IStatus[]>([]);
  const [editingPostId, setEditingPostId] = useState<string>("");

  const { currentUser } = useAuthContext();

  useEffect(() => {
    const unsubscribe = getAllStatus(setAllStatuses);
    return unsubscribe;
  }, []);

  const sendStatus = async () => {
    setPostingStatus(true);
    await postStatus({
      userID: currentUser?.userID as string,
      userEmail: currentUser?.email as string,
      userName: currentUser?.name || null,
      status,
      timeStamp: moment().format("LLL"),
    });
    setModalOpen(false);
    setStatus("");
    setPostingStatus(false);
  };

  const updateStatus = async () => {
    try {
      setPostingStatus(true);
      await updatePostStatus({
        id: editingPostId,
        status,
      });
      setEditingPostId("");
      setModalOpen(false);
      setStatus("");
      setPostingStatus(false);
      toast.success("Post has been updated!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id: string) => {
    setEditingPostId(id);
    setStatus(allStatuses.find((item) => item.id === id)?.status || "");
  };

  return (
    <>
      <div className="post-status-main">
        <div className="user-details">
          <img src={currentUser?.imageLink} alt="imageLink" />
          <p className="name">{currentUser?.name}</p>
          <p className="headline">{currentUser?.headline}</p>
        </div>
        <div className="post-status">
          <img
            className="post-image"
            src={currentUser?.imageLink || userIcon}
            alt="imageLink"
          />
          <button
            className="open-post-modal"
            onClick={() => setModalOpen(true)}
          >
            Start a Post
          </button>
        </div>
        <div>
          {allStatuses.map((item) => (
            <PostCard
              key={item.id}
              id={item.id}
              status={item.status}
              timeStamp={item.timeStamp}
              isOwn={item.userID === currentUser?.userID}
              userImage={currentUser?.imageLink}
              userID={currentUser?.userID as string}
              userName={currentUser?.name as string}
              headline={currentUser?.headline as string}
              onEdit={() => handleEdit(item.id)}
            />
          ))}
        </div>
      </div>
      <PostModal
        modalOpen={modalOpen}
        onClose={() => {
          setEditingPostId("");
          setModalOpen(false);
        }}
        status={status}
        setStatus={setStatus}
        sendStatus={editingPostId ? updateStatus : sendStatus}
        postingStatus={postingStatus}
      />
    </>
  );
};

export default PostStatus;
