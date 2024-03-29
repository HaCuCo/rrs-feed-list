const defaults = {
  title: '',
  rows: 5
}

class RssFeedList extends HTMLElement {
  title = defaults.title;
  rows = defaults.rows;

  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
              <ha-card header="${this.title}">
                <div class="card-content">Hi</div>
              </ha-card>
            `;
      this.content = this.querySelector("div");
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    if (config.rows) this.rows = config.rows;
    if (config.title) this.title = config.title;

    this.config = config;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define('rss-feed-list', RssFeedList);

window.customCards = window.customCards || [];

window.customCards.push({
  type: "rss-feed-list",
  name: "Rss Feed List",
  preview: true,
  description: "The List Card generate table with data from sensor that provides data as a list of attributes."
});