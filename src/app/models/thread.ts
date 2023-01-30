import { FileInfo } from "./file-info";
import { Post } from "./post";

export interface Thread {
    boardId:number;
    id?:number;
    title:string;
    text:string;
    posts?:Post[];
    userId?:number;
    username?:string;
    files?:FileInfo[];
    creationDate?:string;
}
