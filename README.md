# actions-luamake

![ci](https://github.com/yuchanns/actions-luamake/actions/workflows/ci.yml/badge.svg?branch=main)

Build and setup [luamake](https://github.com/actboy168/luamake) for Windows, Linux and macOS in your
GitHub Actions workflow.

## Example workflow

```yaml
name: test suite
on: [push, pull_request]

jobs:
  test:
    name: luamake help
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: yuchanns/actions-luamake@v1
        with:
          version: '1.7'
      - run: luamake help
```

## Inputs

All inputs are optional.

| Name | Description |
|------|-------------|
| `version` | The version of luamake to install. Defaults to `latest`. |

## Outputs

| Name | Description |
|------|-------------|
| `luamake-path` | The path to the installed luamake executable. |

## License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
