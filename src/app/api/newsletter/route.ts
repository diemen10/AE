import { NextResponse } from "next/server";

const BREVO_ENDPOINT = "https://api.brevo.com/v3/contacts";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email !== "string" || !email.trim()) {
    return NextResponse.redirect(new URL("/?newsletter_error=missing-email", request.url), {
      status: 303,
    });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const rawListId = process.env.BREVO_LIST_ID;
  const listId = rawListId ? Number(rawListId) : undefined;

  if (!apiKey || !listId || Number.isNaN(listId)) {
    console.error("Newsletter signup: Missing BREVO_API_KEY or BREVO_LIST_ID");
    return NextResponse.redirect(new URL("/?newsletter_error=misconfigured", request.url), {
      status: 303,
    });
  }

  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!response.ok && response.status !== 400) {
      const errorBody = await response.text();
      console.error("Brevo error", response.status, errorBody);
      return NextResponse.redirect(new URL("/?newsletter_error=provider", request.url), {
        status: 303,
      });
    }

    return NextResponse.redirect(new URL("/gracias", request.url), {
      status: 303,
    });
  } catch (error) {
    console.error("Newsletter signup failed", error);
    return NextResponse.redirect(new URL("/?newsletter_error=unexpected", request.url), {
      status: 303,
    });
  }
}
