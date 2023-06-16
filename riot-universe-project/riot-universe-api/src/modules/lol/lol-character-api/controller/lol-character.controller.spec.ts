import { Test, TestingModule } from "@nestjs/testing";
import { CharacterSkills } from "../dtos/lol-character-skills.dto";
import { LolHero } from "../schemas/lol.schema";
import { LolCharacterService } from "../services/lol-character.service";
import { LolCharacterController } from "./lol-character.controller";


const lolHerosList: LolHero[] = [
    new LolHero(
        {
            id: '1',
            name: 'Karthus', 
            lore: 'Karthus Lore', 
            characterSkills: new CharacterSkills({
                passive: 'Morre e pode dar dano', 
                q: 'Bolinha que da mais dano em alvo isolado', 
                w: 'Slow e diminui MR do cara que passar', 
                e: 'Circulo em area em volta dele',
                r: 'Ult global'}),  
            characterSkins: []
        }),
    new LolHero(
        {
            id: '2',
            name: 'Evelynn', 
            lore: 'Evelynn Lore', 
            characterSkills: new CharacterSkills({
                passive: 'Recupera vida e no nivel 6 fica invisivel', 
                q: 'Lanca um espinho que stacka', 
                w: 'Da um charme', 
                e: 'Avanca no cara', 
                r: 'Finaliza'}),  
            characterSkins: []
        }),
    new LolHero(
        {
            id: '3',
            name: 'Elise', 
            lore: 'Elise Lore', 
            characterSkills: new CharacterSkills({
                passive: 'Vira aranha', 
                q: 'Avanca no cara dano dano', 
                w: 'lanca uma aranha/atq speed', 
                e: 'Lanca um casulo ou rapel', 
                r: 'Intercala entre aranha e humana'}),  
            characterSkins: []
        })
]

describe('LolCharacterController', () => {
    let lolCharacterController: LolCharacterController;
    let lolCharacterService: LolCharacterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LolCharacterController],
            providers: [{
                provide: LolCharacterService,
                useValue: {
                    fetchAllHeros: jest.fn().mockResolvedValue(lolHerosList),
                    createHero: jest.fn(),
                    findHeroByName: jest.fn()
                }
            }]
        }).compile();

        lolCharacterController = module.get<LolCharacterController>(LolCharacterController);
        lolCharacterService = module.get<LolCharacterService>(LolCharacterService); 
    });

    it('Definindo testes', () => {
        expect(lolCharacterController).toBeDefined();
        expect(lolCharacterService).toBeDefined(); 
    })

    describe('fetchAllHeros', async () => { 
        const result = lolCharacterController.fetchAllHeros(); 

        expect(result).toEqual([]);  
    })
}); 