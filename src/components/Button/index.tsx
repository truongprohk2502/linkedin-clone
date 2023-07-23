import { type FC } from "react";
import "./style.scss";

interface IProps {
  title: string;
  onClick: () => void;
}

const Button: FC<IProps> = ({ title, onClick }) => {
  return (
    <button className="common-btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
