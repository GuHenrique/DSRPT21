function error404(req, resp) {
    return resp.status(404).json(
        {"msg": "ERRO 404"} 
        // MY-ERROR-PAGE require('../app/views/base/erros/404.marko')
    );
}

// User for req error
function error500(erro, req, resp) {
    return resp.status(500).json(
        {"msg": "ERRO 500"} 
        // MY-ERROR-PAGE require('../app/views/base/erros/500.marko')
    );
}

module.exports = {
    e404 : error404,
    e500 : error500
};