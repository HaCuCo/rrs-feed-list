import dayjs from "dayjs";
import { LitElement, css, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import styleVariables from "./styles/variables";
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
  dateKey = "published";

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

    entries.sort((a, b) => {
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
            const date = dayjs(get(entry, this.dateKey));

            return html`
              <div>
                ${index !== 0 ? html`<hr class="rounded" />` : undefined}
                <div class="container">
                  <div class="header">
                    <div class="dateTime">
                      <span class="time"
                        >${date.format("HH:mm").concat(" Uhr")}</span
                      >
                      <span class="date">${date.format("DD.MM.YYYY")}</span>
                    </div>
                    <h3><a href="${link}">${title}</a></h3>
                  </div>
                  <div class="content">
                    <div class="metaContent">
                      ${thumb && html`<img src="${thumb}" class="thumb" />`}
                    </div>
                    <div class="text">
                      <p>${unsafeHTML(summary)}</p>
                    </div>
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
    if (config.date_key) this.dateKey = config.date_key;

    this.entityId = config.entity;

    this.config = config;
  }

  getCardSize() {
    return 1;
  }

  static get styles() {
    return css`
      .card-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: ${styleVariables.defaultGap};

          .header {
            display: flex;
            flex-direction: column;
            gap: ${styleVariables.defaultGap};

            .dateTime {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              line-height: 5px;

              .date {
                font-size: 0.7em;
              }

              .time {
                font-size: 0.7em;
              }
            }

            h3 {
              margin: 0 !important;
              font-size: 0.9em;
            }
          }

          .content {
            display: flex;
            flex-direction: row;
            gap: ${styleVariables.defaultGap};

            .text {
              p {
                margin: 0 !important;
                font-size: 0.9em;
                line-height: 14px;
              }
            }

            .metaContent {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              margin-top: 3px;

              .thumb {
                max-height: 6em;
              }
            }
          }
        }
      }

      // Divider
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
