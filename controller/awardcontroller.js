const AwardContent = require('../model/awardModel'); // Adjust the path based on your project structure

// Create Award Content
exports.createAwardContent = async (req, res) => {
    try {
        const { awardName, awardby, awardyear } = req.body;
        console.log(req.body)
        const awardContent = new AwardContent({ awardName, awardby, awardyear }); // Use the correct model
        await awardContent.save();
        res.status(201).json({ message: 'Award content created successfully', data: awardContent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating award content', error: error.message });
    }
};

// Read All Award Content
exports.getAllAwardContent = async (req, res) => {
    try {
        const awardContents = await AwardContent.find(); // Use the correct model
        res.status(200).json({ data: awardContents });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching award content', error: error.message });
    }
};

// Read Single Award Content
exports.getAwardContentById = async (req, res) => {
    try {
        const awardContent = await AwardContent.findById(req.params.id); // Use the correct model
        if (!awardContent) {
            return res.status(404).json({ message: 'Award content not found' });
        }
        res.status(200).json({ data: awardContent });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching award content', error: error.message });
    }
};

// Update Award Content
exports.updateAwardContent = async (req, res) => {
    try {
        const { awardName, awardby, awardyear } = req.body; // Adjust the fields to match your model
        const updatedAwardContent = await AwardContent.findByIdAndUpdate(
            req.params.id,
            { awardName, awardby, awardyear },
            { new: true, runValidators: true } // return the updated document
        );

        if (!updatedAwardContent) {
            return res.status(404).json({ message: 'Award content not found' });
        }

        res.status(200).json({ message: 'Award content updated successfully', data: updatedAwardContent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating award content', error: error.message });
    }
};

// Delete Award Content
exports.deleteAwardContent = async (req, res) => {
    try {
        const deletedAwardContent = await AwardContent.findByIdAndDelete(req.params.id);
        if (!deletedAwardContent) {
            return res.status(404).json({ message: 'Award content not found' });
        }
        res.status(200).json({ message: 'Award content deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting award content', error: error.message });
    }
};
