// import React, { useState, useEffect } from "react";
// import "../index.css";
// import { Layout, Menu, Spin } from "antd";

// //Component
// import { CategoryFilter } from "./Filters/CategoryFilter";
// import { PriceFilter } from "./Filters/PriceFilter";
// import { FilterStorage } from "./Filters/FilterStorage";
// import { ProductCard } from "./ProductCard";

// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";

// const { Content, Sider } = Layout;

// export const SidebarLayout = ({ children }, isActive) => {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//   const [q, setQ] = useState("");
//   const [searchParam] = useState(["name", "grade", "storageSize"]);
//   const [filterParam, setFilterParam] = useState(["All"]);

//   useEffect(() => {
//     fetch(
//       "https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=0&maxPrice=2500&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus"
//     )
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setItems(result.data.data);
//           console.log(result, "RESULT\n\n\\n\n");
//         },
//         (error) => {
//           console.log(error, "error\n\n\n\n\n ");
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//   }, []);

//   function search(items) {
//     return items.filter((item) => {
//       if (item.region == filterParam) {
//         return searchParam.some((newItem) => {
//           console.log(newItem, "newItem\n\n\n\n\n");
//           return (
//             item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
//           );
//         });
//       } else if (filterParam == "All") {
//         return searchParam.some((newItem) => {
//           console.log(newItem, "ALLnewItem\n\n\n\n\nALL");
//           return (
//             item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
//           );
//         });
//       }
//     });
//   }

//   console.log(items, "ITEMS\n\n\\n\n\n\n");
//   if (error) {
//     return <p className="center">{error.message}</p>;
//   } else if (!isLoaded) {
//     return <Spin tip="Loading..." className="center" />;
//   } else {
//     return (
//       <Layout>
//         <Sider
//           breakpoint="lg"
//           collapsedWidth="0"
//           onBreakpoint={(broken) => {
//             console.log(broken);
//           }}
//           onCollapse={(collapsed, type) => {
//             console.log(collapsed, type);
//           }}
//         >
//           <div className="logo" />
//           <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
//             <div className="filters">
//               <CategoryFilter />
//               <PriceFilter />
//               <FilterStorage />
//             </div>
//           </Menu>
//         </Sider>
//         <Layout>
//           <Content>
//             <div className="site-layout-background" style={{ minHeight: 360 }}>
//               <div className="product-card-container">
//                 {search(items)?.map((item) => {
//                   return <ProductCard productDetails={item} />;
//                 })}
//               </div>
//             </div>
//           </Content>
//           {/* <Footer style={{ textAlign: "center" }}>
//           Ant Design ©2018 Created by Ant UED
//         </Footer> */}
//         </Layout>
//       </Layout>
//     );
//   }
// };
