import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 pb-24">
      <div className="text-center space-y-4 max-w-sm animate-fade-in">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        <h2 className="text-xl font-semibold" data-testid="text-maintenance-title">
          Em Manutenção
        </h2>
        <p className="text-sm text-muted-foreground">
          Estamos trabalhando para trazer novidades em breve. Aguarde!
        </p>
      </div>
    </div>
  );
}
