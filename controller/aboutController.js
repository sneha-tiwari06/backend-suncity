const AboutContent = require('../model/aboutModel'); // Adjust the path based on your project structure

// Create About Content
exports.createAboutContent = async (req, res) => {
    try {
        const { content } = req.body;
        const aboutContent = new AboutContent({ content });
        await aboutContent.save();
        res.status(201).json({ message: 'Content created successfully', data: aboutContent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating content', error: error.message });
    }
};

// Read All About Content
exports.getAllAboutContent = async (req, res) => {
    try {
        const aboutContents = await AboutContent.find();
        res.status(200).json({ data: aboutContents });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content', error: error.message });
    }
};

// Read Single About Content
exports.getAboutContentById = async (req, res) => {
    try {
        const aboutContent = await AboutContent.findById(req.params.id);
        if (!aboutContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json({ data: aboutContent });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content', error: error.message });
    }
};

// Update About Content
exports.updateAboutContent = async (req, res) => {
    try {
        const { content } = req.body;
        const updatedAboutContent = await AboutContent.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true, runValidators: true } // return the updated document
        );

        if (!updatedAboutContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.status(200).json({ message: 'Content updated successfully', data: updatedAboutContent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating content', error: error.message });
    }
};

// Delete About Content
exports.deleteAboutContent = async (req, res) => {
    try {
        const deletedAboutContent = await AboutContent.findByIdAndDelete(req.params.id);
        if (!deletedAboutContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting content', error: error.message });
    }
};
