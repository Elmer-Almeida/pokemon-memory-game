import {IoMailOutline} from "react-icons/io5";
import {FaGithub, FaLinkedinIn, FaTwitter} from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer>
            <p className="icons">
                <a href="mailto:almeielm@sheridancollege.ca?subject=Pokemon Memory Game Inquiry" title={"Send E-Mail"}
                   target={"_blank"}>
                    <IoMailOutline/>
                </a>
                <a href="https://www.twitter.com/_elmeralmeida" title={"Elmer's Twitter Profile"} target={"_blank"}>
                    <FaTwitter/>
                </a>
                <a href="https://www.github.com/Elmer-Almeida" title={"Elmer's GitHub Profile"} target={"_blank"}>
                    <FaGithub/>
                </a>
                <a href="https://www.linkedin.com/in/elmeralmeida/" title={"Elmer's LinkedIn Profile"}
                   target={"_blank"}>
                    <FaLinkedinIn/>
                </a>
            </p>
            <p className={"createdby"}>
                Created by Elmer Almeida
            </p>
            <p className={"contact"}>
                <a href='mailto:almeielm@sheridancollege.ca?subject=Pokemon Memory Game Inquiry'
                   title='Send me a message'>
                    almeielm@sheridancollege.ca
                </a>
            </p>
        </footer>
    );
};

export default Footer;
