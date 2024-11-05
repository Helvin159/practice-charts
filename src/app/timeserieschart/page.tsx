'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const TimeSeriesChart = dynamic(() => import('./_components/TimeSeriesChart'), {
  ssr: false
});

const page = () => {
  return (
    <div>
      <TimeSeriesChart />
    </div>
  );
};

export default page;
