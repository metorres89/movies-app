class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    /* async getById(id) {
        return await this.model.findById(id);
    } */

    async getAll() {
        return await this.model.find();
    }
    
    /* async create(entity) {
        return await this.model.create(entity);
    }

    update(id, entity) {
        return this.model.findByIdAndUpdate(id, entity, { new: true});
    }
    
    delete(id) {
        return this.model.findByIdAndDelete(id);
    } */
}

module.exports = BaseRepository;