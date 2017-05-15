# hap-client-tool
> CLI tool for controlling HomeKit devices

[![NPM Version][npm-image]][npm-url]
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

hap-client-tool is a Node.js application that allows you to pair with, connect to, and control HomeKit devices

## Getting Started

The hap-client-tool is distributed through NPM:

```sh
$ npm install -g hap-client-tool

# or, if you prefer:
$ yarn global add hap-client-tool

$ hap-client-tool --help
```

All subcommands of `hap-client-tool` share three arguments:

Argument     | Purpose                                   | Default
-------------|-------------------------------------------|--------
--client, -c | client name; must be unique among clients | "hap-client-tool"
--address, -d | IP address or hostname of the device     | none (required)
--port, -p    | port to connect to                       | none (required)

## The Commands

### `pair`

`pair` attempts to connect to and pair with a HomeKit device.  It will prompt for the device's PIN code when needed.  To run:
```sh
$ hap-client-tool [tool args] pair
```

On success, "pairing complete" will be printed to the console.  On failure, the error will be printed.


### `dump`

`dump` connects to an already-paired HomeKit device and dumps a list of all of the accessories, services, and characteristics published by the device in JSON format.  Its primary use is to determine what data is exposed by the device and which accessory and instance IDs correspond to each property.  The data from the device itself will be augmented with any available metadata for known service or characteristic types.  To run:

```sh
$ hap-client-tool [tool args] dump
```

Which might dump something like this:

```json
{
    "accessories": [
        {
            "aid": 1,
            "services": [
                {
                    "iid": 7,
                    "type": "00000040-0000-1000-8000-0026BB765291",
                    "characteristics": [
                        {
                            "iid": 9,
                            "type": "00000025-0000-1000-8000-0026BB765291",
                            "perms": [
                                "pr",
                                "pw",
                                "ev"
                            ],
                            "format": "bool",
                            "value": false,
                            "description": "On",
                            "Format": "bool",
                            "Properties": [
                                "read",
                                "write",
                                "cnotify"
                            ],
                            "Name": "On",
                            "Permissions": [
                                "securedRead",
                                "securedWrite"
                            ]
                        }
                    ],
                    "OptionalCharacteristics": [
                        "00000028-0000-1000-8000-0026BB765291",
                        "00000029-0000-1000-8000-0026BB765291",
                        "00000023-0000-1000-8000-0026BB765291"
                    ],
                    "RequiredCharacteristics": [
                        "00000025-0000-1000-8000-0026BB765291"
                    ],
                    "Name": "Fan"
                }
            ]
        }
    ]
}
```

### `get`

`get` connects to a paired HomeKit device and fetches the current value of the specified characteristic.  To run:

```sh
$ hap-client-tool [tool args] get --aid <m> --iid <n>

# for example, for a boolean property:
$ hap-client-tool [tool args] get --aid 1 --iid 11
true
$ 
```

On success, the value (with no formatting) is printed to the console.  On failure, the error is printed.

### `set`

`set` connects to a paired HomeKit device and sets the value of the specified characteristic.  To run:

```sh
$ hap-client-tool [tool args] set --aid <m> --iid <n> [value]

# for example, for a boolean property:
$ hap-client-tool [tool args] set --aid 1 --iid 11 true
$ 
```

On success, the tool will exit without printing anything..  On failure, the error is printed.

## Contributing

Contributions are of course always welcome.  If you find problems, please report them in the [Issue Tracker](http://www.github.com/forty2/hap-client-tool/issues/).  If you've made an improvement, open a [pull request](http://www.github.com/forty2/hap-client-tool/pulls).

Getting set up for development is very easy:
```sh
git clone <your fork>
cd hap-client-tool
yarn
```

And the development workflow is likewise straightforward:
```sh
# make a change to the src/ file, then...
yarn build

# or if you want to clean up all the leftover build products:
yarn run clean
```

## Release History

* 1.0.0
    * The first release.

## Meta

Zach Bean – zb@forty2.com

Distributed under the MIT license. See [LICENSE](LICENSE.md) for more detail.

[npm-image]: https://img.shields.io/npm/v/hap-client-tool.svg?style=flat
[npm-url]: https://npmjs.org/package/hap-client-tool
