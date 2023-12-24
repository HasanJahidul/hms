import { CreateUserForm } from "@/components/CreateUserForm"

const CreateNurse = () => {
	return (
		<section className="flex flex-col justify-center items-center grow">
			<CreateUserForm formTitle={"nurse"} roleId={4} role={"nurse"} />
		</section>
	)
}

export default CreateNurse
