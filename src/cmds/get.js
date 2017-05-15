import { Observable } from 'rxjs';
import Prompt from 'prompt';

import HapClient from 'hap-client';

const command = 'get';
const desc = 'Fetch the current value of the characteristic specified'
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
        .getCharacteristics(args.aid, args.iid)
        .subscribe(
            ({ characteristics: [{ value }]}) => { console.log(value) },
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
