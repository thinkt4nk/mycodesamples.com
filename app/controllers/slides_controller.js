load('application');

before(loadSlide, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.slide = new Slide;
    this.title = 'New slide';
    render();
});

action('create', function () {
    this.slide = new Slide;
    ['title', 'content'].forEach(function (field) {
        if (typeof req.body[field] !== 'undefined') {
            this.slide[field] = req.body[field];
        }
    }.bind(this));
    this.slide.save(function (errors) {
        if (errors) {
            this.title = 'New slide';
            flash('error', 'Slide can not be created');
            render('new');
        } else {
            flash('info', 'Slide created');
            redirect(path_to.slides);
        }
    }.bind(this));
});

action('index', function () {
    Slide.find(function (err, slides) {
        this.slides = slides;
        this.title = 'Slides index';
        render();
    }.bind(this));
});

action('show', function () {
    this.title = 'Slide show';
    render();
});

action('edit', function () {
    this.title = 'Slide edit';
    render();
});

action('update', function () {
    ['title', 'content'].forEach(function (field) {
        if (typeof req.body[field] !== 'undefined') {
            this.slide[field] = req.body[field];
        }
    }.bind(this));

    this.slide.save(function (err) {
        if (!err) {
            flash('info', 'Slide updated');
            redirect(path_to.slide(this.slide));
        } else {
            this.title = 'Edit slide details';
            flash('error', 'Slide can not be updated');
            render('edit');
        }
    }.bind(this));
});

action('destroy', function () {
    this.slide.remove(function (error) {
        if (error) {
            flash('error', 'Can not destroy slide');
        } else {
            flash('info', 'Slide successfully removed');
        }
        send("'" + path_to.slides + "'");
    });
});

function loadSlide () {
    Slide.findById(req.params.id, function (err, slide) {
        if (err || !slide) {
            redirect(path_to.slides);
        } else {
            this.slide = slide;
            next();
        }
    }.bind(this));
}
