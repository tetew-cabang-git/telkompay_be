const { admin, orangTua, siswa, transaksiSPP, metodePembayaran, buktiPembayaran, notifikasi } = require("./model/model");
const DB_Connect = require('./database/db');
const { nanoid } = require('nanoid');

const getUserHandler = async (request, h) => {
    const { user_type } = request.query;

    const { username, nisn, nisnKode, password } = request.payload;
    
    switch (user_type) {
        case 'admin':
            const admin = await DB_Connect.getAdmin(username);

            if(admin != null){
                if(password == admin.password){
                    const response = h.response({
                        status: "success",
                        message: "Berhasil Login sebagai admin",
                        data: {
                            idAdmin: admin.idAdmin,
                            username: admin.username,
                            password: admin.password
                        }
                    });
                    response.code(200);
                    return response;
                } else {
                    const response = h.response({
                        status: "failed",
                        message: "Username atau Password salah",
                    });
                    response.code(400);
                    return response;
                }

            } else {
                const response = h.response({
                    status : "error",
                    message : "User Admin tidak ditemukan"
                    });
                response.code(400);
                return response;
            }
        case 'siswa':
            const siswa = await DB_Connect.getSiswa(nisn);

            if(siswa != null){
                if(password == siswa.password){
                    const response = h.response({
                        status: "success",
                        message: "Berhasil Login sebagai siswa",
                        data:{
                            'id_siswa': siswa.idSiswa,
                            'nama_siswa': siswa.nama,
                            'nisn': siswa.nisn,
                            'id_OrangTua': siswa.idOrangTua
                        }
                    });
                    response.code(200);
                    return response;
                } else {
                    const response = h.response({
                        status: "failed",
                        message: "Username atau Password salah",
                    });
                    response.code(400);
                    return response;
                }

            } else {
                const response = h.response({
                    status : "error",
                    message : "User Siswa tidak ditemukan"
                    });
                response.code(400);
                return response;
            }
        case 'ortu':
            const ortu = await DB_Connect.getOrtu(nisnKode);

            if(ortu != null){
                if(password == ortu.password){
                    const response = h.response({
                        status: "success",
                        message: "Berhasil Login sebagai ortu",
                        data:{
                            'id_OrangTua': ortu.idOrangTua,
                            'nisn_kode': ortu.nisn_kode,
                            'nama': ortu.nama,
                        }
                    });
                    response.code(200);
                    return response;
                } else {
                    const response = h.response({
                        status: "failed",
                        message: "Username atau Password salah",
                    });
                    response.code(400);
                    return response;
                }

            } else {
                const response = h.response({
                    status : "error",
                    message : "User Orangtua tidak ditemukan"
                    });
                response.code(400);
                return response;
            }
        default:
            const response = h.response({
                status : "error",
                message : "Input tidak dikenal"
                });
            response.code(404);
            return response;
    }
}

const createEntitiy = async (request, h) => {
    const { entity } = request.query;

    const { username } = request.payload;
    const { nisnKode, namaOrtu } = request.payload;
    const { nisn, namaSiswa, idOrangTua } = request.payload;
    const { jumlahTagihan, jatuhTempo } = request.payload;
    const { idTransaksi,tanggalPembayaran, metode, jumlahDibayar } = request.payload;
    const { tanggalCetak } = request.payload;
    const { pesan, tanggalKirim, idSiswa } = request.payload;

    switch (entity) {  
        case 'admin':
            isSucces = await DB_Connect.insertIntoAdmin({
                id: nanoid(10),
                username: username,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Admin",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Admin",
                });
                response.code(400);
                return response;
            }
        case 'ortu':
            isSucces = await DB_Connect.insertIntoOrtu({
                idOrangTua: nanoid(10),
                nisn_kode: nisnKode,
                nama: namaOrtu,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Orang Tua",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Orang Tua",
                });
                response.code(400);
                return response;
            }
        case 'siswa':
            isSucces = await DB_Connect.insertIntoSiswa({
                idSiswa: nanoid(10),
                nama: namaSiswa,
                nisn: nisn,
                idOrangTua: idOrangTua,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Siswa",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Siswa",
                });
                response.code(400);
                return response;
            }
        case 'spp':
            isSucces = await DB_Connect.insertIntoTransaksi({
                idTransaksi: nanoid(10),
                jumlahTagihan: jumlahTagihan,
                tanggalJatuhTempo: jatuhTempo,
                idSiswa: idSiswa,
                idOrangTua: idOrangTua,
            })
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan SPP",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan SPP",
                });
                response.code(400);
                return response;
            }
        case 'pembayaran':
            isSucces = await DB_Connect.insertIntoPembayaran({
                idMetode: nanoid(10),
                idTransaksi: idTransaksi,
                idOrangTua: idOrangTua,
                tanggalPembayaran: tanggalPembayaran,
                metode: metode,
                jumlahDibayar: jumlahDibayar,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Pembayaran",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Pembayaran",
                });
                response.code(400);
                return response;
            }
        case 'bukti':
            isSucces = await DB_Connect.insertIntoBukti({
                idBukti: nanoid(10),
                tanggalCetak: tanggalCetak,
                idTransaksi: idTransaksi,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Bukti",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Bukti",
                });
                response.code(400);
                return response;
            }
        case 'notif':
            isSucces = await DB_Connect.insertIntoNotification({
                idNotifikasi: nanoid(10),
                pesan: pesan,
                tanggalKirim: tanggalKirim,
                idOrangTua: idOrangTua,
                idSiswa: idSiswa,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Bukti",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Bukti",
                });
                response.code(400);
                return response;
            }
        default:
            const response = h.response({
                status: "failed",
                message: "Input tidak dikenal",
            });
            response.code(500);
            return response;
    }
}

