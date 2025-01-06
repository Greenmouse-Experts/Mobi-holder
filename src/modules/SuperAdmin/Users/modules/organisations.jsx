import Table from "../../../../components/Tables";

export default function OrganisationsJoined() {
    const RequetsHeaders1 = ["Organisation Name", "Address", "Designation", "Date Joined"];

    const NewTableData2 = [
        {
            name: 'Greenmouse Org',
            number: 'Ikote, Lekki, Lagos',
            plan: 'Product Manager',
            amount: '17-06-2024'
        },
        {
            name: 'Greenmouse Org',
            number: 'Ikote, Lekki, Lagos',
            plan: 'Product Manager',
            amount: '17-06-2024'
        },
        {
            name: 'Greenmouse Org',
            number: 'Ikote, Lekki, Lagos',
            plan: 'Product Manager',
            amount: '17-06-2024'
        },
    ];

    return (
        <>
            <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 overflow-hidden">
                <Table width="lg:w-[1000px]" title="" filter transparentBg subTitle={<span>Joined Organisations</span>} exportData
                    tableHeader={RequetsHeaders1}>
                    {NewTableData2.map((data, index) => (
                        <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.name}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.number}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.plan}</td>
                            <td className="px-3 py-5 text-mobiTableText whitespace-normal">{data.amount}</td>
                        </tr>
                    ))}
                </Table>
            </div>
        </>
    )
}