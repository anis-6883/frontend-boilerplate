"use client";

import Input from "@/components/shared/Form/Input";
import Switch from "@/components/shared/Form/Switch";
import { routes } from "@/config/routes";
import { posterFormValidation } from "@/config/validation";
import { useCreatePosterMutation, useGetSinglePosterQuery, useUpdatePosterMutation } from "@/features/poster/posterApi";
import { useGetPosterCategoriesQuery } from "@/features/poster/posterCategoryApi";
import { IOption } from "@/types";
import hotToast from "@/utils/hotToast";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Select } from "rizzui";

export default function CreatePoster({ edit, id }: { edit?: boolean; id?: string }) {
  const { data: posterCategories } = useGetPosterCategoriesQuery({ paginate: false, status: "1" });
  const { data } = useGetSinglePosterQuery(id, { skip: !edit });
  const [createPoster] = useCreatePosterMutation();
  const [updatePoster] = useUpdatePosterMutation();
  const router = useRouter();
  const [posterCategory, setPosterCategory] = useState<IOption | null>(null);
  const [initialValues, setInitialValues] = useState({
    posterTitle: "",
    lyrics: "",
    status: "1"
  });

  const options = posterCategories?.data?.docs?.map((item: any) => ({
    label: item?.name,
    value: item?.id
  }));
  const handleSubmit = (values: any) => {
    if (!posterCategory) hotToast("error", "Please select a poster book");
    values.status = values.status === "1" ? "1" : "0";
    if (edit) {
      updatePoster({ id, data: { ...values, posterCategory: posterCategory?.value } })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.poster.home);
        })
        .catch((err: any) => console.log(err));
    } else {
      createPoster({ ...values, posterCategory: posterCategory?.value })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.poster.home);
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    if (edit) {
      setInitialValues({
        posterTitle: data?.data?.posterTitle,
        lyrics: data?.data?.lyrics,
        status: data?.data?.status
      });
      setPosterCategory({ label: data?.data.category?.name, value: data?.data.category?.id });
    }
  }, [edit, data]);

  return (
    <Formik initialValues={initialValues} validationSchema={posterFormValidation} onSubmit={handleSubmit} enableReinitialize>
      {({ values, setFieldValue }) => (
        <Form>
          <Input name='posterTitle' label={"Title"} placeholder='Poster Title' />
          <Select
            label={
              <span className='font-semibold mb-1'>
                <span>Select Poster Category</span>
                <span className='text-red-600 font-bold'> *</span>
              </span>
            }
            optionClassName={"hover:bg-slate-100"}
            options={options}
            value={posterCategory}
            onChange={setPosterCategory}
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
