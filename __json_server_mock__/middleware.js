
//json-server添加中间件

//exports和module.exports的区别:https://blog.csdn.net/qq_31967569/article/details/82461499

module.exports = (req, res, next) => {
    if (req.method === "POST" && req.path === "/login") {
        if (req.body.username === "jack" && req.body.password === "123456") {
            return res.status(200).json({
                user: {
                    token: "123",
                },
            });
        } else {
            return res.status(400).json({ message: "用户名或者密码错误" });
        }
    }
    next();
};