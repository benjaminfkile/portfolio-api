const service = {

    getPallettes(knex) {
        return knex.from("pallettes").select("*")
    },
    getPalletteById(knex, id) {
        return knex.from('pallettes').select('*').where('pallette_id', id).first()
    },
    postPallette(knex, pallette) {
        return knex
            .insert(pallette)
            .into("pallettes")
            .returning("*")
            .then(rows => {
                return rows[0]
            })
    },
    deletePallette(knex, id) {
        return knex.select(id).from('pallettes')
            .where({ id })
            .delete()
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = service