import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

/* Context imports */
import { useAuth } from "~/context/AuthContext";
import useOutsideClick from "~/hooks/useOutsideClick";

/* Icons imports */
import { FaBars, FaFilm } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Navbar = () => {
  /* Context */
  const { user, logOut, setAuthMessage } = useAuth();

  /* Router */
  const router = useRouter();

  /* Utils state */
  const [isOpen, setIsOpen] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut();
      router.reload();
    } catch (error) {
      setAuthMessage(error);
    }
  };

  const handleButtonClick = (event: any) => {
    setShowUserOptions(!showUserOptions);

    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setShowUserOptions(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <header className="fixed z-20 w-full bg-black/75 px-8 py-4">
      {/* Mobile navbar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between md:hidden">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className={`z-30 flex items-center gap-1 text-lg font-bold ${
            isOpen ? null : "text-white"
          } transition-colors duration-200 ease-in-out`}
        >
          <FaFilm className="-rotate-45 text-xl text-red-600" />
          TheCinephileHouse
        </Link>

        {/* Toogle navbar button */}
        <div
          className={`z-30 ${
            isOpen ? null : "text-white"
          } transition-colors duration-200 ease-in-out`}
        >
          {isOpen ? (
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              <FaX />
            </button>
          ) : (
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              <FaBars />
            </button>
          )}
        </div>

        <div
          className={`fixed -right-full top-0 z-20 flex h-screen w-full ${
            isOpen ? "-translate-x-full" : null
          } flex-col items-center justify-around bg-white py-16 transition-transform duration-200 ease-in-out`}
        >
          {/* Navigation links */}
          <nav className="flex h-full flex-col items-center justify-around text-2xl">
            {/* Movies page link */}
            <Link href="/movies" className="font-medium">
              Movies
            </Link>

            {/* TV Shows page link */}
            <Link href="/tv-shows" className="font-medium">
              TV Shows
            </Link>

            {/* Top rated page link */}
            <Link href="/top-rated" className="font-medium">
              Top Rated
            </Link>
          </nav>

          {/* Auth buttons */}
          {user ? (
            <div className="flex items-center gap-x-4">
              {/* Profile */}
              <Link href="/profile" className="px-2 py-1 text-xl">
                Profile
              </Link>

              {/* Log out */}
              <button
                onClick={async () => {
                  await handleLogOut();
                  setIsOpen(false);
                }}
                className="rounded-md bg-red-600 px-2 py-1 text-xl text-white"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              {/* Log in */}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium"
              >
                Log in
              </Link>

              {/* Sign up */}
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-red-600 px-2 py-1 text-xl font-medium text-white"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Desktop navbar */}
      <div className="mx-auto hidden max-w-7xl items-center text-white md:flex">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-lg font-bold">
          <FaFilm className="-rotate-45 text-xl text-red-600" />
          TheCinephileHouse
        </Link>

        {/* Separator */}
        <div className="w-8" />

        {/* Navigation links */}
        <nav className="flex gap-x-4">
          {/* Movies page link */}
          <Link href="/movies" className="custom-underline">
            Movies
          </Link>

          {/* TV Shows page link */}
          <Link href="/tv-shows" className="custom-underline">
            TV Shows
          </Link>

          {/* Top rated page link */}
          <Link href="/top-rated" className="custom-underline">
            Top Rated
          </Link>
        </nav>

        {/* Separator */}
        <div className="flex-grow" />

        {/* Auth buttons */}
        {user ? (
          <div
            onClick={handleButtonClick}
            className="relative flex items-center justify-center"
          >
            <button className="overflow-hidden rounded-full border transition-transform duration-200 ease-in-out hover:scale-110 active:scale-100">
              <Image
                src={user.photoURL}
                alt="User avatar"
                width={36}
                height={36}
              />
            </button>

            {/* Profile and Log out button */}
            <div
              ref={ref}
              className={`absolute -bottom-20 overflow-hidden rounded-md bg-red-600 ${
                showUserOptions ? "" : "hidden"
              }`}
            >
              <Link
                href="/profile"
                className="w-full px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-red-500"
              >
                Profile
              </Link>
              <button
                onClick={() => handleLogOut()}
                className="w-full px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            {/* Log in */}
            <Link
              href="/login"
              className="transition-colors duration-200 ease-in-out hover:text-white/80"
            >
              Log in
            </Link>

            {/* Sign up */}
            <Link
              href="/signup"
              className="rounded-md bg-red-600 px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-red-500"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
