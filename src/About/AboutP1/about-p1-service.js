const service = {

    getAboutP1(knex) {
        return knex.from('about-p1').select('*')
    },
    postAboutP1(knex, about) {
        return knex
            .insert(about)
            .into('about-p1')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteAboutP1(knex) {
        knex.select('p1').from('about-p1')
            .delete()
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = service