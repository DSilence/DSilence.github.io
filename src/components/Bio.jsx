import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'
import { SocialIcon } from 'react-social-icons'

class Bio extends React.Component {
  render() {
    return (
      <div style={{
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          textAlign: 'left'
        }}>
          <img
            src={profilePic}
            alt={`Kyle Mathews`}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              width: rhythm(2),
              height: rhythm(2),
            }}/>
          <p>
            Блог за авторством <strong>Дмитрия Сафарова</strong>. Пишу код, развлекаюсь, путешествую, фотографирую.{' '}
            Старую версию блога можно найти <a href="https://sleepymaniac.wordpress.com">тут</a>.
          </p>
        </div>
        <div style={{
          display: 'inline-block',
          marginBottom: rhythm(2.5)
        }}>
          <SocialIcon url="http://twitter.com/DSilencea"/>
          <SocialIcon url="https://www.instagram.com/dzmitry.safarau"/>
          <SocialIcon url="https://www.flickr.com/photos/100656442@N05"/>
          <SocialIcon url="https://www.facebook.com/dsilencea"/>
          <SocialIcon url="https://www.linkedin.com/in/dzmitry-safarau-67378a72" />
        </div>
      </div>
    )
  }
}

export default Bio
