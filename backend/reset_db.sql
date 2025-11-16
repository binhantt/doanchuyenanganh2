-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Drop all tables
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS promotions;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS consultations;
DROP TABLE IF EXISTS decorations;
DROP TABLE IF EXISTS knex_migrations;
DROP TABLE IF EXISTS knex_migrations_lock;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
