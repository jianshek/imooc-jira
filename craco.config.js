const CracoLessPlugin = require("craco-less");

//使用craco配置全局样式  https://ant.design/docs/react/use-with-create-react-app-cn
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "rgb(0, 82, 204)",
                            "@font-size-base": "16px",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};