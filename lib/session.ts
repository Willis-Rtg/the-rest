"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionContent {
  id?: number;
}

export async function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "admin",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function saveSession(admin: { id: number }) {
  const session = await getSession();
  session.id = admin.id;
  await session.save();
}

export async function destorySession() {
  const session = await getSession();
  await session.destroy();
}
