-- Truncate the tables using CASCADE to ensure all dependencies are handled
TRUNCATE TABLE event_venues, events, artists, venues CASCADE;

-- Restart the ID sequences with the correct names
ALTER SEQUENCE tickit_artist_id_seq RESTART WITH 1;
ALTER SEQUENCE tickit_venue_id_seq RESTART WITH 1;
ALTER SEQUENCE tickit_event_id_seq RESTART WITH 1;
ALTER SEQUENCE tickit_eventvenue_id_seq RESTART WITH 1;



-- Insert data into artists table
INSERT INTO artists (name, genre, members, years_active, band_description, image_url) VALUES 
('boygenius', 'indie rock', 'Julien Baker, Phoebe Bridgers, Lucy Dacus', '2018-2021', 'The Beatles for bisexual people', 'https://static.independent.co.uk/2023/03/30/13/boygenius.jpg?width=1200&height=1200&fit=crop'),
('Sabrina Carpenter', 'Pop', 'Sabrina Carpenter', '2015-present', 'Polly Pocket girly pop fantasy', 'https://images.squarespace-cdn.com/content/v1/5c5b7092b914495766354bb2/1712934092985-O88IVL4IZ4ZKH5DISWAO/LEAD+PRESS.jpg?format=2500w'),
('Chappell Roan', 'Pop', 'Chappell Roan', '2014-present', 'Your favorite artists favorite artist', 'https://www.rollingstone.com/wp-content/uploads/2024/03/Chappell-24-crop.jpg'),
('The Last Dinner Party', 'Indie Rock', 'Abigail Morris, Lizzie Mayland, Emily Roberts, Georgia Davies, Aurora Nishevci', '2021-present', 'Ultimate feminist test', 'https://images.squarespace-cdn.com/content/v1/600f257503ab2e14c15b2d5a/19995365-c770-4d59-af4b-904ef7dab96b/TheLastDinnerParty.jpg'),
('Renee Rapp', 'Pop Rock', 'Renée Rapp', '2018-present', 'The Regina George Chappell Roan was talking about', 'https://i.scdn.co/image/ab6761610000e5eb4aed33b212aa2368af8818bf'),
('Noah Kahan', 'Folk Pop', 'Noah Kahan', '2015-present', 'Sad east coasters rise', 'https://resources.tidal.com/images/e445ec1a/0690/4f20/8268/d908d874d3e1/750x750.jpg'),
('Angel Olsen', 'Indie Rock', 'Angel Olsen', '2009-present', 'Convertible top down after going to the beach type beat (the sun is setting)', 'https://wvau.org/wp-content/uploads/2018/07/2914_angelolsendiyjf2byjennafoxtono-900x600.jpg');

-- Insert data into events table
INSERT INTO events (artist_id, name, date, time, description, ticket_price, is_popular, image_url) VALUES 
(1, 'Sad Boys Tour', '2024-08-15', '19:00:00', 'An indie rock evening with boygenius', 120.00, TRUE, 'https://www.1057thepoint.com/wp-content/uploads/2023/07/M_boygenius_062623.jpg'),
(2, 'Short n Sweet Tour', '2024-09-10', '18:00:00', 'A magical pop experience with Sabrina Carpenter', 450.00, TRUE, 'https://www.billboard.com/wp-content/uploads/2023/08/Sabrina-Carpenter-eras-tour-2023-billboard-1548.jpg?w=942&h=623&crop=1'),
(3, 'Midwest Princess Tour', '2024-07-20', '20:00:00', 'An electrifying performance by Chappell Roan', 400.00, TRUE, 'https://bloximages.chicago2.vip.townnews.com/kansan.com/content/tncms/assets/v3/editorial/d/06/d068e98c-fc1d-11ee-bf93-5b1f099aeb26/661ec141e2357.image.png?resize=755%2C500'),
(4, 'The Last Dinner Party Tour', '2024-10-05', '21:00:00', 'An indie rock night with The Last Dinner Party', 255.00, TRUE, 'https://belwoodmusic.com/wp-content/uploads/2023/10/img_20231015_211936-01.jpeg'),
(5, 'Snow Hard Feelings Tour', '2024-11-12', '20:00:00', 'A captivating pop rock performance by Renee Rapp', 250.00, TRUE, 'https://images.squarespace-cdn.com/content/v1/551d47ade4b020e4eeb12417/d63775fc-7110-40d5-af39-60f22f4379dd/Renee+Rapp-15.jpg'),
(6, 'Home Tour', '2024-12-01', '19:30:00', 'A soulful evening with Noah Kahan', 155.00, TRUE, 'https://storage.googleapis.com/onmilwaukee-article-images/variants/y1f7ddmh1cekgsbkt2gbgxwqjlq7/44487ed8fba0f2b82d9d5c8e9a98ed4b9d67f7c75e21d8b1a6cda1869e8697fd'),
(7, 'Angel Olsen Tour', '2024-08-25', '20:00:00', 'An intimate indie rock performance by Angel Olsen', 90.00, FALSE, 'https://npr.brightspotcdn.com/dims4/default/3a803a4/2147483647/strip/true/crop/790x395+0+0/resize/880x440!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fwcqs%2Ffiles%2F202004%2Fangel_olsen_-_roberto_ricciuti_wireimage.png');

