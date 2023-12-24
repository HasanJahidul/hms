import { useRouter } from "next/router"

const UpdateAppointment = () => {
	const router = useRouter()
	console.log(router.query.id)
}

export default UpdateAppointment
