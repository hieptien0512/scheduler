-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2024 at 02:53 PM
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
-- Database: `scheduler`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `subject`, `start_time`, `end_time`, `description`) VALUES
(1, 'Meeting 11', '2024-07-25 10:00:00', '2024-07-25 12:00:00', ''),
(2, 'Họppp', '2024-07-28 10:30:10', '2024-07-28 17:30:10', 'Đây là cuộc họp'),
(3, 'Đây là meeting test', '2024-07-26 03:00:00', '2024-07-26 03:30:00', ''),
(5, 'sdbn', '2024-07-26 04:00:00', '2024-07-26 04:30:00', ''),
(7, 'yuik', '2024-07-21 04:00:00', '2024-07-21 04:30:00', ''),
(8, 'asdgvf', '2024-07-22 04:00:00', '2024-07-22 04:30:00', ''),
(11, 'sdfg', '2024-07-22 10:00:00', '2024-07-22 10:30:00', ''),
(13, 'sdfvdfv', '2024-07-27 10:00:00', '2024-07-27 10:30:00', ''),
(14, 'sdv', '2024-07-23 12:30:00', '2024-07-23 13:00:00', ''),
(15, '1111', '2024-07-26 13:30:00', '2024-07-26 14:00:00', ''),
(16, 'dddd', '2024-07-24 14:00:00', '2024-07-24 14:30:00', ''),
(18, 'họp', '2024-07-28 07:30:00', '2024-07-28 08:00:00', ''),
(19, 'làm ', '2024-07-29 08:30:00', '2024-07-29 14:30:00', ''),
(21, 'sdgh', '2024-07-22 10:00:00', '2024-07-22 10:30:00', ''),
(22, 'testetetst', '2024-07-23 10:00:00', '2024-07-23 10:30:00', ''),
(23, 'ascv', '2024-07-24 09:30:00', '2024-07-24 10:00:00', ''),
(24, 'sdv', '2024-07-24 09:30:00', '2024-07-24 10:00:00', ''),
(25, 'sdfgsdfg', '2024-07-26 12:30:00', '2024-07-26 13:00:00', ''),
(29, 'Meeting 11', '2024-07-25 10:00:00', '2024-07-25 12:00:00', ''),
(31, 'for test 1', '2024-07-22 12:30:00', '2024-07-22 13:00:00', ''),
(33, 'ahihi', '2024-07-23 16:00:00', '2024-07-23 16:30:00', ''),
(36, 'asdv', '2024-07-24 15:30:00', '2024-07-24 16:00:00', ''),
(37, 'asdv', '2024-07-24 15:30:00', '2024-07-24 16:00:00', ''),
(39, 'met user2', '2024-07-23 11:30:00', '2024-07-23 12:00:00', ''),
(40, 'met u1', '2024-07-23 12:30:00', '2024-07-23 13:00:00', ''),
(41, 'ZXC', '2024-07-24 11:30:00', '2024-07-24 12:00:00', ''),
(42, 'asdfasdf', '2024-07-23 11:00:00', '2024-07-23 11:30:00', ''),
(43, 'asdcvasdc', '2024-07-23 11:30:00', '2024-07-23 12:00:00', ''),
(44, 'mot', '2024-07-26 10:00:00', '2024-07-26 10:30:00', ''),
(45, 'haiiii', '2024-07-26 10:00:00', '2024-07-26 10:30:00', ''),
(46, 'met cua mot', '2024-07-24 10:00:00', '2024-07-24 10:30:00', ''),
(47, 'cua hai', '2024-07-24 10:00:00', '2024-07-24 10:30:00', ''),
(48, 'ASDCV', '2024-07-27 09:30:00', '2024-07-27 10:00:00', ''),
(49, 'ASASDF', '2024-07-24 10:00:00', '2024-07-24 10:30:00', ''),
(50, 'helo 3333', '2024-07-23 11:30:00', '2024-07-23 12:00:00', ''),
(51, 'ahihi', '2024-07-25 10:30:00', '2024-07-25 11:00:00', ''),
(52, 'met cua 1', '2024-07-22 11:00:00', '2024-07-22 11:30:00', ''),
(53, 'hop khan cap u1', '2024-08-05 14:00:00', '2024-08-05 14:30:00', ''),
(54, 'Hop5 lie62n', '2024-08-06 14:00:00', '2024-08-06 14:30:00', ''),
(56, 'aaa', '2024-08-06 16:00:00', '2024-08-06 16:30:00', ''),
(58, 'hi', '2024-08-06 09:30:00', '2024-08-06 10:00:00', ''),
(59, 'trung lich', '2024-08-06 00:00:00', '2024-08-07 00:00:00', ''),
(60, 'daily meeting', '2024-08-07 12:30:00', '2024-08-07 13:00:00', 'hello'),
(61, 'hello', '2024-08-06 10:00:00', '2024-08-06 10:30:00', ''),
(66, 'user 3', '2024-08-07 13:00:00', '2024-08-07 13:30:00', ''),
(67, '3 nguoi', '2024-08-06 07:30:00', '2024-08-06 08:00:00', ''),
(68, 'user3 meet', '2024-08-06 02:30:00', '2024-08-06 03:00:00', ''),
(69, 'u4 hihi', '2024-08-04 00:30:00', '2024-08-04 01:00:00', ''),
(70, 'meet u8', '2024-08-07 00:30:00', '2024-08-07 01:00:00', ''),
(71, 'meet u7', '2024-08-09 00:30:00', '2024-08-09 01:00:00', ''),
(72, 'u6', '2024-08-09 01:30:00', '2024-08-09 02:00:00', ''),
(73, 'hop', '2024-08-07 03:00:00', '2024-08-07 03:30:00', ''),
(74, 'ahihi', '2024-08-09 17:30:00', '2024-08-09 18:00:00', ''),
(75, 'met2', '2024-08-06 06:30:00', '2024-08-06 07:00:00', ''),
(76, 'Meeting', '2024-08-12 02:00:00', '2024-08-12 02:30:00', ''),
(77, 'Họp khẩn cấp', '2024-08-14 01:30:00', '2024-08-14 04:30:00', ''),
(78, 'Làm việc', '2024-08-13 02:30:00', '2024-08-13 03:00:00', ''),
(79, 'Retrospective', '2024-08-15 03:30:00', '2024-08-15 04:30:00', ''),
(80, 'cuoc hop qtr', '2024-08-12 03:00:00', '2024-08-12 03:30:00', ''),
(81, 'cuoc hop 2', '2024-08-12 04:00:00', '2024-08-12 04:30:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `appointment_users`
--

CREATE TABLE `appointment_users` (
  `appointment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment_users`
--

INSERT INTO `appointment_users` (`appointment_id`, `user_id`) VALUES
(1, 1),
(2, 1),
(7, 2),
(8, 2),
(11, 2),
(14, 2),
(15, 1),
(15, 2),
(16, 1),
(16, 2),
(18, 1),
(18, 2),
(19, 1),
(19, 2),
(21, 1),
(22, 1),
(25, 1),
(29, 2),
(31, 2),
(33, 2),
(36, 1),
(37, 2),
(39, 1),
(40, 1),
(41, 1),
(42, 1),
(43, 1),
(44, 1),
(45, 2),
(46, 1),
(47, 2),
(48, 1),
(49, 1),
(50, 4),
(51, 1),
(52, 1),
(53, 1),
(54, 1),
(56, 2),
(58, 2),
(59, 1),
(60, 1),
(61, 2),
(66, 4),
(67, 1),
(67, 2),
(67, 4),
(69, 6),
(70, 22),
(72, 20),
(73, 6),
(73, 20),
(73, 22),
(74, 6),
(74, 20),
(74, 22),
(75, 2),
(76, 1),
(77, 1),
(78, 1),
(79, 1),
(80, 2),
(81, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `user_role` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `user_name`, `password`, `user_email`, `color`, `user_role`) VALUES
(1, 'administrator', '1', 'admin@gmail.com', '#ffaa00', 1),
(2, 'u2', '1', 'u2@gmail.com', '#f8a398', 0),
(4, 'u3', '1', 'test@example.us', '#7499e1', 0),
(6, 'user4', '1', 'u4@gmail.com', '#053243', 0),
(20, 'user6', '$2y$10$TxDCRWaYZiz7VW/TDqvLmOAMUFHsBaq3JasatbVovuedHaSEDkKWO', 'u6@gmail.com', '#a6187a', 0),
(22, 'user88', '$2y$10$4Ee2Rn01KVWw2gA1Pncf7.fG2YeQuurjBz6SDkFz4d6yRVhPycz.W', 'u88@gmail.com', '#79482b', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointment_users`
--
ALTER TABLE `appointment_users`
  ADD PRIMARY KEY (`appointment_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment_users`
--
ALTER TABLE `appointment_users`
  ADD CONSTRAINT `appointment_users_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointment_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
