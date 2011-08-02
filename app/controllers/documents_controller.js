load('application');

before(loadDocument, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.document = new Document;
    this.title = 'New document';
    render();
});

action('create', function () {
    this.document = new Document;
    ['slides', 'uri', 'title'].forEach(function (field) {
        if (typeof req.body[field] !== 'undefined') {
            this.document[field] = req.body[field];
        }
    }.bind(this));
    this.document.save(function (errors) {
        if (errors) {
            this.title = 'New document';
            flash('error', 'Document can not be created');
            render('new');
        } else {
            flash('info', 'Document created');
            redirect(path_to.documents);
        }
    }.bind(this));
});

action('index', function () {
    Document.find(function (err, documents) {
        this.documents = documents;
        this.title = 'Documents index';
        render();
    }.bind(this));
});

action('show', function () {
    this.title = 'Document show';
    render();
});

action('edit', function () {
    this.title = 'Document edit';
    render();
});

action('update', function () {
    ['slides', 'uri', 'title'].forEach(function (field) {
        if (typeof req.body[field] !== 'undefined') {
            this.document[field] = req.body[field];
        }
    }.bind(this));

    this.document.save(function (err) {
        if (!err) {
            flash('info', 'Document updated');
            redirect(path_to.document(this.document));
        } else {
            this.title = 'Edit document details';
            flash('error', 'Document can not be updated');
            render('edit');
        }
    }.bind(this));
});

action('destroy', function () {
    this.document.remove(function (error) {
        if (error) {
            flash('error', 'Can not destroy document');
        } else {
            flash('info', 'Document successfully removed');
        }
        send("'" + path_to.documents + "'");
    });
});

function loadDocument () {
    Document.findById(req.params.id, function (err, document) {
        if (err || !document) {
            redirect(path_to.documents);
        } else {
            this.document = document;
            next();
        }
    }.bind(this));
}
