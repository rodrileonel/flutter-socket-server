const { v4:uuid } = require('uuid');
class Person{
    constructor (name='no-mame'){
        this.id = uuid();//identificador unico
        this.name = name,
        this.votes = 0
    }
}

module.exports = Person;