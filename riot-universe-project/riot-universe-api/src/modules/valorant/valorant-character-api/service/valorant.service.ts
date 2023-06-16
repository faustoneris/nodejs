/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { CharacterDto } from '../dtos/valorant-character.dto';
import { ValorantRepository } from '../repository/valorant.repository';

@Injectable()
export class ValorantService {
  constructor(private readonly valorantRepository: ValorantRepository) { }

  async getAllAgents(): Promise<CharacterDto[]> {
    return await this.valorantRepository.getAllAgents();
  }

  async findAgentByName(name: string): Promise<CharacterDto> {
    return await this.valorantRepository.findAgentByName(name);
  }

  async createAgent(agent: CharacterDto): Promise<boolean> {
    this.validate(agent);
    return await this.valorantRepository.createAgent(agent);
  }

  async updateAgent(name: string, agent: CharacterDto): Promise<boolean> {
    this.validate(agent, name);
    return await this.valorantRepository.updateAgent(name, agent)
  }

  async deleteAgentByName(name: string): Promise<boolean> {
    if (!name) {
      throw new Error('Nome invalido.');
    }
    return await this.valorantRepository.deleteAgentByName(name);
  }

  private validate(agent: CharacterDto, nameFrom?: string): void {
    if (!nameFrom) {
      throw new Error('Nome do Agente invalido.');
    }
    const { name, biograpy, agentFunction, skills } = agent;

    if (!name) {
      throw new Error('Nome do Agente invalido.');
    }

    if (!biograpy) {
      throw new Error('Biografia do Agente invalida.');
    }

    if (!agentFunction) {
      throw new Error('Função do Agente invalido.');
    }

    if (skills) {
      const { firstSkill, secondSkill, thirdSkill, ultimateSkill } = skills;

      if (!firstSkill) {
        throw new Error('Habilidade Q do Agente invalida.');
      }

      if (!secondSkill) {
        throw new Error('Habilidade E do Agente invalida.');
      }

      if (!thirdSkill) {
        throw new Error('Habilidade C do Agente invalida.');
      }

      if (!ultimateSkill) {
        throw new Error('Habilidade R do Agente invalida.');
      }
    }


  }
}
