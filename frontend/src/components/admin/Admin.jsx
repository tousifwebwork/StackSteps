import React from 'react';
import AdminNav from './AdminNav';
import Left from './Left';
import Right from './Right';
import Footer from '../Footer';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100"> 

      <AdminNav />

      <div className="max-w-7xl mx-auto grid grid-cols-[30%_70%] gap-4 p-4">
        <Left />
        <Right />
      </div>

      <Footer />

    </div>
  );
};

export default Admin;