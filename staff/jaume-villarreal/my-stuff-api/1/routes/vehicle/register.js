const logic = require('../../logic')

module.exports = function(req, res) {

    const { body: { brand , model,  year , type , color , license },
            params: { id } } = req

    try {
        logic.registerVehicle(id, brand, model, year, type, color , license)
            .then(vehicleId => res.status(201).json({ message: 'Vehicle registered successfully', id: vehicleId }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}