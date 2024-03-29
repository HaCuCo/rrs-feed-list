class RssFeedList extends HTMLElement {
  entityId;
  title = '';
  rows = 5;
  entitiesKey = 'entities';
  titleKey = 'title';
  thumbnailKey = 'thumbnail';
  summaryKey = 'summary';
  linkKey = 'link';

  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="${this.title}">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector("div");
    }

    const entries = hass.states[entityId][this.entitiesKey];

    entries.array.forEach(element => {
      this.content.innerHTML += this.createRow(element[this.thumbnailKey], element[this.titleKey], element[this.summaryKey], element[this.linkKey])
    });
  }

  createRow(thumb, title, summary, link) {
    return `
    <div>
      <div>
        <image src="${thumb}"
        <h2>${title}</h2>
      </div>
      <div>
        <p>${summary}</p>
        <a href="${link}">${title}</a>
      </div>
    </div>
    `
  }

  setConfig(config) {
    console.log(config);
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    if (config.rows) this.rows = config.rows;
    if (config.title) this.title = config.title;
    if (config.entities_key) this.entitiesKey = config.entities_key;
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
}

customElements.define('rss-feed-list', RssFeedList);

/* window.customCards = window.customCards || [];

window.customCards.push({
  type: "rss-feed-list",
  name: "Rss Feed List",
  preview: true,
  description: "Rss Feed Card"
});*/