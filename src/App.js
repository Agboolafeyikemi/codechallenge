import React, { useState, useEffect } from "react";

import "./index.css";
//images;
import Deviceimage from "./images/device.png";
import Hamburger from "./images/menu.png";
//components
import { CategoryFilter } from "./components/Filters/CategoryFilter";
import { PriceFilter } from "./components/Filters/PriceFilter";
import { FilterStorage } from "./components/Filters/FilterStorage";
import { ProductCard } from "./components/ProductCard";

//utility
import {
  Layout,
  Menu,
  Spin,
  Input,
  Pagination,
  notification,
  Drawer,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const App = () => {
  //state
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["storageSize", "name", "grade"]);
  const [filterParam, setFilterParam] = useState(
    "Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus"
  );
  const [storageValue, setStorageValue] = useState("32GB");
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [offset, setOffset] = useState(0);
  const [currentPageElements, setCurrentPageElements] = useState([]);
  const [elementsPerPage] = useState(15);
  const [pagesCount, setPagesCount] = useState(1);
  const [totalElementsCount, setTotalElementsCount] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  const { Content, Sider } = Layout;

  const minPrice = Math.min(...priceRange);
  const maxPrice = Math.max(...priceRange).toString();

  // fetch data
  useEffect(() => {
    fetch(
      `https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=200&page=1&minPrice=${minPrice}&maxPrice=${maxPrice}
      &storageSizeString=${storageValue}&conditionString=&category=Smartphones&brand=${filterParam}`
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
  }, [filterParam, storageValue, minPrice, maxPrice]);

  useEffect(() => {
    const PageElements = items.slice(offset, offset + elementsPerPage);
    setCurrentPageElements(PageElements);
  }, [pagesCount, offset]);

  const setPaginationStates = () => {
    setPagesCount(Math.ceil(totalElementsCount / elementsPerPage));
  };

  const toggleC = () => {
    setCollapsed(true);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handlePageClick = (pageNumber) => {
    const currentPage = pageNumber - 1;
    const offset = currentPage * elementsPerPage;
    setOffset(offset);
  };

  const categoryFilter = (name) => {
    setVisible(false);
    setFilterParam(name);
  };

  const handleFilterStorage = (size) => {
    setVisible(false);
    setStorageValue(size);
  };

  const handlePriceFilter = (prices) => {
    setVisible(false);
    setPriceRange(prices);
  };

  const openNotification = (placement) => {
    notification.info({
      message: `Request loaded Successfully`,
      placement,
    });
  };

  // handle search and return products fetched

  const search = (items) => {
    return items.filter((item) => {
      /*
 //  check if product match search query
 // if not return All the  products
 */
      if (q.length !== 0) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]?.toString().toLowerCase().indexOf(q.toLowerCase()) >
              -1 ||
            (item.lowestRequest &&
              item.lowestRequest[newItem]
                ?.toString()
                .toLowerCase()
                .indexOf(q.toLowerCase()) > -1) ||
            (item.lowestRequest &&
              item.lowestRequest["age"]
                ?.toString()
                .toLowerCase()
                .indexOf(q.toLowerCase()) > -1) ||
            (item.lowestRequest &&
              item.lowestRequest["storageSize"]
                ?.toString()
                .toLowerCase()
                .indexOf(q.toLowerCase()) > -1)
          );
        });
      } else if (q.length === 0) {
        return item;
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
        <section>
          <div
            className="mt-menu-holder-nav-link mt-clickable"
            onClick={showDrawer}
          >
            <img src={Hamburger} alt="" />
          </div>
          <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <div className="mt-close-icon mt-clickable" onClick={onClose}>
              <img src="img/close.png" alt="" />
            </div>
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
          </Drawer>
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
                          <ProductCard
                            productDetails={item}
                            key={index}
                            currentStorage={storageValue}
                            currentPrice={Math.round((maxPrice + minPrice) / 2)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </Content>
              )}
              {isLoaded && (
                <div className="pagination">
                  {/* render pagination */}
                  <Pagination
                    total={totalElementsCount}
                    showTotal={(total, range) =>
                      `${range[0]} of ${total} items`
                    }
                    defaultPageSize={3}
                    defaultCurrent={1}
                    pageSize={elementsPerPage}
                    onChange={handlePageClick}
                  />
                </div>
              )}
            </Layout>
          </Layout>
        </section>
      </div>
    </div>
  );
};

export default App;
