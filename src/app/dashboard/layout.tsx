import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        {/* Placeholder for Sidebar */}
        <div className="p-4">
          <h2 className="text-lg font-semibold">BrandBoost AI</h2>
          <nav className="mt-6">
            {/* Navigation links will go here */}
          </nav>
        </div>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="p-4 bg-white shadow-md">
          {/* Placeholder for Header content (e.g., user menu) */}
          <div className="flex justify-end">
            <p>User Menu</p>
          </div>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
