"use client";

import Button from "@/components/shared/Button/Button";
import Input from "@/components/shared/Form/Input";
import { routes } from "@/config/routes";
import { useAdminLoginMutation } from "@/features/auth/authApi";
import { setValue } from "@/features/auth/authSlice";
import hitToast from "@/utils/hitToast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Password } from "rizzui";
import * as Yup from "yup";

export default function AdminLoginForm() {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    email: "",
    password: ""
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Required!").email("Invalid Email!"),
    password: Yup.string().required("Required!")
  });

  const [adminLogin, { data: loginResponse, isSuccess: loginSuccess, isError: loginError }] = useAdminLoginMutation();

  // Handle Login Response
  useEffect(() => {
    if (loginError) {
      setSubmitting(false);
      toast.error("Something went wrong! Try Again");
    }
    if (loginSuccess) {
      if (loginResponse?.status) {
        hitToast("success", "Login Success");
        console.log(loginResponse);
        dispatch(setValue({ target: "user", value: loginResponse.data }));
        replace(routes.admin.dashboard);
      } else {
        setSubmitting(false);
        toast.error(loginResponse?.message);
      }
    }
  }, [loginError, loginSuccess, loginResponse, replace, dispatch]);

  // Submit Handler
  const handleSubmit = (values: any) => {
    setSubmitting(true);

    adminLogin({
      email: values.email,
      password: values.password
    });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
      {({}) => {
        return (
          <Form>
            <Input name='email' required size='lg' />
            <Field name='password'>
              {({ field, meta }: { field: any; meta: any }) => (
                <div className='mt-3'>
                  <Password
                    size='lg'
                    label={
                      <span className='font-semibold mb-1'>
                        <span>Password</span>
                        <span className='text-red-600 font-bold'>
                          {" "}
                          * <ErrorMessage name={"password"} />
                        </span>
                      </span>
                    }
                    color='primary'
                    autoComplete='off'
                    placeholder='Password'
                    {...field}
                  />
                </div>
              )}
            </Field>
            <Button
              text={"Login"}
              isLoading={submitting}
              className='btn-primary flex justify-center items-center py-2 w-full mt-3'
              type='submit'
            />
          </Form>
        );
      }}
    </Formik>
  );
}
