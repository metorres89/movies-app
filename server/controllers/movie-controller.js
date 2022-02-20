const BaseController = require('./base-controller')

class MovieController extends BaseController {
    constructor({ MovieService }) {

        super();

        this.movieService = MovieService;

        //bind controller methods to the instance
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.delete = this.delete.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }

    getAll(req, res) {

        //pagination data
        let page = req.query.page;
        let psize = req.query.psize;

        //filters
        let name = req.query.name;
        let time = req.query.time;
        let rating = req.query.rating;

        this.movieService.getAll(
            { page: page, pageSize: psize}, 
            { name: name, time: time, rating: rating }
        )
        .then(result => {
            return this.responseFromServiceResult(res, result);
        })
        .catch(err => {
            console.log(err);
            return this.errorResponse(res, err);
        });
    }

    getById(req, res) {
        this.movieService.getById(req.params.id)
        .then(result => {
            return this.responseFromServiceResult(res, result);
        })
        .catch(err => {
            console.log(err);
            return this.errorResponse(res, err);
        });
    }

    delete(req, res) {
        this.movieService.delete(req.params.id)
        .then(result => {
            return this.responseFromServiceResult(res, result);
        })
        .catch(err => {
            console.log(err);
            return this.errorResponse(res, err);
        });
    }

    create(req, res) {
        const body = req.body;
        
        if (!body)
            return this.badRequestResponse(res, 'You must provide a movie to create.');

        this.movieService.create(body)
        .then(result => {
            return this.responseFromServiceResult(res, result);
        })
        .catch(err => {
            console.log(err);
            return this.errorResponse(res, err);
        });
    }

    update(req, res) {
        const body = req.body;
        const id = req.params.id;

        if (!body)
            return this.badRequestResponse(res, 'You must provide a movie to update');

        this.movieService.update(id, body)
        .then(result => {
            return this.responseFromServiceResult(res, result);
        })
        .catch(err => {
            console.log(err);
            return this.errorResponse(res, err);
        });
    }
}

module.exports = MovieController