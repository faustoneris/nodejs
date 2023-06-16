import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProiotApplication } from "../schemas/proiot-application.schema";
import { ProiotApplicationService } from "../services/proiot-application.service";

@Controller()
export class ProiotApplicationController { 
    constructor(private readonly proiotApplicationService: ProiotApplicationService) {}

    @Get()
    async fetchDevices(): Promise<ProiotApplication[]> { 
        return await this.proiotApplicationService.fetchDevices(); 
    }

    @Get(':deviceId')
    async fetchDeviceById(@Param('deviceId') deviceId: string): Promise<ProiotApplication> { 
        return await this.proiotApplicationService.fetchDeviceById(deviceId); 
    }

    @Post()
    async createDevice(@Body() device: any): Promise<void> { 
        await this.proiotApplicationService.createDevice(device); 
    }

    @Put(':deviceId')
    async updateDeviceById(@Body() device: any, @Param('deviceId') deviceId: string): Promise<boolean> { 
        return await this.proiotApplicationService.updateDeviceById(device, deviceId)
    }

    @Delete(':deviceId')
    async deleteDeviceById(@Param('deviceId') deviceId: string): Promise<boolean> { 
        return await this.proiotApplicationService.deleteDeviceById(deviceId); 
    }
}