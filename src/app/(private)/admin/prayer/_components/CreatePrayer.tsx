"use client";

import QuillLoader from "@/components/reactQuill/QuillLoader";
import { routes } from "@/config/routes";
import { prayerFormValidation } from "@/config/validation";
import { useCreatePrayerMutation, useGetSinglePrayerQuery, useUpdatePrayerMutation } from "@/features/prayer/prayerApi";
import { Field, Form, Formik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button, Input } from "rizzui";
import FormBlockWrapper from "../../../../../components/shared/Form/FormBlockWrapper";

const QuillEditor = dynamic(() => import("@/components/reactQuill/QuillEditor"), {
  ssr: false,
  loading: () => <QuillLoader className='col-span-full h-[143px]' />
});

export default function CreatePrayer({ edit, id }: { edit?: boolean; id?: string }) {
  const [createPrayer] = useCreatePrayerMutation();
  const [updatePrayer] = useUpdatePrayerMutation();
  const { data } = useGetSinglePrayerQuery(id, { skip: !edit });
  const router = useRouter();

  const handleSubmit = (values: any) => {
    if (edit) {
      updatePrayer({ id, data: values })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.prayer.home);
        })
        .catch((err: any) => console.log(err));
    } else {
      createPrayer(values)
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.prayer.home);
        })
        .catch((err: any) => console.log(err));
    }
  };

  let initialValues = {
    email: "",
    title: "",
    description: ""
  };

  if (edit) {
    initialValues = {
      ...data?.data
    };
  }

  return (
    <Formik initialValues={initialValues} validationSchema={prayerFormValidation} onSubmit={handleSubmit} enableReinitialize>
      {({ values, setFieldValue }) => (
        <Form>
          <Field name='email'>
            {({ field, meta }: { field: any; meta: any }) => (
              <Input
                type='text'
                disabled
                label={
                  <span className='font-semibold mb-1'>
                    Email
                    <span className='text-red-600'>* {meta.touched && meta.error && <span>({meta.error})</span>}</span>
                  </span>
                }
                className='col-span-full'
                placeholder='jondoe@gmail.com'
                {...field}
              />
            )}
          </Field>
          <br />
          <Field name='title'>
            {({ field, meta }: { field: any; meta: any }) => (
              <Input
                disabled
                type='text'
                label={
                  <span className='font-semibold mb-1'>
                    Title
                    <span className='text-red-600'>* {meta.touched && meta.error && <span>({meta.error})</span>}</span>
                  </span>
                }
                className='col-span-full'
                placeholder='Title'
                {...field}
              />
            )}
          </Field>
          <FormBlockWrapper title='Description' className='mt-2'>
            <div className='my-2'>
              <QuillEditor
                value={values.description}
                onChange={(input: string) => {
                  const removeHtmlTags = input.replace(/<[^>]*>/g, "");
                  removeHtmlTags ? setFieldValue("description", input) : setFieldValue("description", "");
                }}
                label=''
                className='col-span-full [&_.ql-editor]:min-h-[100px]'
                labelClassName='font-medium text-gray-700 dark:text-gray-600 mb-1.5'
              />
            </div>
          </FormBlockWrapper>

          <Button type='submit' className='mt-2'>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
