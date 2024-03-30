import { LitElement, css, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import get from "lodash-es/get";

class RssFeedList extends LitElement {
  entityId = "";
  title = "";
  rows = 5;
  entriesKey = "entries";
  titleKey = "title";
  thumbnailKey;
  summaryKey = "summary";
  linkKey = "link";

  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  render() {
    let entries =
      this.hass.states[this.entityId].attributes[this.entriesKey].slice(
        0,
        this.rows
      ) ?? [];

    return html`
      <ha-card header="${this.title}">
        <div class="card-content">
          ${entries.map((entry, index) => {
            const thumb = get(entry, this.thumbnailKey);
            const link = get(entry, this.linkKey);
            const title = get(entry, this.titleKey);
            const summary = get(entry, this.summaryKey).replace(
              /<img[^>]*>/g,
              ""
            );

            return html`
              <div>
                ${index !== 0 ? html`<hr class="rounded" />` : undefined}
                <div class="container">
                  <div class="header">
                    <h3><a href="${link}">${title}</a></h3>
                  </div>
                  <div class="content">
                    ${this.thumbnailKey && html`<img src="${thumb}" />`}
                    <p>${unsafeHTML(summary)}</p>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    if (config.rows) this.rows = config.rows;
    if (config.title) this.title = config.title;
    if (config.entries_key) this.entriesKey = config.entries_key;
    if (config.title_key) this.titleKey = config.title_key;
    if (config.thumbnail_key) this.thumbnailKey = config.thumbnail_key;
    if (config.summary_key) this.summaryKey = config.summary_key;
    if (config.link_key) this.linkKey = config.link_key;

    this.entityId = config.entity;

    this.config = config;
  }

  getCardSize() {
    return 1;
  }

  static get styles() {
    return css`
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 2em;
        gap: 5px;
      }

      .content {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1em;
      }

      .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1em;
      }

      .card-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1em;
      }
      hr.rounded {
        border-top: 2px solid #bbbbbb81;
        border-radius: 5px;
        background-color: none;
        height: 0;
      }
    `;
  }
}

// eslint-disable-next-line no-undef
customElements.define("rss-feed-list", RssFeedList);

// eslint-disable-next-line no-undef
window.customCards = window.customCards || [];
// eslint-disable-next-line no-undef
window.customCards.push({
  type: "rss-feed-list",
  name: "Rss Feed List",
  preview: true,
  description: "Rss Feed Card",
});
