import { CreateUserForm } from "@/components/CreateUserForm";
import { apiService } from "@/service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const profile = () => {
  const [data, setData] = useState(null);

  const getProfileData = async () => {
    try {
      const response = await apiService.get(
        "http://localhost:3000/manager/profile"
      );
      console.log("Manager Profile Details", response);

      if (response.status == 200) {
        const data = {
          userId: response.data.id,
          userName: response.data.userDetails.name,
          userAddress: response.data.userDetails.address,
          userPhone: response.data.userDetails.phone,
          userAvatar: response.data.userDetails.avatar,
          email: response.data.email,
          isActive: response.data.is_active,
          appointments: response.data.appointments,
          availableAppointments: response.data.availableAppointments,
          roleId: response.data.role.id,
          roleName: response.data.role.name,
        };

        setData(data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error fetching manager profile:", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <section className="flex flex-col justify-center items-center grow">
      <CreateUserForm
        formTitle={"manager"}
        role={"manager"}
        roleId={2}
        isUpdate={true}
        apiData={data}
      />
    </section>
  );
};

export default profile;
