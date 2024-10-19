"use client";

import { login } from "@/actions/auth";
import React from "react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export const LoginGitHub = () => {
  return (
    <button
      onClick={() => login("github")}
      className=" relative  border flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
      type="button"
    >
      <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
        GitHub
      </span>
    </button>
  );
};

export const LoginGoogle = () => {
  return (
    <button
      onClick={() => login("google")}
      className=" relative  border flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
      type="button"
    >
      <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
        Google
      </span>
    </button>
  );
};
