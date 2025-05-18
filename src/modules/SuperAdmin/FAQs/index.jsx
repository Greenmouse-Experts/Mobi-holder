import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Header from "../header";
import DeleteModal from "../../../components/DeleteModal";
import ReusableModal from "../../../components/ReusableModal";
import useModal from "../../../hooks/modal";
import CreateFAQ from "./modals/createFAQ";

export default function FAQs() {

    const { openModal, isOpen, modalOptions, closeModal } = useModal();

    const faqs = [
        {
            id: 1,
            question: 'How do I book an event through your platform?',
            answer:
                'You can book an event by visiting our event booking page, selecting your desired event, and filling out the registration form.',
        },
        {
            id: 2,
            question: 'What information is required to generate an ID card?',
            answer:
                'To generate your ID card, we require your full name, a recent photograph, contact details, event registration ID, and any other event-specific details as requested during registration.',
        },
        {
            id: 3,
            question: 'How long does it take to receive my ID card after registration?',
            answer:
                'Typically, ID cards are generated and sent within 24–48 hours of successful registration and verification of the required details.',
        },
        {
            id: 4,
            question: 'Can I make changes to my details after submitting the form?',
            answer:
                'Yes, you can request changes by contacting our support team before the ID card is generated. Once the card is issued, any modifications may incur a reprint fee.',
        },
        {
            id: 5,
            question: 'Is the ID card digital or physical, and how do I receive it?',
            answer:
                'We offer both digital and physical ID cards. Digital cards are sent via email, while physical cards (if applicable) can be collected at the event venue or shipped, depending on your chosen delivery option.',
        },
    ];


    const handleAddModal = () => {
        openModal({
            size: "sm",
            content: <CreateFAQ />
        })
    }



    const handleDeleteModal = () => {
        openModal({
            size: "sm",
            content: <DeleteModal title={'Do you wish to delete this FAQ?'} closeModal={closeModal} />
        })
    }


    return (
        <div className="w-full flex h-full animate__animated animate__fadeIn">
            <div className="w-full flex flex-col gap-5 h-full">
                <Header mobile superAdmin />
                <div className="w-full flex flex-col gap-5 border border-mobiBorderFray card-body p-5 rounded-xl my-2">
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Frequently Asked Questions</p>
                        </div>
                        <div className="flex md:w-2/5 w-full justify-end">
                            <Button className="bg-mobiPink" onClick={() => handleAddModal()}>Add FAQs</Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full hidden md:table border border-gray-300 text-sm">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="p-3 border border-gray-300">S/N</th>
                                    <th className="p-3 border border-gray-300">Questions</th>
                                    <th className="p-3 border border-gray-300">Answer</th>
                                    <th className="p-3 border border-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {faqs.map((faq, index) => (
                                    <tr key={faq.id} className="border border-gray-200">
                                        <td className="p-3 border border-gray-300">{index + 1}</td>
                                        <td className="p-3 border border-gray-300">{faq.question}</td>
                                        <td className="p-3 border border-gray-300">{faq.answer}</td>
                                        <td className="p-3 border border-gray-300 text-center">
                                            <Menu placement="left">
                                                <MenuHandler>
                                                    <span className="cursor-pointer">☰</span>
                                                </MenuHandler>
                                                <MenuList>
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer">
                                                            Edit FAQ
                                                        </span>
                                                    </MenuItem>
                                                    <MenuItem className="flex flex-col gap-3">
                                                        <span className="cursor-pointer" onClick={() => handleDeleteModal()}>
                                                            Delete FAQ
                                                        </span>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile Version */}
                        <div className="md:hidden flex flex-col gap-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={faq.id}
                                    className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
                                >
                                    <div className="font-semibold text-sm text-gray-600 mb-1">
                                        S/N: <span className="font-normal">{index + 1}</span>
                                    </div>
                                    <div className="font-semibold text-sm text-gray-600 mb-1">
                                        Question:
                                        <div className="font-normal mt-1 text-gray-800">{faq.question}</div>
                                    </div>
                                    <div className="font-semibold text-sm text-gray-600 mb-1">
                                        Answer:
                                        <div className="font-normal mt-1 text-gray-800">{faq.answer}</div>
                                    </div>
                                    <div className="text-right mt-2 text-xl">☰</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



            <ReusableModal
                isOpen={isOpen}
                size={modalOptions.size}
                title={modalOptions.title}
                content={modalOptions.content}
                closeModal={closeModal}
            />


        </div>

    )
}