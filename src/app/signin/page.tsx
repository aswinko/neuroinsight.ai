"use client";
import React from "react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { LoginGitHub, LoginGoogle } from "@/src/components/SocialLogin";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AuthButton from "@/src/components/AuthButton";
import { loginWithCreds } from "@/actions/auth";

const SigninForm = () => {
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Form submitted");
  // };

  const { data: session } = useSession();
  //redirection when a user
  if (session?.user) redirect("/");

  return (
    <div className="max-w-md w-full border dark:border-secondary mx-auto rounded-none md:rounded-2xl p-4 md:p-8 md:mt-12 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Sign in to <span className="text-primary">Neuroinsight.ai</span>
      </h2>
      {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p> */}

      <form className="my-8" action={loginWithCreds}>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="aswin@neuroinsight.com" name="email" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">password</Label>
          <Input id="password" placeholder="••••••••••••" name="password" type="password" />
        </LabelInputContainer>

        <AuthButton />

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <LoginGitHub />
          <LoginGoogle />
        </div>
      </form>
    </div>
  );
};

export default SigninForm;


const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
