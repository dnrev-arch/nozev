# 📱 NOZEV - Manual de Configuração e Deploy

## 🎯 Visão Geral

O **NOZEV** é um protótipo visual de plataforma de lives simuladas, desenvolvido exclusivamente para **demonstrações em vídeo e materiais de marketing**. Este não é um aplicativo funcional para uso público, mas sim um MVP simulado para gravações de tela e apresentações de pré-lançamento.

## 🏗️ Estrutura do Projeto

```
nozev/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── pages/            # Páginas da aplicação
│   │   │   ├── login.tsx     # Tela de login com autocorreção de email
│   │   │   ├── lives.tsx     # Grid de thumbnails das lives
│   │   │   ├── player.tsx    # Player fullscreen com gestos
│   │   │   ├── messages.tsx  # Tela "Em Manutenção"
│   │   │   └── profile.tsx   # Perfil com preferências
│   │   ├── components/       # Componentes reutilizáveis
│   │   │   ├── ui/          # Componentes shadcn
│   │   │   └── bottom-nav.tsx # Navegação inferior
│   │   ├── index.css         # Estilos globais e animações
│   │   └── App.tsx           # Roteamento principal
│   └── index.html            # HTML base
├── server/                    # Backend Express
│   ├── routes.ts             # Rotas da API
│   ├── storage.ts            # Armazenamento em memória
│   └── index.ts              # Servidor Express
├── shared/                    # Código compartilhado
│   └── schema.ts             # Schemas Zod e tipos TypeScript
└── design_guidelines.md      # Diretrizes de design
```

## 🎨 Características Visuais

