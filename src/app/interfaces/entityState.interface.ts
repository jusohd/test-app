
export interface HashMap<T> {
    [id: string]: T;
}

export interface EntityState<Entity = any, IdType = any> {
    entities: HashMap<Entity>;
    ids: IdType[];
    loading: boolean;
    error: any;
}
