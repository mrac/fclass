interface Array<T> {
    find(predicate:(value:T, index:number, obj:Array<T>) => boolean, thisArg?:any): T;
    findIndex(predicate:(value:T, index:number, obj:Array<T>) => boolean, thisArg?:any): number;
}
