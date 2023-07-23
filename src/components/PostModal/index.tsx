import { type FC, type Dispatch, type SetStateAction } from "react";
import { Button, Modal } from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import ReactQuill from "react-quill";
import "./style.scss";

interface IProps {
  modalOpen: boolean;
  postingStatus: boolean;
  status: string;
  onClose: () => void;
  setStatus: Dispatch<SetStateAction<string>>;
  sendStatus: () => void;
}

const PostModal: FC<IProps> = ({
  modalOpen,
  postingStatus,
  status,
  onClose,
  setStatus,
  sendStatus,
}) => {
  return (
    <Modal
      title="Create a post"
      centered
      open={modalOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button
          key="submit"
          type="primary"
          disabled={status.length > 0 ? false : true}
          loading={postingStatus}
          onClick={sendStatus}
        >
          Post
        </Button>,
      ]}
    >
      <div className="posts-body">
        <ReactQuill
          className="modal-input"
          theme="snow"
          value={status}
          placeholder="Share Something Useful.."
          onChange={setStatus}
        />
      </div>
      <label htmlFor="pic-upload">
        <AiOutlinePicture size={35} className="picture-icon" />
      </label>
    </Modal>
  );
};

export default PostModal;
