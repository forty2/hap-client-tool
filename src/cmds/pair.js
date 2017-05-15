import { Observable } from 'rxjs';
import Prompt from 'prompt';

import HapClient from 'hap-client';

const command = 'pair';
const desc = 'Attempt to connect to and pair with a HomeKit device'

function handler(args) {
    const client =
        new HapClient(
            args.client,
            args.address,
            args.port
        );

    client
        .pair(
            prompt('pin code')
        )
        .concat(
            client
            .verifyPairing()
        )
        .subscribe(
            () => { },
            e => {
                console.error(e)
                client.close();
            },
            () => {
                console.log('pairing complete');
                client.close();
            }
        );
}

function prompt(...labels) {
    return Observable
        .create(
            subscriber => {
                Prompt.start();
                Prompt.get(
                    labels,
                    function (err, result) {
                        if (err) subscriber.error(err);
                        else {
                            if (labels.length === 1) {
                                subscriber.next(result[labels[0]]);
                            }
                            else {
                                subscriber.next(result);
                            }
                            subscriber.complete();

                            Prompt.stop();
                        }
                    }
                );
            }
        );
}

export {
    command,
    desc,
    handler
}
