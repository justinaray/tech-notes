# intl api/ember-intl Notes

## Vocabulary
1. Common Locale Data Repository (CLDR) - XML-based data for i18n and l10n.  Typically integrated natively into languages and/or libraries.

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

## ember-intl

https://github.com/jasonmit/ember-intl

### intl Polyfill:

* Uses intl under the covers, so you'll need the polyfill if you're formatting dates/times/numbers on an unsupported browser
* CDN based Polyfill
  * Pull the polyfill from the CDN <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en-US,Intl.~locale.fr-FR,Intl.~locale.es-ES"></script>
  * Note you must include the locales to pull
  * Optimized to not include if the browser natively supports intl
  * You'll want to disable the polyfill from the build in config/ember-intl.js
* Manual Polyfill
  * You'll want to enable the polyfill from the build in config/ember-intl.js (This is the default)
  * By default, all locales will be pulled into your dist directory.  You can limit this in config via `locales`
  * Copy the intl polyfill and any/all locale scripts into your index.html file
    * ember-intl places these in assets/intl by default
    * Scripts must be loaded before your app
  * Note: Testing indicates that you can dynamically load the locale-specific scripts lazily.

### Config
* Config used to live under the `intl` key in config/environment.js
* It has been moved to config/ember-intl.js
* `baseLocale` is used at build-time only
* `disablePolyfill` disables the build-time polyfill
* `locales` is used to limit locales pulled in for polyfill; not needed if specifying translations statically

### Default Locale (Build vs. Runtime)

* The `baseLocale` config switch can be used to lint static translations.  ember-intl will warn if a translation bundle is missing a key that exists in the `baseLocale`

#### Fallback

To setup a fallback runtime locale, just provide a secondary locale when registering the locale with `services:intl`

```
this.get('intl').setLocale(['not-valid', 'en-us']); // Sets US English as a fallback
```

### Formatting

formatting options are defined in `formats.js`

* Hashed by type: `date, number, plural, select, selectordinal, time`
* Keyed by the name you want to use in templates/code.

### Template Helpers
* The `t` helper is the general purpose helper to internationalize some text
* The `format-html` helper is similar to t but does not escape HTML, allowing it to be interpreted in a template
* You can use `format-date` or `format-time` to format any date.  Specify the format name with the `format` attribute

#### Variable substitutions:
* Variable substitutions can be within bundles.  They are specified with `{}` characters.
```
Hello {name}
```
* If no type is specifiec, a string value is assumed.
* You can specify a type and formatName with the syntax `{variable[, formatType[, formatName]]}`
```
Hello {name}.  You have viewed this page {viewCount, number}. // Numerical formatting
Hello {name}.  You have {accountBalance, number, USD} in your account. // Currency formating
Hello {name}.  It is {now, date}. // Date formatting
```
