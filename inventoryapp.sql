DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS UserData;
DROP TABLE IF EXISTS InventoryTransaction;
DROP TABLE IF EXISTS Suppliers;
DROP TABLE IF EXISTS ProductSuppliers;

CREATE TABLE IF NOT EXISTS Products(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_colour VARCHAR(40) NOT NULL,
    product_type VARCHAR(40) NOT NULL,
    product_quantity INTEGER NOT NULL,
    product_price NUMERIC NOT NULL,
    product_size VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS UserData(
    user_id SERIAL PRIMARY KEY,
    user_username VARCHAR(30) NOT NULL,
    user_passwordhash text NOT NULL
);

CREATE TABLE IF NOT EXISTS InventoryTransaction(
    transaction_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES Products(product_id),
    user_id INTEGER REFERENCES UserData(user_id),
    transaction_date DATE NOT NULL,
    quantity_change INTEGER NOT NULL,
    transaction_type VARCHAR(40) NOT NULL
);

INSERT INTO Products (product_name, product_colour, product_type, product_quantity, product_price, product_size)
VALUES ('Fuchsia', 'Pink', 'Acrylic', 5, 2.00, '75ml tube');
INSERT INTO Products (product_name, product_colour, product_type, product_quantity, product_price, product_size)
VALUES ('Bottle Green', 'Green', 'Matte', 3, 1.00, '100ml tube');
INSERT INTO UserData (user_username, user_passwordhash)
VALUES ('admin','$2a$10$fLSUtGAqmsyhnFxkS8rQpui3Ct8WTC87KS51zcB51LmMl7ymbJRrS');

INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (1, 1, 1, '2016-11-11', -9, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (2, 1, 1, '2016-11-12', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (3, 1, 1, '2016-11-13', -7, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (4, 1, 1, '2016-11-14', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (5, 1, 1, '2016-11-15', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (6, 1, 1, '2016-11-16', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (7, 1, 1, '2016-11-17', -7, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (8, 1, 1, '2016-11-18', -7, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (9, 1, 1, '2016-11-19', -10, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (10, 1, 1, '2016-11-20', -7, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (11, 1, 1, '2016-11-21', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (12, 1, 1, '2016-11-22', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (13, 1, 1, '2016-11-23', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (14, 1, 1, '2016-11-24', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (15, 1, 1, '2016-11-25', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (16, 1, 1, '2016-11-26', -8, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (17, 1, 1, '2016-11-27', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (18, 1, 1, '2016-11-28', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (19, 1, 1, '2016-11-29', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (20, 1, 1, '2016-11-30', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (21, 1, 1, '2016-12-11', -9, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (22, 1, 1, '2016-12-12', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (23, 1, 1, '2016-12-13', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (24, 1, 1, '2016-12-14', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (25, 1, 1, '2016-12-15', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (26, 1, 1, '2016-12-16', -8, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (27, 1, 1, '2016-12-17', -7, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (28, 1, 1, '2016-12-18', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (29, 1, 1, '2016-12-19', -7, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (30, 1, 1, '2016-12-20', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (31, 1, 1, '2016-12-21', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (32, 1, 1, '2016-12-22', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (33, 1, 1, '2016-12-23', -7, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (34, 1, 1, '2016-12-24', -8, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (35, 1, 1, '2016-12-27', -2, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (36, 1, 1, '2016-12-28', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (37, 1, 1, '2016-12-29', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (38, 1, 1, '2016-12-30', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (39, 1, 1, '2016-12-31', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (40, 1, 1, '2017-01-01', -1, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (41, 1, 1, '2017-01-02', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (42, 1, 1, '2017-01-03', -3, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (43, 1, 1, '2017-01-04', -7, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (44, 1, 1, '2017-01-13', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (45, 1, 1, '2017-01-14', -8, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (46, 1, 1, '2017-01-15', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (47, 1, 1, '2017-01-16', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (48, 1, 1, '2017-01-17', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (49, 1, 1, '2017-01-18', -3, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (50, 1, 1, '2017-01-19', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (51, 1, 1, '2017-01-20', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (52, 1, 1, '2017-01-21', -9, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (53, 1, 1, '2017-01-22', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (54, 1, 1, '2017-01-23', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (55, 1, 1, '2017-01-24', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (56, 1, 1, '2017-01-25', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (57, 1, 1, '2017-01-26', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (58, 1, 1, '2017-01-27', -7, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (59, 1, 1, '2017-01-28', -10, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (60, 1, 1, '2017-01-29', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (61, 1, 1, '2017-01-30', -3, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (62, 1, 1, '2017-01-31', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (63, 1, 1, '2017-02-02', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (64, 1, 1, '2017-02-03', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (65, 1, 1, '2017-02-04', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (66, 1, 1, '2017-02-13', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (67, 1, 1, '2017-02-14', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (68, 1, 1, '2017-02-15', -3, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (69, 1, 1, '2017-02-16', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (70, 1, 1, '2017-02-17', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (71, 1, 1, '2017-02-18', -9, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (72, 1, 1, '2017-02-19', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (73, 1, 1, '2017-02-20', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (74, 1, 1, '2017-02-21', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (75, 1, 1, '2017-02-22', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (76, 1, 1, '2017-02-23', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (77, 1, 1, '2017-02-24', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (78, 1, 1, '2017-02-25', -7, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (79, 1, 1, '2017-02-26', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (80, 1, 1, '2017-02-27', -3, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (81, 1, 1, '2017-02-28', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (82, 1, 1, '2017-03-01', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (83, 1, 1, '2017-03-02', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (84, 1, 1, '2017-03-03', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (85, 1, 1, '2017-03-04', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (86, 1, 1, '2017-03-13', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (87, 1, 1, '2017-03-14', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (88, 1, 1, '2017-03-15', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (89, 1, 1, '2017-03-16', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (90, 1, 1, '2017-03-17', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (91, 1, 1, '2017-03-18', -8, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (92, 1, 1, '2017-03-19', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (93, 1, 1, '2017-03-20', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (94, 1, 1, '2017-03-21', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (95, 1, 1, '2017-03-22', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (96, 1, 1, '2017-03-23', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (97, 1, 1, '2017-03-24', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (98, 1, 1, '2017-03-25', -10, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (99, 1, 1, '2017-03-26', -6, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (100, 1, 1, '2017-03-27', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (101, 1, 1, '2017-03-28', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (102, 1, 1, '2017-03-29', -4, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (103, 1, 1, '2017-03-30', -5, 'Sale');
INSERT INTO InventoryTransaction(transaction_id, product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES (104, 1, 1, '2017-03-31', -6, 'Sale');