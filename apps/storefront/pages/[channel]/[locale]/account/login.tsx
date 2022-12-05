import { useAuth, useAuthState } from "@saleor/sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { messages } from "@/components/translations";
import { DEMO_MODE } from "@/lib/const";
import { usePaths } from "@/lib/paths";
import LoginIcon from "./loginIcon.svg";
import { Layout } from "@/components";

export type OptionalQuery = {
  next?: string;
};

export interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const router = useRouter();
  const paths = usePaths();
  const t = useIntl();

  const { login } = useAuth();
  const { authenticated } = useAuthState();

  const defaultValues = DEMO_MODE
    ? {
        email: "admin@example.com",
        password: "admin",
      }
    : {};

  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsForm },
    setError: setErrorForm,
  } = useForm<LoginFormData>({ defaultValues });

  const redirectURL = router.query.next?.toString() || paths.$url();

  const handleLogin = handleSubmitForm(async (formData: LoginFormData) => {
    const { data } = await login({
      email: formData.email,
      password: formData.password,
    });

    if (data?.tokenCreate?.errors[0]) {
      // Unable to sign in.
      setErrorForm("email", { message: "Invalid credentials" });
    }
  });

  if (authenticated) {
    // User signed in successfully.
    void router.push(redirectURL);
    return null;
  }

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center bg-gradient-to-r from-blue-300 to-indigo-400">
      <div className="flex justify-end">
        {/* <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
          <div> */}
        {/* Left LoginBG */}
        <div className="w-0 !sm:w-0 lg:w-1/2  flex items-center justify-center">
          <LoginIcon />
        </div>
        {/* Right Login Card */}
        <div className="bg-white min-h-screen w-full !sm:w-full lg:w-1/2  flex justify-center items-center">
          <div className="lg:w-3/6">
            <form onSubmit={handleLogin}>
              <div>
                <span className="text-[15px] py-2 !lg:py-10 !font-thin text-gray-400">
                  {t.formatMessage(messages.loginWelcomeMessage)}
                </span>
                <h1 className="sm:text-[28px] text-[24px] py-1 pb-6 font-bold">
                  {t.formatMessage(messages.loginHeader)}
                </h1>
              </div>

              <div className="my-3">
                <label htmlFor="email" className="block text-[14px] mb-2">
                  {t.formatMessage(messages.loginEmailFieldLabel)}
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
              </div>
              <div className="mt-5">
                <label htmlFor="password" className="block text-[14px] mb-2">
                  {t.formatMessage(messages.loginPasswordFieldLabel)}
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
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700 hover:underline cursor-pointer pt-4">
                  {t.formatMessage(messages.loginRemindPasswordButtonLabel)}
                </span>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="text-[16px] mt-4 mb-3 w-full bg-brand hover:bg-black  text-white py-4 rounded-3xl transition duration-100"
                >
                  {t.formatMessage(messages.logIn)}
                </button>
                {!!errorsForm.email && (
                  <p className="text-sm text-red-500 pt-2">{errorsForm.email?.message}</p>
                )}
              </div>
            </form>
            <p className="mt-8 text-[14px] underline text-center">
              <Link href={paths.account.register.$url()} legacyBehavior>
                {t.formatMessage(messages.createAccount)}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
