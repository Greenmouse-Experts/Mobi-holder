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
        className="flex flex-col gap-4 p-4 m-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SimpleInput {...register("name")} label="Template Name" />
        <div className="flex flex-col w-full gap-6">
          <p className="-mb-3 text-mobiFormGray">Choose ID Card Layout</p>
          <Controller
            name="layout"
            control={control}
            render={({ field }) => {
              return (
                <div className="flex md:flex-row flex-col gap-3">
                  <div
                    className="h-[200px] p-3 rounded-md cursor-pointer bGmobiGrayDark"
                    onClick={() => field.onChange("horizontal")}
                    data-category={
                      field.value === "horizontal" ? "selected" : null
                    }
                  >
                    <img
                      src="/card-frame-landscape.png"
                      className="size-full"
                    />
                  </div>
                  <div
                    className="h-[200px] w-fit p-3 rounded-md cursor-pointer bGmobiGrayDark"
                    onClick={() => field.onChange("vertical")}
                    data-category={
                      field.value === "vertical" ? "selected" : null
                    }
                  >
                    <img src="/card-frame-portrait.png" className="h-full" />
                  </div>
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="backgroundColor"
            render={({ field }) => {
              return (
                <div>
                  <h2>Background Color</h2>
                  <div className="flex gap-6">
                    <div
                      className={`flex p-5 w-1/12 h-[60px] border rounded-lg`}
                      style={{ backgroundColor: field.value }}
                    ></div>
                    <div className="flex gap-5 px-4">
                      <div className="flex flex-col gap-4">
                        {/* Selected Color Preview */}
                        <div className="flex gap-5">
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
                          <input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-8 h-8 border cursor-pointer"
                          />
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Controller
            control={control}
            name="textColor"
            render={({ field }) => {
              return (
                <div>
                  <h2>Text Color</h2>
                  <div className="flex gap-6">
                    <div
                      className={`flex p-5 w-1/12 h-[60px] border rounded-lg`}
                      style={{ backgroundColor: field.value }}
                    ></div>
                    <div className="flex gap-5 px-4">
                      <div className="flex flex-col gap-4">
                        {/* Selected Color Preview */}
                        <div className="flex gap-5">
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
                          <input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-8 h-8 border cursor-pointer"
                          />
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
        {/*@ts-ignore*/}
        <Button disabled={isPending} type="submit" className="mt-4 bg-mobiPink">
          {isPending ? "Updating..." : "Update Template"}
        </Button>
      </form>
    </OrgDashContainer>
  );
}
