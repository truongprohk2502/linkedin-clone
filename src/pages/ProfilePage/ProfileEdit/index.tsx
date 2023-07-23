import { useState, type FC, type ChangeEvent, useEffect } from "react";
import { useAuthContext } from "../../../contexts/authContext";
import { AiOutlineClose } from "react-icons/ai";
import "./style.scss";
import {
  editProfile,
  type IUpdateProfileData,
} from "../../../api/firestoreApi";
import { toast } from "react-toastify";

interface IProps {
  toggleVisible: () => void;
}

const ProfileEdit: FC<IProps> = ({ toggleVisible }) => {
  const [editInputs, setEditInputs] = useState<IUpdateProfileData>({
    name: "",
    headline: "",
    country: "",
    city: "",
    company: "",
    industry: "",
    college: "",
    website: "",
    aboutMe: "",
    skills: "",
  });

  const getInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const { currentUser } = useAuthContext();

  useEffect(() => {
    setEditInputs({
      name: currentUser?.name || "",
      headline: currentUser?.headline || "",
      country: currentUser?.country || "",
      city: currentUser?.city || "",
      company: currentUser?.company || "",
      industry: currentUser?.industry || "",
      college: currentUser?.college || "",
      website: currentUser?.website || "",
      aboutMe: currentUser?.aboutMe || "",
      skills: currentUser?.skills || "",
    });
  }, [currentUser]);

  const updateProfileData = async () => {
    try {
      await editProfile(currentUser?.id as string, editInputs);
      toast.success("Profile has been updated successfully");
      toggleVisible();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose
          className="close-icon"
          onClick={toggleVisible}
          size={25}
        />
      </div>

      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
          value={editInputs.name}
        />
        <label>Headline</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          value={editInputs.headline}
          name="headline"
        />
        <label>Country</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />
        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="City"
          name="city"
          value={editInputs.city}
        />
        <label>Company</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          value={editInputs.company}
          name="company"
        />
        <label>Industry </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Industry"
          name="industry"
          value={editInputs.industry}
        />
        <label>College</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          name="college"
          value={editInputs.college}
        />
        <label>Website</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Website"
          name="website"
          value={editInputs.website}
        />
        <label>About</label>
        <textarea
          placeholder="About Me"
          className="common-textArea"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />
        <label>Skills</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Skill"
          name="skills"
          value={editInputs.skills}
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
