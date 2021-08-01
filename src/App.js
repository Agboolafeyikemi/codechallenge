import React from "react";
import Deviceimage from "./images/device.png";
import "./index.css";
// import "./App.css";

//component
import { SidebarLayout } from "./components/Layout";

//utility
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { ArrowRightOutlined } from "@ant-design/icons";

const App = () => {
  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  return (
    <div className="App">
      <div className="listing-container">
        <section className="listing-section">
          <div className="listing-text flex-1">
            <h1>SHOP OUR LATEST AVAILABLE STOCK HERE</h1>
            <div className="input-container">
              <Search
                allowClear
                enterButton="Search"
                size="large"
                icon={ArrowRightOutlined}
                //   onSearch={onSearch}
                type="text"
                placeholder="Enter Search Term (e.g iPhone x, 128GB or A1)"
              />
            </div>
          </div>
          <div className="flex-1">
            <img src={Deviceimage} alt="DeviceImage" />
          </div>
        </section>
        <section className="layout-container">
          <SidebarLayout />
        </section>
      </div>
    </div>
  );
};

export default App;
