import { FaFacebookF, FaInstagramSquare, FaLinkedinIn } from "react-icons/fa";
import {
  HiLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className="footer px-6 py-10 lg:px-28 bg-base-200 text-base-content">
        <div>
          <img
            className="w-20 h-12"
            src="https://seeklogo.com/images/Z/zoom-photography-logo-FCE4CF7815-seeklogo.com.jpg"
            alt=""
          />
          <p>
            Photography Schools Institute
            <br />
            This Providing reliable since 2019
          </p>
        </div>
        <div>
          <span className="footer-title">Best Photography School</span>
          <Link to="/classes" className="link link-hover">
            Best Classes
          </Link>
          <Link to="/instructors" className="link link-hover">
            Best Instructor
          </Link>
          <a className="link link-hover">Best Supports</a>
        </div>

        <div>
          <span className="footer-title">Contact Us</span>
          <a className="link link-hover flex items-center">
            <HiLocationMarker className="w-6 h-4"></HiLocationMarker>04360,
            NewYork, 33 Matehouse str., 12/4
          </a>
          <a className="link link-hover flex items-center">
            <HiOutlinePhone className="w-6 h-4"></HiOutlinePhone> 803-33-5644-99
          </a>
          <a className="link link-hover flex items-center">
            <HiOutlineMail className="w-6 h-4"></HiOutlineMail> admin@gmail.com
          </a>
        </div>
        <div>
          <span className="footer-title">Fellow Us</span>
          <div className="flex gap-2">
            <a href="https://web.facebook.com/prashmon.chakroborty/">
              <FaFacebookF className="w-6 h-6"></FaFacebookF>
            </a>
            <a href="https://www.linkedin.com/in/prashoman-chakrabarti-2b827423b/">
              <FaLinkedinIn className="w-6 h-6"></FaLinkedinIn>
            </a>
            <a href="https://www.instagram.com/badhon_chakrabarti_/">
              <FaInstagramSquare className="w-6 h-6"></FaInstagramSquare>
            </a>
          </div>
          <div>
            <div className="form-control">
              <label className="input-group">
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
                <span>Subscribe</span>
              </label>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-base-300 text-center  py-7 px-6 lg:px-28">
        <p>Copyright © - {year} All right reserved Photography School</p>
      </div>
    </div>
  );
};

export default Footer;
