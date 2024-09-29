"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@react-leaflet";
exports.ids = ["vendor-chunks/@react-leaflet"];
exports.modules = {

/***/ "(ssr)/./node_modules/@react-leaflet/core/lib/context.js":
/*!*********************************************************!*\
  !*** ./node_modules/@react-leaflet/core/lib/context.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CONTEXT_VERSION: () => (/* binding */ CONTEXT_VERSION),\n/* harmony export */   LeafletContext: () => (/* binding */ LeafletContext),\n/* harmony export */   LeafletProvider: () => (/* binding */ LeafletProvider),\n/* harmony export */   createLeafletContext: () => (/* binding */ createLeafletContext),\n/* harmony export */   extendContext: () => (/* binding */ extendContext),\n/* harmony export */   useLeafletContext: () => (/* binding */ useLeafletContext)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n\nconst CONTEXT_VERSION = 1;\nfunction createLeafletContext(map) {\n    return Object.freeze({\n        __version: CONTEXT_VERSION,\n        map\n    });\n}\nfunction extendContext(source, extra) {\n    return Object.freeze({\n        ...source,\n        ...extra\n    });\n}\nconst LeafletContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);\nconst LeafletProvider = LeafletContext.Provider;\nfunction useLeafletContext() {\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(LeafletContext);\n    if (context == null) {\n        throw new Error('No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>');\n    }\n    return context;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQHJlYWN0LWxlYWZsZXQvY29yZS9saWIvY29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWtEO0FBQzNDO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPLHVCQUF1QixvREFBYTtBQUNwQztBQUNBO0FBQ1Asb0JBQW9CLGlEQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9ub2RlX21vZHVsZXMvQHJlYWN0LWxlYWZsZXQvY29yZS9saWIvY29udGV4dC5qcz81NTVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG5leHBvcnQgY29uc3QgQ09OVEVYVF9WRVJTSU9OID0gMTtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMZWFmbGV0Q29udGV4dChtYXApIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIF9fdmVyc2lvbjogQ09OVEVYVF9WRVJTSU9OLFxuICAgICAgICBtYXBcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmRDb250ZXh0KHNvdXJjZSwgZXh0cmEpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIC4uLnNvdXJjZSxcbiAgICAgICAgLi4uZXh0cmFcbiAgICB9KTtcbn1cbmV4cG9ydCBjb25zdCBMZWFmbGV0Q29udGV4dCA9IGNyZWF0ZUNvbnRleHQobnVsbCk7XG5leHBvcnQgY29uc3QgTGVhZmxldFByb3ZpZGVyID0gTGVhZmxldENvbnRleHQuUHJvdmlkZXI7XG5leHBvcnQgZnVuY3Rpb24gdXNlTGVhZmxldENvbnRleHQoKSB7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoTGVhZmxldENvbnRleHQpO1xuICAgIGlmIChjb250ZXh0ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb250ZXh0IHByb3ZpZGVkOiB1c2VMZWFmbGV0Q29udGV4dCgpIGNhbiBvbmx5IGJlIHVzZWQgaW4gYSBkZXNjZW5kYW50IG9mIDxNYXBDb250YWluZXI+Jyk7XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@react-leaflet/core/lib/context.js\n");

/***/ })

};
;