declare interface Babel {
  transform: (
    code: string,
    options: {
      plugins: string[];
      presets: (string | [string, { [key: string]: boolean }])[];
    },
  ) => { code: string };
}
