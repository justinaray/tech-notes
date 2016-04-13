# intl api/ember-intl Notes

## intl api

The intl api allows for locale-specific sorting and formatting of date/time and numbers

* The api contains the locale-specific rules to do this
* A polyfill is needed if you're using number or date/time formatters and your browser doesn't support the intl api natively (Ex: https://github.com/andyearnshaw/Intl.js/)
* Formatting config is passed in an options hash in the intl api

### Number formatting Options:
* style: [decimal, currency, percent]
* currency: the type of currency to use; Ex: USD or EUR; _*NO DEFAULT!*_
* standard umber options: useGrouping, minimum/maximum fraction/significant digits, etc

#### Examples
```
new Intl.NumberFormat(['not-valid', 'en-US'], {maximumFractionDigits: 2}).format(1000.123) // 1,000.12
```

### Date/Time Formatting:

* Order is generally provided by the matched locale
* Options can dictate:
  * Timezone (UTC, local, some impls can support IANA time zones)
  * The presence, precision, and/or styling of fields
  * locale and format matching
  * A few other misc configs (e.g. hour12)


#### Examples
[Note:] Unless explictly specified, the example outputs are in U.S. Eastern Time, currently DST
```
var date = new Date(Date.UTC(2016, 3, 13, 5, 0, 0));
new Intl.DateTimeFormat(['not-valid', 'en-US']).format(date); // 4/13/2016
new Intl.DateTimeFormat(['not-valid', 'en-US'],
    {timeZoneName: 'short'}).format(date); // 4/13/2016, EDT

new Intl.DateTimeFormat(['not-valid', 'en-US'],
    {timeZoneName: 'short',
    hour: 'numeric',
    minute: 'numeric'}).format(date); // 1:00 AM, EDT
new Intl.DateTimeFormat(['not-valid', 'en-US'],
    {timeZoneName: 'short',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric'}).format(date); // 4/13, 1:00 AM EDT
new Intl.DateTimeFormat(['not-valid', 'es'],
    {timeZoneName: 'short',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric'}).format(date); // 13/4 1:00 GMT-4
```
