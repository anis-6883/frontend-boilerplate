"use client";

import QuillLoader from "@/components/reactQuill/QuillLoader";
import { routes } from "@/config/routes";
import { contentFormValidation } from "@/config/validation";
import {
  useCreateContentMutation,
  useGetSingleContentQuery,
  useUpdateContentMutation
} from "@/features/contentManagement/contentManagementApi";
import { Field, Form, Formik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button, Input, Switch } from "rizzui";
import FormBlockWrapper from "../../../../../components/shared/Form/FormBlockWrapper";

const QuillEditor = dynamic(() => import("@/components/reactQuill/QuillEditor"), {
  ssr: false,
  loading: () => <QuillLoader className='col-span-full h-[143px]' />
});

export default function CreateContent({ edit, id }: { edit?: boolean; id?: string }) {
  const [createContent] = useCreateContentMutation();
  const [updateContent] = useUpdateContentMutation();
  const { data } = useGetSingleContentQuery(id, { skip: !edit });
  const router = useRouter();

  const handleSubmit = (values: any) => {
    values.status = values.status === "1" ? "1" : "0";

    if (edit) {
      updateContent({ id, data: values })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.contentManagement.home);
        })
        .catch((err: any) => console.log(err));
    } else {
      createContent(values)
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.contentManagement.home);
        })
        .catch((err: any) => console.log(err));
    }
  };

  let initialValues = {
    title: "",
    content: "",
    status: "1"
  };

  if (edit) {
    initialValues = {
      ...data?.data
    };
  }

  return (
    <Formik initialValues={initialValues} validationSchema={contentFormValidation} onSubmit={handleSubmit} enableReinitialize>
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
                className='max-w-screen-xs'
                placeholder='Title'
                {...field}
              />
            )}
          </Field>
          <FormBlockWrapper title='Content' className='mt-2'>
            <div className='my-2'>
              <QuillEditor
                value={values.content}
                onChange={(input: string) => {
                  const removeHtmlTags = input.replace(/<[^>]*>/g, "");
                  removeHtmlTags ? setFieldValue("content", input) : setFieldValue("content", "");
                }}
                label=''
                className='col-span-full [&_.ql-editor]:min-h-[100px]'
                labelClassName='font-medium text-gray-700 dark:text-gray-600 mb-1.5'
              />
            </div>
          </FormBlockWrapper>
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
          <Button type='submit'>Submit</Button>
        </Form>
      )}
    </Formik>
  );
}
