"use client";

import QuillLoader from "@/components/reactQuill/QuillLoader";
import { routes } from "@/config/routes";
import { dailyMannaFormValidation } from "@/config/validation";
import {
  useCreateDailyMannaMutation,
  useGetSingleDailyMannaQuery,
  useUpdateDailyMannaMutation
} from "@/features/daily-manna/dailyMannaApi";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button, Input } from "rizzui";
import FormBlockWrapper from "../../../../../components/shared/Form/FormBlockWrapper";

const QuillEditor = dynamic(() => import("@/components/reactQuill/QuillEditor"), {
  ssr: false,
  loading: () => <QuillLoader className='col-span-full h-[143px]' />
});

export default function CreateDailyManna({ edit, id }: { edit?: boolean; id?: string }) {
  const [createDailyManna] = useCreateDailyMannaMutation();
  const [updateDailyManna] = useUpdateDailyMannaMutation();
  const { data } = useGetSingleDailyMannaQuery(id, { skip: !edit });
  const router = useRouter();

  const handleSubmit = (values: any) => {
    if (edit) {
      updateDailyManna({ id, data: values })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.dailyManna.home);
        })
        .catch((err: any) => console.log(err));
    } else {
      createDailyManna(values)
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.dailyManna.home);
        })
        .catch((err: any) => console.log(err));
    }
  };

  let initialValues = {
    title: "",
    description: "",
    date: new Date()
  };

  if (edit) {
    initialValues = {
      ...data?.data
    };
  }

  return (
    <Formik initialValues={initialValues} validationSchema={dailyMannaFormValidation} onSubmit={handleSubmit} enableReinitialize>
      {({ values, setFieldValue }) => (
        <Form>
          <Field name='title'>
            {({ field, meta }: { field: any; meta: any }) => (
              <Input
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
          <Field name='date'>
            {({ field, meta }: { field: any; meta: any }) => (
              <DateInput
                value={dayjs(values.date).toDate()}
                onChange={(input) => {
                  setFieldValue("date", dayjs(input, "DD/MM/YYYY").toISOString());
                }}
                valueFormat='DD/MM/YYYY'
                label={
                  <span className='font-semibold mb-1'>
                    Date
                    <span className='text-red-600'>* {meta.touched && meta.error && <span>({meta.error})</span>}</span>
                  </span>
                }
                placeholder='DD/MM/YYYY'
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
