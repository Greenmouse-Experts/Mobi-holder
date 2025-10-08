import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useState } from "react";

const UpdateMembershipStatusModal = ({ closeModal, userInfo, reload }) => {
  const { mutate } = useApiMutation();
  const [deactivationReason, setDeactivationReason] = useState("");

  const updateMember = (status) => {
    const payload = {
      memberId: userInfo.memberId,
      membershipId: userInfo.id,
      status: status,
    };

    if (status === "inactive" && !deactivationReason) {
      // Optionally handle missing reason, e.g., show a toast or error message
      console.error("Deactivation reason is required.");
      return;
    }

    if (status === "inactive") {
      payload.reason = deactivationReason;
    }

    mutate({
      url: "/api/memberships-subscriptions/organization/update/membership/status",
      method: "PUT",
      data: payload,
      headers: true,
      onSuccess: () => {
        reload();
        closeModal();
      },
      onError: () => {
        closeModal();
      },
    });
  };

  const isDeactivating = userInfo.status === "active";
  const actionText = isDeactivating ? "De-activate" : "Activate";
  const newStatus = isDeactivating ? "inactive" : "active";

  return (
    <>
      <div className="w-full flex flex-col p-6 space-y-6 bg-white rounded-lg">
        <div className="flex justify-center w-full">
          <p className="font-bold text-center text-xl text-gray-800">
            Confirm Action
          </p>
        </div>

        <div className="text-center text-gray-600">
          <p className="text-lg mb-2">
            Do you wish to{" "}
            <span className="font-semibold text-mobiPink">{actionText}</span>{" "}
            this member?
          </p>
        </div>

        {isDeactivating && (
          <div className="w-full px-2">
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Reason for Deactivation:
            </label>
            <input
              id="reason"
              type="text"
              name="reason"
              value={deactivationReason}
              onChange={(e) => setDeactivationReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-inner p-3 focus:ring-mobiPink focus:border-mobiPink transition duration-150 ease-in-out bg-transparent"
              placeholder="Enter reason..."
            />
          </div>
        )}

        <div className="flex justify-center pt-4 gap-4">
          <Button
            onClick={() => updateMember(newStatus)}
            className="bg-mobiPink text-white outline-none px-6 py-3 rounded-full shadow-md hover:bg-pink-700 transition duration-200 ease-in-out disabled:opacity-50"
            disabled={isDeactivating && !deactivationReason}
          >
            {actionText} Member
          </Button>
          <button
            onClick={closeModal}
            className="bg-gray-200 text-gray-700 px-8 py-3 font-semibold rounded-full shadow-md hover:bg-gray-300 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateMembershipStatusModal;
