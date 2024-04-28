"use client";

import { routes } from "@/config/routes";
import { qaCategoryFormValidation } from "@/config/validation";
import {
  useCreateQaCategoryMutation,
  useGetSingleQaCategoryQuery,
  useUpdateQaCategoryMutation
} from "@/features/questionAnswer/qaCategoryApi";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Input, Switch } from "rizzui";

export default function CreateQaCategory({ edit, id }: { edit?: boolean; id?: string }) {
  const [createQaCategory] = useCreateQaCategoryMutation();
  const [updateQaCategory] = useUpdateQaCategoryMutation();
  const { data } = useGetSingleQaCategoryQuery(id, { skip: !edit });
  const router = useRouter();

  const handleSubmit = (values: any) => {
    values.status = values.status === "1" ? "1" : "0";
    if (edit) {
      updateQaCategory({ id, data: values })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.questionAnswerCategory.home);
        })
        .catch((err: any) => console.log(err));
    } else {
      createQaCategory(values)
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.questionAnswerCategory.home);
        })
        .catch((err: any) => console.log(err));
    }
  };

  let initialValues = {
    name: "",
    status: "1"
  };

  if (edit) {
    initialValues = {
      ...data?.data
    };
  }

  return (
    <Formik initialValues={initialValues} validationSchema={qaCategoryFormValidation} onSubmit={handleSubmit} enableReinitialize>
      {({ values, setFieldValue }) => (
        <Form>
          <Field name='name'>
            {({ field, meta }: { field: any; meta: any }) => (
              <Input
                type='text'
                label={
                  <span className='font-semibold mb-1'>
                    Name
                    <span className='text-red-600'>* {meta.touched && meta.error && <span>({meta.error})</span>}</span>
                  </span>
                }
                className='max-w-screen-xs'
                placeholder='Name'
                {...field}
              />
            )}
          </Field>
          <Field name='status'>
            {({ field, meta }: { field: any; meta: any }) => (
              <Switch
                checked={values.status === "1"}
                label={"Active"}
                switchClassName='bg-slate-50 border border-[#c4d9fc]'
                switchKnobClassName='bg-primary'
                labelPlacement='left'
                {...field}
              />
            )}
          </Field>
          <Button type='submit' className='mt-2'>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
