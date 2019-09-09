(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./constants/client.js":
/*!*****************************!*\
  !*** ./constants/client.js ***!
  \*****************************/
/*! exports provided: AIR_APPLICATION_ID, ADVITO_CLIENT, ADVITO_GEOSET_ID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AIR_APPLICATION_ID", function() { return AIR_APPLICATION_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADVITO_CLIENT", function() { return ADVITO_CLIENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADVITO_GEOSET_ID", function() { return ADVITO_GEOSET_ID; });
const AIR_APPLICATION_ID = 2;
const ADVITO_CLIENT = 1;
const ADVITO_GEOSET_ID = 1;

/***/ }),

/***/ "./constants/collection.js":
/*!*********************************!*\
  !*** ./constants/collection.js ***!
  \*********************************/
/*! exports provided: LOCATION_COLLECTION, TRAVEL_SECTOR_COLLECTION, AIRLINE_GROUP_COLLECTION, PREFERRED_AIRLINE_COLLECTION, PREFERRED_AIRLINE_LOOKUP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCATION_COLLECTION", function() { return LOCATION_COLLECTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRAVEL_SECTOR_COLLECTION", function() { return TRAVEL_SECTOR_COLLECTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AIRLINE_GROUP_COLLECTION", function() { return AIRLINE_GROUP_COLLECTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREFERRED_AIRLINE_COLLECTION", function() { return PREFERRED_AIRLINE_COLLECTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREFERRED_AIRLINE_LOOKUP", function() { return PREFERRED_AIRLINE_LOOKUP; });
const LOCATION_COLLECTION = `id
        name
        description
        dateUpdated
        regionCount
        standard
        active
`;
const TRAVEL_SECTOR_COLLECTION = `id
        name
        description
        dateUpdated
        sectorCount
        standard
        active
        `;
const AIRLINE_GROUP_COLLECTION = `id
        name
        description
        dateUpdated
        effectiveStartDate
        effectiveEndDate
        active
        standard
        airlineGroupCount
`;
const PREFERRED_AIRLINE_COLLECTION = `id
        name
        description
        dateUpdated
        active
        airlineCount
        `;
const PREFERRED_AIRLINE_LOOKUP = {
  PREFERENCE_LEVEL_TYPE: 15,
  PRIMARY: 88,
  SECONDARY: 89,
  TERTIARY: 90,
  NONE: 91
};

/***/ }),

/***/ "./constants/contract.js":
/*!*******************************!*\
  !*** ./constants/contract.js ***!
  \*******************************/
/*! exports provided: CONTRACT, PRICING_TERM, TARGET_TERM, TARGET_LEVEL, DISCOUNT, NORMALIZATION, NORMALIZATION_MARKET, NOTE, CONTRACT_LOOKUP, DISCOUNT_LOOKUP, TARGET_TERM_LOOKUP, PRICING_TERM_LOOKUP, RULE_LOOKUP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTRACT", function() { return CONTRACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRICING_TERM", function() { return PRICING_TERM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TARGET_TERM", function() { return TARGET_TERM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TARGET_LEVEL", function() { return TARGET_LEVEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISCOUNT", function() { return DISCOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NORMALIZATION", function() { return NORMALIZATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NORMALIZATION_MARKET", function() { return NORMALIZATION_MARKET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOTE", function() { return NOTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTRACT_LOOKUP", function() { return CONTRACT_LOOKUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISCOUNT_LOOKUP", function() { return DISCOUNT_LOOKUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TARGET_TERM_LOOKUP", function() { return TARGET_TERM_LOOKUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRICING_TERM_LOOKUP", function() { return PRICING_TERM_LOOKUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RULE_LOOKUP", function() { return RULE_LOOKUP; });
const CONTRACT = `id
        name
        typeId
        typeName
        description
        round
        effectiveFrom
        effectiveTo
        qc
        pricingTermCount
        targetTermCount
        pointOfSaleList
        pointOfOriginList
        airlineList
        divisionId`;
const PRICING_TERM = `id
        contractOrder
        appliedOrder
        name
        effectiveFrom
        effectiveTo
        qc
        pointOfSaleList
        pointOfOriginList
        airlineList
        noteImportant
        noteContent
        discountNoteCount
        ignore
        discountCount`;
const TARGET_TERM = `id
        name
        order
        effectiveFrom
        effectiveTo
        timeframe
        qc
        targetTypeId
        targetTypeName
        cabinF
        cabinC
        cabinP
        cabinY
        qsi
        incentiveTypeId
        incentiveTypeName
        softTarget
        internalTarget
        targetAmount
        levelCount
        ruleCount
        currencyId
        noteImportant
        noteContent
        dpmPrice
        dpmStartDate
        baselineDateFrom
        baselineDateTo
        goalDateFrom
        goalDateTo
        airlineGroupFrom
        airlineGroupTo
        fareCategoryFrom
        fareCategoryTo
  `;
const TARGET_LEVEL = `id
        targetTermId
        targetAmount
        scoringTarget
        incentiveDescription
`;
const DISCOUNT = `id
        pricingTermId
        contractOrder
        appliedOrder
        name
        effectiveFrom
        effectiveTo
        discountTypeId
        discountTypeName
        discountValue
        journeyTypeId
        journeyTypeName
        directionTypeId
        directionTypeName
        ruleCount
        normalizationCount
        noteImportant
        noteContent`;
const NORMALIZATION = `id
        usageFrom
        usageTo
        effectiveFrom
        effectiveTo
        created
        createdby
        marketCount`;
const NORMALIZATION_MARKET = `id
        marketA
        marketB
        farePaid
        usageOverride
        farePullDate
        notes
        fareList {
          id
          fareType
          fareBasis
          amount
          currencyCode
          directionType
          advancePurchase
          minstay
        }`;
const NOTE = `id
        text
        lastUpdate
        assigneeId
        assigneeName
        assignedToId
        assignedToName`;
const CONTRACT_LOOKUP = {
  CONTRACT: 7,
  PROPOSAL: 8,
  AMENDMENT: 9,
  TYPE: 2
};
const DISCOUNT_LOOKUP = {
  DISCOUNT_TYPE: 3,
  PERCENTAGE: 11,
  JOURNEY_TYPE: 4,
  DIRECTION_TYPE: 5,
  RULE_TYPE: 1
};
const TARGET_TERM_LOOKUP = {
  TARGET_TYPE: 6,
  INCENTIVE_TYPE: 7,
  SEGMENT_SHARE: 20,
  REVENUE_SHARE: 21,
  SEGMENT: 22,
  REVENUE: 23,
  SHARE_GAP: 24,
  NONE: 25,
  BACK_END: 26,
  OTHER: 27,
  KPG: 28,
  RULE_TYPE: 2
};
const PRICING_TERM_LOOKUP = {
  RULE_TYPE: 3
};
const RULE_LOOKUP = {
  TICKET_DATE: 1,
  TRAVEL_DATE: 2,
  POINT_OF_SALE: 3,
  POINT_OF_ORIGIN: 4,
  MARKET: 5,
  FARE_BASIS: 6,
  BOOKING_CLASS: 8,
  AIRLINE: 10,
  TICKET_DESIGNATOR: 13,
  TOUR_CODE: 14,
  ADVANCED_TICKETING: 15,
  MIN_STAY: 16,
  MAX_STAY: 17,
  DAY_OF_WEEK: 18,
  STOPS: 19,
  CONNECTION_POINT: 20,
  FLIGHT_NUMBER: 21,
  BLACKOUT: 22,
  DISTANCE: 23,
  CABIN: 24,
  FARE_CATEGORY: 25,
  DAY_UNIT: 11,
  DAY_OF_WEEK_UNIT: 13,
  HOURS: 69,
  DAYS: 70,
  MONTHS: 71,
  FARE_BASIS_TYPE: 14,
  MATCHES: 83,
  STARTS_WITH: 84,
  ENDS_WITH: 85,
  CONTAINS_ANY: 86,
  CONTAINS_ALL: 87
};

/***/ }),

/***/ "./constants/dataSet.js":
/*!******************************!*\
  !*** ./constants/dataSet.js ***!
  \******************************/
/*! exports provided: DATA_SET */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_SET", function() { return DATA_SET; });
const DATA_SET = `name
      dateUpdated
      qc
      countryData {
        tickets
        segments
        farePaid
        importedTickets
        errorTickets
        errorRatio
      }
      divisionData {
        tickets
        segments
        farePaid
      }`;

/***/ }),

/***/ "./constants/email.js":
/*!****************************!*\
  !*** ./constants/email.js ***!
  \****************************/
/*! exports provided: ADVITO_AIR_APPLICATION, EMAIL_SENDER, EMAIL_BCC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADVITO_AIR_APPLICATION", function() { return ADVITO_AIR_APPLICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMAIL_SENDER", function() { return EMAIL_SENDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMAIL_BCC", function() { return EMAIL_BCC; });
const ADVITO_AIR_APPLICATION = 2;
const EMAIL_SENDER = 'IandA@advito.com';
const EMAIL_BCC = ['ianda@advito.com', 'hshim@boostlabs.com'];

/***/ }),

/***/ "./constants/index.js":
/*!****************************!*\
  !*** ./constants/index.js ***!
  \****************************/
/*! exports provided: CONTRACT, PRICING_TERM, TARGET_TERM, TARGET_LEVEL, DISCOUNT, NORMALIZATION, NORMALIZATION_MARKET, NOTE, CONTRACT_LOOKUP, DISCOUNT_LOOKUP, TARGET_TERM_LOOKUP, PRICING_TERM_LOOKUP, RULE_LOOKUP, DATA_SET, PROCESS, PROJECT, PROJECT_LOOKUP, AIR_APPLICATION_ID, ADVITO_CLIENT, ADVITO_GEOSET_ID, LIBRARY_LOOKUP, LOCATION_LOOKUP, LOCATION_COLLECTION, TRAVEL_SECTOR_COLLECTION, AIRLINE_GROUP_COLLECTION, PREFERRED_AIRLINE_COLLECTION, PREFERRED_AIRLINE_LOOKUP, ADVITO_AIR_APPLICATION, EMAIL_SENDER, EMAIL_BCC, APP_URL, REGEX_USER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_URL", function() { return APP_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGEX_USER", function() { return REGEX_USER; });
/* harmony import */ var _contract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contract */ "./constants/contract.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONTRACT", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["CONTRACT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PRICING_TERM", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["PRICING_TERM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TARGET_TERM", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TARGET_LEVEL", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["TARGET_LEVEL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DISCOUNT", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NORMALIZATION", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["NORMALIZATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NORMALIZATION_MARKET", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["NORMALIZATION_MARKET"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NOTE", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["NOTE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONTRACT_LOOKUP", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["CONTRACT_LOOKUP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DISCOUNT_LOOKUP", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT_LOOKUP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TARGET_TERM_LOOKUP", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PRICING_TERM_LOOKUP", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["PRICING_TERM_LOOKUP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RULE_LOOKUP", function() { return _contract__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"]; });

/* harmony import */ var _dataSet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataSet */ "./constants/dataSet.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_SET", function() { return _dataSet__WEBPACK_IMPORTED_MODULE_1__["DATA_SET"]; });

/* harmony import */ var _process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./process */ "./constants/process.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PROCESS", function() { return _process__WEBPACK_IMPORTED_MODULE_2__["PROCESS"]; });

/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project */ "./constants/project.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PROJECT", function() { return _project__WEBPACK_IMPORTED_MODULE_3__["PROJECT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PROJECT_LOOKUP", function() { return _project__WEBPACK_IMPORTED_MODULE_3__["PROJECT_LOOKUP"]; });

/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client */ "./constants/client.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AIR_APPLICATION_ID", function() { return _client__WEBPACK_IMPORTED_MODULE_4__["AIR_APPLICATION_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADVITO_CLIENT", function() { return _client__WEBPACK_IMPORTED_MODULE_4__["ADVITO_CLIENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADVITO_GEOSET_ID", function() { return _client__WEBPACK_IMPORTED_MODULE_4__["ADVITO_GEOSET_ID"]; });

/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./library */ "./constants/library.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LIBRARY_LOOKUP", function() { return _library__WEBPACK_IMPORTED_MODULE_5__["LIBRARY_LOOKUP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LOCATION_LOOKUP", function() { return _library__WEBPACK_IMPORTED_MODULE_5__["LOCATION_LOOKUP"]; });

/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./collection */ "./constants/collection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LOCATION_COLLECTION", function() { return _collection__WEBPACK_IMPORTED_MODULE_6__["LOCATION_COLLECTION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRAVEL_SECTOR_COLLECTION", function() { return _collection__WEBPACK_IMPORTED_MODULE_6__["TRAVEL_SECTOR_COLLECTION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AIRLINE_GROUP_COLLECTION", function() { return _collection__WEBPACK_IMPORTED_MODULE_6__["AIRLINE_GROUP_COLLECTION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PREFERRED_AIRLINE_COLLECTION", function() { return _collection__WEBPACK_IMPORTED_MODULE_6__["PREFERRED_AIRLINE_COLLECTION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PREFERRED_AIRLINE_LOOKUP", function() { return _collection__WEBPACK_IMPORTED_MODULE_6__["PREFERRED_AIRLINE_LOOKUP"]; });

/* harmony import */ var _email__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./email */ "./constants/email.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADVITO_AIR_APPLICATION", function() { return _email__WEBPACK_IMPORTED_MODULE_7__["ADVITO_AIR_APPLICATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EMAIL_SENDER", function() { return _email__WEBPACK_IMPORTED_MODULE_7__["EMAIL_SENDER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EMAIL_BCC", function() { return _email__WEBPACK_IMPORTED_MODULE_7__["EMAIL_BCC"]; });








 // export const APP_URL = 'http://localhost:8080/#';

const APP_URL = 'https://s3.amazonaws.com/alpha.boostlabs/air-dev/index.html?#'; // export const APP_URL = 'https://s3.amazonaws.com/beta.boostlabs/air/index.html#';
// export const APP_URL = 'https://s3.amazonaws.com/alpha.boostlabs/air/index.html#';

const REGEX_USER = /'/;

/***/ }),

/***/ "./constants/library.js":
/*!******************************!*\
  !*** ./constants/library.js ***!
  \******************************/
/*! exports provided: LIBRARY_LOOKUP, LOCATION_LOOKUP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIBRARY_LOOKUP", function() { return LIBRARY_LOOKUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCATION_LOOKUP", function() { return LOCATION_LOOKUP; });
const LIBRARY_LOOKUP = {
  DISTANCE_TYPE: 10
};
const LOCATION_LOOKUP = {
  AIRPORT: 0,
  CITY: 1,
  COUNTRY: 3,
  SUBREGION: 4,
  REGION: 5,
  COLLECTION: 6
};

/***/ }),

/***/ "./constants/process.js":
/*!******************************!*\
  !*** ./constants/process.js ***!
  \******************************/
/*! exports provided: PROCESS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROCESS", function() { return PROCESS; });
const PROCESS = `contracts
        dataSets
        records
        processing
        processStartDate
        recentProcessList {
          date
          contracts
          dataSets
          records
          processDuration
          status
          processedBy
        }`;

/***/ }),

/***/ "./constants/project.js":
/*!******************************!*\
  !*** ./constants/project.js ***!
  \******************************/
/*! exports provided: PROJECT, PROJECT_LOOKUP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROJECT", function() { return PROJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROJECT_LOOKUP", function() { return PROJECT_LOOKUP; });
const PROJECT = `id
        clientId
        clientName
        name
        description
        isDeleted
        projectTypeId
        projectTypeName
        savingsTypeId
        savingsTypeName
        effectiveFrom
        effectiveTo
        reportFrom
        reportTo
        projectManagerId
        projectManagerName
        projectManagerEmail
        leadAnalystId
        leadAnalystName
        leadAnalystEmail
        dataSpecialistId
        dataSpecialistName
        dataSpecialistEmail
        currencyId
        currencyName
        distanceUnitId
        distanceUnitName
        progress
        favorite`;
const PROJECT_LOOKUP = {
  PROJECT_TYPE: 1,
  SAVINGS_TYPE: 9
};

/***/ }),

/***/ "./data/index.js":
/*!***********************!*\
  !*** ./data/index.js ***!
  \***********************/
/*! exports provided: processData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./process */ "./data/process.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "processData", function() { return _process__WEBPACK_IMPORTED_MODULE_0__["processData"]; });



/***/ }),

/***/ "./data/process.js":
/*!*************************!*\
  !*** ./data/process.js ***!
  \*************************/
/*! exports provided: processData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processData", function() { return processData; });
const processData = {
  contracts: 3,
  dataSets: 4,
  records: 1102000,
  processing: false,
  processingStartDate: null,
  recentProcessList: [{
    date: new Date('03/25/2019 3:56 PM'),
    contracts: 3,
    dataSets: 3,
    records: 921367,
    processDuration: 74,
    status: 1,
    processedBy: 'Anders Madsen'
  }, {
    date: new Date('03/03/2019 12:31 PM'),
    contracts: 2,
    dataSets: 2,
    records: 889123,
    processDuration: 59,
    status: 1,
    processedBy: 'Kevin Ingalls'
  }, {
    date: new Date('03/01/2019 10:00 PM'),
    contracts: 2,
    dataSets: 2,
    records: 568221,
    processDuration: 45,
    status: 1,
    processedBy: 'Johnathan Longnamegoeshere'
  }, {
    date: new Date('02/10/2019 7:03 PM'),
    contracts: 2,
    dataSets: 1,
    records: 451325,
    processDuration: 42,
    status: 1,
    processedBy: 'Olivier Benoit'
  }]
};

/***/ }),

/***/ "./directives.js":
/*!***********************!*\
  !*** ./directives.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RequireAuthDirective; });
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);

const AIR_ADMIN = 10;
const AIR_USER = 11;
class RequireAuthDirective extends apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["SchemaDirectiveVisitor"] {
  visitFieldDefinition(field) {
    const {
      resolve = this.defaultFieldResolver
    } = field;

    field.resolve = async (...args) => {
      const [,, context] = args;

      if (context.user) {
        const roleIds = context.user.role;
        if (!roleIds.includes(AIR_ADMIN) && !roleIds.includes(AIR_USER)) throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["ApolloError"]('User did not have AIR role', 401);
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["ApolloError"]('You must be signed in to view this resource.', 401);
      }
    };
  }

}

/***/ }),

/***/ "./handler.js":
/*!********************!*\
  !*** ./handler.js ***!
  \********************/
/*! exports provided: graphqlHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphqlHandler", function() { return graphqlHandler; });
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _typeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typeDefs */ "./typeDefs/index.js");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolvers */ "./resolvers/index.js");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives */ "./directives.js");
/* harmony import */ var _playground__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./playground */ "./playground/index.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helper */ "./helper.js");
/* harmony import */ var knex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! knex */ "knex");
/* harmony import */ var knex__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(knex__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var objection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! objection */ "objection");
/* harmony import */ var objection__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(objection__WEBPACK_IMPORTED_MODULE_7__);









__webpack_require__(/*! dotenv */ "dotenv").config();

const db = knex__WEBPACK_IMPORTED_MODULE_6___default()({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.AIR_DB_DATABASE
  },
  ...Object(objection__WEBPACK_IMPORTED_MODULE_7__["knexSnakeCaseMappers"])()
});
objection__WEBPACK_IMPORTED_MODULE_7__["Model"].knex(db);

const advitoDb = __webpack_require__(/*! knex */ "knex")({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.ADVITO_DB_DATABASE
  }
});

const server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"]({
  typeDefs: _typeDefs__WEBPACK_IMPORTED_MODULE_1__["typeDefs"],
  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_2__["resolvers"],
  context: async ({
    event
  }) => {
    const sessionToken = event.headers.sessiontoken || '';
    const user = await Object(_helper__WEBPACK_IMPORTED_MODULE_5__["authenticateUser"])(sessionToken, advitoDb);
    return {
      user,
      db
    };
  },
  schemaDirectives: {
    auth: _directives__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  playground: _playground__WEBPACK_IMPORTED_MODULE_4__["playground"]
});
const graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
});

/***/ }),

/***/ "./helper.js":
/*!*******************!*\
  !*** ./helper.js ***!
  \*******************/
/*! exports provided: authenticateUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authenticateUser", function() { return authenticateUser; });
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);

const authenticateUser = async (sessionToken, advitoDb) => {
  const session = await advitoDb('advito_user_session as s').select({
    id: 's.id',
    advitoUserId: 's.advito_user_id',
    sessionToken: 's.session_token',
    sessionStart: 's.session_start',
    sessionEnd: 's.session_end',
    sessionDurationSec: 's.session_duration_sec',
    sessionType: 's.session_type',
    sessionExpiration: 's.session_expiration',
    sessionNote: 's.session_note',
    created: 's.created',
    modified: 's.modified',
    nameFirst: 'u.name_first',
    nameLast: 'u.name_last',
    email: 'u.email'
  }).innerJoin('advito_user as u', 'u.id', 's.advito_user_id').where('s.session_token', sessionToken).andWhere('s.session_end', null).first();
  if (!session) throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["ApolloError"]('Session is invalid.', 401);
  const {
    advitoUserId,
    sessionExpiration,
    sessionDurationSec,
    nameFirst,
    nameLast,
    email
  } = session;
  const sessionExp = new Date(sessionExpiration);

  if (sessionExp <= new Date()) {
    throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["ApolloError"]('Session is invalid.', 401);
  }

  const roleRows = await advitoDb('advito_user_role_link').select('advito_role_id').where('advito_user_id', advitoUserId);
  const roleIds = roleRows ? roleRows.map(row => parseInt(row.advito_role_id)) : [];
  const now = new Date();
  const newExpiration = new Date(now.getTime() + sessionDurationSec * 1000);
  const timeDifference = Math.floor((newExpiration - sessionExp) / 1000 / 60);

  if (timeDifference > 50) {
    await advitoDb('advito_user_session').where('advito_user_id', advitoUserId).update('session_expiration', newExpiration);
  } // Returns user information


  return {
    id: advitoUserId,
    name: `${nameFirst} ${nameLast}`,
    email: email,
    role: roleIds
  };
};

/***/ }),

/***/ "./models/index.js":
/*!*************************!*\
  !*** ./models/index.js ***!
  \*************************/
/*! exports provided: AdvitoUser, AdvitoUserRoleLink, AdvitoUserSession, AccessToken, EmailTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ "./models/user.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdvitoUser", function() { return _user__WEBPACK_IMPORTED_MODULE_0__["AdvitoUser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdvitoUserRoleLink", function() { return _user__WEBPACK_IMPORTED_MODULE_0__["AdvitoUserRoleLink"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdvitoUserSession", function() { return _user__WEBPACK_IMPORTED_MODULE_0__["AdvitoUserSession"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccessToken", function() { return _user__WEBPACK_IMPORTED_MODULE_0__["AccessToken"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmailTemplate", function() { return _user__WEBPACK_IMPORTED_MODULE_0__["EmailTemplate"]; });



/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! exports provided: AdvitoUser, AdvitoUserRoleLink, AdvitoUserSession, AccessToken, EmailTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvitoUser", function() { return AdvitoUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvitoUserRoleLink", function() { return AdvitoUserRoleLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvitoUserSession", function() { return AdvitoUserSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccessToken", function() { return AccessToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailTemplate", function() { return EmailTemplate; });
/* harmony import */ var objection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! objection */ "objection");
/* harmony import */ var objection__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(objection__WEBPACK_IMPORTED_MODULE_0__);

class AdvitoUser extends objection__WEBPACK_IMPORTED_MODULE_0__["Model"] {
  static get tableName() {
    return 'blops.advitoUser';
  }

  fullName() {
    return this.nameFirst + ' ' + this.nameLast;
  }

  static get relationMappings() {
    return {
      advitoUserRoleLink: {
        relation: objection__WEBPACK_IMPORTED_MODULE_0__["Model"].HasManyRelation,
        modelClass: AdvitoUserRoleLink,
        join: {
          from: 'advitoUser.id',
          to: 'advitoUserRoleLink.advitoUserId'
        }
      },
      advitoUserSession: {
        relation: objection__WEBPACK_IMPORTED_MODULE_0__["Model"].HasManyRelation,
        modelClass: AdvitoUserSession,
        join: {
          from: 'advitoUser.id',
          to: 'advitoUserSession.advitoUserId'
        }
      },
      accessToken: {
        relation: objection__WEBPACK_IMPORTED_MODULE_0__["Model"].HasManyRelation,
        modelClass: AccessToken,
        join: {
          from: 'advitoUser.id',
          to: 'accessToken.advitoUserId'
        }
      }
    };
  }

}
class AdvitoUserRoleLink extends objection__WEBPACK_IMPORTED_MODULE_0__["Model"] {
  static get tableName() {
    return 'advitoUserRoleLink';
  }

}
class AdvitoUserSession extends objection__WEBPACK_IMPORTED_MODULE_0__["Model"] {
  static get tableName() {
    return 'advitoUserSession';
  }

}
class AccessToken extends objection__WEBPACK_IMPORTED_MODULE_0__["Model"] {
  static get tableName() {
    return 'accessToken';
  }

}
class EmailTemplate extends objection__WEBPACK_IMPORTED_MODULE_0__["Model"] {
  static get tableName() {
    return 'emailTemplate';
  }

}

/***/ }),

/***/ "./playground/client.js":
/*!******************************!*\
  !*** ./playground/client.js ***!
  \******************************/
/*! exports provided: client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "client", function() { return client; });
const client = {
  name: 'Client Queries',
  endpoint: 'http://localhost:8085/graphql',
  headers: {
    sessiontoken: 'MY^PR3TTYP0NY'
  },
  query: `
  {
    clientList {
      id
      name
    }
  }`
};

/***/ }),

/***/ "./playground/collection/airlineGroupCollection.js":
/*!*********************************************************!*\
  !*** ./playground/collection/airlineGroupCollection.js ***!
  \*********************************************************/
/*! exports provided: airlineGroupCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "airlineGroupCollection", function() { return airlineGroupCollection; });
const airlineGroupCollection = {
  name: 'Airline Group Collection Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: {
    sessiontoken: 'MY^PR3TTYP0NY'
  },
  query: `
    mutation {
      editAirlineGroupCollection(id: 2, name: "Updated Collection", description: "new description") {
        id
        name
        description
        dateUpdated
      }
      deleteAirlineGroupCollection(id: 2)
      addAirlineGroup(id: 2, name: "USA", effectiveStartDate: "01 Jan 2018", effectiveEndDate: "01 Jan 2018", airlineList: [
        {
          id: 1,
          effectiveStartDate: "01 Jan 2018",
          effectiveEndDate: "01 Jan 2018"
        }
      ]) {
        id
        name
        effectiveStartDate
        effectiveEndDate
        airlineGroupList {
          id
          name
          effectiveStartDate
          effectiveEndDate
          airlineList {
            name
            effectiveStartDate
            effectiveEndDate
          }
        }
      }
      editAirlineGroup(id: 2, collectionId: 2, name: "USA", effectiveStartDate: "01 Jan 2018", effectiveEndDate: "01 Jan 2018", airlineList: [
        {
          id: 1,
          effectiveStartDate: "01 Jan 2018",
          effectiveEndDate: "01 Jan 2018"
        }
      ]) {
        id
        name
        airlineGroupList {
          id
          name
          effectiveStartDate
          effectiveEndDate
          airlineList {
            name
            effectiveStartDate
            effectiveEndDate
          }
        }
      }
      deleteAirlineGroup(id: 1, collectionId: 1) {
        id
        name
        airlineGroupList {
          id
          name
          effectiveStartDate
          effectiveEndDate
          airlineList {
            name
            effectiveStartDate
            effectiveEndDate
          }
        }
      }
    }
    `
};

/***/ }),

