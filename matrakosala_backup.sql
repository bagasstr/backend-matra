--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Ubuntu 16.6-1.pgdg24.04+1)
-- Dumped by pg_dump version 16.6 (Ubuntu 16.6-1.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: JenisPajak; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."JenisPajak" AS ENUM (
    'INCLUDEPPN',
    'EXCLUDE_PPN',
    'NO_PPN'
);


ALTER TYPE public."JenisPajak" OWNER TO postgres;

--
-- Name: JenisPembayaran; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."JenisPembayaran" AS ENUM (
    'CBD',
    'COD',
    'TEMPO',
    'LAINNYA'
);


ALTER TYPE public."JenisPembayaran" OWNER TO postgres;

--
-- Name: SatuanProduk; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."SatuanProduk" AS ENUM (
    'PCS',
    'KG',
    'METER',
    'LITER',
    'PACK'
);


ALTER TYPE public."SatuanProduk" OWNER TO postgres;

--
-- Name: TipePengiriman; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TipePengiriman" AS ENUM (
    'FRANCO',
    'LOCO'
);


ALTER TYPE public."TipePengiriman" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Artikel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Artikel" (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    content text NOT NULL,
    category text NOT NULL,
    tags text[],
    "publishedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    thumbnail text NOT NULL,
    "seoId" integer
);


ALTER TABLE public."Artikel" OWNER TO postgres;

--
-- Name: Artikel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Artikel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Artikel_id_seq" OWNER TO postgres;

--
-- Name: Artikel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Artikel_id_seq" OWNED BY public."Artikel".id;


--
-- Name: GambarArtikel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GambarArtikel" (
    id integer NOT NULL,
    url text NOT NULL,
    "artikelId" integer NOT NULL
);


ALTER TABLE public."GambarArtikel" OWNER TO postgres;

--
-- Name: GambarArtikel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GambarArtikel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."GambarArtikel_id_seq" OWNER TO postgres;

--
-- Name: GambarArtikel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GambarArtikel_id_seq" OWNED BY public."GambarArtikel".id;


--
-- Name: GambarProyek; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GambarProyek" (
    id integer NOT NULL,
    url text NOT NULL,
    "portfolioProyekId" integer NOT NULL
);


ALTER TABLE public."GambarProyek" OWNER TO postgres;

--
-- Name: GambarProyek_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GambarProyek_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."GambarProyek_id_seq" OWNER TO postgres;

--
-- Name: GambarProyek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GambarProyek_id_seq" OWNED BY public."GambarProyek".id;


--
-- Name: Pajak; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pajak" (
    id integer NOT NULL,
    "jenisPajak" public."JenisPajak" NOT NULL,
    "produkId" integer NOT NULL
);


ALTER TABLE public."Pajak" OWNER TO postgres;

--
-- Name: Pajak_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Pajak_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Pajak_id_seq" OWNER TO postgres;

--
-- Name: Pajak_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Pajak_id_seq" OWNED BY public."Pajak".id;


--
-- Name: Pembayaran; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pembayaran" (
    id integer NOT NULL,
    "jenisPembayaran" public."JenisPembayaran" NOT NULL,
    "produkId" integer NOT NULL
);


ALTER TABLE public."Pembayaran" OWNER TO postgres;

--
-- Name: Pembayaran_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Pembayaran_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Pembayaran_id_seq" OWNER TO postgres;

--
-- Name: Pembayaran_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Pembayaran_id_seq" OWNED BY public."Pembayaran".id;


--
-- Name: Pengiriman; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pengiriman" (
    id integer NOT NULL,
    "tipePengiriman" public."TipePengiriman" NOT NULL,
    area text NOT NULL,
    jadwal integer NOT NULL,
    "produkId" integer NOT NULL
);


ALTER TABLE public."Pengiriman" OWNER TO postgres;

--
-- Name: Pengiriman_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Pengiriman_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Pengiriman_id_seq" OWNER TO postgres;

--
-- Name: Pengiriman_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Pengiriman_id_seq" OWNED BY public."Pengiriman".id;


--
-- Name: PortfolioProyek; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PortfolioProyek" (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    "mitraKlien" text NOT NULL,
    ringkasan text NOT NULL,
    "tipeBangunan" text NOT NULL,
    "tanggalPelaksanaan" text NOT NULL,
    lokasi text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."PortfolioProyek" OWNER TO postgres;

--
-- Name: PortfolioProyek_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PortfolioProyek_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PortfolioProyek_id_seq" OWNER TO postgres;

