const { sql, poolPromise } = require(require('../config').dbConnection);

class CampanaModel {
    static async getAll() {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Campanas');
        return result.recordset;
    }

    static async getById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Campanas WHERE id_campana = @id');
        return result.recordset[0];
    }

    static async create(nombre_campana, descripcion, fecha_inicio, fecha_fin, organizador) {
        const pool = await poolPromise;
        await pool.request()
            .input('nombre_campana', sql.VarChar, nombre_campana)
            .input('descripcion', sql.Text, descripcion)
            .input('fecha_inicio', sql.Date, fecha_inicio)
            .input('fecha_fin', sql.Date, fecha_fin)
            .input('organizador', sql.VarChar, organizador)
            .query(`
                INSERT INTO Campanas (nombre_campana, descripcion, fecha_inicio, fecha_fin, organizador)
                VALUES (@nombre_campana, @descripcion, @fecha_inicio, @fecha_fin, @organizador)
            `);
    }

    static async update(id, nombre_campana, descripcion, fecha_inicio, fecha_fin, organizador) {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre_campana', sql.VarChar, nombre_campana)
            .input('descripcion', sql.Text, descripcion)
            .input('fecha_inicio', sql.Date, fecha_inicio)
            .input('fecha_fin', sql.Date, fecha_fin)
            .input('organizador', sql.VarChar, organizador)
            .query(`
                UPDATE Campanas
                SET nombre_campana = @nombre_campana,
                    descripcion = @descripcion,
                    fecha_inicio = @fecha_inicio,
                    fecha_fin = @fecha_fin,
                    organizador = @organizador
                WHERE id_campana = @id
            `);
    }

    static async delete(id) {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Campanas WHERE id_campana = @id');
    }
}

module.exports = CampanaModel;
