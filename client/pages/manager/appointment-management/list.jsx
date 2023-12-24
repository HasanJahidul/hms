import AppointmentTable from "@/components/AppointmentTable"
import { isEmpty, map } from "lodash"
import Dropdown from "@/components/Dropdown"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { RangeDatePicker } from "@/components/ui/range-date-picker"
import { eachDayOfInterval, format } from "date-fns"
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
	const [availableSlotsModalIsOpen, setAvailableSlotsModalIsOpen] =
		useState(false)
	const [createAppointmentModalIsOpen, setCreateAppointmentModalIsOpen] =
		useState(false)
	const [appointmentList, setAllAppointmentList] = useState([])
	const [doctorList, setAllDoctorList] = useState([])
	const [patientList, setAllPatientList] = useState([])
	const [availableSlots, setAvailableSlots] = useState({})
	const [createAppointment, setCreateAppointment] = useState({})

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

	const getAllPatientList = async () => {
		try {
			const response = await apiService.get(
				"http://localhost:3000/manager/patient/list"
			)
			console.log(response)

			if (response.status == 200) {
				setAllPatientList(response.data.message)
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
				setAvailableSlotsModalIsOpen(false)
			}
		} catch (error) {
			console.log("Error Assigning Slots:", error)
			toast.error(error.response.data.message)
		}
	}

	const handleCreateAppointment = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3000/appointments/make-appointment",
				createAppointment
			)

			console.log(response)

			if (response.status == 201) {
				toast.success(response.data.message)
				setCreateAppointmentModalIsOpen(false)
			}
		} catch (error) {
			console.log("Error Creating Appointment:", error)
			toast.error(error.response.data.message)
		}
	}

	useEffect(() => {
		getAllAppointmentList()
		getAllDoctorList()
		getAllPatientList()
	}, [])

	return (
		<div className="text-center space-y-5">
			<div className="grid grid-cols-2">
				<div>
					<h3>Appointment List</h3>
				</div>
				<div className="flex justify-end gap-2">
					<Button
						className="w-40 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							setCreateAppointmentModalIsOpen(true)
						}}
					>
						Create Appointment
					</Button>

					<Button
						className="w-32 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							setAvailableSlotsModalIsOpen(true)
						}}
					>
						Assign Slots
					</Button>
				</div>
			</div>

			<AppointmentTable data={appointmentList} />

			<Modal
				isOpen={availableSlotsModalIsOpen}
				setIsOpen={setAvailableSlotsModalIsOpen}
			>
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

			<Modal
				isOpen={createAppointmentModalIsOpen}
				setIsOpen={setCreateAppointmentModalIsOpen}
			>
				<div className="space-y-2 flex flex-col">
					<h3>Create Appointments</h3>
					<Select
						onValueChange={val => {
							console.log("doc id", val)

							setCreateAppointment(prev => {
								return {
									...prev,
									patientId: val,
								}
							})
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a patient" />
						</SelectTrigger>
						<SelectContent>
							{patientList.map(patient => {
								return (
									<SelectItem
										key={patient.id}
										value={patient.id}
										className="text-slate-50"
									>
										{patient.userDetails.name}
									</SelectItem>
								)
							})}
						</SelectContent>
					</Select>

					<Select
						onValueChange={val => {
							console.log("doc id", val)

							setCreateAppointment(prev => {
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

					<Select
						onValueChange={val => {
							console.log("doc id", val)

							setCreateAppointment(prev => {
								return {
									...prev,
									availableAppointmentId: val,
								}
							})
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select an available date" />
						</SelectTrigger>
						<SelectContent>
							{!isEmpty(doctorList) &&
								doctorList[
									doctorList.findIndex(
										doc => doc.id == createAppointment.doctorId
									)
								]?.availableAppointments?.map(avAp => {
									return (
										<SelectItem
											key={avAp.id}
											value={avAp.id}
											className="text-slate-50"
										>
											{format(new Date(avAp.dateTime), "LLL dd, y")}
										</SelectItem>
									)
								})}
						</SelectContent>
					</Select>

					<Button
						className="w-32 ml-auto bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
						onClick={handleCreateAppointment}
					>
						Create
					</Button>
				</div>
			</Modal>
		</div>
	)
}

export default list
