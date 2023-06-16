import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client'; 
import { Server } from 'socket.io';
import { start } from 'repl';

@Injectable()
export class ProiotClientProducer { 
    static io = new Server(80);  

    constructor() {}

    startSocket(hasUpdate?: boolean, hasNewInnformations?: boolean) { 
        ProiotClientProducer.io.on('connection', (socket) => {
            if (hasUpdate) { 
                socket.emit("device_update", "Dispositivo atualizado"); 
            }

            if (hasNewInnformations) {
                socket.emit("device_has_new_information", "Dispositivo atualizado com informações novas"); 
            }
        })
    }
}
