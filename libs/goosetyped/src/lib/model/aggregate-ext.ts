declare module 'mongoose' {
    export interface Aggregate<ResultType> {
        group<T>(this: Aggregate<ResultType>, arg: PipelineStage.Group['$group']): Aggregate<T>;
        project<T>(this: Aggregate<ResultType>, arg: PipelineStage.Project['$project']): Aggregate<T>;
    }
}
