"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    router.refresh();
  }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <span className="text-gray-400 text-sm">Carregando...</span>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Hello World 👋</h1>

        {session ? (
          <>
            <div className="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
              <p className="text-sm text-green-700 font-medium">
                ✅ Logado como
              </p>
              <p className="mt-1 text-base font-semibold text-green-900">
                {session.user.name ?? session.user.email}
              </p>
              {session.user.name && (
                <p className="text-xs text-green-600 mt-0.5">
                  {session.user.email}
                </p>
              )}
            </div>

            <button
              onClick={handleSignOut}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <div className="mb-6 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3">
              <p className="text-sm text-yellow-700">
                ⚠️ Você não está logado
              </p>
            </div>

            <a
              href="/sign-in"
              className="inline-block w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Fazer Login
            </a>
          </>
        )}
      </div>
    </main>
  );
}
