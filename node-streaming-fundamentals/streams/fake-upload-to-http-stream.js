import { Readable } from 'node:stream';

class OneToHundradeStream extends Readable {
    index = 1;
    _read() {
        setTimeout(() => {
            const i = this.index++;

            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        }, 1000)
    }
}


fetch('http://localhost:3333', {
    method: 'POST',
    body: new OneToHundradeStream(),
}).then(response => {
    return response.text()
}).then(data => console.log(data));

