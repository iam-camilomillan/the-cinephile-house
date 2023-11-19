/* Next imports */
import { redirect } from "next/navigation";

/* Auth imports */
import { getServerAuthSession } from "~/server/auth";

/* Page imports */
import PageClient from "~/app/login/page-client";

export default async function Page() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return <PageClient />;
}
