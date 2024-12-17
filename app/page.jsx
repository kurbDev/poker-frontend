'use client';

import dynamic from 'next/dynamic';
import GenerateCards from "./Logic/CardManagement";

const ThreeScene = dynamic(() => import('./Scene/ThreeScene'), { ssr: false });

export default function Home() {
  const cards = GenerateCards();
  console.log(cards)

  return (
    <div>
      <ThreeScene />
    </div>
  );
}
