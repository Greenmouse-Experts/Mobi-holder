import Table from "../../../../components/Tables";

export default function Members() {
    const RequetsHeaders = ["Individual", "MBIH", "Staff ID", "Email", "Date Joined", "Designation"];
    const NewTableData = [
        {
            name: 'Chukka Uzo',
            id: 'ASD673ER',
            staff: 'GRE1234',
            email: 'testmail@gmail.com',
            number: '12-11-2024',
            status: 'QA Engineer'
        },
        {
            name: 'Chukka Uzo',
            id: 'ASD673ER',
            staff: 'GRE1234',
            email: 'testmail@gmail.com',
            number: '12-11-2024',
            status: 'QA Engineer'
        },
        {
            name: 'Chukka Uzo',
            id: 'ASD673ER',
            staff: 'GRE1234',
            email: 'testmail@gmail.com',
            number: '12-11-2024',
            status: 'QA Engineer'
        },
    ];

    return (
        <>
            <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 overflow-hidden">
                <Table width="lg:w-[1000px]" title="Today" transparentBg filter subTitle={<span>Members</span>} exportData
                    tableHeader={RequetsHeaders}>
                    {NewTableData.map((data, index) => (
                        <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.name}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.id}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.staff}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.email}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.number}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.status}</td>
                        </tr>
                    ))}
                </Table>
            </div>
        </>
    )
}