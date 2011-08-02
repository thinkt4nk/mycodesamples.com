require('../test_helper.js').controller('documents', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        slides: '',
        uri: '',
        title: ''
    };
}

exports['documents controller'] = {

    'GET new': function (test) {
        test.get('/documents/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/documents', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Document.findById;
        Document.findById = sinon.spy(function (id, callback) {
            callback(null, new Document);
        });
        test.get('/documents/42/edit', function () {
            test.ok(Document.findById.calledWith('42'));
            Document.findById = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Document.findById;
        Document.findById = sinon.spy(function (id, callback) {
            callback(null, new Document);
        });
        test.get('/documents/42', function (req, res) {
            test.ok(Document.findById.calledWith('42'));
            Document.findById = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var document = new ValidAttributes;
        var oldSave = Document.prototype.save;
        Document.prototype.save = function (callback) {
            callback(null);
        };
        test.post('/documents', document, function () {
            Document.prototype.save = oldSave;
            test.redirect('/documents');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var document = new ValidAttributes;
        var oldSave = Document.prototype.save;
        Document.prototype.save = function (callback) {
            callback(new Error);
        };
        test.post('/documents', document, function () {
            Document.prototype.save = oldSave;
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        var find = Document.findById;
        Document.findById = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, save: function (cb) { cb(null); }});
        });
        test.put('/documents/1', new ValidAttributes, function () {
            Document.findById = find;
            test.redirect('/documents/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        var find = Document.findById;
        Document.findById = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, save: function (cb) { cb(new Error); }});
        });
        test.put('/documents/1', new ValidAttributes, function () {
            Document.findById = find;
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

