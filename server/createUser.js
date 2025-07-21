const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017')
  .then(async () => {
    const hashed = await bcrypt.hash('admin123', 10);
    const user = new User({ username: 'admin', password: hashed });
    await user.save();
    console.log("User created");
    process.exit();
  });

// Add password verification example
bcrypt.compare('admin123', user.password).then(match => {
  console.log('Password match:', match);
});
