import { Location } from './location.interface';

export interface Resource {
  id: number;
  title: string;
  description: string;
  minSkill: number;
  maxSkill: number;
  previewUrl: string;
  location: Location;
}
