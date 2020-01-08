export interface Factory<TInput, TOutput> {
  create (input: TInput): TOutput;
}
