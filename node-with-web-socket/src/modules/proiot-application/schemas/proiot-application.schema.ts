import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class ProiotApplication extends Document { 

   @Prop({ type: Object })
   device: any; 

}
export const ProiotApplicationSchema = SchemaFactory.createForClass(ProiotApplication); 