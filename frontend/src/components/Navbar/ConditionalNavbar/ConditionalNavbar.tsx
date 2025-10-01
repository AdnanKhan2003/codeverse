"use client";

import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from '../Navbar';

const ConditionalNavbar = () => {
    const pathname = usePathname();

    const hideNavbar = pathname == "/signup" || pathname == "/login";
    
    if(hideNavbar) return null;

  return (
    <Navbar />
  )
}

export default ConditionalNavbar