import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { DrawerPortal } from "@/components/ui/drawer-portal"
import "@/styles/globals.css"
import { getCookie, hasCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export default function App({ Component, pageProps }) {
	const [rendered, setRendered] = useState(false)
	const [drawerVisibility, setDrawerVisibility] = useState(false)

	useEffect(() => {
		setRendered(true)
	}, [])
	return (
		<>
			{rendered && (
				<>
					<main className="min-h-screen flex flex-col">
						<Navbar setSidebarOpenStatus={setDrawerVisibility} />
						{hasCookie("role") && getCookie("role").toString() == "2" && (
							<DrawerPortal
								visibility={drawerVisibility}
								updateVisibility={setDrawerVisibility}
								backdrop={{
									className: "bg-transparent",
								}}
								closeOnExternalClick={false}
							>
								<Sidebar />
							</DrawerPortal>
						)}
						{/* <div className="m-12">
					</div> */}
						<Component {...pageProps} />
						<Footer />
					</main>
					<ToastContainer />
				</>
			)}
		</>
	)
}
