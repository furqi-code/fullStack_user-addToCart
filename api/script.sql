CREATE DATABASE addToCart1;
USE addToCart1;

create table users(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  MRP INT,
  discount INT,   /* random number */
  stock INT,    /* random number */
  quantity INT,
  img TEXT
);

CREATE TABLE wishlist (
	user_id INT NOT NULL,	
	product_id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	description TEXT,
	category VARCHAR(50),
	MRP INT,
	discount INT,
	stock INT,
  	quantity INT,
	img TEXT,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

INSERT INTO products (name, description, category, MRP, discount, stock, quantity, img) VALUES
('Watch', 'OLEVS Mens Chronograph Watch Gold Silver Stainless Steel Chain Quartz Wrist Watches Business Dress Waterproof Luminous Date Watch.', 'General', 3900, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://rukminim2.flixcart.com/image/480/640/xif0q/watch/g/w/j/analog-stainless-steel-chain-wrist-watches-for-boy-and-men-watch-original-imagvhn9zwwfzzgn.jpeg?q=90'),
('Desk Lamp', 'WEIRD WOLF 3 Colour Mode LED Study/Table/Desk Lamp with Pen Holder, 6 Month Warranty(Plastic, White, Pack of 1)', 'General', 22, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://www.ikea.com/in/en/images/products/roedflik-desk-lamp-light-beige__1327054_pe944348_s5.jpg'),
('Sunglasses', 'ELEGANTE Sunglasses for Women Fashion Ladies Shades Wrap Frame Trendy Stylish Sun Glasses UV Protection.', 'General', 1299, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/b/3/b3a68c5NHY_TEDSM00001019_1.jpg?rnd=20200526195200&tr=w-512'),
('Water Bottle', 'CELLO H2O Glass Fridge Water Bottle with Plastic Cap Set of 3, 920ml, Blue | Leakproof & Durable | Wide Mouth, Easy To Clean | Multi Set Glass for Kitchen, Home, Office, Gym, Travel', 'General', 12, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://sc04.alicdn.com/kf/H6a6a2ef146a24a7aaa34e2c698a7ed23m.jpg'),
('Hiking Bag', 'Impulse 5 Compartment Rucksack Bag 60 Litres Travel Bag For Travel Backpack For Hiking Trekking Tourist Bag For Men Camping Keep Discovering Light Blue With 1 Year Warranty', 'General', 1300, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://images.jdmagicbox.com/quickquotes/images_main/hiker-s-way-80-ltrs-farpoint-red-black-internal-frame-rucksack-bags-backpacks-travel-bag-hiking-bag-camping-bag-trekking-bags-for-men-and-women-with-waterproof-compartment-and-rain-cover-hw-8001-red-179318202-qo0ax.jpg'),
('Audi r8', 'Audi R8 is a 2 seater Coupe with the last recorded MRP of Rs. 2.30 - 2.72 Crore. It is available in 2 variants, 5204 cc engine option and 2 transmission options : Manual and Automatic. The R8 is available in 10 colours. Audi R8 mileage is 6.71 kmpl.', 'General', 79245, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://cdn.motor1.com/images/mgl/vxoJ0Y/s3/2023-audi-r8-v10-gt-rwd.jpg'),
('Plant stand', 'ORILEY 4 Pcs Round Plant Stand Galvanised Metal Flower Pot Holder Rust Resistant Gamla Support Corner Rack Outdoor Display Shelf for Home Garden Balcony Decoration (Black)', 'General', 399, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://m.media-amazon.com/images/I/61t9NUZRGRL._SX679_.jpg'),
('Football', 'Nivia Storm Football, Size 5, Rubberized with perfect grip and durability, ideal for training and match.', 'Sports', 18, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://www.englishclub.com/images/vocabulary/sports/fifa-brazil-2014-ball.jpg'),
('Badminton Racket', 'Yonex Nanoray Light 18i Graphite Badminton Racquet, lightweight, high-tension, suited for advanced players.', 'Sports', 29, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG7f80umB2vgtlHUk-EVRdBHIMheNnkiRcLQ&s'),
('Cricket Bat', 'SG RSD Spark English Willow Cricket Bat, full size for adults, high-quality wood for powerful shots.', 'Sports', 65, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://www.prodirectsport.com/-/media/article-content/cricket/buying-advice/cricket-bat-size-guide/article-bb-cricket-product-advice-articles-1.jpg'),
('Table Tennis Set', 'GKI Fasto Table Tennis Bat Set with two bats, three balls, convenient carrying cover.', 'Sports', 15, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFJ9WZJQS2IPT7IEW6lNrle1p1UQaTwfOdw&s'),
('Skipping Rope', 'Vector X Skipping Rope for Men and Women, adjustable length, foam handles for better grip.', 'Sports', 6, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://contents.mediadecathlon.com/p1899141/682c88daaeb6785c264ccc027406ea84/p1899141.jpg'),
('Basketball', 'Cosco Dribble Basketball Size 6, Synthetic rubber, strong grip, suitable for indoor and outdoor play.', 'Sports', 22, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://media.istockphoto.com/id/165960691/vector/basketball-arts.jpg?s=612x612&w=0&k=20&c=iTpussHsVcCBTYBNVUkHq6KgUOczhZhgKPdOy1cr3wA='),
('Gaming Laptop', 'ASUS ROG Zephyrus G14 Gaming Laptop with AMD Ryzen 9, 16GB RAM, 1TB SSD, 14-inch FHD Display.', 'Electronics', 1500, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://cdn.mos.cms.futurecdn.net/3VpzFCHbyJ7i4JdA3ZdD6V.jpg'),
('Mechanical Keyboard', 'Corsair K95 RGB Platinum Mechanical Gaming Keyboard with Cherry MX Speed switches, customizable RGB lighting.', 'Electronics', 200, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://images.indianexpress.com/2021/06/Corsair-Mechanical-Keyboard.jpg'),
('Wireless Mouse', 'Lenovo 150 Wireless Compact Mouse, 1K DPI Optical sensor, 2.4GHz Wireless NanoUSB, 10m range, 3button(left,right,scroll) upto 3M left/right clicks, 10month battery, Ambidextrous, Ergonomic, GY77L52638', 'Electronics', 47, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAMbCOcASgoyO_A48_azDuXxJlwEWq8vLFNA&s'),
('Gaming Joystick', 'Thrustmaster T.16000M FCS HOTAS Flight Control System, precise and ergonomic joystick for flight simulators.', 'Electronics', 180, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://m.media-amazon.com/images/I/71kVWZfiVxL.jpg'),
('Desktop CPU', 'Intel Core i7-13700K Processor, 16 cores, unlocked for high performance desktop computing.', 'Electronics', 420, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://vrlatech.com/wp-content/uploads/2025/02/Phoenix-Teal-RTX-5090-1-scaled.jpg'),
('Laptop', 'Lenovo Yoga Slim 7 (Smartchoice) Aura Edition Intel Core Ultra 5 226V,Copilot+ AI PC(16GB RAM/1TB SSD/14(35.5cm)/WUXGA OLED/40 Tops/Windows 11/Office Home 2024/Grey/1.19Kg), 83JX005FIN AI Laptop', 'Electronics', 1200, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2017/08/revive-windows-xp-windows10.jpg'),
('Noise Cancelling Headphones', 'Sony WH-1000XM4 Wireless Noise-Cancelling Headphones with up to 30 hours battery life.', 'Electronics', 350, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://kreo-tech.com/cdn/shop/files/Artboard_1_9.png?v=1753673089'),
('Samsung S24', 'Samsung Galaxy S24 FE 5G AI Smartphone (Blue, 8GB RAM, 128GB Storage)', 'Electronics', 899, ROUND(RAND() * 77), ROUND(RAND() * 14), 1, 'https://www.busiboutique.com/medias/boutique/425969/61cfcf77-fee2-4bf6-9663-c9337e1d9d66.jpg');


SELECT * FROM products;


DROP DATABASE addToCart1;