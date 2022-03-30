const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


module.exports = mongoose.connect('mongodb://localhost/react-todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});