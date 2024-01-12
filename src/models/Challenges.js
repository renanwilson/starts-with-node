class Challenges {
  constructor({ id, title, description, tasks_lists }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tasks_lists = tasks_lists;
  }
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      tasks_lists: this.tasks_lists,
    };
  }
}
module.exports = Challenges;
