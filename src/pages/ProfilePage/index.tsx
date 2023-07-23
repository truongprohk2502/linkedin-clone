import { useState, type FC, useEffect } from "react";
import ProfileEdit from "./ProfileEdit";
import ProfileCard from "./ProfileCard";
import { useLocation } from "react-router-dom";
import type { IStatus } from "../HomePage/PostStatus";
import { getAllStatusByUser } from "../../api/firestoreApi";

const ProfilePage: FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [allStatuses, setAllStatuses] = useState<IStatus[]>([]);

  const location = useLocation();

  useEffect(() => {
    if (!location.state.id) return;

    const unsubscribe = getAllStatusByUser(
      location.state.id as string,
      setAllStatuses
    );

    return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isEdit ? (
    <ProfileEdit toggleVisible={() => setIsEdit(!isEdit)} />
  ) : (
    <ProfileCard
      toggleVisible={() => setIsEdit(!isEdit)}
      allStatuses={allStatuses}
    />
  );
};

export default ProfilePage;
