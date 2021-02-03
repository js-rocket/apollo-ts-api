// graphql schema file
declare module '*.graphql' {
  const graphql_schema_content: string;
  export = graphql_schema_content;
}

// Generic object type for quick conversions from js to ts
// TODO replace this type with more detailed types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _obj = { [key: string]: any };

declare module 'pg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pg_module: any;
  export = pg_module;
}

declare module 'chance' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Chance: any;
  export = Chance;
}
