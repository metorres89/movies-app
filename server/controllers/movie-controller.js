class MovieController {
    constructor({ MovieRepository }) {
        this.repository = MovieRepository;

        //bind controller methods to the instance
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
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
}

module.exports = MovieController