import React from 'react';
import { FaTasks } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 text-white flex items-center">
      <FaTasks size={24} className="mr-2" />
      <h1 className="text-lg font-semibold">Task Manager (ClickUp Clone)</h1>
    </header>
  );
};

export default Header;
