import createHttpError from "http-errors";
import mongoose from "mongoose";

/**
 * Factory function to create read operations for different models.
 * @param {Object} model - Mongoose model to use for reading data.
 * @param {Object} options - Options including search fields and aggregation pipeline.
 * @returns {Function} - Express middleware function to handle read requests.
 */
export const readFactory = (model, options = {}) => {
    return async (req, res, next) => {
        try {
            const { searchFields = [], aggregationPipeline = [] } = options;
            const id = req.query.id;

            console.debug("ID:", id);

            if (id) {
                // Validate ID format
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return next(createHttpError(400, "Invalid ID format"));
                }

                // Retrieve a single document if an ID is provided
                const document = await model.aggregate([
                    {
                        $match: {
                            _id: new mongoose.Types.ObjectId(id),
                            isDeleted: false,
                        },
                    },
                    ...aggregationPipeline,
                ]);

                console.debug("DOCUMENT:", document);

                if (!document || document.length === 0) {
                    return next(
                        createHttpError(
                            404,
                            "Document not found or has been deleted"
                        )
                    );
                }

                return res.status(200).json({
                    message: "Document retrieved successfully",
                    data: document[0],
                });
            }

            // If no ID is provided, retrieve all documents with pagination and optional search
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            const skip = (page - 1) * limit;
            const searchQuery = {};

            // Implement search functionality
            if (req.query.search) {
                searchQuery["$or"] = searchFields.map((field) => ({
                    [field]: { $regex: req.query.search, $options: "i" },
                }));
            }

            const documents = await model
                .aggregate([
                    { $match: { ...searchQuery, isDeleted: false } },
                    ...aggregationPipeline,
                    { $skip: skip },
                    { $limit: limit },
                ])
                .exec();

            const totalCount = await model.countDocuments({
                ...searchQuery,
                isDeleted: false,
            });

            res.status(200).json({
                message: "Documents retrieved successfully",
                data: documents,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
            });
        } catch (error) {
            console.error("Error while retrieving documents:", error);
            next(createHttpError(500, "Error while retrieving documents"));
        }
    };
};
