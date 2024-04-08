"use client";

import { FaGithub } from "react-icons/fa";
import { avatar } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn } from "next-auth/react";
import React from "react";
import * as Yup from "yup";

const FILE_SIZE = 1024 * 1024 * 2;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
];

const userSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is =required"),
  age: Yup.number().required("Age is required"),
});
const page = () => {
  
  const handleSubmit = (values: any) => {
    try {
      fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mt-9 flex gap-3 flex-col justify-center items-center">
      <Formik
        initialValues={{
          lastName: "",
          firstName: "",
          age: 0,
          avatar: undefined,
        }}
        validationSchema={userSchema}
        onSubmit={(values, { setSubmitting }: any) => {
          alert(JSON.stringify(values, null, 2));
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col">
              <label htmlFor="lastName">LastName:</label>
              <Field
                className="w-[400px] border border-gray-300 rounded-md"
                name="lastName"
                type="text"
                placeholder="Enter your Lastname"
              />
              <ErrorMessage name="lastName">
                {(msg) => <div className="text-red-600 text-[14px]">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="flex flex-col">
              <label htmlFor="firstName">FirstName:</label>
              <Field
                className="w-[400px] border border-gray-300 rounded-md"
                name="firstName"
                type="text"
                placeholder="Enter your firstname"
              />
              <ErrorMessage name="firstName">
                {(msg) => <div className="text-red-600 text-[14px]">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="flex flex-col">
              <label htmlFor="Age">Age:</label>
              <Field
                className="w-[400px] border border-gray-300 rounded-md"
                name="age"
                type="number"
                placeholder="Enter your age"
              />
              <ErrorMessage name="age">
                {(msg) => <div className="text-red-600 text-[14px]">{msg}</div>}
              </ErrorMessage>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 text-white rounded-md mt-6 bg-blue-500 px-4"
              >
                Submit
              </button>

            </div>
          </Form>
        )}
      </Formik>
      <button className="flex gap-5 items-center bg-none border-gray-300 border py-2 px-6 rounded-md mb-2" onClick={() => signIn('github')}> <FaGithub /> Sign in with github</button>
    </div>
  );
};

export default page;
