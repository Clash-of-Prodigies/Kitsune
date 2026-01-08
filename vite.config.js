import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  var VITE_AUTH_PAGE_URL = '';
  var VITE_API_URL = '';
  if (mode === 'development') {
    VITE_AUTH_PAGE_URL = 'http://clash-of-prodigies.github.io/Cerberus'
    VITE_API_URL = 'http://localhost:5000'
  } else {
    VITE_AUTH_PAGE_URL = 'https://auth.clashofprodigies.org'
    VITE_API_URL = 'https://api.clashofprodigies.org'
  }
  return {
    define: { 
      'import.meta.env.VITE_AUTH_PAGE_URL': JSON.stringify(VITE_AUTH_PAGE_URL),
      'import.meta.env.VITE_API_URL': JSON.stringify(VITE_API_URL),
    },
    plugins: [react(), tailwindcss()],
  }})
