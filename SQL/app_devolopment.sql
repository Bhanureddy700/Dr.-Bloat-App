-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2024 at 05:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_devolopment`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(9) NOT NULL,
  `DTID` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `userid` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mobile` varchar(12) NOT NULL,
  `gender` varchar(8) NOT NULL,
  `image` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(9) NOT NULL,
  `userid` int(20) NOT NULL,
  `message` varchar(50) NOT NULL,
  `dateTime` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `userid` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mobile` varchar(12) NOT NULL,
  `age` int(3) NOT NULL,
  `gender` varchar(7) NOT NULL,
  `address` varchar(100) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `doctorId` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sectiona`
--

CREATE TABLE `sectiona` (
  `id` int(9) NOT NULL,
  `userid` varchar(20) NOT NULL,
  `Q1` int(2) NOT NULL,
  `Q2` int(2) NOT NULL,
  `Q3` int(2) NOT NULL,
  `Q4` int(2) NOT NULL,
  `Q5` int(2) NOT NULL,
  `Q6` int(2) NOT NULL,
  `Q7` int(2) NOT NULL,
  `A1` varchar(100) NOT NULL,
  `A2` varchar(100) NOT NULL,
  `A3` varchar(100) NOT NULL,
  `A4` varchar(100) NOT NULL,
  `A5` varchar(100) NOT NULL,
  `A6` varchar(100) NOT NULL,
  `A7` varchar(100) NOT NULL,
  `DT` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sectionb`
--

CREATE TABLE `sectionb` (
  `id` int(9) NOT NULL,
  `userid` varchar(20) NOT NULL,
  `Q1` varchar(20) NOT NULL,
  `Q2` varchar(20) NOT NULL,
  `Q3` varchar(20) NOT NULL,
  `Q4` varchar(20) NOT NULL,
  `Q5` varchar(20) NOT NULL,
  `Q6` varchar(20) NOT NULL,
  `Q7` varchar(20) NOT NULL,
  `A1` varchar(100) NOT NULL,
  `A2` varchar(100) NOT NULL,
  `A3` varchar(100) NOT NULL,
  `A4` varchar(100) NOT NULL,
  `A5` varchar(100) NOT NULL,
  `A6` varchar(100) NOT NULL,
  `A7` varchar(100) NOT NULL,
  `DT` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `sectiona`
--
ALTER TABLE `sectiona`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sectionb`
--
ALTER TABLE `sectionb`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `sectiona`
--
ALTER TABLE `sectiona`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `sectionb`
--
ALTER TABLE `sectionb`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
