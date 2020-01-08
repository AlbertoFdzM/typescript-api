export interface Parser<TInput, TOutput> {
  parse(data: TInput): TOutput;
}
