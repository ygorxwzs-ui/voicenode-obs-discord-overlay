import React, { useState, useEffect } from 'react';
import { OverlayConfig, DEFAULT_CONFIG } from './types';
import { generateOverlayCSS } from './utils/cssGenerator';
import ConfigPanel from './components/ConfigPanel';
import Preview from './components/Preview';
import CSSOutput from './components/CSSOutput';
import SetupGuide from './components/SetupGuide';
import { 
  Volume2, Cpu, Sparkles, MessageSquare, Flame, 
  Tv, Compass, CheckCircle, Info, Heart
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'discord_obs_overlay_config_v2';

export default function App() {
  const [config, setConfig] = useState<OverlayConfig>(DEFAULT_CONFIG);

  // Load configuration from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge or restore
        if (parsed && typeof parsed === 'object') {
          setConfig({
            ...DEFAULT_CONFIG,
            ...parsed,
            // Ensure array matches
            customUsers: Array.isArray(parsed.customUsers) ? parsed.customUsers : DEFAULT_CONFIG.customUsers
          });
        }
      }
    } catch (e) {
      console.error('Failed to load config from localStorage', e);
    }
  }, []);

  // Save configuration to LocalStorage whenever it changes
  const handleConfigChange = (newConfig: OverlayConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
    }
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar todas as customizações para o padrão?')) {
      handleConfigChange(DEFAULT_CONFIG);
    }
  };

  // Pre-generate CSS to pass down
  const generatedCSS = generateOverlayCSS(config);

  return (
    <div className="min-h-screen bg-[#0b0e11] text-gray-200 font-sans selection:bg-[#5865f2] selection:text-white pb-16">
      
      {/* Top Banner Accent */}
      <div className="h-1.5 bg-gradient-to-r from-[#5865f2] via-purple-600 to-[#2eb086] w-full" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header Block */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#22272e]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#5865f2]/10 text-[#5865f2] rounded-xl border border-[#5865f2]/20">
                <Tv className="w-6 h-6 animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold font-display text-white tracking-tight sm:text-3xl">
                Discord OBS Voice Overlay Customizer
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
              Crie overlays de voz extremamente leves e 100% customizados para a sua live. Substitua avatares usando arquivos locais, altere apelidos e adicione animações de fala incríveis.
            </p>
          </div>
          
          {/* Status Label (Aesthetic & Practical) */}
          <div className="flex items-center gap-2 bg-[#15191d] border border-[#22272e] px-4 py-2 rounded-2xl shadow-md flex-shrink-0">
            <div className="w-2.5 h-2.5 bg-[#2eb086] rounded-full animate-pulse shadow-[0_0_8px_#2eb086]" />
            <div className="text-left">
              <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider leading-none">Status</span>
              <span className="text-xs font-semibold text-white">Pronto para o OBS</span>
            </div>
          </div>
        </header>

        {/* Informative Alert Box */}
        <div className="bg-[#15191d]/85 backdrop-blur-md border border-[#22272e] p-4 rounded-2xl flex items-start gap-3 shadow-lg">
          <Info className="w-5 h-5 text-[#5865f2] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white">Como isso funciona e por que é melhor?</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Diferente de overlays pesados de terceiros, esta ferramenta utiliza o próprio widget nativo do <strong>Discord Streamkit</strong> carregado pelo OBS, aplicando um arquivo de <strong>CSS Personalizado</strong> por cima. É incrivelmente leve, não consome CPU do seu computador, é integrado ao aplicativo do seu Discord e, com as nossas regras inteligentes, permite trocar imagens (mesmo arquivos locais) e apelidos em tempo real!
            </p>
          </div>
        </div>

        {/* Bento Grid Content */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: Configurator (Left Side) */}
          <section className="lg:col-span-5 space-y-6">
            <div className="h-[620px] lg:sticky lg:top-6">
              <ConfigPanel 
                config={config} 
                onChange={handleConfigChange} 
                onReset={handleReset} 
              />
            </div>
          </section>

          {/* Column 2: Preview & CSS Code (Right Side) */}
          <section className="lg:col-span-7 space-y-6">
            
            {/* Live Render Preview */}
            <div className="h-[460px]">
              <Preview config={config} />
            </div>

            {/* Generated CSS Display & Base64 Encoder */}
            <CSSOutput css={generatedCSS} />

            {/* Step-by-Step Brazilian Portuguese Tutorial */}
            <SetupGuide />
            
          </section>
        </main>

        {/* Footer */}
        <footer className="pt-8 border-t border-[#22272e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span>Desenvolvido para Streamers com</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>e React + Vite</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px]">Versão 2.4.0-Stable</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
