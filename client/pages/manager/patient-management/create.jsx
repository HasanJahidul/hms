import { CreateUserForm } from "@/components/CreateUserForm"

const PatientCreate = () => {
	return (
		<section className="flex flex-col justify-center items-center grow">
			<CreateUserForm formTitle={"patient"} roleId={5} role={"patient"} />
		</section>
	)
}

export default PatientCreate
