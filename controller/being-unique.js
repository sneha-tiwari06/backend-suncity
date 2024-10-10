const BeingUniqueContent = require('../model/beingUnique'); // Adjust the path based on your project structure

// Create Unique Content
exports.createUniqueContent = async (req, res) => {
    try {
        const { content } = req.body;
        const uniqueContent = new BeingUniqueContent({ content });
        await uniqueContent.save();
        res.status(201).json({ message: 'Content created successfully', data: uniqueContent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating content', error: error.message });
    }
};

// Read All Unique Content
exports.getAllUniqueContent = async (req, res) => {
    try {
        const uniqueContents = await BeingUniqueContent.find();
        res.status(200).json({ data: uniqueContents });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content', error: error.message });
    }
};

// Read Single Unique Content
exports.getUniqueContentById = async (req, res) => {
    try {
        const uniqueContent = await BeingUniqueContent.findById(req.params.id);
        if (!uniqueContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json({ data: uniqueContent });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content', error: error.message });
    }
};

// Update Unique Content
exports.updateUniqueContent = async (req, res) => {
    try {
        const { content } = req.body;
        const updatedUniqueContent = await BeingUniqueContent.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true, runValidators: true } // return the updated document
        );

        if (!updatedUniqueContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.status(200).json({ message: 'Content updated successfully', data: updatedUniqueContent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating content', error: error.message });
    }
};

// Delete Unique Content
exports.deleteUniqueContent = async (req, res) => {
    try {
        const deletedUniqueContent = await BeingUniqueContent.findByIdAndDelete(req.params.id);
        if (!deletedUniqueContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting content', error: error.message });
    }
};
