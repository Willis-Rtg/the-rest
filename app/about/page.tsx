import { getSession } from "@/lib/session";
import AboutClient from "./client";

export default async function About() {
  const session = await getSession();
  return <AboutClient userId={session.id} />;
}
