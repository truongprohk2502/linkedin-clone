import type { Dispatch, FC, SetStateAction } from "react";
import { Button, Modal, Progress } from "antd";
import "./style.scss";

interface IProps {
  modalOpen: boolean;
  progress: number;
  currentImage: File | null;
  setCurrentImage: Dispatch<SetStateAction<File | null>>;
  uploadImage: () => void;
  onClose: () => void;
}

const FileUploadModal: FC<IProps> = ({
  modalOpen,
  progress,
  currentImage,
  setCurrentImage,
  uploadImage,
  onClose,
}) => {
  return (
    <div>
      <Modal
        title="Add a Profile Image"
        centered
        open={modalOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={[
          <Button
            disabled={currentImage?.name || progress ? false : true}
            key="submit"
            type="primary"
            onClick={uploadImage}
          >
            Upload Profile Picture
          </Button>,
        ]}
      >
        <div className="image-upload-main">
          <p>{currentImage?.name}</p>
          <label className="upload-btn" htmlFor="image-upload">
            Add an Image
          </label>
          {progress !== 0 && (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          <input
            hidden
            id="image-upload"
            type="file"
            onChange={(e) => setCurrentImage(e.target.files?.[0] || null)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default FileUploadModal;
