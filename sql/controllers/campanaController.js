const CampanaModel = require('../models/campanaModel');

class CampanaController {
    static async getAll(req, res) {
        try {
            const campanas = await CampanaModel.getAll();
            res.json(campanas);
        } catch (error) {
            res.status(500).json({ error: 'Error obteniendo campañas' });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const campana = await CampanaModel.getById(id);
            if (campana) res.json(campana);
            else res.status(404).json({ error: 'Campaña no encontrada' });
        } catch (error) {
            res.status(500).json({ error: 'Error obteniendo campaña' });
        }
    }

    static async create(req, res) {
        try {
            const { nombre_campana, descripcion, fecha_inicio, fecha_fin, organizador } = req.body;
            await CampanaModel.create(nombre_campana, descripcion, fecha_inicio, fecha_fin, organizador);
            res.status(201).json({ message: 'Campaña creada' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creando campaña' });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre_campana, descripcion, fecha_inicio, fecha_fin, organizador } = req.body;
            await CampanaModel.update(id, nombre_campana, descripcion, fecha_inicio, fecha_fin, organizador);
            res.json({ message: 'Campaña actualizada' });
        } catch (error) {
            res.status(500).json({ error: 'Error actualizando campaña' });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await CampanaModel.delete(id);
            res.json({ message: 'Campaña eliminada' });
        } catch (error) {
            res.status(500).json({ error: 'Error eliminando campaña' });
        }
    }
}

module.exports = CampanaController;
