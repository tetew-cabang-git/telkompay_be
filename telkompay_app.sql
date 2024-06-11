-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2024 at 10:31 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `telkompay_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `idAdmin` varchar(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`idAdmin`, `username`, `password`) VALUES
('0', 'admintest', '123456'),
('0jwMWW2-ny', 'admintest2', '123456'),
('1234512311', 'admintel', 'a'),
('1234567890', 'admintel2', 'a'),
('2LSwkK05oF', 'admintest3', '123456'),
('H9nyH4oAkz', 'admintest4', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `bukti_pembayaran`
--

CREATE TABLE `bukti_pembayaran` (
  `idBukti` varchar(10) NOT NULL,
  `tanggalCetak` date DEFAULT NULL,
  `idTransaksi` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bukti_pembayaran`
--

INSERT INTO `bukti_pembayaran` (`idBukti`, `tanggalCetak`, `idTransaksi`) VALUES
('et-hZAK-dD', '2024-07-06', 'kx7tt1crGh'),
('Gsq-OsQD9g', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `metode_pembayaran`
--

CREATE TABLE `metode_pembayaran` (
  `idMetode` varchar(10) NOT NULL,
  `idTransaksi` varchar(20) DEFAULT NULL,
  `idOrangTua` varchar(10) DEFAULT NULL,
  `tanggalPembayaran` date DEFAULT NULL,
  `metode` varchar(20) DEFAULT NULL,
  `jumlahDibayar` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metode_pembayaran`
--

INSERT INTO `metode_pembayaran` (`idMetode`, `idTransaksi`, `idOrangTua`, `tanggalPembayaran`, `metode`, `jumlahDibayar`) VALUES
('kdZ0qsD8lr', 'RjS8I_9LQs', '7328941560', '2024-12-02', 'Transfer Bank', 1000000),
('SitFgEpOLt', 'RjS8I_9LQs', '7328941560', '2024-12-02', 'Transfer Bank', 1000000);

-- --------------------------------------------------------

--
-- Table structure for table `notifikasi`
--

CREATE TABLE `notifikasi` (
  `idNotifikasi` varchar(10) NOT NULL,
  `pesan` varchar(100) DEFAULT NULL,
  `tanggalKirim` date DEFAULT NULL,
  `idOrangTua` varchar(10) DEFAULT NULL,
  `idSiswa` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifikasi`
--

INSERT INTO `notifikasi` (`idNotifikasi`, `pesan`, `tanggalKirim`, `idOrangTua`, `idSiswa`) VALUES
('7e9YFHM-s3', 'Selamat anda berhasil membayar SPP', '2024-07-01', '7328941560', '1122334455');

-- --------------------------------------------------------

--
-- Table structure for table `orang_tua`
--

CREATE TABLE `orang_tua` (
  `idOrangTua` varchar(10) NOT NULL,
  `nisn_kode` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `nama` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orang_tua`
--

INSERT INTO `orang_tua` (`idOrangTua`, `nisn_kode`, `password`, `nama`) VALUES
('7328941560', '00000000000000000000', 'b', 'Budi'),
('KJmKszXpDv', '1234511223', '123456', 'Budiman');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `idSiswa` varchar(10) NOT NULL,
  `nama` varchar(20) DEFAULT NULL,
  `nisn` varchar(10) DEFAULT NULL,
  `password` varchar(10) DEFAULT NULL,
  `idOrangTua` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`idSiswa`, `nama`, `nisn`, `password`, `idOrangTua`) VALUES
('1122334455', 'Anak Budi', '0000000000', 'b', '7328941560'),
('na_L4fO3lT', 'Budiman Do', '1234511223', '123456', '7328941560');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_spp`
--

CREATE TABLE `transaksi_spp` (
  `idTransaksi` varchar(20) NOT NULL,
  `jumlahTagihan` float DEFAULT NULL,
  `tanggalJatuhTempo` date DEFAULT NULL,
  `idOrangTua` varchar(10) NOT NULL,
  `idSiswa` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi_spp`
--

INSERT INTO `transaksi_spp` (`idTransaksi`, `jumlahTagihan`, `tanggalJatuhTempo`, `idOrangTua`, `idSiswa`) VALUES
('decUkrVHDl', 1000000, '2024-12-06', '7328941560', '1122334455'),
('FkjrhBLZIS', 1000000, '2024-12-06', '7328941560', '1122334455'),
('kx7tt1crGh', 1000000, '2024-12-06', '7328941560', '1122334455'),
('RjS8I_9LQs', 1000000, '2024-12-06', '7328941560', '1122334455'),
('SPQBDakg-a', 1000000, '2024-12-06', '7328941560', '1122334455');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `bukti_pembayaran`
--
ALTER TABLE `bukti_pembayaran`
  ADD PRIMARY KEY (`idBukti`),
  ADD KEY `idTransaksi` (`idTransaksi`);

--
-- Indexes for table `metode_pembayaran`
--
ALTER TABLE `metode_pembayaran`
  ADD PRIMARY KEY (`idMetode`),
  ADD KEY `idOrangTua` (`idOrangTua`),
  ADD KEY `idTransaksi` (`idTransaksi`);

--
-- Indexes for table `notifikasi`
--
ALTER TABLE `notifikasi`
  ADD PRIMARY KEY (`idNotifikasi`),
  ADD KEY `idOrangTua` (`idOrangTua`),
  ADD KEY `idSiswa` (`idSiswa`);

--
-- Indexes for table `orang_tua`
--
ALTER TABLE `orang_tua`
  ADD PRIMARY KEY (`idOrangTua`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`idSiswa`),
  ADD KEY `idOrangTua` (`idOrangTua`);

--
-- Indexes for table `transaksi_spp`
--
ALTER TABLE `transaksi_spp`
  ADD PRIMARY KEY (`idTransaksi`),
  ADD KEY `idOrangTua` (`idOrangTua`),
  ADD KEY `idSiswa` (`idSiswa`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bukti_pembayaran`
--
ALTER TABLE `bukti_pembayaran`
  ADD CONSTRAINT `bukti_pembayaran_ibfk_1` FOREIGN KEY (`idTransaksi`) REFERENCES `transaksi_spp` (`idTransaksi`);

--
-- Constraints for table `metode_pembayaran`
--
ALTER TABLE `metode_pembayaran`
  ADD CONSTRAINT `metode_pembayaran_ibfk_1` FOREIGN KEY (`idOrangTua`) REFERENCES `orang_tua` (`idOrangTua`),
  ADD CONSTRAINT `metode_pembayaran_ibfk_2` FOREIGN KEY (`idTransaksi`) REFERENCES `transaksi_spp` (`idTransaksi`);

--
-- Constraints for table `notifikasi`
--
ALTER TABLE `notifikasi`
  ADD CONSTRAINT `notifikasi_ibfk_1` FOREIGN KEY (`idOrangTua`) REFERENCES `orang_tua` (`idOrangTua`),
  ADD CONSTRAINT `notifikasi_ibfk_2` FOREIGN KEY (`idSiswa`) REFERENCES `siswa` (`idSiswa`);

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`idOrangTua`) REFERENCES `orang_tua` (`idOrangTua`);

--
-- Constraints for table `transaksi_spp`
--
ALTER TABLE `transaksi_spp`
  ADD CONSTRAINT `transaksi_spp_ibfk_1` FOREIGN KEY (`idOrangTua`) REFERENCES `orang_tua` (`idOrangTua`),
  ADD CONSTRAINT `transaksi_spp_ibfk_2` FOREIGN KEY (`idSiswa`) REFERENCES `siswa` (`idSiswa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
