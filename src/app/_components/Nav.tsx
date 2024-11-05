import React from 'react';
import Link from 'next/link';

const Nav = () => {
  const navStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: '1rem 0 2rem'
  };

  return (
    <nav className='text-center' style={{ ...navStyles }}>
      <ul
        style={{
          display: 'flex',
          listStyleType: 'none',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          padding: '0'
        }}
      >
        <li>
          <Link href={'/chartjslinechart'}>ChartJS Line Chart</Link>
        </li>
        <li>
          <Link href={'/timeserieschart'}>ApexChartsJS Time Series Chart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
