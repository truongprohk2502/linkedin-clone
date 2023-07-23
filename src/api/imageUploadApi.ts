import type { Dispatch, SetStateAction } from "react";
import { editProfile } from "./firestoreApi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage } from "../firebaseConfig";

interface IUploadImageProps {
  file: File;
  userId: string;
  setProgress: Dispatch<SetStateAction<number>>;
  onSuccess: () => void;
}

const uploadImageApi = ({
  file,
  userId,
  setProgress,
  onSuccess,
}: IUploadImageProps) => {
  const profilePicsRef = ref(firebaseStorage, `profileImages/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(progress);

      setProgress(progress);
    },
    (err) => {
      console.error(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response: string) => {
        editProfile(userId, { imageLink: response });
        onSuccess();
      });
    }
  );
};

export { uploadImageApi };
