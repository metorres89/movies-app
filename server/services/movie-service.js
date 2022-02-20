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

    filtersExist(filters) {
        return filters.name || filters.rating || filters.time;
    }

    async getAll(pageInfo, filters) {
        try {

            let movies = null;
            if(!this.filtersExist(filters))
                movies = await this.movieRepo.getAll();
            else
                movies = await this.movieRepo.getAllWithFilters(pageInfo, filters);
                
            if (!movies.length)
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