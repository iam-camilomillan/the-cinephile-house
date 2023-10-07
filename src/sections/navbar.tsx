import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

/* Context imports */
import { useAuth } from "~/context/AuthContext";
import useOutsideClick from "~/hooks/useOutsideClick";
import useScrollPosition from "~/hooks/useScrollPosition";

/* Icons imports */
import { FaBars, FaFilm } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Navbar = () => {
  /* Context */
  const { user, logOut, setAuthMessage } = useAuth();

  /* Router */
  const router = useRouter();

  /* Utils state */
  const [darkerNavbar, setDarkerNavbar] = useState(false);
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
    if (showUserOptions) {
      setShowUserOptions(false);
    } else {
      setShowUserOptions(true);
    }

    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setShowUserOptions(false);
  };

  const ref = useOutsideClick(handleClickOutside);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (scrollPosition < window.screen.height) {
      setDarkerNavbar(true);
    } else {
      setDarkerNavbar(false);
    }
  }, [scrollPosition]);

  return (
    <header
      className={`fixed z-20 w-full bg-gradient-to-b ${
        darkerNavbar ? "from-black/30 to-black/0" : "from-black/90 to-black/60"
      } px-8 py-4 transition-colors duration-200 ease-in-out`}
    >
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
          <FaFilm className="-rotate-45 text-xl text-clr-one" />
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
              <Link href="/profile" className="px-2 py-1 text-xl font-medium">
                Profile
              </Link>

              {/* Log out */}
              <button
                onClick={async () => {
                  await handleLogOut();
                  setIsOpen(false);
                }}
                className="rounded-md bg-clr-one px-2 py-1 text-xl font-medium text-white"
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
                className="rounded-md bg-clr-one px-2 py-1 text-xl font-medium text-white"
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
          <FaFilm className="-rotate-45 text-xl text-clr-one" />
          TheCinephileHouse
        </Link>

        {/* Separator */}
        <div className="w-8" />

        {/* Navigation links */}
        <nav className="flex gap-x-4">
          {/* Movies page link */}
          <Link href="/movies" className="custom-underline font-medium">
            Movies
          </Link>

          {/* TV Shows page link */}
          <Link href="/tv-shows" className="custom-underline font-medium">
            TV Shows
          </Link>

          {/* Top rated page link */}
          <Link href="/top-rated" className="custom-underline font-medium">
            Top Rated
          </Link>
        </nav>

        {/* Separator */}
        <div className="flex-grow" />

        {/* Auth buttons */}
        {user ? (
          <div ref={ref} className="relative flex items-center justify-center">
            {/* Profile options button */}
            <button
              onClick={handleButtonClick}
              className="overflow-hidden rounded-full border border-clr-one transition-transform duration-200 ease-in-out hover:scale-110 active:scale-100"
            >
              <Image
                src={user.photoURL}
                alt="User avatar"
                width={36}
                height={36}
              />
            </button>

            {/* Profile and Log out button */}
            <div
              className={`absolute -bottom-24 overflow-hidden rounded-md bg-clr-one ${
                showUserOptions ? "" : "hidden"
              }`}
            >
              {/* Profile link */}
              <Link
                href="/profile"
                className="flex items-center justify-center px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-white/10"
              >
                Profile
              </Link>

              {/* Log out button */}
              <button
                onClick={() => handleLogOut()}
                className="flex items-center justify-center px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-white/10"
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
              className="font-medium transition-colors duration-200 ease-in-out hover:text-white/90"
            >
              Log in
            </Link>

            {/* Sign up */}
            <Link
              href="/signup"
              className="rounded-md bg-white px-2 py-1 font-medium text-black transition-colors duration-200 ease-in-out hover:bg-white/90"
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
