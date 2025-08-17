'use client';

import React from 'react';
import ProtectedLayout from '@/app/ProtectedLayout';

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <div className="mt-5">
        <h1>Welcome to CareerPath AI Dashboard!</h1>
        <p>Here you can access all your tools and features.</p>
      </div>
    </ProtectedLayout>
  );
}
