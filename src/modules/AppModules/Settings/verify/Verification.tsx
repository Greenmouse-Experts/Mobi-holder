import { useQuery } from "@tanstack/react-query";
import { newApi } from "../../../../api/hooks/useApiMutation";
import { Controller, useForm } from "react-hook-form";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import {
  Button,
  createTheme,
  FileButton,
  MantineProvider,
  TextInput,
} from "@mantine/core";
import { HTMLInputTypeAttribute, useState } from "react";
import { Upload } from "lucide-react";
const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function Verification() {
  const query = useQuery({
    queryKey: ["user_data", "id_card"],
    queryFn: async () => {
      let resp = await newApi("/api/users/upload/verified/IDCard");
      return resp.data;
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { register, handleSubmit, control } = useForm();
  if (query.isLoading) return <>Loading</>;
  if (query.isError && query.error.response.data.code != 404)
    return <div>{JSON.stringify(query.error.response.data)}</div>;

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <MantineProvider>
      <div className="p-4 bg-gray-100 py-4 mt-4">
        <h2 className="text-lg font-bold opacity-60">Upload Document</h2>
        <form
          action=""
          className="flex  flex-col gap-4 m-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            title="name"
            placeholder="name"
            label="Name"
            {...register("name")}
          />
          <TextInput
            title="Card Number"
            placeholder="Card Number"
            label="Card Number"
            {...register("cardNumber")}
          />
          <div className="flex gap-2">
            <Controller
              name="issueDate"
              control={control}
              render={({ field }) => {
                return (
                  <DatePickerInput
                    className="flex-1"
                    label="Issued Date"
                    placeholder="Pick date"
                    {...field}
                    // {...register("issueDate")}
                  />
                );
              }}
            />
            <Controller
              name="expiryDate"
              control={control}
              render={({ field }) => {
                return (
                  <DatePickerInput
                    className="flex-1"
                    label="Expiry Date"
                    placeholder="Pick date"
                    {...field}
                    // {...register("issueDate")}
                  />
                );
              }}
            />
          </div>
          <ImageInput />

          <Button type="submit">Upload</Button>
        </form>
      </div>
    </MantineProvider>
  );
}

const ImageInput = (props: Html) => {
  const [imageUrl, setUrl] = useState();
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="flex-1">
      <div className="h-60 w-full ">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded Image"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-200">
            <Upload size={48} />
          </div>
        )}
      </div>
      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {(props) => <Button {...props}>Upload image</Button>}
      </FileButton>
    </div>
  );
};
