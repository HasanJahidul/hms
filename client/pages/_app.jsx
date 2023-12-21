import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { getCookie, hasCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }) {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);
  return (
    <>
      {rendered && (
        <div>
          <Navbar />
          {hasCookie("role") && getCookie("role").toString() == "2" && <Sidebar />}
          <div className="m-12">
            <ToastContainer />
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
