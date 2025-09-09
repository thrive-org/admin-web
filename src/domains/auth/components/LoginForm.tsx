"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/PasswordInput";
import { signIn } from "next-auth/react";
import { loginSchema, LoginInput } from "@/domains/auth/schemas/auth.schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { URLS } from "@/constants/page";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });


  const onSubmit = async (values: LoginInput) => {
    const res = await signIn("credentials", {
      redirect: false,
      callbackUrl: URLS.DASHBOARD,
      email: values.email,
      password: values.password,
    });

    if (res?.ok) {
      router.replace(res?.url || URLS.DASHBOARD);
      console.log(`Login successful`);
      return;
    }

    console.log(`Login failed`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="email" className="text-black text-sm md:text-[15px]">
          Email<span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          disabled={isSubmitting}
          className={`mt-1 h-11 md:h-12 border-none bg-[#F2F5F6] placeholder:text-[#9EA9AA] focus-visible:ring-1 focus-visible:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.email ? "ring-1 ring-red-500" : ""
          }`}
          {...register("email")}
        />
        <p className="min-h-[16px] text-xs text-red-500">
          {errors.email?.message}
        </p>
      </div>

      <div>
        <Label htmlFor="password" className="text-black text-sm md:text-[15px]">
          Password<span className="text-red-500">*</span>
        </Label>
        <PasswordInput
          id="password"
          placeholder="Enter your password"
          disabled={isSubmitting}
          className={`h-11 md:h-12 ${
            errors.password ? "ring-1 ring-red-500" : ""
          }`}
          {...register("password")}
        />
        <p className="min-h-[16px] text-xs text-red-500">
          {errors.password?.message}
        </p>
      </div>

      <div className="flex justify-end">
        <Link
          href={URLS.PASSWORD_FORGOT}
          className="text-sm font-medium text-[#0069A0] hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="adminLogin"
        size="adminLogin"
        disabled={isSubmitting}
        className="w-full h-11 md:h-12"
      >
        {isSubmitting ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
};

export default LoginForm;
