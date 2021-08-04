import React, { useState, useEffect } from "react";
import Deviceimage from "./images/device.png";
import "./index.css";

//components
import { CategoryFilter } from "./components/Filters/CategoryFilter";
import { PriceFilter } from "./components/Filters/PriceFilter";
import { FilterStorage } from "./components/Filters/FilterStorage";
import { ProductCard } from "./components/ProductCard";

//utility
import { Layout, Menu, Spin, Input, Pagination, notification } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { ArrowRightOutlined } from "@ant-design/icons";

const App = () => {
  //state
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["storageSize", "name", "grade"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [storageValue, setStorageValue] = useState("32GB");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [offset, setOffset] = useState(0);
  const [currentPageElements, setCurrentPageElements] = useState([]);
  const [elementsPerPage, setElementsPerPage] = useState(15);
  const [pagesCount, setPagesCount] = useState(1);
  const [totalElementsCount, setTotalElementsCount] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const { Content, Sider } = Layout;

  // fetch data
  useEffect(() => {
    fetch(
      "https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=200&page=1&minPrice=0&maxPrice=2500&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          //updates state
          setIsLoaded(true);
          setItems(result.data.data);
          setTotalElementsCount(result.data.data.length);
          setPaginationStates();
        },
        (error) => {
          //updates state
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  //fetch iphones data
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

            setTotalElementsCount(result.data.data.length);
            setPaginationStates();
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [filterParam]);

  useEffect(() => {
    const PageElements = items.slice(offset, offset + elementsPerPage);
    setCurrentPageElements(PageElements);
  }, [pagesCount]);

  const setPaginationStates = () => {
    setPagesCount(Math.ceil(totalElementsCount / elementsPerPage));
  };

  const toggleC = () => {
    setCollapsed(true);
  };

  const handlePageClick = (pageNumber) => {
    const currentPage = pageNumber - 1;
    const offset = currentPage * elementsPerPage;
    setOffset(offset);
  };

  const categoryFilter = (name) => {
    setFilterParam(name);
  };

  const handleFilterStorage = (size) => {
    setStorageValue(size);
  };

  const handlePriceFilter = (prices) => {
    setPriceRange(prices);
  };

  const openNotification = (placement) => {
    notification.info({
      message: `Request loaded Successfully`,
      placement,
    });
  };

  // handle search
  let search = (items) => {
    return items.filter((item) => {
      if (
        filterParam == "iPhone" ||
        (filterParam.toString() == "All" &&
          storageValue.toString() == "32GB" &&
          priceRange.every((elem) => [0, 5000].indexOf(elem) > -1))
      ) {
        return (
          item["name"]?.toString().toLowerCase().indexOf(q.toLowerCase()) >
            -1 ||
          (item?.lowestRequest &&
            item.lowestRequest["grade"]
              ?.toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1) ||
          (item?.lowestRequest &&
            item.lowestRequest["storageSize"]
              ?.toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1)
        );
      }
      // filter by product storage
      else if (
        item &&
        item.lowestAsk &&
        item.lowestAsk.storageSize == storageValue.toString() &&
        storageValue.toString() != "32GB"
      ) {
        return item;
      }
      //filter by minimum and maximum price
      else if (
        item &&
        item.lowestAsk?.price >= Math.min(...priceRange) &&
        item.lowestAsk?.price <= Math.max(...priceRange)
      ) {
        return item;
      }
      //filter by product brand
      else if (
        item.brand == filterParam.toString() &&
        filterParam.toString() != "ALL"
      ) {
        return searchParam.some((newItem) => {
          return item;
        });
      }
    });
  };
  const { Search } = Input;

  //handle error
  if (error) {
    return <p className="center">{error.message}</p>;
  }
  // render component
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
          <div className="flex-1 device">
            <img src={Deviceimage} alt="DeviceImage" />
          </div>
        </section>
        <section className="layout-container">
          <Layout>
            <Sider
              collapsed={collapsed}
              breakpoint="lg"
              collapsedWidth="0"
              onCollapse={toggleC}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
                <div className="filters">
                  <CategoryFilter
                    handleClick={categoryFilter}
                    active={filterParam}
                    loadRequest={() => openNotification("bottomLeft")}
                  />
                  <PriceFilter
                    filterPrice={handlePriceFilter}
                    active={filterParam}
                  />
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
                      {/* wrap the returned data with search function. */}
                      {search(currentPageElements)?.map((item, index) => {
                        return (
                          <ProductCard productDetails={item} key={index} />
                        );
                      })}
                    </div>
                  </div>
                </Content>
              )}
              <div className="pagination">
                {/* render pagination */}
                <Pagination
                  total={totalElementsCount}
                  showTotal={(total, range) => `${range[0]} of ${total} items`}
                  defaultPageSize={3}
                  defaultCurrent={1}
                  pageSize={elementsPerPage}
                  onChange={handlePageClick}
                />
              </div>
            </Layout>
          </Layout>
          );
        </section>
      </div>
    </div>
  );
};

export default App;
