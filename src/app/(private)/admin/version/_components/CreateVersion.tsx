"use client";

import { routes } from "@/config/routes";
import { languageFormValidation } from "@/config/validation";
import { useCreateVersionMutation, useGetSingleVersionQuery, useUpdateVersionMutation } from "@/features/version/versionApi";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Input } from "rizzui";

export default function CreateVersion({ edit, id }: { edit?: boolean; id?: string }) {
  const [createVersion] = useCreateVersionMutation();
  const [updateVersion] = useUpdateVersionMutation();
  const { data } = useGetSingleVersionQuery(id, { skip: !edit });
  const router = useRouter();

  const handleSubmit = (values: any) => {
    if (edit) {
      updateVersion({ id, data: values })
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.version.home);
        })
        .catch((err: any) => console.log(err));
    } else {
      createVersion(values)
        .then((res: any) => {
          if (res.data.status) router.push(routes.admin.version.home);
        })
        .catch((err: any) => console.log(err));
    }
  };

  let initialValues = {
    name: "",
    code: "",
    nameLocal: "",
    script: "",
    scriptDirection: "",
    status: "1"
  };

  if (edit) {
    initialValues = {
      ...data?.data
    };
  }

  return (
    <Formik initialValues={initialValues} validationSchema={languageFormValidation} onSubmit={handleSubmit} enableReinitialize>
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
                className='col-span-full'
                placeholder='Name'
                {...field}
              />
            )}
          </Field>
          <Field name='code'>
            {({ field, meta }: { field: any; meta: any }) => (
              <Input
                type='text'
                label={
                  <span className='font-semibold mb-1'>
                    Code
                    <span className='text-red-600'>* {meta.touched && meta.error && <span>({meta.error})</span>}</span>
                  </span>
                }
                className='col-span-full'
                placeholder='Code'
                {...field}
              />
            )}
          </Field>
          <Field name='nameLocal'>
            {({ field, meta }: { field: any; meta: any }) => (
              <Input
                type='text'
                label={
                  <span className='font-semibold mb-1'>
                    Local Name
                    <span className='text-red-600'>* {meta.touched && meta.error && <span>({meta.error})</span>}</span>
                  </span>
                }
                className='col-span-full'
                placeholder='English Name'
                {...field}
              />
            )}
          </Field>

          <Field name='script'>
            {({ field, meta }: { field: any; meta: any }) => (
              <Input
                type='text'
                label={<span className='font-semibold mb-1'>Script</span>}
                className='col-span-full'
                placeholder='Script'
                {...field}
              />
            )}
          </Field>

          <Field name='scriptDirection'>
            {({ field, meta }: { field: any; meta: any }) => (
              <Input
                type='text'
                label={<span className='font-semibold mb-1'>Script Direction</span>}
                className='col-span-full'
                placeholder='Script Direction'
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
