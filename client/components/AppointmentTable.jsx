import { format } from "date-fns";
import { Button } from "./ui/button";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { apiService } from "@/service";

const AppointmentTable = ({ data = [] }) => {

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await apiService.delete(
        `appointments/delete?id=${appointmentId}`
      );

      if (response.status === 201 || response.data.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error("Error Deleting Appointment");
      }
    } catch (error) {
      console.log("Error Deleting Appointment", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Doctor Name
            </th>
            <th scope="col" className="px-6 py-3">
              Patient Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {!isEmpty(data) ? (
          <tbody>
            {data.map((element) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={element.id}
              >
                <td className="px-6 py-4">{element.doctor.userDetails.name}</td>
                <td className="px-6 py-4">
                  {element.patient.userDetails.name}
                </td>
                <td className="px-6 py-4">
                  {format(
                    new Date(element.availableAppointment.dateTime),
                    "dd MMM yyyy"
                  )}
                </td>
                <td className="px-6 py-4">
                  {format(
                    new Date(element.availableAppointment.dateTime),
                    "h:mm a"
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <a
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    href={`/manager/appointment-management/update/${element.id}`}
                  >
                    Update
                  </a>

                  <Button
                    size="sm"
                    className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      console.log("delete");
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4" colSpan="5">
                No data found
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default AppointmentTable;
