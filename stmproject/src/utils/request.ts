var pkg = require("./package.json");

// 业务Api的commonUrl
var commonUrl: string = pkg.projectConfig.proxy

const request = (input: RequestInfo, init?: RequestInit): Promise<Response> => {

    return fetch(input, init)
}

export default request