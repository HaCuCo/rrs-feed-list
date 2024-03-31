import { LovelaceConfig } from 'custom-card-helpers';

export interface HassConfig extends LovelaceConfig {
  entities: RssFeedEntity[];
  rows?: number;
}

export interface RssFeedEntity {
  entity: string;
  date_key: string;
  from: string;
  entries_key?: string;
  title_key?: string;
  thumbnail_key?: string;
  summary_key?: string;
  link_key?: string;
}
