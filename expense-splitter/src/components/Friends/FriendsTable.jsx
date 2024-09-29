// static data used for maping, in future these will be states
const friendsData = [
  {
    type: "Restaurant",
    date: "2023/3/20",
    group: "Group 3",
    amount: "100€",
    note: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, labore.",
  },
  {
    type: "Restaurant",
    date: "2023/3/20",
    group: "Group 3",
    amount: "100€",
    note: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, labore.",
  },
];

function FriendsTable() {
  return (
    <section className="overflow-x-auto rounded-lg">
      <table className="table-auto text-left">
        <thead className="uppercase bg-highlight text-body font-medium text-legend">
          <tr>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>

            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Group
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Note
            </th>

          </tr>
        </thead>
        <tbody>
          {friendsData.map((el, index) => (
            <tr key={index} className="bg-white border-b border-gray-100">
              <td className="px-6 py-4 text-body font-bold text-secondary  whitespace-nowrap">
                {el.type}
              </td>
              <td className="px-6 py-4 text-body font-bold text-secondary">
                {el.date}
              </td>
              <td className="px-6 py-4 text-body font-bold text-secondary">
                {el.group}
              </td>
              <td className="px-6 py-4 text-body font-bold text-secondary">
                {el.amount}
              </td>

              <td className="px-6 py-4 text-sm font-normal text-secondary">
                {el.note}
              </td>

              {/* <td className="px-6 py-4 w-96">
                <button className="text-blue-600 hover:text-primary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam, quos.
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default FriendsTable;