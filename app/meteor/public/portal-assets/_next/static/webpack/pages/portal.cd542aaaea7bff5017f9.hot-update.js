webpackHotUpdate_N_E("pages/portal",{

/***/ "./pages/media.js":
/*!************************!*\
  !*** ./pages/media.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n\n\n\n\n\nvar _jsxFileName = \"/Users/albertzak/Git/rosalind/app/portal/pages/media.js\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\nvar imgStyle = {\n  maxWidth: '25%',\n  height: 'auto',\n  outline: 0,\n  margin: 3\n};\nvar isDownloadAttributeSupported = typeof document !== 'undefined' && 'download' in document.createElement('a');\n\nvar MediaPage = function MediaPage(_ref) {\n  _s();\n\n  var token = _ref.token;\n\n  var _useState = useState(true),\n      _useState2 = Object(_Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_useState, 2),\n      loading = _useState2[0],\n      setLoading = _useState2[1];\n\n  var _useState3 = useState(true),\n      _useState4 = Object(_Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_useState3, 2),\n      error = _useState4[0],\n      setError = _useState4[1];\n\n  var _useState5 = useState(),\n      _useState6 = Object(_Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_useState5, 2),\n      media = _useState6[0],\n      setMedia = _useState6[1];\n\n  useEffect( /*#__PURE__*/Object(_Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])( /*#__PURE__*/_Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {\n    var body, req, res;\n    return _Users_albertzak_Git_rosalind_app_portal_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            body = JSON.stringify({\n              token: token\n            });\n            _context.next = 3;\n            return fetch((apiBaseUrl || '') + '/portal/media', {\n              method: 'POST',\n              headers: {\n                'content-type': 'application/json',\n                'content-length': body.length\n              },\n              body: body\n            });\n\n          case 3:\n            req = _context.sent;\n            _context.next = 6;\n            return req.json();\n\n          case 6:\n            res = _context.sent;\n\n            if (res.error) {\n              setError(res.error);\n            } else {\n              setMedia(res);\n            }\n\n          case 8:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  })), [token]);\n\n  if (loading) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: \"Einen Moment bitte, Bilder werden geladen...\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 39,\n      columnNumber: 12\n    }, _this);\n  }\n\n  var downloadAll = function downloadAll(e) {\n    e.preventDefault();\n    e.stopPropagation();\n\n    for (var i = 0; i < media.length; i++) {\n      document.getElementById('link-' + media[i]._id).click();\n    }\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"p\", {\n      children: \"Sie k\\xF6nnen die Bilder innerhalb von 14 Tagen abspeichern.\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 51,\n      columnNumber: 5\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"p\", {\n      children: token\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 53,\n      columnNumber: 5\n    }, _this), isDownloadAttributeSupported ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"p\", {\n      children: \"Tippen Sie auf ein Bild, um es zu speichern.\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 57,\n      columnNumber: 9\n    }, _this) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"p\", {\n      children: \"Tippen Sie auf ein Bild und halten Sie gedr\\xFCckt, um es zu speichern.\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 58,\n      columnNumber: 9\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: downloadAll,\n      children: \"Alle Bilder speichern\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 61,\n      columnNumber: 5\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 65,\n      columnNumber: 5\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 66,\n      columnNumber: 5\n    }, _this), media.map(function (i) {\n      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"a\", {\n        id: 'link-' + m._id,\n        download: m.filename,\n        href: m.path,\n        title: m.title,\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"img\", {\n          style: imgStyle,\n          alt: m.title,\n          src: m.preview\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 77,\n          columnNumber: 11\n        }, _this)\n      }, m._id, false, {\n        fileName: _jsxFileName,\n        lineNumber: 70,\n        columnNumber: 9\n      }, _this);\n    })]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 50,\n    columnNumber: 10\n  }, _this);\n};\n\n_s(MediaPage, \"U88Tk5b8au6T9MqtgUj3P45eL60=\");\n\n_c = MediaPage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MediaPage);\n\nvar _c;\n\n$RefreshReg$(_c, \"MediaPage\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ \"./node_modules/next/dist/compiled/webpack/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbWVkaWEuanM/MDlhNCJdLCJuYW1lcyI6WyJpbWdTdHlsZSIsIm1heFdpZHRoIiwiaGVpZ2h0Iiwib3V0bGluZSIsIm1hcmdpbiIsImlzRG93bmxvYWRBdHRyaWJ1dGVTdXBwb3J0ZWQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJNZWRpYVBhZ2UiLCJ0b2tlbiIsInVzZVN0YXRlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwibWVkaWEiLCJzZXRNZWRpYSIsInVzZUVmZmVjdCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZmV0Y2giLCJhcGlCYXNlVXJsIiwibWV0aG9kIiwiaGVhZGVycyIsImxlbmd0aCIsInJlcSIsImpzb24iLCJyZXMiLCJkb3dubG9hZEFsbCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImkiLCJnZXRFbGVtZW50QnlJZCIsIl9pZCIsImNsaWNrIiwibWFwIiwibSIsImZpbGVuYW1lIiwicGF0aCIsInRpdGxlIiwicHJldmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFFBQVEsR0FBRztBQUNmQyxVQUFRLEVBQUUsS0FESztBQUVmQyxRQUFNLEVBQUUsTUFGTztBQUdmQyxTQUFPLEVBQUUsQ0FITTtBQUlmQyxRQUFNLEVBQUU7QUFKTyxDQUFqQjtBQU9BLElBQU1DLDRCQUE0QixHQUNoQyxPQUFPQyxRQUFQLEtBQW9CLFdBQXBCLElBQ0EsY0FBY0EsUUFBUSxDQUFDQyxhQUFULENBQXVCLEdBQXZCLENBRmhCOztBQUlBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLE9BQWU7QUFBQTs7QUFBQSxNQUFaQyxLQUFZLFFBQVpBLEtBQVk7O0FBQUEsa0JBQ0RDLFFBQVEsQ0FBQyxJQUFELENBRFA7QUFBQTtBQUFBLE1BQ3hCQyxPQUR3QjtBQUFBLE1BQ2ZDLFVBRGU7O0FBQUEsbUJBRUxGLFFBQVEsQ0FBQyxJQUFELENBRkg7QUFBQTtBQUFBLE1BRXhCRyxLQUZ3QjtBQUFBLE1BRWpCQyxRQUZpQjs7QUFBQSxtQkFHTEosUUFBUSxFQUhIO0FBQUE7QUFBQSxNQUd4QkssS0FId0I7QUFBQSxNQUdqQkMsUUFIaUI7O0FBSy9CQyxXQUFTLDBTQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNGQyxnQkFERSxHQUNLQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUMxQlgsbUJBQUssRUFBTEE7QUFEMEIsYUFBZixDQURMO0FBQUE7QUFBQSxtQkFJVVksS0FBSyxDQUFDLENBQUNDLFVBQVUsSUFBSSxFQUFmLElBQXFCLGVBQXRCLEVBQ3JCO0FBQ0VDLG9CQUFNLEVBQUUsTUFEVjtBQUVFQyxxQkFBTyxFQUFFO0FBQ1AsZ0NBQWdCLGtCQURUO0FBRVAsa0NBQWtCTixJQUFJLENBQUNPO0FBRmhCLGVBRlg7QUFNRVAsa0JBQUksRUFBRUE7QUFOUixhQURxQixDQUpmOztBQUFBO0FBSUZRLGVBSkU7QUFBQTtBQUFBLG1CQWFVQSxHQUFHLENBQUNDLElBQUosRUFiVjs7QUFBQTtBQWFGQyxlQWJFOztBQWNSLGdCQUFJQSxHQUFHLENBQUNmLEtBQVIsRUFBZTtBQUNiQyxzQkFBUSxDQUFDYyxHQUFHLENBQUNmLEtBQUwsQ0FBUjtBQUNELGFBRkQsTUFFTztBQUNMRyxzQkFBUSxDQUFDWSxHQUFELENBQVI7QUFDRDs7QUFsQk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBRCxJQW1CTixDQUFDbkIsS0FBRCxDQW5CTSxDQUFUOztBQXFCQSxNQUFJRSxPQUFKLEVBQWE7QUFDWCx3QkFBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFQO0FBQ0Q7O0FBRUQsTUFBTWtCLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLENBQUQsRUFBTztBQUN6QkEsS0FBQyxDQUFDQyxjQUFGO0FBQ0FELEtBQUMsQ0FBQ0UsZUFBRjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdsQixLQUFLLENBQUNVLE1BQTFCLEVBQWtDUSxDQUFDLEVBQW5DLEVBQXVDO0FBQ3JDM0IsY0FBUSxDQUFDNEIsY0FBVCxDQUF3QixVQUFVbkIsS0FBSyxDQUFDa0IsQ0FBRCxDQUFMLENBQVNFLEdBQTNDLEVBQWdEQyxLQUFoRDtBQUNEO0FBQ0YsR0FORDs7QUFRQSxzQkFBTztBQUFBLDRCQUNMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREssZUFHTDtBQUFBLGdCQUFJM0I7QUFBSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBSEssRUFNSEosNEJBQTRCLGdCQUMxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUQwQixnQkFFMUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFSQyxlQVdMO0FBQVEsYUFBTyxFQUFFd0IsV0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFYSyxlQWVMO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFmSyxlQWdCTDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBaEJLLEVBbUJIZCxLQUFLLENBQUNzQixHQUFOLENBQVUsVUFBQUosQ0FBQztBQUFBLDBCQUNUO0FBQ0UsVUFBRSxFQUFFLFVBQVVLLENBQUMsQ0FBQ0gsR0FEbEI7QUFHRSxnQkFBUSxFQUFFRyxDQUFDLENBQUNDLFFBSGQ7QUFJRSxZQUFJLEVBQUVELENBQUMsQ0FBQ0UsSUFKVjtBQUtFLGFBQUssRUFBRUYsQ0FBQyxDQUFDRyxLQUxYO0FBQUEsK0JBT0U7QUFBSyxlQUFLLEVBQUV6QyxRQUFaO0FBQXNCLGFBQUcsRUFBRXNDLENBQUMsQ0FBQ0csS0FBN0I7QUFBb0MsYUFBRyxFQUFFSCxDQUFDLENBQUNJO0FBQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFQRixTQUVPSixDQUFDLENBQUNILEdBRlQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURTO0FBQUEsS0FBWCxDQW5CRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBUDtBQWdDRCxDQXRFRDs7R0FBTTNCLFM7O0tBQUFBLFM7QUF3RVNBLHdFQUFmIiwiZmlsZSI6Ii4vcGFnZXMvbWVkaWEuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbWdTdHlsZSA9IHtcbiAgbWF4V2lkdGg6ICcyNSUnLFxuICBoZWlnaHQ6ICdhdXRvJyxcbiAgb3V0bGluZTogMCxcbiAgbWFyZ2luOiAzXG59XG5cbmNvbnN0IGlzRG93bmxvYWRBdHRyaWJ1dGVTdXBwb3J0ZWQgPVxuICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmXG4gICdkb3dubG9hZCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cbmNvbnN0IE1lZGlhUGFnZSA9ICh7IHRva2VuIH0pID0+IHtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSlcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSh0cnVlKVxuICBjb25zdCBbbWVkaWEsIHNldE1lZGlhXSA9IHVzZVN0YXRlKClcblxuICB1c2VFZmZlY3QoYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICB0b2tlblxuICAgIH0pXG4gICAgY29uc3QgcmVxID0gYXdhaXQgZmV0Y2goKGFwaUJhc2VVcmwgfHwgJycpICsgJy9wb3J0YWwvbWVkaWEnLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ2NvbnRlbnQtbGVuZ3RoJzogYm9keS5sZW5ndGhcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogYm9keVxuICAgICAgfSlcbiAgICBjb25zdCByZXMgPSBhd2FpdCByZXEuanNvbigpXG4gICAgaWYgKHJlcy5lcnJvcikge1xuICAgICAgc2V0RXJyb3IocmVzLmVycm9yKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRNZWRpYShyZXMpXG4gICAgfVxuICB9LCBbdG9rZW5dKVxuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIDxkaXY+RWluZW4gTW9tZW50IGJpdHRlLCBCaWxkZXIgd2VyZGVuIGdlbGFkZW4uLi48L2Rpdj5cbiAgfVxuXG4gIGNvbnN0IGRvd25sb2FkQWxsID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZWRpYS5sZW5ndGg7IGkrKykge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstJyArIG1lZGlhW2ldLl9pZCkuY2xpY2soKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiA8ZGl2PlxuICAgIDxwPlNpZSBrw7ZubmVuIGRpZSBCaWxkZXIgaW5uZXJoYWxiIHZvbiAxNCBUYWdlbiBhYnNwZWljaGVybi48L3A+XG5cbiAgICA8cD57dG9rZW59PC9wPlxuXG4gICAge1xuICAgICAgaXNEb3dubG9hZEF0dHJpYnV0ZVN1cHBvcnRlZFxuICAgICAgPyA8cD5UaXBwZW4gU2llIGF1ZiBlaW4gQmlsZCwgdW0gZXMgenUgc3BlaWNoZXJuLjwvcD5cbiAgICAgIDogPHA+VGlwcGVuIFNpZSBhdWYgZWluIEJpbGQgdW5kIGhhbHRlbiBTaWUgZ2VkcsO8Y2t0LCB1bSBlcyB6dSBzcGVpY2hlcm4uPC9wPlxuICAgIH1cblxuICAgIDxidXR0b24gb25DbGljaz17ZG93bmxvYWRBbGx9PlxuICAgICAgQWxsZSBCaWxkZXIgc3BlaWNoZXJuXG4gICAgPC9idXR0b24+XG5cbiAgICA8YnIgLz5cbiAgICA8YnIgLz5cblxuICAgIHtcbiAgICAgIG1lZGlhLm1hcChpID0+XG4gICAgICAgIDxhXG4gICAgICAgICAgaWQ9eydsaW5rLScgKyBtLl9pZH1cbiAgICAgICAgICBrZXk9e20uX2lkfVxuICAgICAgICAgIGRvd25sb2FkPXttLmZpbGVuYW1lfVxuICAgICAgICAgIGhyZWY9e20ucGF0aH1cbiAgICAgICAgICB0aXRsZT17bS50aXRsZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxpbWcgc3R5bGU9e2ltZ1N0eWxlfSBhbHQ9e20udGl0bGV9IHNyYz17bS5wcmV2aWV3fSAvPlxuICAgICAgICA8L2E+XG4gICAgICApXG4gICAgfVxuICA8L2Rpdj5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFQYWdlXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/media.js\n");

/***/ })

})