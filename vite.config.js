import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  var VITE_AUTH_BASE_URL = '';
  var VITE_BACKEND_BASE_URL = '';
  if (mode === 'development') {
    VITE_AUTH_BASE_URL = 'http://clash-of-prodigies.github.io/Cerberus'
    VITE_BACKEND_BASE_URL = 'http://Shadow:5000'
  } else {
    VITE_AUTH_BASE_URL = 'https://auth.clashofprodigies.org'
    VITE_BACKEND_BASE_URL = 'https://sobbingly-hydrochloric-joel.ngrok-free.dev/api'
  }
  return {
    define: { 
      'import.meta.env.VITE_AUTH_URL': JSON.stringify(VITE_AUTH_BASE_URL),
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(VITE_BACKEND_BASE_URL),
    },
    plugins: [react(), tailwindcss()],
  }})
