const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('telkompay_app', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

// Define the model
// const Admin = sequelize.define('Admin', {
//     idAdmin: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//     },
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     tableName: 'admin'
// });


// const OrangTua = sequelize.define('Orang Tua', {
//     idOrangTua: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         primaryKey: true,
//     },
//     nisnKode: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     password: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     nama: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     }
// }, {
//     tableName: 'orang_tua'
// });

// const Siswa = sequelize.define('Siswa',{
//     idSiswa: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         primaryKey: true,
//     },
//     nisn: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         unique: true,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     idOrangTua: {
//         type: DataTypes.STRING,
//         references: {
//             model: OrangTua,
//             key: 'idOrangTua'
//         }
//     }
// }, {tableName: 'siswa'});

// const TransaksiSPP = sequelize.define('TransaksiSPP',{
//     idTransaksi: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         primaryKey: true,
//     },
//     jumlahTagihan: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//     },
//     tanggalJatuhTempo: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     }
// },{tableName: 'transaksiSPP'});

// const MetodePembayaran = sequelize.define('MetodePembayaran',{
//     idTransaksi: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         primaryKey: true,
//     },
//     jumlahTagihan: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//     },
//     tanggalJatuhTempo: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     }
// },{tableName: 'transaksiSPP'});

// // Define associations
// OrangTua.belongsTo(Siswa, { foreignKey: 'idOrangTua' },);

// Define Admin model
const Admin = sequelize.define('Admin', {
    idAdmin: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'admin',
    timestamps: false
});

// Define BuktiPembayaran model
const BuktiPembayaran = sequelize.define('BuktiPembayaran', {
    idBukti: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
    },
    tanggalCetak: {
        type: DataTypes.DATE,
        allowNull: true
    },
    idTransaksi: {
        type: DataTypes.STRING(20),
        allowNull: true,
        references: {
            model: 'transaksi_spp',
            key: 'idTransaksi'
        }
    }
}, {
    tableName: 'bukti_pembayaran',
    timestamps: false
});

// Define MetodePembayaran model
const MetodePembayaran = sequelize.define('MetodePembayaran', {
    idMetode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
    },
    idTransaksi: {
        type: DataTypes.STRING(20),
        allowNull: true,
        references: {
            model: 'transaksi_spp',
            key: 'idTransaksi'
        }
    },
    idOrangTua: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: 'orang_tua',
            key: 'idOrangTua'
        }
    },
    tanggalPembayaran: {
        type: DataTypes.DATE,
        allowNull: true
    },
    metode: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    jumlahDibayar: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    tableName: 'metode_pembayaran',
    timestamps: false
});

// Define Notifikasi model
const Notifikasi = sequelize.define('Notifikasi', {
    idNotifikasi: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
    },
    pesan: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    tanggalKirim: {
        type: DataTypes.DATE,
        allowNull: true
    },
    idOrangTua: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: 'orang_tua',
            key: 'idOrangTua'
        }
    },
    idSiswa: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: 'siswa',
            key: 'idSiswa'
        }
    }
}, {
    tableName: 'notifikasi',
    timestamps: false
});

// Define OrangTua model
const OrangTua = sequelize.define('OrangTua', {
    idOrangTua: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
    },
    nisn_kode: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    nama: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
}, {
    tableName: 'orang_tua',
    timestamps: false
});

// Define Siswa model
const Siswa = sequelize.define('Siswa', {
    idSiswa: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    nisn: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    idOrangTua: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: 'orang_tua',
            key: 'idOrangTua'
        }
    }
}, {
    tableName: 'siswa',
    timestamps: false
});

// Define TransaksiSPP model
const TransaksiSPP = sequelize.define('TransaksiSPP', {
    idTransaksi: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
    },
    jumlahTagihan: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    tanggalJatuhTempo: {
        type: DataTypes.DATE,
        allowNull: true
    },
    idOrangTua: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: 'orang_tua',
            key: 'idOrangTua'
        }
    },
    idSiswa: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: 'siswa',
            key: 'idSiswa'
        }
    }
}, {
    tableName: 'transaksi_spp',
    timestamps: false
});

// Define associations
BuktiPembayaran.belongsTo(TransaksiSPP, { foreignKey: 'idTransaksi' });
MetodePembayaran.belongsTo(OrangTua, { foreignKey: 'idOrangTua' });
MetodePembayaran.belongsTo(TransaksiSPP, { foreignKey: 'idTransaksi' });
Notifikasi.belongsTo(OrangTua, { foreignKey: 'idOrangTua' });
Notifikasi.belongsTo(Siswa, { foreignKey: 'idSiswa' });
TransaksiSPP.belongsTo(OrangTua, { foreignKey: 'idOrangTua' });
TransaksiSPP.belongsTo(Siswa, { foreignKey: 'idSiswa' });
Siswa.belongsTo(OrangTua, { foreignKey: 'idOrangTua' });

module.exports = { Admin, OrangTua, Siswa, TransaksiSPP, BuktiPembayaran, MetodePembayaran, Notifikasi }