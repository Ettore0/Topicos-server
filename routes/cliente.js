var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/lista', function (req, res, next) {
    req.getConnection(function (err, connection) {
        var query = connection.query("SELECT * FROM cliente", function (err, rows) {
            if (err)
                res.json({ status: 'ERROR', data: + err });
            else
                res.json({ status: 'OK', data: rows });
        });
        if (err)
            res.json({ status: 'ERROR', data: + err });
    });
});

router.post('/deleta', function (req, res, next) {
    var id = req.query.id;
    req.getConnection(function (err, connection) {
        
        var query = connection.query("DELETE FROM cliente WHERE id = " + id, function (err, rows) {
            if (err)
                res.json({ status: 'ERROR', data: + err });
            else
                res.json({ status: 'OK', data: 'Excluido com sucesso' });
        });
        if (err)
            res.json({ status: 'ERROR', data: + err });
    });
});

module.exports = router;
