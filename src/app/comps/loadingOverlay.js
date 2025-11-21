'use client'

import React from 'react';
import Logowhite from "../../../public/logoblack.svg";

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="inline-block" style={{
        animation: 'fadeInOut 2s ease-in-out infinite'
      }}>
        <Logowhite width={128} height={53} />
      </div>
    </div>
  );
};

export default LoadingOverlay;
