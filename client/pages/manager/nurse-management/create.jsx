import { CreateUserForm } from "@/components/CreateUserForm";

const create = () => {
  return (
    <div>
      <CreateUserForm formTitle={"nurse"} roleId={4} role={"nurse"} />
    </div>
  );
};

export default create;
