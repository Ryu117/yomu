"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewClubPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [capacity, setCapacity] = useState("4");
  const [theme, setTheme] = useState("");
  const [rule, setRule] = useState("読了必須");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.from("book_clubs").insert({
      title,
      author,
      event_date: eventDate,
      capacity: Number(capacity),
      theme,
      rule,
      description,
    });

    setLoading(false);

    
    if (error) {
  console.error(error);
  setErrorMessage(
    `読書会の作成に失敗しました：${error.message}`
  );
  return;
}

   alert("読書会を作成しました！");
router.push("/");
router.refresh();
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <a
          href="/"
          className="text-sm text-stone-500 hover:text-stone-900"
        >
          ← 読書会一覧に戻る
        </a>

        <div className="mt-10">
          <p className="text-sm font-medium text-stone-500">
            CREATE BOOK CLUB
          </p>

          <h1 className="mt-2 text-4xl font-bold">読書会を開く</h1>

          <p className="mt-4 leading-7 text-stone-600">
            読み終えた本について、誰かと話す時間をつくりましょう。
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-8 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              本のタイトル
            </label>

            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：風の歌を聴け"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              著者名
            </label>

            <input
              required
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="例：村上春樹"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              開催日時
            </label>

            <input
              required
              type="datetime-local"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              定員
            </label>

            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
            >
              <option value="4">4人</option>
              <option value="5">5人</option>
              <option value="6">6人</option>
              <option value="8">8人</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              今回のテーマ
            </label>

            <input
              required
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="例：この小説の「風」って何だろう"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              参加条件
            </label>

            <select
              value={rule}
              onChange={(e) => setRule(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
            >
              <option>読了必須</option>
              <option>読了済み推奨</option>
              <option>未読OK</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              読書会について
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="どんなことを話したい読書会なのか、自由に書いてください。"
              className="w-full resize-none rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-stone-900 px-6 py-4 font-medium text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {loading ? "作成中..." : "読書会を作成する"}
          </button>
        </form>
      </div>
    </main>
  );
}