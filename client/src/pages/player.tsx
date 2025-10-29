import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { LiveStream } from "@shared/schema";
import { Eye, ChevronLeft, Loader2, AlertCircle } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import ReactPlayer from "react-player";

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [viewerCount, setViewerCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [playerError, setPlayerError] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  const { data: lives, isLoading: livesLoading, error: livesError } = useQuery<LiveStream[]>({
    queryKey: ["/api/lives"],
  });

  const currentIndex = lives?.findIndex((l) => l.id === id) ?? -1;
  const currentLive = lives?.[currentIndex];

  useEffect(() => {
    if (currentLive) {
      // 🔧 ADICIONADO: Log para debug
      console.log("🎥 Carregando live:", currentLive.title);
      console.log("📹 URL do vídeo:", currentLive.videoUrl);
      
      setViewerCount(currentLive.baseViewerCount);

      const interval = setInterval(() => {
        setViewerCount((prev) => {
          const variance = Math.floor(Math.random() * 15) - 7;
          const newCount = prev + variance;
          return Math.max(
            currentLive.baseViewerCount - 10,
            Math.min(currentLive.baseViewerCount + 20, newCount)
          );
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [currentLive]);

  const goToNextLive = () => {
    if (lives && currentIndex < lives.length - 1) {
      setLocation(`/player/${lives[currentIndex + 1].id}`);
    }
  };

  const goBackToLives = () => {
    setLocation("/lives");
  };

  const handlers = useSwipeable({
    onSwipedUp: () => goToNextLive(),
    onSwipedLeft: () => goBackToLives(),
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  // Loading state
  if (livesLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-white">Carregando live...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (livesError || !lives) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold text-white">Erro ao carregar</h2>
          <p className="text-white/70">
            Não foi possível carregar as lives. Tente novamente.
          </p>
          <button
            onClick={() => setLocation("/lives")}
            className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover-elevate active-elevate-2"
          >
            Voltar para Lives
          </button>
        </div>
      </div>
    );
  }

  // Not found
  if (!currentLive) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-white">Live não encontrada</h2>
          <button
            onClick={() => setLocation("/lives")}
            className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover-elevate active-elevate-2"
          >
            Voltar para Lives
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...handlers}
      className="fixed inset-0 bg-black overflow-hidden"
      data-testid="container-player"
    >
      <div className="absolute inset-0 z-0">
        {!playerReady && !playerError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        )}
        
        {playerError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-20 p-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
              <p className="text-white">Erro ao carregar o vídeo</p>
              <p className="text-white/70 text-sm">Verifique a URL do vídeo</p>
              <button
                onClick={goBackToLives}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover-elevate active-elevate-2"
              >
                Voltar
              </button>
            </div>
          </div>
        )}

        <ReactPlayer
          ref={playerRef}
          url={currentLive.videoUrl}
          playing={isPlaying}
          loop
          muted={false}
          volume={1}
          width="100%"
          height="100%"
          playsinline
          controls={false}
          onReady={() => {
            // 🔧 ADICIONADO: Log detalhado
            console.log("✅ Player pronto! Vídeo carregado com sucesso");
            setPlayerReady(true);
            setPlayerError(false);
          }}
          onError={(e) => {
            // 🔧 ADICIONADO: Log detalhado do erro
            console.error("❌ Erro no player:", e);
            setPlayerError(true);
            setPlayerReady(false);
          }}
          onBuffer={() => console.log("⏳ Buffering...")}
          onBufferEnd={() => console.log("✅ Buffer completo")}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                disablePictureInPicture: true,
                crossOrigin: "anonymous",
                preload: "auto",
              },
              forceVideo: true,
              forceAudio: false,
              hlsOptions: {
                forceHLS: false,
                debug: false,
              },
            },
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-start justify-between gap-4">
          <button
            onClick={goBackToLives}
            className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-lg hover-elevate active-elevate-2"
            data-testid="button-back"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex-1 flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 bg-primary px-3 py-2 rounded-lg shadow-lg">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse-live" />
              <span className="text-sm font-bold text-primary-foreground uppercase tracking-wide">
                LIVE
              </span>
            </div>

            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-lg">
              <Eye className="w-5 h-5 text-white" />
              <span className="text-base font-semibold text-white tabular-nums" data-testid="text-viewer-count">
                {viewerCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-bold text-white drop-shadow-lg">
            {currentLive.title}
          </h2>
          {currentLive.category && (
            <p className="text-sm text-white/90 mt-1 drop-shadow-lg">
              {currentLive.category}
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="text-center">
          <p className="text-xs text-white/60">
            Deslize para cima para a próxima live
          </p>
          <p className="text-xs text-white/60 mt-1">
            Deslize para a esquerda para voltar
          </p>
        </div>
      </div>
    </div>
  );
}
