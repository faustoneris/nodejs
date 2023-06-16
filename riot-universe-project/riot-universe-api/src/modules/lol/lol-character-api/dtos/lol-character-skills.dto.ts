export class CharacterSkills { 
    passive: string;
    q: string;
    w: string;
    e: string;
    r: string;

    constructor(skills?: Partial<CharacterSkills>) {
        this.passive = skills.passive; 
        this.q = skills.q; 
        this.w = skills.w; 
        this.e = skills.e; 
        this.r = skills.r; 
    }
}