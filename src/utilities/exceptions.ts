//

export class FsException extends Error {
    message: string;
    name: string;

    constructor(message: string, name?: string) {
        super(message);
        this.message = message;
        this.name = name ? name : "";
        this.stack = (<any>new Error()).stack;
    }

    toString(): string {
        return this.name + ", " + this.message;
    }
}
