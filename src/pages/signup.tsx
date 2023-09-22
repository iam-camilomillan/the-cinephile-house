import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* Icons imports */
import { FaGoogle } from "react-icons/fa";

/* Loading screen import */
import LoadingScreen from "~/components/LoadingScreen";

/* Context imports */
import { useAuth } from "~/context/AuthContext";

/* Router */
import { useRouter } from "next/router";

const Signup = () => {
  /* Context */
  const { user, signUpWithEmail, logInWithGoogle } = useAuth();

  /* Router */
  const router = useRouter();

  /* User data */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* Utils states */
  const [isLoading, setIsLoading] = useState(true);

  /* Handles the form submit */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await signUpWithEmail(email, password, confirmPassword);
  };

  /* Handles the sign in with google */
  const handleGoogleLogIn = async () => {
    await logInWithGoogle();
  };

  /* Protects the router if there is user logged */
  if (user) {
    router.push("/");
  }

  return (
    <section className="relative h-screen">
      {/* Register background image */}
      <Image
        src="/images/authBackground.jpg"
        alt="Sign up background image"
        fill
        priority
        onLoadingComplete={() => setIsLoading(false)}
        className="object-cover object-center"
      />

      {/* Loading screen */}
      {isLoading ? <LoadingScreen /> : null}

      {/* Content container */}
      <div className="absolute flex h-full w-full flex-col items-center justify-center bg-black/75 px-8 text-white">
        {/* Register page title */}
        <h2 className="text-center text-2xl text-white/80">
          Register to{" "}
          <span className="font-bold text-white">TheCinephileHouse</span>
        </h2>

        {/* Separator */}
        <div className="h-8" />

        {/* Register form container */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xs flex-col items-start rounded-xl border p-4"
        >
          {/* Email label */}
          <label className="font-medium">Email</label>

          {/* Email input */}
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full rounded-md px-2 py-1 text-black"
          />

          {/* Separator */}
          <div className="h-2" />

          {/* Password label  */}
          <label className="font-medium">Password</label>

          {/* Password input */}
          <input
            type="password"
            placeholder="examplepassword"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full rounded-md px-2 py-1 text-black"
          />

          {/* Separator */}
          <div className="h-2" />

          {/* Confirm password label */}
          <label className="font-medium">Confirm password</label>

          {/* Confirm password input */}
          <input
            type="password"
            placeholder="examplepassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="w-full rounded-md px-2 py-1 text-black"
          />

          {/* Separator */}
          <div className="h-8" />

          {/* Register with email and password button */}
          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-2 py-1 font-medium transition-colors duration-200 ease-in-out hover:bg-red-500"
          >
            Register
          </button>

          {/* Divider */}
          <div className="flex w-full items-center justify-center gap-2 py-2">
            <div className="h-px w-20 bg-white/80  " />
            <span>or</span>
            <div className="h-px w-20 bg-white/80  " />
          </div>

          {/* Log in with google button */}
          <button
            type="button"
            onClick={() => handleGoogleLogIn()}
            className="flex w-full items-center justify-center gap-1 rounded-md bg-white px-2 py-1 font-medium text-black transition-colors duration-200 ease-in-out hover:bg-white/80"
          >
            <FaGoogle />
            Log in with Google
          </button>
        </form>

        {/* Separator */}
        <div className="h-1" />

        {/*  */}
        <p className="text-white/80">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-white transition-colors duration-200 ease-in-out hover:text-slate-50/80"
          >
            Login now!
          </Link>
        </p>
      </div>

      {/* Demo account */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white/80">
        Demo account email:{" "}
        <span className="text-white">demo@thecinephilehouse.com</span>
        <br />
        password: <span className="text-white">demoaccount</span>
      </p>
    </section>
  );
};

export default Signup;
