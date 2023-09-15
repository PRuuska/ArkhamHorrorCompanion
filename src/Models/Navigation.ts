export type Navigation = {
    navigate: (page: string, params?:object) => void;
    canGoBack:()=>boolean;
    //dispatch:(action:StackActionType) => void;    
    reset:(data:{index:number, route:Array<{name:string}>}) => void;
    setOptions:(options:{headerTitle?:string,title?:string}) => void;
    goBack:()=>void;
    getState: () => any;    
    addListener:(handlerOrEvent:string|Function,handler?:Function) => void;    
}