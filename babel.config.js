module.exports = api => {
  api.cache(false);

  const presets = [];

  presets.push([
    "@babel/preset-env",
    {
      targets: {
        node: "8",
      },
    },
  ]);

  const env = {
    debug: {
      retainLines: true,
      sourceMaps: "inline",
    },
  };

  return {
    env,
    presets,
  };
};
