const service = {

    getAboutP1(knex) {
        return knex.from('about-p2').select('*')
    },
    postAboutP1(knex, about) {
        return knex
            .insert(about)
            .into('about-p2')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteAboutP1(knex) {
        knex.select('p2').from('about-p2')
            .delete()
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = service