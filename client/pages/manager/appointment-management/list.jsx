import AppointmentTable from "@/components/AppointmentTable"
import { isEmpty, map } from "lodash"
import Dropdown from "@/components/Dropdown"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { RangeDatePicker } from "@/components/ui/range-date-picker"
import {
	eachDayOfInterval,
	format,
	addMinutes,
	set,
	getHours,
	getMinutes,
} from "date-fns"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { apiService } from "@/service"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"

const AppointmentList = () => {
	const [availableSlotsModalIsOpen, setAvailableSlotsModalIsOpen] =
		useState(false)
	const [createAppointmentModalIsOpen, setCreateAppointmentModalIsOpen] =
		useState(false)
	const [appointmentList, setAllAppointmentList] = useState([])
	const [doctorList, setAllDoctorList] = useState([])
	const [patientList, setAllPatientList] = useState([])
	const [availableSlotsData, setAvailableSlotsData] = useState({})
	const [createAppointment, setCreateAppointment] = useState({})
	const [loading, setLoading] = useState(true)

	const getAllAppointmentList = async () => {
		try {
			const response = await apiService.get("appointments/get-all")
			console.log(response)

			if (response.status == 200) {
				setAllAppointmentList(response.data)
			}
		} catch (error) {
			console.log("Error Fetching Appointment List:", error)
			toast.error(error.response.data.message)
		} finally {
			setLoading(false)
		}
	}

	const getAllDoctorList = async () => {
		try {
			const response = await apiService.get("manager/doctor/list")
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
			const response = await apiService.get("manager/patient/list")
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
		console.log("availableSlots", availableSlotsData)

		const { date, interval, doctorId, from, to } = availableSlotsData

		const fromDate = new Date(from)
		const toDate = new Date(to)

		const start = set(date, {
			hours: getHours(fromDate),
			minutes: getMinutes(fromDate),
		})

		const end = set(date, {
			hours: getHours(toDate),
			minutes: getMinutes(toDate),
		})

		const slots = []

		let current = start

		while (current < end) {
			slots.push({
				dateTime: current.toISOString(),
			})

			// Increment by interval
			current = addMinutes(current, Number(interval))
		}

		const formattedData = {
			doctorId,
			availableSlots: slots,
		}

		console.log("formattedData", formattedData)
		// return

		try {
			const response = await apiService.post(
				"appointments/available",
				formattedData
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
			const response = await apiService.post(
				"appointments/make-appointment",
				createAppointment
			)

			console.log(response)

			if (response.status == 201) {
				toast.success(response.data.message)
				setCreateAppointmentModalIsOpen(false)
				return
			}

			toast.error(response.data.message.join(" | "))
		} catch (error) {
			console.log("Error Creating Appointment:", error)
			toast.error(error.response.data.message.join(" | "))
		}
	}

	useEffect(() => {
		getAllAppointmentList()
		getAllDoctorList()
		getAllPatientList()
	}, [])

	return (
		<section className="container flex flex-col grow mt-10 space-y-8">
			{/* // - topbar */}
			<div className="grid grid-cols-2">
				<div>
					<h3 className="text-4xl">Appointment List</h3>
				</div>
				<div className="flex justify-end gap-4">
					<Button
						size="sm"
						className="w-40 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							setCreateAppointmentModalIsOpen(true)
						}}
					>
						Create Appointment
					</Button>

					<Button
						size="sm"
						className="w-32 h-9 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded"
						onClick={() => {
							setAvailableSlotsModalIsOpen(true)
						}}
					>
						Assign Slots
					</Button>
				</div>
			</div>

			{/* // - appointment table */}
			{loading ? (
				<div>Loading...</div>
			) : (
				<AppointmentTable
					data={
						isEmpty(appointmentList)
							? [
									// {
									// 	appointmentId: "1",
									// 	doctorName: "Md. Shafayet Kabir",
									// 	patientName: "Sobhan Ahmed",
									// 	date: "2021-10-10",
									// 	time: "10:00 AM",
									// },
							  ]
							: appointmentList
					}
				/>
			)}

			{/* // + create appointment modal */}
			<Modal
				isOpen={createAppointmentModalIsOpen}
				setIsOpen={setCreateAppointmentModalIsOpen}
			>
				<div className="space-y-4 flex flex-col">
					<h3 className="text-2xl text-slate-900 dark:text-slate-50">
						Create Appointments
					</h3>
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
											{format(new Date(avAp.dateTime), "LLL dd, y | hh:mm a")}
										</SelectItem>
									)
								})}
						</SelectContent>
					</Select>

					<Button
						className="w-32 ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={handleCreateAppointment}
					>
						Create
					</Button>
				</div>
			</Modal>

			{/* // + assign appointment slots modal */}
			<Modal
				isOpen={availableSlotsModalIsOpen}
				setIsOpen={setAvailableSlotsModalIsOpen}
			>
				<div className="space-y-4 flex flex-col">
					<h3 className="text-2xl text-slate-900 dark:text-slate-50">
						Assign Available Slots
					</h3>
					<Select
						onValueChange={val => {
							console.log("doc id", val)

							setAvailableSlotsData(prev => {
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

					<DatePicker
						onChange={date => {
							console.log("selected date", date)

							setAvailableSlotsData(prev => {
								return {
									...prev,
									date: date,
								}
							})
							return
							const dates = map(
								eachDayOfInterval({ start: date?.from, end: date?.to }),
								day => day.toISOString()
								// day => format(day, 'yyyy-MM-dd') // doesn't work either
							)

							console.log("dates", dates)

							const formattedDates = dates.map(dateStr => {
								return {
									dateTime: dateStr,
								}
							})

							console.log("formattedDates", formattedDates)

							setAvailableSlotsData(prev => {
								return {
									...prev,
									availableSlots: formattedDates,
								}
							})
						}}
					/>

					<Input
						placeholder="Interval in minutes"
						value={availableSlotsData.interval ?? ""}
						onChange={e => {
							const val = e.target.value
							console.log("interval", val, isNaN(val))

							// check if val is valid number
							if (!isEmpty(val) && isNaN(val)) return

							// only allow number inputs between 5-59
							if (!isEmpty(val) && (val < 1 || val > 59)) return

							setAvailableSlotsData(prev => {
								return {
									...prev,
									interval: val,
								}
							})
						}}
					/>

					<div className="grid grid-cols-2 gap-4">
						<Input
							placeholder="From"
							type="time"
							onChange={e => {
								const val = e.target.valueAsNumber
								console.log("from", val)

								setAvailableSlotsData(prev => {
									return {
										...prev,
										from: val,
									}
								})
							}}
						/>
						<Input
							placeholder="To"
							type="time"
							onChange={e => {
								const val = e.target.valueAsNumber
								console.log("to", val)

								setAvailableSlotsData(prev => {
									return {
										...prev,
										to: val,
									}
								})
							}}
						/>
					</div>

					<Button
						className="w-32 ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={handleAssignSlots}
					>
						Assign
					</Button>
				</div>
			</Modal>
		</section>
	)
}

export default AppointmentList
