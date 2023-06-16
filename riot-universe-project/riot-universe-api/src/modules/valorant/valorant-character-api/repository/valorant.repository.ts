import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import axios from 'axios';

import { ValorantCharacters } from '../schemas/valorant.schema';
import { CharacterDto } from '../dtos/valorant-character.dto';
require('dotenv').config();

@Injectable()
export class ValorantRepository {
  constructor(@InjectModel(ValorantCharacters.name) private valorantModel: Model<ValorantCharacters>) { }
  
  async getAllAgents(): Promise<CharacterDto[]> {
    return await this.valorantModel.find();
  }

  async findAgentByName(name: string): Promise<CharacterDto> {
    return await this.valorantModel.findOne({
      name: name
    }, {
      name: 1,
      agentFunction: 1,
      biograpy: 1,
      skills: 1,
    })
  }

  async createAgent(agent: CharacterDto): Promise<boolean> {
    const newAgent = new this.valorantModel(agent);
    await newAgent.save();
    return true;
  }

  async updateAgent(name: string, agent: CharacterDto): Promise<boolean> {
    const update = await this.valorantModel.updateOne({
      name: name,
    }, {
      $set: agent
    })

    if (update) {
      return true;
    }
    return false;
  }

  async deleteAgentByName(name: string): Promise<boolean> {
    const deleteAgent = await this.valorantModel.deleteOne(
      {
        name: name
      }).exec();

    if (deleteAgent) {
      return true;
    }
    return false;
  }
}
