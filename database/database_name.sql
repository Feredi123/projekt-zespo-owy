-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 19 Kwi 2023, 13:44
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- 
-- Baza danych: `database_name`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `absences`
--

CREATE TABLE `absences` (
  `absence_id` int(11) NOT NULL,
  `employees_employee_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `absences_types_absencetype_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `absences`
--

INSERT INTO `absences` (`absence_id`, `employees_employee_id`, `start_date`, `end_date`, `absences_types_absencetype_id`) VALUES
(1, 4, '2023-04-12', '2023-04-15', 2),
(2, 5, '2023-04-12', '2023-04-12', 3),
(3, 6, '2023-04-12', '2023-04-13', 1),
(4, 5, '2023-04-04', '2023-04-06', 2),
(5, 4, '2023-04-18', '2023-04-20', 3),
(6, 10, '2023-04-13', '2023-04-13', 2),
(7, 10, '2023-04-12', '2023-04-12', 1),
(8, 11, '2023-04-02', '2023-04-26', 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `absences_types`
--

CREATE TABLE `absences_types` (
  `absencetype_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `absences_types`
--

INSERT INTO `absences_types` (`absencetype_id`, `name`) VALUES
(1, 'Sick leave'),
(2, 'Holiday'),
(3, 'Other');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `second_name` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `admin_rights` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `employees`
--

INSERT INTO `employees` (`employee_id`, `first_name`, `second_name`, `email`, `phone`, `password`, `photo`, `admin_rights`, `manager_id`) VALUES
(1, 'Amdrzej', 'Nowak', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Roger', 'Duffy', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Leona', 'Trujillo', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Alice', 'Smith', 'alice.smith@example.com', NULL, NULL, NULL, 0, 1),
(5, 'Bob', 'Johnson', 'bob.johnson@example.com', NULL, NULL, NULL, 0, 1),
(6, 'Charlie', 'Brown', 'charlie.brown@example.com', NULL, NULL, NULL, 0, 2),
(7, 'David', 'Davis', 'david.davis@example.com', NULL, NULL, NULL, 0, 2),
(8, 'Emily', 'Jones', 'emily.jones@example.com', NULL, NULL, NULL, 0, 3),
(9, 'Frank', 'Miller', 'frank.miller@example.com', NULL, NULL, NULL, 0, 3),
(10, 'George', 'Wilson', 'george.wilson@example.com', NULL, NULL, NULL, 0, 4),
(11, 'Hannah', 'Garcia', 'hannah.garcia@example.com', NULL, NULL, NULL, 0, 4),
(12, 'Isaac', 'Martinez', 'isaac.martinez@example.com', NULL, NULL, NULL, 0, 5),
(13, 'Julia', 'Hernandez', 'julia.hernandez@example.com', NULL, NULL, NULL, 0, 5),
(14, 'Karen', 'Clark', 'karen.clark@example.com', NULL, NULL, NULL, 0, 6),
(15, 'Liam', 'Garcia', 'liam.garcia@example.com', NULL, NULL, NULL, 0, 6),
(16, 'Maggie', 'Lee', 'maggie.lee@example.com', NULL, NULL, NULL, 0, 7),
(17, 'Nathan', 'Wright', 'nathan.wright@example.com', NULL, NULL, NULL, 0, 7),
(18, 'Olivia', 'Brown', 'olivia.brown@example.com', NULL, NULL, NULL, 0, 8),
(19, 'Peter', 'Nguyen', 'peter.nguyen@example.com', NULL, NULL, NULL, 0, 8),
(20, 'Quinn', 'Chen', 'quinn.chen@example.com', NULL, NULL, NULL, 0, 9),
(21, 'Rachel', 'Sanchez', 'rachel.sanchez@example.com', NULL, NULL, NULL, 0, 9),
(22, 'Seth', 'Patel', 'seth.patel@example.com', NULL, NULL, NULL, 0, 10),
(23, 'Tara', 'Singh', 'tara.singh@example.com', NULL, NULL, NULL, 0, 10),
(24, 'Victoria', 'Zhang', 'victoria.zhang@example.com', NULL, NULL, NULL, 0, 11),
(25, 'William', 'Gupta', 'william.gupta@example.com', NULL, NULL, NULL, 0, 11),
(26, 'Xavier', 'Ng', 'xavier.ng@example.com', NULL, NULL, NULL, 0, 12),
(27, 'Yasmine', 'Kim', 'yasmine.kim@example.com', NULL, NULL, NULL, 0, 12),
(28, 'Zachary', 'Liu', 'zachary.liu@example.com', NULL, NULL, NULL, 0, 13),
(29, 'Aaliyah', 'Sato', 'aaliyah.sato@example.com', NULL, NULL, NULL, 0, 13),
(30, 'Brandon', 'Kumar', 'brandon.kumar@example.com', NULL, NULL, NULL, 0, 14),
(31, 'Chloe', 'Lee', 'chloe.lee@example.com', NULL, NULL, NULL, 0, 14),
(32, 'Derek', 'Wong', 'derek.wong@example.com', NULL, NULL, NULL, 0, 15),
(33, 'Emma', 'Singh', 'emma.singh@example.com', NULL, NULL, NULL, 0, 15),
(34, 'Finn', 'Jain', 'finn.jain@example.com', NULL, NULL, NULL, 0, 16),
(35, 'Grace', 'Huang', 'grace.huang@example.com', NULL, NULL, NULL, 0, 16),
(36, 'Harrison', 'Zhang', 'harrison.zhang@example.com', NULL, NULL, NULL, 0, 17),
(37, 'Isabella', 'Kim', 'isabella.kim@example.com', NULL, NULL, NULL, 0, 17),
(38, 'Jack', 'Kumar', 'jack.kumar@example.com', NULL, NULL, NULL, 0, 18),
(39, 'Kaitlyn', 'Patel', 'kaitlyn.patel@example.com', NULL, NULL, NULL, 0, 18),
(40, 'Landon', 'Chen', 'landon.chen@example.com', NULL, NULL, NULL, 0, 19),
(41, 'Mia', 'Nguyen', 'mia.nguyen@example.com', NULL, NULL, NULL, 0, 19),
(42, 'Nathaniel', 'Sato', 'nathaniel.sato@example.com', NULL, NULL, NULL, 0, 20),
(43, 'Olivia', 'Shah', 'olivia.shah@example.com', NULL, NULL, NULL, 0, 20),
(44, 'Penelope', 'Gupta', 'penelope.gupta@example.com', NULL, NULL, NULL, 0, 21),
(45, 'Quinn', 'Kim', 'quinn.kim@example.com', NULL, NULL, NULL, 0, 21),
(46, 'Landon', 'Chen', 'landon.chen@example.com', NULL, NULL, NULL, 0, 19),
(47, 'Mia', 'Nguyen', 'mia.nguyen@example.com', NULL, NULL, NULL, 0, 19),
(48, 'Nathaniel', 'Sato', 'nathaniel.sato@example.com', NULL, NULL, NULL, 0, 20),
(49, 'Olivia', 'Shah', 'olivia.shah@example.com', NULL, NULL, NULL, 0, 20),
(50, 'Penelope', 'Gupta', 'penelope.gupta@example.com', NULL, NULL, NULL, 0, 21),
(51, 'Quinn', 'Kim', 'quinn.kim@example.com', NULL, NULL, NULL, 0, 21),
(52, 'Landon', 'Chen', 'landon.chen@example.com', NULL, NULL, NULL, 0, 19),
(53, 'Mia', 'Nguyen', 'mia.nguyen@example.com', NULL, NULL, NULL, 0, 19),
(54, 'Nathaniel', 'Sato', 'nathaniel.sato@example.com', NULL, NULL, NULL, 0, 20),
(55, 'Olivia', 'Shah', 'olivia.shah@example.com', NULL, NULL, NULL, 0, 20),
(56, 'Penelope', 'Gupta', 'penelope.gupta@example.com', NULL, NULL, NULL, 0, 21),
(57, 'Quinn', 'Kim', 'quinn.kim@example.com', NULL, NULL, NULL, 0, 21),
(58, 'Landon', 'Chen', 'landon.chen@example.com', NULL, NULL, NULL, 0, 19),
(59, 'Mia', 'Nguyen', 'mia.nguyen@example.com', NULL, NULL, NULL, 0, 19),
(60, 'Nathaniel', 'Sato', 'nathaniel.sato@example.com', NULL, NULL, NULL, 0, 20),
(61, 'Olivia', 'Shah', 'olivia.shah@example.com', NULL, NULL, NULL, 0, 20),
(62, 'Penelope', 'Gupta', 'penelope.gupta@example.com', NULL, NULL, NULL, 0, 21),
(63, 'Quinn', 'Kim', 'quinn.kim@example.com', NULL, NULL, NULL, 0, 21),
(64, 'Alex', 'Lee', 'alex.lee@example.com', NULL, NULL, NULL, 0, 19),
(65, 'Isabella', 'Nguyen', 'isabella.nguyen@example.com', NULL, NULL, NULL, 0, 19);


-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `employee_skill`
--

CREATE TABLE `employee_skill` (
  `skills_skills_id` int(11) NOT NULL,
  `employees_employee_id` int(11) NOT NULL,
  `level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `employee_skill`
--

INSERT INTO `employee_skill` (`skills_skills_id`, `employees_employee_id`, `level`) VALUES
(4, 4, 2),
(1, 4, 3),
(3, 4, 4),
(2, 5, 3),
(1, 5, 4),
(4, 5, 4),
(2, 6, 1),
(4, 6, 4),
(1, 6, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `processes`
--

CREATE TABLE `processes` (
  `process_id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `processes`
--

INSERT INTO `processes` (`process_id`, `name`, `owner_id`) VALUES
(1, 'Customer Service (FR B1, SAP Basic)', NULL),
(2, 'Customer Service (EN B2, SAP Basic)', NULL),
(3, 'Sales Coordination (EN B2)', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `process_skill`
--

CREATE TABLE `process_skill` (
  `skills_skills_id` int(11) NOT NULL,
  `processes_process_id` int(11) NOT NULL,
  `min_lvl` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `process_skill`
--

INSERT INTO `process_skill` (`skills_skills_id`, `processes_process_id`, `min_lvl`) VALUES
(4, 1, NULL),
(2, 1, NULL),
(1, 1, NULL),
(3, 2, NULL),
(4, 2, NULL),
(1, 2, NULL),
(3, 3, NULL),
(5, 3, NULL),
(1, 3, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `skills`
--

CREATE TABLE `skills` (
  `skills_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `skills`
--

INSERT INTO `skills` (`skills_id`, `name`) VALUES
(1, 'Customer service'),
(2, 'Francuski B1'),
(3, 'Angielski B2'),
(4, 'SAP Basic'),
(5, 'Team management');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `absences`
--
ALTER TABLE `absences`
  ADD PRIMARY KEY (`absence_id`),
  ADD KEY `absences_absences_types_fk` (`absences_types_absencetype_id`),
  ADD KEY `absences_employees_fk` (`employees_employee_id`);

--
-- Indeksy dla tabeli `absences_types`
--
ALTER TABLE `absences_types`
  ADD PRIMARY KEY (`absencetype_id`);

--
-- Indeksy dla tabeli `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `employees_employees_fk` (`manager_id`);

--
-- Indeksy dla tabeli `employee_skill`
--
ALTER TABLE `employee_skill`
  ADD KEY `employee_skill_employees_fk` (`employees_employee_id`),
  ADD KEY `employee_skill_skills_fk` (`skills_skills_id`);

--
-- Indeksy dla tabeli `processes`
--
ALTER TABLE `processes`
  ADD PRIMARY KEY (`process_id`),
  ADD KEY `processes_employees_fk` (`owner_id`);

--
-- Indeksy dla tabeli `process_skill`
--
ALTER TABLE `process_skill`
  ADD KEY `process_skill_processes_fk` (`processes_process_id`),
  ADD KEY `process_skill_skills_fk` (`skills_skills_id`);

--
-- Indeksy dla tabeli `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`skills_id`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `absences`
--
ALTER TABLE `absences`
  ADD CONSTRAINT `absences_absences_types_fk` FOREIGN KEY (`absences_types_absencetype_id`) REFERENCES `absences_types` (`absencetype_id`),
  ADD CONSTRAINT `absences_employees_fk` FOREIGN KEY (`employees_employee_id`) REFERENCES `employees` (`employee_id`);

--
-- Ograniczenia dla tabeli `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_employees_fk` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`employee_id`);

--
-- Ograniczenia dla tabeli `employee_skill`
--
ALTER TABLE `employee_skill`
  ADD CONSTRAINT `employee_skill_employees_fk` FOREIGN KEY (`employees_employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `employee_skill_skills_fk` FOREIGN KEY (`skills_skills_id`) REFERENCES `skills` (`skills_id`);

--
-- Ograniczenia dla tabeli `processes`
--
ALTER TABLE `processes`
  ADD CONSTRAINT `processes_employees_fk` FOREIGN KEY (`owner_id`) REFERENCES `employees` (`employee_id`);

--
-- Ograniczenia dla tabeli `process_skill`
--
ALTER TABLE `process_skill`
  ADD CONSTRAINT `process_skill_processes_fk` FOREIGN KEY (`processes_process_id`) REFERENCES `processes` (`process_id`),
  ADD CONSTRAINT `process_skill_skills_fk` FOREIGN KEY (`skills_skills_id`) REFERENCES `skills` (`skills_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
