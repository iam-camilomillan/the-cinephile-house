const Footer = () => {
  return (
    <footer>
      <p className="mx-auto max-w-5xl border-t px-8 py-6 text-center">
        <span className="opacity-90">Built by </span>
        <a
          href="https://iamcamilomillan.vercel.app/"
          target="_blank"
          className="custom-underline font-medium opacity-90 duration-200 ease-in-out after:bg-clr-one hover:opacity-100"
        >
          Camilo Millan
        </a>{" "}
        <span className="opacity-90">&#8226;</span>{" "}
        <a
          href="https://github.com/iam-camilomillan/the-cinephile-house"
          target="_blank"
          className="custom-underline font-medium opacity-90 duration-200 ease-in-out after:bg-clr-one hover:opacity-100"
        >
          Project repository
        </a>
      </p>
    </footer>
  );
};

export default Footer;
