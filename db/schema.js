var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

  , UserSchema        = new Schema
//, PostSchema        = new Schema
//, CommentSchema     = new Schema
  ;

UserSchema.add({
    email:           { type: String,   index: true },
    password:        { type: String    },
    activated:       { type: Boolean   }
});
mongoose.model("User", UserSchema);

/*
PostSchema.add({
    title:           { type: String    },
    content:         { type: String    },
    comments:        [ CommentSchema   ]
});
mongoose.model("Post", PostSchema);

CommentSchema.add({
    title:           { type: String    },
    post:            { type: ObjectId, index: true }
});
mongoose.model("Comment", CommentSchema);
*/

['User'/*, 'Post', 'Comment'*/].forEach(function (m) {
    module.exports[m] = mongoose.model(m);
});


/**
 * Document
 */
var DocumentSchema = new Schema;
DocumentSchema.add({
    slides: { type: Array },
    uri: { type: String },
    title: { type: String }
});
mongoose.model("Document", DocumentSchema);
module.exports["Document"] = mongoose.model("Document");module.exports["Document"].modelName = "Document"


/**
 * Slide
 */
var SlideSchema = new Schema;
SlideSchema.add({
    title: { type: String },
    content: { type: String }
});
mongoose.model("Slide", SlideSchema);
module.exports["Slide"] = mongoose.model("Slide");module.exports["Slide"].modelName = "Slide"