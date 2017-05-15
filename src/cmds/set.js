import { Observable } from 'rxjs';
import Prompt from 'prompt';

import HapClient from 'hap-client';

const command = 'set';
const desc = 'Set the value of the characteristic specified'
const builder = {
    aid: {
        alias: 'a',
        required: true
    },
    iid: {
        alias: 'i',
        required: true
    }
}

function handler(args) {
    const client =
        new HapClient(
            args.client,
            args.address,
            args.port
        );

    client
        .setCharacteristics({ aid: args.aid, iid: args.iid, value: args._[1] })
        .subscribe(
            () => { },
            e => {
                console.error(e)
                client.close();
            },
            () => {
                client.close();
            }
        );
}

export {
    command,
    desc,
    builder,
    handler
}
