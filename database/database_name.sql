-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 11 Kwi 2023, 20:35
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
(13, 'Julia', 'Hernandez', 'julia.hernandez@example.com', NULL, NULL, NULL, 0, 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `employee_skill`
--

CREATE TABLE `employee_skill` (
  `skills_skills_id` int(11) NOT NULL,
  `employees_employee_id` int(11) NOT NULL,
  `level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `processes`
--

CREATE TABLE `processes` (
  `process_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `owner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `process_skill`
--

CREATE TABLE `process_skill` (
  `skills_skills_id` int(11) NOT NULL,
  `processes_process_id` int(11) NOT NULL,
  `min_lvl` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `skills`
--

CREATE TABLE `skills` (
  `skills_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
