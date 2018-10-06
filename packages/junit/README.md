# `commitlint-format-junit`

Format all [Commitlint](http://marionebl.github.io/commitlint) issues as a valid JUnit XML string.
You can reuse this JUnit report in other systems to visualise issues.

> Formats are available in Commitlint starting from `>=7.2.0`

## Install

```
$ npm install commitlint-format-junit
```

## Usage

You can use it by either defining the [output flag](), as listed below, or configure [with sharable configuration](https://github.com/marionebl/commitlint/blob/master/docs/reference-configuration.md#formatter).

```
$ echo 'foo: bar' | npx commitlint -o commitlint-format-junit
```

## Example

```
$ echo 'foo: bar' | npx commitlint -x @commitlint/config-conventional -o commitlint-format-junit
<?xml version="1.0" encoding="utf-8"?>
<testsuites>
  <testsuite name="commitlint" failures="1" tests="1">
    <testsuite name="foo: bar" failures="1" tests="1">
      <testcase name="type-enum">
        <failure type="error">type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] (type-enum)

foo: bar</failure>
      </testcase>
    </testsuite>
  </testsuite>
</testsuites>
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
