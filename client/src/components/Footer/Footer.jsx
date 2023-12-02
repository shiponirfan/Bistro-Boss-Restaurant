import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="text-white font-medium text-xl text-center">
      <div className="flex">
        <div className="bg-[#1F2937] flex-1 py-24 space-y-4">
          <h2 className="text-3xl">CONTACT US</h2>
          <p>123 ABS Street, Uni 21, Bangladesh</p>
          <p>+88 123456789</p>
          <p>Mon - Fri: 08:00 - 22:00</p>
          <p>Sat - Sun: 10:00 - 23:00</p>
        </div>
        <div className="bg-[#111827] flex-1 py-24 space-y-4">
          <h2 className="text-3xl">Follow US</h2>
          <p>Join us on social media</p>
          <div className="flex gap-4 justify-center items-center">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </div>
      <div className="py-5 bg-[#151515]">
        <p>Copyright © Bistro Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
