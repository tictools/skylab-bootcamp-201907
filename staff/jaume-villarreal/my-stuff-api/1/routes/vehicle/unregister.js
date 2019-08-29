const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id , vehicleId } } = req

    try {
        logic.unregisterVehicle(id , vehicleId)
            .then(() => res.json({ message: 'Vehicle unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
