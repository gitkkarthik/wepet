const express = require('express');
const router = express.Router();
const Vet = require('../models/Vet');

// ✅ Get all vets
router.get('/', async (req, res) => {
    try {
        const vets = await Vet.find();
        res.status(200).json({
            success: true,
            message: 'List of available vets',
            data: vets
        });
    } catch (err) {
        console.error('Error fetching vets:', err);
        res.status(500).json({
            success: false,
            message: 'Could not retrieve vet listings.',
            error: err.message
        });
    }
});

// ✅ Get a vet by ID (Fix for 404 issue)
router.get('/:id', async (req, res) => {
    try {
        const vet = await Vet.findById(req.params.id);
        if (!vet) {
            return res.status(404).json({
                success: false,
                message: "Vet not found"
            });
        }
        res.status(200).json({
            success: true,
            data: vet
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching vet details",
            error: err.message
        });
    }
});

// ✅ Add a new vet
router.post('/', async (req, res) => {
    try {
        const { name, specialization, contact, address, availability } = req.body;

        if (!name || !specialization || !contact || !address || !availability) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const newVet = new Vet({ name, specialization, contact, address, availability });
        const vet = await newVet.save();

        res.status(201).json({
            success: true,
            message: "Vet added successfully!",
            data: vet
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
});

module.exports = router; // ✅ Keep this at the end

