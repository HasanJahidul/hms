import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import '@/styles/globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <ToastContainer />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
