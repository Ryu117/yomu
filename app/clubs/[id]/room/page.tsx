import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RoomPage({ params }: Props) {
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

  const topics = [
    club.theme,
    "この作品で一番印象に残った場面は？",
    "自分ならこの登場人物の立場でどうする？",
  ];

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <Link
            href={`/clubs/${id}`}
            className="text-sm text-stone-400 hover:text-white"
          >
            ← 読書会詳細に戻る
          </Link>

          <span className="rounded-full border border-stone-700 px-4 py-2 text-sm text-stone-300">
            参加者 4 / {club.capacity}人
          </span>
        </div>

        <section className="mt-10 rounded-3xl border border-stone-800 bg-stone-900 p-8">
          <p className="text-sm text-stone-400">{eventDate}</p>

          <h1 className="mt-3 text-4xl font-bold">
            {club.title}
          </h1>

          <p className="mt-2 text-stone-400">
            {club.author}
          </p>

          <div className="my-8 h-px bg-stone-800" />

          <p className="text-sm text-stone-400">
            今日のテーマ
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {club.theme}
          </p>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-3xl border border-stone-800 bg-stone-900 p-8">
            <p className="text-sm text-stone-400">
              TALK TOPICS
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              今日話したいこと
            </h2>

            <div className="mt-6 space-y-4">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-800 bg-stone-950 p-5"
                >
                  <p className="text-sm text-stone-500">
                    Topic {index + 1}
                  </p>

                  <p className="mt-2 text-lg">
                    {topic}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-stone-800 bg-stone-900 p-8">
            <p className="text-sm text-stone-400">
              SESSION
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              読書会
            </h2>

            <div className="mt-8 rounded-2xl bg-stone-950 p-6 text-center">
              <p className="text-sm text-stone-500">
                残り時間
              </p>

              <p className="mt-2 text-4xl font-bold tracking-wider">
                60:00
              </p>
            </div>

           {club.meet_url ? (
  <a
    href={club.meet_url}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-6 block w-full rounded-full bg-white px-6 py-4 text-center font-medium text-stone-900 hover:bg-stone-200"
  >
    Google Meetを開く
  </a>
) : (
  <div className="mt-6 rounded-2xl border border-stone-800 px-6 py-4 text-center text-stone-500">
    Meet URLはまだ登録されていません
  </div>
)}

            <button className="mt-3 w-full rounded-full border border-stone-700 px-6 py-4 font-medium text-stone-300 hover:bg-stone-800">
              読書会を終了する
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}