class IsJson extends Error {
    constructor() {
        super("is not valid JSON!");
    };
};

class LoginError extends Error {
    constructor() {
        super("you need to login!");
    };
};

class EmptyMessage extends Error {
    constructor() {
        super("empty message!");
    };
};

class TargetLoginError extends Error {
    constructor() {
        super(" target is not login");
    };
};

class UsernameValidationError extends Error{
    constructor(){
        super("this username is already taken");
    };
};

module.exports = {
    LoginError,
    IsJson,
    EmptyMessage,
    TargetLoginError,
    UsernameValidationError,
}