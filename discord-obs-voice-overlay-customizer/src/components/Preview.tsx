import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Monitor, User, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { OverlayConfig } from '../types';
import { generateOverlayCSS } from '../utils/cssGenerator';

interface PreviewProps {
  config: OverlayConfig;
}

export default function Preview({ config }: PreviewProps) {
  // Local state to track which user is speaking in the simulation
  const [speakingUsers, setSpeakingUsers] = useState<Record<string, boolean>>({
    '123456789012345678': true, // Streamer starts speaking
    '987654321098765432': false,
  });

  const [isAutoSimulating, setIsAutoSimulating] = useState(false);
  const simIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle speaking state of a specific user manually
  const toggleSpeaking = (userId: string) => {
    setSpeakingUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Auto Conversation Simulator
  useEffect(() => {
    if (isAutoSimulating) {
      simIntervalRef.current = setInterval(() => {
        setSpeakingUsers(prev => {
          const next = { ...prev };
          // Randomly toggle speaking states
          config.customUsers.forEach(user => {
            if (user.id) {
              const rand = Math.random();
              // Streamer talks 40% of the time, friends 25% of the time
              const isStreamer = user.name.includes('Você');
              next[user.id] = isStreamer ? rand < 0.45 : rand < 0.25;
            }
          });
          return next;
        });
      }, 1200);
    } else {
      if (simIntervalRef.current) {
        clearInterval(simIntervalRef.current);
      }
    }

    return () => {
      if (simIntervalRef.current) {
        clearInterval(simIntervalRef.current);
      }
    };
  }, [isAutoSimulating, config.customUsers]);

  // Generate the actual CSS rules to inject locally for pixel-perfect simulation
  const injectedCSS = generateOverlayCSS(config);

  return (
    <div className="bg-[#15191d] rounded-2xl border border-[#22272e] shadow-xl overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#0b0e11] px-6 py-4 border-b border-[#22272e] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-[#2eb086]" />
          <div>
            <h3 className="text-sm font-semibold text-white">Visualização OBS (Ao Vivo)</h3>
            <p className="text-xs text-gray-400">Prévia fiel de como ficará na sua Stream</p>
          </div>
        </div>
        
        {/* Toggle simulation auto button */}
        <button
          onClick={() => setIsAutoSimulating(!isAutoSimulating)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
            isAutoSimulating
              ? 'bg-[#2eb086]/10 text-[#2eb086] border border-[#2eb086]/20'
              : 'bg-[#15191d] hover:bg-[#22272e] text-gray-300 border border-[#22272e]'
          }`}
        >
          {isAutoSimulating ? (
            <>
              <Pause className="w-3.5 h-3.5 animate-pulse" />
              Simulador Ativo
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Simular Conversa
            </>
          )}
        </button>
      </div>

      {/* Main OBS Screen Simulation Area */}
      <div className="relative flex-1 bg-[radial-gradient(circle_at_center,_#15191D_0%,_#0B0E11_100%)] flex items-center justify-center min-h-[300px] overflow-hidden p-6 border-2 border-dashed border-[#22272e]/50 rounded-xl m-4">
        {/* Scoped Dynamic Stylesheet */}
        <style dangerouslySetInnerHTML={{ __html: injectedCSS }} />

        {/* Dynamic Widget Container (Replicating Discord Streamkit exactly) */}
        <div className="w-full h-full max-w-full flex items-start justify-start relative">
          <ul className="voice-states">
            {config.customUsers.map(user => {
              const isSpeaking = !!speakingUsers[user.id];
              return (
                <li
                  key={user.id || Math.random().toString()}
                  className={`voice-state ${isSpeaking ? 'speaking' : ''}`}
                  data-userid={user.id}
                  id={`mock-user-${user.id}`}
                >
                  <img
                    className={`avatar ${isSpeaking ? 'speaking' : ''}`}
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={user.customName || user.name}
                    referrerPolicy="no-referrer"
                  />
                  <span className="name">{user.customName || user.name}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Overlay Transparency Grid hint */}
        <div className="absolute bottom-3 right-3 bg-[#0b0e11]/85 backdrop-blur-md border border-[#22272e] px-2.5 py-1 rounded-lg text-[10px] text-gray-400 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[#2eb086] rounded-full animate-ping"></span>
          Fundo do OBS Transparente
        </div>
      </div>

      {/* Manual Voice Controls Panel */}
      <div className="bg-[#0b0e11] p-4 border-t border-[#22272e] flex-shrink-0">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-3">
          Controle de Voz Manual (Clique para testar falar)
        </span>
        <div className="flex flex-wrap gap-2">
          {config.customUsers.map(user => {
            const isSpeaking = !!speakingUsers[user.id];
            return (
              <button
                key={user.id}
                onClick={() => toggleSpeaking(user.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-[#2eb086]/10 text-[#2eb086] border-[#2eb086]/20 shadow-[0_0_8px_rgba(46,176,134,0.15)]'
                    : 'bg-[#15191d] text-gray-400 border-[#22272e] hover:text-gray-300 hover:bg-[#22272e]'
                }`}
              >
                {isSpeaking ? (
                  <Mic className="w-3.5 h-3.5 text-[#2eb086]" />
                ) : (
                  <MicOff className="w-3.5 h-3.5 text-gray-500" />
                )}
                <span className="truncate max-w-[100px]">
                  {user.customName || user.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
