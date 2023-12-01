const Models = require("../../models/index.model");
const fs = require("fs");

const find = async (modelDb, queryObj, projection) =>
    await Models[modelDb].find(queryObj, projection).exec();

const findOne = async (modelDb, queryObj) =>
    await Models[modelDb].findOne(queryObj).exec();

const findOneAndSelect = async (modelDb, queryObj, selectQuery) =>
    await Models[modelDb].findOne(queryObj).select(selectQuery).exec();

const insertNewDocument = async (modelDb, storeObj) => {
    let data = new Models[modelDb](storeObj);
    return await data.save();
};

const updateDocument = async (modelDb, updateQuery, setQuery) =>
    await Models[modelDb].findOneAndUpdate(
        updateQuery,
        { $set: setQuery },
        { new: true }
    );

const customUpdate = async (modelDb, updateQuery, setQuery) =>
    await Models[modelDb].updateOne(updateQuery, setQuery);

const pushIntoArray = async (modelDb, updateQuery, setQuery) =>
    await Models[modelDb].findOneAndUpdate(
        updateQuery,
        { $addToSet: setQuery },
        { new: true }
    );

const deleteDocument = async (modelDb, deleteQuery) =>
    await Models[modelDb].deleteOne(deleteQuery);

const findOneAndPopulate = async (
    modelDb,
    searchQuery,
    populateQuery,
    selectQuery
) =>
    await Models[modelDb]
        .findOne(searchQuery)
        .populate({ path: populateQuery, select: selectQuery })
        .lean();

const findAndPopulate = async (
    modelDb,
    searchQuery,
    populateQuery,
    selectQuery
) =>
    await Models[modelDb]
        .find(searchQuery)
        .populate({ path: populateQuery, select: selectQuery })
        .lean();

const findPopulateSortAndLimit = async (
    modelDb,
    searchQuery,
    populateQuery,
    selectQuery,
    sortedBy,
    skip,
    limit
) =>
    await Models[modelDb]
        .find(searchQuery)
        .populate({ path: populateQuery, select: selectQuery })
        .sort(sortedBy)
        .skip(skip)
        .limit(limit)
        .lean();

const findSliceAndPopulate = async (
    modelDb,
    searchQuery,
    sliceQuery,
    populateQuery,
    selectQuery
) =>
    await Models[modelDb]
        .find(searchQuery, sliceQuery)
        .populate({ path: populateQuery, select: selectQuery })
        .lean();

const findAndPopulateNested = async (modelDb, searchQuery, populate) =>
    await Models[modelDb].find(searchQuery).populate(populate).lean();

const findSliceAndPopulateNested = async (
    modelDb,
    searchQuery,
    sliceQuery,
    populate
) =>
    await Models[modelDb].find(searchQuery, sliceQuery).populate(populate).lean();

const getAggregate = async (modelDb, aggregateQuery) =>
    await Models[modelDb].aggregate(aggregateQuery);


const getPopulatedData = async (modelDb, searchQuery) =>
    await Models[modelDb]
        .find(searchQuery)
        .lean();

const findOneSliceAndPopulate = async (
    modelDb,
    searchQuery,
    sliceQuery,
    populateQuery,
    selectQuery
) =>
    await Models[modelDb]
        .findOne(searchQuery, sliceQuery)
        .populate({ path: populateQuery, select: selectQuery })
        .lean();

const findOneSliceAndCustomPopulate = async (
    modelDb,
    searchQuery,
    sliceQuery,
    customQuery
) =>
    await Models[modelDb]
        .findOne(searchQuery, sliceQuery)
        .populate(customQuery)
        .lean();

const getDataWithLimit = async (modelDb, searchQuery, sortedBy, skip, limit) =>
    await Models[modelDb]
        .find(searchQuery)
        .sort(sortedBy)
        .skip(skip)
        .limit(limit)
        .exec();

const getDataSelectWithLimit = async (
    modelDb,
    searchQuery,
    selectQuery,
    sortedBy,
    skip,
    limit
) =>
    await Models[modelDb]
        .find(searchQuery)
        .select(selectQuery)
        .sort(sortedBy)
        .skip(skip)
        .limit(limit)
        .exec();


const deleteDocuments = async (modelDb, deleteQuery) =>
    await Models[modelDb].deleteMany(deleteQuery);

module.exports = {
    find,
    findOne,
    insertNewDocument,
    updateDocument,
    deleteDocument,
    findOneAndPopulate,
    findAndPopulate,
    pushIntoArray,
    findAndPopulateNested,
    customUpdate,
    getAggregate,
    getPopulatedData,
    findOneSliceAndPopulate,
    findOneSliceAndCustomPopulate,
    getDataWithLimit,
    getDataSelectWithLimit,
    findSliceAndPopulateNested,
    findSliceAndPopulate,
    findOneAndSelect,
    findPopulateSortAndLimit,
    deleteDocuments,
};
