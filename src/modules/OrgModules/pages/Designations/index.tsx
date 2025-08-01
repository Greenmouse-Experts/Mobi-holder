import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { newApi } from "../../../../api/hooks/useApiMutation";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";
import ReusableModal from "../../../../components/ReusableModal";
import useModal from "../../../../hooks/modal";
import { useState } from "react";
import Input from "../../../../components/Input";
import { PlusIcon } from "lucide-react";

export interface API_RESPONSE {
  message: string;
  data: DESIGN[];
  code: number;
}
interface DESIGN {
  id: number;
  organizationId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const ErrorComponent = ({ message }: { message: string }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
    role="alert"
  >
    <strong className="font-bold">Error!</strong>
    <span className="block sm:inline ml-2">{message}</span>
  </div>
);

const LoadingComponent = () => (
  <div
    className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded relative mb-4"
    role="status"
  >
    <span className="font-bold">Loading...</span>
    <p className="mt-1">Please wait while we fetch the designations.</p>
  </div>
);

export default function Designations() {
  const queryClient = useQueryClient();
  const designations_query = useQuery<API_RESPONSE>({
    queryKey: ["designations"],
    queryFn: async () => {
      const resp = await newApi.get(
        "/api/memberships-subscriptions/designations",
      );
      return resp.data;
    },
  });
  const { isOpen, openModal, closeModal, modalOptions } = useModal();

  const user = useSelector(
    (state: { orgData: { orgData: any } }) => state.orgData.orgData,
  );

  const { data, isError, error, isFetching } = designations_query;

  const handleEdit = (designation: DESIGN) => {
    openModal({
      size: "sm",
      content: (
        <EditDesignationComponent
          designation={designation}
          closeModal={closeModal}
        />
      ),
      title: "Edit Designation",
    });
  };

  const handleDelete = (designationId: number) => {
    openModal({
      size: "sm",
      content: (
        <DeleteDesignatonCompenent
          designationId={designationId}
          closeModal={closeModal}
        />
      ),
      title: "Delete Designation",
    });
  };

  return (
    <div className="container mx-auto p-4 font-sans relative">
      <Header mobile organisation data={user} title={"Designation"} />
      {isError && (
        <ErrorComponent
          message={
            error instanceof Error ? error.message : "An unknown error occurred"
          }
        />
      )}
      <button
        onClick={() => {
          openModal({
            content: <CreateDesignationComponent closeModal={closeModal} />,
          });
        }}
        className="bg-mobiPink shadow-xl size-fit p-2 fixed m-12 rounded-full z-10 bottom-0 right-0"
      >
        <PlusIcon className="text-white" />
      </button>

      {isFetching && !isError && <LoadingComponent />}

      {data && !isFetching && (
        <div className="mt-6">
          {data.data.length > 0 ? (
            <ul className="space-y-4">
              {data.data.map((designation) => (
                <li
                  key={designation.id}
                  className="bg-mobiDarkCloud shadow-md rounded-lg p-5 border border-mobiFormGray hover:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <h3 className="text-lg font-semibold opacity-80 mb-2">
                    {designation.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {designation.description || "No description available"}
                  </p>
                  <div className="text-xs text-gray-500 mb-2">
                    <span className="font-medium">ID:</span> {designation.id} |{" "}
                    <span className="font-medium">Organization:</span>{" "}
                    {designation.organizationId}
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(designation.createdAt).toLocaleDateString()} |{" "}
                    <span className="font-medium">Updated:</span>{" "}
                    {new Date(designation.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="mt-4 flex space-x-2 justify-end">
                    <button
                      onClick={() => handleEdit(designation)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(designation.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No designations found.</p>
          )}
        </div>
      )}
      <ReusableModal
        closeModal={closeModal}
        isOpen={isOpen}
        size={modalOptions.size}
        content={modalOptions.content}
        title={modalOptions.title || ""}
      />
    </div>
  );
}

const DeleteDesignatonCompenent = ({
  designationId,
  closeModal,
}: {
  designationId: number;
  closeModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await newApi.delete(
        `/api/memberships-subscriptions/designation/delete?id=${designationId}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["designations"],
      });
      closeModal();
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
      <p className="text-gray-700 mb-4">
        Are you sure you want to delete this designation? This action cannot be
        undone.
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={closeModal}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isLoading}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          {deleteMutation.isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

const CreateDesignationComponent = ({
  closeModal,
}: {
  closeModal: () => any;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const createDesignationMutation = useMutation({
    mutationFn: async () => {
      await newApi.post("/api/memberships-subscriptions/designation/create", {
        name,
        description,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["designations"],
      });
      closeModal();
    },
    onError: (error: any) => {
      console.error("Error creating designation:", error);
      // Handle error, e.g., show an error message to the user
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDesignationMutation.mutate();
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Create Designation</h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <Input
          name={"name"}
          placeholder="Designation Name"
          onChange={setName}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <Input
          type="textarea"
          name={"description"}
          placeholder="Designation Description"
          onChange={setDescription}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={closeModal}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={createDesignationMutation.isPending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {createDesignationMutation.isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

const EditDesignationComponent = ({
  designation,
  closeModal,
}: {
  designation: DESIGN;
  closeModal: any;
}) => {
  const [name, setName] = useState(designation.name);
  const [description, setDescription] = useState(designation.description);
  const queryClient = useQueryClient();

  const change = useMutation({
    mutationFn: async () => {
      await newApi.put(`/api/memberships-subscriptions/designation/update`, {
        name: name,
        designation_id: String(designation.id),
        description: description,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["designations"],
      });
      console.log(name);
      closeModal();
    },
  });
  const handleSubmit = () => {
    console.log(designation);
    change.mutate();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Edit Designation</h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <Input
          name={"title"}
          value={name}
          placeholder={"title"}
          onChange={setName}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm mb-2 font-medium text-gray-700"
        >
          Description
        </label>
        <Input
          type="textarea"
          id="description"
          name={"description"}
          placeholder={"description"}
          className=" w-full border  rounded-md"
          value={description}
          onChange={setDescription}
        />
      </div>
      <button
        disabled={change.isPending}
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {!change.isPending ? "Update" : "updating"}
      </button>
    </div>
  );
};
