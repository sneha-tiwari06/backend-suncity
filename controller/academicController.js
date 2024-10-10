const AcademicSpectrum = require('../model/academicSpectrumModel');

// Create Academic Spectrum entry
exports.createAcademicSpectrum = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the incoming request body

        if (req.body.studentTeacherRatio) {
            const ratios = req.body.studentTeacherRatio;
            req.body.studentTeacherRatio = {
                eyp: {
                    numerator: Number(ratios.eyp.numerator),
                    denominator: Number(ratios.eyp.denominator),
                },
                primary: {
                    numerator: Number(ratios.primary.numerator),
                    denominator: Number(ratios.primary.denominator),
                },
                secondary: {
                    numerator: Number(ratios.secondary.numerator),
                    denominator: Number(ratios.secondary.denominator),
                },
            };
        }
        

        const academicSpectrum = new AcademicSpectrum(req.body);
        await academicSpectrum.save();
        res.status(201).json(academicSpectrum);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Academic Spectrum entries
exports.getAcademicSpectrums = async (req, res) => {
    try {
        const academicSpectrums = await AcademicSpectrum.find();
        res.status(200).json(academicSpectrums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific Academic Spectrum entry by ID
exports.getAcademicSpectrumById = async (req, res) => {
    try {
        const academicSpectrum = await AcademicSpectrum.findById(req.params.id);
        if (!academicSpectrum) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json(academicSpectrum);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an Academic Spectrum entry
exports.updateAcademicSpectrum = async (req, res) => {
    try {
        // Transform studentTeacherRatio for update
        if (req.body.studentTeacherRatio) {
            const ratios = req.body.studentTeacherRatio;
            req.body.studentTeacherRatio = {
                eyp: {
                    numerator: Number(ratios.eyp.numerator),
                    denominator: Number(ratios.eyp.denominator),
                },
                primary: {
                    numerator: Number(ratios.primary.numerator),
                    denominator: Number(ratios.primary.denominator),
                },
                secondary: {
                    numerator: Number(ratios.secondary.numerator),
                    denominator: Number(ratios.secondary.denominator),
                },
            };
        }

        const academicSpectrum = await AcademicSpectrum.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!academicSpectrum) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json(academicSpectrum);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an Academic Spectrum entry
exports.deleteAcademicSpectrum = async (req, res) => {
    try {
        const academicSpectrum = await AcademicSpectrum.findByIdAndDelete(req.params.id);
        if (!academicSpectrum) return res.status(404).json({ message: 'Entry not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
