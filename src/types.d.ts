import { LovelaceConfig } from 'custom-card-helpers';

export interface HassConfig extends LovelaceConfig {
  entity: string;
  rows?: number;
  cardTitle?: string;
  entries_key?: string;
  title_key?: string;
  thumbnail_key?: string;
  summary_key?: string;
  link_key?: string;
  date_key?: string;
}
