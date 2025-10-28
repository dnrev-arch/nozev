import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { LiveStream } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Eye, AlertCircle } from "lucide-react";

export default function LivesPage() {
  const [, setLocation] = useLocation();

  const { data: lives, isLoading, error } = useQuery<LiveStream[]>({
    queryKey: ["/api/lives"],
  });

  const handleLiveClick = (liveId: string) => {
    setLocation(`/player/${liveId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Lives</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 pb-24 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold">Erro ao carregar lives</h2>
          <p className="text-sm text-muted-foreground">
            Não foi possível carregar as lives. Tente novamente em alguns instantes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-24 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" data-testid="text-page-title">
          Lives
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {lives?.map((live) => (
            <Card
              key={live.id}
              className="group cursor-pointer overflow-hidden hover-elevate active-elevate-2 transition-transform"
              onClick={() => handleLiveClick(live.id)}
              data-testid={`card-live-${live.id}`}
            >
              <div className="relative aspect-video">
                <img
                  src={live.thumbnailUrl}
                  alt={live.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary px-2 py-1 rounded-md">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse-live" />
                  <span className="text-xs font-semibold text-primary-foreground uppercase">
                    LIVE
                  </span>
                </div>

                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
                  <Eye className="w-3 h-3 text-white" />
                  <span className="text-xs font-medium text-white">
                    {live.baseViewerCount}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-sm font-semibold text-white line-clamp-2">
                    {live.title}
                  </h3>
                  {live.category && (
                    <p className="text-xs text-white/80 mt-1">
                      {live.category}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {(!lives || lives.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma live disponível no momento
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
