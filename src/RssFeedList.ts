import dayjs from 'dayjs';
import { html } from 'lit';
import { get } from 'lodash';
import { property, state } from 'lit/decorators.js';
import { HassConfig } from './types';
import { HomeAssistant } from 'custom-card-helpers';
import { TailwindElement } from './shared/TailwindElement.ts';

class RssFeedList extends TailwindElement() {
  private entityId = '';
  private cardTitle = '';
  private rows = 5;
  private entriesKey = 'entries';
  private titleKey = 'title';
  private thumbnailKey?: string;
  private summaryKey = 'summary';
  private linkKey = 'link';
  private dateKey = 'published';

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private config!: HassConfig;

  public setConfig(config: HassConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    if (config.rows) this.rows = config.rows;
    if (config.cardTitle) this.cardTitle = config.cardTitle;
    if (config.entries_key) this.entriesKey = config.entries_key;
    if (config.title_key) this.titleKey = config.title_key;
    if (config.thumbnail_key) this.thumbnailKey = config.thumbnail_key;
    if (config.summary_key) this.summaryKey = config.summary_key;
    if (config.link_key) this.linkKey = config.link_key;
    if (config.date_key) this.dateKey = config.date_key;

    this.entityId = config.entity;

    this.config = config;
  }

  render() {
    if (!this.hass) throw new Error('No Hass found');
    if (!this.config) throw new Error('No Config found');

    let entries =
      this.hass.states[this.entityId]?.attributes[this.entriesKey].slice(
        0,
        this.rows,
      ) ?? [];

    entries.sort((a: any, b: any) => {
      const aDate = dayjs(get(a, this.dateKey));
      const bDate = dayjs(get(b, this.dateKey));

      if (aDate.isBefore(bDate)) {
        return 1;
      } else if (aDate.isAfter(bDate)) {
        return -1;
      }
      return 0;
    });

    return html`
      <ha-card header="${this.cardTitle}">
        <div class="card-content">
          ${entries.map((entry: any, index: number) => {
            let thumb;
            if (this.thumbnailKey) {
              thumb = get(entry, this.thumbnailKey);
            }
            const link = get(entry, this.linkKey);
            const title = get(entry, this.titleKey);
            const summary = get(entry, this.summaryKey).replace(
              /<img[^>]*>/g,
              '',
            );
            const date = dayjs(get(entry, this.dateKey));

            // eslint-disable-next-line no-undef
            console.log(date);
            // eslint-disable-next-line no-undef
            console.log(link);
            // eslint-disable-next-line no-undef
            console.log(index);
            return html`
              <div class="card w-96 glass">
                <figure>
                  <img src=${thumb} alt="car!" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">${title}</h2>
                  <p>${summary}</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Go To</button>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  public getCardSize() {
    return 1;
  }
}

// eslint-disable-next-line no-undef
customElements.define('rss-feed-list-dev', RssFeedList);

/*declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    customCards: any;
  }
}

// eslint-disable-next-line no-undef
window.customCards = window.customCards || [];

// eslint-disable-next-line no-undef
window.customCards.push({
  type: 'rss-feed-list',
  name: 'Rss Feed List',
  preview: true,
  description: 'Rss Feed Card',
});*/
