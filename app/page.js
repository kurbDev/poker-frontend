'use client';

import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./Scene/ThreeScene'), { ssr: false });

export default function Home() {
  return (
    <div>
      <ThreeScene />
    </div>
  );
}
