import { subscribeUser } from "../../../services/subscribe";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }

    const result = await subscribeUser(email);

    if (result.success) {
      return Response.json({ message: result.message }, { status: 200 });
    } else {
      return Response.json({ error: result.message }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
