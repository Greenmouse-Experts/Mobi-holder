import Badge from "../../../../components/Badge";
import Table from "../../../../components/Tables";

export default function Subscriptions() {
    const RequetsHeaders1 = ["Transaction ID", "Organisation", "Date", "Plan Name", "Amount", "Status"];

    const NewTableData2 = [
        {
            id: 'QEW1234',
            name: 'Chukka Uzo',
            number: '12-11-2024',
            plan: 'Basic',
            amount: 'N10,000',
            status: 'active'
        },
        {
            id: 'QEW1234',
            name: 'Chukka Uzo',
            number: '12-11-2024',
            plan: 'Basic',
            amount: 'N10,000',
            status: 'active'
        },
        {
            id: 'QEW1234',
            name: 'Chukka Uzo',
            number: '12-11-2024',
            plan: 'Basic',
            amount: 'N10,000',
            status: 'active'
        },
    ];

    return (
        <>
            <div className="w-full flex lg:flex-row md:flex-row flex-col gap-5 overflow-hidden">
                <Table width="lg:w-[1000px]" title="" filter transparentBg subTitle={<span>Subscriptions</span>} exportData
                    tableHeader={RequetsHeaders1}>
                    {NewTableData2.map((data, index) => (
                        <tr key={index} className={`py-5 ${index % 2 === 0 ? 'bg-mobiDarkCloud' : 'bg-mobiTheme'}`}>
                            <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.id}</td>
                            <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.name}</td>
                            <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.number}</td>
                            <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.plan}</td>
                            <td className="px-3 py-3 text-mobiTableText whitespace-normal">{data.amount}</td>
                            <td className="px-3 py-3 text-mobiTableText whitespace-normal"><Badge status={data.status} /></td>
                        </tr>
                    ))}
                </Table>
            </div>
        </>
    )
}