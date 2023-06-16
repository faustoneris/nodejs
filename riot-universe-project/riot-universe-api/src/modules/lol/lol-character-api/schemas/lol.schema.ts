import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CharacterSkills } from "../dtos/lol-character-skills.dto";
import { CharacterSkins } from "../dtos/lol-character-skins.dto";

@Schema() 
export class LolHero extends Document { 
    @Prop()
    name: string

    @Prop()
    lore: string

    @Prop()
    characterSkins: CharacterSkins[]

    @Prop()
    characterSkills: CharacterSkills

    constructor(hero?: Partial<LolHero>) {
        super();
        this.name = hero.name; 
        this.lore = hero.lore; 
        this.characterSkills = hero.characterSkills; 
        this.characterSkins = hero.characterSkins; 
    }
}

export const LolCharacterSchema = SchemaFactory.createForClass(LolHero);

 
