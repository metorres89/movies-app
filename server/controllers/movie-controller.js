class MovieController {
    constructor({ MovieRepository }) {
        this.repository = MovieRepository;
        this.getAll = this.getAll.bind(this);
    }

    async getAll(req, res) {
        let movies = await this.repository.getAll().catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        });

        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: movies })
    }
}

module.exports = MovieController