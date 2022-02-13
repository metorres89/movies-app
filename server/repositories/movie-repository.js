//TODO: agregar MovieRepository.
//TODO: agregar MovieService (que internamente usa MovieRepository)
//TODO: agregar awilix o alguna librería que permita la inyección de dependencia. Proveer MovieService como un servicio a ser inyectado en los controladores.

const BaseRepository = require('./base-repository');

class MovieRepository extends BaseRepository {

    /*
        We are using { Movie } without 'require' sentence since we are using awilix as DI library. Awilix will resolve the dependency automatically based on the name
    */
    constructor( { MovieModel } ) {
        super (MovieModel);
    }
}

module.exports = MovieRepository