-- Insert data into venues table
INSERT INTO venues (name, address, parking, parking_specifics, contact_email, contact_phone, capacity, accessible_seating, image_url) VALUES 
('Red Rocks Amphitheatre', '18300 W Alameda Pkwy, Morrison, CO 80465', TRUE, 'Multiple lots, shuttle services available', 'info@redrocks.com', '720-865-2494', 9525, TRUE, 'https://assets.redrocksonline.com/wp-content/uploads/2024/05/06100549/TurnpikeTroubadours_RRX2022_0515_200959-5502_ALIVECOVERAGE-1920x1280.jpg'),
('The Greek Theatre', '2001 Gayley Rd, Berkeley, CA 94720', TRUE, 'Parking available nearby', 'info@thegreektheatre.com', '510-548-3010', 8500, TRUE, 'https://thegreekberkeley.com/wp-content/themes/greekchild/assets/img/the-greek-theatre-hero-venue-info.jpg'),
('Madison Square Garden', '4 Pennsylvania Plaza, New York, NY 10001', TRUE, 'On-site parking available', 'info@msg.com', '212-465-6741', 20000, TRUE, 'https://fashionista.com/.image/t_share/MTU2NDk1MDI2MjM3NDgyMDc1/harry-styles-gucci-madison-square-garden-3.jpg'),
('The Hollywood Bowl', '2301 N Highland Ave, Los Angeles, CA 90068', TRUE, 'Multiple parking options available', 'info@hollywoodbowl.com', '323-850-2000', 17000, TRUE, 'https://www.discoverlosangeles.com/sites/default/files/images/2019-01/hollywood-bowl-fireworks.jpg'),
('The Fillmore', '1805 Geary Blvd, San Francisco, CA 94115', TRUE, 'Limited parking available', 'info@thefillmore.com', '415-346-6000', 1300, TRUE, 'https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/7261098/0d048545-f44d-4763-83a1-8c0ca1fe75ac.jpg');

INSERT INTO event_venues (event_id, venue_id, date, time) VALUES 
(1, 1, '2024-08-15', '19:00:00'),  -- boygenius Live at The Indie Rock Arena
(2, 2, '2024-09-10', '18:00:00'),  -- Sabrina Carpenter Concert at Pop World Stadium
(3, 3, '2024-07-20', '20:00:00'),  -- Chappell Roan Tour at Intimate Venue
(4, 4, '2024-10-05', '21:00:00'),  -- The Last Dinner Party Show at Indie Palace
(5, 5, '2024-11-12', '20:00:00'),  -- Renee Rapp Live at Rock House
(6, 1, '2024-12-01', '19:30:00'),  -- Noah Kahan Concert at The Indie Rock Arena
(7, 2, '2024-08-25', '20:00:00');  -- Angel Olsen Show at Pop World Stadium

-- Additional examples of multiple venues for a single event
INSERT INTO event_venues (event_id, venue_id, date, time) VALUES 
(1, 2, '2024-08-16', '19:00:00'),  -- boygenius Live at Pop World Stadium
(1, 3, '2024-08-17', '20:00:00');  -- boygenius Live at Intimate Venue