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
      <a
        href="https://www.facebook.com/profile.php?id=61571413462228"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="text-gray-400 hover:text-[#1877f2] transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
      </a>

      <a
        href="https://www.tiktok.com/@lanewssports?_t=ZT-8udOwwuRhq2&_r=1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className="text-gray-400 hover:text-black transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faTiktok} className="text-xl" />
      </a>

      <a
        href="https://www.instagram.com/lanewssports?igsh=MzRlODBiNWFlZA%3D%3D"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-gray-400 hover:text-[#e4405f] transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faInstagram} className="text-xl" />
      </a>

      <a
        href="https://x.com/LANEWSSPORTS1?t=jWDZnaK0goGI3NjIgFpbVw&s=08"
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
