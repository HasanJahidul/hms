import { CreateUserForm } from "@/components/CreateUserForm";

const create = () => {
  return (
    <div>
      <CreateUserForm formTitle={"patient"} roleId={5} role={"patient"} />
    </div>
  );
};

export default create;
