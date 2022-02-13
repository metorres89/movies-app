class MovieController {
    constructor({ MovieRepository }) {
        this.repository = MovieRepository;

        //bind controller methods to the instance
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.delete = this.delete.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }

    getAll(req, res) {
        this.repository.getAll()
        .then(movies => {
            if (!movies.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Movie not found` })
            }
    
            return res.status(200).json({ success: true, data: movies })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        });
    }

    getById(req, res) {
        this.repository.getById(req.params.id)
        .then(movie => {
            if (!movie) {
                return res
                    .status(404)
                    .json({ success: false, error: `Movie not found` });
            }
            return res.status(200).json({ success: true, data: movie });
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, error: err})
        });
    }

    delete(req, res) {
        this.repository.delete(req.params.id)
        .then((movie, err) => {

            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!movie) {
                return res
                    .status(404)
                    .json({ success: false, error: `Movie not found` })
            }
    
            return res.status(200).json({ success: true, data: movie })
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

        this.repository.create(body)
        .then(movie => {
            if (!movie) {
                return res.status(400).json({ success: false, error: err })
            }

            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Movie created!',
            })
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

        this.repository.update(id, body)
        .then(movie => {
            return res.status(200).json({
                success: true,
                id: movie._id,
                message: 'Movie updated!',
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        });
    }
}

module.exports = MovieController