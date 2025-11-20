'use client'

import { toast } from 'react-toastify';
import { Theme } from '../local';

const CustomToast = ({ type, message, icon }) => {
  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          icon: '✓',
          iconBg: 'rgba(255, 255, 255, 0.2)'
        };
      case 'error':
        return {
          bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          icon: '✕',
          iconBg: 'rgba(255, 255, 255, 0.2)'
        };
      case 'warning':
        return {
          bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          icon: '⚠',
          iconBg: 'rgba(255, 255, 255, 0.2)'
        };
      case 'info':
        return {
          bg: `linear-gradient(135deg, ${Theme.primary} 0%, ${Theme.secondaryDark} 100%)`,
          icon: 'ℹ',
          iconBg: 'rgba(255, 255, 255, 0.2)'
        };
      default:
        return {
          bg: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
          icon: '•',
          iconBg: 'rgba(255, 255, 255, 0.2)'
        };
    }
  };

  const colors = getColors();

  return (
    <div
      style={{
        background: colors.bg,
        padding: '16px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: colors.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'white',
          flexShrink: 0,
        }}
      >
        {icon || colors.icon}
      </div>
      <div style={{ flex: 1, color: 'white', fontSize: '14px', fontWeight: '500' }}>
        {message}
      </div>
    </div>
  );
};

export const showToast = (type, message, options = {}) => {
  const defaultOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    closeButton: false,
    style: {
      background: 'transparent',
      boxShadow: 'none',
      padding: 0,
    },
    ...options,
  };

  switch (type) {
    case 'success':
      return toast.success(<CustomToast type="success" message={message} />, defaultOptions);
    case 'error':
      return toast.error(<CustomToast type="error" message={message} />, defaultOptions);
    case 'warning':
      return toast.warning(<CustomToast type="warning" message={message} />, defaultOptions);
    case 'info':
      return toast.info(<CustomToast type="info" message={message} />, defaultOptions);
    default:
      return toast(<CustomToast type="default" message={message} />, defaultOptions);
  }
};

export default CustomToast;
