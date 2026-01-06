import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  var VITE_AUTH_PAGE_URL = '';
  var VITE_BACKEND_BASE_URL = '';
  if (mode === 'development') {
    VITE_AUTH_PAGE_URL = 'http://clash-of-prodigies.github.io/Cerberus'
    VITE_BACKEND_BASE_URL = 'http://Shadow:5000'
  } else {
    VITE_AUTH_PAGE_URL = 'https://auth.clashofprodigies.org'
    VITE_BACKEND_BASE_URL = '/api/'
  }
  return {
    define: { 
      'import.meta.env.VITE_AUTH_URL': JSON.stringify(VITE_AUTH_PAGE_URL),
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(VITE_BACKEND_BASE_URL),
    },
    plugins: [react(), tailwindcss()],
  }})
