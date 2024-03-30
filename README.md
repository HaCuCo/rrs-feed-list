rrs-feed-list

This is a simple List Card for Home Assistant, which displays Feed Entry of an specific Entity Sensor.

> Workds great with [feedparser](https://github.com/custom-components/feedparser)!

# Configuration

| Key           | Defaults   | Required | Description                              |
| ------------- | ---------- | -------- | ---------------------------------------- |
| entity        | empty      | true     | The Rss Feed Entity                      |
| title         | empty      | false    | Sets the title of the card               |
| rows          | 5          | false    | Sets the maximun entries to show         |
| entities_key  | 'entities' | false    | Sets the key where to find the data      |
| title_key     | 'title'    | false    | Sets the key where to find the title     |
| thumbnail_key | empty      | false    | Sets the key where to find the thumbnail |
| summary_key   | 'summary'  | false    | Sets the key where to find the summary   |
| link_key      | 'link'     | false    | Sets the key where to find the link      |

Example

```
type: custom:rss-feed-list-test
entity: sensor.the_feed
rows: 3
title: Awesome Title
entities_key: 'entities'
thumbnail_key: awesome[0].thumbnail.url #  <--- Nested objects are possible with dot
title_key: awesomeTitle
summary_key: AndSoOn
link_key: More_keys
```

# Example

![Example](/assets/example.png)
