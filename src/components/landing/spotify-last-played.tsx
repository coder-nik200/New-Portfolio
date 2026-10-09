"use client";

import Image from "next/image";
import { Pause, Play } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { portfolioTrack } from "@/config/music";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YouTubePlayer }) => void;
            onStateChange?: (event: {
              data: number;
              target: YouTubePlayer;
            }) => void;
            onError?: (event: { data: number }) => void;
          };
        },
      ) => YouTubePlayer;

      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };

    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
}

export function SpotifyLastPlayed() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);

  function getYouTubeVideoId(url: string): string | null {
    try {
      const parsedUrl = new URL(url);

      if (
        [
          "youtube.com",
          "www.youtube.com",
          "music.youtube.com",
          "m.youtube.com",
        ].includes(parsedUrl.hostname)
      ) {
        return parsedUrl.searchParams.get("v");
      }

      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1) || null;
      }

      return null;
    } catch {
      return null;
    }
  }

  const videoId = getYouTubeVideoId(portfolioTrack.youtubeUrl);

  useEffect(() => {
    if (!videoId || !playerContainerRef.current) return;

    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !window.YT?.Player || !playerContainerRef.current) {
        return;
      }

      playerRef.current?.destroy();
      playerRef.current = null;

      const element = document.createElement("div");
      playerContainerRef.current.replaceChildren(element);

      try {
        playerRef.current = new window.YT.Player(element, {
          videoId,
          playerVars: {
            autoplay: 0,
            playsinline: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              if (!cancelled) setIsReady(true);
            },

            onStateChange: (event) => {
              if (cancelled || !window.YT) return;

              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setErrorMessage("");
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
              }
            },

            onError: () => {
              if (cancelled) return;

              setIsPlaying(false);
              setErrorMessage(
                "This song cannot be played through the embedded YouTube player.",
              );
            },
          },
        });
      } catch {
        setErrorMessage("Unable to initialize the YouTube player.");
      }
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://www.youtube.com/iframe_api"]',
      );

      const previousCallback = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        createPlayer();
      };

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onerror = () => {
          if (!cancelled) {
            setErrorMessage("Unable to load the YouTube player.");
          }
        };

        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  function togglePlayback() {
    setErrorMessage("");

    if (!videoId) {
      setErrorMessage("Check the YouTube URL in src/config/music.ts.");
      return;
    }

    if (!isReady || !playerRef.current) {
      setErrorMessage("The player is loading. Please try again shortly.");
      return;
    }

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }

  return (
    <LiquidGlassCard
      glowIntensity="sm"
      shadowIntensity="sm"
      borderRadius="14px"
      blurIntensity="sm"
      className="w-full p-3"
      contentClassName="relative z-10"
    >
      <div className="flex items-center gap-3">
        {/* Vinyl record and tonearm */}
        <div className="relative flex h-[84px] w-[108px] shrink-0 items-center">
          <button
            type="button"
            onClick={togglePlayback}
            disabled={!isReady}
            className="group relative z-20 size-20 overflow-hidden rounded-full bg-black shadow-[0_10px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/15 transition-transform hover:scale-[1.02] disabled:cursor-wait"
            aria-label={isPlaying ? "Pause song" : "Play song"}
          >
            <Image
              src="/assets/apocalypse-vinyl.png"
              alt="Vinyl record"
              fill
              sizes="80px"
              priority
              className={cn(
                "rounded-full object-contain",
                isPlaying && "animate-vinyl-spin",
              )}
            />

            <span className="absolute inset-0 flex items-center justify-center rounded-full transition-colors group-hover:bg-black/20">
              <span className="flex size-8 items-center justify-center rounded-full bg-black/65 text-white opacity-0 transition-opacity group-hover:opacity-100">
                {isPlaying ? (
                  <Pause size={15} weight="fill" />
                ) : (
                  <Play size={15} weight="fill" />
                )}
              </span>
            </span>
          </button>

          {/* Tonearm */}
          <div
            className={cn(
              "pointer-events-none absolute right-1 top-2 z-30 h-4 w-10 origin-right transition-transform duration-700 ease-out",
              isPlaying ? "rotate-0" : "rotate-[18deg]",
            )}
          >
            <span className="absolute right-0 top-1/2 size-4 -translate-y-1/2 rounded-full bg-neutral-500 shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />

            <span className="absolute right-2 top-1/2 h-1 w-9 -translate-y-1/2 rounded-full bg-neutral-500 shadow-[0_2px_4px_rgba(0,0,0,0.18)]" />

            <span className="absolute -left-0.5 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-red-500 shadow-sm" />
          </div>
        </div>

        {/* Song information */}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[10px] font-medium text-secondary">
            <span
              className={cn(
                "size-1.5 rounded-full",
                isPlaying ? "animate-pulse bg-red-500" : "bg-secondary/60",
              )}
            />

            {isPlaying ? "Now playing" : "Favorite track"}
          </p>

          <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
            {portfolioTrack.title}
          </p>

          <p className="truncate text-xs text-secondary">
            {portfolioTrack.artist}
          </p>

          <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-secondary">
            {portfolioTrack.description ??
              "Some songs capture a feeling that words can never fully express."}
          </p>
        </div>

        {/* Single Play/Pause button */}
        <button
          type="button"
          onClick={togglePlayback}
          disabled={!isReady}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white shadow-sm transition hover:scale-105 hover:bg-red-700 disabled:cursor-wait disabled:opacity-40"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="size-4" weight="fill" />
          ) : (
            <Play className="ml-0.5 size-4" weight="fill" />
          )}
        </button>
      </div>

      {/* Hidden YouTube player */}
      <div
        className="pointer-events-none fixed left-0 top-0 -z-10 h-[200px] w-[200px] overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <div ref={playerContainerRef} />
      </div>

      {/* Playback error */}
      {errorMessage && (
        <p role="alert" className="mt-2 text-xs text-red-500">
          {errorMessage}
        </p>
      )}
    </LiquidGlassCard>
  );
}