const getData = async (request, h) => {
    const { model } = request.params;
    const { idSiswa, idOrangTua, idTransaksi } = request.query;
    let whereQuery;

    if(idSiswa != undefined && idOrangTua){
        whereQuery = {idSiswa: idSiswa, idOrangTua: idOrangTua}
    }else if(idSiswa != undefined){
        whereQuery = {idSiswa: idSiswa}
    }else if(idOrangTua != undefined){
        whereQuery = {idOrangTua: idOrangTua}
    }

    if(idTransaksi != undefined){
        whereQuery = {idTransaksi: idTransaksi}
    }
    
    
    const res = await DB_Connect.getData(model, whereQuery);

    const response = h.response({
        status: "success",
        data: res
    });
    response.code(200);
    return response;
    
}

const getCustomValue = async (request, h) => {
    const { customVal } = request.params;

    const { idOrangTua, idTransaksi } = request.query;
    let response, result;

    switch(customVal){
        case 'total_bayar':
            result = await DB_Connect.getTotalPembayaran(idTransaksi, idOrangTua);
            console.log(result);
            response = h.response({
                status: "success",
                data: result
            });
            response.code(200);
            return response;
        case 'total_tagihan':
            result = await DB_Connect.getSisaTagihan(idTransaksi, idOrangTua);
            console.log(result);
            response = h.response({
                status: "success",
                data: result
            });
            response.code(200);
            return response;
        default:
            break;
    }
}

const updateEntitiy = async (request, h) => {
    const { entity } = request.query;

    const { username } = request.payload;
    const { nisnKode, namaOrtu } = request.payload;
    const { nisn, namaSiswa, idOrangTua } = request.payload;
    const { jumlahTagihan, jatuhTempo } = request.payload;
    const { idTransaksi,tanggalPembayaran, metode, jumlahDibayar } = request.payload;
    const { tanggalCetak } = request.payload;
    const { pesan, tanggalKirim, idSiswa } = request.payload;

    switch (entity) {  
        case 'admin':
            isSucces = await DB_Connect.insertIntoAdmin({
                id: nanoid(10),
                username: username,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Admin",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Admin",
                });
                response.code(400);
                return response;
            }
        case 'ortu':
            isSucces = await DB_Connect.insertIntoOrtu({
                idOrangTua: nanoid(10),
                nisn_kode: nisnKode,
                nama: namaOrtu,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Orang Tua",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Orang Tua",
                });
                response.code(400);
                return response;
            }
        case 'siswa':
            isSucces = await DB_Connect.insertIntoSiswa({
                idSiswa: nanoid(10),
                nama: namaSiswa,
                nisn: nisn,
                idOrangTua: idOrangTua,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Siswa",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Siswa",
                });
                response.code(400);
                return response;
            }
        case 'spp':
            isSucces = await DB_Connect.insertIntoTransaksi({
                idTransaksi: nanoid(10),
                jumlahTagihan: jumlahTagihan,
                tanggalJatuhTempo: jatuhTempo,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan SPP",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan SPP",
                });
                response.code(400);
                return response;
            }
        case 'pembayaran':
            isSucces = await DB_Connect.insertIntoPembayaran({
                idMetode: nanoid(10),
                idTransaksi: idTransaksi,
                idOrangTua: idOrangTua,
                tanggalPembayaran: tanggalPembayaran,
                metode: metode,
                jumlahDibayar: jumlahDibayar,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Pembayaran",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Pembayaran",
                });
                response.code(400);
                return response;
            }
        case 'bukti':
            isSucces = await DB_Connect.insertIntoBukti({
                idBukti: nanoid(10),
                tanggalCetak: tanggalCetak,
                idTransaksi: idTransaksi,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Bukti",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Bukti",
                });
                response.code(400);
                return response;
            } 
        case 'notif':
            isSucces = await DB_Connect.insertIntoNotification({
                idNotifikasi: nanoid(10),
                pesan: pesan,
                tanggalKirim: tanggalKirim,
                idOrangTua: idOrangTua,
                idSiswa: idSiswa,
            }) 
            if(isSucces){
                const response = h.response({
                    status: "success",
                    message: "Berhasil menambahkan Bukti",
                });
                response.code(201);
                return response;
            } else {
                const response = h.response({
                    status: "failed",
                    message: "Gagal menambahkan Bukti",
                });
                response.code(400);
                return response;
            } 
        default:
            const response = h.response({
                status: "failed",
                message: "Input tidak dikenal",
            });
            response.code(500);
            return response;
    }
}

module.exports = { getUserHandler, createEntitiy, getData, getCustomValue };