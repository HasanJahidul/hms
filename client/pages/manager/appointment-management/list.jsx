import AppointmentTable from "@/components/AppointmentTable"
import { map } from "lodash"
import Dropdown from "@/components/Dropdown"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { RangeDatePicker } from "@/components/ui/range-date-picker"
import { eachDayOfInterval } from "date-fns"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { apiService } from "@/service"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
const list = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [appointmentList, setAllAppointmentList] = useState([])
	const [doctorList, setAllDoctorList] = useState([])
	const [availableSlots, setAvailableSlots] = useState({})

	const getAllAppointmentList = async () => {
		try {
			const response = await apiService.get(
				"http://localhost:3000/appointments/get-all"
			)
			console.log(response)

			if (response.status == 200) {
				setAllAppointmentList(response.data.message)
			}
		} catch (error) {
			console.log("Error Fetching Appointment List:", error)
			toast.error(error.response.data.message)
		}
	}

	const getAllDoctorList = async () => {
		try {
			const response = await apiService.get(
				"http://localhost:3000/manager/doctor/list"
			)
			console.log(response)

			if (response.status == 200) {
				setAllDoctorList(response.data.message)
			}
		} catch (error) {
			console.log("Error Fetching Doctor List:", error)
			toast.error(error.response.data.message)
		}
	}

	const handleAssignSlots = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3000/appointments/available",
				availableSlots
			)

			console.log(response)

			if (response.status == 201) {
				toast.success(response.data.message)
				setModalIsOpen(false)
			}
		} catch (error) {
			console.log("Error Assigning Slots:", error)
			toast.error(error.response.data.message)
		}
	}

	useEffect(() => {
		getAllAppointmentList()
		getAllDoctorList()
	}, [])

	return (
		<div className="text-center space-y-5">
			<div className="grid grid-cols-2">
				<div>
					<h3>Appointment List</h3>
				</div>
				<div className="flex justify-end">
					<Button
						className="w-32 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							setModalIsOpen(true)
						}}
					>
						Assign Slots
					</Button>
				</div>
			</div>

			<AppointmentTable data={appointmentList} />

			<Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
				<div className="space-y-2 flex flex-col">
					<h3>Assign Available Slots</h3>
					<Select
						onValueChange={val => {
							console.log("doc id", val)

							setAvailableSlots(prev => {
								return {
									...prev,
									doctorId: val,
								}
							})
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a doctor" />
						</SelectTrigger>
						<SelectContent>
							{doctorList.map(doctor => {
								return (
									<SelectItem
										key={doctor.id}
										value={doctor.id}
										className="text-slate-50"
									>
										{doctor.userDetails.name}
									</SelectItem>
								)
							})}
						</SelectContent>
					</Select>

					<RangeDatePicker
						onChange={date => {
							console.log("date range", date)

							const dates = map(
								eachDayOfInterval({ start: date?.from, end: date?.to }),
								day => day.toISOString()
							)

							console.log("dates", dates)

							const formattedDates = dates.map(dateStr => {
								return {
									dateTime: dateStr,
								}
							})

							console.log("formattedDates", formattedDates)

							setAvailableSlots(prev => {
								return {
									...prev,
									availableSlots: formattedDates,
								}
							})
						}}
					/>

					<Button
						className="w-32 ml-auto bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
						onClick={handleAssignSlots}
					>
						Assign
					</Button>
				</div>
			</Modal>
		</div>
	)
}

export default list
