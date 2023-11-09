"use client";
/* React imports */
import { useState } from "react";

/* Next imports */
import NextImage from "next/image";

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

export default function Page() {
  /* Sign up states */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* Utils states */
  const [isPasswordVisible, setPasswordIsVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordIsVisible] =
    useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  /* Handles Google log in */
  const handleGoogleLogIn = async () => {
    try {
      await signIn("google", { callbackUrl: "http://localhost:3000/" });
    } catch (error) {
      console.log(error);
    }
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
        <div className="absolute top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-black/75 px-8 text-white">
          {/* Sign up page title */}
          <h2 className="text-center text-2xl text-white/90">
            Sign up to <IconMovie className="inline -rotate-45 text-primary" />
            <span className="font-bold text-white">The Cinephile House</span>
          </h2>

          {/* Separator */}
          <div className="h-8" />

          {/* Sign up form container */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-xs flex-col items-start rounded-xl border border-neutral-900 bg-neutral-950 p-4"
          >
            {/* Email input */}
            <Input
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder=""
              value={email}
              onValueChange={setEmail}
              classNames={{
                inputWrapper: "bg-neutral-900",
              }}
            />

            {/* Separator */}
            <div className="h-2" />

            {/* Password input */}
            <Input
              type={isPasswordVisible ? "text" : "password"}
              label="Password"
              labelPlacement="outside"
              placeholder=""
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
              value={password}
              onValueChange={setPassword}
              classNames={{
                inputWrapper: "bg-neutral-900",
              }}
            />

            {/* Separator */}
            <div className="h-2" />

            {/* Confirm password input */}
            <Input
              type={isConfirmPasswordVisible ? "text" : "password"}
              label="Confirm password"
              labelPlacement="outside"
              placeholder=""
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
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              classNames={{
                inputWrapper: "bg-neutral-900",
              }}
            />

            {/* Separator */}
            <div className="h-8" />

            {/* Sign up with email and password button */}
            <Button
              type="submit"
              color="primary"
              fullWidth
              className="hover:bg-secondary"
            >
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
              startContent={<IconBrandGoogle />}
              fullWidth
              className="bg-white text-black hover:bg-white/90"
            >
              <span className="font-bold">Log in with Google</span>
            </Button>
          </form>

          {/* Separator */}
          <div className="h-2" />

          {/*  */}
          <p>
            <span className="text-white/80">Already have an account?</span>{" "}
            <Link href="/login" color="foreground">
              <span>Log in now&#33;</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
