"use client";

import QuillLoader from "@/components/reactQuill/QuillLoader";
import Input from "@/components/shared/Form/Input";
import Switch from "@/components/shared/Form/Switch";
import { routes } from "@/config/routes";
import { songFormValidation } from "@/config/validation";
import { useCreateSongMutation, useGetSingleSongQuery, useUpdateSongMutation } from "@/features/song/songApi";
import { useGetSongBooksQuery } from "@/features/song/songBookApi";
import { IOption } from "@/types";
import hotToast from "@/utils/hotToast";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Select } from "rizzui";
import FormBlockWrapper from "../../../../../components/shared/Form/FormBlockWrapper";

const QuillEditor = dynamic(() => import("@/components/reactQuill/QuillEditor"), {
  ssr: false,
  loading: () => <QuillLoader className='col-span-full h-[143px]' />
});

export default function CreateSong({ edit, id }: { edit?: boolean; id?: string }) {
  const { data: songBooks } = useGetSongBooksQuery({ paginate: false, status: "1" });
  const { data } = useGetSingleSongQuery(id, { skip: !edit });
  const [createSong] = useCreateSongMutation();
  const [updateSong] = useUpdateSongMutation();
  const router = useRouter();
  const [songBook, setSongBook] = useState<IOption | null>(null);
  const [initialValues, setInitialValues] = useState({
    songTitle: "",
    lyrics: "",
    status: "1"
  });
  const options = songBooks?.data?.docs?.map((item: any) => ({
    label: item?.name,
    value: item?.id
  }));
  const handleSubmit = (values: any) => {
    if (!songBook) hotToast("error", "Please select a song book");
    values.status = values.status === "1" ? "1" : "0";
    if (edit) {
      updateSong({ id, data: { ...values, songBook: songBook?.value } })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.song.home);
        })
        .catch((err: any) => console.log(err));
    } else {
      createSong({ ...values, songBook: songBook?.value })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.song.home);
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    if (edit) {
      setInitialValues({
        songTitle: data?.data?.songTitle,
        lyrics: data?.data?.lyrics,
        status: data?.data?.status
      });
      setSongBook({ label: data?.data.songBook?.name, value: data?.data.songBook?.id });
    }
  }, [edit, data]);

  return (
    <Formik initialValues={initialValues} validationSchema={songFormValidation} onSubmit={handleSubmit} enableReinitialize>
      {({ values, setFieldValue }) => (
        <Form>
          <Input name='songTitle' label={"Title"} placeholder='Song Title' />
          <FormBlockWrapper title='Lyrics' className='mt-2'>
            <div className='my-2'>
              <QuillEditor
                value={values.lyrics}
                onChange={(input: string) => {
                  const removeHtmlTags = input.replace(/<[^>]*>/g, "");
                  removeHtmlTags ? setFieldValue("lyrics", input) : setFieldValue("lyrics", "");
                }}
                label=''
                className='col-span-full [&_.ql-editor]:min-h-[100px]'
                labelClassName='font-medium text-gray-700 dark:text-gray-600 mb-1.5'
              />
            </div>
          </FormBlockWrapper>
          <Select
            label={
              <span className='font-semibold mb-1'>
                <span>Select Song Book</span>
                <span className='text-red-600 font-bold'> *</span>
              </span>
            }
            optionClassName={"hover:bg-slate-100"}
            options={options}
            value={songBook}
            onChange={setSongBook}
          />
          <Switch name='status' label='Active' checked={values.status === "1"} />
          <Button type='submit' className='mt-2'>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
