const BaseRepository = require('./base-repository');

class MovieRepository extends BaseRepository {

    /*
        We are using { Movie } without 'require' sentence since we are using awilix as DI library. Awilix will resolve the dependency automatically based on the name
    */
    constructor( { MovieModel } ) {
        super (MovieModel);
    }

    async getAllWithFilters(pageInfo, filters) {

        let conditions = {};
        
        if(filters.name)
            conditions['name'] = filters.name;

        if(filters.rating)
            conditions['rating'] = filters.rating;
        
        if(filters.time)
            conditions['time'] = { '$all': filters.time }; //$all: matches documents which time array property containing specified value

        console.log(conditions);

        return this.getAll(conditions);
    }
}

module.exports = MovieRepository