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

export default function Page() {
  /* Login states */
  const [data, setData] = useState({ email: "", password: "" });

  /* Utils states */
  const [isPasswordVisible, setPasswordIsVisible] = useState(false);

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
        {/* Log in background image */}
        <Image
          as={NextImage}
          src="/images/auth-background.jpg"
          alt="Log in background image"
          width={1920}
          height={1080}
          priority
          className="h-[90vh] w-full rounded-none object-cover object-center"
        />

        {/* Content container */}
        <div className="absolute top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-black/75 px-8 text-white">
          {/* Log in page title */}
          <h2 className="text-center text-2xl text-white/90">
            Sign up to <IconMovie className="inline -rotate-45 text-primary" />
            <span className="font-bold text-white">The Cinephile House</span>
          </h2>

          {/* Separator */}
          <div className="h-8" />

          {/* Log in form container */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-xs flex-col items-start rounded-xl border border-neutral-900 bg-neutral-950 p-4"
          >
            {/* Email input */}
            <Input
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder="demo@thecinephilehouse.com"
              value={data.email}
              onValueChange={(value) =>
                setData((previousState) => ({
                  ...previousState,
                  email: value,
                }))
              }
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
              placeholder="demopassword"
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
              value={data.password}
              onValueChange={(value) =>
                setData((previousState) => ({
                  ...previousState,
                  password: value,
                }))
              }
              classNames={{
                inputWrapper: "bg-neutral-900",
              }}
            />

            {/* Separator */}
            <div className="h-8" />

            {/* Log in with email and password button */}
            <Button
              type="submit"
              color="primary"
              fullWidth
              className="hover:bg-secondary"
            >
              <span className="font-bold">Log in</span>
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
            <span className="text-white/80">Don&#39;t have an account?</span>{" "}
            <Link href="/signup" color="foreground">
              <span>Register now&#33;</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
