const service = {

    getDevicons(knex) {
        return knex.from('devicons').select('*')
    },
    postDevicon(knex, devicon) {
        return knex
            .insert(devicon)
            .into('devicons')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteDevicon(knex, id) {
        knex.select('id').from('devicons')
          .where({ id })
          .delete()
          .then(rows => {
            return rows[0]
          })
      },
}

module.exports = service