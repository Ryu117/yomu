import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClubPage({ params }: Props) {
  const { id } = await params;

  const { data: club, error } = await supabase
    .from("book_clubs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !club) {
    notFound();
  }

  const eventDate = new Date(club.event_date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="text-sm text-stone-500 hover:text-stone-900"
        >
          ← 読書会一覧に戻る
        </Link>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
          <p className="text-sm text-stone-500">{eventDate}</p>

          <h1 className="mt-4 text-4xl font-bold">
            {club.title}
          </h1>

          <p className="mt-2 text-lg text-stone-500">
            {club.author}
          </p>

          <div className="my-8 h-px bg-stone-100" />

          <div className="space-y-8">
            <section>
              <p className="text-sm font-medium text-stone-500">
                今回のテーマ
              </p>

              <p className="mt-2 text-xl font-semibold">
                {club.theme}
              </p>
            </section>

            <section>
              <p className="text-sm font-medium text-stone-500">
                この読書会について
              </p>

              <p className="mt-2 leading-8 text-stone-700">
                {club.description || "説明はありません。"}
              </p>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-stone-100 p-5">
                <p className="text-sm text-stone-500">
                  定員
                </p>

                <p className="mt-1 font-semibold">
                  {club.capacity}人
                </p>
              </div>

              <div className="rounded-2xl bg-stone-100 p-5">
                <p className="text-sm text-stone-500">
                  参加条件
                </p>

                <p className="mt-1 font-semibold">
                  {club.rule}
                </p>
              </div>
            </section>

            <button className="w-full rounded-full bg-stone-900 px-6 py-4 font-medium text-white hover:bg-stone-700">
              この読書会に参加する
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}