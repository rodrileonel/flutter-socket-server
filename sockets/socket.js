const{io} = require('../index');
const Person = require('../models/person');
const Persons = require('../models/persons');
const persons = new Persons();

persons.addPerson(new Person('Rodrigo'));
persons.addPerson(new Person('Elvis'));
persons.addPerson(new Person('Ian'));

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    client.emit('persons',persons.getPersons());
    client.on('person-vote',(person) => {
        console.log('votando por: ',person);
        persons.votePerson(person.id);
        io.emit('persons',persons.getPersons());
    });
    client.on('person-add',(person) => {
        console.log('añadiendo a: ',person);
        const newPerson =new Person(person.name);
        persons.addPerson(newPerson);
        io.emit('persons',persons.getPersons());
    });
    client.on('person-delete',(person) => {
        console.log('borrando a: ',person);
        persons.deletePerson(person.id);
        io.emit('persons',persons.getPersons());
    });

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });
    client.on('message', (payload) => { 
        console.log('Mensaje recibido',payload);
        //ahora voy a emitir una respuesta
        io.emit('supermessage',{admin:payload['name']});
    });
    client.on('web-message', (payload) => { 
        console.log('Mensaje recibido: ',payload);
        //io.emit('flutter-message','HOLA '+payload); // emitir a todos
        client.broadcast.emit('web-message',payload); // emitir a todos menos al que lo emitió
    });
    client.on('flutter-message', (payload) => { 
        console.log('Mensaje recibido: ',payload);
        //io.emit('flutter-message','HOLA '+payload); // emitir a todos
        client.broadcast.emit('flutter-message',payload); // emitir a todos menos al que lo emitió
    });
});