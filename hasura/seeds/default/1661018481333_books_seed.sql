SET check_function_bodies = false;
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (1, '鬼滅の刃 1', '9784088807232', 'http://books.google.com/books/content?id=QlmenQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', '2022-07-23 06:21:44.166462+00');
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (2, '鬼滅の刃 5', '9784088810263', 'http://books.google.com/books/content?id=QxV2swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', '2022-07-23 06:22:39.419943+00');
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (3, '鬼滅の刃 9', '9784088812830', 'http://books.google.com/books/content?id=Ol6gswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', '2022-07-23 06:24:03.637156+00');
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (4, '鬼滅夜話キャラクター論で読み解く『鬼滅の刃』', '9784594089917', 'http://books.google.com/books/content?id=_r63zgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', '2022-07-23 09:34:38.737117+00');
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (5, '鬼滅の刃 しあわせの花', '9784087034738', 'http://books.google.com/books/content?id=13gDwgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', '2022-07-23 09:35:29.649326+00');
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (6, '鬼滅の刃 18', '9784088821412', 'http://books.google.com/books/content?id=WAmezQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', '2022-07-23 09:36:03.486488+00');
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (7, '鬼滅の刃 21', '9784088823492', 'http://books.google.com/books/content?id=wAG5zQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', '2022-07-23 09:36:24.41718+00');
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (8, '鬼滅の刃 8', '9784088812120', 'http://books.google.com/books/content?id=UMV0tAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', '2022-07-23 09:36:56.007449+00');
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (9, '鬼滅の刃ノベライズ 〜無限城突入! しのぶの想い編〜', '9784083217135', 'http://books.google.com/books/content?id=cWXvzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', '2022-07-23 09:37:22.942798+00');
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (10, '鬼滅の日本史', '9784299009708', 'http://books.google.com/books/content?id=_PPxzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', '2022-07-23 09:37:55.080923+00');
INSERT INTO public.books (id, title, isbn, image_url, created_at) VALUES (12, 'Google流資料作成術', '9784534054722', NULL, '2022-07-23 10:40:17.154548+00');
SELECT pg_catalog.setval('public.books_id_seq', 12, true);
