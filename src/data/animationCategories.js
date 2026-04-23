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
  { name: 'Entrance', icon: ArrowUpFromLine },
  { name: 'Text', icon: Type },
  { name: 'Fading', icon: Eye },
  { name: 'Rotating', icon: RotateCcw },
  { name: 'Bouncing', icon: Bell },
  { name: 'Loader', icon: Loader2, animate: true },
  { name: 'Sliding', icon: MoveRight },
  { name: 'Attention', icon: Sparkles },
  { name: 'Exit', icon: ArrowDownFromLine },
];

export const categoryList = [
  'all',
  'entrance',
  'exit',
  'fading',
  'sliding',
  'rotating',
  'bouncing',
  'loader',
  'attention',
  'text',
];
