import { AuthButton } from "@/components/auth-button";
import { LoginForm } from "@/components/login-form";
import { createClient } from "@/lib/supabase/server";


export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        {/* <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16"> */}
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <div className="flex items-center gap-2">
              </div>
            </div>
             <AuthButton />
          </div>
        {/* </nav> */}
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
         {!user &&( <LoginForm />)}
          <main className="flex-1 flex flex-col gap-6 px-4">
          </main>
        </div>
      </div>
    </main>
  );
}
