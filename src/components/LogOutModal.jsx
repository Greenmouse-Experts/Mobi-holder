import useApiMutation from '../api/hooks/useApiMutation';
import { useDispatch } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../reducers/userSlice';
import { setOrg } from '../reducers/organisationSlice';

const LogOutModal = ({ closeModal, admin = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutate } = useApiMutation();

    const logOutUser = () => {
        mutate({
            url: "/api/users/logout",
            method: "GET",
            headers: true,
            onSuccess: (response) => {
                dispatch(setUser(null));
                dispatch(setOrg(null));
                localStorage.clear();
                admin ? navigate('/admin') : navigate('/login');
            },
        });
    }


    return (
        <>
            <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5 justify-center w-full">
                    <p className="font-semibold text-center text-lg">
                        Are you sure you want to log out?
                    </p>
                </div>
                <div className="flex justify-center mt-5 gap-4">
                    <Button
                        onClick={logOutUser}
                        className="bg-red-500 text-white outline-none px-4 py-2 rounded-full"
                    >
                        Yes, Log Out
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

export default LogOutModal;