import { createContext, useContext } from "react";

export interface IAuthUser {
  id: string;
  userID: string;
  email: string;
  name: string;
  imageLink: string;
  headline: string;
  country: string;
  city: string;
  company: string;
  industry: string;
  college: string;
  website: string;
  aboutMe: string;
  skills: string;
}

interface IAuthContextData {
  currentUser: IAuthUser | null;
}

export const AuthContext = createContext<IAuthContextData>({
  currentUser: null,
});
export const useAuthContext = () => useContext(AuthContext);
