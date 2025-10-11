class CashFlow {
    /**
     * Creates a new cashflow
     * @param {Object} properties
     * @param {Date} properties.date 
     * @param {Number} properties.amount 
     * @param {String} properties.category 
     * @param {String} properties.subCategory 
     * @param {String} properties.description 
     * @param {String} properties.userId 
     * @param {String} properties.id 
     */
    constructor({date, amount, category, subCategory, description, userId, id = ""}) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.subCategory = subCategory;
        this.description = description;
        this.userId = userId;
    }
}

module.exports = CashFlow;