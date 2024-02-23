import { ReactNode } from "react";

export type AnyObject = { [k: string]: unknown };

export function isAnyObject(arg: unknown): arg is AnyObject {
    return typeof arg == "object";
}

export type ReactContentFC<P = object> = React.FunctionComponent<
    P & { children: ReactNode }
>;

export type AddTypeToField<T extends object, K extends keyof T, U> = {
    [Key in keyof T]: Key extends K ? T[Key] | U : T[Key];
};

export type PartialFields<T extends object, U extends keyof T> = {
    [K in U]?: T[K];
} & {
    [K in keyof T as K extends U ? never : K]: T[K];
};

export type FlagsObjectFromUnion<T extends string> = {
    [K in T]: boolean;
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

export type AnyInnerFieldType<T extends object, K = keyof T> = K extends keyof T
    ? T[K] extends object
        ? T[K] | AnyInnerFieldType<T[K]>
        : T[K]
    : never;

export type TypeOrItsAnyInnerField<T> = T extends object
    ? T | AnyInnerFieldType<T>
    : T;
