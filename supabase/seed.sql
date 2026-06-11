-- ============================================================
-- RUANG FISIO — Seed Data (Fisioterapis)
-- Jalankan SETELAH schema.sql di: Supabase Dashboard > SQL Editor
-- ============================================================

insert into public.fisioterapis (id, nama, gelar, status, spesialisasi, spesialisasi_utama, mode_layanan, tersedia_klinik, tersedia_homecare, tersedia_online, harga_mulai, rating, jumlah_ulasan, jadwal_terdekat, kondisi_ditangani, featured, inisial) values
('fisio-001','Rina Kusuma','S.Ft','ruang_fisio','{"Muskuloskeletal","Cedera Olahraga"}','Muskuloskeletal','{"klinik","homecare"}',true,true,false,300000,4.9,128,'Besok 09:00','{"ACL","Lutut","Bahu","HNP","Low back pain","Sprain ankle","Hamstring","Rotator cuff"}',true,'RK'),
('fisio-002','Adhi Prasetyo','S.Ft','ruang_fisio','{"Muskuloskeletal","Pasca Operasi"}','Muskuloskeletal','{"klinik","online"}',true,false,true,320000,4.7,84,'Besok 10:00','{"ACL","Lutut","Bahu","HNP","Pasca op lutut","Pasca op bahu"}',false,'AP'),
('fisio-003','Daris Firmansyah','S.Ft','mitra','{"Muskuloskeletal","Nyeri Kronis"}','Muskuloskeletal','{"klinik","homecare","online"}',true,true,true,300000,4.6,67,'Lusa 08:00','{"ACL","Lutut","HNP","Low back pain","Fibromyalgia","Nyeri punggung kronis","Nyeri leher"}',false,'DF'),
('fisio-004','Sari Dewi','S.Ft','ruang_fisio','{"Muskuloskeletal","Rehabilitasi"}','Muskuloskeletal','{"klinik","online"}',true,false,true,300000,4.8,96,'Besok 13:00','{"ACL","Lutut","Bahu","HNP","Pasca stroke","Pasca fraktur","Kelemahan otot"}',false,'SD'),
('fisio-005','Ahmad Rasyid','S.Ft','mitra','{"Neurologi","Stroke"}','Neurologi','{"klinik","online"}',true,false,true,400000,4.4,52,'Besok 10:00','{"Stroke","Parkinson","Bell''s palsy","Neuropati"}',true,'AR'),
('fisio-006','Oki Wibowo','S.Ft','ruang_fisio','{"Neurologi","Muskuloskeletal"}','Neurologi','{"klinik","homecare"}',true,true,false,380000,4.8,113,'Besok 11:00','{"Stroke","Parkinson","Neuropati","ACL","Bahu","HNP"}',false,'OW'),
('fisio-007','Lestari Wahyuni','S.Ft','mitra','{"Neurologi","Stroke"}','Neurologi','{"homecare","online"}',false,true,true,400000,4.5,74,'Lusa 09:00','{"Stroke","Bell''s palsy","Neuropati","Parkinson"}',false,'LW'),
('fisio-008','Dandee Kusnandar','S.Ft','mitra','{"Neurologi","Geriatri"}','Neurologi','{"klinik","homecare"}',true,true,false,420000,4.7,61,'Besok 14:00','{"Stroke","Parkinson","Neuropati","Osteoporosis","Keseimbangan","Mobilitas lansia"}',false,'DK'),
('fisio-009','Dini Puspita','S.Ft','mitra','{"Cedera Olahraga","Muskuloskeletal"}','Cedera Olahraga','{"homecare","online"}',false,true,true,350000,5.0,89,'Besok 08:00','{"Sprain ankle","Hamstring","Rotator cuff","Shin splint","ACL","Lutut"}',true,'DP'),
('fisio-010','Rizky Aditya','S.Ft','ruang_fisio','{"Cedera Olahraga","Sport Performa"}','Cedera Olahraga','{"klinik","online"}',true,false,true,380000,4.6,58,'Lusa 10:00','{"Sprain ankle","Hamstring","Rotator cuff","Shin splint","Performa atletik","Kekuatan core"}',false,'RA'),
('fisio-011','Domba Setiawan','S.Ft','mitra','{"Cedera Olahraga","Pasca Operasi"}','Cedera Olahraga','{"klinik","homecare"}',true,true,false,350000,4.5,43,'Lusa 13:00','{"Sprain ankle","Hamstring","Shin splint","Pasca op lutut","Pasca op bahu"}',false,'DS'),
('fisio-012','Hendra Gunawan','S.Ft','ruang_fisio','{"Rehabilitasi","Pasca Operasi"}','Rehabilitasi','{"klinik","homecare"}',true,true,false,300000,4.3,37,'Lusa 13:00','{"Pasca stroke","Pasca fraktur","Kelemahan otot","Pasca op lutut","Pasca op tulang belakang"}',false,'HG'),
('fisio-013','Mega Pratiwi','S.Ft','mitra','{"Rehabilitasi","Muskuloskeletal"}','Rehabilitasi','{"klinik","online"}',true,false,true,320000,4.6,71,'Besok 15:00','{"Pasca stroke","Kelemahan otot","Pasca fraktur","ACL","Lutut","Low back pain"}',false,'MP'),
('fisio-014','Fajar Nugroho','S.Ft','ruang_fisio','{"Rehabilitasi","Geriatri"}','Rehabilitasi','{"homecare","online"}',false,true,true,300000,4.4,49,'Lusa 09:00','{"Pasca stroke","Kelemahan otot","Pasca fraktur","Osteoporosis","Keseimbangan","Mobilitas lansia"}',false,'FN'),
('fisio-015','Wulan Sari','S.Ft','ruang_fisio','{"Pasca Operasi","Rehabilitasi"}','Pasca Operasi','{"klinik","homecare"}',true,true,false,350000,4.7,82,'Besok 09:00','{"Pasca op lutut","Pasca op bahu","Pasca op tulang belakang","Pasca stroke","Kelemahan otot"}',false,'WS'),
('fisio-016','Bagas Prabowo','S.Ft','mitra','{"Pasca Operasi","Muskuloskeletal"}','Pasca Operasi','{"klinik"}',true,false,false,380000,4.5,55,'Lusa 11:00','{"Pasca op lutut","Pasca op bahu","Pasca op tulang belakang","ACL","Lutut","Bahu"}',false,'BP'),
('fisio-017','Cantika Dewi','S.Ft','ruang_fisio','{"Pasca Operasi","Cedera Olahraga"}','Pasca Operasi','{"klinik","online"}',true,false,true,350000,4.8,77,'Besok 10:00','{"Pasca op lutut","Pasca op bahu","Pasca op tulang belakang","Sprain ankle","Hamstring","Rotator cuff"}',false,'CD'),
('fisio-018','Hendra Wijaya','S.Ft','mitra','{"Geriatri","Nyeri Kronis"}','Geriatri','{"homecare"}',false,true,false,300000,4.3,41,'Lusa 13:00','{"Osteoporosis","Keseimbangan","Mobilitas lansia","Fibromyalgia","Nyeri punggung kronis"}',false,'HW'),
('fisio-019','Ratna Sari','S.Ft','ruang_fisio','{"Geriatri","Rehabilitasi"}','Geriatri','{"klinik","homecare"}',true,true,false,280000,4.6,93,'Besok 14:00','{"Osteoporosis","Keseimbangan","Mobilitas lansia","Pasca stroke","Kelemahan otot"}',false,'RS'),
('fisio-020','Yusuf Hakim','S.Ft','mitra','{"Geriatri","Neurologi"}','Geriatri','{"homecare","online"}',false,true,true,300000,4.4,38,'Lusa 10:00','{"Osteoporosis","Keseimbangan","Mobilitas lansia","Stroke","Parkinson","Neuropati"}',false,'YH'),
('fisio-021','Anisa Rahmawati','S.Ft','ruang_fisio','{"Nyeri Kronis","Muskuloskeletal"}','Nyeri Kronis','{"klinik","online"}',true,false,true,320000,4.7,65,'Besok 11:00','{"Fibromyalgia","Nyeri punggung kronis","Nyeri leher","ACL","HNP","Low back pain"}',false,'AR2'),
('fisio-022','Taufik Hidayat','S.Ft','mitra','{"Nyeri Kronis","Rehabilitasi"}','Nyeri Kronis','{"klinik","homecare"}',true,true,false,300000,4.5,56,'Lusa 08:00','{"Fibromyalgia","Nyeri punggung kronis","Nyeri leher","Pasca stroke","Kelemahan otot"}',false,'TH'),
('fisio-023','Gilang Ramadhan','S.Ft','ruang_fisio','{"Sport Performa","Cedera Olahraga"}','Sport Performa','{"klinik","online"}',true,false,true,420000,4.9,104,'Besok 13:00','{"Performa atletik","Kekuatan core","Fleksibilitas","Sprain ankle","Hamstring","Shin splint"}',false,'GR'),
('fisio-024','Novita Anggraeni','S.Ft','mitra','{"Sport Performa","Muskuloskeletal"}','Sport Performa','{"klinik","homecare"}',true,true,false,400000,4.6,48,'Lusa 09:00','{"Performa atletik","Kekuatan core","Fleksibilitas","ACL","Lutut","Bahu"}',false,'NA');

-- ── Jadwal default setiap fisioterapis ───────────────────────
insert into public.jadwal_terapis (terapis_id, hari, jam_mulai, jam_selesai, mode, tersedia)
select
  f.id,
  h.hari,
  '08:00'::time,
  '17:00'::time,
  m.mode::mode_layanan,
  true
from
  public.fisioterapis f,
  (values ('Sen'),('Sel'),('Rab'),('Kam'),('Jum'),('Sab')) as h(hari),
  lateral (
    select unnest(f.mode_layanan) as mode
  ) m;
