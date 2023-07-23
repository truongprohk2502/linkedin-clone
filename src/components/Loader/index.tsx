import { type FC } from "react";
import { Space, Spin } from "antd";
import "./style.scss";

const Loader: FC = () => {
  return (
    <div className="loader">
      <p>Loading..Please Wait..</p>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Loader;