/***/ "./playground/collection/index.js":
/*!****************************************!*\
  !*** ./playground/collection/index.js ***!
  \****************************************/
/*! exports provided: collection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collection", function() { return collection; });
/* harmony import */ var _locationCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locationCollection */ "./playground/collection/locationCollection.js");
/* harmony import */ var _travelSectorCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./travelSectorCollection */ "./playground/collection/travelSectorCollection.js");
/* harmony import */ var _airlineGroupCollection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./airlineGroupCollection */ "./playground/collection/airlineGroupCollection.js");
/* harmony import */ var _preferredAirlineCollection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preferredAirlineCollection */ "./playground/collection/preferredAirlineCollection.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");





const collection = {
  queries: {
    name: 'Collection Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      locationCollectionList(clientId: 5, projectId: 17) {
        ${_constants__WEBPACK_IMPORTED_MODULE_4__["LOCATION_COLLECTION"]}
      }
      regionList(geoSetId: null) {
        id
        code
        name
        standard
      }
      travelSectorCollectionList(clientId: null, projectId: null) {
        ${_constants__WEBPACK_IMPORTED_MODULE_4__["TRAVEL_SECTOR_COLLECTION"]}
      }
      travelSectorList(groupId: null) {
        id
        name
        shortName
        standard
        sectorGeographyList {
          id
          originId
          originName
          destinationId
          destinationName
          exclude
        }
      }
      airlineGroupCollectionList(clientId: null, projectId: null) {
        ${_constants__WEBPACK_IMPORTED_MODULE_4__["AIRLINE_GROUP_COLLECTION"]}
      }
      airlineGroupList(collectionId: null) {
        id
        name
        effectiveStartDate
        effectiveEndDate
        standard
        airlineGroupMemberList {
          id
          airlineId
          name
          code
          effectiveStartDate
          effectiveEndDate
        }
      }
      preferredAirlineCollectionList(clientId: null, projectId: null) {
        ${_constants__WEBPACK_IMPORTED_MODULE_4__["PREFERRED_AIRLINE_COLLECTION"]}
      }
      preferredAirlineList(groupId: null) {
        id
        airlineId
        name
        preferenceLevelId
        preferenceLevelName
        effectiveStartDate
        effectiveEndDate
        active
        posList {
          id
          locationId
          name
          code
        }
      }
      preferenceLevelList {
        id
        name
      }
    }`
  },
  mutations: [_locationCollection__WEBPACK_IMPORTED_MODULE_0__["locationCollection"], _travelSectorCollection__WEBPACK_IMPORTED_MODULE_1__["travelSectorCollection"], _airlineGroupCollection__WEBPACK_IMPORTED_MODULE_2__["airlineGroupCollection"], _preferredAirlineCollection__WEBPACK_IMPORTED_MODULE_3__["preferredAirlineCollection"]]
};

/***/ }),

/***/ "./playground/collection/locationCollection.js":
/*!*****************************************************!*\
  !*** ./playground/collection/locationCollection.js ***!
  \*****************************************************/
/*! exports provided: locationCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locationCollection", function() { return locationCollection; });
const locationCollection = {
  name: 'Location Collection Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: {
    sessiontoken: 'MY^PR3TTYP0NY'
  },
  query: `
    mutation {
      copyLocationCollection(clientId: 43, projectId: 17, id: 1, name: "Collection 1", description: "Collection 1 description")
      editLocationCollection(id: 2, name: "Updated Collection", description: "new description") {
        id
        name
        description
        dateUpdated
      }
      deleteLocationCollection(id: 2)
      addRegion(geoSetId: 124271, name: "Region", code: "RE")
      deleteRegion(id: 1)
      moveCountries(collectionId: 1, id: 1, countryList: [
        {
          id: 1
          regionId: 2
          name: "French Southern Territories"
        }
      ]) {
        id
        regionList {
          id
          name
          countryList {
            id
            regionId
            name
          }
        }
      }
    }
    `
};

/***/ }),

/***/ "./playground/collection/preferredAirlineCollection.js":
/*!*************************************************************!*\
  !*** ./playground/collection/preferredAirlineCollection.js ***!
  \*************************************************************/
/*! exports provided: preferredAirlineCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preferredAirlineCollection", function() { return preferredAirlineCollection; });
const preferredAirlineCollection = {
  name: 'Preferred Airline Collection Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: {
    sessiontoken: 'MY^PR3TTYP0NY'
  },
  query: `
    mutation {
      editPreferredAirlineCollection(id: 1, name: "Updated Collection", description: "new description") {
        id
        name
        description
        dateUpdated
      }
      deletePreferredAirlineCollection(id: 1)
      addPreferredAirline(id: 1, airlineList: [
        {
          id: 104557,
          posIdList: [1, 2, 3, 4],
          preferenceLevelId: 1
        }
      ]) {
        id
        name
        description
        dateUpdated
        active
        airlineList {
          id
          name
          preferenceLevel
          effectiveStartDate
          effectiveEndDate
          pos
          active
        }
      }
      editPreferredAirline(id: 1, airlineList: [
        {
          id: 104557,
          posIdList: [2, 3],
          preferenceLevelId: 1
        }
      ]) {
        id
        name
        description
        dateUpdated
        active
        airlineList {
          id
          name
          preferenceLevel
          effectiveStartDate
          effectiveEndDate
          pos
          active
        }
      }
      deletePreferredAirline(id: 1, collectionId: 1) {
        id
        name
        description
        dateUpdated
        active
        airlineList {
          id
          name
          preferenceLevel
          effectiveStartDate
          effectiveEndDate
          pos
          active
        }
      }
    }
    `
};

/***/ }),

/***/ "./playground/collection/travelSectorCollection.js":
/*!*********************************************************!*\
  !*** ./playground/collection/travelSectorCollection.js ***!
  \*********************************************************/
/*! exports provided: travelSectorCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "travelSectorCollection", function() { return travelSectorCollection; });
const travelSectorCollection = {
  name: 'Travel Sector Collection Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: {
    sessiontoken: 'MY^PR3TTYP0NY'
  },
  query: `
    mutation {
      createTravelSectorCollection(id: 1, name: "Collection 1", description: "description") {
        id
        name
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
        description
        dateUpdated
        active
      }
      editTravelSectorCollection(id: 2, name: "Updated Collection", description: "new description") {
        id
        name
        description
        dateUpdated
      }
      deleteLocationCollection(id: 2)
      addTravelSector(id: 1, name: "USMA", shortName: "US (USA)", geographyList: [
        {
          origin: 1,
          destination: 2,
          exclude: false
        }
      ]) {
        id
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
      }
      editTravelSector(id: 1, collectionId: 1, name: "USMA", shortName: "US (USA)", geographyList: [
        {
          origin: 1,
          destination: 2,
          exclude: false
        }
      ]) {
        id
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
      }
      deleteTravelSector(id: 1, collectionId: 1) {
        id
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
      }
      deleteBidirection(id: 1, collectionId: 1, index: 1) {
        id
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
      }
    }
    `
};

/***/ }),

/***/ "./playground/contract/discount.js":
/*!*****************************************!*\
  !*** ./playground/contract/discount.js ***!
  \*****************************************/
/*! exports provided: discount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "discount", function() { return discount; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const discount = {
  queries: {
    name: 'Discount Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      discountList(pricingTermId: 49) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT"]}
      }
      discount(id: 39) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT"]}
      }
      discountTypeList {
        id
        name
      }
      journeyTypeList {
        id
        name
      }
      directionTypeList {
        id
        name
      }
    }`
  },
  mutations: {
    name: 'Discount Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    mutation {
      createDiscount(pricingTermId: 49, name: "new discount", discountTypeId: 10, discountValue: 10.2, journeyTypeId: 13, directionTypeId: 16) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT"]}
      }

      copyDiscount(id: 1  name: "new discount", discountTypeId: 10, discountValue: 10.2, journeyTypeId: 13, directionTypeId: 16) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT"]}
      }

      editDiscount(id: 1  name: "edit discount", discountTypeId: 10, discountValue: 10.2, journeyTypeId: 13, directionTypeId: 16) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT"]}
      }
      deleteDiscounts(pricingTermId: 49, idList: [1, 2, 3])

      updateDiscountAppliedOrder(
        updateDiscountList: [
          {
            id: 1,
            appliedOrder: 5
          },
          {
            id: 2,
            appliedOrder: 6
          }
        ]
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT"]}
      }
    }
    `
  }
};

/***/ }),

/***/ "./playground/contract/index.js":
/*!**************************************!*\
  !*** ./playground/contract/index.js ***!
  \**************************************/
/*! exports provided: contract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contract", function() { return contract; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const contract = {
  queries: {
    name: 'Contract Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      contractList {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["CONTRACT"]}
      }
      contract(id: 134) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["CONTRACT"]}
      }
      contractTypeList {
        id
        name
      }
      divisionTypeList {
        id
        name
      }
      userList {
        id
        name
        email
      }
    }`
  },
  mutations: {
    name: 'Contract Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    mutation {
      createContract(name: "test", typeId: 2, round: 5, effectiveFrom: 2534032400000, effectiveTo: null, description: "description", divisionId: 2) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["CONTRACT"]}
      }
      copyContract(id: 1, name: "copy contract") {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["CONTRACT"]}
      }
      editContract(id: 1, name: "Test 1 - edit", typeId: 2, round: 5, effectiveFrom: 2534032400000, effectiveTo: null, description: "description", divisionId: 2) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["CONTRACT"]}
      }
    }
    `
  }
};

/***/ }),

/***/ "./playground/contract/normalization.js":
/*!**********************************************!*\
  !*** ./playground/contract/normalization.js ***!
  \**********************************************/
/*! exports provided: normalization */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalization", function() { return normalization; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const normalization = {
  queries: {
    name: 'Normalization Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      normalizationList(discountId: null) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NORMALIZATION"]}
      }
      normalization(id: null) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NORMALIZATION"]}
      }
      normalizationMarketList(normalizationId: null) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NORMALIZATION_MARKET"]}
      }
      topMarketList(normalizationId: null) {
        id
        value
        marketA
        marketB
        farePaid
        usage
        advancedTicketList {
          label
          value
        }
        departureList {
          label
          value
        }
        fareBasisList {
          fareBasis
          bookingClass
          usage
        }
      }
    }`
  },
  mutations: {
    name: 'Normalization Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    mutation {
      createNormalization(
        discountId: null
        usageFrom: 1483246800001
        usageTo: 1485838800001
        effectiveFrom: 1483246800001
        effectiveTo: 1485838800001
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NORMALIZATION"]}
      }
      copyNormalization(
        id: null
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NORMALIZATION"]}
      }
      updateNormalization(
        id: null
        usageFrom: 1483246800001
        usageTo: 1485838800001
        effectiveFrom: 1483246800001
        effectiveTo: 1485838800001
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NORMALIZATION"]}
      }
      deleteNormalization(id: 12)
      createNormalizationMarket(
        normalizationId: null
        marketA: null
        marketB: null
        farePaid: null
        usageOverride: null
        farePullDate: 1485838800001
        notes: null
        fareList: [
         {
          fareType: null
          fareBasis: null
          amount: null
          currencyCode: null
          directionType: null
          advancePurchase: null
          minstay: null
         }
        ]
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NORMALIZATION_MARKET"]}
      }
      updateNormalizationMarket(
        marketId: null
        marketA: null
        marketB: null
        farePaid: null
        usageOverride: null
        farePullDate: 1485838800001
        notes: null
        fareList: [
         {
          id: null
          fareType: null
          fareBasis: null
          amount: null
          currencyCode: null
          directionType: null
          advancePurchase: null
          minstay: null
         }
        ]
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NORMALIZATION_MARKET"]}
      }
      deleteNormalizationMarket(
        id: null
      )
    }
    `
  }
};

/***/ }),

/***/ "./playground/contract/note.js":
/*!*************************************!*\
  !*** ./playground/contract/note.js ***!
  \*************************************/
/*! exports provided: note */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "note", function() { return note; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const note = {
  queries: {
    name: 'Note Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      noteList(parentId: 49, parentTable: "pricingterm") {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NOTE"]}
      }
    }`
  },
  mutations: {
    name: 'Note Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    mutation {
      saveNote(
        parentId: 52,
        parentTable: "pricingterm",
        important: true,
        text: "",
        assignedToId: 882,
        noteId: ""
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NOTE"]}
      }
      deleteNote(id: 1, noteId: 1) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["NOTE"]}
      }
    }
    `
  }
};

/***/ }),

/***/ "./playground/contract/pricingTerm.js":
/*!********************************************!*\
  !*** ./playground/contract/pricingTerm.js ***!
  \********************************************/
/*! exports provided: pricingTerm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pricingTerm", function() { return pricingTerm; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const pricingTerm = {
  queries: {
    name: 'Pricing Term Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      pricingTermList(contractId: 134) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PRICING_TERM"]}
      }
      pricingTerm(id: 49) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PRICING_TERM"]}
      }
    }`
  },
  mutations: {
    name: 'Pricing Term Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    mutation {
      createPricingTerm(contractId: 134, name: "term 1", ignore: false) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PRICING_TERM"]}
      }

      copyPricingTerm(id: 1, name: "copy term", ignore: false) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PRICING_TERM"]}
      }

      editPricingTerm(id: 49, name: "Pricing Term 1 - edit", ignore: true) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PRICING_TERM"]}
      }

      togglePricingTermQC(idList: [49]) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PRICING_TERM"]}
      }

      deletePricingTerms(idList: [72, 73, 74]

      updateAppliedOrder(
        updatePricingTermList: [
          {
            id: 1,
            appliedOrder: 5
          },
          {
            id: 2,
            appliedOrder: 6
          }
        ]
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PRICING_TERM"]}
      }
    }
    `
  }
};

/***/ }),

/***/ "./playground/contract/rule.js":
/*!*************************************!*\
  !*** ./playground/contract/rule.js ***!
  \*************************************/
/*! exports provided: rule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rule", function() { return rule; });
const rule = {
  queries: {
    name: 'Rule Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      ruleList(parentId: 34)
      #bookingClassCodeList {
      #  fareCategoryId
      #  code
      #}
      #airlineCodeList {
      #  name
      #  code
      #}
      #dayOfWeekUnitList {
      #  id
      #  name
      #}
      #dayUnitList {
      #  id
      #  name
      #}
      #fareCategoryUnitList {
      #  id
      #  cabinId
      #  code
      #  name
      #  shortName
      #}
      #fareBasisUnitList {
      #  id
      #  name
      #}
      ticketingDateList(parentId: 34) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      }
      travelDateList(parentId: 34) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      }
      pointOfSaleList(parentId: 34) {
        id
        ruleContainerId
        countryCode
        isDeleted
      }
      pointOfOriginList(parentId: 34) {
        id
        ruleContainerId
        countryCode
        isDeleted
      }
      marketRuleList(parentId: 34) {
        id
        ruleContainerId
        origin
        originType
        arrival
        arrivalType
        exclude
        isDeleted
      }
      bookingClassRuleList(parentId: 34) {
        id
        ruleContainerId
        exclude
        bookingClassType
        bookingClass
        isDeleted
      }
      airlineList(parentId: 34) {
        id
        ruleContainerId
        exclude
        ruleType
        carrierCode
        isDeleted
      }
      ticketDesignatorList(parentId: 34) {
        id
        ruleContainerId
        ticketDesignator
        isDeleted
      }
      tourCodeList(parentId: 34) {
        id
        ruleContainerId
        tourCode
        isDeleted
      }
      stopsList(parentId: 34) {
        id
        ruleContainerId
        minStops
        maxStops
        isDeleted
      }
      advancedTicketingList(parentId: 34) {
        id
        ruleContainerId
        unit
        startRange
        endRange
        isDeleted
      }
      minStayList(parentId: 34) {
        id
        ruleContainerId
        unit
        value
        dayOfWeekInclusion
        isDeleted
      }
      maxStayList(parentId: 34) {
        id
        ruleContainerId
        unit
        value
        isDeleted
      }
      dayOfWeekList(parentId: 34) {
        id
        ruleContainerId
        exclude
        startDay
        startTime
        endDay
        endTime
        isDeleted
      }
      flightNumberList(parentId: 34) {
        id
        ruleContainerId
        exclude
        segmentType
        carrierCode
        startRange
        endRange
        isDeleted
      }
      connectionPointList(parentId: 34) {
        id
        ruleContainerId
        exclude
        connection
        connectionGeoType
        isDeleted
      }
      distanceList(parentId: 34) {
        id
        ruleContainerId
        distanceUnit
        minDistance
        maxDistance
        isDeleted
      }
      cabinList(parentId: 34) {
        id
        ruleContainerId
        exclude
        cabin
        isDeleted
      }
      fareCategoryList(parentId: 34) {
        id
        ruleContainerId
        exclude
        fareCategory
        isDeleted
      }
      blackoutList(parentId: 34) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      },
      fareBasisList(parentId: 34) {
        id
        ruleContainerId
        name
        type
        basisType
        matchExclude
        matchValue
        endsWithExclude
        endsWithValue
        startsWithExclude
        startsWithValue
        containsExclude
        containsValue
        containsPosition
        containsMultipleExclude
        containsMultipleValue
        containsMultiplePosition
        isDeleted
      }
    }`
  },
  mutations: {
    name: 'Rule Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    mutation {
      deleteRule(id: 46, ruleType: 4)
      updateTicketingDate(parentId: 34, ticketingDateList: [
        {
          id: 32,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          startDate: 1483246800001,
          endDate: 1485838800001,
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      }
      updateTicketingDateBulk(parentType: 2, ticketingDateList: [
        {
          id: 95,
          startDate: 1483246800001,
          endDate: 1485838800001
        },
        {
          id: 98,
          startDate: 1483246800001,
          endDate: 1485838800001
        }
      ])
      updateTravelDate(parentId: 34, travelDateList: [
        {
          id: 10,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          startDate: 1483246800001,
          endDate: 1485838800001,
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      }
      updateTravelDateBulk(parentType: 3, travelDateList: [
        {
          id: 217,
          startDate: 1483246800001,
          endDate: 1485838800001
        }
      ])
      updatePointOfSale(parentId: 34, pointOfSaleList: [
        {
          id: 179,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          countryCode: "UK"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        countryCode
        isDeleted
      }
      updatePointOfOrigin(parentId: 34, pointOfOriginList: [
        {
          id: null,
          ruleContainerId: null,
          countryCode: "UK"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        countryCode
        isDeleted
      }
      updateMarketRule(parentId: 34, marketRuleList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          origin: "EU"
          originType: 5
          arrival: "LA"
          arrivalType: 5,
          exclude: true,
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        origin
        originType
        arrival
        arrivalType
        exclude
        isDeleted
      }
      updateBookingClass(parentId: 34, bookingClassList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          exclude: true
          bookingClassType: 2
          bookingClass: "Z"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        bookingClassType
        bookingClass
        isDeleted
      }
      updateAirlineRule(parentId: 34, airlineRuleList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          exclude: true
          ruleType: 1
          carrierCode: "AQ"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        ruleType
        carrierCode
        isDeleted
      }
      updateTicketDesignator(parentId: 34, ticketDesignatorList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          ticketDesignator: "test"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        ticketDesignator
        isDeleted
      }
      updateTicketDesignatorBulk(parentType: 3, ticketDesignatorList: [
        {
          id: 217,
          ticketDesignator: "tour"
        }
      ])
      updateTourCode(parentId: 34, tourCodeList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          tourCode: "test"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        tourCode
        isDeleted
      }
      updateTourCodeBulk(parentType: 3, tourCodeList: [
        {
          id: 217,
          tourCode: "tour"
        }
      ])
      updateStops(parentId: 34, stopsList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          minStops: 10,
          maxStops: 15
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        minStops
        maxStops
        isDeleted
      }
      updateAdvancedTicketing(parentId: 34, advancedTicketingList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          unit: 2
          startRange: 1
          endRange: 2
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        unit
        startRange
        endRange
        isDeleted
      }
      updateMinStay(parentId: 34, minStayList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          unit: 70
          value: 10
          dayOfWeekInclusion: 3
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        unit
        value
        dayOfWeekInclusion
        isDeleted
      }
      updateMaxStay(parentId: 34, maxStayList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          unit: 70
          value: 10
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        unit
        value
        isDeleted
      }
      updateDayOfWeek(parentId: 34, dayOfWeekList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          exclude: true
          startDay: 78
          startTime: "12:00 AM"
          endDay: 80
          endTime: "1:00 PM"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        startDay
        startTime
        endDay
        endTime
        isDeleted
      }
      updateConnectionPoint(parentId: 34, connectionPointList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          exclude: true
          connection: "SIN"
          connectionGeoType: 1
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        connection
        connectionGeoType
        isDeleted
      }
      updateFlightNumber(parentId: 34, flightNumberList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          exclude: true
          segmentType: 2
          carrierCode: "SW"
          startRange: 10
          endRange: 15
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        segmentType
        carrierCode
        startRange
        endRange
        isDeleted
      }
      updateDistance(parentId: 34, distanceList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          distanceUnit: 67
          minDistance: 10
          maxDistance: 15
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        distanceUnit
        minDistance
        maxDistance
        isDeleted
      }
      updateCabin(parentId: 34, cabinList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          exclude: true
          cabin: "CAB"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        cabin
        isDeleted
      }
      updateFareCategory(parentId: 34, fareCategoryList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          exclude: true
          fareCategory: 1
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        fareCategory
        isDeleted
      }
      updateBlackout(parentId: 34, blackoutList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          startDate: 1483246800001
          endDate: 1483246800001
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      }
      updateFareBasis(parentId: 34, fareBasisType: 1, fareBasisList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          name: "fare 1"
          type: 1
          basisType: 83
          matchExclude: false
          matchValue: "matches"
          endsWithExclude: null
          endsWithValue: null
          startsWithExclude: null
          startsWithValue: null
          containsExclude: null
          containsValue: null
          containsPosition: null
          containsMultipleExclude: null
          containsMultipleValue: null
          containsMultiplePosition: null
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        name
        type
        basisType
        matchExclude
        matchValue
        endsWithExclude
        endsWithValue
        startsWithExclude
        startsWithValue
        containsExclude
        containsValue
        containsPosition
        containsMultipleExclude
        containsMultipleValue
        containsMultiplePosition
        isDeleted
      }
    }`
  }
};

/***/ }),

/***/ "./playground/contract/targetTerm.js":
/*!*******************************************!*\
  !*** ./playground/contract/targetTerm.js ***!
  \*******************************************/
/*! exports provided: targetTerm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetTerm", function() { return targetTerm; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const targetTerm = {
  queries: {
    name: 'Target Term Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      targetTermList {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM"]}
      }
      targetLevelList(targetTermId: 33) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_LEVEL"]}
      }
      targetTypeList {
        id
        name
      }
      incentiveTypeList {
        id
        name
      }
    }`
  },
  mutations: {
    name: 'Target Term Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    mutation {
      createTargetTerm(
        name: "test",
        targetTypeId: 1,
        cabinF: true,
        cabinC: false,
        cabinP: true,
        cabinY: false,
        incentiveTypeId: 2,
        qsi: 0.7,
        softTarget: true,
        internalTarget: true,
        timeframe: 20
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM"]}
      }

      deleteTargetTerms(idList: [34, 35, 36])

      createTargetLevel(
        targetTermId: 1
        targetAmount: 50
        scoringTarget: true
        incentiveDescription: "Test"
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_LEVEL"]}
      }

      toggleTargetLevel(id: 3, targetTermId: 33) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_LEVEL"]}
      }
    }
    `
  }
};

/***/ }),

/***/ "./playground/dataSet.js":
/*!*******************************!*\
  !*** ./playground/dataSet.js ***!
  \*******************************/
/*! exports provided: dataSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataSet", function() { return dataSet; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./constants/index.js");

const dataSet = {
  queries: {
    name: 'Data Set Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      dataSetCountryList {
        id
        name
        ticketsTotal
        segmentsTotal
        farePaidTotal
        importedTicketsTotal
        errorTicketsTotal
        errorRatioTotal
      }
      dataSetDivisionList {
        id
        name
        ticketsTotal
        segmentsTotal
        farePaidTotal
      }
      dataSetColumnList {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["DATA_SET"]}
      }
    }`
  },
  mutations: {
    name: 'Data Set Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    mutation {
      toggleDataSet(id: 1) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["DATA_SET"]}
      }
      deleteDataSet(id: 1)
    }
    `
  }
};

/***/ }),

/***/ "./playground/index.js":
/*!*****************************!*\
  !*** ./playground/index.js ***!
  \*****************************/
/*! exports provided: client, collection, project, dataSet, library, contract, pricingTerm, targetTerm, discount, normalization, note, rule, user, process */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./playground/client.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "client", function() { return _client__WEBPACK_IMPORTED_MODULE_0__["client"]; });

/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collection */ "./playground/collection/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "collection", function() { return _collection__WEBPACK_IMPORTED_MODULE_1__["collection"]; });

/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project */ "./playground/project.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "project", function() { return _project__WEBPACK_IMPORTED_MODULE_2__["project"]; });

/* harmony import */ var _dataSet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataSet */ "./playground/dataSet.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dataSet", function() { return _dataSet__WEBPACK_IMPORTED_MODULE_3__["dataSet"]; });

/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./library */ "./playground/library.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "library", function() { return _library__WEBPACK_IMPORTED_MODULE_4__["library"]; });

/* harmony import */ var _contract__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contract */ "./playground/contract/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contract", function() { return _contract__WEBPACK_IMPORTED_MODULE_5__["contract"]; });

/* harmony import */ var _contract_pricingTerm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./contract/pricingTerm */ "./playground/contract/pricingTerm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pricingTerm", function() { return _contract_pricingTerm__WEBPACK_IMPORTED_MODULE_6__["pricingTerm"]; });

/* harmony import */ var _contract_targetTerm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contract/targetTerm */ "./playground/contract/targetTerm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "targetTerm", function() { return _contract_targetTerm__WEBPACK_IMPORTED_MODULE_7__["targetTerm"]; });

/* harmony import */ var _contract_discount__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contract/discount */ "./playground/contract/discount.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "discount", function() { return _contract_discount__WEBPACK_IMPORTED_MODULE_8__["discount"]; });

/* harmony import */ var _contract_normalization__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./contract/normalization */ "./playground/contract/normalization.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "normalization", function() { return _contract_normalization__WEBPACK_IMPORTED_MODULE_9__["normalization"]; });

/* harmony import */ var _contract_note__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contract/note */ "./playground/contract/note.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "note", function() { return _contract_note__WEBPACK_IMPORTED_MODULE_10__["note"]; });

/* harmony import */ var _contract_rule__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contract/rule */ "./playground/contract/rule.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rule", function() { return _contract_rule__WEBPACK_IMPORTED_MODULE_11__["rule"]; });

/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./user */ "./playground/user.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "user", function() { return _user__WEBPACK_IMPORTED_MODULE_12__["user"]; });

/* harmony import */ var _process__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./process */ "./playground/process.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "process", function() { return _process__WEBPACK_IMPORTED_MODULE_13__["process"]; });
















/***/ }),

/***/ "./playground/library.js":
/*!*******************************!*\
  !*** ./playground/library.js ***!
  \*******************************/
/*! exports provided: library */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "library", function() { return library; });
const library = {
  name: 'Library Queries',
  endpoint: 'http://localhost:8085/graphql',
  headers: {
    sessiontoken: 'MY^PR3TTYP0NY'
  },
  query: `
  {
    airportList {
      id
      countryName
      cityCode
      cityName
      airportCode
      airportName
    }
    bookingClassList {
      id
      code
      name
      mappingCount
    }
    airlineMappingList(bookingClassId: 1) {
      id
      code
      name
      ticketingDate
      travelDate
      exceptionCount
    }
    exceptionList(exceptionId: 41) {
      id
      order
      originCode
      destinationCode
      overrideFareCategory
    }
    airlineList {
      id
      code
      name
    }
    countryList {
      id
      code
      name
    }
    currencyList {
      id
      name
      code
    }
    distanceUnitList {
      id
      name
    }
    geographyList {
      id
      code
      name
    }
    marketList {
      id
      code
      name
      locationType
    }
  }`
};

/***/ }),

/***/ "./playground/process.js":
/*!*******************************!*\
  !*** ./playground/process.js ***!
  \*******************************/
/*! exports provided: process */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "process", function() { return process; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./constants/index.js");

const process = {
  queries: {
    name: 'Process Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
  {
    process {
      ${_constants__WEBPACK_IMPORTED_MODULE_0__["PROCESS"]}
    }
  }`
  },
  mutations: {
    name: 'Process Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    mutation {
      startProcess {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PROCESS"]}
      }
      stopProcess {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PROCESS"]}
      }
    }
    `
  }
};

/***/ }),

/***/ "./playground/project.js":
/*!*******************************!*\
  !*** ./playground/project.js ***!
  \*******************************/
/*! exports provided: project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "project", function() { return project; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./constants/index.js");

const project = {
  queries: {
    name: 'Project Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      projectList(clientId: null, userId: null) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PROJECT"]}
      }
      projectTypeList {
        id
        name
      }
      savingsTypeList {
        id
        name
      }
    }
    `
  },
  mutations: {
    name: 'Project Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    mutation {
      addProject(
        clientId: 1
        clientName: "Test"
        projectTypeId: 1
        projectTypeName: "Test project"
        savingsTypeId: 3
        effectiveFrom: 1483246800001
        effectiveTo: 1483246800001
        reportFrom: 1483246800001
        reportTo: 1483246800001
        description: "my description"
        projectManagerId: 4
        leadAnalystId: 2
        dataSpecialistId: 3
        currencyId: 1
        distanceUnitId: 2
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PROJECT"]}
      }
      deleteProject(id: 1)
      toggleFavoriteProject(id: 50) {
        id
        favorite
      }
      editProject(
        id:50,
        savingsTypeId: 3
        effectiveFrom: 1483246800001
        effectiveTo: 1483246800001
        reportFrom: 1483246800001
        reportTo: 1483246800001
        description: "my description"
        projectManagerId: 4
        leadAnalystId: 2
        dataSpecialistId: 3
        currencyId: 3,
        distanceUnitId: 2
      ) {
        ${_constants__WEBPACK_IMPORTED_MODULE_0__["PROJECT"]}
      }
    }
    `
  }
};

/***/ }),

/***/ "./playground/user.js":
/*!****************************!*\
  !*** ./playground/user.js ***!
  \****************************/
/*! exports provided: user */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user", function() { return user; });
const user = {
  queries: {
    name: 'User Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: {
      sessiontoken: 'MY^PR3TTYP0NY'
    },
    query: `
    {
      userList(clientId: null) {
        id
        name
        email
      }
      user {
        id
        name
        email
      }
      projectManagerList(clientId: null) {
        id
        name
        email
      }
      leadAnalystList(clientId: null) {
        id
        name
        email
      }
      dataSpecialistList(clientId: null) {
        id
        name
        email
      }
    }`
  }
};

/***/ }),

/***/ "./resolvers/client.js":
/*!*****************************!*\
  !*** ./resolvers/client.js ***!
  \*****************************/
/*! exports provided: client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "client", function() { return client; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./constants/index.js");

const client = {
  Query: {
    clientList: async (_, __, {
      db
    }) => await db('blops.client_advito_application_link as link').select({
      id: 'client.id',
      name: 'client.client_name'
    }).leftJoin('blops.client', 'client.id', 'link.client_id').where('link.advito_application_id', _constants__WEBPACK_IMPORTED_MODULE_0__["AIR_APPLICATION_ID"]).andWhere('client.is_active', true)
  }
};

/***/ }),

/***/ "./resolvers/collection/airlineGroupCollection.js":
/*!********************************************************!*\
  !*** ./resolvers/collection/airlineGroupCollection.js ***!
  \********************************************************/
/*! exports provided: airlineGroupCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "airlineGroupCollection", function() { return airlineGroupCollection; });
const airlineGroupCollection = {
  Query: {
    airlineGroupCollectionList: async (_, {
      clientId = null,
      projectId = null
    }, {
      db
    }) => await db('carriergroupcollection as c').select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'updated',
      effectiveStartDate: 'startdate',
      effectiveEndDate: 'enddate',
      active: db.raw(`COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = c.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 3) = 1, FALSE)`),
      airlineGroupCount: db.raw(`(SELECT COUNT(*) FROM carriergroup WHERE collectionid = c.id AND isdeleted = FALSE)`),
      standard: 'isstandard'
    }).where('isdeleted', false).andWhere(function () {
      this.where('clientid', clientId).orWhere('isstandard', true);
    }).orderBy('isstandard', 'desc'),
    airlineGroupCollection: async (_, {
      id,
      projectId
    }, {
      db
    }) => await getAirlineGroupCollection(db, id, projectId),
    airlineGroupList: async (_, {
      collectionId
    }, {
      db
    }) => {
      const airlineGroupList = await db('carriergroup').select({
        id: 'id',
        name: 'name',
        code: 'code',
        standard: 'isstandard',
        effectiveStartDate: 'activefrom',
        effectiveEndDate: 'inactiveon'
      }).where('collectionid', collectionId).andWhere('isdeleted', false).orderBy('name');
      const airlineGroupMemberRequests = airlineGroupList.map(async airlineGroup => {
        const airlineGroupMemberList = await db('carriergroupmember as c').select({
          id: 'c.id',
          airlineId: 'c.carrierid',
          name: 'c1.name',
          code: 'c1.code',
          effectiveStartDate: 'c.activefrom',
          effectiveEndDate: 'c.inactiveon'
        }).leftJoin('carrier as c1', 'c.carrierid', 'c1.id').where('c.carriergroupid', airlineGroup.id).andWhere('c.isdeleted', false).orderBy('c1.name');
        airlineGroup.airlineGroupMemberList = airlineGroupMemberList;
      });
      await Promise.all(airlineGroupMemberRequests);
      return airlineGroupList;
    }
  },
  Mutation: {
    editAirlineGroupCollection: async (_, {
      projectId,
      id,
      name,
      description,
      effectiveStartDate,
      effectiveEndDate
    }, {
      db
    }) => {
      await db.raw(`SELECT carrier_group_collection_update(
          ${id},
          '${name}',
          ${description ? `'${description}'` : null},
          ${effectiveStartDate ? `'${new Date(effectiveStartDate).toISOString()}'` : null},
          ${effectiveEndDate ? `'${new Date(effectiveEndDate).toISOString()}'` : null}
        )`);
      return await getAirlineGroupCollection(db, id, projectId);
    },
    deleteAirlineGroupCollection: async (_, {
      id,
      projectId
    }, {
      db
    }) => {
      await db.raw(`SELECT carrier_group_collection_delete(${id}, ${projectId})`);
    },
    toggleAirlineGroupCollection: async (_, {
      id,
      projectId
    }, {
      db
    }) => {
      await db.raw(`SELECT carrier_group_collection_toggle(${id}, ${projectId})`);
    },
    addAirlineGroup: async (_, {
      collectionId,
      name,
      code,
      effectiveStartDate,
      effectiveEndDate,
      airlineList
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT carrier_group_create(${collectionId}, '${name}', '${code}', ${effectiveStartDate ? `'${new Date(effectiveStartDate).toISOString()}'` : null},
        ${effectiveEndDate ? `'${new Date(effectiveEndDate).toISOString()}'` : null})`);
      const [{
        carrier_group_create: newId
      }] = rows;
      const carrierGroupMemberRequests = airlineList.map(({
        airlineId,
        effectiveStartDate,
        effectiveEndDate
      }) => db.raw(`SELECT carrier_group_member_create(${newId}, ${airlineId}, ${effectiveStartDate ? `'${new Date(effectiveStartDate).toISOString()}'` : null},
            ${effectiveEndDate ? `'${new Date(effectiveEndDate).toISOString()}'` : null})`));
      await Promise.all(carrierGroupMemberRequests);
    },
    editAirlineGroup: async (_, {
      carrierGroupId,
      name,
      code,
      effectiveStartDate,
      effectiveEndDate,
      airlineList
    }, {
      db
    }) => {
      await db.raw(`SELECT carrier_group_update(${carrierGroupId}, '${name}', '${code}', ${effectiveStartDate ? `'${new Date(effectiveStartDate).toISOString()}'` : null},
        ${effectiveEndDate ? `'${new Date(effectiveEndDate).toISOString()}'` : null})`);
      const carrierGroupMemberRequests = airlineList.map(({
        id,
        airlineId,
        effectiveStartDate,
        effectiveEndDate
      }) => db.raw(`SELECT carrier_group_member_update(${carrierGroupId}, ${id}, ${airlineId}, ${effectiveStartDate ? `'${new Date(effectiveStartDate).toISOString()}'` : null},
            ${effectiveEndDate ? `'${new Date(effectiveEndDate).toISOString()}'` : null})`));
      await Promise.all(carrierGroupMemberRequests);
    },
    deleteAirlineGroup: async (_, {
      id
    }, {
      db
    }) => {
      await db.raw(`SELECT carrier_group_delete(${id})`);
    }
  }
};

