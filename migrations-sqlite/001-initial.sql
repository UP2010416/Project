DROP TABLES IF EXISTS Products, UserData, InventoryTransaction, Suppliers, ProductSuppliers

CREATE TABLE Products(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_colour VARCHAR(40) NOT NULL,
    product_type VARCHAR(40) NOT NULL,
    product_quantity INTEGER NOT NULL,
    product_price NUMERIC NOT NULL,
    product_size VARCHAR(40) NOT NULL

);

CREATE TABLE UserData(
    user_id SERIAL PRIMARY KEY,
    user_username VARCHAR(30) NOT NULL,
    user_passwordhash text NOT NULL
);

CREATE TABLE InventoryTransaction(
    transaction_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES Products(product_id),
    user_id INTEGER REFERENCES UserData(user_id),
    transaction_date DATE NOT NULL,
    quantity_change INTEGER NOT NULL,
    transaction_type VARCHAR(40) NOT NULL
);

CREATE TABLE Suppliers(
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(50) NOT NULL,
    supplier_phone VARCHAR(15),
    supplier_address1 char NOT NULL,
    supplier_address2 char,
    supplier_postcode varchar(9)
);

CREATE TABLE ProductSuppliers(
    supplier_id INTEGER REFERENCES Suppliers(supplier_id),
    product_id INTEGER REFERENCES Products(product_id),
    PRIMARY KEY (supplier_id, product_id)
);

INSERT INTO Products (product_name, product_colour, product_type, product_quantity, product_price, product_size) VALUES
('Fuchsia',
'Pink',
'Acrylic',
5,
2.00,
'75ml tube');