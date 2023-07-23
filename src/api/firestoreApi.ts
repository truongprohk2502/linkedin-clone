import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";
import { toast } from "react-toastify";
import type { Dispatch, SetStateAction } from "react";
import type { IStatus } from "../pages/HomePage/PostStatus";
import type { IComment } from "../components/LikeButton";
import type { IAuthUser } from "../contexts/authContext";

const postsRef = collection(firebaseFirestore, "posts");
const usersRef = collection(firebaseFirestore, "users");
const likeRef = collection(firebaseFirestore, "likes");
const commentsRef = collection(firebaseFirestore, "comments");
const connectionsRef = collection(firebaseFirestore, "connections");

interface ICreateStatus {
  userID: string;
  userEmail: string;
  userName: string | null;
  status: string;
  timeStamp: string;
}

const postStatus = (data: ICreateStatus) => {
  return addDoc(postsRef, data)
    .then(() => {
      toast.success("Post has been added successfully");
    })
    .catch((err) => {
      console.error(err);
    });
};

interface IUpdateStatusData {
  id: string;
  status: string;
}

const updatePostStatus = ({ id, status }: IUpdateStatusData) => {
  const docToUpdate = doc(postsRef, id);
  return updateDoc(docToUpdate, { status });
};

const getAllStatus = (setter: Dispatch<SetStateAction<IStatus[]>>) => {
  return onSnapshot(postsRef, (res) => {
    setter(
      res.docs.map((item) => ({ ...(item.data() as IStatus), id: item.id }))
    );
  });
};

const getAllStatusByUser = (
  userId: string,
  setAllStatus: Dispatch<SetStateAction<IStatus[]>>
) => {
  const singlePostQuery = query(postsRef, where("userID", "==", userId));
  const unsubscribe = onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...(docs.data() as IStatus), id: docs.id };
      })
    );
  });

  return unsubscribe;
};

export const deletePost = (id: string) => {
  const docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been Deleted!");
  } catch (err) {
    console.error(err);
  }
};

const getAllUsers = (setAllUsers: Dispatch<SetStateAction<IAuthUser[]>>) => {
  return onSnapshot(usersRef, (response) => {
    setAllUsers(
      response.docs.map((item) => {
        return { ...item.data(), id: item.id } as IAuthUser;
      })
    );
  });
};

const getUserByEmail = (
  email: string,
  setCurrentUser: Dispatch<SetStateAction<IAuthUser | null>>
) => {
  const singlePostQuery = query(usersRef, where("email", "==", email));

  onSnapshot(singlePostQuery, (response) => {
    setCurrentUser({
      id: response.docs[0].id,
      ...response.docs[0].data(),
    } as IAuthUser);
  });
};

interface IUserData {
  userID: string;
  name: string;
  email: string;
  imageLink: string;
}

const postUserData = (data: IUserData) => {
  return addDoc(usersRef, data).catch((err) => {
    console.error(err);
  });
};

export interface IUpdateProfileData {
  name?: string;
  imageLink?: string;
  headline?: string;
  country?: string;
  city?: string;
  company?: string;
  industry?: string;
  college?: string;
  website?: string;
  aboutMe?: string;
  skills?: string;
}

const editProfile = (id: string, payload: IUpdateProfileData) => {
  const userToEdit = doc(usersRef, id);
  updateDoc(userToEdit, { ...payload });
};

const likePost = (userId: string, postId: string, liked: boolean) => {
  try {
    const docToLike = doc(likeRef, `${userId}_${postId}`);
    if (!liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.error(err);
  }
};

const getLikesByUser = async (userId: string, postId: string) => {
  const res = await getDocs(
    query(collection(firebaseFirestore, "likes"), where("postId", "==", postId))
  );

  const isLiked = res.docs.some((item) => item.data().userId === userId);
  const likeCount = res.docs.length;

  return { isLiked, likeCount };
};

interface ICreateCommentData {
  postId: string;
  comment: string;
  timeStamp: string;
  name: string;
}

const postComment = (comment: ICreateCommentData) => {
  addDoc(commentsRef, comment);
};

const getComments = (
  postId: string,
  setComments: Dispatch<SetStateAction<IComment[]>>
) => {
  const singlePostQuery = query(commentsRef, where("postId", "==", postId));

  onSnapshot(singlePostQuery, (response) => {
    const comments = response.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setComments(comments as IComment[]);
  });
};

const addConnection = (userId: string, targetId: string) => {
  try {
    const connectionToAdd = doc(connectionsRef, `${userId}_${targetId}`);
    setDoc(connectionToAdd, { userId, targetId });
    toast.success("Connection Added!");
  } catch (err) {
    console.error(err);
  }
};

export {
  postStatus,
  updatePostStatus,
  getAllStatus,
  getAllUsers,
  getAllStatusByUser,
  getUserByEmail,
  postUserData,
  editProfile,
  likePost,
  getLikesByUser,
  postComment,
  getComments,
  addConnection,
};
