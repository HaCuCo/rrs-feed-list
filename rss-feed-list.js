class RssFeedList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setConfig(config) {
        if(!config.entity) throw new Error('Please define an entity');
    }

    set hass(hass) {
        root.lastChild.hass = hass;
        root.getElementById('container').innerHTML = <h1>Hi</h1>;
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