import React from "react";

// Import typefaces
import "typeface-merriweather";
import "typeface-montserrat";

import { SocialIcon } from "react-social-icons";
import { rhythm } from "../utils/typography";
import profilePic from "./profile-pic.jpg";

class Bio extends React.Component {
  public render() {
    return (
      <div style={{
        textAlign: "center",
      }}>
        <div style={{
          display: "flex",
          textAlign: "left",
        }}>
          <img
            src={profilePic}
            alt={`Dzmitry Safarau`}
            style={{
              height: rhythm(2),
              marginBottom: 0,
              marginRight: rhythm(1 / 2),
              width: rhythm(2),
            }}/>
          <p>
            Blog by <strong>Dzmitry Safarau</strong>. Writing code, having fun, travelling, taking pictures.{" "}
            Old version of the blog can be found <a href="https://sleepymaniac.wordpress.com">here</a>.
          </p>
        </div>
        <div style={{
          display: "inline-block",
          marginBottom: rhythm(2.5),
        }}>
          <SocialIcon url="https://twitter.com/DSilencea"/>
          <SocialIcon url="https://www.instagram.com/dzmitry.safarau"/>
          <SocialIcon url="https://www.flickr.com/photos/100656442@N05"/>
          <SocialIcon url="https://www.facebook.com/dsilencea"/>
          <SocialIcon url="https://www.linkedin.com/in/dzmitry-safarau-67378a72" />
          <SocialIcon url="https://github.com/DSilence" />
        </div>
      </div>
    );
  }
}

export default Bio;
