const AppointmentTable = ({ data = [] }) => {
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
        <tbody>
          {data.map((element) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.doctorName}
                </th>
                <td className="px-6 py-4">{data.patientName}</td>
                <td className="px-6 py-4">{data.date}</td>
                <td className="px-6 py-4">{data.time}</td>
                <td className="px-6 py-4">
                  <button className="text-white bg-green-500">
                    <a
                      href={`/manager/appointment-management/update/${data.appointmentId}`}
                    >
                      Update
                    </a>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
