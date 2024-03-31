import dayjs from 'dayjs';
import { css, html } from 'lit';
import { get } from 'lodash';
import { property, state } from 'lit/decorators.js';
import { HassConfig } from './types';
import { HomeAssistant } from 'custom-card-helpers';
import { TailwindElement } from './shared/TailwindElement.ts';

const styles = css`
  .thumbImage {
    width: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
  }
`;

class RssFeedList extends TailwindElement(styles) {
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
    if (config.title) this.cardTitle = config.title;
    if (config.entries_key) this.entriesKey = config.entries_key;
    if (config.title_key) this.titleKey = config.title_key;
    if (config.thumbnail_key) this.thumbnailKey = config.thumbnail_key;
    if (config.summary_key) this.summaryKey = config.summary_key;
    if (config.link_key) this.linkKey = config.link_key;
    if (config.date_key) this.dateKey = config.date_key;

    this.entityId = config.entity;

    this.config = config;
  }

  private onLinkButton(link: string) {
    window.open(link, '__blank');
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
      <div>
        ${this.cardTitle ??
        html` <h2 class="card-title">${this.cardTitle}</h2> `}
        <div class="container">
          ${entries.map((entry: any) => {
            let thumb;
            if (this.thumbnailKey) {
              thumb = get(entry, this.thumbnailKey);
            }
            const link = get(entry, this.linkKey);
            const title = get(entry, this.titleKey);
            const summary = get(entry, this.summaryKey)
              .replace(/<img[^>]*>/g, '')
              .replace(/<a[^>]*>.*<\/a>/, '')
              .replace(/<p[^>]*>/g, '')
              .replace(/<\/p>/g, '')
              .replace(/\(\)/g, '');
            const date = dayjs(get(entry, this.dateKey));

            return html`
              <div class="card shadow-xl bg-base-100 image-full">
                <figure>
                  <img src=${thumb} alt=${thumb} />
                </figure>
                <div class="card-body">
                  <span>${date.format('DD.MM HH.mm')}</span>
                  <h2 class="card-title">${title}</h2>
                  <p>${summary}</p>
                  <div class="card-actions justify-end">
                    <button
                      class="btn btn-primary"
                      @click="${() => this.onLinkButton(link)}"
                    >
                      Go To
                    </button>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
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
