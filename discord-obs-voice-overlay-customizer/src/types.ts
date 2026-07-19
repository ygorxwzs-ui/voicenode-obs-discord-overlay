export interface CustomUser {
  id: string;
  name: string; // Original Discord username (for reference in app)
  customName: string; // Nickname to display in OBS
  avatarUrl: string; // Can be a standard URL or Base64 string
  avatarName: string; // If uploaded, file name
}

export type LayoutMode = 'vertical' | 'horizontal' | 'grid';
export type AvatarShape = 'circle' | 'rounded' | 'squircle' | 'square';
export type AnimationType = 'none' | 'bounce' | 'pulse' | 'shake' | 'glow-pulse';
export type TextPosition = 'right' | 'below' | 'left' | 'hide';

export interface OverlayConfig {
  layout: LayoutMode;
  avatarSize: number;
  avatarShape: AvatarShape;
  spacing: number;
  
  // Speaking states
  glowColor: string;
  glowSize: number;
  glowIntensity: number;
  animation: AnimationType;
  animationSpeed: number; // in seconds
  
  // Non-speaking states
  inactiveOpacity: number;
  hideInactive: boolean;
  
  // Typography
  showNames: boolean;
  namePosition: TextPosition;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
  textBgColor: string;
  textBgOpacity: number;
  textShadow: boolean;
  
  // Custom users mapping
  customUsers: CustomUser[];
}

export const DEFAULT_CONFIG: OverlayConfig = {
  layout: 'vertical',
  avatarSize: 64,
  avatarShape: 'circle',
  spacing: 12,
  
  glowColor: '#23a55a', // Discord speaking green
  glowSize: 3,
  glowIntensity: 8,
  animation: 'pulse',
  animationSpeed: 0.8,
  
  inactiveOpacity: 0.5,
  hideInactive: false,
  
  showNames: true,
  namePosition: 'right',
  fontSize: 16,
  fontColor: '#ffffff',
  fontFamily: 'Inter',
  textBgColor: '#000000',
  textBgOpacity: 0.6,
  textShadow: true,
  
  customUsers: [
    {
      id: '123456789012345678',
      name: 'Ygor (Você)',
      customName: 'Ygor 🎮',
      avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
      avatarName: 'Default Gamer'
    },
    {
      id: '987654321098765432',
      name: 'Amigo_Streamer',
      customName: 'Duo Supremo 🔥',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      avatarName: 'Default Friend'
    }
  ]
};
