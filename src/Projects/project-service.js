const service = {

  getProjects(knex) {
    return knex.from('projects').select('*')
  },
  postProject(knex, newProject) {
    return knex
      .insert(newProject)
      .into('projects')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
}

module.exports = service