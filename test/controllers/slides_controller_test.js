require('../test_helper.js').controller('slides', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        content: ''
    };
}

exports['slides controller'] = {

    'GET new': function (test) {
        test.get('/slides/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/slides', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Slide.findById;
        Slide.findById = sinon.spy(function (id, callback) {
            callback(null, new Slide);
        });
        test.get('/slides/42/edit', function () {
            test.ok(Slide.findById.calledWith('42'));
            Slide.findById = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Slide.findById;
        Slide.findById = sinon.spy(function (id, callback) {
            callback(null, new Slide);
        });
        test.get('/slides/42', function (req, res) {
            test.ok(Slide.findById.calledWith('42'));
            Slide.findById = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var slide = new ValidAttributes;
        var oldSave = Slide.prototype.save;
        Slide.prototype.save = function (callback) {
            callback(null);
        };
        test.post('/slides', slide, function () {
            Slide.prototype.save = oldSave;
            test.redirect('/slides');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var slide = new ValidAttributes;
        var oldSave = Slide.prototype.save;
        Slide.prototype.save = function (callback) {
            callback(new Error);
        };
        test.post('/slides', slide, function () {
            Slide.prototype.save = oldSave;
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        var find = Slide.findById;
        Slide.findById = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, save: function (cb) { cb(null); }});
        });
        test.put('/slides/1', new ValidAttributes, function () {
            Slide.findById = find;
            test.redirect('/slides/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        var find = Slide.findById;
        Slide.findById = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, save: function (cb) { cb(new Error); }});
        });
        test.put('/slides/1', new ValidAttributes, function () {
            Slide.findById = find;
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

