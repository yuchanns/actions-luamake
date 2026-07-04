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
      - uses: actions/checkout@v7
      - uses: yuchanns/actions-luamake@v1
        with:
          luamake-version: 'v1.7'
      - run: luamake help
```

Build and install the standalone binary with embedded scripts:

```yaml
- uses: yuchanns/actions-luamake@v1
  with:
    standalone: 'true'
- run: luamake help
```

## Inputs

All inputs are optional.

| Name | Description |
|------|-------------|
| `luamake-version` | The version of luamake to install. Defaults to `latest`. |
| `run-tests` | Whether to run upstream `bee.lua` tests while building `luamake`. Defaults to `false`, which builds with `notest`. Set to `true` to run tests during build. |
| `standalone` | Whether to build upstream's `lua2c` target and install its `luamake_lua2c` artifact as `luamake`. Defaults to `false`. |

Standalone mode requires a luamake version that supports the upstream `lua2c` target.

## Outputs

| Name | Description |
|------|-------------|
| `luamake-path` | The path to the installed luamake executable. |

## License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
