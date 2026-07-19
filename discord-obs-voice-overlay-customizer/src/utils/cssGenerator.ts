import { OverlayConfig } from '../types';

export function hexToRgba(hex: string, opacity: number): string {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
    : `rgba(0, 0, 0, ${opacity})`;
}

export function generateOverlayCSS(config: OverlayConfig): string {
  const rgbaBg = hexToRgba(config.textBgColor, config.textBgOpacity);
  
  // Layout specific styles
  let layoutCSS = '';
  if (config.layout === 'vertical') {
    layoutCSS = `  display: flex !important;
  flex-direction: column !important;
  gap: ${config.spacing}px !important;`;
  } else if (config.layout === 'horizontal') {
    layoutCSS = `  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  gap: ${config.spacing}px !important;`;
  } else if (config.layout === 'grid') {
    layoutCSS = `  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(${config.avatarSize + 40}px, 1fr)) !important;
  gap: ${config.spacing}px !important;`;
  }

  // Name position layout styles
  let namePosCSS = '';
  if (config.showNames && config.namePosition !== 'hide') {
    if (config.namePosition === 'right') {
      namePosCSS = `  flex-direction: row !important;
  align-items: center !important;`;
    } else if (config.namePosition === 'left') {
      namePosCSS = `  flex-direction: row-reverse !important;
  align-items: center !important;`;
    } else if (config.namePosition === 'below') {
      namePosCSS = `  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;`;
    }
  }

  // Name spacing styles
  let nameSpacingCSS = '';
  if (config.namePosition === 'right') {
    nameSpacingCSS = `margin-left: 10px !important; margin-right: 0 !important; margin-top: 0 !important;`;
  } else if (config.namePosition === 'left') {
    nameSpacingCSS = `margin-right: 10px !important; margin-left: 0 !important; margin-top: 0 !important;`;
  } else if (config.namePosition === 'below') {
    nameSpacingCSS = `margin-top: 8px !important; margin-left: 0 !important; margin-right: 0 !important;`;
  }

  // Shape radius
  let shapeRadius = '50%';
  if (config.avatarShape === 'rounded') shapeRadius = '12px';
  else if (config.avatarShape === 'squircle') shapeRadius = '20px';
  else if (config.avatarShape === 'square') shapeRadius = '0px';

  // Animation CSS declaration
  let animationProperty = 'none !important';
  let keyframesDeclaration = '';
  
  if (config.animation === 'bounce') {
    animationProperty = `oscar-bounce ${config.animationSpeed}s infinite ease-in-out !important`;
    keyframesDeclaration = `@keyframes oscar-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}`;
  } else if (config.animation === 'pulse') {
    animationProperty = `oscar-pulse ${config.animationSpeed}s infinite ease-in-out !important`;
    keyframesDeclaration = `@keyframes oscar-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}`;
  } else if (config.animation === 'glow-pulse') {
    animationProperty = `oscar-glow-pulse ${config.animationSpeed}s infinite ease-in-out !important`;
    keyframesDeclaration = `@keyframes oscar-glow-pulse {
  0%, 100% { box-shadow: 0 0 ${config.glowIntensity}px ${config.glowColor} !important; }
  50% { box-shadow: 0 0 ${config.glowIntensity * 2.5}px ${config.glowColor} !important; transform: scale(1.03); }
}`;
  } else if (config.animation === 'shake') {
    animationProperty = `oscar-shake ${config.animationSpeed}s infinite linear !important`;
    keyframesDeclaration = `@keyframes oscar-shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
}`;
  }

  // Custom User Styles
  let customUsersCSS = '';
  if (config.customUsers && config.customUsers.length > 0) {
    config.customUsers.forEach(user => {
      if (!user.id.trim()) return;
      
      customUsersCSS += `\n/* === Customizações para ${user.name || user.id} === */\n`;
      
      // Avatar Replacement
      if (user.avatarUrl.trim()) {
        customUsersCSS += `li.voice-state[data-userid="${user.id.trim()}"] img.avatar,
img[src*="${user.id.trim()}"] {
  content: url("${user.avatarUrl.trim()}") !important;
}\n`;
      }
      
      // Custom display name replacement
      if (user.customName.trim()) {
        customUsersCSS += `li.voice-state[data-userid="${user.id.trim()}"] span.name,
img[src*="${user.id.trim()}"] + span.name {
  font-size: 0px !important;
  padding: 0px !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
li.voice-state[data-userid="${user.id.trim()}"] span.name::after,
img[src*="${user.id.trim()}"] + span.name::after {
  content: "${user.customName.trim()}" !important;
  font-size: ${config.fontSize}px !important;
  color: ${config.fontColor} !important;
  font-family: "${config.fontFamily}", "Inter", sans-serif !important;
  background-color: ${rgbaBg} !important;
  padding: 4px 8px !important;
  border-radius: 4px !important;
  display: inline-block !important;
  line-height: normal !important;
  ${config.textShadow ? 'text-shadow: 1px 1px 2px rgba(0,0,0,0.8) !important;' : ''}
}\n`;
      }
    });
  }

  // Build full CSS
  return `/* =========================================================
   COLOQUE ESTE CÓDIGO NO SEU OBS EM "CSS PERSONALIZADO"
   Gerado pelo Discord OBS Voice Overlay Customizer
   ========================================================= */

/* Limpeza de fundo e barra de rolagem */
body {
  background-color: rgba(0, 0, 0, 0) !important;
  overflow: hidden !important;
  margin: 0px !important;
}

/* Configuração do container de estados de voz */
ul.voice-states,
div.voice-states {
  margin: 0px !important;
  padding: 0px !important;
  list-style: none !important;
${layoutCSS}
}

/* Layout de cada linha de voz do usuário */
li.voice-state {
${namePosCSS}
  margin: 0px !important;
  padding: 0px !important;
  transition: opacity 0.3s ease, transform 0.2s ease !important;
}

/* Esconder usuários inativos / silenciados se ativado */
${config.hideInactive ? `
li.voice-state {
  display: none !important;
}
li.voice-state.speaking {
  display: flex !important;
}
` : `
li.voice-state:not(.speaking) {
  opacity: ${config.inactiveOpacity} !important;
}
li.voice-state.speaking {
  opacity: 1 !important;
}
`}

/* Customização básica do Avatar */
img.avatar,
.avatar {
  width: ${config.avatarSize}px !important;
  height: ${config.avatarSize}px !important;
  border-radius: ${shapeRadius} !important;
  border: ${config.glowSize}px solid transparent !important;
  box-sizing: border-box !important;
  transition: all 0.2s ease !important;
}

/* Estado ativo: QUANDO O USUÁRIO FALA */
img.speaking,
li.voice-state.speaking img.avatar {
  border-color: ${config.glowColor} !important;
  box-shadow: 0 0 ${config.glowIntensity}px ${config.glowColor} !important;
  animation: ${animationProperty};
}

/* Estilização dos nomes */
${!config.showNames || config.namePosition === 'hide' ? `
span.name,
.name {
  display: none !important;
}
` : `
span.name,
.name {
  color: ${config.fontColor} !important;
  font-size: ${config.fontSize}px !important;
  font-family: "${config.fontFamily}", "Inter", sans-serif !important;
  background-color: ${rgbaBg} !important;
  padding: 4px 8px !important;
  border-radius: 4px !important;
  ${nameSpacingCSS}
  white-space: nowrap !important;
  display: inline-block !important;
  ${config.textShadow ? 'text-shadow: 1px 1px 2px rgba(0,0,0,0.8) !important;' : ''}
  transition: all 0.2s ease !important;
}
`}

/* === Declarações de Animação === */
${keyframesDeclaration}

/* === Customizações de Usuário === */${customUsersCSS}
`;
}
