const service = {

    getAboutP1(knex) {
        return knex.from('about-p1').select('*')
    },
    getAboutP2(knex) {
        return knex.from('about-p2').select('*')
    },
    getProjects(knex) {
        return knex.from('projects').select('*')
    },
}

module.exports = service