import React, { useState, useEffect } from "react";
import Deviceimage from "./images/device.png";
import "./index.css";

//components
import { CategoryFilter } from "./components/Filters/CategoryFilter";
import { PriceFilter } from "./components/Filters/PriceFilter";
import { FilterStorage } from "./components/Filters/FilterStorage";
import { ProductCard } from "./components/ProductCard";

//utility
import { Layout, Menu, Spin, Input, Pagination } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { ArrowRightOutlined } from "@ant-design/icons";

const App = () => {
  const { Content, Sider } = Layout;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name", "storagesize", "grade"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [storageValue, setStorageValue] = useState("32GB");

  useEffect(() => {
    fetch(
      "https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=0&maxPrice=2500&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.data);
          console.log(result, "RESULT\n\n\\n\n");
        },
        (error) => {
          console.log(error, "error\n\n\n\n\n ");
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    if (filterParam == "iPhone") {
      setIsLoaded(false);
      fetch(
        "https://ezeapi-prod-copy.herokuapp.com/api/v1/products/price?category=Smartphones&brand=Apple&sort=lowestAsk&hoursInterval=24&limit=20&page=1&slugId="
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.data.data);
            console.log(result, "RESULT\n\n\\n\n22");
          },
          (error) => {
            console.log(error, "error\n\n\n\n\n 22");
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [filterParam]);

  const onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  };

  const categoryFilter = (name) => {
    setFilterParam(name);
    console.log("clicked", name, "\n\n\n\n\n");
  };

  const handleFilterStorage = (size) => {
    setStorageValue(size);
    console.log("clickedNOWNOWOGO\n\n\n\n", size, "\n\n\n\n\n");
  };
  // console.log(
  //   item &&
  //     item.lowestAsk &&
  //     item.lowestAsk.storageSize == storageValue.toString()
  // );
  let search = (items) => {
    return items.filter((item) => {
      console.log(
        item,
        filterParam.toString(),
        item.brand,
        storageValue.toString(),
        "\n\n\n\n\nITEMFEYIEKMIIIII\n\n\n\n\n\n"
      );
      if (
        item &&
        item.lowestAsk &&
        item.lowestAsk.storageSize == storageValue.toString()
      ) {
        console.log(item, "\n\n\n\n\n\n\n\nI AM HERE OOOn\n\n\n\n\n\n\n\n\n");
        return item;
      } else if (item.brand == filterParam.toString()) {
        return searchParam.some((newItem) => {
          console.log(item[newItem], newItem, "newItemFEYIKEMI\n\n\n\n\n");
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (
        filterParam == "iPhone" ||
        (filterParam == "All" && storageValue == "32GB")
      ) {
        console.log("\n\n\n\n\nsecon runing\n\nn\n\n\n\n\n");
        return searchParam.some((newItem) => {
          console.log(item, item[newItem], newItem, "ALLnewItem\n\n\n\n\nALL1");
          if (item[newItem] || item.lowestAsk[newItem]) {
            return (
              item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) >
              -1
            );
          } else if (item.lowestAsk && item.lowestAsk[newItem]) {
            return (
              item.lowestAsk[newItem]
                .toString()
                .toLowerCase()
                .indexOf(q.toLowerCase()) > -1
            );
          }
        });
      }
    });
  };
  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  if (error) {
    return <p className="center">{error.message}</p>;
  }
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
                type="text"
                placeholder="Enter Search Term (e.g iPhone x, 128GB or A1)"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1">
            <img src={Deviceimage} alt="DeviceImage" />
          </div>
        </section>
        <section className="layout-container">
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
                <div className="filters">
                  <CategoryFilter
                    handleClick={categoryFilter}
                    active={filterParam}
                  />
                  <PriceFilter />
                  <FilterStorage
                    handleStorageValue={handleFilterStorage}
                    active={storageValue}
                  />
                </div>
              </Menu>
            </Sider>
            <Layout>
              {!isLoaded ? (
                <Spin tip="Loading..." className="center" />
              ) : (
                <Content>
                  <div
                    className="site-layout-background"
                    style={{ minHeight: 360 }}
                  >
                    <div className="product-card-container">
                      {search(items)?.map((item, index) => {
                        return (
                          <ProductCard productDetails={item} key={index} />
                        );
                      })}
                    </div>
                  </div>
                </Content>
              )}
              {/* <Pagination current={current} onChange={onChange} total={50} /> */}
            </Layout>
          </Layout>
          );
        </section>
      </div>
    </div>
  );
};

export default App;
