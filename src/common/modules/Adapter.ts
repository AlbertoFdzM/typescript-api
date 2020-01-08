export interface Adapter<TInput, TOutput> {
  adapt(source: TInput): Promise<TOutput>;
}
