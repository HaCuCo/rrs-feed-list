class RssFeedList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setConfig(config) {
        if(!config.entity) throw new Error('Please define an entity');
    }
}