import { Helmet } from "react-helmet-async";
import PageCover from "./../../components/PageCover/PageCover";
import menuImg from "../../assets/menu/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import useMenu from "../../hooks/useMenu";
import TabMenu from "../../components/TabMenu/TabMenu";
import { useParams } from "react-router-dom";
const OrderedFood = () => {
  const [menu] = useMenu();
  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
  const { tabCategory } = useParams();
  const initialsIndex = categories.indexOf(tabCategory);
  const [tabIndex, setTabIndex] = useState(initialsIndex);
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div>
      <Helmet>
        <title>Our Menu - Bistro Boss</title>
      </Helmet>
      <PageCover
        img={menuImg}
        title={"OUR MENU"}
        subTitle={"Would you like to try a dish?"}
      />
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="text-2xl pb-12 font-medium uppercase flex space-x-8 justify-center">
            <Tab className="hover:text-[#BB8506]  cursor-pointer border-b-4 hover:border-[#BB8506] border-transparent duration-300">
              Salad
            </Tab>
            <Tab className="hover:text-[#BB8506]  cursor-pointer border-b-4 hover:border-[#BB8506] border-transparent duration-300">
              Pizza
            </Tab>
            <Tab className="hover:text-[#BB8506]  cursor-pointer border-b-4 hover:border-[#BB8506] border-transparent duration-300">
              Soups
            </Tab>
            <Tab className="hover:text-[#BB8506]  cursor-pointer border-b-4 hover:border-[#BB8506] border-transparent duration-300">
              Desserts
            </Tab>
            <Tab className="hover:text-[#BB8506]  cursor-pointer border-b-4 hover:border-[#BB8506] border-transparent duration-300">
              Drinks
            </Tab>
          </TabList>
          <TabPanel>
            <TabMenu categories={salad} />
          </TabPanel>
          <TabPanel>
            <TabMenu categories={pizza} />
          </TabPanel>
          <TabPanel>
            <TabMenu categories={soup} />
          </TabPanel>
          <TabPanel>
            <TabMenu categories={dessert} />
          </TabPanel>
          <TabPanel>
            <TabMenu categories={drinks} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default OrderedFood;
