'use strict';

/**
 * @namespace Product
 */

var server = require('server');

server.extend(module.superModule);

var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * @typedef ProductDetailPageResourceMap
 * @type Object
 * @property {String} global_availability - Localized string for "Availability"
 * @property {String} label_instock - Localized string for "In Stock"
 * @property {String} global_availability - Localized string for "This item is currently not
 *     available"
 * @property {String} info_selectforstock - Localized string for "Select Styles for Availability"
 */

/**
* Product-Show : This endpoint is called to show the details of the selected product
* @name Base/Product-Show
* @function
* @memberof Product
* @param {middleware} - cache.applyPromotionSensitiveCache
* @param {middleware} - consentTracking.consent
* @param {querystringparameter} - pid - Product ID
* @param {category} - non-sensitive
* @param {renders} - isml
* @param {serverfunction} - get
*/
server.append("Show", function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var assetContent = ContentMgr.getContent('product-unique-information');
    var ProductMgr = require('dw/catalog/ProductMgr');

    var viewData = res.getViewData();

    if (assetContent && assetContent.online) {
        let product = ProductMgr.getProduct(viewData.product.id);

        let assetBody = assetContent.custom.body.markup;
        let test = "asd" ;

    }
})
module.exports = server.exports();
