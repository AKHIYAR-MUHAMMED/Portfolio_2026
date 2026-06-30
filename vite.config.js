import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@/components/Nav': path.resolve(__dirname, './Nav.jsx'),
      '@/components/Hero': path.resolve(__dirname, './Hero.jsx'),
      '@/components/About': path.resolve(__dirname, './About.jsx'),
      '@/components/Skills': path.resolve(__dirname, './Skills.jsx'),
      '@/components/Experience': path.resolve(__dirname, './Experience.jsx'),
      '@/components/Projects': path.resolve(__dirname, './Projects.jsx'),
      '@/components/Community': path.resolve(__dirname, './Community.jsx'),
      '@/components/Writing': path.resolve(__dirname, './Writing.jsx'),
      '@/components/Contact': path.resolve(__dirname, './Contact.jsx'),
      '@/components/Footer': path.resolve(__dirname, './Footer.jsx'),
      '@/components/SectionHeader': path.resolve(__dirname, './SectionHeader.jsx'),
      '@/data/portfolio': path.resolve(__dirname, './portfolio.js'),
      '@/App.css': path.resolve(__dirname, './App.css'),
      '@/pages/Portfolio': path.resolve(__dirname, './Portfolio.jsx'),
      '@': path.resolve(__dirname, './')
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
