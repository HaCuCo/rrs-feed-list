import dayjs from 'dayjs';
import { css, html } from 'lit';
import { get } from 'lodash';
import { property, state } from 'lit/decorators.js';
import { HassConfig, RssFeedEntity } from './types';
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
  private entities: RssFeedEntity[] = [];
  private rows: number = 5;

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private config!: HassConfig;

  public setConfig(config: HassConfig): void {
    if (!config.entities) {
      throw new Error('You need to define entities');
    }
    if (config.rows) this.rows = config.rows;

    this.entities = config.entities;

    this.config = config;
  }

  private onLinkButton(link: string) {
    // eslint-disable-next-line no-undef
    window.open(link, '__blank');
  }

  render() {
    if (!this.hass) throw new Error('No Hass found');
    if (!this.config) throw new Error('No Config found');

    const entries: any[] = [];

    this.entities.map(
      ({
        entity,
        date_key,
        from,
        thumbnail_key,
        entries_key = 'entries',
        link_key = 'link',
        summary_key = 'summary',
        title_key = 'title'
      }) => {
        let es = this.hass.states[entity].attributes[entries_key] ?? [];

        es.map((e: any) => {
          e.rssFeedKeys = {
            date_key,
            link_key,
            summary_key,
            title_key,
            thumbnail_key
          };
          e.from = from;
        });
        entries.push(...es);
      }
    );

    entries.sort((a: any, b: any) => {
      const aDate = dayjs(get(a, a.rssFeedKeys.date_key));
      const bDate = dayjs(get(b, b.rssFeedKeys.date_key));

      if (aDate.isBefore(bDate)) {
        return 1;
      } else if (aDate.isAfter(bDate)) {
        return -1;
      }
      return 0;
    });

    return html`
      <div>
        <div class="container">
          ${entries.splice(0, this.rows).map((entry: any) => {
            let thumb;
            if (entry.rssFeedKeys.thumbnail_key) {
              thumb = get(entry, entry.rssFeedKeys.thumbnail_key);
            }
            const link = get(entry, entry.rssFeedKeys.link_key);
            const title = get(entry, entry.rssFeedKeys.title_key);
            const summary = get(entry, entry.rssFeedKeys.summary_key)
              .replace(/<img[^>]*>/g, '')
              .replace(/<a[^>]*>.*<\/a>/, '')
              .replace(/<p[^>]*>/g, '')
              .replace(/<\/p>/g, '')
              .replace(/\(\)/g, '');
            const date = dayjs(get(entry, entry.rssFeedKeys.date_key));

            return html`
              <div class="card w-96 shadow-xl bg-base-100 image-full">
                <figure>
                  <img src=${thumb} alt=${thumb} />
                </figure>
                <div class="card-body">
                  <span>${date.format('DD.MM HH:mm')}</span>
                  <h2 class="card-title">${title}</h2>
                  <p>${summary}</p>
                  <div class="card-actions justify-end">
                    <button
                      class="btn btn-primary"
                      @click="${() => this.onLinkButton(link)}"
                    >
                      ${entry.from}
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
customElements.define('rss-feed-list', RssFeedList);

declare global {
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
  description: 'Rss Feed Card'
});
