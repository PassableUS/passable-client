declare module 'redux' {
  export interface Dispatch<S> {
    <A extends Action>(action: A): Promise<S>;
  }
}
