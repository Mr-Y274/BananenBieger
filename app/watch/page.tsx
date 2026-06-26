"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const RenderedVideoPlayer = dynamic(
  () =>
    import("@/components/video/RenderedVideoPlayer").then(
      (m) => m.RenderedVideoPlayer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-black text-slate-400 text-sm">
        Video wird geladen…
      </div>
    ),
  }
);

interface Comment {
  id: string;
  user: string;
  avatarBg: string;
  text: string;
  timestamp: string;
  likes: number;
  likeStatus: "none" | "liked";
}

interface SuggestedVideo {
  id: string;
  title: string;
  channel: string;
  views: string;
  time: string;
  duration: string;
  gradient: string;
}

export default function WatchPage() {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subsCount, setSubsCount] = useState<number>(1245892);
  const [likesCount, setLikesCount] = useState<number>(45201);
  const [userLikeState, setUserLikeState] = useState<
    "none" | "liked" | "disliked"
  >("none");
  const [newComment, setNewComment] = useState<string>("");

  const [commentsList, setCommentsList] = useState<Comment[]>([
    {
      id: "c1",
      user: "GurkenGerd99",
      avatarBg: "bg-emerald-600",
      text: "Die Gurken-Rakete war ein absolutes technologisches Meisterwerk! 🥒🚀 Ich brauche eine Bauanleitung!",
      timestamp: "vor 2 Stunden",
      likes: 1420,
      likeStatus: "none",
    },
    {
      id: "c2",
      user: "FairyHater",
      avatarBg: "bg-fuchsia-600",
      text: "Das mit der Fliegenklatsche hat diese hinterlistige Urwaldfee absolut verdient... Toller Twist am Ende!",
      timestamp: "vor 45 Minuten",
      likes: 842,
      likeStatus: "none",
    },
    {
      id: "c3",
      user: "AnimatorsGuy",
      avatarBg: "bg-cyan-600",
      text: "Diese prozeduralen SVG-Verformungen über Math.sin im Code sind geisteskrank smooth! Respekt an den Dev!",
      timestamp: "vor 12 Minuten",
      likes: 19,
      likeStatus: "none",
    },
  ]);

  const suggestedVideos: SuggestedVideo[] = [
    {
      id: "s1",
      title: "Gurken-Raketen Bauanleitung (NASA Edition)",
      channel: "GurkenGerd Tech",
      views: "42K Aufrufe",
      time: "vor 1 Tag",
      duration: "14:20",
      gradient: "from-green-500 to-emerald-700",
    },
    {
      id: "s2",
      title: "Top 10 fiese Pläne der Urwaldfee zur Weltherrschaft",
      channel: "Fairytale Lore",
      views: "128K Aufrufe",
      time: "vor 5 Stunden",
      duration: "8:45",
      gradient: "from-purple-500 to-indigo-800",
    },
    {
      id: "s3",
      title: "Cowboy Waffentraining: Wie man Bananen richtig wirbelt",
      channel: "WildWestSkills",
      views: "900K Aufrufe",
      time: "vor 3 Wochen",
      duration: "22:10",
      gradient: "from-amber-500 to-yellow-600",
    },
    {
      id: "s4",
      title: "Was passiert wenn man zu lange auf dem Sofa vegetiert?",
      channel: "DocVitamin",
      views: "2.1M Aufrufe",
      time: "vor 1 Jahr",
      duration: "11:05",
      gradient: "from-red-400 to-pink-600",
    },
  ];

  const handleSubscribeToggle = () => {
    if (isSubscribed) {
      setSubsCount((prev) => prev - 1);
      setIsSubscribed(false);
    } else {
      setSubsCount((prev) => prev + 1);
      setIsSubscribed(true);
    }
  };

  const handleLikeClick = () => {
    if (userLikeState === "liked") {
      setLikesCount((prev) => prev - 1);
      setUserLikeState("none");
    } else {
      setLikesCount((prev) => prev + (userLikeState === "disliked" ? 2 : 1));
      setUserLikeState("liked");
    }
  };

  const handleDislikeClick = () => {
    if (userLikeState === "disliked") {
      setUserLikeState("none");
    } else {
      if (userLikeState === "liked") setLikesCount((prev) => prev - 1);
      setUserLikeState("disliked");
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const addedComment: Comment = {
      id: Date.now().toString(),
      user: "Du (Web-Master)",
      avatarBg: "bg-slate-900",
      text: newComment,
      timestamp: "Gerade eben",
      likes: 0,
      likeStatus: "none",
    };

    setCommentsList([addedComment, ...commentsList]);
    setNewComment("");
  };

  const handleCommentLike = (id: string) => {
    setCommentsList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = item.likeStatus === "liked";
          return {
            ...item,
            likes: item.likes + (isLiked ? -1 : 1),
            likeStatus: isLiked ? "none" : "liked",
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-red-500 selection:text-white">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-red-600 text-2xl">⚡</span>
          <span className="text-xl font-black tracking-tighter uppercase text-slate-900">
            BananenTube
          </span>
        </div>
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Suchen nach krummen Sachen..."
              className="w-full bg-slate-100 border border-slate-200 rounded-full py-2 px-5 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
            />
            <span className="absolute left-4 top-2.5 text-slate-400 text-sm">
              🔍
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-red-500 shadow-sm border border-white cursor-pointer" />
      </header>

      <main className="max-w-[1750px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 lg:p-8">
        <section className="lg:col-span-2 flex flex-col">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-200/90 relative group">
            <RenderedVideoPlayer />
          </div>

          <h1 className="text-2xl font-black mt-5 tracking-tight text-slate-950 leading-tight">
            Warum ist die Banane krumm? 🍌 (Die schockierende Wahrheit deckt
            alles auf!)
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 items-center justify-between border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-black text-slate-900 text-lg shadow-inner border border-yellow-300">
                🍌
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-slate-900 text-base hover:text-red-600 transition-colors cursor-pointer">
                    Bananenbieger Studios
                  </span>
                  <span
                    className="text-blue-500 text-xs shadow-sm bg-blue-50 w-4 h-4 rounded-full flex items-center justify-center"
                    title="Verifiziert"
                  >
                    ✓
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {subsCount.toLocaleString("de-DE")} Abonnenten
                </span>
              </div>
              <button
                onClick={handleSubscribeToggle}
                className={`ml-4 px-6 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all duration-200 ${
                  isSubscribed
                    ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/10"
                }`}
              >
                {isSubscribed ? "Abonniert" : "Abonnieren"}
              </button>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200/60">
              <button
                onClick={handleLikeClick}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  userLikeState === "liked"
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span>👍</span> {likesCount.toLocaleString("de-DE")}
              </button>
              <div className="w-px h-5 bg-slate-300" />
              <button
                onClick={handleDislikeClick}
                className={`flex items-center px-4 py-2 rounded-full text-xs transition-all ${
                  userLikeState === "disliked"
                    ? "bg-white text-red-600 shadow-sm"
                    : "hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span>👎</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-2xl mt-5 hover:bg-slate-200/80 transition duration-200 cursor-pointer border border-slate-200/40">
            <div className="text-xs font-bold text-slate-800 space-x-2">
              <span>1.452.091 Aufrufe</span>
              <span>•</span>
              <span>vor 2 Stunden hochgeladen</span>
              <span>•</span>
              <span className="text-red-600">#Wissenschaft</span>
              <span className="text-red-600">#CartoonLore</span>
            </div>
            <p className="mt-2 text-sm text-slate-700 font-medium leading-relaxed">
              Vergesst alles, was euch eure Biologielehrer je erzählt haben! 🚨
              Die Wahrheit ist viel komplexer: Es beginnt beim brutalen
              Wild-West-Shootout eines namenlosen Cowboys, führt über den
              Rachefeldzug einer hasserfüllten Urwaldfee und endet im puren
              Promi-Größenwahn einer pubertierenden Teenie-Banane, die in einer
              Gurken-Rakete Kurs auf das größte Licht im Universum nimmt! 🌌🥒
              <br />
              <br />
              Abonniert den Kanal für weitere schockierende Enthüllungen direkt
              aus der Animationsmanufaktur!
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-black tracking-tight text-slate-900">
              {commentsList.length} Kommentare
            </h3>

            <form
              onSubmit={handleCommentSubmit}
              className="mt-5 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-sm shadow-inner shrink-0">
                U
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Einen öffentlich interaktiven Kommentar hinzufügen..."
                  rows={2}
                  className="w-full bg-transparent border-b border-slate-300 py-1 text-sm text-slate-900 focus:outline-none focus:border-slate-900 transition-colors resize-none placeholder:text-slate-400"
                />
                {newComment.trim().length > 0 && (
                  <div className="flex justify-end gap-2 animate-fade-in">
                    <button
                      type="button"
                      onClick={() => setNewComment("")}
                      className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                    >
                      Kommentieren
                    </button>
                  </div>
                )}
              </div>
            </form>

            <div className="mt-6 space-y-4">
              {commentsList.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-4 p-3 border-b border-slate-100 items-start group hover:bg-slate-50 rounded-xl transition-colors duration-150"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${comment.avatarBg} flex items-center justify-center font-black text-white text-xs shadow-sm shrink-0 uppercase`}
                  >
                    {comment.user.charAt(0)}
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">
                        {comment.user}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-normal font-medium">
                      {comment.text}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className={`text-xs flex items-center gap-1 font-bold p-1 rounded hover:bg-slate-100 transition ${
                          comment.likeStatus === "liked"
                            ? "text-emerald-600"
                            : "text-slate-500"
                        }`}
                      >
                        👍{" "}
                        <span className="text-[11px]">{comment.likes}</span>
                      </button>
                      <button className="text-xs text-slate-400 hover:bg-slate-100 p-1 rounded transition">
                        👎
                      </button>
                      <button className="text-[11px] text-slate-500 font-bold hover:text-slate-900 px-2 py-0.5 rounded hover:bg-slate-100">
                        Antworten
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1 flex flex-col gap-5 sticky top-24 self-start">
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            Nächste Videos
          </h4>

          {suggestedVideos.map((video) => (
            <div
              key={video.id}
              className="flex gap-3 cursor-pointer group p-1.5 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-slate-200/60"
            >
              <div
                className={`w-40 h-24 rounded-xl relative overflow-hidden bg-gradient-to-tr ${video.gradient} shadow-sm shrink-0 flex items-center justify-center font-black text-white text-2xl tracking-tighter shadow-inner border border-white/10 group-hover:scale-[1.02] transition-transform duration-200`}
              >
                🎬
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-black px-1.5 py-0.5 rounded-md tracking-normal">
                  {video.duration}
                </span>
              </div>
              <div className="flex flex-col justify-between py-0.5 flex-1">
                <h5 className="text-sm font-extrabold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {video.title}
                </h5>
                <div className="flex flex-col mt-1">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-0.5">
                    {video.channel}{" "}
                    <span className="text-[9px] bg-slate-200 text-slate-600 w-3 h-3 rounded-full flex items-center justify-center">
                      ✓
                    </span>
                  </span>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5 space-x-1">
                    <span>{video.views}</span>
                    <span>•</span>
                    <span>{video.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </main>
    </div>
  );
}
