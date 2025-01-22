import { randomUUID } from "crypto";
import { Address } from "./address";
import { Contact } from "./contact";

export class ClientModel {
    clientId: string;
    name: string;
    dateOfBirth: Date;
    active: boolean;
    addresses: Address[]
    contacts: Contact[]

    constructor(event: any) {
        event = JSON.parse(event);
        this.clientId = randomUUID();
        this.name = event.name;
        this.active = event.active;
        this.addresses = event.addresses;
        this.contacts = event.contacts;
        this.dateOfBirth = event.dateOfBirth;
    }

    static ofEvent(event: any): ClientModel {
        return new ClientModel(event);
    }
}
