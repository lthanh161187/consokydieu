import React from 'react';
import {CalculatorComponent} from '../components/calculator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#41865C]">Phần mềm tính con số kỳ diệu <br /> (Dành riêng cho icSbody )</h2>
      <CalculatorComponent />
    </main>
  );
}
