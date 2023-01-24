export interface Post {

    id:number;

    text:string;

    replyTo:number[];
    repliedBy:number[];

    username?:string;
    
}
