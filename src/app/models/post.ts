import { FileInfo } from "./file-info";

export interface Post {


    id:number;

    text:string;

    replyTo:number[];
    repliedBy:number[];

    username?:string;
    files?:FileInfo[];
    creationDate?: string;
}
