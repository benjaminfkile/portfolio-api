const service = {

    getAboutP1(knex) {
        return knex.from('about-p1').select('*')
    },
    getAboutP2(knex) {
        return knex.from('about-p2').select('*')
    },
    getSkillsP1(knex){
        return knex.from('skills-p1').select('*')
    },
    getDevicons(knex) {
        return knex.from('devicons').select('*')
    },
    getProjects(knex) {
        return knex.from('projects').select('*')
    },
}

module.exports = service