--
-- Name: PortfolioProyek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PortfolioProyek_id_seq" OWNED BY public."PortfolioProyek".id;


--
-- Name: Produk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Produk" (
    id integer NOT NULL,
    "namaProduk" text NOT NULL,
    "vendorId" integer NOT NULL,
    document text NOT NULL
);


ALTER TABLE public."Produk" OWNER TO postgres;

--
-- Name: Produk_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Produk_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Produk_id_seq" OWNER TO postgres;

--
-- Name: Produk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Produk_id_seq" OWNED BY public."Produk".id;


--
-- Name: Seo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Seo" (
    id integer NOT NULL,
    type text NOT NULL,
    "pageTitle" text NOT NULL,
    "metaDescription" text NOT NULL,
    keywords text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Seo" OWNER TO postgres;

--
-- Name: Seo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Seo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Seo_id_seq" OWNER TO postgres;

--
-- Name: Seo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Seo_id_seq" OWNED BY public."Seo".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Varian; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Varian" (
    id integer NOT NULL,
    "namaVarian" text NOT NULL,
    spesifikasi text NOT NULL,
    "hargaSatuan" double precision NOT NULL,
    "satuanProduk" public."SatuanProduk" NOT NULL,
    "hargaDiskon" double precision,
    "minPembelian" integer NOT NULL,
    "produkId" integer NOT NULL
);


ALTER TABLE public."Varian" OWNER TO postgres;

--
-- Name: Varian_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Varian_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Varian_id_seq" OWNER TO postgres;

--
-- Name: Varian_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Varian_id_seq" OWNED BY public."Varian".id;


--
-- Name: Vendor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Vendor" (
    id integer NOT NULL,
    "namaPerusahaan" text NOT NULL,
    pic text NOT NULL,
    whatsapp text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Vendor" OWNER TO postgres;

--
-- Name: Vendor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Vendor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Vendor_id_seq" OWNER TO postgres;

--
-- Name: Vendor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Vendor_id_seq" OWNED BY public."Vendor".id;


--
-- Name: estimasiPengiriman; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."estimasiPengiriman" (
    id integer NOT NULL,
    area text NOT NULL,
    durasi text NOT NULL,
    "produkMaterialId" integer
);


ALTER TABLE public."estimasiPengiriman" OWNER TO postgres;

--
-- Name: estimasiPengiriman_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."estimasiPengiriman_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."estimasiPengiriman_id_seq" OWNER TO postgres;

--
-- Name: estimasiPengiriman_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."estimasiPengiriman_id_seq" OWNED BY public."estimasiPengiriman".id;


--
-- Name: gambarProduk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."gambarProduk" (
    id integer NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "produkMaterialId" integer
);


ALTER TABLE public."gambarProduk" OWNER TO postgres;

--
-- Name: gambarProduk_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."gambarProduk_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."gambarProduk_id_seq" OWNER TO postgres;

--
-- Name: gambarProduk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."gambarProduk_id_seq" OWNED BY public."gambarProduk".id;


--
-- Name: pasokanArea; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pasokanArea" (
    id integer NOT NULL,
    kota text NOT NULL,
    "produkMaterialId" integer
);


ALTER TABLE public."pasokanArea" OWNER TO postgres;

--
-- Name: pasokanArea_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."pasokanArea_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."pasokanArea_id_seq" OWNER TO postgres;

--
-- Name: pasokanArea_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."pasokanArea_id_seq" OWNED BY public."pasokanArea".id;


--
-- Name: produkMaterial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."produkMaterial" (
    id integer NOT NULL,
    "namaBarang" text NOT NULL,
    deskripsi text NOT NULL,
    "hargaBarang" integer NOT NULL,
    satuan text NOT NULL,
    "minimalPembelian" integer NOT NULL,
    "kelipatanPembelian" integer NOT NULL,
    "dimensiUnit" text NOT NULL,
    berat integer NOT NULL,
    merek text NOT NULL,
    kategori text NOT NULL,
    "subKategori" text NOT NULL,
    "jumlahUnit" integer NOT NULL,
    "jenisPengiriman" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    slug text NOT NULL
);


ALTER TABLE public."produkMaterial" OWNER TO postgres;

--
-- Name: produkMaterial_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."produkMaterial_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."produkMaterial_id_seq" OWNER TO postgres;

--
-- Name: produkMaterial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."produkMaterial_id_seq" OWNED BY public."produkMaterial".id;


--
-- Name: Artikel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Artikel" ALTER COLUMN id SET DEFAULT nextval('public."Artikel_id_seq"'::regclass);


