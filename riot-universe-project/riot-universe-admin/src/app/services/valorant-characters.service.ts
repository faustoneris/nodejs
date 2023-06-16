import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

const CHARACTER_API = "http://localhost:3000";
@Injectable()
export class CharacterService {
    constructor(private http: HttpClient) { }

    async findCharacters() {
        return this.http.get<any>(`${CHARACTER_API}`).subscribe(response => {console.log(response);});
    }
}