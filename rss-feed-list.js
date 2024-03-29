class RssFeedList extends HTMLElement {
  title = '';
  rows = 5;

  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="Example-card">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector("div");
    }

    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : "unavailable";

    this.content.innerHTML = `
      The state of ${entityId} is ${stateStr}!
      <br><br>
      <img src="http://via.placeholder.com/350x150">
    `;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    //if (config.rows) this.rows = config.rows;
    //if (config.title) this.title = config.title;

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