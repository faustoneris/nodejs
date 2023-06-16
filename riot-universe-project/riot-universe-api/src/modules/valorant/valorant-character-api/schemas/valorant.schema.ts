import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ValorantSkills } from "../dtos/valorant-skills";
 

@Schema()
export class ValorantCharacters extends Document{ 
    @Prop()
    name: string; 

    @Prop()
    function: string; 

    @Prop()
    biograpy: string; 
    
    @Prop()
    skills: ValorantSkills;     
}   
export const ValorantCharactersSchema = SchemaFactory.createForClass(ValorantCharacters);