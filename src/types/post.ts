import type { PlatformType } from './platform';

export interface Post {
  id: number;
  title: string;
  description: string;
  status: 'approved' | 'in-review';
  platform: PlatformType;
  time: string;
  day: number;
  image?: string;
}

export interface PostUpdate {
  title?: string;
  description?: string;
  status?: 'approved' | 'in-review';
  image?: string;
}