import Badge from "../../../../components/Badge";
import Table from "../../../../components/Tables";

export default function IDCards() {
    const TableHeaders = ["ID Name", "Issuing Organisation", "Date Issued", "Expiry Date", "Status"];
    const TableData = [
        {
            name: 'Chukka Uzo',
            email: 'Greenmouse Tech',
            number: '12-09-2024',
            date: '12-10-24',
            status: 'open',
        },
        {
            name: 'Chukka Uzo',
            email: 'Greenmouse Tech',
            number: '12-09-2024',
            date: '12-10-24',
            status: 'open',
        },
        {
            name: 'Chukka Uzo',
            email: 'Greenmouse Tech',
            number: '12-09-2024',
            date: '12-10-24',
            status: 'open',
        },
        {
            name: 'Chukka Uzo',
            email: 'Greenmouse Tech',
            number: '12-09-2024',
            date: '12-10-24',
            status: 'open',
        },
    ];

    return (
        <>
            <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 my-2">
                <Table title="" subTitle={<span>ID Cards</span>} exportData
                    hasNumber
                    tableBtn={
                        <button className="px-2 pt-2 flex gap-2 rounded-md" style={{ backgroundColor: 'rgba(21, 23, 30, 1)' }}>
                            <span className="text-xs text-white">Newest First</span>
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.00122 1V11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M0.909424 6.9082L5.00033 10.9991L9.09124 6.9082" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    }
                    tableHeader={TableHeaders}>
                    {TableData.map((data, index) => (
                        <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{index + 1}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.name}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.email}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.number}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.date}</td>
                            <td className="px-1 py-3 text-mobiTableText"><Badge status={data.status} /></td>
                        </tr>
                    ))}
                </Table>
            </div>
        </>
    )
}