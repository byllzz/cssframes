import {
  LayoutGrid,
  ArrowUpFromLine,
  ArrowDownFromLine,
  Eye,
  MoveRight,
  RotateCcw,
  Bell,
  Loader2,
  Sparkles,
  Type,
} from 'lucide-react';

export const categories = [
  { name: 'All', icon: LayoutGrid },
  { name: 'Entrances', icon: ArrowUpFromLine },
  { name: 'Text', icon: Type },
  { name: 'Fading', icon: Eye },
  { name: 'Rotating', icon: RotateCcw },
  { name: 'Bouncing', icon: Bell },
  { name: 'Loaders', icon: Loader2, animate: true },
  { name: 'Sliding', icon: MoveRight },
  { name: 'Attention', icon: Sparkles },
  { name: 'Exits', icon: ArrowDownFromLine },
];

export const categoryList = [
  'all',
  'entrances',
  'exits',
  'fading',
  'sliding',
  'rotating',
  'bouncing',
  'loaders',
  'attention',
  'text',
];
