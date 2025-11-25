"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
async function seed(knex) {
    // Delete existing data
    await knex('categories').del();
    // Insert categories
    await knex('categories').insert([
        {
            id: 1,
            name: 'Trang trí',
            slug: 'trang-tri',
            description: 'Các sản phẩm trang trí tiệc cưới',
            is_active: true,
        },
        {
            id: 2,
            name: 'Thiệp cưới',
            slug: 'thiep-cuoi',
            description: 'Thiệp mời cưới các loại',
            is_active: true,
        },
        {
            id: 3,
            name: 'Quà tặng',
            slug: 'qua-tang',
            description: 'Quà tặng khách mời',
            is_active: true,
        },
        {
            id: 4,
            name: 'Phụ kiện',
            slug: 'phu-kien',
            description: 'Phụ kiện trang trí và tiệc cưới',
            is_active: true,
        },
    ]);
}
//# sourceMappingURL=010_categories.js.map