### Design System
- **Cores**: Tema escuro inspirado em Netflix com vermelho (#FF0000) como cor primária
- **Tipografia**: Inter para textos, com hierarquia clara
- **Animações**: Suaves e profissionais (fade-in, slide-up, pulse)
- **Responsividade**: Mobile-first, otimizado para Android e iOS

### Funcionalidades Principais

1. **Login com Autocorreção**
   - Sugere correções automáticas (ex: gmail.con → gmail.com)
   - Sem senha, apenas email

2. **Grid de Lives**
   - Thumbnails em 2-3 colunas
   - Badge "LIVE" pulsante
   - Contador de espectadores

3. **Player Imersivo**
   - Fullscreen sem controles
   - Contador de espectadores oscilante (varia ±10 pessoas)
   - Gestos: swipe up (próxima live), swipe left (voltar)

4. **Perfil Completo**
   - Upload de foto (armazenada localmente)
   - Preferências de relacionamento
   - Canais de contato

## ⚙️ Como Adicionar/Editar Lives

### Método 1: Editar o Código Diretamente

Abra o arquivo `server/storage.ts` e localize a função `initializeDemoLives()`:

```typescript
private initializeDemoLives() {
  const demoLives: LiveStream[] = [
    {
      id: "1",                    // ID único
      title: "Título da Live",    // Nome exibido
      thumbnailUrl: "https://...", // URL da imagem (16:9)
      videoUrl: "https://...",    // URL do vídeo (MP4, HLS, etc)
      baseViewerCount: 87,        // Número base de espectadores
      category: "Categoria",      // Opcional
    },
    // Adicione mais lives aqui...
  ];
}
```

### Recomendações para URLs

**Thumbnails:**
- Formato: 16:9 (ex: 1280x720px)
- Hospedagem: Unsplash, Imgur, ou CDN próprio
- Tamanho: < 500KB para carregamento rápido

**Vídeos:**
- Formatos suportados: MP4, WebM, HLS (.m3u8)
- Hospedagem recomendada:
  - Vimeo (com link direto)
  - Google Cloud Storage
  - AWS S3
  - Cloudflare Stream
- **Importante**: URLs devem permitir CORS e autoplay

### Exemplo de Live Customizada

```typescript
{
  id: "custom-1",
  title: "Minha Live Especial",
  thumbnailUrl: "https://i.imgur.com/exemplo.jpg",
  videoUrl: "https://meu-cdn.com/video.mp4",
  baseViewerCount: 150,
  category: "Premium"
}
```

## 🚀 Deploy no EasyPanel via GitHub

### Passo 1: Preparar o Repositório GitHub

1. Crie um novo repositório no GitHub
2. Faça push do código:

```bash
git init
git add .
git commit -m "Initial commit - NOZEV MVP"
git branch -M main
git remote add origin https://github.com/seu-usuario/nozev.git
git push -u origin main
```

### Passo 2: Configurar no EasyPanel

1. **Login no EasyPanel**
   - Acesse seu painel EasyPanel
   - Crie um novo projeto

2. **Conectar GitHub**
   - Escolha "Deploy from GitHub"
   - Selecione o repositório `nozev`
   - Branch: `main`

3. **Configurações de Build**

```yaml
Build Command: npm install && npm run build
Start Command: npm run dev
Port: 5000
```

4. **Variáveis de Ambiente** (se necessário)

```bash
NODE_ENV=production
PORT=5000
```

5. **Domínio**
   - EasyPanel fornecerá um domínio automático: `nozev.easypanel.app`
   - Ou configure um domínio customizado

### Passo 3: Deploy Automático

- Cada push para `main` fará deploy automático
- Monitore os logs no painel do EasyPanel
- Acesse a URL fornecida

## 📦 Instalação Local

Para testar localmente antes do deploy:

```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev

# Acessar no navegador
http://localhost:5000
```

## 🎬 Guia para Gravações de Tela

### Fluxo Recomendado para Demo

1. **Abertura**
   - Mostre a tela de login
   - Digite um email (ex: demo@nozev.com)
   - Demonstre a autocorreção (digite gmail.con)

2. **Exploração**
   - Navegue pelo grid de lives
   - Mostre os badges "LIVE" e contadores
   - Clique em uma live para abrir o player

3. **Player Imersivo**
   - Destaque o contador oscilante de espectadores
   - Demonstre o swipe up para próxima live
   - Mostre o swipe left para voltar

4. **Navegação**
   - Acesse "Mensagens" (mostra manutenção)
   - Vá para "Perfil"
   - Preencha informações e preferências

5. **Encerramento**
   - Volte para Lives
   - Demonstre a fluidez da navegação

### Dicas de Gravação

- **Resolução**: 1080p (1920x1080) ou 4K
- **Frame Rate**: 60 FPS para animações suaves
- **Orientação**: Vertical para simular mobile, ou horizontal para desktop
- **Duração**: 30-90 segundos por feature
- **Áudio**: Narração explicando cada funcionalidade

## 🔧 Customização Avançada

### Alterar Cores do Tema

Edite `client/src/index.css`:

```css
.dark {
  --primary: 0 100% 50%;  /* Vermelho Netflix */
  --background: 0 0% 7%;   /* Preto profundo */
}
```

### Adicionar Novas Animações

Em `client/src/index.css`:

```css
@keyframes minha-animacao {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-minha-animacao {
  animation: minha-animacao 0.3s ease-out;
}
```

### Ajustar Tempo de Oscilação dos Espectadores

Em `client/src/pages/player.tsx`, linha ~30:

```typescript
setInterval(() => {
  setViewerCount((prev) => {
    const variance = Math.floor(Math.random() * 15) - 7; // ±7 pessoas
    // Ajuste os valores aqui
  });
}, 3000); // Intervalo em milissegundos
```

## 🐛 Solução de Problemas

### Vídeos não carregam
- Verifique se a URL permite CORS
- Teste o link direto no navegador
- Use vídeos hospedados em serviços confiáveis

### Thumbnails quebradas
- Confirme que as URLs são acessíveis publicamente
- Use formato HTTPS, não HTTP
- Valide o aspect ratio (16:9)

### App não inicia no EasyPanel
- Verifique os logs de build
- Confirme que `PORT=5000` está configurado
- Revise o comando de start

### Gestos de swipe não funcionam
- O swipe funciona apenas em dispositivos touch
- No desktop, use ferramentas de desenvolvedor (Device Mode)

## 📝 Notas Importantes

### ⚠️ Avisos Legais

Este é um **protótipo de demonstração** e:

- ❌ NÃO deve ser usado como aplicativo real
- ❌ NÃO há funcionalidade de transmissão ao vivo real
- ❌ NÃO coleta dados de usuários reais
- ✅ É APENAS para fins de marketing e apresentação
- ✅ Todos os dados são armazenados localmente (localStorage)
- ✅ Perfeito para capturas de tela e vídeos promocionais

### 🎯 Objetivo Final

Este MVP foi criado para:
- Gerar prova social antes do lançamento
- Criar expectativa de mercado
- Produzir materiais de marketing de alta qualidade
- Demonstrar o conceito visual da plataforma

## 📞 Suporte Técnico

Para dúvidas sobre customização ou deploy:
- Revise este manual completo
- Consulte os comentários no código
- Verifique `design_guidelines.md` para diretrizes de design

---

**NOZEV** - Plataforma de Lives Simuladas (MVP de Demonstração)
Versão 1.0.0 | Outubro 2025
