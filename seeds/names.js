var faker = require("faker");
var names = [];

for (i = 0; i < 100; i++) {
  var randomName = faker.name.findName();
  var data = { name: randomName};
  names.push(data);
}

console.log(names)

module.exports = names;
