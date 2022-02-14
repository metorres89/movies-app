class MovieController {
    constructor({ MovieService }) {
        this.movieService = MovieService;

        //bind controller methods to the instance
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.delete = this.delete.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }

    buildResponseFromServiceResult(res, serviceResult) {
        if(!serviceResult.success)
            return res.status(404).json({ success: false, error: serviceResult.error, data: serviceResult.data });
        return res.status(200).json({ success: true, data: serviceResult.data });
    }

    getAll(req, res) {
        this.movieService.getAll()
        .then(result => {
            return this.buildResponseFromServiceResult(res, result);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        });
    }

    getById(req, res) {
        this.movieService.getById(req.params.id)
        .then(result => {
            return this.buildResponseFromServiceResult(res, result);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, error: err})
        });
    }

    delete(req, res) {
        this.movieService.delete(req.params.id)
        .then(result => {
            return this.buildResponseFromServiceResult(res, result);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, error: err})
        });
    }

    create(req, res) {
        const body = req.body;
        
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a movie to create',
            })
        }

        this.movieService.create(body)
        .then(result => {
            return this.buildResponseFromServiceResult(res, result);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        });
    }

    update(req, res) {
        const body = req.body;
        const id = req.params.id;

        if (!body)
            return res.status(400).json({ success: false, error: 'You must provide a movie to update' });

        this.movieService.update(id, body)
        .then(result => {
            return this.buildResponseFromServiceResult(res, result);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        });
    }
}

module.exports = MovieController