--
-- Name: GambarArtikel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GambarArtikel" ALTER COLUMN id SET DEFAULT nextval('public."GambarArtikel_id_seq"'::regclass);


--
-- Name: GambarProyek id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GambarProyek" ALTER COLUMN id SET DEFAULT nextval('public."GambarProyek_id_seq"'::regclass);


--
-- Name: Pajak id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pajak" ALTER COLUMN id SET DEFAULT nextval('public."Pajak_id_seq"'::regclass);


--
-- Name: Pembayaran id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pembayaran" ALTER COLUMN id SET DEFAULT nextval('public."Pembayaran_id_seq"'::regclass);


--
-- Name: Pengiriman id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pengiriman" ALTER COLUMN id SET DEFAULT nextval('public."Pengiriman_id_seq"'::regclass);


--
-- Name: PortfolioProyek id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PortfolioProyek" ALTER COLUMN id SET DEFAULT nextval('public."PortfolioProyek_id_seq"'::regclass);


--
-- Name: Produk id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Produk" ALTER COLUMN id SET DEFAULT nextval('public."Produk_id_seq"'::regclass);


--
-- Name: Seo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seo" ALTER COLUMN id SET DEFAULT nextval('public."Seo_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Varian id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Varian" ALTER COLUMN id SET DEFAULT nextval('public."Varian_id_seq"'::regclass);


--
-- Name: Vendor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vendor" ALTER COLUMN id SET DEFAULT nextval('public."Vendor_id_seq"'::regclass);


--
-- Name: estimasiPengiriman id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."estimasiPengiriman" ALTER COLUMN id SET DEFAULT nextval('public."estimasiPengiriman_id_seq"'::regclass);


--
-- Name: gambarProduk id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."gambarProduk" ALTER COLUMN id SET DEFAULT nextval('public."gambarProduk_id_seq"'::regclass);


--
-- Name: pasokanArea id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pasokanArea" ALTER COLUMN id SET DEFAULT nextval('public."pasokanArea_id_seq"'::regclass);


--
-- Name: produkMaterial id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."produkMaterial" ALTER COLUMN id SET DEFAULT nextval('public."produkMaterial_id_seq"'::regclass);


--
-- Data for Name: Artikel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Artikel" (id, title, slug, content, category, tags, "publishedAt", "createdAt", "updatedAt", thumbnail, "seoId") FROM stdin;
1	bata ringan banger	bata-ringan-banger	Baja ringan saat ini banyak digunakan untuk membangun rumah, ruko, dan bangunan lainnya. Jenis baja ringan dan ukurannya bermacam-macam. Selain itu, baja ringan lebih kuat dan harganya cukup terjangkau dibanding menggunakan kayu atau bambu. Meskipun ringan, baja ringan sangat kokoh dan dapat mempertahankan bentuknya dalam waktu lama.	tips dan pedoman	{konstruksi,bangunan,matrakosala}	2024-12-11 14:16:47.094	2024-12-11 14:16:47.094	2024-12-11 14:16:47.094	upload/artikel/Foto TRAD.png	1
\.


--
-- Data for Name: GambarArtikel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GambarArtikel" (id, url, "artikelId") FROM stdin;
1	upload/artikel/Foto TRAD-1.png	1
2	upload/artikel/theme-photos-Klby0nxseY8-unsplash.jpg	1
3	upload/artikel/cloudflare.png	1
\.


--
-- Data for Name: GambarProyek; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GambarProyek" (id, url, "portfolioProyekId") FROM stdin;
\.


--
-- Data for Name: Pajak; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Pajak" (id, "jenisPajak", "produkId") FROM stdin;
1	NO_PPN	1
2	NO_PPN	2
\.


--
-- Data for Name: Pembayaran; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Pembayaran" (id, "jenisPembayaran", "produkId") FROM stdin;
1	CBD	1
2	CBD	2
\.


--
-- Data for Name: Pengiriman; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Pengiriman" (id, "tipePengiriman", area, jadwal, "produkId") FROM stdin;
1	FRANCO	JABODETABEK	15	1
2	FRANCO	JABODETABEK	15	2
\.


--
-- Data for Name: PortfolioProyek; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PortfolioProyek" (id, title, slug, "mitraKlien", ringkasan, "tipeBangunan", "tanggalPelaksanaan", lokasi, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Produk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Produk" (id, "namaProduk", "vendorId", document) FROM stdin;
1	Besi Beton	1	upload/document/matrakosala.com whois lookup - who.is.pdf
2	Besi Beton	2	upload/document/matrakosala.com whois lookup - who.is.pdf
\.


