# GROIW Calendar Plugin

This is a calendar plugin for GROWI. It shows a calendar view.

## Install

Install a plugin in admin panel.

## Usage

```
$calendar
```

When you click each day, the plugin jumps to the page of the day. `YYYY/MM/DD` is default page name.

## Options

If you want to chage calendar year and month, you can use options.

```
$calendar(10,2020)
```

You can change a locale like 'ja', 'fr'. Default is 'en'.

```
$calendar(locale=ja)
$calendar(10,2020,locale=ja)
```

If you want to change a new page name, you can use 'separator' option. Default is '/'. 

```
$calendar(10,2020,locale=ja,separator=-)
$calendar(local=fr,separator=-)
$calendar(separator=-)
```

## License

MIT