const getAirlineGroupCollection = async (db, id, projectId) => {
  const [airlineGroupCollection] = await db('carriergroupcollection as c').select({
    id: 'id',
    name: 'name',
    description: 'description',
    dateUpdated: 'updated',
    effectiveStartDate: 'startdate',
    effectiveEndDate: 'enddate',
    active: db.raw(`COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = c.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 3) = 1, FALSE)`),
    airlineGroupCount: db.raw(`(SELECT COUNT(*) FROM carriergroup WHERE collectionid = c.id AND isdeleted = FALSE)`),
    standard: 'isstandard'
  }).where('id', id);
  return airlineGroupCollection;
};

/***/ }),

/***/ "./resolvers/collection/index.js":
/*!***************************************!*\
  !*** ./resolvers/collection/index.js ***!
  \***************************************/
/*! exports provided: collection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collection", function() { return collection; });
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.merge */ "lodash.merge");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _locationCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./locationCollection */ "./resolvers/collection/locationCollection.js");
/* harmony import */ var _travelSectorCollection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./travelSectorCollection */ "./resolvers/collection/travelSectorCollection.js");
/* harmony import */ var _airlineGroupCollection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./airlineGroupCollection */ "./resolvers/collection/airlineGroupCollection.js");
/* harmony import */ var _preferredAirlineCollection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./preferredAirlineCollection */ "./resolvers/collection/preferredAirlineCollection.js");





const collection = { ...lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()(_locationCollection__WEBPACK_IMPORTED_MODULE_1__["locationCollection"], _travelSectorCollection__WEBPACK_IMPORTED_MODULE_2__["travelSectorCollection"], _airlineGroupCollection__WEBPACK_IMPORTED_MODULE_3__["airlineGroupCollection"], _preferredAirlineCollection__WEBPACK_IMPORTED_MODULE_4__["preferredAirlineCollection"])
};

/***/ }),

/***/ "./resolvers/collection/locationCollection.js":
/*!****************************************************!*\
  !*** ./resolvers/collection/locationCollection.js ***!
  \****************************************************/
/*! exports provided: locationCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locationCollection", function() { return locationCollection; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const locationCollection = {
  Query: {
    locationCollectionList: async (_, {
      clientId = null,
      projectId = null
    }, {
      db
    }) => await db('location as l').select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'created',
      regionCount: db.raw(`(SELECT COUNT(*) FROM location WHERE geosetid = l.id AND isdeleted = FALSE AND locationtype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].REGION})`),
      standard: 'isstandard',
      active: db.raw(`COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = l.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 1) = 1, FALSE)`)
    }).where('isdeleted', false).andWhere(function () {
      this.where('clientid', clientId).orWhere('isstandard', true);
    }).andWhere('locationtype', _constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].COLLECTION).orderBy('isstandard', 'desc'),
    locationCollection: async (_, {
      id,
      projectId = null
    }, {
      db
    }) => await getLocationCollection(db, id, projectId),
    regionList: async (_, {
      geoSetId = null
    }, {
      db
    }) => {
      const regionList = await db('location').select({
        id: 'id',
        code: 'code',
        name: 'name',
        standard: 'isstandard'
      }).where('isdeleted', false).andWhere('locationtype', _constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].REGION).andWhere('geosetid', geoSetId);
      const countryRequests = regionList.map(async region => {
        const countryList = await db('locationmapping as l1').select({
          id: 'l2.id',
          code: 'l2.code',
          name: 'l2.name'
        }).leftJoin('location as l2', 'l1.childid', 'l2.id').where('l1.parentid', region.id).orderBy('code');
        region.countryList = countryList;
      });
      await Promise.all(countryRequests);
      return regionList;
    }
  },
  Mutation: {
    copyLocationCollection: async (_, {
      clientId,
      projectId,
      id,
      name,
      description
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT location_collection_copy(
          ${clientId},
          ${projectId},
          ${id},
          '${name}',
          ${description ? `'${description}'` : null}
        )`);
      const [{
        location_collection_copy: newId
      }] = rows;
      return newId;
    },
    editLocationCollection: async (_, {
      projectId,
      id,
      name,
      description
    }, {
      db
    }) => {
      await db.raw(`SELECT location_collection_update(
          ${id},
          '${name}',
          ${description ? `'${description}'` : null}
        )`);
      return await getLocationCollection(db, id, projectId);
    },
    deleteLocationCollection: async (_, {
      id,
      projectId
    }, {
      db
    }) => {
      await db.raw(`SELECT location_collection_delete(${id}, ${projectId})`);
    },
    toggleLocationCollection: async (_, {
      id,
      projectId
    }, {
      db
    }) => {
      await db.raw(`SELECT location_collection_toggle(${id}, ${projectId})`);
    },
    addRegion: async (_, {
      geoSetId,
      name,
      code
    }, {
      db
    }) => {
      await db.raw(`SELECT region_create(
          ${geoSetId},
          '${name}',
          '${code}'
        )`);
    },
    deleteRegion: async (_, {
      id
    }, {
      db
    }) => {
      await db.raw(`SELECT region_delete(${id})`);
      return id;
    },
    moveCountries: async (_, {
      geoSetId,
      regionId,
      countryList
    }, {
      db
    }) => {
      const queries = countryList.map(childId => db.raw(`
        SELECT region_move_country(${geoSetId}, ${childId}, ${regionId})
      `));
      await Promise.all(queries);
    }
  }
};

const getLocationCollection = async (db, id, projectId) => {
  const [locationCollection] = await db('location as l').select({
    id: 'id',
    name: 'name',
    description: 'description',
    dateUpdated: 'created',
    regionCount: db.raw(`(SELECT COUNT(*) FROM location WHERE geosetid = l.id AND isdeleted = FALSE AND locationtype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].REGION})`),
    standard: 'isstandard',
    active: db.raw(`COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = l.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 1) = 1, FALSE)`)
  }).where('id', id);
  return locationCollection;
};

/***/ }),

/***/ "./resolvers/collection/preferredAirlineCollection.js":
/*!************************************************************!*\
  !*** ./resolvers/collection/preferredAirlineCollection.js ***!
  \************************************************************/
/*! exports provided: preferredAirlineCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preferredAirlineCollection", function() { return preferredAirlineCollection; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const preferredAirlineCollection = {
  Query: {
    preferredAirlineCollectionList: async (_, {
      clientId = null,
      projectId = null
    }, {
      db
    }) => await db('preferredcarriergroup as p').select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'updated',
      airlineCount: db.raw(`(SELECT COUNT(*) FROM pcgcarrier WHERE pcgroupid = p.id AND isdeleted = FALSE)`),
      active: db.raw(`COALESCE((SELECT COUNT(*) FROM projectdataref as pd WHERE pd.datarefid = p.id AND pd.projectid = ${projectId} AND status = 1 AND datareftype = 4) = 1, FALSE)`)
    }).where('isdeleted', false).andWhere('clientid', clientId),
    preferredAirlineCollection: async (_, {
      projectId,
      id
    }, {
      db
    }) => await getPreferredAirlineCollection(db, id, projectId),
    preferredAirlineList: async (_, {
      groupId
    }, {
      db
    }) => {
      const preferredAirlineList = await db('pcgcarrier as p').select({
        id: 'p.id',
        airlineId: 'carrierid',
        name: 'c.name',
        preferenceLevelId: 'preferencelevelid',
        preferenceLevelName: 'l.name_val',
        effectiveStartDate: 'effectivedatestart',
        effectiveEndDate: 'effectivedateend',
        active: db.raw(`TRUE`)
      }).leftJoin('carrier as c', 'c.id', 'p.carrierid').leftJoin('lov_lookup as l', 'l.id', 'p.preferencelevelid').where('p.isdeleted', false).andWhere('pcgroupid', groupId).orderBy('p.id');
      const preferredAirlineRequests = preferredAirlineList.map(async preferredAirline => {
        const posList = await db('pcgcpointofsale as p').select({
          id: 'p.id',
          locationId: 'p.locationid',
          name: 'l.name',
          code: 'l.code'
        }).leftJoin('location as l', 'p.locationid', 'l.id').where('p.pcgcarrierid', preferredAirline.id).andWhere('p.isdeleted', false);
        preferredAirline.posList = posList;
      });
      await Promise.all(preferredAirlineRequests);
      return preferredAirlineList;
    },
    preferenceLevelList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["PREFERRED_AIRLINE_LOOKUP"].PREFERENCE_LEVEL_TYPE)
  },
  Mutation: {
    editPreferredAirlineCollection: async (_, {
      projectId,
      id,
      name,
      description
    }, {
      db
    }) => {
      await db.raw(`SELECT preferred_carrier_group_update(
            ${id},
            '${name}',
            ${description ? `'${description}'` : null}
          )`);
      return await getPreferredAirlineCollection(db, id, projectId);
    },
    deletePreferredAirlineCollection: async (_, {
      id,
      projectId
    }, {
      db
    }) => {
      await db.raw(`SELECT preferred_carrier_group_delete(${id}, ${projectId})`);
    },
    togglePreferredAirlineCollection: async (_, {
      id,
      projectId
    }, {
      db
    }) => {
      await db.raw(`SELECT preferred_carrier_group_toggle(${id}, ${projectId})`);
    },
    addPreferredAirline: async (_, {
      groupId,
      airlineList
    }, {
      db
    }) => {
      airlineList.forEach(async ({
        airlineId,
        preferenceLevelId,
        effectiveStartDate,
        effectiveEndDate,
        posIdList
      }) => {
        const {
          rows
        } = await db.raw(`SELECT pcg_carrier_create(${groupId}, ${airlineId}, ${preferenceLevelId}, ${effectiveStartDate ? `'${new Date(effectiveStartDate).toISOString()}'` : null},
            ${effectiveEndDate ? `'${new Date(effectiveEndDate).toISOString()}'` : null})`);
        const [{
          pcg_carrier_create: newId
        }] = rows;
        const posRequests = posIdList.map(id => db.raw(`SELECT pcgc_pos_create(${newId}, ${id})`));
        await Promise.all(posRequests);
      });
    },
    editPreferredAirline: async (_, {
      groupId,
      airlineList
    }, {
      db
    }) => {
      airlineList.forEach(async ({
        id,
        airlineId,
        preferenceLevelId,
        effectiveStartDate,
        effectiveEndDate,
        deleted,
        posIdList
      }) => {
        const {
          rows
        } = await db.raw(`SELECT pcg_carrier_update(${groupId}, ${id}, ${airlineId}, ${preferenceLevelId}, ${effectiveStartDate ? `'${new Date(effectiveStartDate).toISOString()}'` : null},
            ${effectiveEndDate ? `'${new Date(effectiveEndDate).toISOString()}'` : null},
            ${deleted})`);
        const [{
          pcg_carrier_update: newId
        }] = rows;
        const posRequests = posIdList.map(id => db.raw(`SELECT pcgc_pos_create(${newId}, ${id})`));
        await Promise.all(posRequests);
      });
    },
    deletePreferredAirline: async (_, {
      id
    }, {
      db
    }) => {
      await db.raw(`SELECT pcg_carrier_delete(${id})`);
    }
  }
};

const getPreferredAirlineCollection = async (db, id, projectId) => {
  const [preferredAirlineCollection] = await db('preferredcarriergroup as p').select({
    id: 'id',
    name: 'name',
    description: 'description',
    dateUpdated: 'updated',
    airlineCount: db.raw(`(SELECT COUNT(*) FROM pcgcarrier WHERE pcgroupid = p.id AND isdeleted = FALSE)`),
    active: db.raw(`COALESCE((SELECT COUNT(*) FROM projectdataref as pd WHERE pd.datarefid = p.id AND pd.projectid = ${projectId} AND status = 1 AND datareftype = 4) = 1, FALSE)`)
  }).where('id', id);
  return preferredAirlineCollection;
};

/***/ }),

/***/ "./resolvers/collection/travelSectorCollection.js":
/*!********************************************************!*\
  !*** ./resolvers/collection/travelSectorCollection.js ***!
  \********************************************************/
/*! exports provided: travelSectorCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "travelSectorCollection", function() { return travelSectorCollection; });
const travelSectorCollection = {
  Query: {
    travelSectorCollectionList: async (_, {
      clientId = null,
      projectId = null
    }, {
      db
    }) => await db('sectorgroup as s').select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'updated',
      sectorCount: db.raw(`(SELECT COUNT(*) FROM travelsector WHERE groupid = s.id AND isdeleted = FALSE)`),
      standard: 'isstandard',
      active: db.raw(`COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = s.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 2) = 1, FALSE)`)
    }).where('isdeleted', false).andWhere(function () {
      this.where('clientid', clientId).orWhere('isstandard', true);
    }).orderBy('isstandard', 'desc'),
    travelSectorCollection: async (_, {
      id,
      projectId = null
    }, {
      db
    }) => await getTravelSectorCollection(db, id, projectId),
    travelSectorList: async (_, {
      groupId
    }, {
      db
    }) => {
      const travelSectorList = await db('travelsector').select({
        id: 'id',
        name: 'name',
        shortName: 'shortname',
        standard: 'isstandard'
      }).where('isdeleted', false).andWhere('groupid', groupId);
      const sectorGeographyRequests = travelSectorList.map(async travelSector => {
        const sectorGeographyList = await db('sectorgeography as s').select({
          id: 's.id',
          originId: 's.fromlocation',
          originName: 'l1.name',
          destinationId: 's.tolocation',
          destinationName: 'l2.name',
          exclude: 's.excluded'
        }).leftJoin('location as l1', 's.fromlocation', 'l1.id').leftJoin('location as l2', 's.tolocation', 'l2.id').where('s.travelsectorid', travelSector.id).andWhere('s.isdeleted', false);
        travelSector.sectorGeographyList = sectorGeographyList;
      });
      await Promise.all(sectorGeographyRequests);
      return travelSectorList;
    }
  },
  Mutation: {
    copyTravelSectorCollection: async (_, {
      clientId,
      projectId,
      id,
      name,
      description
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT travel_sector_collection_copy(
          ${clientId},
          ${projectId},
          ${id},
          '${name}',
          ${description ? `'${description}'` : null}
        )`);
      const [{
        travel_sector_collection_copy: newId
      }] = rows;
      return newId;
    },
    editTravelSectorCollection: async (_, {
      projectId,
      id,
      name,
      description
    }, {
      db
    }) => {
      await db.raw(`SELECT travel_sector_collection_update(
          ${id},
          '${name}',
          ${description ? `'${description}'` : null}
        )`);
      return await getTravelSectorCollection(db, id, projectId);
    },
    deleteTravelSectorCollection: async (_, {
      id,
      projectId
    }, {
      db
    }) => {
      await db.raw(`SELECT travel_sector_collection_delete(${id}, ${projectId})`);
    },
    toggleTravelSectorCollection: async (_, {
      id,
      projectId
    }, {
      db
    }) => {
      await db.raw(`SELECT travel_sector_collection_toggle(${id}, ${projectId})`);
    },
    addTravelSector: async (_, {
      groupId,
      name,
      shortName,
      geographyList
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT travel_sector_create(${groupId}, '${name}', '${shortName}')`);
      const [{
        travel_sector_create: newId
      }] = rows;
      const sectorGeographyRequests = geographyList.map(({
        origin,
        destination,
        exclude
      }) => db.raw(`SELECT sector_geography_create(${newId}, ${origin}, ${destination}, ${exclude})`));
      await Promise.all(sectorGeographyRequests);
    },
    editTravelSector: async (_, {
      sectorId,
      name,
      shortName,
      geographyList
    }, {
      db
    }) => {
      await db.raw(`SELECT travel_sector_update(${sectorId}, '${name}', '${shortName}')`);
      const sectorGeographyRequests = geographyList.map(({
        id,
        origin,
        destination,
        exclude
      }) => db.raw(`SELECT sector_geography_update(${sectorId}, ${id}, ${origin}, ${destination}, ${exclude})`));
      await Promise.all(sectorGeographyRequests);
    },
    deleteTravelSector: async (_, {
      id
    }, {
      db
    }) => {
      await db.raw(`SELECT travel_sector_delete(${id})`);
    },
    deleteSectorGeography: async (_, {
      id
    }, {
      db
    }) => {
      await db.raw(`SELECT sector_geography_delete(${id})`);
    }
  }
};

const getTravelSectorCollection = async (db, id, projectId) => {
  const [travelSectorCollection] = await db('sectorgroup as s').select({
    id: 'id',
    name: 'name',
    description: 'description',
    dateUpdated: 'updated',
    sectorCount: db.raw(`(SELECT COUNT(*) FROM travelsector WHERE groupid = s.id AND isdeleted = FALSE)`),
    standard: 'isstandard',
    active: db.raw(`COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = s.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 2) = 1, FALSE)`)
  }).where('id', id);
  return travelSectorCollection;
};

/***/ }),

