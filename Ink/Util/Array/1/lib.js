/**
 * @module Ink.Util.Array_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.Array', '1', [], function() {

    'use strict';

    /**
     * Utility functions to use with Arrays
     *
     * @class Ink.Util.Array
     * @version 1
     * @static
     */
    var InkArray = {

        /**
         * Checks if value exists in array
         *
         * @method inArray
         * @param {Mixed} value
         * @param {Array} arr
         * @return {Boolean}    True if value exists in the array
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2', 'value3' ];
         *         if( InkArray.inArray( 'value2', testArray ) === true ){
         *             console.log( "Yep it's in the array." );
         *         } else {
         *             console.log( "No it's NOT in the array." );
         *         }
         *     });
         */
        inArray: function(value, arr) {
            if (typeof arr === 'object') {
                for (var i = 0, f = arr.length; i < f; ++i) {
                    if (arr[i] === value) {
                        return true;
                    }
                }
            }
            return false;
        },

        /**
         * Sorts an array of object by an object property
         *
         * @method sortMulti
         * @param {Array} arr array of objects to sort
         * @param {String} key property to sort by
         * @return {Array|Boolean} False if it's not an array, returns a sorted array if it's an array.
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [
         *             { 'myKey': 'value1' },
         *             { 'myKey': 'value2' },
         *             { 'myKey': 'value3' }
         *         ];
         *
         *         InkArray.sortMulti( testArray, 'myKey' );
         *     });
         */
        sortMulti: function(arr, key) {
            if (typeof arr === 'undefined' || arr.constructor !== Array) { return false; }
            if (typeof key !== 'string') { return arr.sort(); }
            if (arr.length > 0) {
                if (typeof(arr[0][key]) === 'undefined') { return false; }
                arr.sort(function(a, b){
                    var x = a[key];
                    var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
            return arr;
        },

        /**
         * Returns the associated key of an array value
         *
         * @method keyValue
         * @param {String} value Value to search for
         * @param {Array} arr Array where the search will run
         * @param {Boolean} [first] Flag that determines if the search stops at first occurrence. It also returns an index number instead of an array of indexes.
         * @return {Boolean|Number|Array} False if not exists | number if exists and 3rd input param is true | array if exists and 3rd input param is not set or it is !== true
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2', 'value3', 'value2' ];
         *         console.log( InkArray.keyValue( 'value2', testArray, true ) ); // Result: 1
         *         console.log( InkArray.keyValue( 'value2', testArray ) ); // Result: [1, 3]
         *     });
         */
        keyValue: function(value, arr, first) {
            if (typeof value !== 'undefined' && typeof arr === 'object' && this.inArray(value, arr)) {
                var aKeys = [];
                for (var i = 0, f = arr.length; i < f; ++i) {
                    if (arr[i] === value) {
                        if (typeof first !== 'undefined' && first === true) {
                            return i;
                        } else {
                            aKeys.push(i);
                        }
                    }
                }
                return aKeys;
            }
            return false;
        },

        /**
         * Returns the array shuffled, false if the param is not an array
         *
         * @method shuffle
         * @param {Array} arr Array to shuffle
         * @return {Boolean|Number|Array} False if not an array | Array shuffled
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2', 'value3', 'value2' ];
         *         console.log( InkArray.shuffle( testArray ) ); // Result example: [ 'value3', 'value2', 'value2', 'value1' ]
         *     });
         */
        shuffle: function(arr) {
            if (typeof(arr) !== 'undefined' && arr.constructor !== Array) { return false; }
            var total   = arr.length,
                tmp1    = false,
                rnd     = false;

            while (total--) {
                rnd        = Math.floor(Math.random() * (total + 1));
                tmp1       = arr[total];
                arr[total] = arr[rnd];
                arr[rnd]   = tmp1;
            }
            return arr;
        },

        /**
         * Runs a function through each of the elements of an array
         *
         * @method each
         * @param {Array} arr Array to be cycled/iterated
         * @param {Function} cb The function receives as arguments the value, index and array.
         * @return {Array} Array iterated.
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2', 'value3', 'value2' ];
         *         InkArray.each( testArray, function( value, index, arr ){
         *             console.log( 'The value is: ' + value + ' | The index is: ' + index );
         *         });
         *     });
         */
        each: function(arr, cb) {
            var arrCopy    = arr.slice(0),
                total      = arrCopy.length,
                iterations = Math.floor(total / 8),
                leftover   = total % 8,
                i          = 0;

            if (leftover > 0) { // Duff's device pattern
                do {
                    cb(arrCopy[i++], i-1, arr);
                } while (--leftover > 0);
            }
            if (iterations === 0) { return arr; }
            do {
                cb(arrCopy[i++], i-1, arr);
                cb(arrCopy[i++], i-1, arr);
                cb(arrCopy[i++], i-1, arr);
                cb(arrCopy[i++], i-1, arr);
                cb(arrCopy[i++], i-1, arr);
                cb(arrCopy[i++], i-1, arr);
                cb(arrCopy[i++], i-1, arr);
                cb(arrCopy[i++], i-1, arr);
            } while(--iterations > 0);

            return arr;
        },

        /**
         * Runs a callback function, which should return true or false.
         * If one of the 'runs' returns true, it will return. Otherwise if none returns true, it will return false.
         * See more at: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some (MDN)
         *
         * @method some
         * @param {Array} arr The array you walk to iterate through
         * @param {Function} cb The callback that will be called on the array's elements. It receives the value, the index and the array as arguments.
         * @param {Object} Context object of the callback function
         * @return {Boolean} True if the callback returns true at any point, false otherwise
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray1 = [ 10, 20, 50, 100, 30 ];
         *         var testArray2 = [ 1, 2, 3, 4, 5 ];
         *
         *         function myTestFunction( value, index, arr ){
         *             if( value > 90 ){
         *                 return true;
         *             }
         *             return false;
         *         }
         *         console.log( InkArray.some( testArray1, myTestFunction, null ) ); // Result: true
         *         console.log( InkArray.some( testArray2, myTestFunction, null ) ); // Result: false
         *     });
         */
        some: function(arr, cb, context){

            if (arr === null){
                throw new TypeError('First argument is invalid.');
            }

            var t = Object(arr);
            var len = t.length >>> 0;
            if (typeof cb !== "function"){ throw new TypeError('Second argument must be a function.'); }

            for (var i = 0; i < len; i++) {
                if (i in t && cb.call(context, t[i], i, t)){ return true; }
            }

            return false;
        },

        /**
         * Returns an array containing every item that is shared between the two given arrays
         *
         * @method intersect
         * @param {Array} arr Array1 to be intersected with Array2
         * @param {Array} arr Array2 to be intersected with Array1
         * @return {Array} Empty array if one of the arrays is false (or do not intersect) | Array with the intersected values
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray1 = [ 'value1', 'value2', 'value3' ];
         *         var testArray2 = [ 'value2', 'value3', 'value4', 'value5', 'value6' ];
         *         console.log( InkArray.intersect( testArray1,testArray2 ) ); // Result: [ 'value2', 'value3' ]
         *     });
         */
        intersect: function(arr1, arr2) {
            if (!arr1 || !arr2 || arr1 instanceof Array === false || arr2 instanceof Array === false) {
                return [];
            }

            var shared = [];
            for (var i = 0, I = arr1.length; i<I; ++i) {
                for (var j = 0, J = arr2.length; j < J; ++j) {
                    if (arr1[i] === arr2[j]) {
                        shared.push(arr1[i]);
                    }
                }
            }

            return shared;
        },

        /**
         * Convert lists type to type array
         *
         * @method convert
         * @param {Array} arr Array to be converted
         * @return {Array} Array resulting of the conversion
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2' ];
         *         testArray.myMethod = function(){
         *             console.log('stuff');
         *         }
         *
         *         console.log( InkArray.convert( testArray ) ); // Result: [ 'value1', 'value2' ]
         *     });
         */
        convert: function(arr) {
            return Array.prototype.slice.call(arr || [], 0);
        },

        /**
         * Insert value into the array on specified idx
         *
         * @method insert
         * @param {Array} arr Array where the value will be inserted
         * @param {Number} idx Index of the array where the value should be inserted
         * @param {Mixed} value Value to be inserted
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2' ];
         *         console.log( InkArray.insert( testArray, 1, 'value3' ) ); // Result: [ 'value1', 'value3', 'value2' ]
         *     });
         */
        insert: function(arr, idx, value) {
            arr.splice(idx, 0, value);
        },

        /**
         * Remove a range of values from the array
         *
         * @method remove
         * @param {Array} arr Array where the value will be inserted
         * @param {Number} from Index of the array where the removal will start removing.
         * @param {Number} rLen Number of items to be removed from the index onwards.
         * @return {Array} An array with the remaining values
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2', 'value3', 'value4', 'value5' ];
         *         console.log( InkArray.remove( testArray, 1, 3 ) ); // Result: [ 'value1', 'value4', 'value5' ]
         *     });
         */
        remove: function(arr, from, rLen){
            var output = [];

            for(var i = 0, iLen = arr.length; i < iLen; i++){
                if(i >= from && i < from + rLen){
                    continue;
                }

                output.push(arr[i]);
            }

            return output;
        }
    };

    return InkArray;

});


/*
 *  TODO - INCLUDE THIS ON Ink.Util.Array
 *
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(cb, thisArg) {
        var O, len, T, k, kValue;

        if (this === null || this === undefined) {
            throw new TypeError('this is null or not defined');
        }

        O = Object(this);
        len = O.length >>> 0;

        if ({}.toString.call(cb) !== '[object Function]') {
            throw new TypeError(cb + ' is not a function');
        }

        if (thisArg) {
            T = thisArg;
        }

        k = 0;

        while (k < len) {
            if (Object.prototype.hasOwnProperty.call(O, k)) {
                kValue = O[k];
                cb.call(T, kValue, k, O);
            }
            ++k;
        }
    };
}


// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map
if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
        var T, A, k;

        if (this === null || this === undefined) {
            new TypeError(" this is null or not defined");
        }

        var O = Object(this);
        var len = O.length >>> 0;

        if ({}.toString.call(callback) !== "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }

        if (thisArg) {
            T = thisArg;
        }
        A = new Array(len);
        k = 0;

        while(k < len) {
            var kValue, mappedValue;
            if (k in O) {
                kValue = O[ k ];
                mappedValue = callback.call(T, kValue, k, O);
                A[ k ] = mappedValue;
            }
            ++k;
        }
        return A;
    };
}

*/
