import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "../../../../components/Input";
import DropZone from "../../../../components/DropZone";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { dateInput } from "../../../../helpers/dateHelper";

export default function ViewPersonalCard() {
  const user = useSelector((state) => state.userData.data);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [backFiles, setBackFiles] = useState([]);
  const [idCard, setIDCard] = useState({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState("pdf");

  const { id } = useParams();

  const navigate = useNavigate();

  const { mutate } = useApiMutation();

  useEffect(() => {
    getPersonalCard(id);
  }, []);

  const getPersonalCard = (id) => {
    mutate({
      url: `/api/idcards/personal/card?id=${id}`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        const card = response.data.data;
        setIDCard(card);
        const images = card.scanIDCard;
        setFiles([images.frontIdCard]);
        console.log(card.issueDate);
        setValue("issuedDate", card.issueDate);
        setValue("expiryDate", card.expiryDate);
        setBackFiles([images.backIdCard]);
        setIsLoading(false);
      },
      onError: () => {},
    });
  };

  const handleDrop = (data) => {
    setFiles([data]);
  };

  const handleDropBack = (data) => {
    setBackFiles([data]);
  };

  const createCard = (data) => {
    setLoading(true);
    const payload = {
      ...data,
      id: id,
      scanIDCard: { frontIdCard: files[0], backIdCard: backFiles[0] },
    };
    mutate({
      url: "/api/idcards/personal/cards",
      method: "PUT",
      headers: true,
      data: payload,
      onSuccess: (response) => {
        navigate(-1);
        setLoading(false);
        setFiles([]);
        setBackFiles([]);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const handleExport = () => {
    const exportData = {
      ...idCard,
      exportFormat,
      scanIDCard: {
        frontIdCard: files[0],
        backIdCard: backFiles[0],
      },
    };

    mutate({
      url: "/api/idcards/personal/export",
      method: "POST",
      headers: true,
      data: exportData,
      onSuccess: (response) => {
        // Handle successful export - could download file or show success message
        const blob = new Blob([response.data], {
          type: exportFormat === "pdf" ? "application/pdf" : "application/json",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `id-card-${idCard.cardNumber || "export"}.${exportFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        setShowExportModal(false);
      },
      onError: () => {
        // Handle export error
      },
    });
  };

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header mobile data={user} title={"Update Card"} />
          <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                Update Card
              </p>
              <p className="text-base">Update your existing card</p>
            </div>
            <div className="w-full flex justify-end">
              <Button
                onClick={() => setShowExportModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                disabled={isLoading}
              >
                Export Card
              </Button>
            </div>
          </div>

          <div className="w-full flex flex-grow">
            <div className="shadow-xl py-5 px-5 md:w-3/4 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
              {isLoading ? (
                <Loader />
              ) : (
                <form onSubmit={handleSubmit(createCard)}>
                  <div className="mb-1 flex flex-col gap-10 mt-5">
                    <div className="flex flex-col w-full gap-6">
                      <p className="-mb-3 text-mobiFormGray">
                        Issuing Organisation
                      </p>
                      <Input
                        type="text"
                        value={idCard.issuingOrganization}
                        name="issuingOrganization"
                        register={register}
                        rules={{ required: "Organization is required" }}
                        errors={errors}
                        placeholder="Enter Organisation Name"
                      />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                      <p className="-mb-3 text-mobiFormGray">Role</p>
                      <Input
                        type="text"
                        value={idCard.designation}
                        name="designation"
                        register={register}
                        rules={{ required: "Role in Organisation is required" }}
                        errors={errors}
                        placeholder="Role in Organisation"
                      />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                      <p className="-mb-3 text-mobiFormGray">Card Number</p>
                      <Input
                        type="text"
                        value={idCard.cardNumber}
                        name="cardNumber"
                        register={register}
                        rules={{ required: "Card Number is required" }}
                        errors={errors}
                        placeholder="Enter Card Number"
                      />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                      <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">Issued Date</p>
                        <Controller
                          control={control}
                          name="issuedDate"
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="date"
                              value={dateInput(idCard.issuedDate)}
                              register={register}
                              rules={{ required: "issued Date is required" }}
                              errors={errors}
                              placeholder="Enter expiry date"
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                      <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">Expiry Date</p>
                        <Controller
                          control={control}
                          name="expiryDate"
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="date"
                              value={
                                idCard.expiryDate
                                  ? dateInput(idCard.expiryDate)
                                  : ""
                              }
                              name="expiryDate"
                              register={register}
                              rules={{ required: "Expiry Date is required" }}
                              errors={errors}
                              placeholder="Enter expiry date"
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                      <div className="w-full md:w-1/2 flex flex-col gap-2">
                        <div className="flex flex-col w-full gap-6">
                          <p className="-mb-3 text-mobiFormGray">
                            Scan ID Card Front
                          </p>
                          <DropZone
                            text="Upload the front of the ID Card"
                            onUpload={handleDrop}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          {files.map((fileObj, index) => (
                            <div key={index} className="relative">
                              <img
                                src={fileObj}
                                alt="preview"
                                className="w-full h-24 object-cover rounded"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="md:w-1/2 w-full flex flex-col gap-2">
                        <div className="flex flex-col w-full gap-6">
                          <p className="-mb-3 text-mobiFormGray">
                            Scan ID Card Back
                          </p>
                          <DropZone
                            text="Upload the back of the ID Card"
                            onUpload={handleDropBack}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          {backFiles.map((fileObj, index) => (
                            <div key={index} className="relative">
                              <img
                                src={fileObj}
                                alt="preview"
                                className="w-full h-24 object-cover rounded"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full"
                      >
                        {loading ? "Updating..." : "Update ID Card"}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      <Dialog
        open={showExportModal}
        handler={() => setShowExportModal(false)}
        size="md"
      >
        <DialogHeader>Export ID Card</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <p className="text-gray-700">
              Export your ID card details and images together in your preferred
              format.
            </p>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-mobiFormGray">
                Select Export Format:
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="pdf"
                    checked={exportFormat === "pdf"}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="text-mobiPink"
                  />
                  PDF Document
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="json"
                    checked={exportFormat === "json"}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="text-mobiPink"
                  />
                  JSON Data
                </label>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Export will include:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Card details (Organization, Role, Card Number, etc.)</li>
                <li>Issue and expiry dates</li>
                <li>Front and back card images</li>
                <li>User information</li>
              </ul>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <Button
            variant="text"
            onClick={() => setShowExportModal(false)}
            className="text-gray-600"
          >
            Cancel
          </Button>
          <Button onClick={handleExport} className="bg-mobiPink text-white">
            Export Card
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
