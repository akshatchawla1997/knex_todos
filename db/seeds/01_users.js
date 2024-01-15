/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    { id: 1, name: 'akshat', email: 'akshat@gmail.com' },
  ]);

  await knex('todos').del();
  await knex('todos').insert([
    { title: 'title1', user_id: 1 },
  ]);
};
