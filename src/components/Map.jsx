import React from 'react'
import './styles/map.scss';

const Map = () => {
  return (
    <div id='map'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2222.393475030528!2d10.20250071605813!3d56.150301168731225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c3f8dde2aec65%3A0xc0a4bd7f9f917ccb!2sAarhus!5e0!3m2!1sda!2sdk!4v1664983888860!5m2!1sda!2sdk" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

export default Map