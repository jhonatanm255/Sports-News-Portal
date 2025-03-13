import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const SocialLinks = () => {
  return (
    <div className="flex space-x-4">
      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="text-gray-400 hover:text-[#1877f2] transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
      </a>

      {/* TikTok */}
      <a
        href="https://tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className="text-gray-400 hover:text-black transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faTiktok} className="text-xl" />
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-gray-400 hover:text-[#e4405f] transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faInstagram} className="text-xl" />
      </a>

      {/* X (Twitter) */}
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        className="text-gray-400 hover:text-black transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faXTwitter} className="text-xl" />
      </a>
    </div>
  );
};

export default SocialLinks;