/***/ "./resolvers/contract/bulkRule.js":
/*!****************************************!*\
  !*** ./resolvers/contract/bulkRule.js ***!
  \****************************************/
/*! exports provided: bulkRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bulkRule", function() { return bulkRule; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const bulkRule = {
  Mutation: {
    updateTicketingDateBulk: async (_, {
      parentType,
      ticketingDateList
    }, {
      db
    }) => {
      const tableName = getParentTable(parentType);
      const queries = ticketingDateList.map(({
        id,
        startDate,
        endDate
      }) => db.raw(`
        SELECT ticketdaterule_create_bulk(${id}, '${tableName}', '${new Date(startDate).toISOString()}', '${new Date(endDate).toISOString()}')
      `));
      await Promise.all(queries);
    },
    updateTravelDateBulk: async (_, {
      parentType,
      travelDateList
    }, {
      db
    }) => {
      const tableName = getParentTable(parentType);
      const queries = travelDateList.map(({
        id,
        startDate,
        endDate
      }) => db.raw(`
        SELECT traveldaterule_create_bulk(${id}, '${tableName}', '${new Date(startDate).toISOString()}', '${new Date(endDate).toISOString()}')
      `));
      await Promise.all(queries);
    },
    updateTourCodeBulk: async (_, {
      parentType,
      tourCodeList
    }, {
      db
    }) => {
      const tableName = getParentTable(parentType);
      const queries = tourCodeList.map(({
        id,
        tourCode
      }) => db.raw(`
        SELECT tourcoderule_create_bulk(${id}, '${tableName}', '${tourCode}')
      `));
      await Promise.all(queries);
    },
    updateTicketDesignatorBulk: async (_, {
      parentType,
      ticketDesignatorList
    }, {
      db
    }) => {
      const tableName = getParentTable(parentType);
      const queries = ticketDesignatorList.map(({
        id,
        ticketDesignator
      }) => db.raw(`
        SELECT ticketdesignatorrule_create_bulk(${id}, '${tableName}', '${ticketDesignator}')
      `));
      await Promise.all(queries);
    }
  }
};

const getParentTable = (parentType = _constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT_LOOKUP"].RULE_TYPE) => parentType === _constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT_LOOKUP"].RULE_TYPE ? 'discount' : parentType === _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].RULE_TYPE ? 'targetterm_v2' : parentType === _constants__WEBPACK_IMPORTED_MODULE_0__["PRICING_TERM_LOOKUP"].RULE_TYPE ? 'pricingterm' : null;

/***/ }),

/***/ "./resolvers/contract/contractContainer.js":
/*!*************************************************!*\
  !*** ./resolvers/contract/contractContainer.js ***!
  \*************************************************/
/*! exports provided: contractContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contractContainer", function() { return contractContainer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const contractContainer = {
  Query: {
    contractList: async (_, {
      projectId = null
    }, {
      db
    }) => await getContractList(db, projectId),
    contract: async (_, {
      id
    }, {
      db
    }) => await getContract(db, id),
    contractTypeList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["CONTRACT_LOOKUP"].TYPE),
    divisionTypeList: async (_, {
      clientId
    }, {
      db
    }) => await db('division').select({
      id: 'division.id',
      name: 'division.name'
    }).distinct('division.id').where('division.isdeleted', false).andWhere('division.clientid', clientId),
    bulkActionList: async (_, {
      parentId
    }, {
      db
    }) => await db('bulkoperation').select({
      id: 'id',
      name: 'action'
    }).where('parentid', parentId).orderBy('id')
  },
  Mutation: {
    createContract: async (_, {
      name,
      projectId,
      typeId,
      round,
      divisionId,
      description
    }, {
      db
    }) => {
      const [id] = await db('contractcontainer').insert({
        name,
        contracttype: typeId,
        round,
        description,
        projectid: projectId,
        qc: 0
      }, 'id');

      if (divisionId) {
        await db('contractdivision').insert({
          contractid: id,
          divisionid: divisionId
        });
      }

      const [contract] = await getContract(db, id);
      return contract;
    },
    copyContract: async (_, {
      id,
      name
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT contractcontainer_createcopy(${id}, '${name}')`);
      const [{
        contractcontainer_createcopy: newId
      }] = rows;
      const [contract] = await getContract(db, newId);
      return contract;
    },
    editContract: async (_, {
      id,
      name,
      typeId,
      round,
      divisionId,
      description
    }, {
      db
    }) => {
      await db('contractcontainer').where('id', id).update({
        contracttype: typeId,
        name,
        round,
        description
      });

      if (divisionId) {
        await db('contractdivision').where('contractid', id).update({
          divisionid: divisionId
        });
      }

      const [contract] = await getContract(db, id);
      return contract;
    },
    deleteContract: async (_, {
      id
    }, {
      db
    }) => parseInt((await db('contractcontainer').where('id', id).update({
      isdeleted: true
    }, 'id')))
  }
};

const getContractList = async (db, projectId) => await db('contractcontainer as c').select({
  id: 'c.id',
  name: 'c.name',
  typeId: 'l.id',
  typeName: 'l.name_val',
  description: 'c.description',
  round: 'c.round',
  effectiveFrom: 'c.effectivefrom',
  effectiveTo: 'c.effectiveto',
  qc: 'c.qc',
  pricingTermCount: db.raw('(SELECT COUNT(*) from pricingterm as p where p.contractcontainerid = c.id and p.isdeleted = false)'),
  targetTermCount: db.raw('(SELECT COUNT(*) from targetterm_v2 as t where t.contractcontainerid = c.id and t.isdeleted = false)'),
  divisionId: 'd.id',
  pointOfOriginList: db.raw('(select * from contract_pointoforigin_getlist(c.id))'),
  pointOfSaleList: db.raw('(select * from contract_pointofsale_getlist(c.id))'),
  airlineList: db.raw('(select * from contract_carrier_getlist(c.id))')
}).leftJoin('lov_lookup as l', 'c.contracttype', 'l.id').leftJoin('contractdivision as cd', 'c.id', 'cd.contractid').leftJoin('division as d', 'cd.divisionid', 'd.id').where('c.isdeleted', false).andWhere('c.projectid', projectId).groupBy('c.id', 'l.id', 'd.id');

const getContract = async (db, id) => await db('contractcontainer as c').select({
  id: 'c.id',
  name: 'c.name',
  typeId: 'l.id',
  typeName: 'l.name_val',
  description: 'c.description',
  round: 'c.round',
  effectiveFrom: 'c.effectivefrom',
  effectiveTo: 'c.effectiveto',
  qc: 'c.qc',
  pricingTermCount: db.raw('(SELECT COUNT(*) from pricingterm as p where p.contractcontainerid = c.id and p.isdeleted = false)'),
  targetTermCount: db.raw('(SELECT COUNT(*) from targetterm_v2 as t where t.contractcontainerid = c.id and t.isdeleted = false)'),
  divisionId: 'd.id',
  pointOfOriginList: db.raw('(select * from contract_pointoforigin_getlist(c.id))'),
  pointOfSaleList: db.raw('(select * from contract_pointofsale_getlist(c.id))'),
  airlineList: db.raw('(select * from contract_carrier_getlist(c.id))')
}).leftJoin('lov_lookup as l', 'c.contracttype', 'l.id').leftJoin('contractdivision as cd', 'c.id', 'cd.contractid').leftJoin('division as d', 'cd.divisionid', 'd.id').where('c.isdeleted', false).andWhere('c.id', id).groupBy('c.id', 'l.id', 'd.id');

/***/ }),

/***/ "./resolvers/contract/discount.js":
/*!****************************************!*\
  !*** ./resolvers/contract/discount.js ***!
  \****************************************/
/*! exports provided: discount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "discount", function() { return discount; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const discount = {
  Query: {
    discountList: async (_, {
      pricingTermId
    }, {
      db
    }) => pricingTermId ? await getDiscountList(db, pricingTermId) : [],
    discount: async (_, {
      id
    }, {
      db
    }) => await getDiscount(db, id),
    discountTypeList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT_LOOKUP"].DISCOUNT_TYPE),
    journeyTypeList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT_LOOKUP"].JOURNEY_TYPE),
    directionTypeList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT_LOOKUP"].DIRECTION_TYPE)
  },
  Mutation: {
    createDiscount: async (_, {
      pricingTermId,
      name,
      discountTypeId,
      discountValue,
      journeyTypeId,
      directionTypeId
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT discount_create(
          ${pricingTermId},
          '${name}',
          ${discountTypeId},
          ${discountValue},
          ${journeyTypeId},
          ${directionTypeId}
        )`);
      const [{
        discount_create: id
      }] = rows;
      return await getDiscount(db, id);
    },
    copyDiscount: async (_, {
      id,
      name,
      discountTypeId,
      discountValue,
      journeyTypeId,
      directionTypeId
    }, {
      db
    }) => {
      const value = discountTypeId === _constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT_LOOKUP"].PERCENTAGE ? discountValue / 100 : discountValue;
      const {
        rows
      } = await db.raw(`SELECT discount_createcopy(
        ${id},
        '${name}',
        ${discountTypeId},
        ${value},
        ${journeyTypeId},
        ${directionTypeId},
        null,
        null,
        null,
        null)`);
      const [{
        discount_createcopy: newId
      }] = rows;
      return await getDiscount(db, parseInt(newId));
    },
    editDiscount: async (_, {
      id,
      name,
      discountTypeId,
      discountValue,
      journeyTypeId,
      directionTypeId
    }, {
      db
    }) => {
      const value = discountTypeId === _constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT_LOOKUP"].PERCENTAGE ? discountValue / 100 : discountValue;
      await db.raw(`SELECT discount_update(${id}, '${name}', ${discountTypeId}, ${value}, ${journeyTypeId}, ${directionTypeId})`);
      return await getDiscount(db, id);
    },
    deleteDiscounts: async (_, {
      pricingTermId,
      idList
    }, {
      db
    }) => {
      const queries = idList.map(id => db.raw(`
        SELECT discount_delete(${id})
      `));
      await Promise.all(queries);
      await db.raw(`SELECT discount_update_sequence_all(${pricingTermId})`);
      return idList;
    },
    updateDiscountAppliedOrder: async (_, {
      updateDiscountList
    }, {
      db
    }) => {
      const queries = updateDiscountList.map(discount => db.raw(`
        SELECT discount_update_sequence_single(${discount.id}, ${discount.appliedOrder})
      `));
      await Promise.all(queries);
    }
  }
};

const getDiscountList = async (db, pricingTermId) => await db('discount as d').select({
  id: 'd.id',
  pricingTermId: 'd.pricingtermid',
  contractOrder: 'd.readorder',
  appliedOrder: 'd.sequence',
  name: 'd.generateddiscountname',
  effectiveFrom: db.raw('(select _effectivefrom from discount_effectivedate(d.id))'),
  effectiveTo: db.raw('(select _effectiveto from discount_effectivedate(d.id))'),
  discountTypeId: 'l.id',
  discountTypeName: 'l.name_val',
  discountValue: 'd.discountvalue',
  journeyTypeId: 'l1.id',
  journeyTypeName: 'l1.name_val',
  directionTypeId: 'l2.id',
  directionTypeName: 'l2.name_val',
  ruleCount: db.raw('(SELECT COUNT(*) from (select rules_checker(d.rulescontainerguidref)) as c)'),
  normalizationCount: db.raw('(SELECT COUNT(*) FROM discountnormalisation as dn where dn.isdeleted = FALSE and dn.discountid = d.id)'),
  noteImportant: db.raw('COALESCE(n.important, FALSE)'),
  noteContent: db.raw('CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = n.id) = 0 THEN FALSE else TRUE END')
}).leftJoin('lov_lookup as l', 'd.discounttype', 'l.id').leftJoin('lov_lookup as l1', 'd.journeytype', 'l1.id').leftJoin('lov_lookup as l2', 'd.direction', 'l2.id').leftJoin('usernote as n', 'd.notesid', 'n.id').where('d.isdeleted', false).andWhere('d.pricingtermid', pricingTermId).groupBy('d.id', 'l.id', 'l1.id', 'l2.id', 'n.important', 'n.id');

const getDiscount = async (db, id) => {
  const [discount] = await db('discount as d').select({
    id: 'd.id',
    pricingTermId: 'd.pricingtermid',
    contractOrder: 'd.readorder',
    appliedOrder: 'd.sequence',
    name: 'd.generateddiscountname',
    effectiveFrom: db.raw('(select _effectivefrom from discount_effectivedate(d.id))'),
    effectiveTo: db.raw('(select _effectiveto from discount_effectivedate(d.id))'),
    discountTypeId: 'l.id',
    discountTypeName: 'l.name_val',
    discountValue: 'd.discountvalue',
    journeyTypeId: 'l1.id',
    journeyTypeName: 'l1.name_val',
    directionTypeId: 'l2.id',
    directionTypeName: 'l2.name_val',
    ruleCount: db.raw('(SELECT COUNT(*) from (select rules_checker(d.rulescontainerguidref)) as c)'),
    normalizationCount: db.raw('(SELECT COUNT(*) FROM discountnormalisation as dn where dn.isdeleted = FALSE and dn.discountid = d.id)'),
    noteImportant: db.raw('COALESCE(n.important, FALSE)'),
    noteContent: db.raw('CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = n.id) = 0 THEN FALSE else TRUE END')
  }).leftJoin('lov_lookup as l', 'd.discounttype', 'l.id').leftJoin('lov_lookup as l1', 'd.journeytype', 'l1.id').leftJoin('lov_lookup as l2', 'd.direction', 'l2.id').leftJoin('usernote as n', 'd.notesid', 'n.id').where('d.isdeleted', false).andWhere('d.id', id).groupBy('d.id', 'l.id', 'l1.id', 'l2.id', 'n.important', 'n.id');
  return discount;
};

/***/ }),

/***/ "./resolvers/contract/index.js":
/*!*************************************!*\
  !*** ./resolvers/contract/index.js ***!
  \*************************************/
/*! exports provided: contract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contract", function() { return contract; });
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.merge */ "lodash.merge");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contractContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contractContainer */ "./resolvers/contract/contractContainer.js");
/* harmony import */ var _pricingTerm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pricingTerm */ "./resolvers/contract/pricingTerm.js");
/* harmony import */ var _targetTerm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./targetTerm */ "./resolvers/contract/targetTerm.js");
/* harmony import */ var _targetLevel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./targetLevel */ "./resolvers/contract/targetLevel.js");
/* harmony import */ var _discount__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./discount */ "./resolvers/contract/discount.js");
/* harmony import */ var _normalization__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./normalization */ "./resolvers/contract/normalization.js");
/* harmony import */ var _note__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./note */ "./resolvers/contract/note.js");
/* harmony import */ var _rule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rule */ "./resolvers/contract/rule.js");
/* harmony import */ var _bulkRule__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./bulkRule */ "./resolvers/contract/bulkRule.js");










const contract = { ...lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()(_contractContainer__WEBPACK_IMPORTED_MODULE_1__["contractContainer"], _pricingTerm__WEBPACK_IMPORTED_MODULE_2__["pricingTerm"], _targetTerm__WEBPACK_IMPORTED_MODULE_3__["targetTerm"], _discount__WEBPACK_IMPORTED_MODULE_5__["discount"], _normalization__WEBPACK_IMPORTED_MODULE_6__["normalization"], _note__WEBPACK_IMPORTED_MODULE_7__["note"], _targetLevel__WEBPACK_IMPORTED_MODULE_4__["targetLevel"], _rule__WEBPACK_IMPORTED_MODULE_8__["rule"], _bulkRule__WEBPACK_IMPORTED_MODULE_9__["bulkRule"])
};

/***/ }),

/***/ "./resolvers/contract/normalization.js":
/*!*********************************************!*\
  !*** ./resolvers/contract/normalization.js ***!
  \*********************************************/
/*! exports provided: normalization */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalization", function() { return normalization; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const normalization = {
  Query: {
    normalizationList: async (_, {
      discountId = null
    }, {
      db
    }) => await db('discountnormalisation as n').select({
      id: 'n.id',
      usageFrom: 'n.usagefrom',
      usageTo: 'n.usageto',
      effectiveFrom: 'n.effectivefrom',
      effectiveTo: 'n.effectiveto',
      created: 'n.created',
      createdby: 'n.createdby',
      marketCount: db.raw(`
            (SELECT COUNT(*) FROM discountnormalisationmarket as m WHERE m.normalisationid = n.id and m.isdeleted = FALSE)
          `)
    }).where('discountid', discountId).andWhere('n.isdeleted', false),
    normalizationMarketList: async (_, {
      normalizationId = null
    }, {
      db
    }) => {
      const normalizationMarketList = await db('discountnormalisationmarket').select({
        id: 'id',
        marketA: 'marketa',
        marketB: 'marketb',
        farePaid: 'farepaid',
        usageOverride: 'usageoverride',
        farePullDate: 'farepulldate',
        notes: 'notes'
      }).where('normalisationid', normalizationId).andWhere('isdeleted', false);
      const normalizationFareRequests = normalizationMarketList.map(async market => {
        const normalizationFareList = await db('discountnormalisationfare').select({
          id: 'id',
          fareType: 'faretype',
          fareBasis: 'farebasis',
          amount: 'amount',
          currencyCode: 'currencycode',
          directionType: 'directiontype',
          advancePurchase: 'advancepurchase',
          minstay: 'minstay'
        }).where('normalisationmarketid', market.id);
        market.fareList = normalizationFareList;
      });
      await Promise.all(normalizationFareRequests);
      return normalizationMarketList;
    },
    normalization: async (_, {
      id
    }, {
      db
    }) => await getNormalization(db, id),
    topMarketList: async () => [{
      id: 1,
      value: 'LAX - JFK 12345 50%',
      marketA: 'LAX',
      marketB: 'JFK',
      farePaid: 12345,
      usage: 0.5,
      advancedTicketList: advancedTicketList(),
      departureList: departureList(),
      fareBasisList: fareBasisList()
    }, {
      id: 2,
      value: 'DFW - JFK 54321 90%',
      marketA: 'DFW',
      marketB: 'JFK',
      farePaid: 54321,
      usage: 0.9,
      advancedTicketList: advancedTicketList(),
      departureList: departureList(),
      fareBasisList: fareBasisList()
    }, {
      id: 3,
      value: 'BWI - OAK 34182 25%',
      marketA: 'BWI',
      marketB: 'OAK',
      farePaid: 34182,
      usage: 0.25,
      advancedTicketList: advancedTicketList(),
      departureList: departureList(),
      fareBasisList: fareBasisList()
    }]
  },
  Mutation: {
    createNormalization: async (_, {
      discountId,
      usageFrom,
      usageTo,
      effectiveFrom,
      effectiveTo
    }, {
      db,
      user
    }) => {
      const {
        rows
      } = await db.raw(`SELECT discount_normalisation_create(
          ${discountId},
          ${new Date(usageFrom).toISOString() ? `'${new Date(usageFrom).toISOString()}'` : null},
          ${new Date(usageTo).toISOString() ? `'${new Date(usageTo).toISOString()}'` : null},
          ${new Date(effectiveFrom).toISOString() ? `'${new Date(effectiveFrom).toISOString()}'` : null},
          ${new Date(effectiveTo).toISOString() ? `'${new Date(effectiveTo).toISOString()}'` : null},
          '${user.name.replace(_constants__WEBPACK_IMPORTED_MODULE_0__["REGEX_USER"], "''")}'
        )`);
      const [{
        discount_normalisation_create: id
      }] = rows;
      return await getNormalization(db, id);
    },
    updateNormalization: async (_, {
      id,
      usageFrom,
      usageTo,
      effectiveFrom,
      effectiveTo
    }, {
      db,
      user
    }) => {
      await db.raw(`SELECT discount_normalisation_update(
          ${id},
          ${new Date(usageFrom).toISOString() ? `'${new Date(usageFrom).toISOString()}'` : null},
          ${new Date(usageTo).toISOString() ? `'${new Date(usageTo).toISOString()}'` : null},
          ${new Date(effectiveFrom).toISOString() ? `'${new Date(effectiveFrom).toISOString()}'` : null},
          ${new Date(effectiveTo).toISOString() ? `'${new Date(effectiveTo).toISOString()}'` : null},
          '${user.name.replace(_constants__WEBPACK_IMPORTED_MODULE_0__["REGEX_USER"], "''")}'
        )`);
      return await getNormalization(db, id);
    },
    copyNormalization: async (_, {
      id
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT discountnormalisation_createcopy(${id}, null, null)`);
      const [{
        discountnormalisation_createcopy: newId
      }] = rows;
      return await getNormalization(db, newId);
    },
    deleteNormalization: async (_, {
      id
    }, {
      db
    }) => {
      await db.raw(`SELECT discount_normalisation_delete(${id})`);
      return id;
    },
    createNormalizationMarket: async (_, {
      normalizationId,
      marketA,
      marketB,
      farePaid,
      usageOverride,
      farePullDate,
      notes,
      fareList
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT discount_normalisation_market_create(
          ${normalizationId},
          '${marketA}',
          '${marketB}',
          ${farePaid},
          ${usageOverride},
          ${new Date(farePullDate).toISOString() ? `'${new Date(farePullDate).toISOString()}'` : null},
          ${notes ? `'${notes}'` : null}
        )`);
      const [{
        discount_normalisation_market_create: newId
      }] = rows;
      const normalizationFareRequests = fareList.map(({
        fareType,
        fareBasis,
        amount,
        currencyCode,
        directionType,
        advancePurchase,
        minstay
      }) => db.raw(`
          SELECT discount_normalisation_fare_create(
            ${newId},
            ${fareType},
            ${fareBasis ? `'${fareBasis}'` : null},
            ${amount},
            '${currencyCode}',
            '${directionType}',
            '${advancePurchase}',
            '${minstay}'
          )
        `));
      await Promise.all(normalizationFareRequests);
      return await getNormalizationMarket(db, newId);
    },
    updateNormalizationMarket: async (_, {
      marketId,
      marketA,
      marketB,
      farePaid,
      usageOverride,
      farePullDate,
      notes,
      fareList
    }, {
      db
    }) => {
      await db.raw(`SELECT discount_normalisation_market_update(
          ${marketId},
          '${marketA}',
          '${marketB}',
          ${farePaid},
          ${usageOverride},
          ${new Date(farePullDate).toISOString() ? `'${new Date(farePullDate).toISOString()}'` : null},
          ${notes ? `'${notes}'` : null}
        )`);
      const normalizationFareRequests = fareList.map(({
        id,
        fareType,
        fareBasis,
        amount,
        currencyCode,
        directionType,
        advancePurchase,
        minstay
      }) => db.raw(`
          SELECT discount_normalisation_fare_update(
            ${id},
            ${fareType},
            ${fareBasis ? `'${fareBasis}'` : null},
            ${amount},
            '${currencyCode}',
            '${directionType}',
            '${advancePurchase}',
            '${minstay}'
          )
        `));
      await Promise.all(normalizationFareRequests);
      return await getNormalizationMarket(db, marketId);
    },
    deleteNormalizationMarket: async (_, {
      id
    }, {
      db
    }) => {
      await db.raw(`SELECT discount_normalisation_market_delete(${id})`);
      return id;
    }
  }
};

const getNormalization = async (db, id) => {
  const [normalization] = await db('discountnormalisation as n').select({
    id: 'n.id',
    usageFrom: 'n.usagefrom',
    usageTo: 'n.usageto',
    effectiveFrom: 'n.effectivefrom',
    effectiveTo: 'n.effectiveto',
    created: 'n.created',
    createdby: 'n.createdby',
    marketCount: db.raw(`
      (SELECT COUNT(*) FROM discountnormalisationmarket as m WHERE m.normalisationid = n.id and m.isdeleted = FALSE)
    `)
  }).where('id', id);
  return normalization;
};

const getNormalizationMarket = async (db, id) => {
  const [normalizationMarket] = await db('discountnormalisationmarket').select({
    id: 'id',
    marketA: 'marketa',
    marketB: 'marketb',
    farePaid: 'farepaid',
    usageOverride: 'usageoverride',
    farePullDate: 'farepulldate',
    notes: 'notes'
  }).where('id', id);
  const normalizationFareList = await db('discountnormalisationfare').select({
    id: 'id',
    fareType: 'faretype',
    fareBasis: 'farebasis',
    amount: 'amount',
    currencyCode: 'currencycode',
    directionType: 'directiontype',
    advancePurchase: 'advancepurchase',
    minstay: 'minstay'
  }).where('normalisationmarketid', normalizationMarket.id);
  normalizationMarket.fareList = normalizationFareList;
  return normalizationMarket;
};

const advancedTicketList = () => [{
  label: '0-2',
  value: Math.floor(Math.random() * 100) / 100
}, {
  label: '3-4',
  value: Math.floor(Math.random() * 100) / 100
}, {
  label: '7-10',
  value: Math.floor(Math.random() * 100) / 100
}, {
  label: '14-20',
  value: Math.floor(Math.random() * 100) / 100
}, {
  label: '21+',
  value: Math.floor(Math.random() * 100) / 100
}];

const departureList = () => [{
  label: 'Sunday',
  value: Math.floor(Math.random() * 100) / 100
}, {
  label: 'Monday',
  value: Math.floor(Math.random() * 100) / 100
}, {
  label: 'Tuesday',
  value: Math.floor(Math.random() * 100) / 100
}, {
  label: 'Wednesday',
  value: Math.floor(Math.random() * 100) / 100
}, {
  label: 'Thursday',
  value: Math.floor(Math.random() * 100) / 100
}, {
  label: 'Friday',
  value: Math.floor(Math.random() * 100) / 100
}, {
  label: 'Saturday',
  value: Math.floor(Math.random() * 100) / 100
}];

const fareBasisList = () => [{
  fareBasis: 'DGFBLM',
  bookingClass: 'D',
  usage: Math.floor(Math.random() * 100) / 100
}, {
  fareBasis: 'J1NQO4C5',
  bookingClass: 'D',
  usage: Math.floor(Math.random() * 100) / 100
}];

/***/ }),

/***/ "./resolvers/contract/note.js":
/*!************************************!*\
  !*** ./resolvers/contract/note.js ***!
  \************************************/
/*! exports provided: note */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "note", function() { return note; });
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid/v4 */ "uuid/v4");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./utils/index.js");


