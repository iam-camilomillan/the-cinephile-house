import { Link } from "@nextui-org/react";

export default function FooterServer() {
  return (
    <footer>
      <p className="mx-auto max-w-7xl border-t border-neutral-900 px-8 py-6 text-center">
        <span className="opacity-90">Built by </span>
        <Link
          href="https://iamcamilomillan.vercel.app/"
          target="_blank"
          color="foreground"
        >
          <span className="font-medium">Camilo Millan</span>
        </Link>{" "}
        <span className="opacity-90">&#8226;</span>{" "}
        <Link
          href="https://github.com/iam-camilomillan/the-cinephile-house"
          target="_blank"
          color="foreground"
        >
          <span className="font-medium">Project repository</span>
        </Link>
      </p>
    </footer>
  );
}
