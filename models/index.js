// import all models here
const User = require("./User");
const ExampleData = require("./ExampleData");
const Book = require("./Book");
const Comment = require("./Comment");
const BookComment = require("./BookComment");

// IN DEVELOPMENT: db pathways; User has many Books and many Comments. Books have many Comments. Comments connect to single User and single Book through BookComment
User.hasMany(Book, {
  foreignKey: 'user_id',
})

User.hasMany(Comment, {
  through: BookComment,
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

Comment.belongsToMany(User, {
through: BookComment,
foreignKey: 'user_id',
onDelete: 'CASCADE',
})

Comment.belongsTo(Book, {
  through: bookComment,
  foreignKey: 'book_id',
  onDelete: 'CASCADE',
})

Book.hasMany(Comment, {
  through: bookComment,
  foreignKey: 'book_id'
})

// export all models here
module.exports = { User, ExampleData };