const note = {
  Query: {
    noteList: async (_, {
      parentId,
      parentTable
    }, {
      db
    }) => parentId ? await getNoteList(db, parentId, parentTable) : []
  },
  Mutation: {
    addNote: async (_, {
      parentId,
      parentTable,
      important,
      text,
      assignedToId
    }, {
      db,
      user
    }) => {
      const parentNoteId = await updateNoteStatus(db, user, parentId, parentTable, important);
      const [id] = text ? await db('usernote').insert({
        id: uuid_v4__WEBPACK_IMPORTED_MODULE_0___default()(),
        text,
        important,
        lastupdate: new Date(),
        lastupdatedby: user.id,
        assignee: user.id,
        assignedto: assignedToId,
        parentnoteid: parentNoteId
      }, 'id') : [null];
      if (!id) return null;
      const [note] = await getNote(db, id);
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["sendNoteEmail"])(db, parentId, parentTable, assignedToId);
      return note;
    },
    editNote: async (_, {
      parentId,
      parentTable,
      important,
      text,
      assignedToId,
      noteId
    }, {
      db,
      user
    }) => {
      await updateNoteStatus(db, user, parentId, parentTable, important);
      await db('usernote').update({
        text,
        assignedto: assignedToId
      }).where('id', noteId);
      const [note] = await getNote(db, noteId);
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["sendNoteEmail"])(db, parentId, parentTable, assignedToId);
      return note;
    },
    deleteNote: async (_, {
      parentId,
      parentTable,
      resetImportant,
      noteId,
      important
    }, {
      db,
      user
    }) => {
      const {
        assignedto: assignedToId
      } = await db('usernote').where('id', noteId).first();
      await db('usernote').where('id', noteId).del();

      if (resetImportant) {
        await updateNoteStatus(db, user, parentId, parentTable, important);
      }

      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["sendNoteEmail"])(db, parentId, parentTable, assignedToId);
      return noteId;
    }
  }
};

const getNoteList = async (db, parentId, parentTable) => await db('usernote as u').select({
  id: 'u.id',
  text: 'u.text',
  lastUpdate: 'u.lastupdate',
  assigneeId: 'u.assignee',
  assigneeName: db.raw("CONCAT(b1.name_first, ' ', b1.name_last)"),
  assignedToId: 'u.assignedto',
  assignedToName: db.raw("CONCAT(b2.name_first, ' ', b2.name_last)")
}).innerJoin('blops.advito_user as b1', 'u.assignee', 'b1.id').innerJoin('blops.advito_user as b2', 'u.assignedto', 'b2.id').whereRaw('parentnoteid = (SELECT id from usernote where parentid = ? and parenttable = ?)', [parentId, parentTable]).orderBy('lastUpdate', 'desc');

const getNote = async (db, id) => await db('usernote as u').select({
  id: 'u.id',
  text: 'u.text',
  lastUpdate: 'u.lastupdate',
  assigneeId: 'u.assignee',
  assigneeName: db.raw("CONCAT(b1.name_first, ' ', b1.name_last)"),
  assignedToId: 'u.assignedto',
  assignedToName: db.raw("CONCAT(b2.name_first, ' ', b2.name_last)")
}).innerJoin('blops.advito_user as b1', 'u.assignee', 'b1.id').innerJoin('blops.advito_user as b2', 'u.assignedto', 'b2.id').where('u.id', id);

const updateNoteStatus = async (db, user, parentId, parentTable, important) => {
  const [parentNote] = await db('usernote').select('*').where('parentid', parentId).andWhere('parenttable', parentTable);
  const [parentNoteId] = parentNote ? await db('usernote').update({
    important
  }, 'id').where('parentid', parentId) : await db('usernote').insert({
    id: uuid_v4__WEBPACK_IMPORTED_MODULE_0___default()(),
    text: '',
    important,
    lastupdate: new Date(),
    lastupdatedby: user.id,
    parentid: parentId,
    parenttable: parentTable
  }, 'id');

  if (!parentNote) {
    await db(parentTable).update({
      notesid: parentNoteId
    }).where('id', parentId);
  }

  return parentNoteId;
};

/***/ }),

/***/ "./resolvers/contract/pricingTerm.js":
/*!*******************************************!*\
  !*** ./resolvers/contract/pricingTerm.js ***!
  \*******************************************/
/*! exports provided: pricingTerm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pricingTerm", function() { return pricingTerm; });
const pricingTerm = {
  Query: {
    pricingTermList: async (_, {
      contractId
    }, {
      db
    }) => contractId ? await getPricingTermList(db, contractId) : [],
    pricingTerm: async (_, {
      id
    }, {
      db
    }) => await getPricingTerm(db, id)
  },
  Mutation: {
    createPricingTerm: async (_, {
      contractId,
      name,
      ignore
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT pricingterm_create(
          '${name}',
          ${contractId},
          ${ignore}
        )`);
      const [{
        pricingterm_create: id
      }] = rows;
      return await getPricingTerm(db, id);
    },
    copyPricingTerm: async (_, {
      id,
      name
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT pricingterm_createcopy(${id}, '${name}', null, null)`);
      const [{
        pricingterm_createcopy: newId
      }] = rows;
      return await getPricingTerm(db, newId);
    },
    editPricingTerm: async (_, {
      id,
      name,
      ignore
    }, {
      db
    }) => {
      await db.raw(`SELECT pricingterm_update(
          ${id},
          '${name}',
          ${ignore}
        )`);
      return await getPricingTerm(db, id);
    },
    togglePricingTermQC: async (_, {
      contractId,
      idList
    }, {
      db
    }) => {
      const queries = idList.map(id => db.raw(`
        SELECT pricingterm_toggle_qc(${id})
      `));
      await Promise.all(queries);
      return await getPricingTermList(db, contractId);
    },
    deletePricingTerms: async (_, {
      contractId,
      idList
    }, {
      db
    }) => {
      const queries = idList.map(id => db.raw(`
        SELECT pricingterm_delete(${id})
      `));
      await Promise.all(queries);
      await db.raw(`SELECT pricingterm_update_sequence_all(${contractId})`);
      return idList;
    },
    updateAppliedOrder: async (_, {
      updatePricingTermList
    }, {
      db
    }) => {
      const queries = updatePricingTermList.map(term => db.raw(`
        SELECT pricingterm_update_sequence_single(${term.id}, ${term.appliedOrder})
      `));
      await Promise.all(queries);
    }
  }
};

const getPricingTermList = async (db, contractId) => await db('pricingterm as p').select({
  id: 'p.id',
  contractOrder: 'p.readorder',
  appliedOrder: 'p.sequence',
  name: 'p.name',
  effectiveFrom: db.raw('(select _effectivefrom from pricingterm_effectivedate(p.id))'),
  effectiveTo: db.raw('(select _effectiveto from pricingterm_effectivedate(p.id))'),
  qc: 'p.qc',
  discountCount: db.raw('(SELECT COUNT(*) from discount as d where d.pricingtermid = p.id and d.isdeleted = false)'),
  ignore: 'p.ignore',
  noteImportant: db.raw('COALESCE(n.important, FALSE)'),
  noteContent: db.raw('CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = n.id) = 0 THEN FALSE else TRUE END'),
  discountNoteCount: db.raw(`
        (SELECT COUNT (
          notecount != 0 OR NULL
        )
        FROM (
          SELECT (
            SELECT COUNT ( * ) FROM usernote WHERE discount.notesid = usernote.parentnoteid
          ) as notecount
          FROM discount WHERE pricingtermid = p.id AND isdeleted = FALSE
        ) as count)`),
  pointOfOriginList: db.raw('(select * from pricingterm_pointoforigin_getlist(p.id))'),
  pointOfSaleList: db.raw('(select * from pricingterm_pointofsale_getlist(p.id))'),
  airlineList: db.raw('(select * from pricingterm_carrier_getlist(p.id))')
}).leftJoin('usernote as n', 'p.notesid', 'n.id').where('p.isdeleted', false).andWhere('p.contractcontainerid', contractId).groupBy('p.id', 'n.important', 'n.id');

const getPricingTerm = async (db, id) => {
  const [pricingTerm] = await db('pricingterm as p').select({
    id: 'p.id',
    contractOrder: 'p.readorder',
    appliedOrder: 'p.sequence',
    name: 'p.name',
    effectiveFrom: db.raw('(select _effectivefrom from pricingterm_effectivedate(p.id))'),
    effectiveTo: db.raw('(select _effectiveto from pricingterm_effectivedate(p.id))'),
    qc: 'p.qc',
    discountCount: db.raw('(SELECT COUNT(*) from discount as d where d.pricingtermid = p.id and d.isdeleted = false)'),
    ignore: 'p.ignore',
    noteImportant: db.raw('COALESCE(n.important, FALSE)'),
    noteContent: db.raw('CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = n.id) = 0 THEN FALSE else TRUE END'),
    discountNoteCount: db.raw(`
        (SELECT COUNT (
          notecount != 0 OR NULL
        )
        FROM (
          SELECT (
            SELECT COUNT ( * ) FROM usernote WHERE discount.notesid = usernote.parentnoteid
          ) as notecount
          FROM discount WHERE pricingtermid = p.id AND isdeleted = FALSE
        ) as count)`),
    pointOfOriginList: db.raw('(select * from pricingterm_pointoforigin_getlist(p.id))'),
    pointOfSaleList: db.raw('(select * from pricingterm_pointofsale_getlist(p.id))'),
    airlineList: db.raw('(select * from pricingterm_carrier_getlist(p.id))')
  }).leftJoin('usernote as n', 'p.notesid', 'n.id').where('p.isdeleted', false).andWhere('p.id', id).groupBy('p.id', 'n.important', 'n.id');
  return pricingTerm;
};

/***/ }),

/***/ "./resolvers/contract/rule.js":
/*!************************************!*\
  !*** ./resolvers/contract/rule.js ***!
  \************************************/
/*! exports provided: rule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rule", function() { return rule; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const rule = {
  Query: {
    ruleList: async (_, {
      parentId,
      parentType
    }, {
      db
    }) => {
      const ruleContainerId = await getRuleContainerId(db, parentId, parentType);
      if (!ruleContainerId) return [];
      const {
        rows
      } = await db.raw(`SELECT tableid from rules_checker('${ruleContainerId}')`);
      return rows.map(row => row.tableid);
    },
    bookingClassCodeList: async (_, __, {
      db
    }) => await db('bookingclass').select({
      fareCategoryId: 'farecategoryid',
      code: 'code'
    }).where('isdeleted', false),
    airlineCodeList: async (_, __, {
      db
    }) => await db('carrier').select({
      name: 'name',
      code: 'code'
    }).where('isdeleted', false),
    dayOfWeekUnitList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].DAY_OF_WEEK_UNIT),
    dayUnitList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].DAY_UNIT),
    fareCategoryUnitList: async (_, __, {
      db
    }) => await db('farecategory').select({
      id: 'id',
      cabinId: 'cabinid',
      code: 'code',
      name: 'name',
      shortName: 'shortname'
    }),
    fareBasisUnitList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].FARE_BASIS_TYPE),
    ticketingDateList: async (_, {
      parentId,
      parentType
    }, {
      db
    }) => await getRuleList(db, parentId, parentType, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].TICKET_DATE),
    travelDateList: async (_, {
      parentId,
      parentType
    }, {
      db
    }) => await getRuleList(db, parentId, parentType, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].TRAVEL_DATE),
    pointOfSaleList: async (_, {
      parentId,
      parentType
    }, {
      db
    }) => await getRuleList(db, parentId, parentType, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].POINT_OF_SALE),
    pointOfOriginList: async (_, {
      parentId,
      parentType
    }, {
      db
    }) => await getRuleList(db, parentId, parentType, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].POINT_OF_ORIGIN),
    marketRuleList: async (_, {
      parentId,
      parentType
    }, {
      db
    }) => await getRuleList(db, parentId, parentType, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].MARKET),
    bookingClassRuleList: async (_, {
      parentId,
      bookingClassType = 1
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].BOOKING_CLASS, bookingClassType),
    airlineRuleList: async (_, {
      parentId,
      parentType,
      airlineType = 1
    }, {
      db
    }) => await getRuleList(db, parentId, parentType, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].AIRLINE, airlineType),
    ticketDesignatorList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].TICKET_DESIGNATOR),
    tourCodeList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].TOUR_CODE),
    stopsList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].STOPS),
    advancedTicketingList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].ADVANCED_TICKETING),
    minStayList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].MIN_STAY),
    maxStayList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].MAX_STAY),
    dayOfWeekList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].DAY_OF_WEEK),
    flightNumberList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].FLIGHT_NUMBER),
    connectionPointList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].CONNECTION_POINT),
    distanceList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].DISTANCE),
    cabinList: async (_, {
      parentId,
      parentType = _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].RULE_TYPE
    }, {
      db
    }) => await getRuleList(db, parentId, parentType, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].CABIN),
    fareCategoryList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].FARE_CATEGORY),
    blackoutList: async (_, {
      parentId
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].BLACKOUT),
    fareBasisList: async (_, {
      parentId,
      fareBasisType
    }, {
      db
    }) => await getRuleList(db, parentId, undefined, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].FARE_BASIS, fareBasisType)
  },
  Mutation: {
    updateTicketingDate: async (_, {
      parentId,
      parentType,
      ticketingDateList
    }, {
      db
    }) => await updateRule(db, parentId, parentType, ticketingDateList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].TICKET_DATE),
    updateTravelDate: async (_, {
      parentId,
      parentType,
      travelDateList
    }, {
      db
    }) => await updateRule(db, parentId, parentType, travelDateList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].TRAVEL_DATE),
    updatePointOfSale: async (_, {
      parentId,
      parentType,
      pointOfSaleList
    }, {
      db
    }) => await updateRule(db, parentId, parentType, pointOfSaleList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].POINT_OF_SALE),
    updatePointOfOrigin: async (_, {
      parentId,
      parentType,
      pointOfOriginList
    }, {
      db
    }) => await updateRule(db, parentId, parentType, pointOfOriginList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].POINT_OF_ORIGIN),
    updateMarketRule: async (_, {
      parentId,
      parentType,
      marketRuleList
    }, {
      db
    }) => await updateRule(db, parentId, parentType, marketRuleList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].MARKET),
    updateBookingClass: async (_, {
      parentId,
      bookingClassType = 1,
      bookingClassList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, bookingClassList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].BOOKING_CLASS, bookingClassType),
    updateAirlineRule: async (_, {
      parentId,
      parentType,
      airlineType = 1,
      airlineRuleList
    }, {
      db
    }) => await updateRule(db, parentId, parentType, airlineRuleList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].AIRLINE, airlineType),
    updateTicketDesignator: async (_, {
      parentId,
      ticketDesignatorList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, ticketDesignatorList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].TICKET_DESIGNATOR),
    updateTourCode: async (_, {
      parentId,
      tourCodeList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, tourCodeList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].TOUR_CODE),
    updateStops: async (_, {
      parentId,
      stopsList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, stopsList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].STOPS),
    updateAdvancedTicketing: async (_, {
      parentId,
      advancedTicketingList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, advancedTicketingList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].ADVANCED_TICKETING),
    updateMinStay: async (_, {
      parentId,
      minStayList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, minStayList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].MIN_STAY),
    updateMaxStay: async (_, {
      parentId,
      maxStayList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, maxStayList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].MAX_STAY),
    updateDayOfWeek: async (_, {
      parentId,
      dayOfWeekList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, dayOfWeekList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].DAY_OF_WEEK),
    updateFlightNumber: async (_, {
      parentId,
      flightNumberList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, flightNumberList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].FLIGHT_NUMBER),
    updateConnectionPoint: async (_, {
      parentId,
      connectionPointList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, connectionPointList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].CONNECTION_POINT),
    updateDistance: async (_, {
      parentId,
      distanceList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, distanceList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].DISTANCE),
    updateCabin: async (_, {
      parentId,
      parentType = _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].RULE_TYPE,
      cabinList
    }, {
      db
    }) => await updateRule(db, parentId, parentType, cabinList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].CABIN),
    updateFareCategory: async (_, {
      parentId,
      fareCategoryList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, fareCategoryList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].FARE_CATEGORY),
    updateBlackout: async (_, {
      parentId,
      blackoutList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, blackoutList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].BLACKOUT),
    updateFareBasis: async (_, {
      parentId,
      fareBasisType = 1,
      fareBasisList
    }, {
      db
    }) => await updateRule(db, parentId, undefined, fareBasisList, _constants__WEBPACK_IMPORTED_MODULE_0__["RULE_LOOKUP"].FARE_BASIS, fareBasisType),
    deleteRule: async (_, {
      id,
      ruleType
    }, {
      db
    }) => {
      const {
        tableName
      } = getRuleInfo(ruleType);
      await db.raw(`SELECT rule_delete(${id}, '${tableName}')`);
    }
  }
};

const getRuleContainerId = async (db, parentId, parentType) => {
  if (!parentId) return null;
  const table = getParentTable(parentType);
  if (!table) return null;
  const [parent] = await db(table).select('rulescontainerguidref').where('id', parentId);
  if (!parent) return null;
  const {
    rulescontainerguidref: ruleContainerId
  } = parent;
  return ruleContainerId;
};

const getParentTable = (parentType = _constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT_LOOKUP"].RULE_TYPE) => parentType === _constants__WEBPACK_IMPORTED_MODULE_0__["DISCOUNT_LOOKUP"].RULE_TYPE ? 'discount' : parentType === _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].RULE_TYPE ? 'targetterm_v2' : null;

const getRuleList = async (db, parentId, parentType, ruleType, type) => {
  const ruleInfo = getRuleInfo(ruleType);
  const ruleContainerId = await getRuleContainerId(db, parentId, parentType);
  if (!ruleContainerId) return [];
  const select = {
    id: 'id',
    ruleContainerId: 'rulescontainerguidref',
    isDeleted: 'isdeleted'
  };
  return type ? await db(ruleInfo.tableName).select({ ...select,
    ...ruleInfo.select
  }).where('rulescontainerguidref', ruleContainerId).where(ruleInfo.type, type).andWhere('isdeleted', false) : await db(ruleInfo.tableName).select({ ...select,
    ...ruleInfo.select
  }).where('rulescontainerguidref', ruleContainerId).andWhere('isdeleted', false);
};

const updateRule = async (db, parentId, parentType, ruleList, ruleType, type) => {
  const ruleInfo = getRuleInfo(ruleType);
  const parentTable = getParentTable(parentType);
  const queries = ruleList.map(rule => db.raw(`
        SELECT ${ruleInfo.update}(
          ${parentId},
          '${parentTable}',
          ${rule.id},
          ${rule.ruleContainerId ? `'${rule.ruleContainerId}'` : null},
          ${ruleInfo.params.map(param => {
    return param.type === 'string' ? `${rule[param.name] ? `'${rule[param.name]}'` : null}` : param.type === 'date' ? `${new Date(rule[param.name]).toISOString() ? `'${new Date(rule[param.name]).toISOString()}'` : null}` : `${rule[param.name]}`;
  })},
          ${rule.isDeleted}
        )
      `));
  await Promise.all(queries);
  return await getRuleList(db, parentId, parentType, ruleType, type);
};

const getRuleInfo = id => {
  if (id === 1) {
    return {
      tableName: 'ticketdaterule',
      select: {
        startDate: 'startdate',
        endDate: 'enddate'
      },
      update: 'ticketdaterule_create_update',
      params: [{
        name: 'startDate',
        type: 'date'
      }, {
        name: 'endDate',
        type: 'date'
      }]
    };
  } else if (id === 2) {
    return {
      tableName: 'traveldaterule',
      select: {
        startDate: 'startdate',
        endDate: 'enddate'
      },
      update: 'traveldaterule_create_update',
      params: [{
        name: 'startDate',
        type: 'date'
      }, {
        name: 'endDate',
        type: 'date'
      }]
    };
  } else if (id === 3) {
    return {
      tableName: 'pointofsale',
      select: {
        countryCode: 'countrycode'
      },
      update: 'pointofsale_update',
      params: [{
        name: 'countryCode',
        type: 'string'
      }]
    };
  } else if (id === 4) {
    return {
      tableName: 'pointoforigin',
      select: {
        countryCode: 'countrycode'
      },
      update: 'pointoforigin_update',
      params: [{
        name: 'countryCode',
        type: 'string'
      }]
    };
  } else if (id === 5) {
    return {
      tableName: 'geographyrule',
      select: {
        origin: 'origin',
        originType: 'origintype',
        arrival: 'arrival',
        arrivalType: 'arrivaltype',
        exclude: 'exclude'
      },
      update: 'geographyrule_update',
      params: [{
        name: 'origin',
        type: 'string'
      }, {
        name: 'originType',
        type: 'int'
      }, {
        name: 'arrival',
        type: 'string'
      }, {
        name: 'arrivalType',
        type: 'int'
      }, {
        name: 'exclude',
        type: 'boolean'
      }]
    };
  } else if (id === 6 || id === 7) {
    return {
      tableName: 'farebasis_list',
      type: 'type',
      select: {
        name: 'name',
        type: 'type',
        matchExclude: 'matchexclude',
        matchValue: 'matchvalue',
        endsWithExclude: 'endswithexclude',
        endsWithValue: 'endswithvalue',
        startsWithExclude: 'startswithexclude',
        startsWithValue: 'startswithvalue',
        containsExclude: 'containsexclude',
        containsValue: 'containsvalue',
        containsPosition: 'containsposition',
        containsMultipleExclude: 'containsmultipleexclude',
        containsMultipleValue: 'containsmultiplevalue',
        containsMultiplePosition: 'containsmultipleposition'
      },
      update: 'farebasis_update',
      params: [{
        name: 'name',
        type: 'string'
      }, {
        name: 'type',
        type: 'int'
      }, {
        name: 'basisType',
        type: 'int'
      }, {
        name: 'matchExclude',
        type: 'string'
      }, {
        name: 'matchValue',
        type: 'string'
      }, {
        name: 'endsWithExclude',
        type: 'boolean'
      }, {
        name: 'endsWithValue',
        type: 'string'
      }, {
        name: 'startsWithExclude',
        type: 'boolean'
      }, {
        name: 'startsWithValue',
        type: 'string'
      }, {
        name: 'containsExclude',
        type: 'boolean'
      }, {
        name: 'containsValue',
        type: 'string'
      }, {
        name: 'containsPosition',
        type: 'int'
      }, {
        name: 'containsMultipleExclude',
        type: 'boolean'
      }, {
        name: 'containsMultipleValue',
        type: 'string'
      }, {
        name: 'containsMultiplePosition',
        type: 'int'
      }]
    };
  } else if (id === 8 || id === 9) {
    return {
      tableName: 'bookingclassrule',
      select: {
        exclude: 'exclude',
        bookingClassType: 'bookingclasstype',
        bookingClass: 'bookingclass'
      },
      type: 'bookingclasstype',
      update: 'bookingclassrule_update',
      params: [{
        name: 'exclude',
        type: 'boolean'
      }, {
        name: 'bookingClassType',
        type: 'int'
      }, {
        name: 'bookingClass',
        type: 'string'
      }]
    };
  } else if (id === 10 || id === 11 || id === 12) {
    return {
      tableName: 'carrierrule',
      select: {
        exclude: 'exclude',
        ruleType: 'ruletype',
        carrierCode: 'carriercode'
      },
      type: 'ruletype',
      update: 'carrierrule_update',
      params: [{
        name: 'exclude',
        type: 'boolean'
      }, {
        name: 'ruleType',
        type: 'int'
      }, {
        name: 'carrierCode',
        type: 'string'
      }]
    };
  } else if (id === 13) {
    return {
      tableName: 'ticketdesignatorrule',
      select: {
        ticketDesignator: 'ticketdesignator'
      },
      update: 'ticketdesignatorrule_update',
      params: [{
        name: 'ticketDesignator',
        type: 'string'
      }]
    };
  } else if (id === 14) {
    return {
      tableName: 'tourcoderule',
      select: {
        tourCode: 'tourcode'
      },
      update: 'tourcoderule_update',
      params: [{
        name: 'tourCode',
        type: 'string'
      }]
    };
  } else if (id === 15) {
    return {
      tableName: 'advancepurchaserule',
      select: {
        unit: 'unit',
        startRange: 'startrange',
        endRange: 'endrange'
      },
      update: 'advancepurchaserule_update',
      params: [{
        name: 'unit',
        type: 'int'
      }, {
        name: 'startRange',
        type: 'int'
      }, {
        name: 'endRange',
        type: 'int'
      }]
    };
  } else if (id === 16) {
    return {
      tableName: 'minstayrule',
      select: {
        unit: 'unit',
        value: 'value',
        dayOfWeekInclusion: 'dayofweekinclusion'
      },
      update: 'minstayrule_update',
      params: [{
        name: 'unit',
        type: 'int'
      }, {
        name: 'value',
        type: 'int'
      }, {
        name: 'dayOfWeekInclusion',
        type: 'int'
      }]
    };
  } else if (id === 17) {
    return {
      tableName: 'maxstayrule',
      select: {
        unit: 'unit',
        value: 'value'
      },
      update: 'maxstayrule_update',
      params: [{
        name: 'unit',
        type: 'int'
      }, {
        name: 'value',
        type: 'int'
      }]
    };
  } else if (id === 18) {
    return {
      tableName: 'dayofweekrule',
      select: {
        exclude: 'exclude',
        startDay: 'startday',
        startTime: 'starttime',
        endDay: 'endday',
        endTime: 'endtime'
      },
      update: 'dayofweekrule_update',
      params: [{
        name: 'exclude',
        type: 'boolean'
      }, {
        name: 'startDay',
        type: 'int'
      }, {
        name: 'startTime',
        type: 'string'
      }, {
        name: 'endDay',
        type: 'int'
      }, {
        name: 'endTime',
        type: 'string'
      }]
    };
  } else if (id === 19) {
    return {
      tableName: 'stopsrule',
      select: {
        minStops: 'minstops',
        maxStops: 'maxstops'
      },
      update: 'stopsrule_update',
      params: [{
        name: 'minStops',
        type: 'int'
      }, {
        name: 'maxStops',
        type: 'int'
      }]
    };
  } else if (id === 20) {
    return {
      tableName: 'connectionrule',
      select: {
        exclude: 'exclude',
        connection: 'connection',
        connectionGeoType: 'connectiongeotype'
      },
      update: 'connectionrule_update',
      params: [{
        name: 'exclude',
        type: 'boolean'
      }, {
        name: 'connection',
        type: 'string'
      }, {
        name: 'connectionGeoType',
        type: 'int'
      }]
    };
  } else if (id === 21) {
    return {
      tableName: 'flightnumberrule',
      select: {
        exclude: 'exclude',
        segmentType: 'segmenttype',
        carrierCode: 'carriercode',
        startRange: 'startrange',
        endRange: 'endrange'
      },
      update: 'flightnumberrule_update',
      params: [{
        name: 'exclude',
        type: 'boolean'
      }, {
        name: 'segmentType',
        type: 'int'
      }, {
        name: 'carrierCode',
        type: 'string'
      }, {
        name: 'startRange',
        type: 'int'
      }, {
        name: 'endRange',
        type: 'int'
      }]
    };
  } else if (id === 22) {
    return {
      tableName: 'blackoutdaterule',
      select: {
        startDate: 'startdate',
        endDate: 'enddate'
      },
      update: 'blackoutdaterule_update',
      params: [{
        name: 'startDate',
        type: 'date'
      }, {
        name: 'endDate',
        type: 'date'
      }]
    };
  } else if (id === 23) {
    return {
      tableName: 'distancerule',
      select: {
        distanceUnit: 'distanceunit',
        minDistance: 'mindistance',
        maxDistance: 'maxdistance'
      },
      update: 'distancerule_update',
      params: [{
        name: 'distanceUnit',
        type: 'int'
      }, {
        name: 'minDistance',
        type: 'int'
      }, {
        name: 'maxDistance',
        type: 'int'
      }]
    };
  } else if (id === 24) {
    return {
      tableName: 'cabinrule',
      select: {
        exclude: 'exclude',
        cabin: 'cabin'
      },
      update: 'cabinrule_update',
      params: [{
        name: 'exclude',
        type: 'boolean'
      }, {
        name: 'cabin',
        type: 'string'
      }]
    };
  } else if (id === 25) {
    return {
      tableName: 'farecategoryrule',
      select: {
        exclude: 'exclude',
        fareCategory: 'farecategory'
      },
      update: 'farecategoryrule_update',
      params: [{
        name: 'exclude',
        type: 'boolean'
      }, {
        name: 'fareCategory',
        type: 'int'
      }]
    };
  }
};

/***/ }),

