import { Injectable } from "@nestjs/common";
import { LolHerosDto } from "../dtos/lol-character.dto";
import { HeroRepository } from "../repository/lol-character.repository";


@Injectable()
export class LolCharacterService {
    constructor(private readonly heroRepository: HeroRepository) {}

    async findAllCharacters(): Promise<LolHerosDto[]> { 
        return await this.heroRepository.fetchAllHeros(); 
    }

    async createHero(character: LolHerosDto): Promise<LolHerosDto> {
        this.Validate(character); 
        return await this.heroRepository.createHero(character); 
    }

    async findHeroByName(name: string): Promise<LolHerosDto> {
        return await this.heroRepository.findHeroByName(name); 
    } 

    async updateHeroByName(name: string, hero: LolHerosDto): Promise<boolean> {
        this.Validate(hero); 
        return await this.heroRepository.updateHeroByName(name, hero); 
    }

    async deleteHeroByName(name: string): Promise<boolean> {
        return await this.heroRepository.deleteHeroByName(name); 
    }


    private Validate(character: LolHerosDto): void {         
        if (!character) { 
            throw new Error("Preencha os dados antes de salvar o personagem."); 
        }

        const { name, lore, characterSkills, characterSkins } =  character; 


        if (!name) { 
            throw new Error(`Nome do personagem é obrigátorio.`); 
        }

        if (!lore) {
            throw new Error(`Lore do personagem ${name} é obrigátoria.`); 
        }

        if (!characterSkills) { 
            throw new Error(`Hablidades do personagem são obrigátorios.`); 
        }

        if (!characterSkills.passive) { 
            throw new Error(`Passiva do personagem é obrigátoria.`); 
        } 

        if (!characterSkills.q) { 
            throw new Error(`Hablidade Q do personagem é obrigátoria.`); 
        } 

        if (!characterSkills.w) { 
            throw new Error(`Hablidade W do personagem é obrigátoria.`); 
        } 

        if (!characterSkills.e) { 
            throw new Error(`Hablidade E do personagem é obrigátoria.`); 
        } 

        if (!characterSkills.r) { 
            throw new Error(`Hablidade R do personagem é obrigátoria.`); 
        } 
        
    }
}