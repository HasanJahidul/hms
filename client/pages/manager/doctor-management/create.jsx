import { CreateUserForm } from "@/components/CreateUserForm";

const create = () => {
  return (
    <div>
      <CreateUserForm formTitle={"doctor"} roleId={3} role={"doctor"} />
    </div>
  );
};

export default create;
