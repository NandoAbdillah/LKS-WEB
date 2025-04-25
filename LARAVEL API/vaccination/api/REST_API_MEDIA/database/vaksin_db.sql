-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2023 at 01:18 PM
-- Server version: 5.7.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vaksin_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `consultation`
--

CREATE TABLE `consultation` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `society_id` bigint(20) UNSIGNED NOT NULL,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('accepted','declined','pending') COLLATE utf8mb4_unicode_ci NOT NULL,
  `disease_history` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `current_symptoms` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `doctor_notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `consultation`
--

INSERT INTO `consultation` (`id`, `society_id`, `doctor_id`, `status`, `disease_history`, `current_symptoms`, `doctor_notes`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'accepted', '-', '-', '-', NULL, NULL),
(6, 1, 1, 'declined', '-', '-', '-', NULL, NULL),
(7, 3, 1, 'pending', '-', '-', '-', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medicals`
--

CREATE TABLE `medicals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `spot_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role` enum('officer','doctor') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `medicals`
--

INSERT INTO `medicals` (`id`, `spot_id`, `user_id`, `role`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'officer', 'admin', NULL, NULL),
(2, 1, 2, 'doctor', 'user', NULL, NULL),
(5, 2, 5, 'officer', 'admin', NULL, NULL),
(6, 2, 6, 'doctor', 'user', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_11_14_113558_create_regionals_table', 1),
(6, '2023_11_14_113632_create_spots_table', 1),
(7, '2023_11_14_113706_create_societies_table', 1),
(8, '2023_11_14_113734_create_vaccines_table', 1),
(9, '2023_11_14_113811_create_medicals_table', 1),
(10, '2023_11_14_113830_create_spot_vaccines_table', 1),
(11, '2023_11_14_113846_create_vaccinations_table', 1),
(12, '2023_11_14_114827_create_consultation_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `regionals`
--

CREATE TABLE `regionals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `regionals`
--

