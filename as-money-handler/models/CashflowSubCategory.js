class CashflowSubCategory {
    /**
     * Creates a new cash flow subcategory
     * @param {Object} properties 
     * @param {String} properties.category 
     * @param {String} properties.subCategory 
     * @param {String} properties.userId
     * @param {String} properties.id 
     */
    constructor({category, subCategory, userId, id = ""}) {
        this.category = category;
        this.subCategory = subCategory;
        this.userId = userId;
        this.id = id;
    }
}

module.exports = CashflowSubCategory;