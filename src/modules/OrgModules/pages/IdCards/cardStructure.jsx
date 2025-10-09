import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import { useState } from "react";
import DropZone from "../../../../components/DropZone";
import { Button } from "@material-tailwind/react";
import StaffCard from "../../../../components/StaffCardPortrait";
import { FaTimes } from "react-icons/fa";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useNavigate } from "react-router-dom";

export const RoundedCards = ({ bgColor, selectBg, isSelected }) => {
  return (
    <div
      className={`p-3 rounded-full border cursor-pointer border-2 transition-transform ${
        isSelected ? "border-black scale-110" : " border-gray-400"
      }`}
      onClick={() => selectBg(bgColor)}
      style={{ backgroundColor: bgColor }}
    ></div>
  );
};

export default function CardStructure() {
  const user = useSelector((state) => state.orgData.orgData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedLayout, setLayout] = useState(null);
  const [selectedBgColor, setBgColor] = useState("rgba(216, 201, 254, 1)");
  const [selectedTextColor, setTextColor] = useState("rgba(216, 201, 254, 1)");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { mutate } = useApiMutation();

  const colorsArray = [
    {
      color1: "#000000",
      color2: "#FFAB01",
    },
    {
      color1: "#B18CFE",
      color2: "#FF8C82",
    },
    {
      color1: "#EE719E",
      color2: "#FF4015",
    },
    {
      color1: "#FF4015",
      color2: "#FE6250",
    },
    {
      color1: "#D8C9FE",
      color2: "#FFFFFF",
    },
  ];

  const handleSelectedBg = (data) => {
    setBgColor(data);
  };

  const handleSelectedText = (data) => {
    setTextColor(data);
  };

  const handleDrop = (data) => {
    setFiles((prevFiles) => [...prevFiles, data]);
  };

  const removeImage = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const createTemplate = (data) => {
    setIsLoading(true);
    const payload = {
      ...data,
      fontSize: [12],
      backgroundColor: selectedBgColor,
      textColor: selectedTextColor,
      logo: user.photo ? user.photo : files[0],
      layout: selectedLayout,
    };
    mutate({
      url: "/api/idcards/template",
      method: "POST",
      data: payload,
      headers: true,
      onSuccess: (response) => {
        navigate(-1);
      },
      onError: (error) => {
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <div className="w-full flex h-full animate__animated animate__fadeIn">
        <div className="w-full flex flex-col gap-5 h-full">
          <Header
            mobile
            organisation
            data={user}
            title={"Create ID Card Category"}
          />
          <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
            <div className="w-full flex flex-col gap-2">
              <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">
                Create ID Card Category
              </p>
              <p className="text-base">
                Create an ID card structure for a category of your members
              </p>
            </div>
          </div>

          <div className="w-full flex flex-grow">
            <div className="shadow-xl py-2 px-5 md:px-8 md:w-3/4 lg:w-3/5 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
              <form onSubmit={handleSubmit(createTemplate)}>
                <div className="mb-1 flex flex-col gap-10 mt-5">
                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">Name of Category</p>
                    <Input
                      type="text"
                      name="name"
                      register={register}
                      rules={{ required: "Name of Category is required" }}
                      errors={errors}
                      placeholder="Enter the category name"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-3 text-mobiFormGray">
                      Choose ID Card Layout
                    </p>
                    <div className="flex md:flex-row flex-col gap-3">
                      <div
                        className="md:w-1/3 sm:w-1/2 w-full p-3 rounded-md cursor-pointer bGmobiGrayDark"
                        onClick={() => setLayout("horizontal")}
                        data-category={
                          selectedLayout === "horizontal" ? "selected" : null
                        }
                      >
                        <img src="/card-frame-landscape.png" />
                      </div>
                      <div
                        className="md:w-1/3 sm:w-1/2 w-full p-3 rounded-md cursor-pointer bGmobiGrayDark"
                        onClick={() => setLayout("vertical")}
                        data-category={
                          selectedLayout === "vertical" ? "selected" : null
                        }
                      >
                        <img src="/card-frame-portrait.png" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-6 text-mobiFormGray">Background Colour</p>
                  </div>
                  <div className="flex gap-6">
                    <div
                      className={`flex p-5 w-1/12 h-[60px] border rounded-lg`}
                      style={{ backgroundColor: selectedBgColor }}
                    ></div>
                    <div className="flex gap-5 px-4">
                      <div className="flex flex-col gap-4">
                        {/* Selected Color Preview */}
                        <div className="flex gap-5">
                          {colorsArray.map((color, index) => (
                            <div className="flex flex-col gap-2" key={index}>
                              <RoundedCards
                                bgColor={color.color1}
                                selectBg={handleSelectedBg}
                                isSelected={selectedBgColor === color.color1}
                              />
                              <RoundedCards
                                bgColor={color.color2}
                                selectBg={handleSelectedBg}
                                isSelected={selectedBgColor === color.color2}
                              />
                            </div>
                          ))}
                          {/* Custom Color Picker */}
                          <input
                            type="color"
                            value={selectedBgColor}
                            onChange={(e) => handleSelectedBg(e.target.value)}
                            className="w-8 h-8 border cursor-pointer"
                          />
                        </div>
                      </div>{" "}
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-6">
                    <p className="-mb-6 text-mobiFormGray">Text Colour</p>
                  </div>
                  <div className="flex gap-6">
                    <div
                      className={`flex p-5 w-1/12 h-[60px] border rounded-lg`}
                      style={{ backgroundColor: selectedTextColor }}
                    ></div>
                    <div className="flex gap-5 px-4">
                      <div className="flex flex-col gap-4">
                        {/* Selected Color Preview */}
                        <div className="flex gap-5">
                          {colorsArray.map((color, index) => (
                            <div className="flex flex-col gap-2" key={index}>
                              <RoundedCards
                                bgColor={color.color1}
                                selectBg={handleSelectedText}
                                isSelected={selectedTextColor === color.color1}
                              />
                              <RoundedCards
                                bgColor={color.color2}
                                selectBg={handleSelectedText}
                                isSelected={selectedTextColor === color.color2}
                              />
                            </div>
                          ))}
                          {/* Custom Color Picker */}
                          <input
                            type="color"
                            value={selectedTextColor}
                            onChange={(e) => handleSelectedText(e.target.value)}
                            className="w-8 h-8 border cursor-pointer"
                          />
                        </div>
                      </div>{" "}
                    </div>
                  </div>

                  {!user.photo && (
                    <div className="w-full flex flex-col gap-2">
                      <div className="flex flex-col md:w-1/2 w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">Company Logo</p>
                        <DropZone
                          text="Upload Company Logo"
                          multiple={false}
                          maxSize={false}
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
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-white shadow-lg text-black rounded-full p-1"
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-mobiPink md:w-1/2 w-full p-3 rounded-full"
                    >
                      Create ID Card Category
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