--
-- Data for Name: Seo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Seo" (id, type, "pageTitle", "metaDescription", keywords, "createdAt", "updatedAt") FROM stdin;
1	artikel	bata ringan banger	Baja ringan saat ini banyak digunakan untuk membangun rumah, ruko, dan bangunan lainnya. Jenis baja ringan dan ukurannya bermacam-macam. Selain itu	{ringan,baja,dan,saat,ini,banyak,digunakan,untuk,membangun,rumah}	2024-12-11 14:16:47.084	2024-12-11 14:16:47.084
2	halaman	hubungi kami	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	{matrakosala,contractor,pembangunan}	2024-12-11 14:17:20.977	2024-12-11 14:17:20.977
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, type, username, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Varian; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Varian" (id, "namaVarian", spesifikasi, "hargaSatuan", "satuanProduk", "hargaDiskon", "minPembelian", "produkId") FROM stdin;
1	12mm	Kualitas tinggi	120000	METER	100000	10	1
2	12mm	Kualitas tinggi	120000	METER	100000	10	2
\.


--
-- Data for Name: Vendor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Vendor" (id, "namaPerusahaan", pic, whatsapp, "createdAt") FROM stdin;
1	PT phk indonesia	aldi ini madani	085199388390	2024-12-11 14:17:00.371
2	PT phk indonesia	aldi ini madani	085199388390	2024-12-12 03:35:33.96
\.


--
-- Data for Name: estimasiPengiriman; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."estimasiPengiriman" (id, area, durasi, "produkMaterialId") FROM stdin;
\.


--
-- Data for Name: gambarProduk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."gambarProduk" (id, url, "createdAt", "updatedAt", "produkMaterialId") FROM stdin;
\.


--
-- Data for Name: pasokanArea; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."pasokanArea" (id, kota, "produkMaterialId") FROM stdin;
\.


--
-- Data for Name: produkMaterial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."produkMaterial" (id, "namaBarang", deskripsi, "hargaBarang", satuan, "minimalPembelian", "kelipatanPembelian", "dimensiUnit", berat, merek, kategori, "subKategori", "jumlahUnit", "jenisPengiriman", "createdAt", "updatedAt", slug) FROM stdin;
\.


--
-- Name: Artikel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Artikel_id_seq"', 1, true);


--
-- Name: GambarArtikel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."GambarArtikel_id_seq"', 3, true);


--
-- Name: GambarProyek_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."GambarProyek_id_seq"', 24, true);


--
-- Name: Pajak_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Pajak_id_seq"', 2, true);


--
-- Name: Pembayaran_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Pembayaran_id_seq"', 2, true);


--
-- Name: Pengiriman_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Pengiriman_id_seq"', 2, true);


--
-- Name: PortfolioProyek_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PortfolioProyek_id_seq"', 2, true);


--
-- Name: Produk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Produk_id_seq"', 2, true);


--
-- Name: Seo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Seo_id_seq"', 2, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, false);


--
-- Name: Varian_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Varian_id_seq"', 2, true);


--
-- Name: Vendor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Vendor_id_seq"', 2, true);


--
-- Name: estimasiPengiriman_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."estimasiPengiriman_id_seq"', 10, true);


--
-- Name: gambarProduk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."gambarProduk_id_seq"', 8, true);


--
-- Name: pasokanArea_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."pasokanArea_id_seq"', 14, true);


--
-- Name: produkMaterial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."produkMaterial_id_seq"', 10, true);


--
-- Name: Artikel Artikel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Artikel"
    ADD CONSTRAINT "Artikel_pkey" PRIMARY KEY (id);


--
-- Name: GambarArtikel GambarArtikel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GambarArtikel"
    ADD CONSTRAINT "GambarArtikel_pkey" PRIMARY KEY (id);


--
-- Name: GambarProyek GambarProyek_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GambarProyek"
    ADD CONSTRAINT "GambarProyek_pkey" PRIMARY KEY (id);


--
-- Name: Pajak Pajak_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pajak"
    ADD CONSTRAINT "Pajak_pkey" PRIMARY KEY (id);


--
-- Name: Pembayaran Pembayaran_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pembayaran"
    ADD CONSTRAINT "Pembayaran_pkey" PRIMARY KEY (id);


--
-- Name: Pengiriman Pengiriman_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pengiriman"
    ADD CONSTRAINT "Pengiriman_pkey" PRIMARY KEY (id);


