import React, { useState } from 'react';
import { 
  Settings, Layout, Volume2, Type, Users, Plus, Trash2, 
  Upload, HelpCircle, Sparkles, Sliders, Palette, RefreshCw
} from 'lucide-react';
import { OverlayConfig, CustomUser, LayoutMode, AvatarShape, AnimationType, TextPosition } from '../types';

interface ConfigPanelProps {
  config: OverlayConfig;
  onChange: (config: OverlayConfig) => void;
  onReset: () => void;
}

type TabType = 'layout' | 'speaking' | 'names' | 'users';

export default function ConfigPanel({ config, onChange, onReset }: ConfigPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('layout');

  // Helper to update a single key in the config
  const updateConfig = <K extends keyof OverlayConfig>(key: K, value: OverlayConfig[K]) => {
    onChange({
      ...config,
      [key]: value
    });
  };

  // User list actions
  const handleUserChange = (index: number, updatedUser: CustomUser) => {
    const nextUsers = [...config.customUsers];
    nextUsers[index] = updatedUser;
    updateConfig('customUsers', nextUsers);
  };

  const handleAddUser = () => {
    const newUser: CustomUser = {
      id: Math.floor(Math.random() * 100000000000000000).toString(),
      name: `Amigo ${config.customUsers.length + 1}`,
      customName: '',
      avatarUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150',
      avatarName: 'Default User'
    };
    updateConfig('customUsers', [...config.customUsers, newUser]);
  };

  const handleRemoveUser = (index: number) => {
    const nextUsers = config.customUsers.filter((_, i) => i !== index);
    updateConfig('customUsers', nextUsers);
  };

  const handleAvatarUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          handleUserChange(index, {
            ...config.customUsers[index],
            avatarUrl: e.target.result as string,
            avatarName: file.name
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#15191d] rounded-2xl border border-[#22272e] shadow-xl overflow-hidden flex flex-col h-full">
      {/* Configuration Header */}
      <div className="bg-[#0b0e11] px-6 py-4 border-b border-[#22272e] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#5865f2]" />
          <div>
            <h3 className="text-sm font-semibold text-white">Configurar Overlay</h3>
            <p className="text-xs text-gray-400">Personalize o comportamento e o estilo</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white bg-[#15191d] hover:bg-[#22272e] px-2.5 py-1.5 rounded-lg border border-[#22272e] transition-all cursor-pointer"
          title="Resetar para as configurações padrão"
        >
          <RefreshCw className="w-3 h-3" />
          Padrão
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-[#22272e] bg-[#15191d] p-1 gap-1 flex-shrink-0">
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'layout'
              ? 'bg-[#22272e] text-[#5865f2] border-b-2 border-[#5865f2]'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#22272e]/50'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Disposição</span>
        </button>
        <button
          onClick={() => setActiveTab('speaking')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'speaking'
              ? 'bg-[#22272e] text-[#2eb086] border-b-2 border-[#2eb086]'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#22272e]/50'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Voz & Brilho</span>
        </button>
        <button
          onClick={() => setActiveTab('names')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'names'
              ? 'bg-[#22272e] text-amber-500 border-b-2 border-amber-500'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#22272e]/50'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nomes</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'users'
              ? 'bg-[#22272e] text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#22272e]/50'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Membros</span>
        </button>
      </div>

      {/* Settings Form Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0b0e11]/40">
        
        {/* TAB 1: LAYOUT & SIZES */}
        {activeTab === 'layout' && (
          <div className="space-y-5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#5865f2]" /> Configurações de Formato e Estrutura
            </h4>

            {/* Layout selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300">Layout da Lista</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'vertical', label: 'Vertical', desc: 'Em coluna' },
                  { id: 'horizontal', label: 'Horizontal', desc: 'Em linha' },
                  { id: 'grid', label: 'Grade (Grid)', desc: 'Multicoluna' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => updateConfig('layout', item.id as LayoutMode)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      config.layout === item.id
                        ? 'bg-[#5865f2]/10 border-[#5865f2] text-white'
                        : 'bg-[#0b0e11] border-[#22272e] text-gray-400 hover:text-gray-200 hover:border-gray-700'
                    }`}
                  >
                    <span className="text-xs font-semibold">{item.label}</span>
                    <span className="text-[10px] text-gray-500 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar Shape selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300">Formato da Foto (Avatar)</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'circle', label: 'Círculo' },
                  { id: 'rounded', label: 'Arredondado' },
                  { id: 'squircle', label: 'Superelipse' },
                  { id: 'square', label: 'Quadrado' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => updateConfig('avatarShape', item.id as AvatarShape)}
                    className={`p-2.5 text-xs font-semibold rounded-xl border text-center cursor-pointer transition-all ${
                      config.avatarShape === item.id
                        ? 'bg-[#5865f2]/10 border-[#5865f2] text-white'
                        : 'bg-[#0b0e11] border-[#22272e] text-gray-400 hover:text-gray-200 hover:border-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar size slider */}
            <div className="space-y-2 bg-[#0b0e11] p-4 rounded-xl border border-[#22272e]">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-300">Tamanho da Foto (Avatar)</label>
                <span className="text-xs font-mono font-semibold text-[#5865f2]">{config.avatarSize}px</span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                value={config.avatarSize}
                onChange={(e) => updateConfig('avatarSize', parseInt(e.target.value))}
                className="w-full accent-[#5865f2]"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>Pequeno (40px)</span>
                <span>Grande (150px)</span>
              </div>
            </div>

            {/* Spacing slider */}
            <div className="space-y-2 bg-[#0b0e11] p-4 rounded-xl border border-[#22272e]">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-300">Espaçamento entre Membros</label>
                <span className="text-xs font-mono font-semibold text-[#5865f2]">{config.spacing}px</span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                value={config.spacing}
                onChange={(e) => updateConfig('spacing', parseInt(e.target.value))}
                className="w-full accent-[#5865f2]"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>Compacto (2px)</span>
                <span>Espaçado (40px)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SPEAKING EFFECTS & GLOW */}
        {activeTab === 'speaking' && (
          <div className="space-y-5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#2eb086]" /> Indicador Ativo de Fala & Brilho
            </h4>

            {/* Glow Color Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 bg-[#0b0e11] p-3 rounded-xl border border-[#22272e]">
                <label className="text-xs font-medium text-gray-300 block mb-1">Cor do Brilho (Fala)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.glowColor}
                    onChange={(e) => updateConfig('glowColor', e.target.value)}
                    className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.glowColor}
                    onChange={(e) => updateConfig('glowColor', e.target.value)}
                    className="flex-1 bg-[#0b0e11] border border-[#22272e] rounded-lg py-1 px-2.5 text-xs font-mono text-white"
                  />
                </div>
              </div>

              {/* Inactive Opacity */}
              <div className="space-y-2 bg-[#0b0e11] p-3 rounded-xl border border-[#22272e]">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-gray-300">Opacidade Inativa</label>
                  <span className="text-xs font-mono font-semibold text-[#2eb086]">{Math.round(config.inactiveOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={config.inactiveOpacity}
                  disabled={config.hideInactive}
                  onChange={(e) => updateConfig('inactiveOpacity', parseFloat(e.target.value))}
                  className="w-full accent-[#2eb086] disabled:opacity-30"
                />
                <span className="text-[10px] text-gray-500 block leading-tight">Opacidade de quem está calado</span>
              </div>
            </div>

            {/* Hide Inactive option */}
            <div className="bg-[#0b0e11] p-4 rounded-xl border border-[#22272e] flex items-center justify-between">
              <div className="space-y-0.5 max-w-[80%]">
                <label className="text-xs font-semibold text-white block">Esconder Silenciados (Ocultar)</label>
                <p className="text-[10px] text-gray-400 leading-normal">
                  Se ativado, apenas a pessoa que estiver falando aparecerá na tela do OBS. Ótimo para overlay minimalista de podcasts ou gameplays.
                </p>
              </div>
              <input
                type="checkbox"
                checked={config.hideInactive}
                onChange={(e) => updateConfig('hideInactive', e.target.checked)}
                className="w-5 h-5 rounded accent-[#2eb086] cursor-pointer"
              />
            </div>

            {/* Border glow parameters */}
            <div className="space-y-4 bg-[#0b0e11] p-4 rounded-xl border border-[#22272e]">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-gray-300">Espessura da Borda</label>
                  <span className="text-xs font-mono font-semibold text-[#2eb086]">{config.glowSize}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={config.glowSize}
                  onChange={(e) => updateConfig('glowSize', parseInt(e.target.value))}
                  className="w-full accent-[#2eb086]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-gray-300">Intensidade do Brilho (Glow)</label>
                  <span className="text-xs font-mono font-semibold text-[#2eb086]">{config.glowIntensity}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={config.glowIntensity}
                  onChange={(e) => updateConfig('glowIntensity', parseInt(e.target.value))}
                  className="w-full accent-[#2eb086]"
                />
              </div>
            </div>

            {/* Speaking Animations */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300">Efeito / Animação de Fala</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'Sem efeito', desc: 'Fica estático' },
                  { id: 'pulse', label: 'Pulso Suave', desc: 'Aumenta tamanho' },
                  { id: 'glow-pulse', label: 'Brilho Pulsante', desc: 'Pulsa o brilho' },
                  { id: 'bounce', label: 'Pulo (Bouncy)', desc: 'Pula para cima' },
                  { id: 'shake', label: 'Tremor (Shake)', desc: 'Treme de emoção' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => updateConfig('animation', item.id as AnimationType)}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                      config.animation === item.id
                        ? 'bg-[#2eb086]/10 border-[#2eb086] text-white font-medium'
                        : 'bg-[#0b0e11] border-[#22272e] text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <span className="text-xs font-semibold">{item.label}</span>
                    <span className="text-[9px] text-gray-500 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Speed selection */}
            {config.animation !== 'none' && (
              <div className="space-y-2 bg-[#0b0e11] p-4 rounded-xl border border-[#22272e]">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-gray-300">Velocidade da Animação</label>
                  <span className="text-xs font-mono font-semibold text-[#2eb086]">{config.animationSpeed}s</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.1"
                  value={config.animationSpeed}
                  onChange={(e) => updateConfig('animationSpeed', parseFloat(e.target.value))}
                  className="w-full accent-[#2eb086]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>Rápido (0.2s)</span>
                  <span>Lento (2.0s)</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DISPLAY NAMES */}
        {activeTab === 'names' && (
          <div className="space-y-5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-amber-500" /> Customização de Nomes e Letras
            </h4>

            {/* Toggle show names */}
            <div className="bg-[#0b0e11] p-4 rounded-xl border border-[#22272e] flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-xs font-semibold text-white block">Mostrar nomes dos membros</label>
                <p className="text-[10px] text-gray-400">Desative para mostrar apenas os avatares na tela</p>
              </div>
              <input
                type="checkbox"
                checked={config.showNames}
                onChange={(e) => updateConfig('showNames', e.target.checked)}
                className="w-5 h-5 rounded accent-amber-500 cursor-pointer"
              />
            </div>

            {config.showNames && (
              <>
                {/* Name Position selection */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300">Posição do Nome</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'right', label: 'Na Direita' },
                      { id: 'left', label: 'Na Esquerda' },
                      { id: 'below', label: 'Abaixo da Foto' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => updateConfig('namePosition', item.id as TextPosition)}
                        className={`p-2.5 text-xs font-semibold rounded-xl border text-center cursor-pointer transition-all ${
                          config.namePosition === item.id
                            ? 'bg-amber-500/10 border-amber-500 text-white'
                            : 'bg-[#0b0e11] border-[#22272e] text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font and Colors */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Font Family selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400">Fonte (Letra)</label>
                    <select
                      value={config.fontFamily}
                      onChange={(e) => updateConfig('fontFamily', e.target.value)}
                      className="w-full bg-[#0b0e11] border border-[#22272e] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Inter">Inter (Padrão)</option>
                      <option value="Space Grotesk">Space Grotesk (Gamer)</option>
                      <option value="JetBrains Mono">JetBrains Mono (Sleek)</option>
                      <option value="Arial">Arial (Simples)</option>
                      <option value="Impact">Impact (Forte)</option>
                    </select>
                  </div>

                  {/* Font size */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400">Tamanho da Letra ({config.fontSize}px)</label>
                    <input
                      type="range"
                      min="10"
                      max="32"
                      value={config.fontSize}
                      onChange={(e) => updateConfig('fontSize', parseInt(e.target.value))}
                      className="w-full h-8 accent-amber-500"
                    />
                  </div>
                </div>

                {/* Colors block */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2 bg-[#0b0e11] p-3 rounded-xl border border-[#22272e]">
                    <label className="text-xs text-gray-300 block mb-1">Cor do Nome</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.fontColor}
                        onChange={(e) => updateConfig('fontColor', e.target.value)}
                        className="w-6 h-6 rounded border-0 cursor-pointer"
                      />
                      <span className="text-[11px] font-mono text-gray-400 uppercase">{config.fontColor}</span>
                    </div>
                  </div>

                  <div className="space-y-2 bg-[#0b0e11] p-3 rounded-xl border border-[#22272e]">
                    <label className="text-xs text-gray-300 block mb-1">Cor do Fundo</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.textBgColor}
                        onChange={(e) => updateConfig('textBgColor', e.target.value)}
                        className="w-6 h-6 rounded border-0 cursor-pointer"
                      />
                      <span className="text-[11px] font-mono text-gray-400 uppercase">{config.textBgColor}</span>
                    </div>
                  </div>
                </div>

                {/* Text Background opacity */}
                <div className="space-y-2 bg-[#0b0e11] p-4 rounded-xl border border-[#22272e]">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-gray-300">Opacidade da Tarja (Fundo)</label>
                    <span className="text-xs font-mono font-semibold text-amber-500">{Math.round(config.textBgOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.0"
                    step="0.1"
                    value={config.textBgOpacity}
                    onChange={(e) => updateConfig('textBgOpacity', parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>Transparente (0%)</span>
                    <span>Sólido (100%)</span>
                  </div>
                </div>

                {/* Shadow Check */}
                <div className="bg-[#0b0e11] px-4 py-3 rounded-xl border border-[#22272e] flex items-center justify-between">
                  <label className="text-xs text-gray-300">Adicionar sombra na letra (Text Shadow)</label>
                  <input
                    type="checkbox"
                    checked={config.textShadow}
                    onChange={(e) => updateConfig('textShadow', e.target.checked)}
                    className="w-4.5 h-4.5 accent-amber-500 cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 4: CUSTOM MEMBERS & AVATARS */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" /> Gerenciar Amigos & Substitutos
              </h4>
              <button
                onClick={handleAddUser}
                className="flex items-center gap-1 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-xl cursor-pointer transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Amigo
              </button>
            </div>

            <p className="text-[11px] text-gray-400 leading-normal bg-purple-500/5 p-3 rounded-xl border border-purple-500/10">
              💡 Aqui você adiciona o <strong>ID do Discord</strong> de cada amigo para substituir o avatar padrão por fotos personalizadas ou alterar o apelido deles que vai aparecer na tela.
            </p>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {config.customUsers.map((user, index) => (
                <div 
                  key={user.id} 
                  className="bg-[#0b0e11] p-4 rounded-2xl border border-[#22272e] space-y-3 relative group"
                >
                  {/* Delete button */}
                  <button
                    onClick={() => handleRemoveUser(index)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-400 p-1 hover:bg-[#15191d] rounded-lg cursor-pointer transition-all"
                    title="Remover este usuário"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3">
                    {/* User Profile Avatar Thumbnail */}
                    <div className="relative">
                      <img
                        src={user.avatarUrl || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150'}
                        alt={user.name}
                        className="w-12 h-12 rounded-xl object-cover border border-purple-500/30"
                        referrerPolicy="no-referrer"
                      />
                      <label 
                        htmlFor={`file-upload-${index}`}
                        className="absolute -bottom-1 -right-1 bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-md cursor-pointer border border-[#0b0e11] transition-all shadow-md"
                        title="Fazer Upload de Foto Local"
                      >
                        <Upload className="w-3 h-3" />
                        <input
                          type="file"
                          id={`file-upload-${index}`}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleAvatarUpload(index, e)}
                        />
                      </label>
                    </div>

                    <div className="flex-1 min-w-0 pr-8">
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleUserChange(index, { ...user, name: e.target.value })}
                        className="bg-transparent border-b border-transparent hover:border-gray-700 focus:border-purple-500 text-sm font-semibold text-white focus:outline-none w-full py-0.5 truncate"
                        placeholder="Identificação (ex: Amigo)"
                      />
                      <p className="text-[10px] text-gray-500 truncate max-w-[150px]">
                        {user.avatarName || 'Imagem Externa'}
                      </p>
                    </div>
                  </div>

                  {/* Discord ID & Custom Nickname Fields */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                        Discord User ID
                      </label>
                      <input
                        type="text"
                        value={user.id}
                        onChange={(e) => handleUserChange(index, { ...user, id: e.target.value.trim() })}
                        placeholder="ID do Usuário"
                        className="w-full bg-[#0b0e11] border border-[#22272e] rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-gray-400">Apelido no OBS</label>
                      <input
                        type="text"
                        value={user.customName}
                        onChange={(e) => handleUserChange(index, { ...user, customName: e.target.value })}
                        placeholder="Apelido na Stream"
                        className="w-full bg-[#0b0e11] border border-[#22272e] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {config.customUsers.length === 0 && (
                <div className="text-center py-10 text-gray-500 space-y-2 border-2 border-dashed border-[#22272e] rounded-xl">
                  <Users className="w-8 h-8 mx-auto text-gray-600" />
                  <p className="text-xs">Nenhum membro configurado.</p>
                  <button
                    onClick={handleAddUser}
                    className="text-xs font-bold text-purple-400 hover:underline"
                  >
                    Adicionar Amigo agora
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
