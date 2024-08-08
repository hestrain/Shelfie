// import all models here
const User = require("./User");
const ExampleData = require("./ExampleData");

// Reminder- create any additional associations here
// ExampleData.belongsTo(User, {
//   foreignKey: "userId",
//   onDelete: "CASCADE",
// });

// User.hasMany(ExampleData, {
//   foreignKey: "userId",
// });

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
})

Comment.belongsTo(Book, {
  through: bookComment,
  foreignKey: 'book_id',
})

Book.hasMany(Comment, {
  through: bookComment,
  foreignKey: 'book_id'
})

// export all models here
module.exports = { User, ExampleData };
