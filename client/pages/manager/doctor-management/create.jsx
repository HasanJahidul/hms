import { CreateUserForm } from "@/components/CreateUserForm"

const CreateDoctor = () => {
	return (
		<section className="flex flex-col justify-center items-center grow">
			<CreateUserForm formTitle={"doctor"} roleId={3} role={"doctor"} />
		</section>
	)
}

export default CreateDoctor
