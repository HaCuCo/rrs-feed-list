class RssFeedList extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
              <ha-card header="Example-card">
                <div class="card-content"></div>
              </ha-card>
            `;
      this.content = this.querySelector("div");
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
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