/***/ "./resolvers/contract/targetLevel.js":
/*!*******************************************!*\
  !*** ./resolvers/contract/targetLevel.js ***!
  \*******************************************/
/*! exports provided: targetLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetLevel", function() { return targetLevel; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");

const targetLevel = {
  Query: {
    targetLevelList: async (_, {
      targetTermId
    }, {
      db
    }) => await getTargetLevelList(db, targetTermId),
    targetLevel: async (_, {
      id,
      targetTermId
    }, {
      db
    }) => await getTargetLevel(db, id, targetTermId)
  },
  Mutation: {
    createTargetLevel: async (_, {
      targetTermId,
      targetAmount,
      scoringTarget,
      incentiveDescription
    }, {
      db
    }) => {
      const targetLevelName = await getTargetLevelName(db, targetTermId);
      await db.raw(`SELECT targetlevel_create(
        '${targetLevelName.tableName}',
        ${targetTermId},
        '${targetLevelName.targetAmount}',
        ${targetLevelName.targetAmount === 'numberofsegments' ? targetAmount : targetAmount / 100},
        '${incentiveDescription}',
        ${scoringTarget},
        ${1}
      )`);
    },
    editTargetLevel: async (_, {
      id,
      targetTermId,
      targetAmount,
      scoringTarget,
      incentiveDescription
    }, {
      db
    }) => {
      const targetLevelName = await getTargetLevelName(db, targetTermId);
      await db.raw(`SELECT targetlevel_update(
        '${id}',
        '${targetLevelName.tableName}',
        ${targetTermId},
        '${targetLevelName.targetAmount}',
        ${targetLevelName.targetAmount === 'numberofsegments' ? targetAmount : targetAmount / 100},
        '${incentiveDescription}',
        ${scoringTarget},
        ${1}
      )`);
      return await getTargetLevelList(db, targetTermId);
    },
    toggleTargetLevel: async (_, {
      id,
      targetTermId
    }, {
      db
    }) => {
      const targetLevel = await getTargetLevelName(db, targetTermId);
      await db.raw(`SELECT targetlevel_toggle('${targetLevel.tableName}', '${id}', ${targetTermId})`);
      return await getTargetLevelList(db, targetTermId);
    },
    deleteTargetLevel: async (_, {
      id,
      targetTermId
    }, {
      db
    }) => {
      const targetLevel = await getTargetLevelName(db, targetTermId);
      await db.raw(`SELECT targetlevel_delete('${targetLevel.tableName}', '${id}')`);
      return id;
    }
  }
};

const getTargetLevelList = async (db, targetTermId) => {
  const targetLevel = await getTargetLevelName(db, targetTermId);
  return await db(targetLevel.tableName).select({
    id: 'control',
    targetTermId: 'targettermid',
    targetAmount: targetLevel.targetAmount,
    scoringTarget: 'overallscore',
    incentiveDescription: 'incentivedescription'
  }).orderBy('control').where('isdeleted', false).andWhere('targettermid', targetTermId);
};

const getTargetLevel = async (db, id, targetTermId) => {
  const targetLevel = await getTargetLevelName(db, targetTermId);
  const [level] = await db(targetLevel.tableName).select({
    id: 'control',
    targetTermId: 'targettermid',
    targetAmount: targetLevel.targetAmount,
    scoringTarget: 'overallscore',
    incentiveDescription: 'incentivedescription'
  }).orderBy('control').where('control', id);
  return level;
};

const getTargetLevelName = async (db, targetTermId) => {
  const [targetTerm] = await db('targetterm_v2').select('targettype').where('id', targetTermId);
  if (!targetTerm) return null;
  const targetType = parseInt(targetTerm.targettype);

  if (targetType === _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SEGMENT_SHARE) {
    return {
      tableName: 'targetsegmentshare_v2',
      targetAmount: 'segmentsshare'
    };
  } else if (targetType === _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].REVENUE_SHARE) {
    return {
      tableName: 'targetrevenueshare_v2',
      targetAmount: 'numberofsegments'
    };
  } else if (targetType === _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SHARE_GAP) {
    return {
      tableName: 'targetsegmentsharegap_v2',
      targetAmount: 'segmentssharegap'
    };
  } else if (targetType === _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SEGMENT) {
    return {
      tableName: 'targetsegment_v2',
      targetAmount: 'numberofsegments'
    };
  } else if (targetType === _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].REVENUE) {
    return {
      tableName: 'targetrevenue_v2',
      targetAmount: 'amount'
    };
  } else if (targetType === _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].KPG) {
    return {
      tableName: 'targetkpg',
      targetAmount: 'targetsegmentshare'
    };
  }
};

/***/ }),

/***/ "./resolvers/contract/targetTerm.js":
/*!******************************************!*\
  !*** ./resolvers/contract/targetTerm.js ***!
  \******************************************/
/*! exports provided: targetTerm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetTerm", function() { return targetTerm; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./constants/index.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data */ "./data/index.js");


const targetTerm = {
  Query: {
    targetTermList: async (_, {
      contractId
    }, {
      db
    }) => contractId ? await getTargetTermList(db, contractId) : [],
    targetTerm: async (_, {
      id
    }, {
      db
    }) => await getTargetTerm(db, id),
    targetLevelList: (_, {
      targetTermId
    }) => _data__WEBPACK_IMPORTED_MODULE_1__["targetLevelList"].filter(t => t.targetTermId === targetTermId),
    targetTypeList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].TARGET_TYPE),
    incentiveTypeList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].INCENTIVE_TYPE)
  },
  Mutation: {
    createTargetTerm: async (_, {
      contractId,
      name,
      targetTypeId,
      timeframe,
      cabinF,
      cabinC,
      cabinP,
      cabinY,
      incentiveTypeId,
      currencyId,
      softTarget,
      internalTarget,
      qsi,
      dpmPrice,
      dpmStartDate,
      baselineDateFrom,
      baselineDateTo,
      goalDateFrom,
      goalDateTo,
      airlineGroupFrom,
      airlineGroupTo,
      fareCategoryFrom,
      fareCategoryTo
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT targetterm_create(
          ${contractId},
          '${name}',
          ${targetTypeId},
          ${timeframe ? timeframe : 0},
          ${cabinF},
          ${cabinC},
          ${cabinP},
          ${cabinY},
          ${incentiveTypeId},
          ${currencyId},
          ${softTarget},
          ${internalTarget},
          ${qsi},
          ${dpmPrice},
          ${dpmStartDate ? `'${dpmStartDate}'` : null},
          ${baselineDateFrom ? `'${baselineDateFrom}'` : null},
          ${baselineDateTo ? `'${baselineDateTo}'` : null},
          ${goalDateFrom ? `'${goalDateFrom}'` : null},
          ${goalDateTo ? `'${goalDateTo}'` : null},
          ${airlineGroupFrom ? `'${airlineGroupFrom}'` : null},
          ${airlineGroupTo ? `'${airlineGroupTo}'` : null},
          ${fareCategoryFrom ? `'${fareCategoryFrom}'` : null},
          ${fareCategoryTo ? `'${fareCategoryTo}'` : null}
        )`);
      const [{
        targetterm_create: id
      }] = rows;
      return await getTargetTerm(db, id);
    },
    copyTargetTerm: async (_, {
      id,
      name
    }, {
      db
    }) => {
      const {
        rows
      } = await db.raw(`SELECT targetterm_v2_createcopy(
          ${id},
          '${name}',
          null,
          null,
          null,
          null
        )`);
      const [{
        targetterm_v2_createcopy: newId
      }] = rows;
      return await getTargetTerm(db, newId);
    },
    editTargetTerm: async (_, {
      id,
      name,
      timeframe,
      cabinF,
      cabinC,
      cabinP,
      cabinY,
      currencyId,
      softTarget,
      internalTarget,
      qsi,
      dpmPrice,
      dpmStartDate,
      baselineDateFrom,
      baselineDateTo,
      goalDateFrom,
      goalDateTo,
      airlineGroupFrom,
      airlineGroupTo,
      fareCategoryFrom,
      fareCategoryTo
    }, {
      db
    }) => {
      await db.raw(`SELECT targetterm_update(
          ${id},
          '${name}',
          ${timeframe ? timeframe : 0},
          ${cabinF},
          ${cabinC},
          ${cabinP},
          ${cabinY},
          ${currencyId},
          ${softTarget},
          ${internalTarget},
          ${qsi},
          ${dpmPrice},
          ${dpmStartDate ? `'${dpmStartDate}'` : null},
          ${baselineDateFrom ? `'${baselineDateFrom}'` : null},
          ${baselineDateTo ? `'${baselineDateTo}'` : null},
          ${goalDateFrom ? `'${goalDateFrom}'` : null},
          ${goalDateTo ? `'${goalDateTo}'` : null},
          ${airlineGroupFrom ? `'${airlineGroupFrom}'` : null},
          ${airlineGroupTo ? `'${airlineGroupTo}'` : null},
          ${fareCategoryFrom ? `'${fareCategoryFrom}'` : null},
          ${fareCategoryTo ? `'${fareCategoryTo}'` : null}
        )`);
      return await getTargetTerm(db, id);
    },
    toggleTargetTermQC: async (_, {
      contractId,
      idList
    }, {
      db
    }) => {
      const queries = idList.map(id => db.raw(`
        SELECT targetterm_toggle_qc(${id})
      `));
      await Promise.all(queries);
      return await getTargetTermList(db, contractId);
    },
    deleteTargetTerms: async (_, {
      idList
    }, {
      db
    }) => {
      const queries = idList.map(id => db.raw(`
        SELECT targetterm_delete(${id})
      `));
      await Promise.all(queries);
      return idList;
    }
  }
};

const getTargetTermList = async (db, contractId) => await db('targetterm_getlist_vw').select({
  id: 'targetterm_v2_id',
  name: 'targetterm_v2_name',
  effectiveFrom: db.raw('(select _effectivefrom from targetterm_effectivedate(targetterm_v2_id))'),
  effectiveTo: db.raw('(select _effectiveto from targetterm_effectivedate(targetterm_v2_id))'),
  timeframe: 'periodinmonths',
  qc: 'targetterm_v2_qc',
  targetTypeId: 'targettype',
  targetTypeName: 'l1_name_val',
  cabinF: 'targetterm_v2_cabinf',
  cabinC: 'targetterm_v2_cabinc',
  cabinP: 'targetterm_v2_cabinp',
  cabinY: 'targetterm_v2_cabiny',
  qsi: 'servedmarketqsithreshold',
  incentiveTypeId: 'l2_id',
  incentiveTypeName: 'l2_name_val',
  softTarget: 'targetterm_v2_softtarget',
  internalTarget: 'targetterm_v2_internaltarget',
  currencyId: 'currency',
  targetAmount: db.raw(`
        case when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SEGMENT_SHARE} then (select segmentsshare
          from targetsegmentshare_v2
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false)
        when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].REVENUE_SHARE} then (select numberofsegments
          from targetrevenueshare_v2
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false)
        when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SEGMENT} then (select numberofsegments
          from targetsegment_v2
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false)
        when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].REVENUE} then (select amount 
          from targetrevenue_v2
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false)
        when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SHARE_GAP} then  (select segmentssharegap
          from targetsegmentsharegap_v2 
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false)
        when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].KPG} then (select targetsegmentshare  
          from targetkpg
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false) end`),
  levelCount: db.raw(`
          case when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SEGMENT_SHARE} then   (select count(*)
            from targetsegmentshare_v2
            where targettermid = targetterm_v2_id
            and isdeleted = false)
          when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].REVENUE_SHARE} then   (select count(*)
            from targetrevenueshare_v2
            where targettermid = targetterm_v2_id
            and isdeleted = false)
          when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SEGMENT} then  ( select count(*)
            from targetsegment_v2
            where targettermid = targetterm_v2_id
            and isdeleted = false)
          when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].REVENUE} then   (select count(*)
            from targetrevenue_v2
            where targettermid = targetterm_v2_id
            and isdeleted = false)
          when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SHARE_GAP} then  ( select count(*)
            from targetsegmentsharegap_v2 
            where targettermid = targetterm_v2_id
            and isdeleted = false)
          when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].KPG} then (select count(*)
            from targetkpg
            where targettermid = targetterm_v2_id
            and isdeleted = false) end`),
  ruleCount: db.raw('(SELECT COUNT(*) from (select rules_checker(rulescontainerguidref)) as c)'),
  noteImportant: db.raw('COALESCE(important, FALSE)'),
  noteContent: db.raw('CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = usernote_id) = 0 THEN FALSE else TRUE END '),
  order: 'targetterm_v2_sequence',
  dpmPrice: 'dpmprice',
  dpmStartDate: 'dpmstart',
  baselineDateFrom: 'baselinestart',
  baselineDateTo: 'baselineend',
  goalDateFrom: 'goalstart',
  goalDateTo: 'goalend',
  airlineGroupFrom: 'airlinegrpfrom',
  airlineGroupTo: 'airlinegrpto',
  fareCategoryFrom: 'farecatfrom',
  fareCategoryTo: 'farecatto'
}).where('targetterm_v2_isdeleted', false).andWhere('contractcontainerid', contractId);

const getTargetTerm = async (db, id) => {
  const [targetTerm] = await db('targetterm_getlist_vw').select({
    id: 'targetterm_v2_id',
    name: 'targetterm_v2_name',
    effectiveFrom: db.raw('(select _effectivefrom from targetterm_effectivedate(targetterm_v2_id))'),
    effectiveTo: db.raw('(select _effectiveto from targetterm_effectivedate(targetterm_v2_id))'),
    timeframe: 'periodinmonths',
    qc: 'targetterm_v2_qc',
    targetTypeId: 'targettype',
    targetTypeName: 'l1_name_val',
    cabinF: 'targetterm_v2_cabinf',
    cabinC: 'targetterm_v2_cabinc',
    cabinP: 'targetterm_v2_cabinp',
    cabinY: 'targetterm_v2_cabiny',
    qsi: 'servedmarketqsithreshold',
    incentiveTypeId: 'l2_id',
    incentiveTypeName: 'l2_name_val',
    softTarget: 'targetterm_v2_softtarget',
    internalTarget: 'targetterm_v2_internaltarget',
    currencyId: 'currency',
    targetAmount: db.raw(`
  case when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SEGMENT_SHARE} then (select segmentsshare
    from targetsegmentshare_v2
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false)
  when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].REVENUE_SHARE} then (select numberofsegments
    from targetrevenueshare_v2
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false)
  when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SEGMENT} then (select numberofsegments
    from targetsegment_v2
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false)
  when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].REVENUE} then (select amount 
    from targetrevenue_v2
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false)
  when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SHARE_GAP} then  (select segmentssharegap
    from targetsegmentsharegap_v2 
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false)
  when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].KPG} then (select targetsegmentshare  
    from targetkpg
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false) end`),
    levelCount: db.raw(`
    case when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SEGMENT_SHARE} then   (select count(*)
      from targetsegmentshare_v2
      where targettermid = targetterm_v2_id
      and isdeleted = false)
    when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].REVENUE_SHARE} then   (select count(*)
      from targetrevenueshare_v2
      where targettermid = targetterm_v2_id
      and isdeleted = false)
    when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SEGMENT} then  ( select count(*)
      from targetsegment_v2
      where targettermid = targetterm_v2_id
      and isdeleted = false)
    when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].REVENUE} then   (select count(*)
      from targetrevenue_v2
      where targettermid = targetterm_v2_id
      and isdeleted = false)
    when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].SHARE_GAP} then  ( select count(*)
      from targetsegmentsharegap_v2 
      where targettermid = targetterm_v2_id
      and isdeleted = false)
    when targettype = ${_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_TERM_LOOKUP"].KPG} then (select count(*)
      from targetkpg
      where targettermid = targetterm_v2_id
      and isdeleted = false) end`),
    ruleCount: db.raw('(SELECT COUNT(*) from (select rules_checker(rulescontainerguidref)) as c)'),
    noteImportant: db.raw('COALESCE(important, FALSE)'),
    noteContent: db.raw('CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = usernote_id) = 0 THEN FALSE else TRUE END '),
    order: 'targetterm_v2_sequence',
    dpmPrice: 'dpmprice',
    dpmStartDate: 'dpmstart',
    baselineDateFrom: 'baselinestart',
    baselineDateTo: 'baselineend',
    goalDateFrom: 'goalstart',
    goalDateTo: 'goalend',
    airlineGroupFrom: 'airlinegrpfrom',
    airlineGroupTo: 'airlinegrpto',
    fareCategoryFrom: 'farecatfrom',
    fareCategoryTo: 'farecatto'
  }).where('targetterm_v2_isdeleted', false).andWhere('targetterm_v2_id', id);
  return targetTerm;
};

/***/ }),

/***/ "./resolvers/dataSet.js":
/*!******************************!*\
  !*** ./resolvers/dataSet.js ***!
  \******************************/
/*! exports provided: dataSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataSet", function() { return dataSet; });
const dataSet = {
  Query: {
    dataSetCountryList: async (_, {
      projectId
    }, {
      db
    }) => projectId ? await db('geo_country_stats as g').select({
      id: 'g.id',
      name: 'l.name',
      ticketsTotal: 'g.trend_count_tickets',
      segmentsTotal: 'g.trend_count_segments',
      farePaidTotal: 'g.stat_sum_farepaid',
      importedTicketsTotal: 'g.trend_count_imported',
      errorTicketsTotal: 'g.trend_count_error',
      errorRatioTotal: 'g.stat_ratio_error',
      numberDatasets: db.raw(`(SELECT COUNT(*) from geo_country_stats_activity where geo_country_stats_id = g.id and project_id = ${projectId} and isdeleted = FALSE)`),
      annMonths: 'g.ann_months'
    }).leftJoin('location as l', 'g.geo_country_id', 'l.id').where('g.isdeleted', false).andWhere('g.project_id', projectId).orderBy('g.id') : [],
    dataSetDivisionList: async (_, {
      projectId
    }, {
      db
    }) => projectId ? await db('division_stats as ds').select({
      id: 'ds.id',
      name: 'd.name',
      ticketsTotal: 'ds.trend_count_tickets',
      segmentsTotal: 'ds.trend_count_segments',
      farePaidTotal: 'ds.stat_sum_farepaid',
      numberDatasets: db.raw(`(SELECT COUNT(*) from division_stats_activity where division_stats_id = ds.id and project_id = ${projectId} and isdeleted = FALSE)`),
      annMonths: 'ds.ann_months'
    }).leftJoin('division as d', 'ds.division_id', 'd.id').where('ds.isdeleted', false).andWhere('ds.project_id', projectId).orderBy('ds.id') : [],
    dataSetColumnList: async (_, {
      projectId
    }, {
      db
    }) => {
      if (!projectId) return [];
      const colList = await db('geo_country_stats_activity').distinct('stat_month as month', 'stat_year as year', 'last_updated', 'qc').orderBy(['stat_year', 'stat_month']).where('isdeleted', false).andWhere('project_id', projectId);
      const dataList = colList.map(async ({
        month,
        year,
        last_updated,
        qc
      }) => {
        const {
          rows: countryRows
        } = await db.raw(`select * from geo_country_stats_activity
          where stat_month = ${month} and stat_year = ${year} and project_id = ${projectId}
          order by geo_country_stats_id;`);
        const mappedCountryRows = countryRows.map(row => ({
          tickets: row.trend_count_tickets,
          segments: row.trend_count_segments,
          farePaid: row.stat_sum_farepaid,
          importedTickets: row.trend_count_imported,
          errorTickets: row.trend_count_error,
          errorRatio: row.stat_ratio_error
        }));
        const {
          rows: divisionRows
        } = await db.raw(`select * from division_stats_activity
          where stat_month = ${month} and stat_year = ${year} and project_id = ${projectId}
          order by division_stats_id;`);
        const mappedDivisionRows = divisionRows.map(row => ({
          tickets: row.trend_count_tickets,
          segments: row.trend_count_segments,
          farePaid: row.stat_sum_farepaid
        }));
        return {
          name: `${year}-${month}`,
          dateUpdated: last_updated,
          qc,
          countryData: mappedCountryRows,
          divisionData: mappedDivisionRows
        };
      });
      return await Promise.all(dataList);
    }
  },
  Mutation: {
    toggleDataSet: async (_, {
      projectId,
      month,
      year,
      qc
    }, {
      db
    }) => {
      await db.raw(`
          SELECT dataset_update_qc(${projectId}, ${month}, ${year}, ${qc})
        `);
    },
    deleteDataSet: async (_, {
      projectId,
      month,
      year
    }, {
      db
    }) => {
      await db.raw(`
        SELECT dataset_delete( ${projectId}, ${month}, ${year})
      `);
    },
    setAnnualization: async (_, {
      type = 1,
      annMonthsList
    }, {
      db
    }) => {
      const functionName = type === 1 ? 'geo_country_stats_update' : 'division_stats_update';
      const queries = annMonthsList.map(({
        id,
        annMonths
      }) => db.raw(`
          SELECT ${functionName}(${id}, ${annMonths})
        `));
      await Promise.all(queries);
    }
  }
};

/***/ }),

/***/ "./resolvers/index.js":
/*!****************************!*\
  !*** ./resolvers/index.js ***!
  \****************************/
/*! exports provided: resolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_language__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql/language */ "graphql/language");
/* harmony import */ var graphql_language__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_language__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash.merge */ "lodash.merge");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project */ "./resolvers/project.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client */ "./resolvers/client.js");
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./collection */ "./resolvers/collection/index.js");
/* harmony import */ var _dataSet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dataSet */ "./resolvers/dataSet.js");
/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./library */ "./resolvers/library.js");
/* harmony import */ var _contract__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contract */ "./resolvers/contract/index.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./user */ "./resolvers/user.js");
/* harmony import */ var _process__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./process */ "./resolvers/process.js");











const resolvers = { ...lodash_merge__WEBPACK_IMPORTED_MODULE_2___default()(_project__WEBPACK_IMPORTED_MODULE_3__["project"], _client__WEBPACK_IMPORTED_MODULE_4__["client"], _collection__WEBPACK_IMPORTED_MODULE_5__["collection"], _dataSet__WEBPACK_IMPORTED_MODULE_6__["dataSet"], _library__WEBPACK_IMPORTED_MODULE_7__["library"], _contract__WEBPACK_IMPORTED_MODULE_8__["contract"], _user__WEBPACK_IMPORTED_MODULE_9__["user"], _process__WEBPACK_IMPORTED_MODULE_10__["process"]),
  Date: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLScalarType"]({
    name: 'Date',
    description: 'Date custom scalar type',

    parseValue(value) {
      return new Date(value).toISOString();
    },

    serialize(value) {
      return new Date(value).getTime();
    },

    parseLiteral(ast) {
      if (ast.kind === graphql_language__WEBPACK_IMPORTED_MODULE_1__["Kind"].INT) {
        return parseInt(ast.value, 10);
      }

      return null;
    }

  })
};

/***/ }),

/***/ "./resolvers/library.js":
/*!******************************!*\
  !*** ./resolvers/library.js ***!
  \******************************/
/*! exports provided: library */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "library", function() { return library; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./constants/index.js");

const library = {
  Query: {
    airlineList: async (_, __, {
      db
    }) => await db('carrier').select({
      id: 'id',
      code: 'code',
      name: db.raw(`CONCAT(code, ' ', name)`)
    }).where('isdeleted', false).orderBy('name'),
    airportList: async (_, __, {
      db
    }) => await db('allstandardlocation').select({
      id: 'airportid',
      countryName: 'countryname',
      cityCode: 'citycode',
      cityName: 'cityname',
      airportCode: 'airportcode',
      airportName: 'airportname'
    }).distinct('airportid').orderBy('airportid'),
    bookingClassList: async (_, __, {
      db
    }) => await db('bookingclass as b').select({
      id: 'b.id',
      code: 'b.code',
      name: 'f.name',
      mappingCount: db.raw(`(SELECT COUNT(*) FROM bcexception WHERE bookingclassid = b.id)`)
    }).leftJoin('farecategory as f', 'b.farecategoryid', 'f.id'),
    airlineMappingList: async (_, {
      bookingClassId
    }, {
      db
    }) => await db('bcexception as b').select({
      id: 'b.id',
      code: 'c.code',
      name: 'c.name',
      ticketingDate: 'b.ticketstartdate',
      travelDate: 'b.travelstartdate',
      exceptionCount: db.raw(`(SELECT COUNT(*) FROM bcexceptionmember WHERE bcexceptionid = b.id)`)
    }).leftJoin('carrier as c', 'b.carrierid', 'c.id').where('b.bookingclassid', bookingClassId),
    exceptionList: async (_, {
      exceptionId
    }, {
      db
    }) => await db('bcexceptionmember as b').select({
      id: 'b.id',
      order: 'b.iorder',
      originCode: db.raw(`CONCAT(l1.code, ' ', (SELECT location_gettypename(l1.locationtype)))`),
      destinationCode: db.raw(`CONCAT(l2.code, ' ', (SELECT location_gettypename(l2.locationtype)))`),
      overrideFareCategory: 'f.name'
    }).leftJoin('location as l1', 'l1.id', 'b.fromlocation').leftJoin('location as l2', 'l2.id', 'b.tolocation').leftJoin('farecategory as f', 'f.code', 'b.farecategorycode').where('b.bcexceptionid', exceptionId).orderBy('b.iorder'),
    countryList: async (_, __, {
      db
    }) => await db('location').select({
      id: 'id',
      name: db.raw(`CONCAT(code, ' [', (SELECT location_gettypename(locationtype)), '] ', name)`),
      code: 'code',
      locationType: 'locationtype'
    }).orWhere('locationtype', _constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].COUNTRY).andWhere('isdeleted', false).orderBy('code'),
    currencyList: async (_, __, {
      db
    }) => await db('blops.currency').select({
      id: 'id',
      name: db.raw(`(SELECT * FROM currency_getname(id))`),
      code: 'currency_code'
    }).orderBy('currency_code'),
    distanceUnitList: async (_, __, {
      db
    }) => await db('lov_lookup').select({
      id: 'id',
      name: 'name_val'
    }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["LIBRARY_LOOKUP"].DISTANCE_TYPE),
    geographyList: async (_, __, {
      db
    }) => await db('location').select({
      id: 'id',
      name: db.raw(`CONCAT(code, ' [', (SELECT location_gettypename(locationtype)), '] ', name)`),
      code: 'code',
      locationType: 'locationtype'
    }).where(function () {
      this.where('locationtype', _constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].REGION).andWhere('geosetid', _constants__WEBPACK_IMPORTED_MODULE_0__["ADVITO_GEOSET_ID"]);
    }).orWhere(function () {
      this.where('locationtype', _constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].SUBREGION).andWhere('geosetid', _constants__WEBPACK_IMPORTED_MODULE_0__["ADVITO_GEOSET_ID"]);
    }).orWhere('locationtype', _constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].COUNTRY).orWhere('locationtype', _constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].CITY).orWhere('locationtype', _constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].AIRPORT).andWhere('isdeleted', false).orderBy('code'),
    marketList: async (_, __, {
      db
    }) => await db('location').select({
      id: 'id',
      name: db.raw(`CONCAT(code, ' [', (SELECT location_gettypename(locationtype)), '] ', name)`),
      code: 'code',
      locationType: 'locationtype'
    }).orWhere('locationtype', _constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].AIRPORT).orWhere('locationtype', _constants__WEBPACK_IMPORTED_MODULE_0__["LOCATION_LOOKUP"].CITY).andWhere('isdeleted', false).orderBy('code')
  }
};

/***/ }),

/***/ "./resolvers/process.js":
/*!******************************!*\
  !*** ./resolvers/process.js ***!
  \******************************/
/*! exports provided: process */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "process", function() { return process; });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data */ "./data/index.js");

const process = {
  Query: {
    process: () => process
  },
  Mutation: {
    startProcess: () => {
      _data__WEBPACK_IMPORTED_MODULE_0__["processData"].processing = true;
      _data__WEBPACK_IMPORTED_MODULE_0__["processData"].processStartDate = new Date();
      return _data__WEBPACK_IMPORTED_MODULE_0__["processData"];
    },
    stopProcess: () => {
      _data__WEBPACK_IMPORTED_MODULE_0__["processData"].processing = false;
      _data__WEBPACK_IMPORTED_MODULE_0__["processData"].processStartDate = null;
      _data__WEBPACK_IMPORTED_MODULE_0__["processData"].recentProcessList.push({
        date: new Date(),
        contracts: 5,
        dataSets: 5,
        records: 1234567,
        processDuration: 100,
        status: 1,
        processedBy: 'Scott Cashon'
      });
      return _data__WEBPACK_IMPORTED_MODULE_0__["processData"];
    }
  }
};

/***/ }),

/***/ "./resolvers/project.js":
/*!******************************!*\
  !*** ./resolvers/project.js ***!
  \******************************/
/*! exports provided: project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "project", function() { return project; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./constants/index.js");

const project = {
  Query: {
    projectList: async (_, {
      clientId = null,
      userId = null
    }, {
      db
    }) => clientId ? await db('project_list as pl').select({ ...projectSelect,
      ...getFavorite(db, userId)
    }).where('isdeleted', false).andWhere('clientid', clientId) : await db('project_list as pl').select({ ...projectSelect,
      ...getFavorite(db, userId)
    }).where('isdeleted', false),
    projectTypeList: async (_, __, {
      db
    }) => {
      return await db('lov_lookup').select({
        id: 'id',
        name: 'name_val'
      }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["PROJECT_LOOKUP"].PROJECT_TYPE);
    },
    savingsTypeList: async (_, __, {
      db
    }) => {
      return await db('lov_lookup').select({
        id: 'id',
        name: 'name_val'
      }).where('type', _constants__WEBPACK_IMPORTED_MODULE_0__["PROJECT_LOOKUP"].SAVINGS_TYPE);
    }
  },
  Mutation: {
    addProject: async (_, {
      userId,
      clientId,
      clientName,
      projectTypeId,
      projectTypeName,
      savingsTypeId,
      effectiveFrom,
      effectiveTo,
      reportFrom,
      reportTo,
      description,
      projectManagerId,
      leadAnalystId,
      dataSpecialistId,
      currencyId,
      distanceUnitId
    }, {
      db
    }) => {
      const name = getProjectName(projectTypeName, clientName, effectiveFrom, effectiveTo);
      const {
        rows
      } = await db.raw(`
        SELECT project_create(
          ${clientId},
          '${name}',
          ${projectTypeId},
          ${savingsTypeId},
          '${effectiveFrom}',
          '${effectiveTo}',
          '${reportFrom}',
          '${reportTo}',
          ${description ? `'${description}'` : null},
          ${projectManagerId},
          ${leadAnalystId},
          ${dataSpecialistId},
          ${currencyId},
          ${distanceUnitId}
        )
      `);
      const [{
        project_create: newId
      }] = rows;
      return await getProject(db, newId, userId);
    },
    editProject: async (_, {
      userId,
      id,
      savingsTypeId,
      effectiveFrom,
      effectiveTo,
      reportFrom,
      reportTo,
      description,
      projectManagerId,
      leadAnalystId,
      dataSpecialistId,
      currencyId,
      distanceUnitId
    }, {
      db
    }) => {
      await db.raw(`
        SELECT project_update(
          ${id},
          ${savingsTypeId},
          '${effectiveFrom}',
          '${effectiveTo}',
          '${reportFrom}',
          '${reportTo}',
          ${description ? `'${description}'` : null},
          ${projectManagerId},
          ${leadAnalystId},
          ${dataSpecialistId},
          ${currencyId},
          ${distanceUnitId}
        )
      `);
      return await getProject(db, id, userId);
    },
    deleteProject: async (_, {
      id
    }, {
      db
    }) => {
      await db.raw(`
        SELECT project_delete(${id})
      `);
      return id;
    },
    toggleFavoriteProject: async (_, {
      id,
      userId
    }, {
      db
    }) => {
      await db.raw(`
        SELECT project_favorite(${id}, ${userId})
      `);
      return await getProject(db, id, userId);
    }
  }
};

const getProjectName = (projectTypeName, clientName, effectiveFrom, effectiveTo) => {
  const effectiveFromYear = new Date(effectiveFrom).getFullYear();
  const effectiveToYear = new Date(effectiveTo).getFullYear();
  const yearRange = effectiveFromYear !== effectiveToYear ? `${effectiveFromYear} - ${effectiveToYear.toString().substr(-2)}` : effectiveFromYear;
  return `${clientName} ${yearRange} ${projectTypeName}`;
};

const getProject = async (db, id, user) => {
  const [project] = await db('project_list as pl').select({ ...projectSelect,
    ...getFavorite(db, user)
  }).where('id', id);
  return project;
};

const getFavorite = (db, userId) => ({
  favorite: db.raw(`COALESCE((SELECT count(*) FROM projectuserfavourite as p WHERE userid=${userId} AND projectid=pl.id) > 0,FALSE)`)
});

const projectSelect = {
  id: 'id',
  clientId: 'clientid',
  clientName: 'clientname',
  name: 'name',
  description: 'description',
  projectTypeId: 'projecttypeid',
  projectTypeName: 'projecttypename',
  savingsTypeId: 'savingstypeid',
  savingsTypeName: 'savingstypename',
  effectiveFrom: 'effectivefrom',
  effectiveTo: 'effectiveto',
  reportFrom: 'reportfrom',
  reportTo: 'reportto',
  projectManagerId: 'projectmanagerid',
  projectManagerName: 'projectmanagername',
  projectManagerEmail: 'projectmanageremail',
  leadAnalystId: 'leadanalystid',
  leadAnalystName: 'leadanalystname',
  leadAnalystEmail: 'leadanalystemail',
  dataSpecialistId: 'dataspecialistid',
  dataSpecialistName: 'dataspecialistname',
  dataSpecialistEmail: 'dataspecialistemail',
  currencyId: 'currencyid',
  currencyName: 'currencyname',
  distanceUnitId: 'distanceunitid',
  distanceUnitName: 'distanceunitname'
};

/***/ }),

/***/ "./resolvers/user.js":
/*!***************************!*\
  !*** ./resolvers/user.js ***!
  \***************************/
/*! exports provided: user */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user", function() { return user; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./constants/index.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ "./models/index.js");
/* harmony import */ var objection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! objection */ "objection");
/* harmony import */ var objection__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(objection__WEBPACK_IMPORTED_MODULE_2__);



const user = {
  Query: {
    userList: async (_, {
      clientId = null
    }) => await _models__WEBPACK_IMPORTED_MODULE_1__["AdvitoUser"].query().select('advitoUser.id', 'advitoUser.email', Object(objection__WEBPACK_IMPORTED_MODULE_2__["raw"])("CONCAT(name_first, ' ', name_last)").as('name')).where('clientId', clientId ? clientId : _constants__WEBPACK_IMPORTED_MODULE_0__["ADVITO_CLIENT"]).orderBy('nameFirst'),
    user: (_, __, {
      user
    }) => user,
    projectManagerList: async (_, {
      clientId = null
    }) => await _models__WEBPACK_IMPORTED_MODULE_1__["AdvitoUser"].query().select('advitoUser.id', 'advitoUser.email', Object(objection__WEBPACK_IMPORTED_MODULE_2__["raw"])("CONCAT(name_first, ' ', name_last)").as('name')).where('client_id', clientId).orWhere('client_id', _constants__WEBPACK_IMPORTED_MODULE_0__["ADVITO_CLIENT"]).orderBy('nameFirst'),
    leadAnalystList: async (_, {
      clientId = null
    }) => await _models__WEBPACK_IMPORTED_MODULE_1__["AdvitoUser"].query().select('advitoUser.id', 'advitoUser.email', Object(objection__WEBPACK_IMPORTED_MODULE_2__["raw"])("CONCAT(name_first, ' ', name_last)").as('name')).where('client_id', clientId).orWhere('client_id', _constants__WEBPACK_IMPORTED_MODULE_0__["ADVITO_CLIENT"]).orderBy('nameFirst'),
    dataSpecialistList: async (_, {
      clientId = null
    }) => await _models__WEBPACK_IMPORTED_MODULE_1__["AdvitoUser"].query().select('advitoUser.id', 'advitoUser.email', Object(objection__WEBPACK_IMPORTED_MODULE_2__["raw"])("CONCAT(name_first, ' ', name_last)").as('name')).where('client_id', clientId).orWhere('client_id', _constants__WEBPACK_IMPORTED_MODULE_0__["ADVITO_CLIENT"]).orderBy('nameFirst')
  }
};

/***/ }),

/***/ "./typeDefs/client.js":
/*!****************************!*\
  !*** ./typeDefs/client.js ***!
  \****************************/
/*! exports provided: client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "client", function() { return client; });
const client = `
type Client {
  id: Int,
  name: String,
}

