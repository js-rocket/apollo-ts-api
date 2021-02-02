// graphql schema file
declare module '*.graphql' {
  const content: string;
  export default content;
}

// Generic object type for quick conversions from js to ts
// TODO replace this type with more detailed types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _obj = { [key: string]: any };

declare module 'pg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

declare module 'chance' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Chance: any;
  export = Chance;
}
