import { Helmet } from "react-helmet-async";
import PageCover from "../../components/PageCover/PageCover";
import menuImg from "../../assets/menu/banner3.jpg";
import dessert from "../../assets/menu/dessert-bg.jpeg";
import pizza from "../../assets/menu/pizza-bg.jpg";
import salad from "../../assets/menu/salad-bg.jpg";
import soup from "../../assets/menu/soup-bg.jpg";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuList from "../../components/MenuLists/MenuList";
const OurMenu = () => {
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
      <div className="py-28">
        <SectionTitle heading={"TODAY'S OFFER"} subHeading={"Don't miss"} />
        <MenuList category={"offered"}  />
      </div>
      <PageCover
        img={dessert}
        title={"DESSERTS"}
        subTitle={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <div className="py-28">
        <MenuList category={"dessert"} tabCategory={'dessert'}/>
      </div>
      <PageCover
        img={pizza}
        title={"PIZZA"}
        subTitle={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <div className="py-28">
        <MenuList category={"pizza"} tabCategory={'pizza'} />
      </div>
      <PageCover
        img={salad}
        title={"SALADS"}
        subTitle={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <div className="py-28">
        <MenuList category={"salad"} tabCategory={'salad'}/>
      </div>
      <PageCover
        img={soup}
        title={"SOUPS"}
        subTitle={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <div className="py-28">
        <MenuList category={"soup"} tabCategory={'soup'}/>
      </div>
    </div>
  );
};

export default OurMenu;
