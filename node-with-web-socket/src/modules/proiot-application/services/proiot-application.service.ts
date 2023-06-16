import { Injectable, Logger } from "@nestjs/common";
import { ProiotClientProducer } from "src/modules/producer/worker/proiot-client-producer/proiot-client-producer";
import { ProiotApplicationRepository } from "../repositorys/proiot-application.repository";
import { ProiotApplication } from "../schemas/proiot-application.schema";

@Injectable()
export class ProiotApplicationService {
    private readonly logger = new Logger(ProiotApplicationService.name);

    constructor(private readonly proiotApplicationRepository: ProiotApplicationRepository,
        private readonly socket: ProiotClientProducer) { }

    async fetchDevices(): Promise<ProiotApplication[]> {
        this.logger.log("Listando dispositivos")
        return await this.proiotApplicationRepository.fetchDevices();
    }

    async fetchDeviceById(deviceId: string): Promise<ProiotApplication> { 
        this.logger.log("Buscando dispositivo pelo Id ", deviceId)
        return await this.proiotApplicationRepository.fetchDeviceById(deviceId); 
    }

    async createDevice(device: any): Promise<void> {
        this.logger.log("Validando dispositivo");
        this.verifyDevice(device);
        this.logger.log("Criando dispositivo");
        await this.proiotApplicationRepository.createDevice(device);
    }

    async updateDeviceById(device: any, deviceId: string): Promise<boolean> {
        this.logger.log("Validando dispositivo antes de atualizar");
        this.verifyDevice(device);

        this.logger.log("Buscando dispositivos no banco");
        const devices = this.fetchDevices();

        this.logger.log("Buscando dispositivo antes de atualizar no banco");
        const deviceBeforeUpdate = (await devices).find(x => x._id == deviceId);

        this.logger.log("Validando se há novas propriedades no dispositivo");

        Object.keys(device.device).length > Object.keys(deviceBeforeUpdate.device).length ?
            this.socket.startSocket(true, true) :
            this.socket.startSocket(true);

        return await this.proiotApplicationRepository.updateDeviceById(device, deviceId);
    }

    async deleteDeviceById(deviceId: string): Promise<boolean> {
        return await this.proiotApplicationRepository.deleteDeviceById(deviceId);
    }

    private verifyDevice(receiveDevice: any): void {
        if (!receiveDevice.device || Object.keys(receiveDevice.device).length === 0) {
            throw Error("Dispositivo Inválido.");
        }   

        const { device } = receiveDevice;

        if (device.humidity) {
            if (!String(device.humidity).includes("%")) { 
                throw Error("Umidade incorreta, insira % ao final do valor.");     
            }
        }

        if (device.temperature) {
            if (!String(device.temperature).includes("ºC")) {
                throw Error("Temperatura incorreta, insira ºC ao final do valor.");
            }
        }

        if (device.luminosity) {
            if (!String(device.luminosity).includes("m2")) {
                throw Error("Luminosidade incorreta, insira m2 ao final do valor.");
            }
        }
    }
}