import '../logger';
export declare class CRUD {
    private entity;
    constructor(entity: string);
    list(params?: any): Promise<any>;
    get(id: string | number): Promise<any>;
    create(data: any): Promise<any>;
    update(id: string | number, data: any): Promise<any>;
    delete(id: string | number): Promise<any>;
    static merge(key: string, obj: Record<string, any>): CRUD & Record<string, any>;
}
