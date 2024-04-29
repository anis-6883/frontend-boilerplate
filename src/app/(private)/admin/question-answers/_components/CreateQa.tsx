"use client";

import Input from "@/components/shared/Form/Input";
import Switch from "@/components/shared/Form/Switch";
import { routes } from "@/config/routes";
import { posterFormValidation } from "@/config/validation";
import { useCreateQaMutation, useGetSingleQaQuery, useUpdateQaMutation } from "@/features/questionAnswer/qaApi";
import { useGetQaCategoriesQuery } from "@/features/questionAnswer/qaCategoryApi";
import { IOption } from "@/types";
import hotToast from "@/utils/hotToast";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Select } from "rizzui";

export default function CreateQa({ edit, id }: { edit?: boolean; id?: string }) {
  const { data: qaCategories } = useGetQaCategoriesQuery({ paginate: false, status: "1" });
  const { data } = useGetSingleQaQuery(id, { skip: !edit });
  const [createPoster] = useCreateQaMutation();
  const [updatePoster] = useUpdateQaMutation();
  const router = useRouter();
  const [qaCategory, setQaCategory] = useState<IOption | null>(null);
  const [initialValues, setInitialValues] = useState({
    posterTitle: "",
    lyrics: "",
    status: "1"
  });

  const options = qaCategories?.data?.docs?.map((item: any) => ({
    label: item?.name,
    value: item?.id
  }));
  const handleSubmit = (values: any) => {
    if (!qaCategory) hotToast("error", "Please select a QA category");
    values.status = values.status === "1" ? "1" : "0";
    if (edit) {
      updatePoster({ id, data: { ...values, qaCategory: qaCategory?.value } })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.questionAnswer.home);
        })
        .catch((err: any) => console.log(err));
    } else {
      createPoster({ ...values, qaCategory: qaCategory?.value })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.questionAnswer.home);
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
      setQaCategory({ label: data?.data.category?.name, value: data?.data.category?.id });
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
            value={qaCategory}
            onChange={setQaCategory}
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