INSERT INTO `regionals` (`id`, `province`, `district`, `created_at`, `updated_at`) VALUES
(1, 'Jawa Timur', 'Sidoarjo', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `societies`
--

CREATE TABLE `societies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_card_number` char(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `born_date` date NOT NULL,
  `gender` enum('male','female') COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `login_tokens` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `regional_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `societies`
--

INSERT INTO `societies` (`id`, `id_card_number`, `name`, `password`, `born_date`, `gender`, `address`, `login_tokens`, `regional_id`, `created_at`, `updated_at`) VALUES
(1, 'ID655363', 'Rani', '$2y$12$0ZRKpaRlIdWzZTvEosWqZePDspa4DP66WLLcYjMtMoIy6HsXgG732', '2000-11-14', 'female', 'Address 1', 'e34afc0ebbafc3354bf3888bab7791e8', 1, NULL, NULL),
(3, '83381474', 'Andi', '$2y$12$NXK3AmeqjUuPWNwdzLCkxO7aHSik7bE4hvoKLVrRTje.lhzqlmxaG', '1989-11-14', 'male', 'Address 1', 'f584742dc72bb1a643f5752cd9c04947', 1, NULL, NULL),
(4, '88513541', 'Budi', '$2y$12$UMZgrjZxAdhfRTrhyz9MuezSUjGY0Usewpd4OaEaw1T.9jvJ.hqYK', '1984-11-14', 'male', 'Address 2', 'a4f92d44578108e06940d5ce19585013', 1, NULL, NULL),
(5, '16669747', 'Fenti', '$2y$12$qpdzqNaZr2XjR5Tuw7t6W.UjQvXz2swGFC69BwJ1Brf3TnYb1GPDK', '1968-11-14', 'female', 'Address 3', '658213f63c84bb6acd3e98b6a23134eb', 1, NULL, NULL),
(6, '92452370', 'Dani', '$2y$12$aT69iwnT/oUKVKGcRMIn6edZeNbDDdl4Zxzr9zJUU6Hpmv7BAUeze', '2004-11-14', 'male', 'Address 4', '6cc5bec70347201466c67b31c84a1d3c', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `spots`
--

CREATE TABLE `spots` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `regional_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `serve` tinyint(4) NOT NULL,
  `capacity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `spots`
--

INSERT INTO `spots` (`id`, `regional_id`, `name`, `address`, `serve`, `capacity`, `created_at`, `updated_at`) VALUES
(1, 1, 'Puskesmas Buduran', '-', 1, 15, NULL, NULL),
(2, 1, 'Puskesmas Waru', '-', 2, 15, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `spot_vaccines`
--

CREATE TABLE `spot_vaccines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `spot_id` bigint(20) UNSIGNED NOT NULL,
  `vaccine_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `spot_vaccines`
--

INSERT INTO `spot_vaccines` (`id`, `spot_id`, `vaccine_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 2, NULL, NULL),
(3, 1, 3, NULL, NULL),
(4, 1, 4, NULL, NULL),
(5, 1, 5, NULL, NULL),
(6, 2, 1, NULL, NULL),
(7, 2, 2, NULL, NULL),
(8, 2, 3, NULL, NULL),
(9, 2, 4, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', NULL, '$2y$12$sOBtcIwS0kPUYwNQRxRE8u6wdwwSjkJl7xMMg3.w/IDdC4mzFvX9K', NULL, NULL, NULL),
(2, 'user', 'user@gmail.com', NULL, '$2y$12$brbaQYk085q3aIWMYrOpk.JxYOW4O6Clr7R5TypG6t6V2o/T/XzdW', NULL, NULL, NULL),
(5, 'admin2', 'admin2@gmail.com', NULL, '$2y$12$sOBtcIwS0kPUYwNQRxRE8u6wdwwSjkJl7xMMg3.w/IDdC4mzFvX9K', NULL, NULL, NULL),
(6, 'user2', 'user2@gmail.com', NULL, '$2y$12$brbaQYk085q3aIWMYrOpk.JxYOW4O6Clr7R5TypG6t6V2o/T/XzdW', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vaccinations`
--

CREATE TABLE `vaccinations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `dose` tinyint(4) NOT NULL,
  `date` date NOT NULL,
  `society_id` bigint(20) UNSIGNED NOT NULL,
  `spot_id` bigint(20) UNSIGNED NOT NULL,
  `vaccine_id` bigint(20) UNSIGNED NOT NULL,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `officer_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vaccinations`
--

INSERT INTO `vaccinations` (`id`, `dose`, `date`, `society_id`, `spot_id`, `vaccine_id`, `doctor_id`, `officer_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2023-11-14', 1, 1, 1, 2, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vaccines`
--

CREATE TABLE `vaccines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vaccines`
--

INSERT INTO `vaccines` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Sinovac', NULL, NULL),
(2, 'AstraZeneca', NULL, NULL),
(3, 'Moderna', NULL, NULL),
(4, 'Pfizer', NULL, NULL),
(5, 'Sinnopharm', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `consultation`
--
ALTER TABLE `consultation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cons_to_soc` (`society_id`),
  ADD KEY `cons_to_doc` (`doctor_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `medicals`
--
ALTER TABLE `medicals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicals_spot_id_foreign` (`spot_id`),
  ADD KEY `medicals_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `regionals`
--
ALTER TABLE `regionals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `regionals_province_unique` (`province`);

--
-- Indexes for table `societies`
--
ALTER TABLE `societies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `societies_id_card_number_unique` (`id_card_number`),
  ADD KEY `societies_regional_id_foreign` (`regional_id`);

--
-- Indexes for table `spots`
--
ALTER TABLE `spots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `spots_regional_id_foreign` (`regional_id`);

--
-- Indexes for table `spot_vaccines`
--
ALTER TABLE `spot_vaccines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `spot_vaccines_spot_id_foreign` (`spot_id`),
  ADD KEY `spot_vaccines_vaccine_id_foreign` (`vaccine_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vaccinations_society_id_foreign` (`society_id`),
  ADD KEY `vaccinations_spot_id_foreign` (`spot_id`),
  ADD KEY `vaccinations_vaccine_id_foreign` (`vaccine_id`),
  ADD KEY `vaccinations_doctor_id_foreign` (`doctor_id`),
  ADD KEY `vaccinations_officer_id_foreign` (`officer_id`);

--
-- Indexes for table `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `consultation`
--
ALTER TABLE `consultation`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medicals`
--
ALTER TABLE `medicals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `regionals`
--
ALTER TABLE `regionals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `societies`
--
ALTER TABLE `societies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `spots`
--
ALTER TABLE `spots`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `spot_vaccines`
--
ALTER TABLE `spot_vaccines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vaccinations`
--
ALTER TABLE `vaccinations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `consultation`
--
ALTER TABLE `consultation`
  ADD CONSTRAINT `cons_to_doc` FOREIGN KEY (`doctor_id`) REFERENCES `medicals` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `cons_to_soc` FOREIGN KEY (`society_id`) REFERENCES `societies` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `medicals`
--
ALTER TABLE `medicals`
  ADD CONSTRAINT `medicals_spot_id_foreign` FOREIGN KEY (`spot_id`) REFERENCES `spots` (`id`),
  ADD CONSTRAINT `medicals_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `societies`
--
ALTER TABLE `societies`
  ADD CONSTRAINT `societies_regional_id_foreign` FOREIGN KEY (`regional_id`) REFERENCES `regionals` (`id`);

--
-- Constraints for table `spots`
--
ALTER TABLE `spots`
  ADD CONSTRAINT `spots_regional_id_foreign` FOREIGN KEY (`regional_id`) REFERENCES `regionals` (`id`);

--
-- Constraints for table `spot_vaccines`
--
ALTER TABLE `spot_vaccines`
  ADD CONSTRAINT `spot_vaccines_spot_id_foreign` FOREIGN KEY (`spot_id`) REFERENCES `spots` (`id`),
  ADD CONSTRAINT `spot_vaccines_vaccine_id_foreign` FOREIGN KEY (`vaccine_id`) REFERENCES `vaccines` (`id`);

--
-- Constraints for table `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD CONSTRAINT `vaccinations_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `medicals` (`id`),
  ADD CONSTRAINT `vaccinations_officer_id_foreign` FOREIGN KEY (`officer_id`) REFERENCES `medicals` (`id`),
  ADD CONSTRAINT `vaccinations_society_id_foreign` FOREIGN KEY (`society_id`) REFERENCES `societies` (`id`),
  ADD CONSTRAINT `vaccinations_spot_id_foreign` FOREIGN KEY (`spot_id`) REFERENCES `spots` (`id`),
  ADD CONSTRAINT `vaccinations_vaccine_id_foreign` FOREIGN KEY (`vaccine_id`) REFERENCES `vaccines` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
