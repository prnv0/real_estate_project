module.exports = function override(config, env) {
    // Find the rule that handles source maps
    const sourceMapRule = config.module.rules.find(rule =>
        rule.use && rule.use.find(use => use.loader && use.loader.includes('source-map-loader'))
    );

    if (sourceMapRule) {
        // Modify the rule to exclude CSS files
        sourceMapRule.exclude = /\.css$/;
    }

    return config;
};