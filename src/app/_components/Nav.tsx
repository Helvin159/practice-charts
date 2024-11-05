import Image from 'next/image'
import React from 'react'

import logo from '../_assets/imgs/EDCA8331-A5B3-487B-8E72-2125308887E9_1_105_c.jpeg'

const Nav = () => {

  const navStyles: React.CSSProperties = {textAlign: 'center', padding: '2rem 0'};

  return (
    <nav className='text-center' style={{...navStyles}}>
      <Image
        src={logo}
        width="150"
        alt="Military Homespot Lending Logo"
      />
    </nav>
  )
}

export default Nav
