import PropTypes from "prop-types";
const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center mb-12 w-[424px] mx-auto">
      <h4 className="text-xl text-[#D99904] mb-4">--- {subHeading} ---</h4>
      <h2 className="text-4xl text-[#151515] border-y-4 py-5">{heading}</h2>
    </div>
  );
};
SectionTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};
export default SectionTitle;
