'use strict';

/**
 *  DIY Array.
 */
function Curray () {
    this.length = 0;

    if (arguments.length === 1) {
        this.length = arguments[0];
    } else if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        };
        this.length = arguments.length;
    };
};

Curray.prototype.push = function (element) {
    this[this.length++] = element;

    return this.length;
};

Curray.prototype.pop = function() {
    var last = this[--this.length];

    delete this[this.length];

    return last;
};

Curray.prototype.forEach = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};

Curray.prototype.concat = function(element) {
    for (var i = 0; i < element.length; i++) {
        this[this.length + i] = element[i]
    };
    this.length = this.length + element.length;
    return this;
};

Curray.prototype.copyWithin = function(target, start, end) {
    for (var i = start; i < end; i++) {
        this[target++] = this[i];
    };
    return this;
};

Curray.prototype.find = function(expression) {
    if (arguments.length === 0) throw TypeError ('missing argument when calling function find');

    for (var i = 0; i < this.length; i++){
        if (expression(this[i])) {
            return this[i];
        };
    };
};

Curray.prototype.every = function(expression) {
    for (var i = 0; i < this.length; i++) {
        var check = true && expression(this[i])
    };
    return true && check;
};

Curray.prototype.flat = function(depth, memo) {

    depth === undefined? depth = 1 : depth;

    if(memo === undefined) {
        var newCurray = new Curray();
    } else {
        var newCurray = memo;
    };

    if (depth > 1) {
        var count = this.length + 1;
    } else {
        var count = this.length
    };

    if(depth !== 0) {
        for (var i = 0; i < count; i++) {
            var element = this[i];
            if(element instanceof Object) {
                depth--
                element.flat(depth, newCurray);
            } else {
                newCurray.push(element);
            };
        };
    };
    return newCurray;
}

Curray.prototype.map = function(expression) {
    var curray = this;
    var x = this.length;
    var result = new Curray();
    for (var i = 0; i < x; i++) {
        var element = this[i]
        result.push(expression(element, i, curray));
    };
    return result;
};

// Curray.prototype.flatMap = function(expression) {

//     var currayFlat = new Curray();
//     var result = new Curray();

//     currayFlat.push(this.flat(1));

//     var x = currayFlat.length;

//     for (var i = 0; i < x; i++) {
//         var element = currayFlat[i]
//         result.push(expression(element, i, currayFlat));
//     };
//     return result;
// };

Curray.prototype.includes = function(value, index) {
    var start = 0;
    var end = this.length
    index === undefined ? start : start = index;

    for (var i = start; i < end; i++) {
        var element = this[i];
        var check = false || element === value;
        if (check === true) { return check; };
    };

    return check;
};

Curray.prototype.indexOf = function(value) {

    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        var check = false || element === value;
        if (check === true) { return i; };
    };

    return -1;
};

Curray.prototype.join = function(value) {
    value === undefined? value = ', ' : {};
    var result;
    var lastNum = this.length -1;
    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        if (i === 0) {
            result = element + value;
        } else if (i === lastNum) {
            result += element;
        } else {
            result += (element + value);
        }
    };

    return result;
};

Curray.prototype.lastIndexOf = function(value) {
    
    var lastNum = this.length - 1;

    for (var i = lastNum; i > -1; i--) {
        var element = this[i];
        var check = false || element === value;
        if (check === true) { return i; };
    };

    return -1;
};

Curray.prototype.reverse = function() {
    
    var result = new Curray();
    var lastNum = this.length - 1;

    for (var i = lastNum; i > -1; i--) {
        var element = this[i];
        result.push(element);
    };

    return result;
};

Curray.prototype.shift = function() {
    var first = this[0];
    delete this[0];
    return first;
};

Curray.prototype.slice = function(start, end) {
    var result = new Curray();

    for (var i = start; i < end; i++) {
        var element = this[i];
        result.push(element);
    };
    return result;
};

Curray.prototype.some = function(expression) {

    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        var check = false || expression(element, i, this);
        if (check === true) { return check; };
    };
    return check;
};

Curray.prototype.sort = function() {
    var result = this;

    for (var i = 0; i < result.length; i++) {
        var x = result[i];
        var y = result[i + 1]
        if (x > y) {
            result[i + 1] = x;
            result[i] = y;
        };
    };

    for (var i = 0; i < result.length; i++) {
        if (this[i] > this[i + 1]) {
            result.sort()
        }
    }
    return result;
};

Curray.prototype.splice = function() {
    var start = arguments[0];
    var deleteCount = arguments[1];
    var limit = start + deleteCount
    var curray = this;
    var values = [];
    var result = [];
    var arr = [];
    var count = 0;

    for (var i = 0; i < this.length; i++) {
        arr.push(this[i]);
    }

    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            values.push(arguments[i]);
        }
    } else {
        for (var i = 0; i < this.length; i++) {
            var element = this[i]
            if (i >= start && i < limit) {
                result.push(curray[i]);
            } else {
                this[count++] = this[i];
            }
        }

        if (this.length !== count) {
            for (var i = count; i < this.length; i++) {
                var element = this[i]
                delete this[i];
            }
        }

        this['length'] = count;
        return result;
    }
};