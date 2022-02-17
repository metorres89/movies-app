class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async getById(id) {
        return await this.model.findById({ _id: id });
    }

    async getAll() {
        return await this.model.find();
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

        return await this.model.find(conditions);
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