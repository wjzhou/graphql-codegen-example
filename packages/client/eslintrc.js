module.exports = {
    extends: ['airbnb-typescript'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        "graphql/template-strings": ['error', {
            env: 'appolo',

            // Import your schema JSON here
            schemaString: require('../server/src/schema.graphql.ts'),

            // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
            // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

            // OR provide the schema in the Schema Language format
            // schemaString: printSchema(schema),

            // tagName is set for you to Relay.QL
        }]
    },
    plugins: [
        'graphql'
    ]
};