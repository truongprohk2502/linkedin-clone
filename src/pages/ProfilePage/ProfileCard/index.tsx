import { useState, type FC } from "react";
import { useAuthContext } from "../../../contexts/authContext";
import { HiOutlinePencil } from "react-icons/hi";
import "./style.scss";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../../../components/FileUploadModal";
import { type IStatus } from "../../HomePage/PostStatus";
import PostCard from "../../../components/PostCard";
import { uploadImageApi } from "../../../api/imageUploadApi";
import PostModal from "../../../components/PostModal";
import { updatePostStatus } from "../../../api/firestoreApi";
import { toast } from "react-toastify";

interface IProps {
  allStatuses: IStatus[];
  toggleVisible: () => void;
}

const ProfileCard: FC<IProps> = ({ allStatuses, toggleVisible }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [editingPostId, setEditingPostId] = useState<string>("");
  const [editStatus, setEditStatus] = useState<string>("");
  const [postingStatus, setPostingStatus] = useState<boolean>(false);

  const location = useLocation();
  const { currentUser } = useAuthContext();

  const uploadImage = () => {
    currentImage &&
      uploadImageApi({
        file: currentImage,
        userId: currentUser?.id as string,
        setProgress,
        onSuccess: () => {
          setCurrentImage(null);
          setModalOpen(false);
          setProgress(0);
        },
      });
  };

  const updateStatus = async () => {
    try {
      setPostingStatus(true);
      await updatePostStatus({
        id: editingPostId,
        status: editStatus,
      });
      setEditingPostId("");
      setEditStatus("");
      setPostingStatus(false);
      toast.success("Post has been updated!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id: string) => {
    setEditingPostId(id);
    setEditStatus(allStatuses.find((item) => item.id === id)?.status || "");
  };

  return (
    <>
      <div className="profile-card">
        {currentUser && currentUser.userID === location.state?.id && (
          <div className="edit-btn">
            <HiOutlinePencil className="edit-icon" onClick={toggleVisible} />
          </div>
        )}
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={currentUser?.imageLink}
              alt="profile-image"
            />
            <h3 className="userName">{currentUser?.name}</h3>
            <p className="heading">{currentUser?.headline}</p>
            <p className="location">{currentUser?.city}</p>
            {currentUser?.website && (
              <a className="website" target="_blank" href={currentUser.website}>
                {currentUser.website}
              </a>
            )}
          </div>

          <div className="right-info">
            <p className="college">{currentUser?.college}</p>
            <p className="company">{currentUser?.company}</p>
          </div>
        </div>
        <p className="about-me">{currentUser?.aboutMe}</p>
        <p className="skills">{currentUser?.skills}</p>
      </div>
      <FileUploadModal
        setCurrentImage={setCurrentImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentImage={currentImage}
        progress={progress}
      />
      <PostModal
        modalOpen={!!editingPostId}
        onClose={() => setEditingPostId("")}
        status={editStatus}
        setStatus={setEditStatus}
        sendStatus={updateStatus}
        postingStatus={postingStatus}
      />
      <div className="post-status-main">
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
    </>
  );
};

export default ProfileCard;
