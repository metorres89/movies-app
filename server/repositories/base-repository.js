class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async getById(id) {
        return await this.model.findById({ _id: id });
    }

    async getAll(conditions) {
        if(!conditions)
            return await this.model.find();
        return await this.model.find(conditions);
    }
    
    async getPage(conditions, pageOptions) {
        return await this.model.paginate(conditions, pageOptions);
    }

    async create(entity) {
        return await this.model.create(entity);
    }

    async update(id, entity) {
        return await this.model.findByIdAndUpdate(id, entity, { new: true});
    }
    
    async delete(id) {
        return await this.model.findOneAndDelete({ _id: id });
    }
}

module.exports = BaseRepository;