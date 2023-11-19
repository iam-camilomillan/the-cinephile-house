/* Next imports */
import { redirect } from "next/navigation";

/* Auth imports */
import { getServerAuthSession } from "~/server/auth";

/* Page imports */
import PageClient from "~/app/signup/page-client";

export default async function Page() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return <PageClient />;
}
