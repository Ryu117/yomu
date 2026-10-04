import Link from "next/link";
import { supabase } from "@/lib/supabase";

type BookClub = {
  id: number;
  title: string;
  author: string;
  event_date: string;
  capacity: number;
  theme: string;
  rule: string;
  description: string | null;
};

export default async function Home() {
  const { data, error } = await supabase
    .from("book_clubs")
    .select("*")
    .order("event_date", { ascending: true });

  const bookClubs: BookClub[] = data ?? [];

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold tracking-tight">YOMU</h1>

          <Link
            href="/clubs/new"
            className="rounded-full bg-stone-900 px-5 py-2 text-sm text-white hover:bg-stone-700"
          >
            読書会を開く
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium text-stone-500">
            本について、誰かと話そう。
          </p>

          <h2 className="text-4xl font-bold leading-tight">
            読み終えた本を、
            <br />
            誰かとの時間に。
          </h2>

          <p className="mt-5 leading-7 text-stone-600">
            気になる読書会を見つけて、
            <br />
            4〜6人で1時間だけ本について話す場所です。
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-stone-500">BOOK CLUBS</p>
          <h3 className="mt-1 text-2xl font-semibold">
            これからの読書会
          </h3>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            読書会を読み込めませんでした。
          </div>
        )}

        {!error && bookClubs.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center">
            <p className="text-stone-600">
              まだ読書会がありません。
            </p>

            <Link
              href="/clubs/new"
              className="mt-5 inline-block rounded-full bg-stone-900 px-6 py-3 text-sm text-white"
            >
              最初の読書会を開く
            </Link>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bookClubs.map((club) => (
            <article
              key={club.id}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="mb-5 text-sm text-stone-500">
                {new Date(club.event_date).toLocaleString("ja-JP", {
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <h4 className="text-xl font-bold">{club.title}</h4>

              <p className="mt-1 text-sm text-stone-500">
                {club.author}
              </p>

              <div className="my-6 h-px bg-stone-100" />

              <p className="text-sm font-medium">今回のテーマ</p>

              <p className="mt-2 flex-1 leading-7 text-stone-600">
                {club.theme}
              </p>

              <div className="mt-7 flex items-center justify-between">
                <span className="text-sm text-stone-500">
                  定員 {club.capacity}人
                </span>

                <Link
                  href={`/clubs/${club.id}`}
                  className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100"
                >
                  詳細を見る
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}