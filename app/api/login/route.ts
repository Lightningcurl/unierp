import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 1. Describe exactly what is acceptable. Anything else is rejected.
const LogInInput = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  // 2. Validate — never trust the body's shape.
  const parsed = LogInInput.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, password } = parsed.data;

  // 3. Verify credentials against Supabase Auth. The client never touches auth.users directly.
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // 4. Errors are logged server-side and generic to the client — no internals leaked.
    console.error("login error", error);
    return NextResponse.json({ error: "Could not login to account" }, { status: 400 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}
