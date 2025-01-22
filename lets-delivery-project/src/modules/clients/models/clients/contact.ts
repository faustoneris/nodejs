export class Contact {
    email: string;
    phone: number;
    isPrincipal: boolean;

    isPrincipalContact(): boolean {
        return this.isPrincipal;
    }
}
