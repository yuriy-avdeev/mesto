const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плаг
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключите к проекту mini-css-extract-plugin

module.exports = 
{
    entry: { main: '../src/pages/index.js' },
    output: 
    {
        path: path.resolve(__dirname, 'dist'), // переписали точку выхода, используя утилиту path
        filename: 'main.js',
                publicPath: ''
    },
    mode: 'development', // добавили режим разработчика
    devServer: 
    {
        contentBase: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true // сайт будет открываться сам при запуске npm run dev
    },
    module: 
    {
        rules: 
        [ // rules — это массив правил 
            {   // добавим в него объект правил для бабеля
            test: /\.js$/,  // регулярное выражение, которое ищет все js файлы
            use: 'babel-loader',  // при обработке этих файлов нужно использовать babel-loader
            exclude: '/node_modules/'  // исключает папку node_modules, файлы в ней обрабатывать не нужно
            },
            
            {   // добавили правило для обработки файлов
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,  // регулярное выражение, кот. ищет все файлы с такими расширениями
                type: 'asset/resource' //указали в каком виде Вебпак перенесёт файлы в папку dist (за это отвечает св-во type - 
                // его значение asset/resource позволяет переносить исходные файлы в конечную сборку в том же формате.
            },
            {
                test: /\.css$/,  // применять это правило только к CSS-файлам
                // при обраб-ке этих файлов - использовать MiniCssExtractPlugin.loader и css-loader:
                use: [
                    MiniCssExtractPlugin.loader, 
                    { 
                        loader: 'css-loader',     
                        // если  используем директиву @import в css-файлах - добавляем объект options
                        options: { importLoaders: 1 }
                    },
                    // Добавьте postcss-loader
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: // добавьте массив:
    [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(), // использовали плагин (настраивать его не нужно)
        new MiniCssExtractPlugin()  // подключение плагина для объединения файлов
    ] 
}