--
-- Name: PortfolioProyek PortfolioProyek_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PortfolioProyek"
    ADD CONSTRAINT "PortfolioProyek_pkey" PRIMARY KEY (id);


--
-- Name: Produk Produk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Produk"
    ADD CONSTRAINT "Produk_pkey" PRIMARY KEY (id);


--
-- Name: Seo Seo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seo"
    ADD CONSTRAINT "Seo_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Varian Varian_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Varian"
    ADD CONSTRAINT "Varian_pkey" PRIMARY KEY (id);


--
-- Name: Vendor Vendor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vendor"
    ADD CONSTRAINT "Vendor_pkey" PRIMARY KEY (id);


--
-- Name: estimasiPengiriman estimasiPengiriman_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."estimasiPengiriman"
    ADD CONSTRAINT "estimasiPengiriman_pkey" PRIMARY KEY (id);


--
-- Name: gambarProduk gambarProduk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."gambarProduk"
    ADD CONSTRAINT "gambarProduk_pkey" PRIMARY KEY (id);


--
-- Name: pasokanArea pasokanArea_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pasokanArea"
    ADD CONSTRAINT "pasokanArea_pkey" PRIMARY KEY (id);


--
-- Name: produkMaterial produkMaterial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."produkMaterial"
    ADD CONSTRAINT "produkMaterial_pkey" PRIMARY KEY (id);


--
-- Name: Artikel_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Artikel_slug_key" ON public."Artikel" USING btree (slug);


--
-- Name: Pajak_produkId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Pajak_produkId_key" ON public."Pajak" USING btree ("produkId");


--
-- Name: Pembayaran_produkId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Pembayaran_produkId_key" ON public."Pembayaran" USING btree ("produkId");


--
-- Name: Pengiriman_produkId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Pengiriman_produkId_key" ON public."Pengiriman" USING btree ("produkId");


--
-- Name: PortfolioProyek_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PortfolioProyek_slug_key" ON public."PortfolioProyek" USING btree (slug);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: estimasiPengiriman_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "estimasiPengiriman_id_key" ON public."estimasiPengiriman" USING btree (id);


--
-- Name: gambarProduk_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "gambarProduk_id_key" ON public."gambarProduk" USING btree (id);


--
-- Name: pasokanArea_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "pasokanArea_id_key" ON public."pasokanArea" USING btree (id);


--
-- Name: produkMaterial_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "produkMaterial_id_key" ON public."produkMaterial" USING btree (id);


--
-- Name: produkMaterial_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "produkMaterial_slug_key" ON public."produkMaterial" USING btree (slug);


--
-- Name: Artikel Artikel_seoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Artikel"
    ADD CONSTRAINT "Artikel_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES public."Seo"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: GambarArtikel GambarArtikel_artikelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GambarArtikel"
    ADD CONSTRAINT "GambarArtikel_artikelId_fkey" FOREIGN KEY ("artikelId") REFERENCES public."Artikel"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: GambarProyek GambarProyek_portfolioProyekId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GambarProyek"
    ADD CONSTRAINT "GambarProyek_portfolioProyekId_fkey" FOREIGN KEY ("portfolioProyekId") REFERENCES public."PortfolioProyek"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Pajak Pajak_produkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pajak"
    ADD CONSTRAINT "Pajak_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES public."Produk"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Pembayaran Pembayaran_produkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pembayaran"
    ADD CONSTRAINT "Pembayaran_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES public."Produk"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Pengiriman Pengiriman_produkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pengiriman"
    ADD CONSTRAINT "Pengiriman_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES public."Produk"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Produk Produk_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Produk"
    ADD CONSTRAINT "Produk_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public."Vendor"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Varian Varian_produkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Varian"
    ADD CONSTRAINT "Varian_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES public."Produk"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: estimasiPengiriman estimasiPengiriman_produkMaterialId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."estimasiPengiriman"
    ADD CONSTRAINT "estimasiPengiriman_produkMaterialId_fkey" FOREIGN KEY ("produkMaterialId") REFERENCES public."produkMaterial"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gambarProduk gambarProduk_produkMaterialId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."gambarProduk"
    ADD CONSTRAINT "gambarProduk_produkMaterialId_fkey" FOREIGN KEY ("produkMaterialId") REFERENCES public."produkMaterial"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pasokanArea pasokanArea_produkMaterialId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pasokanArea"
    ADD CONSTRAINT "pasokanArea_produkMaterialId_fkey" FOREIGN KEY ("produkMaterialId") REFERENCES public."produkMaterial"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

