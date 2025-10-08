import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useNavigate } from "react-router-dom";

export default function AddNewCard() {
  const user = useSelector((state) => state.userData.data);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [organisations, setOrganisations] = useState([]);
  const [backUpOrganisation, setBackUp] = useState([]);
  const [designation, setDesignation] = useState("");
  const [templates, setTemplates] = useState([]);

  const navigate = useNavigate();

  const { mutate } = useApiMutation();

  const getAllOrganisations = () => {
    mutate({
      url: `/api/memberships-subscriptions/individual/membership`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setBackUp(response.data.data);
        const orgs = response.data.data.map((org) => {
          return {
            label: org.organization.companyName,
            value: org.organization.id,
          };
        });
        setOrganisations(orgs);
      },
      onError: () => {},
    });
  };

  useEffect(() => {
    getAllOrganisations();
  }, []);

  const handleSelectedOrganisation = (value) => {
    const member = backUpOrganisation.find((m) => m.organizationId === value);
    if (member) {
      setDesignation(member.designation);
      setValue("designation", member.designation, { shouldValidate: true });
    } else {
      setDesignation("");
      setValue("designation", "", { shouldValidate: true });
    }
    mutate({
      url: `/api/idcards/get/default/template?organizationId=${value}`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        const templates = [
          {
            label: response.data.data.name,
            value: response.data.data.id,
          },
        ];
        setTemplates(templates);
      },
      onError: () => {},
    });
  };

  const createCard = (data) => {
    setIsLoading(true);
    mutate({
      url: "/api/idcards/create/card",
      method: "POST",
      headers: true,
      data: data,
      onSuccess: (response) => {
        navigate(-1);
        setIsLoading(false);
        setFiles([]);
        setBackFiles([]);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile data={user} title={"Generate New Card"} />
          <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                Generate New Card
              </p>
              <p className="text-base">
                Generate Card from your Organization Template
              </p>
            </div>
          </div>

          <div className="w-full flex flex-grow">
            <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
              <form onSubmit={handleSubmit(createCard)}>
                <div className="mb-1 flex flex-col gap-10 mt-5">
                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">Organisation</p>
                    <Input
                      type="select"
                      name="organization"
                      register={register}
                      rules={{ required: "Organization is required" }}
                      errors={errors}
                      onChange={(value) => handleSelectedOrganisation(value)}
                      options={organisations}
                      placeholder="Select Organisation"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">Role</p>
                    <Input
                      type="text"
                      name="designation"
                      register={register}
                      value={designation}
                      rules={{ required: "Role in Organisation is required" }}
                      errors={errors}
                      placeholder="Role in Organisation"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">Card Template</p>
                    <Input
                      type="select"
                      name="templateId"
                      register={register}
                      rules={{ required: "Card Template is required" }}
                      errors={errors}
                      options={templates}
                      placeholder="Select Template"
                    />
                  </div>

                  <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                    <div className="flex flex-col w-full gap-6">
                      <p className="-mb-3 text-mobiFormGray">Expiry Date</p>
                      <Input
                        type="date"
                        name="expiryDate"
                        register={register}
                        rules={{ required: "Expiry Date is required" }}
                        errors={errors}
                        placeholder="Enter expiry date"
                      />
                    </div>
                  </div>

                  <div className="flex w-full ">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full"
                    >
                      {isLoading ? "Updating..." : "Add ID Card"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
