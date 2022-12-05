import { useAuth } from "@saleor/sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { messages } from "@/components/translations";
import { usePaths } from "@/lib/paths";
import LoginIcon from "./loginIcon.svg";
import { Layout } from "@/components";

export interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

function RegisterPage() {
  const router = useRouter();
  const paths = usePaths();
  const t = useIntl();

  const { register } = useAuth();
  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsForm },
    setError: setErrorForm,
  } = useForm<RegisterFormData>({});

  const handleRegister = handleSubmitForm(async (formData: RegisterFormData) => {
    const { data } = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      redirectUrl: `${window.location.origin}/account/confirm`,
    });

    if (data?.accountRegister?.errors.length) {
      // Unable to sign in.
      data?.accountRegister?.errors.forEach((e) => {
        if (e.field === "email") {
          setErrorForm("email", { message: e.message! });
        } else if (e.field === "password") {
          setErrorForm("password", { message: e.message! });
        } else if (e.field === "firstName") {
          setErrorForm("firstName", { message: e.message! });
        } else if (e.field === "lastName") {
          setErrorForm("lastName", { message: e.message! });
        } else {
          console.error("Registration error:", e);
        }
      });
      return;
    }

    // User signed in successfully.
    void router.push(paths.$url());
  });

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center bg-gradient-to-r from-blue-300 to-indigo-400">
      <div className="flex justify-end">
        {/* Left LoginBG */}
        <div className="w-0 !sm:w-0 lg:w-1/2  flex items-center justify-center">
          + <LoginIcon />
        </div>
        {/* Right Login Card */}
        <div className="bg-white min-h-screen w-full !sm:w-full lg:w-1/2  flex justify-center items-center">
          <div className="lg:w-3/6">
            <form onSubmit={handleRegister}>
              <div>
                <h1 className="sm:text-[28px] text-[24px] py-1 pb-6 font-bold">
                  {t.formatMessage(messages.registerHeader)}
                </h1>
              </div>

              <div className="my-3">
                <label htmlFor="firstName" className="block text-[14px] mb-2">
                  {t.formatMessage(messages.firstNameField)}
                </label>
                <input
                  className="px-4 w-full border-1 !border-gray-300 py-4 !rounded-3xl text-[16px] outline-none"
                  type="text"
                  id="firstName"
                  spellCheck={false}
                  {...registerForm("firstName", {
                    required: true,
                  })}
                />
                {!!errorsForm.firstName && (
                  <p className="text-sm text-red-500 pt-2">{errorsForm.firstName?.message}</p>
                )}
              </div>
              <div className="my-3">
                <label htmlFor="lastName" className="block text-[14px] mb-2">
                  {t.formatMessage(messages.lastNameField)}
                </label>
                <input
                  className="px-4 w-full border-1 !border-gray-300 py-4 !rounded-3xl text-[16px] outline-none"
                  type="text"
                  id="lastName"
                  spellCheck={false}
                  {...registerForm("lastName", {
                    required: true,
                  })}
                />
                {!!errorsForm.lastName && (
                  <p className="text-sm text-red-500 pt-2">{errorsForm.lastName?.message}</p>
                )}
              </div>

              <div className="my-3">
                <label htmlFor="email" className="block text-[14px] mb-2">
                  {t.formatMessage(messages.registerEmailFieldLabel)}
                </label>
                <input
                  className="px-4 w-full border-1 !border-gray-300 py-4 !rounded-3xl text-[16px] outline-none"
                  type="email"
                  id="email"
                  spellCheck={false}
                  {...registerForm("email", {
                    required: true,
                  })}
                />
                {!!errorsForm.email && (
                  <p className="text-sm text-red-500 pt-2">{errorsForm.email?.message}</p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="password" className="block text-[14px] mb-2">
                  {t.formatMessage(messages.registerPasswordFieldLabel)}
                </label>
                <input
                  className="px-4 w-full border-1 !border-gray-300 py-4 !rounded-3xl text-md outline-none"
                  type="password"
                  id="password"
                  spellCheck={false}
                  {...registerForm("password", {
                    required: true,
                  })}
                />
                {!!errorsForm.password && (
                  <p className="text-sm text-red-500 pt-2">{errorsForm.password?.message}</p>
                )}
              </div>

              <div className="">
                <button
                  type="submit"
                  className="text-[16px] mt-8 mb-3 w-full bg-brand hover:bg-black  text-white py-4 rounded-3xl transition duration-100"
                >
                  {t.formatMessage(messages.registerButton)}
                </button>
              </div>
            </form>
            <p className="mt-8 text-[14px] underline text-center">
              <Link href={paths.account.login.$url()} legacyBehavior>
                {t.formatMessage(messages.backToLogin)}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
