export type AnyObject = { [k: string]: unknown };

export type AddTypeToField<T extends object, K extends keyof T, U> = {
    [Key in keyof T]: Key extends K ? T[Key] | U : T[Key];
};

export type AtLeastOneImportantFieldFromGiven<
    T extends object,
    K1 extends keyof T,
    K2 extends keyof T = K1
> = K1 extends unknown
    ? { [Key in K1]: T[Key] } & {
          [Key in K2 as Key extends K1 ? never : Key]?: T[Key];
      } & {
          [Key in keyof T as Key extends K1
              ? never
              : Key extends K2
              ? never
              : Key]: T[Key];
      }
    : never;

export function isAnyObject(arg: unknown): arg is AnyObject {
    return typeof arg == "object";
}
