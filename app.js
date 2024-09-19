const webSocket = require("ws");
const { LoginError, IsJson, EmptyMessage, TargetLoginError, UsernameValidationError } = require("./core/customError.js");
const isJsonString = require("./core/validators.js");

//create server socket
const server = new webSocket.Server({ port: 4000 });
const all_clients = {};

server.on("connection", (client) => {
    client.send(JSON.stringify({ message: "welocome to Server" }));
    client.send(JSON.stringify({ message: "please login" }));

    client.on("message", (msg) => {
        try {
            if (!isJsonString(msg)) {
                throw new IsJson();
            };
            let parsedMsg = JSON.parse(msg.toString());

            if ("login" in parsedMsg) {
                if (all_clients[parsedMsg.login]) {
                    throw new UsernameValidationError();
                };
                all_clients[parsedMsg.login] = client;
                client.send(JSON.stringify("Welcome " + parsedMsg.login));
            };

            if ("target" in parsedMsg) {
                if (parsedMsg.sender in all_clients === false) {
                    throw new LoginError();
                };

                if (parsedMsg.namak === "") {
                    throw new EmptyMessage();
                };

                parsedMsg.target.forEach(target => {
                    if (target in all_clients === false) {
                        throw new TargetLoginError(target);
                    };
                });

                parsedMsg.target.forEach(target => {
                    all_clients[target].send(JSON.stringify({
                        message: parsedMsg.namak,
                        from: parsedMsg.sender,
                    }));
                });

                // if (parsedMsg.target in all_clients === false) {
                //     throw new TargetLoginError();
                // };

                // let targetClient = all_clients[parsedMsg.target];
                // targetClient.send(JSON.stringify({
                //     message: parsedMsg.namak,
                //     from: parsedMsg.sender,
                // }));
            };
        } catch (err) {
            console.log(JSON.stringify({ error: err.message }));
        };
    });
});

// for login:
// {"login": "anna"}

//for message:
// {
//     "sender": "anna",
//     "target": "karina",
//     "namak": "hello Karina",
// }
