PGDMP  :    $        
    
    |            Node_Library    16.1    16.0 )    P           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Q           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            R           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            S           1262    16500    Node_Library    DATABASE     �   CREATE DATABASE "Node_Library" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE "Node_Library";
                maksymsierszen    false            �            1255    16749    update_updated_at_column()    FUNCTION     �   CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;
 1   DROP FUNCTION public.update_updated_at_column();
       public          maksymsierszen    false            �            1259    16512    authors    TABLE     '  CREATE TABLE public.authors (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    nationality character varying(100) NOT NULL,
    birth_year integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.authors;
       public         heap    postgres    false            �            1259    16511    authors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.authors_id_seq;
       public          postgres    false    216            T           0    0    authors_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;
          public          postgres    false    215            �            1259    16525    books    TABLE       CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    author_id integer NOT NULL,
    genre character varying(100) NOT NULL,
    publication_date date,
    availability_status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.books;
       public         heap    postgres    false            �            1259    16524    books_id_seq    SEQUENCE     �   CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.books_id_seq;
       public          postgres    false    218            U           0    0    books_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;
          public          postgres    false    217            �            1259    16551    borrows    TABLE       CREATE TABLE public.borrows (
    id integer NOT NULL,
    user_id integer,
    book_id integer,
    borrow_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    return_date timestamp without time zone DEFAULT (CURRENT_TIMESTAMP + '1 mon'::interval)
);
    DROP TABLE public.borrows;
       public         heap    postgres    false            �            1259    16550    borrows_id_seq    SEQUENCE     �   CREATE SEQUENCE public.borrows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.borrows_id_seq;
       public          postgres    false    222            V           0    0    borrows_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.borrows_id_seq OWNED BY public.borrows.id;
          public          postgres    false    221            �            1259    16539    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    birth_date date,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    password character varying(255) DEFAULT 'temporary'::character varying NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16538    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    220            W           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    219            �           2604    16515 
   authors id    DEFAULT     h   ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);
 9   ALTER TABLE public.authors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16528    books id    DEFAULT     d   ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);
 7   ALTER TABLE public.books ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    16554 
   borrows id    DEFAULT     h   ALTER TABLE ONLY public.borrows ALTER COLUMN id SET DEFAULT nextval('public.borrows_id_seq'::regclass);
 9   ALTER TABLE public.borrows ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    16542    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            G          0    16512    authors 
   TABLE DATA           a   COPY public.authors (id, first_name, last_name, nationality, birth_year, created_at) FROM stdin;
    public          postgres    false    216   0       I          0    16525    books 
   TABLE DATA           {   COPY public.books (id, title, author_id, genre, publication_date, availability_status, created_at, updated_at) FROM stdin;
    public          postgres    false    218   �1       M          0    16551    borrows 
   TABLE DATA           Q   COPY public.borrows (id, user_id, book_id, borrow_date, return_date) FROM stdin;
    public          postgres    false    222   Y4       K          0    16539    users 
   TABLE DATA           o   COPY public.users (id, first_name, last_name, birth_date, email, created_at, password, updated_at) FROM stdin;
    public          postgres    false    220   �4       X           0    0    authors_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.authors_id_seq', 19, true);
          public          postgres    false    215            Y           0    0    books_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.books_id_seq', 39, true);
          public          postgres    false    217            Z           0    0    borrows_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.borrows_id_seq', 40, true);
          public          postgres    false    221            [           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 23, true);
          public          postgres    false    219            �           2606    16520    authors authors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.authors DROP CONSTRAINT authors_pkey;
       public            postgres    false    216            �           2606    16532    books books_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public            postgres    false    218            �           2606    16558    borrows borrows_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.borrows
    ADD CONSTRAINT borrows_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.borrows DROP CONSTRAINT borrows_pkey;
       public            postgres    false    222            �           2606    16549    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    220            �           2606    16547    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220            �           2620    16753    authors set_updated_at    TRIGGER        CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.authors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
 /   DROP TRIGGER set_updated_at ON public.authors;
       public          postgres    false    223    216            �           2620    16752    books set_updated_at    TRIGGER     }   CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.books FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
 -   DROP TRIGGER set_updated_at ON public.books;
       public          postgres    false    223    218            �           2620    16751    borrows set_updated_at    TRIGGER        CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.borrows FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
 /   DROP TRIGGER set_updated_at ON public.borrows;
       public          postgres    false    222    223            �           2620    16750    users set_updated_at    TRIGGER     }   CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
 -   DROP TRIGGER set_updated_at ON public.users;
       public          postgres    false    220    223            �           2606    16533    books books_author_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id);
 D   ALTER TABLE ONLY public.books DROP CONSTRAINT books_author_id_fkey;
       public          postgres    false    3495    218    216            �           2606    16564    borrows borrows_book_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.borrows
    ADD CONSTRAINT borrows_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);
 F   ALTER TABLE ONLY public.borrows DROP CONSTRAINT borrows_book_id_fkey;
       public          postgres    false    3497    222    218            �           2606    16559    borrows borrows_user_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.borrows
    ADD CONSTRAINT borrows_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 F   ALTER TABLE ONLY public.borrows DROP CONSTRAINT borrows_user_id_fkey;
       public          postgres    false    220    222    3501            G   �  x����j�0������%[�[�`l-u�0v�$Z+lKE�	�e_���]�{UM�������wt�a���=,���j����ηp)* �3T����&�&<G���e�)����g[<e),��~XcM���$)Y���Ӄ���?ٝS�))�`n;��Or7n�Qd�r�vz�p�&�6�F�d	�V���/���ǳ�"%+�sn�㴷j��F89��;}��i�W��h����.�?[Z�c��'���\�{���V�m���y1	���86\�>��L
s7��a��d�pK�Q=�}{޿����e2���%,m+�z�3��TK�v7���T[1C���p����!�j���	��N�^N��������_y�e��!      I   �  x���Mn�0���Sp_( �_z�&��4����%"�%�%Ð�A����1��.ֽ:*����h'�}Λ7bp�iY����ɥl�e<(���G�Oy2����4K^^��Ƅ�i(�az$�LP���	�ki�Y�uݡ��ʮ�B#�-�F"&�ϓ�gc0!|Z[�U�DڍV�����uc]�wf �$�a��1��]��O2o�&	J��X<��GR:Y[��R�wD�Z+g�\�K��ZCǲ��7�[	\I������ԃR8����@�s��������кx���b���Y��]�����c��3�5�گݚ���1�hA��Z��䠐,ï�p@+6�t��1,�kשb�m�`��t!��.�E�����K�_A�9���]oW�Cq$p��ՒعV�D�d�n�0,�o<u�Ȧ�;i��n1d]�ç��8ǌ[ټ��lT�>%��V�H�q�уnı�mG����ʚ���m����Z-�����\Yא[^m�O֨[K.��qq��]Z���V��b�Y��Z\?g:o4�	���0��&��m���y�a^x��R���0��؍��Ic;��SM�����XM��1É�L��%���u[����C=�O�~e��G�\�sC�C<øoJL�"����Y�{�X��5F1�߻�R��~4�L� q��      M   �   x��һ�0���"�'PK���ϑI�
���}��E�~�u�xq�m�}�{���w�N%��r&�șx g≜�/�L��3�F�í���S&P�����T&�2���/P�|���T��o�����7����      K   �  x��V�r�6]_E�u� |��Vi,�m4��b'�$A2ėR��]3�W�3�����;���H3�C�sq�|���'E,���gQǲ=X����;���M"�<O���k� �yü����!q}��(E��W��C�e�ol���>��=?t����f�1���3��-��(�t�kFnd^*����2)�ƬX̶��JG�kzF��ޣ��ח�\ߞ^A�[�T�ƺ���c�򢆑�ռ�k� �3��P��G�k�D|���@�#>�S��1�XԳli��������z��w�w���1LR�3���g�"E"ߋ���Y��6 �5�!�5}w|��`R�S��MwS�֡�LH���'�;�pYa�燿3����3�� *]�w����WM��s��c���g16&d��P��8�V8@��z�ׇo�F�z�ӍZ���q�։�;W�@$�z�q���K�u���n���]��L��{|��yꃅ� ��*i��x8��}Q���s��;fAq���:'��d�T����j�?t��F!�\�������.�c� 1]����$ t���5���7��mS��6�$iv. �O��ɨחDg��|X�8�ny��-���D����7�=�K0k }��P��O��ا0�B�8|��c<�t�hBٻU�e�e���Y�g��6?g�����{���@:��8��H<�����D�J��^�?G�+�>]���
�9�:��P槙A�N�9Q�_ꓞ�*Y|��0+w���k2Y�����M�Ku��9��`7Fn\����j�;Q��4J���?-B�ω"��3�P����5	���}}��U~)�>��r�\]\Mo�p��r�����av� �/��[q"鿤Z�Wrvv�/�|'�     