extend type Query {
  clientList: [Client] @auth
}
`;

/***/ }),

/***/ "./typeDefs/collection.js":
/*!********************************!*\
  !*** ./typeDefs/collection.js ***!
  \********************************/
/*! exports provided: collection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collection", function() { return collection; });
const collection = `
type LocationCollection {
  id: Int
  name: String
  description: String
  dateUpdated: Date
  regionCount: Int
  standard: Boolean
  active: Boolean
}
type Region {
  id: Int
  name: String
  code: String
  standard: Boolean
  countryList: [Geography]
}

type TravelSectorCollection {
  id: Int
  name: String
  description: String
  dateUpdated: Date
  sectorCount: Int
  standard: Boolean
  active: Boolean
}
type TravelSector {
  id: Int
  name: String
  shortName: String
  standard: Boolean
  sectorGeographyList: [SectorGeography]
}
type SectorGeography {
  id: Int
  originId: Int
  originName: String
  destinationId: Int
  destinationName: String
  exclude: Boolean
}
type AirlineGroupCollection {
  id: Int
  name: String
  description: String
  dateUpdated: Date
  effectiveStartDate: Date
  effectiveEndDate: Date
  active: Boolean
  standard: Boolean
  airlineGroupCount: Int
}
type AirlineGroup {
  id: Int
  name: String
  code: String
  effectiveStartDate: Date
  effectiveEndDate: Date
  standard: Boolean
  airlineGroupMemberList: [AirlineGroupMember]
}
type AirlineGroupMember {
  id: Int
  airlineId: Int
  name: String
  code: String
  effectiveStartDate: Date
  effectiveEndDate: Date
}
type PreferredAirlineCollection {
  id: Int
  name: String
  description: String
  dateUpdated: Date
  active: Boolean
  airlineCount: Int
}
type PreferredAirline {
  id: Int
  airlineId: Int
  name: String
  preferenceLevelId: Int
  preferenceLevelName: String
  effectiveStartDate: Date
  effectiveEndDate: Date
  active: Boolean
  posList: [PreferredAirlinePos]
}
type PreferredAirlinePos {
  id: Int
  locationId: Int
  name: String
  code: String
}
type PreferredAirlinePreference {
  id: Int
  name: String
}
input SectorGeographyInput {
  id: Int
  origin: Int
  destination: Int
  exclude: Boolean
}
input GroupAirline {
  id: Int
  airlineId: Int
  effectiveStartDate: Date
  effectiveEndDate: Date
}
input PreferredAirlineInput {
  id: Int
  airlineId: Int
  preferenceLevelId: Int
  effectiveStartDate: Date
  effectiveEndDate: Date
  deleted: Boolean
  posIdList: [Int]
}

extend type Query {
  locationCollectionList(clientId: Int, projectId: Int): [LocationCollection] @auth
  locationCollection(projectId: Int!, id: Int!): LocationCollection @auth
  regionList(geoSetId: Int): [Region] @auth
  travelSectorCollectionList(clientId: Int, projectId: Int): [TravelSectorCollection] @auth
  travelSectorCollection(projectId: Int!, id: Int!): TravelSectorCollection @auth
  travelSectorList(groupId: Int): [TravelSector] @auth
  airlineGroupCollectionList(clientId: Int, projectId: Int): [AirlineGroupCollection] @auth
  airlineGroupCollection(projectId: Int!, id: Int!): AirlineGroupCollection @auth
  airlineGroupList(collectionId: Int): [AirlineGroup] @auth
  preferredAirlineCollectionList(clientId: Int, projectId: Int): [PreferredAirlineCollection] @auth
  preferredAirlineCollection(projectId: Int!, id: Int!): PreferredAirlineCollection @auth
  preferredAirlineList(groupId: Int): [PreferredAirline] @auth
  preferenceLevelList: [PreferredAirlinePreference] @auth
}

extend type Mutation {
  copyLocationCollection(clientId: Int!, projectId: Int!, id: Int!, name: String!, description: String): Int @auth
  editLocationCollection(projectId: Int!, id: Int!, name: String!, description: String): LocationCollection @auth
  deleteLocationCollection(id: Int!, projectId: Int!): Int @auth
  toggleLocationCollection(id: Int!, projectId: Int!): Int @auth
  addRegion(geoSetId: Int!, name: String!, code: String!): Int @auth
  deleteRegion(id: Int!): Int @auth
  moveCountries(geoSetId: Int!, regionId: Int!, countryList: [Int]): Int @auth

  copyTravelSectorCollection(clientId: Int!, projectId: Int!, id: Int!, name: String!, description: String): Int @auth
  editTravelSectorCollection(projectId: Int!, id: Int!, name: String!, description: String): TravelSectorCollection @auth
  deleteTravelSectorCollection(id: Int!, projectId: Int!): Int @auth
  toggleTravelSectorCollection(id: Int!, projectId: Int!): Int @auth
  addTravelSector(groupId: Int!, name: String!, shortName: String!, geographyList: [SectorGeographyInput]): Int @auth
  editTravelSector(sectorId: Int!, name: String!, shortName: String!, geographyList: [SectorGeographyInput]): Int @auth
  deleteTravelSector(id: Int!): Int @auth
  deleteSectorGeography(id: Int!): Int @auth

  editAirlineGroupCollection(projectId: Int!, id: Int!, name: String!, description: String, effectiveStartDate: Date!, effectiveEndDate: Date!): AirlineGroupCollection @auth
  deleteAirlineGroupCollection(projectId: Int!, id: Int!): Int @auth
  toggleAirlineGroupCollection(projectId: Int!, id: Int!): Int @auth
  addAirlineGroup(collectionId: Int!, name: String!, code: String!, effectiveStartDate: Date!, effectiveEndDate: Date!, airlineList: [GroupAirline]): Int @auth
  editAirlineGroup(carrierGroupId: Int!, name: String!, code: String!, effectiveStartDate: Date!, effectiveEndDate: Date!, airlineList: [GroupAirline]): Int @auth
  deleteAirlineGroup(id: Int!): Int @auth

  editPreferredAirlineCollection(projectId: Int!, id: Int!, name: String!, description: String): PreferredAirlineCollection @auth
  deletePreferredAirlineCollection(projectId: Int!, id: Int!): Int @auth
  togglePreferredAirlineCollection(projectId: Int!, id: Int!): Int @auth
  addPreferredAirline(groupId: Int!, airlineList: [PreferredAirlineInput]): Int @auth
  editPreferredAirline(groupId: Int!, airlineList: [PreferredAirlineInput]): Int @auth
  deletePreferredAirline(id: Int!): Int @auth
}
`;

/***/ }),

/***/ "./typeDefs/contract.js":
/*!******************************!*\
  !*** ./typeDefs/contract.js ***!
  \******************************/
/*! exports provided: contract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contract", function() { return contract; });
const contract = `
type Contract {
  id: Int
  name: String
  typeId: Int
  typeName: String
  description: String
  round: Int
  effectiveFrom: Date
  effectiveTo: Date
  qc: Float
  pricingTermCount: Int
  targetTermCount: Int
  pointOfSaleList: [String]
  pointOfOriginList: [String]
  airlineList: [String]
  divisionId: Int
}
type ContractType {
  id: Int
  name: String
}
type DivisionType {
  id: Int
  name: String
}
type PricingTerm {
  id: Int
  contractOrder: Int
  appliedOrder: Int
  name: String
  effectiveFrom: Date
  effectiveTo: Date
  qc: Boolean
  discountCount: Int
  pointOfSaleList: [String]
  pointOfOriginList: [String]
  airlineList: [String]
  ignore: Boolean
  noteImportant: Boolean
  noteContent: Boolean
  discountNoteCount: Int
}
type Discount {
  id: Int
  pricingTermId: Int
  contractOrder: Int
  appliedOrder: Int
  name: String
  effectiveFrom: Date
  effectiveTo: Date
  discountTypeId: Int
  discountTypeName: String
  discountValue: Float
  journeyTypeId: Int
  journeyTypeName: String
  directionTypeId: Int
  directionTypeName: String
  ruleCount: Int
  normalizationCount: Int
  noteImportant: Boolean
  noteContent: Boolean
}
type DiscountType {
  id: Int
  name: String
}
type JourneyType {
  id: Int
  name: String
}
type DirectionType {
  id: Int
  name: String
}

type Normalization {
  id: Int
  usageFrom: Date
  usageTo: Date
  effectiveFrom: Date
  effectiveTo: Date
  created: Date
  createdby: String
  marketCount: Int
}
type NormalizationMarket {
  id: Int
  marketA: String
  marketB: String
  farePaid: Float
  usageOverride: Float
  farePullDate: Date
  notes: String
  fareList: [NormalizationFare]
}
type NormalizationFare {
  id: Int
  fareType: Int
  fareBasis: String
  amount: Float
  currencyCode: String
  directionType: String
  advancePurchase: String
  minstay: String
}
input NormalizationFareInput {
  id: Int
  fareType: Int!
  fareBasis: String
  amount: Float!
  currencyCode: String!
  directionType: String!
  advancePurchase: String!
  minstay: String!
}
type TopMarket {
  id: Int
  value: String
  marketA: String
  marketB: String
  farePaid: Float
  usage: Float
  advancedTicketList: [MarketAdvancedTicket]
  departureList:[MarketDeparture]
  fareBasisList:[MarketFareBasis]
}
type MarketAdvancedTicket {
  label: String
  value: Float
}
type MarketDeparture {
  label: String
  value: Float
}
type MarketFareBasis {
  fareBasis: String
  bookingClass: String
  usage: Float
}


type TargetTerm {
  id: Int
  name: String
  order: Int
  effectiveFrom: Date
  effectiveTo: Date
  timeframe: Int
  qc: Float
  targetTypeId: Int
  targetTypeName: String
  cabinF: Boolean
  cabinC: Boolean
  cabinP: Boolean
  cabinY: Boolean
  qsi: Float
  incentiveTypeId: Int
  incentiveTypeName: String
  currencyId: Int
  softTarget: Boolean
  internalTarget: Boolean
  targetAmount: Float
  levelCount: Int
  ruleCount: Int
  noteImportant: Boolean
  noteContent: Boolean
  dpmPrice: Float,
  dpmStartDate: Date,
  baselineDateFrom: Date,
  baselineDateTo: Date,
  goalDateFrom: Date,
  goalDateTo: Date,
  airlineGroupFrom: Date,
  airlineGroupTo: Date,
  fareCategoryFrom: Date,
  fareCategoryTo: Date
}
type TargetLevel {
  id: String
  targetTermId: Int
  targetAmount: Float
  scoringTarget: Boolean
  incentiveDescription: String
}
type TargetType {
  id: Int
  name: String
}
type IncentiveType {
  id: Int
  name: String
}
type BulkAction {
  id: Int,
  name: String
}
type Note {
  id: String
  text: String
  lastUpdate: Date
  assigneeId: Int
  assigneeName: String
  assignedToId: Int
  assignedToName: String
}
input NewAppliedOrder {
  id: Int
  appliedOrder: Int
  name: String
  contractOrder: Int
}

extend type Query {
  contractList(projectId: Int): [Contract] @auth
  contract(id: Int!): [Contract] @auth
  contractTypeList: [ContractType] @auth
  divisionTypeList(clientId: Int): [DivisionType] @auth
  bulkActionList(parentId: Int!): [BulkAction] @auth

  pricingTermList(contractId: Int): [PricingTerm] @auth
  pricingTerm(id: Int!): PricingTerm @auth

  discountList(pricingTermId: Int): [Discount] @auth
  discount(id: Int!): Discount @auth
  discountTypeList: [DiscountType] @auth
  journeyTypeList: [JourneyType] @auth
  directionTypeList: [DirectionType] @auth

  normalizationList(discountId: Int): [Normalization] @auth
  normalization(id: Int!): Normalization @auth
  normalizationMarketList(normalizationId: Int): [NormalizationMarket] @auth
  topMarketList(normalizationId: Int): [TopMarket] @auth

  targetTermList(contractId: Int): [TargetTerm] @auth
  targetTerm(id: Int!): TargetTerm @auth
  targetLevelList(targetTermId: Int): [TargetLevel] @auth
  targetLevel(id: String!, targetTermId: Int!): TargetLevel @auth
  targetTypeList: [TargetType] @auth
  incentiveTypeList: [IncentiveType] @auth

  noteList(parentId: Int, parentTable: String!): [Note] @auth
}

