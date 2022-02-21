const ServiceResult = require('./service-result');

class MovieService {

    constructor({ MovieRepository }) {
        this.movieRepo = MovieRepository;
    }

    async getById(id) {
        try {
            const movie = await this.movieRepo.getById(id);
            
            if (!movie)
                return new ServiceResult(false, new Error('Movie not found'), null);

            return new ServiceResult(true, null, movie);
            
        } catch(err) {
            return new ServiceResult(false, err, null);
        }
    }

    buildQueryConditions(filters) {
        let conditions = {};        

        if(filters.name) conditions['name'] = filters.name;
        if(filters.rating) conditions['rating'] = filters.rating;
        if(filters.time) conditions['time'] = { '$all': filters.time }; //$all: matches documents which time array property containing specified value

        return conditions;
    }

    buildPageOptions(pageInfo) {
        let pageOptions = {};
        
        if(pageInfo.page) pageOptions['page'] = pageInfo.page;
        if(pageInfo.pageSize) pageOptions['limit'] = pageInfo.pageSize;

        return pageOptions;
    }

    async getAll(pageInfo, filters) {
        try {

            let movies = null;
            let pageOptions = this.buildPageOptions(pageInfo);
            let queryConditions = this.buildQueryConditions(filters);

            if(Object.keys(pageOptions).length === 0)
                movies = await this.movieRepo.getAll(queryConditions);
            else
                movies = await this.movieRepo.getPage(queryConditions, pageOptions);
            
            if (!movies.length && !movies.docs)
                return new ServiceResult(false, new Error('Movies not found'), null);

            return new ServiceResult(true, null, movies);
            
        } catch(err) {
            return new ServiceResult(false, err, null);
        }
    }
    
    async create(movieToCreate) {
        try {
            const newCreatedMovie = await this.movieRepo.create(movieToCreate);

            if (!newCreatedMovie)
                return new ServiceResult(false, new Error('Movie was not created.'), null);

            return new ServiceResult(true, null, newCreatedMovie);

        } catch(err) {
            return new ServiceResult(false, err, null);
        }
    }

    async update(id, movieToUpdate) {
        try {
            const updatedMovie = await this.movieRepo.update(id, movieToUpdate);
            if(!updatedMovie)
                return new ServiceResult(false, new Error('Movie was not updated.'), null);
            return new ServiceResult(true, null, updatedMovie);
        } catch(err) {
            return new ServiceResult(false, err, null);
        }
    }
    
    async delete(id) {
        try {
            const deletedMovie = await this.movieRepo.delete(id);
            if (!deletedMovie)
                return new ServiceResult(false, new Error('Movie not found.'), null);
            return new ServiceResult(true, null, deletedMovie);
        } catch(err) {
            return new ServiceResult(false, err, null);
        }
    }
}

module.exports = MovieService;