const Footer = () => {
  return (
    <footer className="">
      <p
        className="mx-auto max-w-5xl border-t
      px-8 py-6 text-center"
      >
        <span className="opacity-80">Built by </span>
        <a
          href="https://iamcamilomillan.vercel.app/"
          target="_blank"
          className="font-medium opacity-80 transition-colors duration-200 ease-in-out hover:text-red-600"
        >
          Camilo Millan
        </a>{" "}
        <span className="opacity-80">&#8226;</span>{" "}
        <a
          href="https://github.com/iam-camilomillan/the-cinephile-house"
          target="_blank"
          className="font-medium opacity-80 transition-colors duration-200 ease-in-out hover:text-red-600"
        >
          Project repository
        </a>
      </p>
    </footer>
  );
};

export default Footer;
