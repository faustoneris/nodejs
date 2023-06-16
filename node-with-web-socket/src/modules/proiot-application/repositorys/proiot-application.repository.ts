import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProiotApplication } from "../schemas/proiot-application.schema";
import { Model } from "mongoose";


@Injectable()
export class ProiotApplicationRepository { 
    constructor(@InjectModel(ProiotApplication.name) private proiotModel: Model<ProiotApplication>) {}

    async fetchDevices(): Promise<ProiotApplication[]> { 
        return await this.proiotModel.find(); 
    } 

    async fetchDeviceById(deviceId: string): Promise<ProiotApplication> { 
        return await this.proiotModel.findOne({
            _id: deviceId
        })
    }

    async createDevice(device: any): Promise<void> { 
        console.log(device);
        
        const createDevice = new this.proiotModel(device); 
        
        createDevice.save(); 
    }

    async updateDeviceById(device: any, deviceId: string): Promise<boolean> { 
        const deviceUpdating = await this.proiotModel.updateOne({
            _id: deviceId
        }, { 
            $set: device
        });         
        return deviceUpdating.modifiedCount > 0 ? true : false; 
    }

    async deleteDeviceById(deviceId: string): Promise<boolean> { 
        const deviceExcluding = this.proiotModel.deleteOne({ _id: deviceId }).exec(); 
        return (await deviceExcluding).deletedCount ? true : false; 
    }

}