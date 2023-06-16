import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CharacterDto } from '../dtos/valorant-character.dto';
import { ValorantService } from '../service/valorant.service';

@Controller('valorant')
export class ValorantController {
  constructor(private readonly valorantService: ValorantService) {}
  
  @Get()
  async getAllCharacters(): Promise<CharacterDto[]> { 
    return await this.valorantService.getAllAgents(); 
  } 

  @Get(':name') 
  async getAgentByName(@Param('name') name: string): Promise<CharacterDto> { 
    return await this.valorantService.findAgentByName(name); 
  }

  @Post()
  async createAgent(@Body() agent: CharacterDto): Promise<boolean> { 
    return await this.valorantService.createAgent(agent); 
  }

  @Put(':name')
  async updateCharacter(@Param('name') name: string, @Body() agent: CharacterDto): Promise<boolean> { 
    return await this.valorantService.updateAgent(name, agent); 
  }

  @Delete(':name')
  async deleteAgentByName(@Param('name') name: string): Promise<boolean> { 
    return await this.valorantService.deleteAgentByName(name); 
  }
}
