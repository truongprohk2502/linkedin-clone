import { useState, type FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../firebaseConfig";
import Loader from "../../components/Loader";
import Topbar from "./Topbar";
import { AuthContext, IAuthUser } from "../../contexts/authContext";
import { getUserByEmail } from "../../api/firestoreApi";

const HomeLayout: FC = () => {
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<IAuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (res) => {
      setLoading(false);
      if (!res?.email) {
        setCurrentUser(null);
        setCurrentEmail("");
        navigate("/login");
      } else {
        setCurrentEmail(res.email);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentEmail) return;
    const unsubscribe = getUserByEmail(currentEmail, setCurrentUser);
    return unsubscribe;
  }, [currentEmail]);

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ currentUser }}>
      <Topbar />
      <Outlet />
    </AuthContext.Provider>
  );
};

export default HomeLayout;
