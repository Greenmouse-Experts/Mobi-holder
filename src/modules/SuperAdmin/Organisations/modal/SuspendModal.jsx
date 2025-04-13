import { Button } from '@material-tailwind/react';
import useApiMutation from '../../../../api/hooks/useApiMutation';

const SuspendModal = ({ closeModal, id, reload, status }) => {

    const { mutate } = useApiMutation();

    const suspendUser = () => {
        mutate({
            url: `/api/admins/updateUserStatus?id=${id}`,
            method: "POST",
            data: null,
            headers: true,
            onSuccess: (response) => {
                closeModal()
                reload();
            },
        })
    }


    return (
        <>
            <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5 justify-center w-full">
                    <p className="font-semibold text-center text-lg">
                        Are you sure you want to {status} this organization?
                    </p>
                </div>
                <div className="flex justify-center mt-5 gap-4">
                    <Button
                        onClick={suspendUser}
                        className="bg-red-500 text-white capitalize outline-none px-4 py-2 rounded-full"
                    >
                        Yes, {status}
                    </Button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-black px-4 py-2 rounded-full"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default SuspendModal;