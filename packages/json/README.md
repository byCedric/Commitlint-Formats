# `commitlint-format-json`

Format all [Commitlint](http://marionebl.github.io/commitlint) issues as a simple JSON string.
You can use this JSON to import the report and reuse it.
The format matches the original issues report from Commitlint.

> Formats are available in Commitlint starting from `>=7.2.0`

## Install

```
$ npm install commitlint-format-json
```

## Usage

You can use it by either defining the [output flag](), as listed below, or configure [with sharable configuration](https://github.com/marionebl/commitlint/blob/master/docs/reference-configuration.md#formatter).

```
$ echo 'foo: bar' | npx commitlint -o commitlint-format-json
```

## Example

```
$ echo 'foo: bar' | npx commitlint -x @commitlint/config-conventional -o commitlint-format-json
{"valid":false,"errorCount":1,"warningCount":0,"results":[{"valid":false,"errors":[{"level":2,"valid":false,"name":"type-enum","message":"type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]"}],"warnings":[],"input":"foo: bar"}]}
```

## Contributing

Contributions are always welcome.
This project is open source, and anyone may contribute.
To keep the project healthy and running smoothly, a couple of rules are defined.

1. Keep it friendly and accessible at all times.
2. Use the templates adequately with the required information.
3. Adhere the code styling and make sure CI passes.

Make something awesome!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

--- ---

<p align="center">
    with :heart: <a href="https://bycedric.com" target="_blank">byCedric</a>
</p>
