"use client";

import { routes } from "@/config/routes";
import { vedioFormValidation } from "@/config/validation";
import { useCreateVideoMutation } from "@/features/video/videoApi";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Input } from "rizzui";

export default function CreateVideo({ edit, id }: { edit?: boolean; id?: string }) {
  const [CreateVideo] = useCreateVideoMutation();

  const router = useRouter();

  const handleSubmit = (values: any) => {
    CreateVideo(values)
      .then((res: any) => {
        if (res.data.status) router.push(routes.admin.video.home);
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <Formik initialValues={{ channelId: "" }} validationSchema={vedioFormValidation} onSubmit={handleSubmit} enableReinitialize>
      {({ values, setFieldValue }) => (
        <Form>
          <Input name='channelId' />
          {/* <Field name='channelId'>
            {({ field, meta }: { field: any; meta: any }) => (
              <Input
                type='text'
                label={
                  <span className='font-semibold mb-1'>
                    ChannelId
                    <span className='text-red-600'>* {meta.touched && meta.error && <span>({meta.error})</span>}</span>
                  </span>
                }
                className='max-w-screen-xs'
                placeholder='ChannelId'
                {...field}
              />
            )}
          </Field> */}

          <Button type='submit' className='mt-2'>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
