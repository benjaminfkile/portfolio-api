const service = {

    getSkillsP1(knex) {
        return knex.from('skills-p1').select('*')
    },
    postSkillsP1(knex, skill) {
        return knex
            .insert(skill)
            .into('skills-p1')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteSkillsP1(knex) {
        knex.select('p1').from('skills-p1')
            .delete()
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = service