import path from 'path';

import HapClient from 'hap-client';

import glob from 'glob';
import merge from 'lodash.merge';

const command = 'dump';
const desc = 'Print an object describing the available items on the connected device'

function handler(args) {
    const meta =
        glob.sync(__dirname + '/../metadata/**/*.json', { ignore: '**/default.json' })
            .map(x => path.relative(__dirname, x))
            .reduce(
                (acc, x) => merge(acc, require('./' + x)),
                require('../metadata/default.json')
            );

    const Services = processList(meta['Services']);
    const Characteristics = processList(meta['Characteristics']);

    const client =
        new HapClient(
            args.client,
            args.address,
            args.port
        );

    client
        .listAccessories()
        // merge in what we know from the homekit metadata
        .map(
            data => {
                data
                    .accessories
                    .forEach(
                        acc => {
                            acc
                                .services
                                .forEach(
                                    (serv, i, servs) => {
                                        servs[i] =
                                            merge(serv, Services[serv.type])

                                        servs[i]
                                            .characteristics
                                            .forEach(
                                                (char, j, chars) => {
                                                    chars[j] =
                                                        merge(char, Characteristics[char.type])
                                                }
                                            );
                                    }
                                );
                        }
                    );

                return data;
            }
        )
        .subscribe(
            res => {
                console.log(
                    JSON.stringify(res, null, 4)
                );
            },
            e => {
                console.error(e)
                client.close();
            },
            () => {
                client.close();
            }
        );
}

function processList(list) {
    return list
        .reduce(
            (acc, { UUID, ...rest }) => {
                acc[UUID] = rest;

                let m;
                if (m = /0*([0-9A-F]+)-0000-1000-8000-0026BB765291/.exec(UUID)) {
                    acc[m[1]] = rest;
                }

                return acc;
            }, { }
        )
}

export {
    command,
    desc,
    handler
}
