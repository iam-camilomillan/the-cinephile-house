"use client";
/* React imports */
import { useState } from "react";

/* Next imports */
import NextImage from "next/image";
import { useRouter } from "next/navigation";

/* NextAuth imports */
import { signIn } from "next-auth/react";

/* NextUI imports */
import { Button, Image, Input, Link } from "@nextui-org/react";

/* Icons imports */
import {
  IconBrandGoogle,
  IconEye,
  IconEyeClosed,
  IconMovie,
} from "@tabler/icons-react";

/* Types imports */
import { type FormEvent } from "react";

export default function PageClient() {
  /* Sign up states */
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* Utils states */
  const [isPasswordVisible, setPasswordIsVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordIsVisible] =
    useState(false);

  /* Router declaration */
  const router = useRouter();

  /* Submit handler */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    console.log("Not implemented");
  };

  /* Handles Google log in */
  const handleGoogleLogIn = async () => {
    await signIn("google", { redirect: false })
      .then((ok) => {
        if (ok) {
          router.refresh();
        }
      })
      .then((error) => console.log(error));
  };

  return (
    <main>
      <section className="relative h-[90vh]">
        {/* Sign up background image */}
        <Image
          as={NextImage}
          src="/images/auth-background.jpg"
          alt="Sign up background image"
          width={1920}
          height={1080}
          priority
          className="h-[90vh] w-full rounded-none object-cover object-center"
        />

        {/* Content container */}
        <div className="absolute top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-neutral-950/75 px-6">
          {/* Sign up page title */}
          <h2 className="text-center text-2xl text-neutral-300">
            Sign up to <IconMovie className="inline -rotate-45 text-primary" />
            <span className="font-bold text-neutral-50">
              The Cinephile House
            </span>
          </h2>

          {/* Separator */}
          <div className="h-8" />

          {/* Sign up form container */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-xs flex-col items-start rounded-xl border border-neutral-800 bg-neutral-950 p-4"
          >
            {/* Name input */}
            <Input
              type="text"
              label="Name"
              labelPlacement="outside"
              placeholder=""
              value={data.name}
              onValueChange={(value) =>
                setData((previousState) => ({
                  ...previousState,
                  name: value,
                }))
              }
            />

            {/* Separator */}
            <div className="h-2" />

            {/* Email input */}
            <Input
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder=""
              value={data.email}
              onValueChange={(value) =>
                setData((previousState) => ({
                  ...previousState,
                  email: value,
                }))
              }
            />

            {/* Separator */}
            <div className="h-2" />

            {/* Password input */}
            <Input
              type={isPasswordVisible ? "text" : "password"}
              label="Password"
              labelPlacement="outside"
              placeholder=""
              value={data.password}
              onValueChange={(value) =>
                setData((previousState) => ({
                  ...previousState,
                  password: value,
                }))
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setPasswordIsVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <IconEyeClosed className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <IconEye className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
            />

            {/* Separator */}
            <div className="h-2" />

            {/* Confirm password input */}
            <Input
              type={isConfirmPasswordVisible ? "text" : "password"}
              label="Confirm password"
              labelPlacement="outside"
              placeholder=""
              value={data.confirmPassword}
              onValueChange={(value) =>
                setData((previousState) => ({
                  ...previousState,
                  confirmPassword: value,
                }))
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() =>
                    setConfirmPasswordIsVisible(!isConfirmPasswordVisible)
                  }
                >
                  {isConfirmPasswordVisible ? (
                    <IconEyeClosed className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <IconEye className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
            />

            {/* Separator */}
            <div className="h-8" />

            {/* Sign up with email and password button */}
            <Button type="submit" color="primary" fullWidth>
              <span className="font-bold">Register</span>
            </Button>

            {/* Divider */}
            <div className="flex w-full items-center justify-center gap-2 py-2">
              <div className="h-px w-20 bg-neutral-600" />
              <span>or</span>
              <div className="h-px w-20 bg-neutral-600" />
            </div>

            {/* Log in with google button */}
            <Button
              type="button"
              onPress={handleGoogleLogIn}
              fullWidth
              startContent={<IconBrandGoogle />}
              className="bg-neutral-50 text-neutral-950"
            >
              <span className="font-bold">Log in with Google</span>
            </Button>
          </form>

          {/* Separator */}
          <div className="h-2" />

          {/* Log in link */}
          <p>
            <span className="text-neutral-300">Already have an account?</span>{" "}
            <Link href="/login" color="foreground">
              <span>Log in now&#33;</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
