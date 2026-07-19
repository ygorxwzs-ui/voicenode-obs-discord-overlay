# voicenode-obs-discord-overlay
🎙️ Um customizador visual completo e elegante para o overlay de voz do Discord Streamkit no OBS. Gere códigos CSS personalizados com animações de fala, avatares locais via Base64 e fontes modernas em segundos!

# 🎙️ VoiceNode — Discord OBS Overlay Customizer

<p align="center">
  <img src="https://img.shields.io/badge/Status-Pronto%20para%20o%20OBS-2eb086?style=for-the-badge&logo=obsstudio&logoColor=white" />
  <img src="https://img.shields.io/badge/UI-Elegant%20Dark-15191d?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Tecnologias-React%20%7C%20Vite%20%7C%20Tailwind%2520CSS-5865f2?style=for-the-badge&logo=react&logoColor=white" />
</p>

---

### ✨ Deixe a call do Discord na sua stream com a cara do seu canal!

O **VoiceNode** é uma ferramenta web interativa projetada para streamers que querem ir muito além do visual básico do Discord Streamkit Overlay. Com um configurador visual moderno em tempo real, você cria estilos customizados (CSS) profissionais sem precisar escrever uma única linha de código.

---

## 🚀 Funcionalidades Principais (Features)

*   **🎨 Customização de Layout e Formatos**
    *   [x] Escolha entre formato **Redondo**, **Quadrado** ou **Bordas Arredondadas (Squircle)**.
    *   [x] Controle deslizante de **tamanho de avatar** e **espaçamento** entre membros.
    *   [x] Alternação rápida entre layouts de empilhamento vertical ou horizontal.

*   **🔥 Indicador Dinâmico de Fala & Brilhos**
    *   [x] Defina a cor exata do brilho ativo quando o membro estiver falando.
    *   [x] Ajuste a opacidade de quem está calado ou **oculte membros inativos** automaticamente.
    *   [x] Espessura da borda e intensidade do brilho personalizáveis.

*   **⚡ Animações Ativas de Voz**
    *   [x] Efeitos de animação selecionáveis: **Salto (Bounce)**, **Pulsação de Brilho (Glow)** ou **Zoom Suave (Scale)**.
    *   [x] Controle total da velocidade de animação em segundos.

*   **👥 Substituição de Fotos e Nomes (Sem depender de bots)**
    *   [x] Adicione o ID do Discord de cada membro para substituir a foto de perfil por qualquer imagem local.
    *   [x] Altere o apelido de exibição na stream independente do nome dele no Discord.

*   **🪄 Conversor Base64 Embutido**
    *   [x] Envie suas fotos locais diretamente na ferramenta. Ela converte em Base64 para que o CSS gerado seja **autossuficiente** (sem risco de links de imagens quebrarem ou expirarem no OBS!).

*   **🔴 Simulador de Voz Ao Vivo (Interactive Preview)**
    *   [x] Área de prévia idêntica ao OBS Studio com controles de clique manual de voz para você testar como fica a animação antes de aplicar.

---

## 🛠️ Como Usar na Stream?

1.  **Ative o Widget**: Vá em *Configurações do Discord > Widgets* e ative o widget de voz do servidor.
2.  **Copie o link do Streamkit**: Acesse [streamkit.discord.com/overlay](https://streamkit.discord.com/overlay), selecione seu servidor e canal de voz, e copie a URL gerada no canto inferior direito.
3.  **Adicione a URL no OBS**: Crie uma fonte de **Navegador (Browser Source)** no OBS e cole a URL do Discord Streamkit.
4.  **Estilize no VoiceNode**: Abra o configurador do **VoiceNode**, ajuste o visual até ficar perfeito e clique em **Copiar CSS**.
5.  **Cole o Estilo no OBS**: Nas propriedades da fonte de Navegador do OBS, cole o código copiado no campo **CSS Personalizado (Custom CSS)**. Prontinho!

---

## 💻 Tecnologias Utilizadas

*   **React 18** com **TypeScript** para reatividade rápida e segura.
*   **Vite** como empacotador ultrarrápido de desenvolvimento.
*   **Tailwind CSS** para um design estético refinado no tema *Elegant Dark*.
*   **Lucide React** para um conjunto moderno e limpo de ícones de interface.
