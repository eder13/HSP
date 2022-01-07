module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-nested'),
        require('postcss-custom-media')({
            importFrom: './src/main/frontend/css/media-queries.css'
        }),
        require('autoprefixer')
    ]
};
