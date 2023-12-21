import { CreateUserForm } from "@/components/CreateUserForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const update = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  const getPatientDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/manager/patient?id=${id}`,
        {
          withCredentials: true,
        }
      );
      console.log("Patient Details", response);

      if (response.status == 200) {
        const data = {
          userId: response.data.message.id,
          userName: response.data.message.userDetails.name,
          userAddress: response.data.message.userDetails.address,
          userPhone: response.data.message.userDetails.phone,
          userAvatar: response.data.message.userDetails.avatar,
          email: response.data.message.email,
          isActive: response.data.message.is_active,
          departmentId: response.data.message.department.id,
          departmentName: response.data.message.department.name,
          departmentDescription: response.data.message.department.description,
          services: response.data.message.services,
          appointments: response.data.message.appointments,
          availableAppointments: response.data.message.availableAppointments,
          roleId: response.data.message.role.id,
          roleName: response.data.message.role.name,
        };

        setData(data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error fetching patient details:", error);
    }
  };

  useEffect(() => {
    getPatientDetails(router.query.id);
  }, [router]);

  return (
    <div className="">
      <CreateUserForm
        formTitle={"patient"}
        role={"patient"}
        roleId={5}
        apiData={data}
        isUpdate={true}
      />
    </div>
  );
};

export default update;
