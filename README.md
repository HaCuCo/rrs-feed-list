# rrs-feed-list

This is a simple List Card for Home Assistant, which displays Feed Entry of a specific Entity Sensor.

> Works great with [feedparser](https://github.com/custom-components/feedparser)!

## Configuration

### Config

| Key      | Defaults | Required | Description                        |
|----------|----------|----------|------------------------------------|
| entities | -        | true     | The Sensor-Entity to get the Feeds |
| rows     | 5        | false    | Sets the maximum entries to show   |

### Entity

| Key           | Defaults | Required | Description                              |
|---------------|----------|----------|------------------------------------------|
| entity        | -        | true     | The Rss Feed Entity                      |
| date_key      | -        | true     | The key of the date (e.g. published)     |
| from          | -        | true     | From where the feed is (e.g. google)     |
| entries_key   | entries  | false    | Sets the key where to find the data      |
| title_key     | title    | false    | Sets the key where to find the title     |
| thumbnail_key | -        | false    | Sets the key where to find the thumbnail |
| summary_key   | summary  | false    | Sets the key where to find the summary   |
| link_key      | link     | false    | Sets the key where to find the link      |

Example

```yaml
type: custom:rss-feed-list-test
entities:
  - entity: sensor.google_feed
    from: google
    date_key: published
    title_key: Awesome Title
    thumbnail_key: awesome[0].thumbnail.url #  <--- Nested objects are possible with dot
    summary_key: "AndSoOn"
    link_key: More_keys
rows: 3
```

## Example

![Example](/assets/example.png)
