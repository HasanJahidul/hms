const AppointmentTable = ({ data = [] }) => {
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Doctor Name
            </th>
            <th scope="col" class="px-6 py-3">
              Patient Name
            </th>
            <th scope="col" class="px-6 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              Time
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => {
            return (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.doctorName}
                </th>
                <td class="px-6 py-4">{data.patientName}</td>
                <td class="px-6 py-4">{data.date}</td>
                <td class="px-6 py-4">{data.time}</td>
                <td class="px-6 py-4">
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