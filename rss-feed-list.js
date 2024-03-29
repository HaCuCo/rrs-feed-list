class RssFeedList extends HTMLElement {
  title = '';
  rows = 5;
  entities_key = 'entities';
  title_key = 'title';
  thumbnail_key = 'thumbnail';
  summary_key = 'summary';
  link_key = 'link';

  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="${this.title}">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector("div");
    }

    const entries = hass.states[entityId][this.entities_key];

    entries.array.forEach(element => {
      this.content.innerHTML += this.createRow(element[this.thumbnail_key], element[this.title_key], element[this.summary_key], element[this.link_key])
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
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    if (config.rows) this.rows = config.rows;
    if (config.title) this.title = config.title;
    if (config.entities_key) this.entities_key = config.entities_key;

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