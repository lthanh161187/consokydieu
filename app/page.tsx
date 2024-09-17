import React from 'react';
import {CalculatorComponent} from '../components/calculator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Máy Tính Calo</h1>
      <CalculatorComponent />
    </main>
  );
}
