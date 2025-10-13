import Badge from "../../../../components/Badge";
import Table from "../../../../components/Tables";

export default function Subscriptions() {
  const RequetsHeaders = [
    "Plan Name",
    "Plan Duration",
    "Amount",
    "Date Created",
  ];
  const RequetsHeaders1 = [
    "Transaction ID",
    "Members Name",
    "MBIH",
    "Date",
    "Plan Name",
    "Amount",
    "Status",
  ];

  const NewTableData = [
    {
      name: "Basic Plan",
      duration: "1 month",
      amount: "N10,000",
      number: "12-11-2024",
    },
    {
      name: "Standard Plan",
      duration: "6 months",
      amount: "N10,000",
      number: "12-11-2024",
    },
    {
      name: "Basic Plan",
      duration: "1 month",
      amount: "N10,000",
      number: "12-11-2024",
    },
  ];

  const NewTableData2 = [
    {
      id: "QEW1234",
      name: "Chukka Uzo",
      mbih: "MBIH433",
      number: "12-11-2024",
      plan: "Basic",
      amount: "N10,000",
      status: "active",
    },
    {
      id: "QEW1234",
      name: "Chukka Uzo",
      mbih: "MBIH433",
      number: "12-11-2024",
      plan: "Basic",
      amount: "N10,000",
      status: "active",
    },
    {
      id: "QEW1234",
      name: "Chukka Uzo",
      mbih: "MBIH433",
      number: "12-11-2024",
      plan: "Basic",
      amount: "N10,000",
      status: "active",
    },
  ];

  return (
    <>
      <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 overflow-hidden">
        <Table
          width="lg:w-[1000px]"
          transparentBg
          filter
          subTitle={<span>Subscriptions Plans</span>}
          exportData
          tableHeader={RequetsHeaders}
        >
          {NewTableData.map((data, index) => (
            <tr
              key={index}
              className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}`}
            >
              <td className="px-3 py-3 text-mobiTableText whitespace-normal">
                {data.name}
              </td>
              <td className="px-3 py-3 text-mobiTableText whitespace-normal">
                {data.duration}
              </td>
              <td className="px-3 py-3 text-mobiTableText whitespace-normal">
                {data.amount}
              </td>
              <td className="px-3 py-3 text-mobiTableText whitespace-normal">
                {data.number}
              </td>
            </tr>
          ))}
        </Table>
      </div>

      <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 overflow-hidden">
        <Table
          width="lg:w-[1000px]"
          transparentBg
          filter
          subTitle={<span>Subscriptions Log</span>}
          exportData
          tableHeader={RequetsHeaders1}
        >
          {NewTableData2.map((data, index) => (
            <tr
              key={index}
              className={`py-5 ${index % 2 === 0 ? "bg-mobiDarkCloud" : "bg-mobiTheme"}`}
            >
              <td className="px-3 py-5 text-mobiTableText whitespace-normal">
                {data.id}
              </td>
              <td className="px-3 py-5 text-mobiTableText whitespace-normal">
                {data.name}
              </td>
              <td className="px-3 py-5 text-mobiTableText whitespace-normal">
                {data.mbih}
              </td>
              <td className="px-3 py-5 text-mobiTableText whitespace-normal">
                {data.number}
              </td>
              <td className="px-3 py-5 text-mobiTableText whitespace-normal">
                {data.plan}
              </td>
              <td className="px-3 py-5 text-mobiTableText whitespace-normal">
                {data.amount}
              </td>
              <td className="px-3 py-5 text-mobiTableText whitespace-normal">
                <Badge status={data.status} />
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </>
  );
}
