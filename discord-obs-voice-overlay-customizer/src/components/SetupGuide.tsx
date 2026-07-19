import React from 'react';
import { HelpCircle, ExternalLink, Settings, Monitor, Terminal, Copy, Check } from 'lucide-react';

export default function SetupGuide() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#15191d] text-gray-200 p-6 rounded-2xl border border-[#22272e] shadow-xl space-y-6">
      <div className="flex items-center gap-3 border-b border-[#22272e] pb-4">
        <div className="p-2 bg-[#5865f2] text-white rounded-lg">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Como Usar no OBS (Passo a Passo)</h2>
          <p className="text-xs text-gray-400">Configure tudo em menos de 5 minutos</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Passo 1 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0b0e11] flex items-center justify-center font-bold text-[#5865f2] border border-[#22272e]">
            1
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-white flex items-center gap-1.5 text-sm md:text-base">
              Ativar o Widget no Discord
              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            </h4>
            <p className="text-xs md:text-sm text-gray-400">
              No seu aplicativo do Discord, vá em <span className="text-gray-200 font-mono bg-[#0b0e11] px-1 py-0.5 rounded text-xs border border-[#22272e]">Configurações de Usuário &gt; Overlay de Jogo</span> e ative o overlay. 
              Depois vá em <span className="text-gray-200 font-mono bg-[#0b0e11] px-1 py-0.5 rounded text-xs border border-[#22272e]">Configurações &gt; Widgets</span> e marque a opção <span className="text-gray-200 font-medium">"Ativar widget de servidor"</span> para o servidor onde você quer pegar a voz.
            </p>
          </div>
        </div>

        {/* Passo 2 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0b0e11] flex items-center justify-center font-bold text-[#5865f2] border border-[#22272e]">
            2
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-white flex items-center gap-1.5 text-sm md:text-base">
              Acessar o Discord Streamkit Overlay
              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            </h4>
            <p className="text-xs md:text-sm text-gray-400">
              Acesse o site oficial do Discord Streamkit:{' '}
              <a 
                href="https://streamkit.discord.com/overlay" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#5865f2] hover:underline inline-flex items-center gap-0.5 font-medium"
              >
                streamkit.discord.com/overlay <ExternalLink className="w-3 h-3" />
              </a>
              . Clique em <span className="text-white font-medium">"Install for OBS"</span>, autorize o aplicativo e selecione a aba <span className="text-white font-medium">"Voice Widget"</span>. Selecione o seu Servidor e o Canal de Voz.
            </p>
          </div>
        </div>

        {/* Passo 3 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0b0e11] flex items-center justify-center font-bold text-[#5865f2] border border-[#22272e]">
            3
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-white text-sm md:text-base">Copiar o Link gerado</h4>
            <p className="text-xs md:text-sm text-gray-400">
              No canto inferior direito do site do Streamkit, você verá uma prévia do widget e um link de URL (ex: <code className="bg-[#0b0e11] px-1 py-0.5 rounded text-gray-300 font-mono text-xs border border-[#22272e]">https://streamkit.discord.com/overlay/voice/...</code>). Copie essa URL completa.
            </p>
          </div>
        </div>

        {/* Passo 4 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0b0e11] flex items-center justify-center font-bold text-[#5865f2] border border-[#22272e]">
            4
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-white text-sm md:text-base">Criar uma Fonte de Navegador no OBS</h4>
            <p className="text-xs md:text-sm text-gray-400">
              No seu OBS Studio:
            </p>
            <ul className="list-disc pl-5 text-xs text-gray-400 space-y-1 mt-1">
              <li>Clique no botão <span className="text-white font-bold">+</span> no painel de Fontes (Sources).</li>
              <li>Selecione <span className="text-white font-medium">Navegador (Browser)</span> e dê um nome (ex: "Voz Discord").</li>
              <li>No campo <span className="text-white font-medium">URL</span>, cole o link que você copiou no Passo 3.</li>
              <li>Defina a Largura (Width) para <span className="text-white font-mono font-medium">800</span> e Altura (Height) para <span className="text-white font-mono font-medium">600</span> (ou o tamanho que preferir para sua lista).</li>
            </ul>
          </div>
        </div>

        {/* Passo 5 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0b0e11] flex items-center justify-center font-bold text-[#5865f2] border border-[#22272e]">
            5
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-white text-sm md:text-base">Colar o CSS Personalizado</h4>
            <p className="text-xs md:text-sm text-gray-400">
              Nas propriedades dessa fonte de Navegador no OBS, role até o final onde diz <span className="text-white font-medium">"CSS Personalizado" (Custom CSS)</span>. Apague todo o conteúdo que estiver lá e cole o código CSS gerado aqui no aplicativo. Clique em <span className="text-white font-bold">OK</span>. Pronto!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0b0e11] p-4 rounded-xl border border-[#22272e] space-y-2">
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#5865f2]" /> Dica de Ouro: Como descobrir o ID do Discord do seu amigo?
        </h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          Para aplicar avatares customizados ou nicknames, você precisa do ID de Usuário do Discord (número longo de ~18 dígitos). 
          Ative o <span className="text-gray-200 font-medium">Modo Desenvolvedor</span> no seu Discord em <span className="text-gray-300">Configurações &gt; Avançado &gt; Modo Desenvolvedor</span>. 
          Depois, basta clicar com o botão direito na foto do seu amigo em qualquer chat ou canal de voz e selecionar <span className="text-white font-medium bg-[#15191d] px-1 py-0.5 rounded text-xs border border-[#22272e]">"Copiar ID de Usuário"</span>!
        </p>
      </div>
    </div>
  );
}
