const { Sequelize, Condition } = require('sequelize');
const Model = require('./db_model');

const sequelize = new Sequelize('telkompay_app', 'root', '',{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

async function getAdmin(username){
    try {
        await sequelize.authenticate();
        console.log("Connected");
        await sequelize.sync();
        const result = await Model.Admin.findOne({
            where: {
                username: username,
            }
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log("Could not connect")
    }
}

async function getOrtu(nisnKode){
    try {
        await sequelize.authenticate();
        console.log("Connected");
        const result = await Model.OrangTua.findOne({
            where: {
                nisn_kode: nisnKode,
            }
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log("Could not connect")
    }
}

async function getSiswa(nisn){
    try {
        await sequelize.authenticate();
        console.log("Connected");
        const result = await Model.Siswa.findOne({
            where: {
                nisn: nisn,
            }
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function insertIntoAdmin(model){
    try{
        await sequelize.authenticate();
        console.log("Connected");
        await sequelize.sync();

        const isSucces = Model.Admin.create({
            idAdmin: model.id,
            username: model.username,
            password: '123456'
        });

        return !!isSucces;
        
    }catch (error) {
        console.log(error);
    }
}

async function insertIntoOrtu(model){
    try{
        await sequelize.authenticate();
        console.log("Connected");
        await sequelize.sync();

        const isSucces = Model.OrangTua.create({
            idOrangTua: model.idOrangTua,
            nisn_kode: model.nisn_kode,
            password: '123456',
            nama: model.nama,
        });

        return !!isSucces;
        
    }catch (error) {
        console.log(error);
    }
}

async function insertIntoSiswa(model){
    try{
        await sequelize.authenticate();
        console.log("Connected");
        await sequelize.sync();

        const isSucces = Model.Siswa.create({
            idSiswa: model.idSiswa,
            nama: model.nama,
            nisn: model.nisn,
            password: '123456',
            idOrangTua: model.idOrangTua,
        });

        return !!isSucces;
        
    }catch (error) {
        console.log(error);
    }
}

async function insertIntoTransaksi(model){
    try{
        await sequelize.authenticate();
        console.log("Connected");
        await sequelize.sync();

        const isSucces = Model.TransaksiSPP.create({
            idTransaksi: model.idTransaksi,
            jumlahTagihan: model.jumlahTagihan,
            tanggalJatuhTempo: model.tanggalJatuhTempo,
            idSiswa: model.idSiswa,
            idOrangTua: model.idOrangTua,
        });

        return !!isSucces;
        
    }catch (error) {
        console.log(error);
        return false
    }
}

async function insertIntoPembayaran(model){
    try{
        await sequelize.authenticate();
        console.log("Connected");
        await sequelize.sync();

        const isSucces = Model.MetodePembayaran.create({
            idMetode: model.idMetode,
            idTransaksi: model.idTransaksi,
            idOrangTua: model.idOrangTua,
            tanggalPembayaran: model.tanggalPembayaran,
            metode: model.metode,
            jumlahDibayar: model.jumlahDibayar,
        });

        return !!isSucces;
        
    }catch (error) {
        console.log(error);
    }
}

async function insertIntoBukti(model){
    try{
        await sequelize.authenticate();
        console.log("Connected");
        await sequelize.sync();

        const isSucces = Model.BuktiPembayaran.create({
            idBukti: model.idBukti,
            tanggalCetak: model.tanggalCetak,
            idTransaksi: model.idTransaksi,
        });

        return !!isSucces;
        
    }catch (error) {
        console.log(error);
    }
}

async function insertIntoNotification(model){
    try{
        await sequelize.authenticate();
        console.log("Connected");
        await sequelize.sync();

        const isSucces = Model.Notifikasi.create({
            idNotifikasi: model.idNotifikasi,
            pesan: model.pesan,
            tanggalKirim: model.tanggalKirim,
            idOrangTua: model.idOrangTua,
            idSiswa: model.idSiswa,
        });

        return !!isSucces;
        
    }catch (error) {
        console.log(error);
    }
}

async function updateTransaksi(newValues, idTransaksi){
    try{
        await sequelize.authenticate();
        console.log("Connected");
        
        const res = await Model.TransaksiSPP.update(newValues, {where: {idTransaksi: idTransaksi}});

        if(res[0] === 0){
            console.log(`No records found with idTransaksi: ${idTransaksi}`);
        } else {
            console.log(`Record with idTransaksi: ${idTransaksi} updated successfully`);
        }
        return res;
    }catch(error){
        console.log(error);
        return null;
    }
}

async function deleteTransaksi(idTransaksi){
    try{
        await sequelize.authenticate();
        console.log("Connected");
        
        const res = await Model.TransaksiSPP.destroy({where: {idTransaksi: idTransaksi}});

        if(res[0] === 0){
            console.log(`No records found with idTransaksi: ${idTransaksi}`);
        } else {
            console.log(`Record with idTransaksi: ${idTransaksi} successfully deleted`);
        }
        return res;
    }catch(error){
        console.log(error);
        return null;
    }
}
async function getData(table, whereCondition){
    try {
        await sequelize.authenticate();
        console.log("Connected");
        console.log(table, whereCondition);
        switch (table) {
            case 'spp':
                if(whereCondition != null){
                    const result = await Model.TransaksiSPP.findAll({where: {idOrangTua: whereCondition.idOrangTua}});
                        console.log(result);
                    return result;
                }
                return false;
            case 'notif':
                if(whereCondition != null){
                    const result = await Model.Notifikasi.findAll({where: {idOrangTua: whereCondition.idOrangTua}});
                        console.log(result);
                    return result;
                }
                return false;
            case 'bukti':
                if(whereCondition != null){
                    const result = await Model.BuktiPembayaran.findAll({where: {idTransaksi: whereCondition.idTransaksi}});
                        console.log(result);
                    return result;
                }
                return false;
            case 'siswa':
                if(whereCondition != null){
                    const result = await Model.Siswa.findAll({where: {idSiswa: whereCondition.idSiswa}});
                        console.log(result);
                    return result;
                } else {
                    const result = await Model.Siswa.findAll();
                        console.log(result);
                    return result;
                }
            case 'ortu':
                if(whereCondition != null){
                    const result = await Model.OrangTua.findAll({where: {idOrangTua: whereCondition.idOrangTua}});
                        console.log(result);
                    return result;
                } else {
                    const result = await Model.OrangTua.findAll();
                        console.log(result);
                    return result;
                }
            case 'pembayaran':
                if(whereCondition != null){
                    const result = await Model.MetodePembayaran.findAll({where: {idTransaksi: whereCondition.idTransaksi}});
                        console.log(result);
                    return result;
                } else {
                    const result = await Model.MetodePembayaran.findAll();
                        console.log(result);
                    return result;
                }
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getTotalPembayaran(idOrangTua){
    try {
        await sequelize.authenticate();
        console.log("Connected");
        const totalPembayaran = await Model.MetodePembayaran.sum('jumlahDibayar', {where:{idOrangTua: idOrangTua}});
        return totalPembayaran;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function getSisaTagihan(idOrangTua){
    try{
        await sequelize.authenticate();
        console.log("Connected");
        const totalTagihan = await Model.TransaksiSPP.sum('jumlahTagihan', {where: {idOrangTua: idOrangTua}});
        const totalPembayaran = await Model.MetodePembayaran.sum('jumlahDibayar', {where: [{idOrangTua: idOrangTua}]});
        console.log(totalTagihan);
        console.log(totalPembayaran);

        return totalTagihan-totalPembayaran;
    }catch (error){
        console.log(error);
    }
}
async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: true })
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

syncDatabase();



module.exports = { 
    getAdmin, 
    getOrtu, 
    getSiswa, 
    insertIntoAdmin, 
    insertIntoOrtu, 
    insertIntoSiswa, 
    insertIntoPembayaran, 
    insertIntoTransaksi,
    insertIntoBukti,
    insertIntoNotification,
    getData,
    getTotalPembayaran,
    getSisaTagihan,
    updateTransaksi,
    deleteTransaksi,
 }