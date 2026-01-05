import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  var AUTH_BASE_URL = '';
  var BACKEND_BASE_URL = '';
  if (mode === 'development') {
    AUTH_BASE_URL = 'http://Cerberus:5000'
    BACKEND_BASE_URL = 'http://Shadow:5000'
  } else {
    AUTH_BASE_URL = 'https://auth.clashofprodigies.org'
    BACKEND_BASE_URL = 'https://sobbingly-hydrochloric-joel.ngrok-free.dev/auth'
  }
  return {
    define: { 
      'import.meta.env.VITE_AUTH_URL': JSON.stringify(AUTH_BASE_URL),
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(BACKEND_BASE_URL),
    },
    plugins: [react(), tailwindcss()],
  }})
