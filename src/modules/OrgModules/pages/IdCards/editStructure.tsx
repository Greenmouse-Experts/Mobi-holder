import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { newApi } from "../../../../api/hooks/useApiMutation";
import { Controller, useForm } from "react-hook-form";
import { OrgDashContainer } from "../../OrgDashboard/layouts/OrgDashContainer";
import SimpleInput from "../../../../components/SimpleInput";
import { RoundedCards } from "./cardStructure";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
interface TemplateData {
  id: string;
  organizationId: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  fontSize: number[];
  logo: string;
  layout: "horizontal" | "vertical";
  is_default: boolean;
  createdAt: string;
  updatedAt: string;
}
interface API_RESPONSE {
  code: number;
  message: string;
  data: TemplateData;
}
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
export default function EditStructure() {
  const { id } = useParams();
  const { register, reset, control, handleSubmit } = useForm<TemplateData>();

  const query = useQuery<API_RESPONSE>({
    queryKey: ["edit-template", id],
    queryFn: async () => {
      let resp = await newApi.get(`/api/idcards/template?templateId=${id}`);
      const card_data = resp.data?.data;
      console.log(card_data);
      reset(card_data);
      return resp.data;
    },
  });
  const nav = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: TemplateData) => {
      let resp = await newApi.put(
        `/api/idcards/template?templateId=${id}`,
        data,
      );
      return resp.data;
    },
    onSuccess: () => {
      query.refetch();
      nav("/org/id-cards");
    },
    onError: (err: AxiosError<API_RESPONSE>) => {
      const message = err.response?.data.message;
      toast.error(message);
    },
  });
  const card_data = query.data?.data;
  const onSubmit = (data: TemplateData) => {
    const payload = {
      templateId: id,
      name: data.name,
      backgroundColor: data.backgroundColor,
      textColor: data.textColor,
      fontSize: data.fontSize,
      logo: data.logo,
      layout: data.layout,
    };
    console.log(payload);
    toast.promise(async () => mutateAsync(payload as any), {
      pending: "Updating",
      success: "Updated Template Successfully",
      error: "Error",
    });
  };
  return (
    <OrgDashContainer title="Edit Structure">
      <form
        className="flex flex-col gap-6 p-6 m-4 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SimpleInput {...register("name")} label="Template Name" />

        {/* Layout Selection */}
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold text-gray-700">
            Choose ID Card Layout
          </p>
          <Controller
            name="layout"
            control={control}
            render={({ field }) => {
              return (
                <div className="flex flex-wrap gap-4">
                  <div
                    className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      field.value === "horizontal"
                        ? "border-mobiPink shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => field.onChange("horizontal")}
                  >
                    <img
                      src="/card-frame-landscape.png"
                      alt="Horizontal Layout"
                      className="w-40 h-24 object-contain mb-2"
                    />
                    <span className="text-sm font-medium">Horizontal</span>
                  </div>
                  <div
                    className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      field.value === "vertical"
                        ? "border-mobiPink shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => field.onChange("vertical")}
                  >
                    <img
                      src="/card-frame-portrait.png"
                      alt="Vertical Layout"
                      className="w-24 h-40 object-contain mb-2"
                    />
                    <span className="text-sm font-medium">Vertical</span>
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Color Pickers */}
        <div className="flex flex-col gap-6">
          {/* Background Color */}
          <Controller
            control={control}
            name="backgroundColor"
            render={({ field }) => {
              return (
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h2 className="mb-3 text-base font-medium text-gray-700">
                    Background Color
                  </h2>
                  <div className="flex items-center gap-6">
                    <div
                      className={`flex p-3 w-12 h-12 border rounded-md shadow-inner`}
                      style={{ backgroundColor: field.value || "#ffffff" }}
                    ></div>
                    <div className="flex flex-wrap gap-3">
                      {colorsArray.map((color, index) => (
                        <div className="flex flex-col gap-2" key={index}>
                          <RoundedCards
                            bgColor={color.color1}
                            selectBg={field.onChange}
                            isSelected={field.value === color.color1}
                          />
                          <RoundedCards
                            bgColor={color.color2}
                            selectBg={field.onChange}
                            isSelected={field.value === color.color2}
                          />
                        </div>
                      ))}
                      {/* Custom Color Picker */}
                      <div className="flex items-center justify-center p-1 border rounded-md bg-white">
                        <input
                          type="color"
                          value={field.value || "#000000"}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="w-6 h-6 border-none cursor-pointer bg-transparent p-0 m-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          />

          {/* Text Color */}
          <Controller
            control={control}
            name="textColor"
            render={({ field }) => {
              return (
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h2 className="mb-3 text-base font-medium text-gray-700">
                    Text Color
                  </h2>
                  <div className="flex items-center gap-6">
                    <div
                      className={`flex p-3 w-12 h-12 border rounded-md shadow-inner`}
                      style={{ backgroundColor: field.value || "#000000" }}
                    ></div>
                    <div className="flex flex-wrap gap-3">
                      {colorsArray.map((color, index) => (
                        <div className="flex flex-col gap-2" key={index}>
                          <RoundedCards
                            bgColor={color.color1}
                            selectBg={field.onChange}
                            isSelected={field.value === color.color1}
                          />
                          <RoundedCards
                            bgColor={color.color2}
                            selectBg={field.onChange}
                            isSelected={field.value === color.color2}
                          />
                        </div>
                      ))}
                      {/* Custom Color Picker */}
                      <div className="flex items-center justify-center p-1 border rounded-md bg-white">
                        <input
                          type="color"
                          value={field.value || "#000000"}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="w-6 h-6 border-none cursor-pointer bg-transparent p-0 m-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Submit Button */}
        {/*@ts-ignore*/}
        <Button
          disabled={isPending}
          type="submit"
          className="mt-4 bg-mobiPink hover:bg-mobiPink/90"
        >
          {isPending ? "Updating..." : "Update Template"}
        </Button>
      </form>
    </OrgDashContainer>
  );
}
