import React from 'react'
import '../css/Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className='footer-content'>
        <div className='footer-logo-container'>
          <img className='footer-logo' src={require('../img/footer-logo.svg').default} alt=''></img>
          <img className='goUp-arrow' src={require('../img/footer-goUp-arrow.svg').default} alt=''></img>
        </div>

        <div className='footer-info-container'>
          <ul className='footer-menu'>
            <li>
              <a href='#'>
                Про клініку
              </a>
            </li>
            <li>
              <a href='#'>
                Аптека
              </a>
            </li>
            <li>
              <a href='#'>
                Наші послуги
              </a>
            </li>
            <li>
              <a href='#'>
                Контакти
              </a>
            </li>
          </ul>

          <div className='footer-links-container'>
            <div className='footer-social-container'>
              <img className='footer-instagram-link' src={require('../img/footer-instagram.svg').default} alt=''></img>
              <div className='separator'></div>
              <img className='footer-facebook-link' src={require('../img/footer-facebook.svg').default} alt=''></img>
            </div>
            <div className='footer-copyright'>
              <p>© 2022 Лікар ХвістВус</p>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-animals-container'></div>
    </footer>
  )
}
