import { useDispatch } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import useApiMutation from '../../../../api/hooks/useApiMutation';

const UpdateMembershipStatusModal = ({ closeModal, userInfo, reload }) => {

    const { mutate } = useApiMutation();

    const updateMember = (status) => {
        const payload = {
            memberId: userInfo.memberId,
            membershipId: userInfo.id,
            status: status
        }
        mutate({
            url: "/api/memberships-subscriptions/organization/update/membership/status",
            method: "PUT",
            data: payload,
            headers: true,
            onSuccess: (response) => {
                reload();
                closeModal();
            },
            onError: () => {
                closeModal();
            }
        });
    }


    return (
        <>
            <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5 justify-center w-full">
                    <p className="font-semibold text-center text-lg">
                        Do you wish to {userInfo.status === 'active' ? 'De-activate' : 'Activate'} this member?
                    </p>
                </div>
                <div className="flex justify-center mt-10 gap-4">
                    <Button
                        onClick={() => updateMember(userInfo.status === 'active' ? 'inactive' : 'active')}
                        className="bg-mobiPink text-white outline-none px-4 py-2 rounded-full"
                    >
                        {userInfo.status === 'active' ? 'De-activate' : 'Activate'} member
                    </Button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-black px-8 py-2 font-[600] rounded-full"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default UpdateMembershipStatusModal;