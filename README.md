# 📱 NOZEV - Plataforma de Lives Simuladas

> **Protótipo visual de demonstração** para gravações e materiais de marketing

![Status](https://img.shields.io/badge/status-MVP-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

---

## 🎯 Sobre o Projeto

**NOZEV** é um MVP (Minimum Viable Product) de demonstração que simula uma plataforma de transmissões ao vivo, mas que na verdade utiliza vídeos pré-gravados.

### ⚠️ Importante
Este **NÃO é um aplicativo funcional** para uso público. É um protótipo visual criado exclusivamente para:
- 📹 Gravações de tela para marketing
- 🎬 Vídeos promocionais de pré-lançamento
- 💼 Apresentações para investidores
- 📊 Prova social antes do lançamento oficial

---

## ✨ Funcionalidades

### 🔐 Tela de Login
- Login simplificado apenas com email (sem senha)
- Autocorreção inteligente de domínios de email
- Sugestões automáticas (ex: gmail.con → gmail.com)

### 🎥 Grid de Lives
- Layout tipo Netflix com thumbnails em grade
- Badge "LIVE" pulsante em cada thumbnail
- Contador de espectadores por live
- Design responsivo (2-3 colunas)

### 📺 Player Imersivo
- Modo fullscreen sem controles de vídeo
- Contador de espectadores oscilante (simula audiência real)
- Gestos touch:
  - **Swipe up** → Próxima live
  - **Swipe left** → Voltar ao menu
- Impossível pausar, avançar ou retroceder

### 👤 Perfil de Usuário
- Upload de foto de perfil
- Configurações de preferências:
  - Tipo de interesse
  - Categoria de busca
  - Canais de contato aceitos
- Dados salvos localmente (localStorage)

### 💬 Mensagens
- Tela "Em Manutenção" (placeholder)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI profissionais
- **Wouter** - Roteamento leve
- **React Query** - Gerenciamento de estado
- **React Player** - Player de vídeo
- **React Swipeable** - Gestos touch

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework servidor
- **TypeScript** - Tipagem estática
- **Zod** - Validação de dados
- **Drizzle ORM** - ORM (opcional)

### Design
- **Framer Motion** - Animações suaves
- **Lucide React** - Ícones
- **Design System** inspirado em Netflix

---

## 📦 Instalação Local

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Comandos

```bash
# 1. Clone o repositório
git clone https://github.com/dnrev-arch/nozev.git
cd nozev

# 2. Instale as dependências
npm install

# 3. Inicie em modo desenvolvimento
npm run dev

# 4. Acesse no navegador
http://localhost:5000
```

---

## 🚀 Deploy no EasyPanel

### Método 1: Deploy Direto via GitHub

1. **Faça login no EasyPanel**
2. **Crie novo projeto** → "Deploy from GitHub"
3. **Selecione o repositório:** `dnrev-arch/nozev`
4. **Configure:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Port: `5000`
5. **Deploy automático** a cada push na branch `main`

### Método 2: Deploy com Docker

```bash
docker build -t nozev .
docker run -p 5000:5000 nozev
```

---

## 🎨 Customização

### Adicionar Novas Lives

Edite o arquivo `server/storage.ts`:

```typescript
private initializeDemoLives() {
  const demoLives: LiveStream[] = [
    {
      id: "7",                           // ID único
      title: "Minha Nova Live",          // Título
      thumbnailUrl: "https://...",       // Thumbnail 16:9
      videoUrl: "https://...",           // URL do vídeo
      baseViewerCount: 150,              // Espectadores base
      category: "Categoria",             // Categoria (opcional)
    },
    // ... outras lives
  ];
}
```

### Alterar Cores do Tema

Edite `client/src/index.css`:

```css
.dark {
  --primary: 0 100% 50%;      /* Vermelho Netflix */
  --background: 0 0% 7%;       /* Preto profundo */
  --card: 0 0% 10%;            /* Cinza escuro */
}
```

### Ajustar Oscilação de Espectadores

Em `client/src/pages/player.tsx`:

```typescript
const interval = setInterval(() => {
  setViewerCount((prev) => {
    const variance = Math.floor(Math.random() * 15) - 7; // ±7 pessoas
    // Ajuste os valores aqui
  });
}, 3000); // Intervalo em ms
```

---

## 📁 Estrutura do Projeto

```
nozev/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── lib/           # Utilitários
│   │   └── App.tsx        # App principal
│   └── index.html
├── server/                 # Backend Express
│   ├── index.ts           # Servidor
│   ├── routes.ts          # Rotas da API
│   ├── storage.ts         # Dados em memória
│   └── vite.ts            # Config Vite
├── shared/                 # Código compartilhado
│   └── schema.ts          # Schemas Zod e tipos
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📸 Guia para Gravações

### Fluxo Recomendado

1. **Login** → Mostre autocorreção de email
2. **Grid de Lives** → Navegue pelas thumbnails
3. **Player** → Demonstre gestos (swipe up/left)
4. **Perfil** → Configure preferências
5. **Navegação** → Mostre fluidez entre telas

### Dicas de Gravação

- **Resolução:** 1080p (1920x1080) ou 4K
- **Frame Rate:** 60 FPS
- **Orientação:** Vertical (mobile) ou Horizontal (desktop)
- **Duração:** 30-90 segundos por feature
- **Ferramentas:** OBS Studio, ScreenFlow, Camtasia

---

## 🐛 Troubleshooting

### Vídeos não carregam
- ✅ Verifique se as URLs permitem CORS
- ✅ Use URLs HTTPS (não HTTP)
- ✅ Teste os links diretamente no navegador

### Gestos não funcionam
- ✅ Use device mode no navegador (F12 → Toggle device toolbar)
- ✅ Teste em dispositivo mobile real

### Build falha
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm start        # Inicia servidor de produção
npm run check    # Verifica erros TypeScript
```

---

## 📄 Documentação Adicional

- [Manual Completo](NOZEV_MANUAL.md) - Instruções detalhadas
- [Design Guidelines](design_guidelines.md) - Diretrizes de design

---

## ⚖️ Licença

Este projeto é apenas um **protótipo de demonstração** criado para fins de marketing.

**Avisos Legais:**
- ❌ NÃO deve ser usado como aplicativo real
- ❌ NÃO há transmissão ao vivo real
- ❌ NÃO coleta dados de usuários
- ✅ Apenas para demonstrações e vídeos promocionais
- ✅ Todos os dados são armazenados localmente

---

## 👨‍💻 Autor

**dnrev-arch**

---

## 🎯 Roadmap Futuro

Este é um MVP de demonstração. O aplicativo real incluirá:
- [ ] Transmissões ao vivo reais
- [ ] Sistema de chat em tempo real
- [ ] Sistema de notificações
- [ ] Integração com serviços de pagamento
- [ ] Autenticação completa com OAuth
- [ ] Banco de dados real (PostgreSQL)
- [ ] Sistema de moderação
- [ ] Analytics e métricas

---

**NOZEV** - Plataforma de Lives Simuladas  
Versão 1.0.0 | Outubro 2025
