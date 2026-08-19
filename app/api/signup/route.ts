import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 1. Describe exactly what is acceptable. Anything else is rejected.
const SignupInput = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  // 2. Validate — never trust the body's shape.
  const parsed = SignupInput.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  // 3. Supabase creates the auth.users row; a DB trigger populates profiles.full_name
  // from this metadata. The client never writes to either table directly.
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });

  if (error) {
    // 4. Errors are logged server-side and generic to the client — no internals leaked.
    console.error("signup error", error);
    return NextResponse.json({ error: "Could not create account" }, { status: 400 });
  }

  return NextResponse.json({ needsEmailConfirmation: data.session === null });
}
