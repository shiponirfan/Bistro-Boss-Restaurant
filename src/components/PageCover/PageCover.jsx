import { Parallax } from "react-parallax";
import PropTypes from "prop-types";
const PageCover = ({ img, title, subTitle }) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={img}
      bgImageAlt="page cover"
      strength={-200}
    >
      <div
        className="hero h-[800px]"
        // style={{
        //   backgroundImage: `url(${img})`,
        // }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white bg-black w-full py-32 bg-opacity-50">
          <div className="max-w-md ">
            <h1 className="mb-3 text-6xl font-bold">{title}</h1>
            <p>{subTitle}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};
PageCover.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};
export default PageCover;
