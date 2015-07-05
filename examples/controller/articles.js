/* http://localhost:3000/articles/view */
exports.view = function(req, res) {
    var locals = {
        title: 'Articles',
        users: ['Article1', 'Article2', 'Article3'],
        pagename: 'awesome people locals',
        params: JSON.stringify(req.params)
    };
    /*No articles DIR is created inside view DIR, so pointing file index inside the index view DIR */
    res.render('index/index', locals);
}