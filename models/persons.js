const Person = require('./person')


class Persons{
    constructor(){
        this.persons =[];
    }

    addPerson(person = new Person()){
        this.persons.push(person);
    }

    getPersons(){
        return this.persons;
    }

    deletePerson(id=''){
        this.persons = this.persons.filter(person => person.id != id);
        return this.persons;
    }

    votePerson(id=''){
        this.persons = this.persons.map(person =>{
            if(person.id==id) {
                person.votes++;
                return person;
            }
            else {
                return person;
            }
        });
    }
}

module.exports = Persons;