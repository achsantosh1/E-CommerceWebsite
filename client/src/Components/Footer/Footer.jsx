import "./footer.scss";
import { FaFacebook,FaInstagram, FaYoutube} from "react-icons/fa";
import qrlink from "../Assets/app_qrcode.png"
import appstore from "../Assets/appstore.svg"
import playstore from "../Assets/playstore.svg"

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col1">
            <section className="col1_section">
              <h3 className="col1_section_title">
                Subscribe to our <br />
                Newsletter
              </h3>
              <form className="col1_section_form">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
                <button type="submit" name="submit">
                  Submit
                </button>
              </form>
              <p>
                At ......., we are passionate about making you feel stylish and
                comfortable. From providing high quality products to maintaining
                an amiable environment in the stores, we make sure that you look
                good and feel good. Hope you have a stress-free shopping
                experience at ......
              </p>
            </section>
          </div>
          <div className="col2">
            <div className="main_footer">
              <div className="footer_contact">
                <div className="contacts">
                  <div className="row1">
                    <div className="contactdetails">
                      <span className="footer_contact_item">TEL. <a href="tel:01-4450000">01-4450000</a></span>
                      <span className="footer_contact_item">MOB. <a href="tel:01-4450001">01-4450001</a></span>
                      <a className="footer_contact_item" href="mailto:santosh9860476238@gmail.com">santosh9860476238@gmail.com</a>
                      <ul className="social_list">
                        <li className="social_list_item">
                          <a className="social_links" target="_blank" href="https://www.facebook.com/"><FaFacebook /></a>
                          <a className="social_links" target="_blank" href="https://www.instagram.com/"><FaInstagram /></a>
                          <a className="social_links" target="_blank" href="https://www.youtube.com/"><FaYoutube /></a>
                        </li>
                      </ul>
                    
                  </div>
                  <div className="qrlinks">

                    <div className="downloadnow">

                    <h6>
                      <strong>Donwload App</strong>
                      </h6>
                      <div className="donwload_image">
                        <div className="qrimage">
                          <img src={qrlink} alt="qrimage" />
                        </div>
                        <div className="store">
                          <a className="playstore" target="_blank" href="https://www.apple.com/app-store/">
                          <img className="app_image" src={appstore} target="_blank" alt="app-store-app"/>
                          </a>
                          <a className="appstore" target="_blank" href="https://www.playstore.com">
                          <img className="app_image" src={playstore} target="_blank" alt="play-store-app"/>
                          </a>
                        </div>
                      </div>

                    </div>

                  </div>
                  </div>
                  
                </div>
              </div>
              <div className="footer_nav">
                
              </div>
            </div>
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