extend type Mutation {
  createContract(
    name: String!
    projectId: Int!
    typeId: Int!
    round: Int
    divisionId: Int
    description: String
  ): Contract @auth
  copyContract(id: Int!, name: String!): Contract @auth
  editContract(
    id: Int!,
    name: String!
    typeId: Int!
    round: Int
    divisionId: Int
    description: String
  ): Contract @auth
  deleteContract(id: Int!): Int @auth

  createPricingTerm(contractId: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  copyPricingTerm(id: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  editPricingTerm(id: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  togglePricingTermQC(contractId: Int!, idList: [Int]!): [PricingTerm] @auth
  deletePricingTerms(contractId: Int!, idList: [Int]!): [Int] @auth
  updateAppliedOrder(
    updatePricingTermList: [NewAppliedOrder]!
  ): Int @auth

  createTargetTerm(
    contractId: Int!
    name: String!
    targetTypeId: Int!
    timeframe: Int
    cabinF: Boolean
    cabinC: Boolean
    cabinP: Boolean
    cabinY: Boolean
    incentiveTypeId: Int
    currencyId: Int
    softTarget: Boolean
    internalTarget: Boolean
    qsi: Float
    dpmPrice: Float
    dpmStartDate: Date
    baselineDateFrom: Date
    baselineDateTo: Date
    goalDateFrom: Date
    goalDateTo: Date
    airlineGroupFrom: Date
    airlineGroupTo: Date
    fareCategoryFrom: Date
    fareCategoryTo: Date
  ): TargetTerm @auth
  copyTargetTerm(id: Int!, name: String!): TargetTerm @auth
  editTargetTerm(
    id: Int!
    name: String!
    timeframe: Int
    cabinF: Boolean
    cabinC: Boolean
    cabinP: Boolean
    cabinY: Boolean
    currencyId: Int
    softTarget: Boolean
    internalTarget: Boolean
    qsi: Float
    dpmPrice: Float
    dpmStartDate: Date
    baselineDateFrom: Date
    baselineDateTo: Date
    goalDateFrom: Date
    goalDateTo: Date
    airlineGroupFrom: Date
    airlineGroupTo: Date
    fareCategoryFrom: Date
    fareCategoryTo: Date
  ): TargetTerm @auth
  toggleTargetTermQC(contractId: Int!, idList: [Int]!): [TargetTerm] @auth
  deleteTargetTerms(idList: [Int]!): [Int] @auth

  createTargetLevel(
    targetTermId: Int!
    targetAmount: Float!
    scoringTarget: Boolean!
    incentiveDescription: String
  ): Int @auth
  editTargetLevel(
    id: String!
    targetTermId: Int!
    targetAmount: Float!
    scoringTarget: Boolean!
    incentiveDescription: String
  ): [TargetLevel] @auth
  toggleTargetLevel(id: String!, targetTermId: Int!): [TargetLevel] @auth
  deleteTargetLevel(id: String!, targetTermId: Int!): String @auth

  createDiscount(
    pricingTermId: Int!
    name: String!
    discountTypeId: Int
    discountValue: Float!
    journeyTypeId: Int
    directionTypeId: Int
  ): Discount @auth
  copyDiscount(
    id: Int!
    name: String!
    discountTypeId: Int
    discountValue: Float!
    journeyTypeId: Int
    directionTypeId: Int
  ): Discount @auth
  editDiscount(
    id: Int!
    name: String!
    discountTypeId: Int
    discountValue: Float!
    journeyTypeId: Int
    directionTypeId: Int
  ): Discount @auth
  deleteDiscounts(pricingTermId: Int!, idList: [Int]!): [Int] @auth
  updateDiscountAppliedOrder(
    updateDiscountList: [NewAppliedOrder]!
  ): Int @auth


  createNormalization(
    discountId: Int!
    usageFrom: Date!
    usageTo: Date!
    effectiveFrom: Date!
    effectiveTo: Date!
  ): Normalization @auth
  updateNormalization(
    id: Int!
    usageFrom: Date!
    usageTo: Date!
    effectiveFrom: Date!
    effectiveTo: Date!
  ): Normalization @auth
  deleteNormalization(id: Int!): Int @auth
  copyNormalization(id: Int!): Normalization @auth
  createNormalizationMarket(
    normalizationId: Int!
    marketA: String!
    marketB: String!
    farePaid: Float!
    usageOverride: Float
    farePullDate: Date!
    notes: String
    fareList: [NormalizationFareInput]
  ): NormalizationMarket  @auth
  updateNormalizationMarket(
    marketId: Int!
    marketA: String!
    marketB: String!
    farePaid: Float!
    usageOverride: Float
    farePullDate: Date!
    notes: String
    fareList: [NormalizationFareInput]
  ): NormalizationMarket  @auth
  deleteNormalizationMarket(
    id: Int!
  ): Int @auth
  
  addNote(
    parentId: Int!
    parentTable: String!
    important: Boolean!
    text: String
    assignedToId: Int!
  ): Note @auth
  editNote(
    parentId: Int!
    parentTable: String!
    important: Boolean!
    text: String
    assignedToId: Int!
    noteId: String!
  ): Note @auth
  deleteNote(
    parentId: Int!
    parentTable: String!
    resetImportant: Boolean!
    important: Boolean!
    noteId: String!
  ): String @auth
}
`;

/***/ }),

/***/ "./typeDefs/dataSet.js":
/*!*****************************!*\
  !*** ./typeDefs/dataSet.js ***!
  \*****************************/
/*! exports provided: dataSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataSet", function() { return dataSet; });
const dataSet = `
type DataSetCountry {
  id: Int
  name: String
  ticketsTotal: Float
  segmentsTotal: Float
  farePaidTotal: Float
  importedTicketsTotal: Float
  errorTicketsTotal: Float
  errorRatioTotal: Float
  numberDatasets: Int
  annMonths: Int
}
type DataSetDivision {
  id: Int
  name: String
  ticketsTotal: Float
  segmentsTotal: Float
  farePaidTotal: Float
  numberDatasets: Int
  annMonths: Int
}
input DataSetAnnualization {
  id: Int
  annMonths: Int
}
type DataSetColumn {
  name: String
  dateUpdated: Date
  qc: Boolean
  countryData: [CountryData]
  divisionData: [DivisionData]
}
type CountryData {
  tickets: Float
  segments: Float
  farePaid: Float
  importedTickets: Float
  errorTickets: Float
  errorRatio: Float
}
type DivisionData {
  tickets: Float
  segments: Float
  farePaid: Float
}

extend type Query {
  dataSetCountryList(projectId: Int): [DataSetCountry] @auth
  dataSetDivisionList(projectId: Int): [DataSetDivision] @auth
  dataSetColumnList(projectId: Int): [DataSetColumn] @auth
}
extend type Mutation {
  toggleDataSet(projectId: Int!, month: Int!, year: Int!, qc: Boolean): Boolean @auth
  deleteDataSet(projectId: Int!, month: Int!, year: Int!): Int @auth
  setAnnualization(type: Int, annMonthsList: [DataSetAnnualization]!): Int @auth
}
`;

/***/ }),

/***/ "./typeDefs/index.js":
/*!***************************!*\
  !*** ./typeDefs/index.js ***!
  \***************************/
/*! exports provided: typeDefs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./typeDefs/project.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client */ "./typeDefs/client.js");
/* harmony import */ var _collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./collection */ "./typeDefs/collection.js");
/* harmony import */ var _dataSet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dataSet */ "./typeDefs/dataSet.js");
/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./library */ "./typeDefs/library.js");
/* harmony import */ var _contract__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./contract */ "./typeDefs/contract.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user */ "./typeDefs/user.js");
/* harmony import */ var _rule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rule */ "./typeDefs/rule.js");
/* harmony import */ var _process__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./process */ "./typeDefs/process.js");










const typeDefs = apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  scalar Date
  directive @auth on FIELD_DEFINITION
  ${_project__WEBPACK_IMPORTED_MODULE_1__["project"]}
  ${_client__WEBPACK_IMPORTED_MODULE_2__["client"]}
  ${_collection__WEBPACK_IMPORTED_MODULE_3__["collection"]}
  ${_dataSet__WEBPACK_IMPORTED_MODULE_4__["dataSet"]}
  ${_library__WEBPACK_IMPORTED_MODULE_5__["library"]}
  ${_contract__WEBPACK_IMPORTED_MODULE_6__["contract"]}
  ${_user__WEBPACK_IMPORTED_MODULE_7__["user"]}
  ${_process__WEBPACK_IMPORTED_MODULE_9__["process"]}
  ${_rule__WEBPACK_IMPORTED_MODULE_8__["rule"]}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

/***/ }),

/***/ "./typeDefs/library.js":
/*!*****************************!*\
  !*** ./typeDefs/library.js ***!
  \*****************************/
/*! exports provided: library */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "library", function() { return library; });
const library = `
type Airport {
  id: Int
  countryName: String
  cityCode: String
  cityName: String
  airportCode: String
  airportName: String
}
type BookingClass {
  id: Int
  code: String
  name: String
  mappingCount: Int
}
type AirlineMapping {
  id: Int
  code: String
  name: String
  ticketingDate: Date
  travelDate: Date
  exceptionCount: Int
}

type Exception {
  id: Int
  order: Int
  originCode: String
  destinationCode: String
  overrideFareCategory: String
}

type Airline {
  id: Int
  code: String
  name: String
}

type Currency {
  id: Int
  name: String
  code: String
}

type DistanceUnit {
  id: Int
  name: String
}

type Geography {
  id: Int
  code: String
  name: String
  standard: Boolean
  locationType: Int
}

extend type Query {
  airlineList: [Airline] @auth
  airportList: [Airport] @auth
  bookingClassList: [BookingClass] @auth
  airlineMappingList(bookingClassId: Int!): [AirlineMapping] @auth
  exceptionList(exceptionId: Int!): [Exception] @auth
  countryList: [Geography] @auth
  currencyList: [Currency] @auth
  geographyList: [Geography] @auth
  marketList: [Geography] @auth
  distanceUnitList: [DistanceUnit] @auth
}
`;

/***/ }),

/***/ "./typeDefs/process.js":
/*!*****************************!*\
  !*** ./typeDefs/process.js ***!
  \*****************************/
/*! exports provided: process */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "process", function() { return process; });
const process = `
type Process {
  contracts: Int
  dataSets: Int
  records: Int
  processing: Boolean
  processStartDate: Date
  recentProcessList: [RecentProcess]
}

type RecentProcess {
  date: Date
  contracts: Int
  dataSets: Int
  records: Int
  processDuration: Int
  status: Float
  processedBy: String
}

extend type Query {
  process: Process @auth
}
extend type Mutation {
  startProcess: Process @auth
  stopProcess: Process @auth
}
`;

/***/ }),

/***/ "./typeDefs/project.js":
/*!*****************************!*\
  !*** ./typeDefs/project.js ***!
  \*****************************/
/*! exports provided: project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "project", function() { return project; });
const project = `
type Project {
  id: Int
  clientId: Int
  clientName: String
  name: String
  description: String
  division: String
  isDeleted: Boolean
  projectTypeId: Int
  projectTypeName: String
  savingsTypeId: Int
  savingsTypeName: String
  effectiveFrom: Date
  effectiveTo: Date
  reportFrom: Date
  reportTo: Date
  projectManagerId: Int
  projectManagerName: String
  projectManagerEmail: String
  leadAnalystId: Int
  leadAnalystName: String
  leadAnalystEmail: String
  dataSpecialistId: Int
  dataSpecialistName: String
  dataSpecialistEmail: String
 currencyId: Int
 currencyName: String
 distanceUnitId: Int
 distanceUnitName: String
  progress: String
  favorite: Boolean
}

type ProjectType {
  id: Int
  name: String
}

type SavingsType {
  id: Int
  name: String
}

extend type Query {
  projectList(clientId: Int userId: Int): [Project] @auth
  projectTypeList: [ProjectType]
  savingsTypeList: [SavingsType]
}

extend type Mutation {
  addProject(
    userId: Int!
    clientId: Int!
    clientName: String!
    projectTypeId: Int!
    projectTypeName: String!
    savingsTypeId: Int!
    effectiveFrom: Date!
    effectiveTo: Date!
    reportFrom: Date!
    reportTo: Date!
    description: String
    projectManagerId: Int!
    leadAnalystId: Int!
    dataSpecialistId: Int!
    currencyId: Int!
    distanceUnitId: Int!
  ): Project @auth
  editProject(
    userId: Int!
    id: Int!
    savingsTypeId: Int!
    effectiveFrom: Date!
    effectiveTo: Date!
    reportFrom: Date!
    reportTo: Date!
    description: String
    projectManagerId: Int!
    leadAnalystId: Int!
    dataSpecialistId: Int!
    currencyId: Int!
    distanceUnitId: Int!
  ): Project @auth
  deleteProject(
    id: Int!
  ): Int @auth
  toggleFavoriteProject(
    id: Int!
    userId: Int!
  ): Project @auth
}
`;

/***/ }),

/***/ "./typeDefs/rule.js":
/*!**************************!*\
  !*** ./typeDefs/rule.js ***!
  \**************************/
/*! exports provided: rule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rule", function() { return rule; });
const rule = `
type TicketingDate {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

input TicketingDateInput {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

input TicketingDateBulkInput {
  id: Int
  startDate: Date
  endDate: Date
}

type TravelDate {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

input TravelDateInput {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

input TravelDateBulkInput {
  id: Int
  startDate: Date
  endDate: Date
}

type PointOfSale {
  id: Int
  ruleContainerId: String
  countryCode: String
  isDeleted: Boolean
}

input PointOfSaleInput {
  id: Int
  ruleContainerId: String
  countryCode: String
  isDeleted: Boolean
}

type PointOfOrigin {
  id: Int
  ruleContainerId: String
  countryCode: String
  isDeleted: Boolean
}

input PointOfOriginInput {
  id: Int
  ruleContainerId: String
  countryCode: String
  isDeleted: Boolean
}

type MarketRule {
  id: Int
  ruleContainerId: String
  origin: String
  originType: Int
  arrival: String
  arrivalType: Int
  exclude: Boolean
  isDeleted: Boolean
}

input MarketInput {
  id: Int
  ruleContainerId: String
  origin: String
  originType: Int
  arrival: String
  arrivalType: Int
  exclude: Boolean
  isDeleted: Boolean
}

type FareBasis {
  id: Int
  ruleContainerId: String
  name: String
  type: Int
  basisType: Int
  matchExclude: Boolean
  matchValue: String
  endsWithExclude: Boolean
  endsWithValue: String
  startsWithExclude: Boolean
  startsWithValue: String
  containsExclude: Boolean
  containsValue: String
  containsPosition: Int
  containsMultipleExclude: Boolean
  containsMultipleValue: String
  containsMultiplePosition: Int
  isDeleted: Boolean
}

input FareBasisInput {
  id: Int
  ruleContainerId: String
  name: String
  type: Int
  basisType: Int
  matchExclude: Boolean
  matchValue: String
  endsWithExclude: Boolean
  endsWithValue: String
  startsWithExclude: Boolean
  startsWithValue: String
  containsExclude: Boolean
  containsValue: String
  containsPosition: Int
  containsMultipleExclude: Boolean
  containsMultipleValue: String
  containsMultiplePosition: Int
  isDeleted: Boolean
}

type FareBasisUnit {
  id: Int
  name: String
}

type BookingClassRule {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  bookingClassType: Int
  bookingClass: String
  isDeleted: Boolean
}

type BookingClassCode {
  fareCategoryId: Int
  code: String
}

input BookingClassInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  bookingClassType: Int
  bookingClass: String
  isDeleted: Boolean
}

type AirlineRule {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  ruleType: Int
  carrierCode: String
  isDeleted: Boolean
}

input AirlineInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  ruleType: Int
  carrierCode: String
  isDeleted: Boolean
}

type AirlineCode {
  code: String
  name: String
}

type TicketDesignator {
  id: Int
  ruleContainerId: String
  ticketDesignator: String
  isDeleted: Boolean
}

input TicketDesignatorInput {
  id: Int
  ruleContainerId: String
  ticketDesignator: String
  isDeleted: Boolean
}

input TicketDesignatorBulkInput {
  id: Int
  ticketDesignator: String
}

type TourCode {
  id: Int
  ruleContainerId: String
  tourCode: String
  isDeleted: Boolean
}

input TourCodeInput {
  id: Int
  ruleContainerId: String
  tourCode: String
  isDeleted: Boolean
}

input TourCodeBulkInput {
  id: Int
  tourCode: String
}

type AdvancedTicketing {
  id: Int
  ruleContainerId: String
  unit: Int
  startRange: Int
  endRange: Int
  isDeleted: Boolean
}

input AdvancedTicketingInput {
  id: Int
  ruleContainerId: String
  unit: Int
  startRange: Int
  endRange: Int
  isDeleted: Boolean
}

type MinStay {
  id: Int
  ruleContainerId: String
  unit: Int
  value: Int
  dayOfWeekInclusion: Int
  isDeleted: Boolean
}

input MinStayInput {
  id: Int
  ruleContainerId: String
  unit: Int
  value: Int
  dayOfWeekInclusion: Int
  isDeleted: Boolean
}

type MaxStay {
  id: Int
  ruleContainerId: String
  unit: Int
  value: Int
  isDeleted: Boolean
}

input MaxStayInput {
  id: Int
  ruleContainerId: String
  unit: Int
  value: Int
  isDeleted: Boolean
}

type DayOfWeek {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  startDay: Int
  startTime: String
  endDay: Int
  endTime: String
  isDeleted: Boolean
}

input DayOfWeekInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  startDay: Int
  startTime: String
  endDay: Int
  endTime: String
  isDeleted: Boolean
}

type Stops {
  id: Int
  ruleContainerId: String
  minStops: Int
  maxStops: Int
  isDeleted: Boolean
}

input StopsInput {
  id: Int
  ruleContainerId: String
  minStops: Int
  maxStops: Int
  isDeleted: Boolean
}

type ConnectionPoint {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  connection: String
  connectionGeoType: Int
  isDeleted: Boolean
}

input ConnectionPointInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  connection: String
  connectionGeoType: Int
  isDeleted: Boolean
}

type FlightNumber {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  segmentType: Int
  carrierCode: String
  startRange: Int
  endRange: Int
  isDeleted: Boolean
}

input FlightNumberInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  segmentType: Int
  carrierCode: String
  startRange: Int
  endRange: Int
  isDeleted: Boolean
}

type Blackout {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

input BlackoutInput {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

type Distance {
  id: Int
  ruleContainerId: String
  distanceUnit: Int
  minDistance: Int
  maxDistance: Int
  isDeleted: Boolean
}

input DistanceInput {
  id: Int
  ruleContainerId: String
  distanceUnit: Int
  minDistance: Int
  maxDistance: Int
  isDeleted: Boolean
}

type Cabin {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  cabin: String
  isDeleted: Boolean
}

input CabinInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  cabin: String
  isDeleted: Boolean
}

type FareCategory {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  fareCategory: Int
  isDeleted: Boolean
}

type FareCategoryUnit {
  id: Int
  cabinId: Int
  code: String
  name: String
  shortName: String
}

input FareCategoryInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  fareCategory: Int
  isDeleted: Boolean
}

type DayUnit {
  id: Int
  name: String
}

type DayOfWeekUnit {
  id: Int
  name: String
}

extend type Query {
  ruleList(parentId: Int, parentType: Int): [Int] @auth
  dayUnitList: [DayUnit] @auth
  dayOfWeekUnitList: [DayOfWeekUnit] @auth
  fareCategoryUnitList: [FareCategoryUnit] @auth
  fareBasisUnitList: [FareBasisUnit] @auth
  ticketingDateList(parentId: Int, parentType: Int): [TicketingDate] @auth
  travelDateList(parentId: Int, parentType: Int): [TravelDate] @auth
  pointOfSaleList(parentId: Int, parentType: Int): [PointOfSale] @auth
  pointOfOriginList(parentId: Int, parentType: Int): [PointOfOrigin] @auth
  marketRuleList(parentId: Int, parentType: Int): [MarketRule] @auth
  fareBasisList(parentId: Int, fareBasisType: Int): [FareBasis] @auth
  bookingClassRuleList(parentId: Int, bookingClassType: Int): [BookingClassRule] @auth
  bookingClassCodeList: [BookingClassCode] @auth
  airlineRuleList(parentId: Int, parentType: Int, airlineType: Int): [AirlineRule] @auth
  airlineCodeList: [AirlineCode] @auth
  ticketDesignatorList(parentId: Int): [TicketDesignator] @auth
  tourCodeList(parentId: Int): [TourCode] @auth
  advancedTicketingList(parentId: Int): [AdvancedTicketing] @auth
  minStayList(parentId: Int): [MinStay] @auth
  maxStayList(parentId: Int): [MaxStay] @auth
  dayOfWeekList(parentId: Int): [DayOfWeek] @auth
  stopsList(parentId: Int): [Stops] @auth
  connectionPointList(parentId: Int): [ConnectionPoint] @auth
  flightNumberList(parentId: Int): [FlightNumber] @auth
  blackoutList(parentId: Int): [Blackout] @auth
  distanceList(parentId: Int): [Distance] @auth
  cabinList(parentId: Int): [Cabin] @auth
  fareCategoryList(parentId: Int): [FareCategory] @auth
}

extend type Mutation {
  updateTicketingDate(parentId: Int!, parentType: Int, ticketingDateList: [TicketingDateInput]!): [TicketingDate] @auth
  updateTicketingDateBulk(parentType: Int, ticketingDateList: [TicketingDateBulkInput]!): Int @auth
  updateTravelDate(parentId: Int!, parentType: Int, travelDateList: [TravelDateInput]!): [TravelDate] @auth
  updateTravelDateBulk(parentType: Int, travelDateList: [TravelDateBulkInput]!): Int @auth
  updatePointOfSale(parentId: Int!, parentType: Int, pointOfSaleList: [PointOfSaleInput]!): [PointOfSale] @auth
  updatePointOfOrigin(parentId: Int!, parentType: Int, pointOfOriginList: [PointOfOriginInput]!): [PointOfOrigin] @auth
  updateMarketRule(parentId: Int!, parentType: Int, marketRuleList: [MarketInput]!): [MarketRule] @auth
  updateBookingClass(parentId: Int!, bookingClassType: Int, bookingClassList: [BookingClassInput]!): [BookingClassRule] @auth
  updateAirlineRule(parentId: Int!, parentType: Int, airlineType: Int, airlineRuleList: [AirlineInput]!): [AirlineRule] @auth
  updateTicketDesignator(parentId: Int! ticketDesignatorList: [TicketDesignatorInput]!): [TicketDesignator] @auth
  updateTicketDesignatorBulk(parentType: Int ticketDesignatorList: [TicketDesignatorBulkInput]!): Int @auth
  updateTourCode(parentId: Int! tourCodeList: [TourCodeInput]!): [TourCode] @auth
  updateTourCodeBulk(parentType: Int tourCodeList: [TourCodeBulkInput]!): Int @auth
  updateStops(parentId: Int! stopsList: [StopsInput]!): [Stops] @auth
  updateAdvancedTicketing(parentId: Int! advancedTicketingList: [AdvancedTicketingInput]!): [AdvancedTicketing] @auth
  updateMinStay(parentId: Int! minStayList: [MinStayInput]!): [MinStay] @auth
  updateMaxStay(parentId: Int! maxStayList: [MaxStayInput]!): [MaxStay] @auth
  updateDayOfWeek(parentId: Int! dayOfWeekList: [DayOfWeekInput]!): [DayOfWeek] @auth
  updateConnectionPoint(parentId: Int! connectionPointList: [ConnectionPointInput]!): [ConnectionPoint] @auth
  updateFlightNumber(parentId: Int! flightNumberList: [FlightNumberInput]!): [FlightNumber] @auth
  updateDistance(parentId: Int! distanceList: [DistanceInput]!): [Distance] @auth
  updateCabin(parentId: Int! cabinList: [CabinInput]!): [Cabin] @auth
  updateFareCategory(parentId: Int! fareCategoryList: [FareCategoryInput]!): [FareCategory] @auth
  updateBlackout(parentId: Int! blackoutList: [BlackoutInput]!): [Blackout] @auth
  updateFareBasis(parentId: Int!, fareBasisType: Int, fareBasisList: [FareBasisInput]!): [FareBasis] @auth
  deleteRule(id: Int!, ruleType: Int!): Int @auth
}

`;

/***/ }),

/***/ "./typeDefs/user.js":
/*!**************************!*\
  !*** ./typeDefs/user.js ***!
  \**************************/
/*! exports provided: user */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user", function() { return user; });
const user = `
type User {
  id: Int
  name: String
  email: String
}

type ProjectManagerUser {
  id: Int,
  name: String,
  email: String
}

type LeadAnalystUser {
  id: Int,
  name: String,
  email: String
}

type DataSpecialistUser {
  id: Int,
  name: String,
  email: String
}

extend type Query {
  userList(clientId: Int): [User] @auth
  user: User @auth
  projectManagerList(clientId: Int): [ProjectManagerUser] @auth
  leadAnalystList(clientId: Int): [LeadAnalystUser] @auth
  dataSpecialistList(clientId: Int): [DataSpecialistUser] @auth
}
`;

/***/ }),

/***/ "./utils/email.js":
/*!************************!*\
  !*** ./utils/email.js ***!
  \************************/
/*! exports provided: sendNoteEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendNoteEmail", function() { return sendNoteEmail; });
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ "aws-sdk");
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./constants/index.js");


const ses = new aws_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.SES({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION
});
const sendNoteEmail = async (db, parentId, parentTable, assignedToId) => {
  const user = await db('blops.advito_user').where('id', assignedToId).first();
  const {
    email_subject: emailSubject,
    email_body: emailBody
  } = await db('blops.email_template').where('template_name', 'Note').where('advito_application_id', _constants__WEBPACK_IMPORTED_MODULE_1__["ADVITO_AIR_APPLICATION"]).first();
  let message = emailBody;
  let projectId = null;
  let projectName = '';
  let contractName = '';
  let pricingTermName = '';
  let discountName = '';
  let targetTermName = '';

  if (parentTable === 'pricingterm') {
    const {
      contractcontainerid,
      name: ptName
    } = await getPricingTerm(db, parentId);
    const {
      projectid: pId,
      name: cName
    } = await getContract(db, contractcontainerid);
    const {
      id,
      name_val: pName
    } = await getProject(db, pId);
    pricingTermName = ptName;
    contractName = cName;
    projectName = pName;
    projectId = id;
    const regex = new RegExp(String.raw`\[\[ADDITIONALINFO]]`, 'g');
    message = message.replace(regex, `
    <p>Pricing Term Name: ${pricingTermName}</p>
    `);
  } else if (parentTable === 'targetterm_v2') {
    const {
      contractcontainerid,
      name: tName
    } = await getTargetTerm(db, parentId);
    const {
      projectid: pId,
      name: cName
    } = await getContract(db, contractcontainerid);
    const {
      id,
      name_val: pName
    } = await getProject(db, pId);
    targetTermName = tName;
    contractName = cName;
    projectName = pName;
    projectId = id;
    const regex = new RegExp(String.raw`\[\[ADDITIONALINFO]]`, 'g');
    message = message.replace(regex, `
    <p>Target Term Name: ${targetTermName}</p>
    `);
  } else if (parentTable === 'discount') {
    const {
      pricingtermid,
      generateddiscountname: dName
    } = await getDiscount(db, parentId);
    const {
      contractcontainerid,
      name: ptName
    } = await getPricingTerm(db, pricingtermid);
    const {
      projectid: pId,
      name: cName
    } = await getContract(db, contractcontainerid);
    const {
      id,
      name_val: pName
    } = await getProject(db, pId);
    discountName = dName;
    pricingTermName = ptName;
    contractName = cName;
    projectName = pName;
    projectId = id;
    const regex = new RegExp(String.raw`\[\[ADDITIONALINFO]]`, 'g');
    message = message.replace(regex, `
    <p>Pricing Term Name: ${pricingTermName}</p>
    <p>Discount Name: ${discountName}</p>
    `);
  }

  const placeholders = {
    NAMEFIRST: user.name_first,
    URL: `${_constants__WEBPACK_IMPORTED_MODULE_1__["APP_URL"]}/${projectId}/contracts`,
    CONTRACTNAME: contractName,
    PROJECTNAME: projectName
  };
  Object.keys(placeholders).forEach(key => {
    const regex = new RegExp(String.raw`\[\[${key}]]`, 'g');
    message = message.replace(regex, placeholders[key]);
  });
  const params = {
    Source: _constants__WEBPACK_IMPORTED_MODULE_1__["EMAIL_SENDER"],
    Destination: {
      ToAddresses: [user.email],
      BccAddresses: _constants__WEBPACK_IMPORTED_MODULE_1__["EMAIL_BCC"]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: message
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: emailSubject
      }
    }
  };
  await ses.sendEmail(params).promise();
};

const getProject = async (db, id) => await db('project').where('id', id).first();

const getContract = async (db, id) => await db('contractcontainer').where('id', id).first();

const getPricingTerm = async (db, id) => await db('pricingterm').where('id', id).first();

const getTargetTerm = async (db, id) => await db('targetterm_v2').where('id', id).first();

const getDiscount = async (db, id) => await db('discount').where('id', id).first();

/***/ }),

/***/ "./utils/index.js":
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
/*! exports provided: sendNoteEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _email__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./email */ "./utils/email.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sendNoteEmail", function() { return _email__WEBPACK_IMPORTED_MODULE_0__["sendNoteEmail"]; });



/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),

/***/ "graphql/language":
/*!***********************************!*\
  !*** external "graphql/language" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/language");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),

/***/ "lodash.merge":
/*!*******************************!*\
  !*** external "lodash.merge" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.merge");

/***/ }),

/***/ "objection":
/*!****************************!*\
  !*** external "objection" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("objection");

/***/ }),

/***/ "uuid/v4":
/*!**************************!*\
  !*** external "uuid/v4" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ })

/******/ })));
//# sourceMappingURL=handler.js.map