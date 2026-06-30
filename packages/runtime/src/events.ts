export interface EventEmitter {
  emit(event: string, payload?: unknown): void;
}