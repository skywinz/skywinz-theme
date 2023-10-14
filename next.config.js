module.exports ={
    appDir: true,
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = {fs: false};
        return config;
    },
    compiler: {
        styledComponents: true,
        displayName: false,
    },
    compilerOptions: {
        useUnknownInCatchVariables: false,
    }
};
