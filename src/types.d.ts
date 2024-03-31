import { LovelaceConfig } from 'custom-card-helpers';

export interface HassConfig extends LovelaceConfig {
  entities: HassEntity[];
  rows?: number;
}

interface HassEntity {
  entity: string;
  date_key: string;
  cardTitle?: string;
  entries_key?: string;
  title_key?: string;
  thumbnail_key?: string;
  summary_key?: string;
  link_key?: string;
}
