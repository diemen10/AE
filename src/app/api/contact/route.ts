import { NextResponse } from "next/server";

const DEFAULT_FORMSPREE_ENDPOINT = "https://formspree.io/f/myzdbjzq";

const escapeForSlack = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

async function sendToFormspree(data: Record<string, string>) {
  const endpoint = process.env.FORMSPREE_CONTACT_ENDPOINT ?? DEFAULT_FORMSPREE_ENDPOINT;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Formspree error", response.status, body);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Formspree request failed", error);
    return false;
  }
}

async function sendSlackNotification(data: Record<string, string>) {
  const webhookUrl = process.env.SLACK_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }

  const { name, email, phone, message } = data;
  const fallback = `Nuevo lead web: ${escapeForSlack(name)} (${escapeForSlack(email)})`;

  const payload = {
    text: fallback,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Nuevo lead web*\n*Nombre:* ${name}\n*Email:* ${email}${phone ? `\n*Telefono:* ${phone}` : ""}${message ? `\n*Mensaje:* ${message}` : ""}`,
        },
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Slack webhook error", response.status, body);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Slack webhook request failed", error);
    return false;
  }
}

export async function POST(request: Request) {
  const form = await request.formData();

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  if (!name || !email) {
    return NextResponse.redirect(new URL("/?contact_error=missing", request.url), {
      status: 303,
    });
  }

  const payload: Record<string, string> = {
    name,
    email,
  };

  if (phone) payload.phone = phone;
  if (message) payload.message = message;

    const formspreeData: Record<string, string> = {
    ...payload,
    _subject:
      process.env.FORMSPREE_CONTACT_SUBJECT ?? "Nuevo lead web - Contacto asesoria",
  };

  await Promise.all([
    sendToFormspree(formspreeData),
    sendSlackNotification(payload),
  ]);

  const redirectUrl = new URL("/gracias", request.url);
  redirectUrl.searchParams.set("source", "contact");

  return NextResponse.redirect(redirectUrl, {
    status: 303,
  });
}



