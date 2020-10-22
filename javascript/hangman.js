(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $author$project$HangmanSourceTexts$sourceText = '\n\n\nDorothy lived in the midst of the great Kansas prairies, with Uncle\nHenry, who was a farmer, and Aunt Em, who was the farmer’s wife. Their\nhouse was small, for the lumber to build it had to be carried by wagon\nmany miles. There were four walls, a floor and a roof, which made one\nroom; and this room contained a rusty looking cookstove, a cupboard for\nthe dishes, a table, three or four chairs, and the beds. Uncle Henry\nand Aunt Em had a big bed in one corner, and Dorothy a little bed in\nanother corner. There was no garret at all, and no cellar—except a\nsmall hole dug in the ground, called a cyclone cellar, where the family\ncould go in case one of those great whirlwinds arose, mighty enough to\ncrush any building in its path. It was reached by a trap door in the\nmiddle of the floor, from which a ladder led down into the small, dark\nhole.\n\nWhen Dorothy stood in the doorway and looked around, she could see\nnothing but the great gray prairie on every side. Not a tree nor a\nhouse broke the broad sweep of flat country that reached to the edge of\nthe sky in all directions. The sun had baked the plowed land into a\ngray mass, with little cracks running through it. Even the grass was\nnot green, for the sun had burned the tops of the long blades until\nthey were the same gray color to be seen everywhere. Once the house had\nbeen painted, but the sun blistered the paint and the rains washed it\naway, and now the house was as dull and gray as everything else.\n\nWhen Aunt Em came there to live she was a young, pretty wife. The sun\nand wind had changed her, too. They had taken the sparkle from her eyes\nand left them a sober gray; they had taken the red from her cheeks and\nlips, and they were gray also. She was thin and gaunt, and never smiled\nnow. When Dorothy, who was an orphan, first came to her, Aunt Em had\nbeen so startled by the child’s laughter that she would scream and\npress her hand upon her heart whenever Dorothy’s merry voice reached\nher ears; and she still looked at the little girl with wonder that she\ncould find anything to laugh at.\n\nUncle Henry never laughed. He worked hard from morning till night and\ndid not know what joy was. He was gray also, from his long beard to his\nrough boots, and he looked stern and solemn, and rarely spoke.\n\nIt was Toto that made Dorothy laugh, and saved her from growing as gray\nas her other surroundings. Toto was not gray; he was a little black\ndog, with long silky hair and small black eyes that twinkled merrily on\neither side of his funny, wee nose. Toto played all day long, and\nDorothy played with him, and loved him dearly.\n\nToday, however, they were not playing. Uncle Henry sat upon the\ndoorstep and looked anxiously at the sky, which was even grayer than\nusual. Dorothy stood in the door with Toto in her arms, and looked at\nthe sky too. Aunt Em was washing the dishes.\n\nFrom the far north they heard a low wail of the wind, and Uncle Henry\nand Dorothy could see where the long grass bowed in waves before the\ncoming storm. There now came a sharp whistling in the air from the\nsouth, and as they turned their eyes that way they saw ripples in the\ngrass coming from that direction also.\n\nSuddenly Uncle Henry stood up.\n\n“There’s a cyclone coming, Em,” he called to his wife. “I’ll go look\nafter the stock.” Then he ran toward the sheds where the cows and\nhorses were kept.\n\nAunt Em dropped her work and came to the door. One glance told her of\nthe danger close at hand.\n\n“Quick, Dorothy!” she screamed. “Run for the cellar!”\n\nToto jumped out of Dorothy’s arms and hid under the bed, and the girl\nstarted to get him. Aunt Em, badly frightened, threw open the trap door\nin the floor and climbed down the ladder into the small, dark hole.\nDorothy caught Toto at last and started to follow her aunt. When she\nwas halfway across the room there came a great shriek from the wind,\nand the house shook so hard that she lost her footing and sat down\nsuddenly upon the floor.\n\nThen a strange thing happened.\n\nThe house whirled around two or three times and rose slowly through the\nair. Dorothy felt as if she were going up in a balloon.\n\nThe north and south winds met where the house stood, and made it the\nexact center of the cyclone. In the middle of a cyclone the air is\ngenerally still, but the great pressure of the wind on every side of\nthe house raised it up higher and higher, until it was at the very top\nof the cyclone; and there it remained and was carried miles and miles\naway as easily as you could carry a feather.\n\nIt was very dark, and the wind howled horribly around her, but Dorothy\nfound she was riding quite easily. After the first few whirls around,\nand one other time when the house tipped badly, she felt as if she were\nbeing rocked gently, like a baby in a cradle.\n\nToto did not like it. He ran about the room, now here, now there,\nbarking loudly; but Dorothy sat quite still on the floor and waited to\nsee what would happen.\n\nOnce Toto got too near the open trap door, and fell in; and at first\nthe little girl thought she had lost him. But soon she saw one of his\nears sticking up through the hole, for the strong pressure of the air\nwas keeping him up so that he could not fall. She crept to the hole,\ncaught Toto by the ear, and dragged him into the room again, afterward\nclosing the trap door so that no more accidents could happen.\n\nHour after hour passed away, and slowly Dorothy got over her fright;\nbut she felt quite lonely, and the wind shrieked so loudly all about\nher that she nearly became deaf. At first she had wondered if she would\nbe dashed to pieces when the house fell again; but as the hours passed\nand nothing terrible happened, she stopped worrying and resolved to\nwait calmly and see what the future would bring. At last she crawled\nover the swaying floor to her bed, and lay down upon it; and Toto\nfollowed and lay down beside her.\n\nIn spite of the swaying of the house and the wailing of the wind,\nDorothy soon closed her eyes and fell fast asleep.\n\n\n\n\n\n\nShe was awakened by a shock, so sudden and severe that if Dorothy had\nnot been lying on the soft bed she might have been hurt. As it was, the\njar made her catch her breath and wonder what had happened; and Toto\nput his cold little nose into her face and whined dismally. Dorothy sat\nup and noticed that the house was not moving; nor was it dark, for the\nbright sunshine came in at the window, flooding the little room. She\nsprang from her bed and with Toto at her heels ran and opened the door.\n\nThe little girl gave a cry of amazement and looked about her, her eyes\ngrowing bigger and bigger at the wonderful sights she saw.\n\nThe cyclone had set the house down very gently—for a cyclone—in the\nmidst of a country of marvelous beauty. There were lovely patches of\ngreensward all about, with stately trees bearing rich and luscious\nfruits. Banks of gorgeous flowers were on every hand, and birds with\nrare and brilliant plumage sang and fluttered in the trees and bushes.\nA little way off was a small brook, rushing and sparkling along between\ngreen banks, and murmuring in a voice very grateful to a little girl\nwho had lived so long on the dry, gray prairies.\n\nWhile she stood looking eagerly at the strange and beautiful sights,\nshe noticed coming toward her a group of the queerest people she had\never seen. They were not as big as the grown folk she had always been\nused to; but neither were they very small. In fact, they seemed about\nas tall as Dorothy, who was a well-grown child for her age, although\nthey were, so far as looks go, many years older.\n\nThree were men and one a woman, and all were oddly dressed. They wore\nround hats that rose to a small point a foot above their heads, with\nlittle bells around the brims that tinkled sweetly as they moved. The\nhats of the men were blue; the little woman’s hat was white, and she\nwore a white gown that hung in pleats from her shoulders. Over it were\nsprinkled little stars that glistened in the sun like diamonds. The men\nwere dressed in blue, of the same shade as their hats, and wore\nwell-polished boots with a deep roll of blue at the tops. The men,\nDorothy thought, were about as old as Uncle Henry, for two of them had\nbeards. But the little woman was doubtless much older. Her face was\ncovered with wrinkles, her hair was nearly white, and she walked rather\nstiffly.\n\nWhen these people drew near the house where Dorothy was standing in the\ndoorway, they paused and whispered among themselves, as if afraid to\ncome farther. But the little old woman walked up to Dorothy, made a low\nbow and said, in a sweet voice:\n\n“You are welcome, most noble Sorceress, to the land of the Munchkins.\nWe are so grateful to you for having killed the Wicked Witch of the\nEast, and for setting our people free from bondage.”\n\nDorothy listened to this speech with wonder. What could the little\nwoman possibly mean by calling her a sorceress, and saying she had\nkilled the Wicked Witch of the East? Dorothy was an innocent, harmless\nlittle girl, who had been carried by a cyclone many miles from home;\nand she had never killed anything in all her life.\n\nBut the little woman evidently expected her to answer; so Dorothy said,\nwith hesitation, “You are very kind, but there must be some mistake. I\nhave not killed anything.”\n\n“Your house did, anyway,” replied the little old woman, with a laugh,\n“and that is the same thing. See!” she continued, pointing to the\ncorner of the house. “There are her two feet, still sticking out from\nunder a block of wood.”\n\nDorothy looked, and gave a little cry of fright. There, indeed, just\nunder the corner of the great beam the house rested on, two feet were\nsticking out, shod in silver shoes with pointed toes.\n\n“Oh, dear! Oh, dear!” cried Dorothy, clasping her hands together in\ndismay. “The house must have fallen on her. Whatever shall we do?”\n\n“There is nothing to be done,” said the little woman calmly.\n\n“But who was she?” asked Dorothy.\n\n“She was the Wicked Witch of the East, as I said,” answered the little\nwoman. “She has held all the Munchkins in bondage for many years,\nmaking them slave for her night and day. Now they are all set free, and\nare grateful to you for the favor.”\n\n“Who are the Munchkins?” inquired Dorothy.\n\n“They are the people who live in this land of the East where the Wicked\nWitch ruled.”\n\n“Are you a Munchkin?” asked Dorothy.\n\n“No, but I am their friend, although I live in the land of the North.\nWhen they saw the Witch of the East was dead the Munchkins sent a swift\nmessenger to me, and I came at once. I am the Witch of the North.”\n\n“Oh, gracious!” cried Dorothy. “Are you a real witch?”\n\n“Yes, indeed,” answered the little woman. “But I am a good witch, and\nthe people love me. I am not as powerful as the Wicked Witch was who\nruled here, or I should have set the people free myself.”\n\n“But I thought all witches were wicked,” said the girl, who was half\nfrightened at facing a real witch. “Oh, no, that is a great mistake.\nThere were only four witches in all the Land of Oz, and two of them,\nthose who live in the North and the South, are good witches. I know\nthis is true, for I am one of them myself, and cannot be mistaken.\nThose who dwelt in the East and the West were, indeed, wicked witches;\nbut now that you have killed one of them, there is but one Wicked Witch\nin all the Land of Oz—the one who lives in the West.”\n\n“But,” said Dorothy, after a moment’s thought, “Aunt Em has told me\nthat the witches were all dead—years and years ago.”\n\n“Who is Aunt Em?” inquired the little old woman.\n\n“She is my aunt who lives in Kansas, where I came from.”\n\nThe Witch of the North seemed to think for a time, with her head bowed\nand her eyes upon the ground. Then she looked up and said, “I do not\nknow where Kansas is, for I have never heard that country mentioned\nbefore. But tell me, is it a civilized country?”\n\n“Oh, yes,” replied Dorothy.\n\n“Then that accounts for it. In the civilized countries I believe there\nare no witches left, nor wizards, nor sorceresses, nor magicians. But,\nyou see, the Land of Oz has never been civilized, for we are cut off\nfrom all the rest of the world. Therefore we still have witches and\nwizards amongst us.”\n\n“Who are the wizards?” asked Dorothy.\n\n“Oz himself is the Great Wizard,” answered the Witch, sinking her voice\nto a whisper. “He is more powerful than all the rest of us together. He\nlives in the City of Emeralds.”\n\nDorothy was going to ask another question, but just then the Munchkins,\nwho had been standing silently by, gave a loud shout and pointed to the\ncorner of the house where the Wicked Witch had been lying.\n\n“What is it?” asked the little old woman, and looked, and began to\nlaugh. The feet of the dead Witch had disappeared entirely, and nothing\nwas left but the silver shoes.\n\n“She was so old,” explained the Witch of the North, “that she dried up\nquickly in the sun. That is the end of her. But the silver shoes are\nyours, and you shall have them to wear.” She reached down and picked up\nthe shoes, and after shaking the dust out of them handed them to\nDorothy.\n\n“The Witch of the East was proud of those silver shoes,” said one of\nthe Munchkins, “and there is some charm connected with them; but what\nit is we never knew.”\n\nDorothy carried the shoes into the house and placed them on the table.\nThen she came out again to the Munchkins and said:\n\n“I am anxious to get back to my aunt and uncle, for I am sure they will\nworry about me. Can you help me find my way?”\n\nThe Munchkins and the Witch first looked at one another, and then at\nDorothy, and then shook their heads.\n\n“At the East, not far from here,” said one, “there is a great desert,\nand none could live to cross it.”\n\n“It is the same at the South,” said another, “for I have been there and\nseen it. The South is the country of the Quadlings.”\n\n“I am told,” said the third man, “that it is the same at the West. And\nthat country, where the Winkies live, is ruled by the Wicked Witch of\nthe West, who would make you her slave if you passed her way.”\n\n“The North is my home,” said the old lady, “and at its edge is the same\ngreat desert that surrounds this Land of Oz. I’m afraid, my dear, you\nwill have to live with us.”\n\nDorothy began to sob at this, for she felt lonely among all these\nstrange people. Her tears seemed to grieve the kind-hearted Munchkins,\nfor they immediately took out their handkerchiefs and began to weep\nalso. As for the little old woman, she took off her cap and balanced\nthe point on the end of her nose, while she counted “One, two, three”\nin a solemn voice. At once the cap changed to a slate, on which was\nwritten in big, white chalk marks:\n\n“LET DOROTHY GO TO THE CITY OF EMERALDS”\n\n\nThe little old woman took the slate from her nose, and having read the\nwords on it, asked, “Is your name Dorothy, my dear?”\n\n“Yes,” answered the child, looking up and drying her tears.\n\n“Then you must go to the City of Emeralds. Perhaps Oz will help you.”\n\n“Where is this city?” asked Dorothy.\n\n“It is exactly in the center of the country, and is ruled by Oz, the\nGreat Wizard I told you of.”\n\n“Is he a good man?” inquired the girl anxiously.\n\n“He is a good Wizard. Whether he is a man or not I cannot tell, for I\nhave never seen him.”\n\n“How can I get there?” asked Dorothy.\n\n“You must walk. It is a long journey, through a country that is\nsometimes pleasant and sometimes dark and terrible. However, I will use\nall the magic arts I know of to keep you from harm.”\n\n“Won’t you go with me?” pleaded the girl, who had begun to look upon\nthe little old woman as her only friend.\n\n“No, I cannot do that,” she replied, “but I will give you my kiss, and\nno one will dare injure a person who has been kissed by the Witch of\nthe North.”\n\nShe came close to Dorothy and kissed her gently on the forehead. Where\nher lips touched the girl they left a round, shining mark, as Dorothy\nfound out soon after.\n\n“The road to the City of Emeralds is paved with yellow brick,” said the\nWitch, “so you cannot miss it. When you get to Oz do not be afraid of\nhim, but tell your story and ask him to help you. Good-bye, my dear.”\n\nThe three Munchkins bowed low to her and wished her a pleasant journey,\nafter which they walked away through the trees. The Witch gave Dorothy\na friendly little nod, whirled around on her left heel three times, and\nstraightway disappeared, much to the surprise of little Toto, who\nbarked after her loudly enough when she had gone, because he had been\nafraid even to growl while she stood by.\n\nBut Dorothy, knowing her to be a witch, had expected her to disappear\nin just that way, and was not surprised in the least.\n\n\n\n\n\n\nWhen Dorothy was left alone she began to feel hungry. So she went to\nthe cupboard and cut herself some bread, which she spread with butter.\nShe gave some to Toto, and taking a pail from the shelf she carried it\ndown to the little brook and filled it with clear, sparkling water.\nToto ran over to the trees and began to bark at the birds sitting\nthere. Dorothy went to get him, and saw such delicious fruit hanging\nfrom the branches that she gathered some of it, finding it just what\nshe wanted to help out her breakfast.\n\nThen she went back to the house, and having helped herself and Toto to\na good drink of the cool, clear water, she set about making ready for\nthe journey to the City of Emeralds.\n\nDorothy had only one other dress, but that happened to be clean and was\nhanging on a peg beside her bed. It was gingham, with checks of white\nand blue; and although the blue was somewhat faded with many washings,\nit was still a pretty frock. The girl washed herself carefully, dressed\nherself in the clean gingham, and tied her pink sunbonnet on her head.\nShe took a little basket and filled it with bread from the cupboard,\nlaying a white cloth over the top. Then she looked down at her feet and\nnoticed how old and worn her shoes were.\n\n“They surely will never do for a long journey, Toto,” she said. And\nToto looked up into her face with his little black eyes and wagged his\ntail to show he knew what she meant.\n\nAt that moment Dorothy saw lying on the table the silver shoes that had\nbelonged to the Witch of the East.\n\n“I wonder if they will fit me,” she said to Toto. “They would be just\nthe thing to take a long walk in, for they could not wear out.”\n\nShe took off her old leather shoes and tried on the silver ones, which\nfitted her as well as if they had been made for her.\n\nFinally she picked up her basket.\n\n“Come along, Toto,” she said. “We will go to the Emerald City and ask\nthe Great Oz how to get back to Kansas again.”\n\nShe closed the door, locked it, and put the key carefully in the pocket\nof her dress. And so, with Toto trotting along soberly behind her, she\nstarted on her journey.\n\nThere were several roads nearby, but it did not take her long to find\nthe one paved with yellow bricks. Within a short time she was walking\nbriskly toward the Emerald City, her silver shoes tinkling merrily on\nthe hard, yellow road-bed. The sun shone bright and the birds sang\nsweetly, and Dorothy did not feel nearly so bad as you might think a\nlittle girl would who had been suddenly whisked away from her own\ncountry and set down in the midst of a strange land.\n\nShe was surprised, as she walked along, to see how pretty the country\nwas about her. There were neat fences at the sides of the road, painted\na dainty blue color, and beyond them were fields of grain and\nvegetables in abundance. Evidently the Munchkins were good farmers and\nable to raise large crops. Once in a while she would pass a house, and\nthe people came out to look at her and bow low as she went by; for\neveryone knew she had been the means of destroying the Wicked Witch and\nsetting them free from bondage. The houses of the Munchkins were\nodd-looking dwellings, for each was round, with a big dome for a roof.\nAll were painted blue, for in this country of the East blue was the\nfavorite color.\n\nToward evening, when Dorothy was tired with her long walk and began to\nwonder where she should pass the night, she came to a house rather\nlarger than the rest. On the green lawn before it many men and women\nwere dancing. Five little fiddlers played as loudly as possible, and\nthe people were laughing and singing, while a big table near by was\nloaded with delicious fruits and nuts, pies and cakes, and many other\ngood things to eat.\n\nThe people greeted Dorothy kindly, and invited her to supper and to\npass the night with them; for this was the home of one of the richest\nMunchkins in the land, and his friends were gathered with him to\ncelebrate their freedom from the bondage of the Wicked Witch.\n\nDorothy ate a hearty supper and was waited upon by the rich Munchkin\nhimself, whose name was Boq. Then she sat upon a settee and watched the\npeople dance.\n\nWhen Boq saw her silver shoes he said, “You must be a great sorceress.”\n\n“Why?” asked the girl.\n\n“Because you wear silver shoes and have killed the Wicked Witch.\nBesides, you have white in your frock, and only witches and sorceresses\nwear white.”\n\n“My dress is blue and white checked,” said Dorothy, smoothing out the\nwrinkles in it.\n\n“It is kind of you to wear that,” said Boq. “Blue is the color of the\nMunchkins, and white is the witch color. So we know you are a friendly\nwitch.”\n\nDorothy did not know what to say to this, for all the people seemed to\nthink her a witch, and she knew very well she was only an ordinary\nlittle girl who had come by the chance of a cyclone into a strange\nland.\n\nWhen she had tired watching the dancing, Boq led her into the house,\nwhere he gave her a room with a pretty bed in it. The sheets were made\nof blue cloth, and Dorothy slept soundly in them till morning, with\nToto curled up on the blue rug beside her.\n\nShe ate a hearty breakfast, and watched a wee Munchkin baby, who played\nwith Toto and pulled his tail and crowed and laughed in a way that\ngreatly amused Dorothy. Toto was a fine curiosity to all the people,\nfor they had never seen a dog before.\n\n“How far is it to the Emerald City?” the girl asked.\n\n“I do not know,” answered Boq gravely, “for I have never been there. It\nis better for people to keep away from Oz, unless they have business\nwith him. But it is a long way to the Emerald City, and it will take\nyou many days. The country here is rich and pleasant, but you must pass\nthrough rough and dangerous places before you reach the end of your\njourney.”\n\nThis worried Dorothy a little, but she knew that only the Great Oz\ncould help her get to Kansas again, so she bravely resolved not to turn\nback.\n\nShe bade her friends good-bye, and again started along the road of\nyellow brick. When she had gone several miles she thought she would\nstop to rest, and so climbed to the top of the fence beside the road\nand sat down. There was a great cornfield beyond the fence, and not far\naway she saw a Scarecrow, placed high on a pole to keep the birds from\nthe ripe corn.\n\nDorothy leaned her chin upon her hand and gazed thoughtfully at the\nScarecrow. Its head was a small sack stuffed with straw, with eyes,\nnose, and mouth painted on it to represent a face. An old, pointed blue\nhat, that had belonged to some Munchkin, was perched on his head, and\nthe rest of the figure was a blue suit of clothes, worn and faded,\nwhich had also been stuffed with straw. On the feet were some old boots\nwith blue tops, such as every man wore in this country, and the figure\nwas raised above the stalks of corn by means of the pole stuck up its\nback.\n\nWhile Dorothy was looking earnestly into the queer, painted face of the\nScarecrow, she was surprised to see one of the eyes slowly wink at her.\nShe thought she must have been mistaken at first, for none of the\nscarecrows in Kansas ever wink; but presently the figure nodded its\nhead to her in a friendly way. Then she climbed down from the fence and\nwalked up to it, while Toto ran around the pole and barked.\n\n“Good day,” said the Scarecrow, in a rather husky voice.\n\n“Did you speak?” asked the girl, in wonder.\n\n“Certainly,” answered the Scarecrow. “How do you do?”\n\n“I’m pretty well, thank you,” replied Dorothy politely. “How do you\ndo?”\n\n“I’m not feeling well,” said the Scarecrow, with a smile, “for it is\nvery tedious being perched up here night and day to scare away crows.”\n\n“Can’t you get down?” asked Dorothy.\n\n“No, for this pole is stuck up my back. If you will please take away\nthe pole I shall be greatly obliged to you.”\n\nDorothy reached up both arms and lifted the figure off the pole, for,\nbeing stuffed with straw, it was quite light.\n\n“Thank you very much,” said the Scarecrow, when he had been set down on\nthe ground. “I feel like a new man.”\n\nDorothy was puzzled at this, for it sounded queer to hear a stuffed man\nspeak, and to see him bow and walk along beside her.\n\n“Who are you?” asked the Scarecrow when he had stretched himself and\nyawned. “And where are you going?”\n\n“My name is Dorothy,” said the girl, “and I am going to the Emerald\nCity, to ask the Great Oz to send me back to Kansas.”\n\n“Where is the Emerald City?” he inquired. “And who is Oz?”\n\n“Why, don’t you know?” she returned, in surprise.\n\n“No, indeed. I don’t know anything. You see, I am stuffed, so I have no\nbrains at all,” he answered sadly.\n\n“Oh,” said Dorothy, “I’m awfully sorry for you.”\n\n“Do you think,” he asked, “if I go to the Emerald City with you, that\nOz would give me some brains?”\n\n“I cannot tell,” she returned, “but you may come with me, if you like.\nIf Oz will not give you any brains you will be no worse off than you\nare now.”\n\n“That is true,” said the Scarecrow. “You see,” he continued\nconfidentially, “I don’t mind my legs and arms and body being stuffed,\nbecause I cannot get hurt. If anyone treads on my toes or sticks a pin\ninto me, it doesn’t matter, for I can’t feel it. But I do not want\npeople to call me a fool, and if my head stays stuffed with straw\ninstead of with brains, as yours is, how am I ever to know anything?”\n\n“I understand how you feel,” said the little girl, who was truly sorry\nfor him. “If you will come with me I’ll ask Oz to do all he can for\nyou.”\n\n“Thank you,” he answered gratefully.\n\nThey walked back to the road. Dorothy helped him over the fence, and\nthey started along the path of yellow brick for the Emerald City.\n\nToto did not like this addition to the party at first. He smelled\naround the stuffed man as if he suspected there might be a nest of rats\nin the straw, and he often growled in an unfriendly way at the\nScarecrow.\n\n“Don’t mind Toto,” said Dorothy to her new friend. “He never bites.”\n\n“Oh, I’m not afraid,” replied the Scarecrow. “He can’t hurt the straw.\nDo let me carry that basket for you. I shall not mind it, for I can’t\nget tired. I’ll tell you a secret,” he continued, as he walked along.\n“There is only one thing in the world I am afraid of.”\n\n“What is that?” asked Dorothy; “the Munchkin farmer who made you?”\n\n“No,” answered the Scarecrow; “it’s a lighted match.”\n\n\n\n\n\n\nAfter a few hours the road began to be rough, and the walking grew so\ndifficult that the Scarecrow often stumbled over the yellow bricks,\nwhich were here very uneven. Sometimes, indeed, they were broken or\nmissing altogether, leaving holes that Toto jumped across and Dorothy\nwalked around. As for the Scarecrow, having no brains, he walked\nstraight ahead, and so stepped into the holes and fell at full length\non the hard bricks. It never hurt him, however, and Dorothy would pick\nhim up and set him upon his feet again, while he joined her in laughing\nmerrily at his own mishap.\n\nThe farms were not nearly so well cared for here as they were farther\nback. There were fewer houses and fewer fruit trees, and the farther\nthey went the more dismal and lonesome the country became.\n\nAt noon they sat down by the roadside, near a little brook, and Dorothy\nopened her basket and got out some bread. She offered a piece to the\nScarecrow, but he refused.\n\n“I am never hungry,” he said, “and it is a lucky thing I am not, for my\nmouth is only painted, and if I should cut a hole in it so I could eat,\nthe straw I am stuffed with would come out, and that would spoil the\nshape of my head.”\n\nDorothy saw at once that this was true, so she only nodded and went on\neating her bread.\n\n“Tell me something about yourself and the country you came from,” said\nthe Scarecrow, when she had finished her dinner. So she told him all\nabout Kansas, and how gray everything was there, and how the cyclone\nhad carried her to this queer Land of Oz.\n\nThe Scarecrow listened carefully, and said, “I cannot understand why\nyou should wish to leave this beautiful country and go back to the dry,\ngray place you call Kansas.”\n\n“That is because you have no brains” answered the girl. “No matter how\ndreary and gray our homes are, we people of flesh and blood would\nrather live there than in any other country, be it ever so beautiful.\nThere is no place like home.”\n\nThe Scarecrow sighed.\n\n“Of course I cannot understand it,” he said. “If your heads were\nstuffed with straw, like mine, you would probably all live in the\nbeautiful places, and then Kansas would have no people at all. It is\nfortunate for Kansas that you have brains.”\n\n“Won’t you tell me a story, while we are resting?” asked the child.\n\nThe Scarecrow looked at her reproachfully, and answered:\n\n“My life has been so short that I really know nothing whatever. I was\nonly made day before yesterday. What happened in the world before that\ntime is all unknown to me. Luckily, when the farmer made my head, one\nof the first things he did was to paint my ears, so that I heard what\nwas going on. There was another Munchkin with him, and the first thing\nI heard was the farmer saying, ‘How do you like those ears?’\n\n“‘They aren’t straight,’” answered the other.\n\n“‘Never mind,’” said the farmer. “‘They are ears just the same,’” which\nwas true enough.\n\n“‘Now I’ll make the eyes,’” said the farmer. So he painted my right\neye, and as soon as it was finished I found myself looking at him and\nat everything around me with a great deal of curiosity, for this was my\nfirst glimpse of the world.\n\n“‘That’s a rather pretty eye,’” remarked the Munchkin who was watching\nthe farmer. “‘Blue paint is just the color for eyes.’\n\n“‘I think I’ll make the other a little bigger,’” said the farmer. And\nwhen the second eye was done I could see much better than before. Then\nhe made my nose and my mouth. But I did not speak, because at that time\nI didn’t know what a mouth was for. I had the fun of watching them make\nmy body and my arms and legs; and when they fastened on my head, at\nlast, I felt very proud, for I thought I was just as good a man as\nanyone.\n\n“‘This fellow will scare the crows fast enough,’ said the farmer. ‘He\nlooks just like a man.’\n\n“‘Why, he is a man,’ said the other, and I quite agreed with him. The\nfarmer carried me under his arm to the cornfield, and set me up on a\ntall stick, where you found me. He and his friend soon after walked\naway and left me alone.\n\n“I did not like to be deserted this way. So I tried to walk after them.\nBut my feet would not touch the ground, and I was forced to stay on\nthat pole. It was a lonely life to lead, for I had nothing to think of,\nhaving been made such a little while before. Many crows and other birds\nflew into the cornfield, but as soon as they saw me they flew away\nagain, thinking I was a Munchkin; and this pleased me and made me feel\nthat I was quite an important person. By and by an old crow flew near\nme, and after looking at me carefully he perched upon my shoulder and\nsaid:\n\n“‘I wonder if that farmer thought to fool me in this clumsy manner. Any\ncrow of sense could see that you are only stuffed with straw.’ Then he\nhopped down at my feet and ate all the corn he wanted. The other birds,\nseeing he was not harmed by me, came to eat the corn too, so in a short\ntime there was a great flock of them about me.\n\n“I felt sad at this, for it showed I was not such a good Scarecrow\nafter all; but the old crow comforted me, saying, ‘If you only had\nbrains in your head you would be as good a man as any of them, and a\nbetter man than some of them. Brains are the only things worth having\nin this world, no matter whether one is a crow or a man.’\n\n“After the crows had gone I thought this over, and decided I would try\nhard to get some brains. By good luck you came along and pulled me off\nthe stake, and from what you say I am sure the Great Oz will give me\nbrains as soon as we get to the Emerald City.”\n\n“I hope so,” said Dorothy earnestly, “since you seem anxious to have\nthem.”\n\n“Oh, yes; I am anxious,” returned the Scarecrow. “It is such an\nuncomfortable feeling to know one is a fool.”\n\n“Well,” said the girl, “let us go.” And she handed the basket to the\nScarecrow.\n\nThere were no fences at all by the roadside now, and the land was rough\nand untilled. Toward evening they came to a great forest, where the\ntrees grew so big and close together that their branches met over the\nroad of yellow brick. It was almost dark under the trees, for the\nbranches shut out the daylight; but the travelers did not stop, and\nwent on into the forest.\n\n“If this road goes in, it must come out,” said the Scarecrow, “and as\nthe Emerald City is at the other end of the road, we must go wherever\nit leads us.”\n\n“Anyone would know that,” said Dorothy.\n\n“Certainly; that is why I know it,” returned the Scarecrow. “If it\nrequired brains to figure it out, I never should have said it.”\n\nAfter an hour or so the light faded away, and they found themselves\nstumbling along in the darkness. Dorothy could not see at all, but Toto\ncould, for some dogs see very well in the dark; and the Scarecrow\ndeclared he could see as well as by day. So she took hold of his arm\nand managed to get along fairly well.\n\n“If you see any house, or any place where we can pass the night,” she\nsaid, “you must tell me; for it is very uncomfortable walking in the\ndark.”\n\nSoon after the Scarecrow stopped.\n\n“I see a little cottage at the right of us,” he said, “built of logs\nand branches. Shall we go there?”\n\n“Yes, indeed,” answered the child. “I am all tired out.”\n\nSo the Scarecrow led her through the trees until they reached the\ncottage, and Dorothy entered and found a bed of dried leaves in one\ncorner. She lay down at once, and with Toto beside her soon fell into a\nsound sleep. The Scarecrow, who was never tired, stood up in another\ncorner and waited patiently until morning came.\n\n\n\n\n\n\nWhen Dorothy awoke the sun was shining through the trees and Toto had\nlong been out chasing birds around him and squirrels. She sat up and\nlooked around her. There was the Scarecrow, still standing patiently in\nhis corner, waiting for her.\n\n“We must go and search for water,” she said to him.\n\n“Why do you want water?” he asked.\n\n“To wash my face clean after the dust of the road, and to drink, so the\ndry bread will not stick in my throat.”\n\n“It must be inconvenient to be made of flesh,” said the Scarecrow\nthoughtfully, “for you must sleep, and eat and drink. However, you have\nbrains, and it is worth a lot of bother to be able to think properly.”\n\nThey left the cottage and walked through the trees until they found a\nlittle spring of clear water, where Dorothy drank and bathed and ate\nher breakfast. She saw there was not much bread left in the basket, and\nthe girl was thankful the Scarecrow did not have to eat anything, for\nthere was scarcely enough for herself and Toto for the day.\n\nWhen she had finished her meal, and was about to go back to the road of\nyellow brick, she was startled to hear a deep groan near by.\n\n“What was that?” she asked timidly.\n\n“I cannot imagine,” replied the Scarecrow; “but we can go and see.”\n\nJust then another groan reached their ears, and the sound seemed to\ncome from behind them. They turned and walked through the forest a few\nsteps, when Dorothy discovered something shining in a ray of sunshine\nthat fell between the trees. She ran to the place and then stopped\nshort, with a little cry of surprise.\n\nOne of the big trees had been partly chopped through, and standing\nbeside it, with an uplifted axe in his hands, was a man made entirely\nof tin. His head and arms and legs were jointed upon his body, but he\nstood perfectly motionless, as if he could not stir at all.\n\nDorothy looked at him in amazement, and so did the Scarecrow, while\nToto barked sharply and made a snap at the tin legs, which hurt his\nteeth.\n\n“Did you groan?” asked Dorothy.\n\n“Yes,” answered the tin man, “I did. I’ve been groaning for more than a\nyear, and no one has ever heard me before or come to help me.”\n\n“What can I do for you?” she inquired softly, for she was moved by the\nsad voice in which the man spoke.\n\n“Get an oil-can and oil my joints,” he answered. “They are rusted so\nbadly that I cannot move them at all; if I am well oiled I shall soon\nbe all right again. You will find an oil-can on a shelf in my cottage.”\n\nDorothy at once ran back to the cottage and found the oil-can, and then\nshe returned and asked anxiously, “Where are your joints?”\n\n“Oil my neck, first,” replied the Tin Woodman. So she oiled it, and as\nit was quite badly rusted the Scarecrow took hold of the tin head and\nmoved it gently from side to side until it worked freely, and then the\nman could turn it himself.\n\n“Now oil the joints in my arms,” he said. And Dorothy oiled them and\nthe Scarecrow bent them carefully until they were quite free from rust\nand as good as new.\n\nThe Tin Woodman gave a sigh of satisfaction and lowered his axe, which\nhe leaned against the tree.\n\n“This is a great comfort,” he said. “I have been holding that axe in\nthe air ever since I rusted, and I’m glad to be able to put it down at\nlast. Now, if you will oil the joints of my legs, I shall be all right\nonce more.”\n\nSo they oiled his legs until he could move them freely; and he thanked\nthem again and again for his release, for he seemed a very polite\ncreature, and very grateful.\n\n“I might have stood there always if you had not come along,” he said;\n“so you have certainly saved my life. How did you happen to be here?”\n\n“We are on our way to the Emerald City to see the Great Oz,” she\nanswered, “and we stopped at your cottage to pass the night.”\n\n“Why do you wish to see Oz?” he asked.\n\n“I want him to send me back to Kansas, and the Scarecrow wants him to\nput a few brains into his head,” she replied.\n\nThe Tin Woodman appeared to think deeply for a moment. Then he said:\n\n“Do you suppose Oz could give me a heart?”\n\n“Why, I guess so,” Dorothy answered. “It would be as easy as to give\nthe Scarecrow brains.”\n\n“True,” the Tin Woodman returned. “So, if you will allow me to join\nyour party, I will also go to the Emerald City and ask Oz to help me.”\n\n“Come along,” said the Scarecrow heartily, and Dorothy added that she\nwould be pleased to have his company. So the Tin Woodman shouldered his\naxe and they all passed through the forest until they came to the road\nthat was paved with yellow brick.\n\nThe Tin Woodman had asked Dorothy to put the oil-can in her basket.\n“For,” he said, “if I should get caught in the rain, and rust again, I\nwould need the oil-can badly.”\n\nIt was a bit of good luck to have their new comrade join the party, for\nsoon after they had begun their journey again they came to a place\nwhere the trees and branches grew so thick over the road that the\ntravelers could not pass. But the Tin Woodman set to work with his axe\nand chopped so well that soon he cleared a passage for the entire\nparty.\n\nDorothy was thinking so earnestly as they walked along that she did not\nnotice when the Scarecrow stumbled into a hole and rolled over to the\nside of the road. Indeed he was obliged to call to her to help him up\nagain.\n\n“Why didn’t you walk around the hole?” asked the Tin Woodman.\n\n“I don’t know enough,” replied the Scarecrow cheerfully. “My head is\nstuffed with straw, you know, and that is why I am going to Oz to ask\nhim for some brains.”\n\n“Oh, I see,” said the Tin Woodman. “But, after all, brains are not the\nbest things in the world.”\n\n“Have you any?” inquired the Scarecrow.\n\n“No, my head is quite empty,” answered the Woodman. “But once I had\nbrains, and a heart also; so, having tried them both, I should much\nrather have a heart.”\n\n“And why is that?” asked the Scarecrow.\n\n“I will tell you my story, and then you will know.”\n\nSo, while they were walking through the forest, the Tin Woodman told\nthe following story:\n\n“I was born the son of a woodman who chopped down trees in the forest\nand sold the wood for a living. When I grew up, I too became a\nwoodchopper, and after my father died I took care of my old mother as\nlong as she lived. Then I made up my mind that instead of living alone\nI would marry, so that I might not become lonely.\n\n“There was one of the Munchkin girls who was so beautiful that I soon\ngrew to love her with all my heart. She, on her part, promised to marry\nme as soon as I could earn enough money to build a better house for\nher; so I set to work harder than ever. But the girl lived with an old\nwoman who did not want her to marry anyone, for she was so lazy she\nwished the girl to remain with her and do the cooking and the\nhousework. So the old woman went to the Wicked Witch of the East, and\npromised her two sheep and a cow if she would prevent the marriage.\nThereupon the Wicked Witch enchanted my axe, and when I was chopping\naway at my best one day, for I was anxious to get the new house and my\nwife as soon as possible, the axe slipped all at once and cut off my\nleft leg.\n\n“This at first seemed a great misfortune, for I knew a one-legged man\ncould not do very well as a wood-chopper. So I went to a tinsmith and\nhad him make me a new leg out of tin. The leg worked very well, once I\nwas used to it. But my action angered the Wicked Witch of the East, for\nshe had promised the old woman I should not marry the pretty Munchkin\ngirl. When I began chopping again, my axe slipped and cut off my right\nleg. Again I went to the tinsmith, and again he made me a leg out of\ntin. After this the enchanted axe cut off my arms, one after the other;\nbut, nothing daunted, I had them replaced with tin ones. The Wicked\nWitch then made the axe slip and cut off my head, and at first I\nthought that was the end of me. But the tinsmith happened to come\nalong, and he made me a new head out of tin.\n\n“I thought I had beaten the Wicked Witch then, and I worked harder than\never; but I little knew how cruel my enemy could be. She thought of a\nnew way to kill my love for the beautiful Munchkin maiden, and made my\naxe slip again, so that it cut right through my body, splitting me into\ntwo halves. Once more the tinsmith came to my help and made me a body\nof tin, fastening my tin arms and legs and head to it, by means of\njoints, so that I could move around as well as ever. But, alas! I had\nnow no heart, so that I lost all my love for the Munchkin girl, and did\nnot care whether I married her or not. I suppose she is still living\nwith the old woman, waiting for me to come after her.\n\n“My body shone so brightly in the sun that I felt very proud of it and\nit did not matter now if my axe slipped, for it could not cut me. There\nwas only one danger—that my joints would rust; but I kept an oil-can in\nmy cottage and took care to oil myself whenever I needed it. However,\nthere came a day when I forgot to do this, and, being caught in a\nrainstorm, before I thought of the danger my joints had rusted, and I\nwas left to stand in the woods until you came to help me. It was a\nterrible thing to undergo, but during the year I stood there I had time\nto think that the greatest loss I had known was the loss of my heart.\nWhile I was in love I was the happiest man on earth; but no one can\nlove who has not a heart, and so I am resolved to ask Oz to give me\none. If he does, I will go back to the Munchkin maiden and marry her.”\n\nBoth Dorothy and the Scarecrow had been greatly interested in the story\nof the Tin Woodman, and now they knew why he was so anxious to get a\nnew heart.\n\n“All the same,” said the Scarecrow, “I shall ask for brains instead of\na heart; for a fool would not know what to do with a heart if he had\none.”\n\n“I shall take the heart,” returned the Tin Woodman; “for brains do not\nmake one happy, and happiness is the best thing in the world.”\n\nDorothy did not say anything, for she was puzzled to know which of her\ntwo friends was right, and she decided if she could only get back to\nKansas and Aunt Em, it did not matter so much whether the Woodman had\nno brains and the Scarecrow no heart, or each got what he wanted.\n\nWhat worried her most was that the bread was nearly gone, and another\nmeal for herself and Toto would empty the basket. To be sure, neither\nthe Woodman nor the Scarecrow ever ate anything, but she was not made\nof tin nor straw, and could not live unless she was fed.\n\n\n\n\n\n\nAll this time Dorothy and her companions had been walking through the\nthick woods. The road was still paved with yellow brick, but these were\nmuch covered by dried branches and dead leaves from the trees, and the\nwalking was not at all good.\n\nThere were few birds in this part of the forest, for birds love the\nopen country where there is plenty of sunshine. But now and then there\ncame a deep growl from some wild animal hidden among the trees. These\nsounds made the little girl’s heart beat fast, for she did not know\nwhat made them; but Toto knew, and he walked close to Dorothy’s side,\nand did not even bark in return.\n\n“How long will it be,” the child asked of the Tin Woodman, “before we\nare out of the forest?”\n\n“I cannot tell,” was the answer, “for I have never been to the Emerald\nCity. But my father went there once, when I was a boy, and he said it\nwas a long journey through a dangerous country, although nearer to the\ncity where Oz dwells the country is beautiful. But I am not afraid so\nlong as I have my oil-can, and nothing can hurt the Scarecrow, while\nyou bear upon your forehead the mark of the Good Witch’s kiss, and that\nwill protect you from harm.”\n\n“But Toto!” said the girl anxiously. “What will protect him?”\n\n“We must protect him ourselves if he is in danger,” replied the Tin\nWoodman.\n\nJust as he spoke there came from the forest a terrible roar, and the\nnext moment a great Lion bounded into the road. With one blow of his\npaw he sent the Scarecrow spinning over and over to the edge of the\nroad, and then he struck at the Tin Woodman with his sharp claws. But,\nto the Lion’s surprise, he could make no impression on the tin,\nalthough the Woodman fell over in the road and lay still.\n\nLittle Toto, now that he had an enemy to face, ran barking toward the\nLion, and the great beast had opened his mouth to bite the dog, when\nDorothy, fearing Toto would be killed, and heedless of danger, rushed\nforward and slapped the Lion upon his nose as hard as she could, while\nshe cried out:\n\n“Don’t you dare to bite Toto! You ought to be ashamed of yourself, a\nbig beast like you, to bite a poor little dog!”\n\n“I didn’t bite him,” said the Lion, as he rubbed his nose with his paw\nwhere Dorothy had hit it.\n\n“No, but you tried to,” she retorted. “You are nothing but a big\ncoward.”\n\n“I know it,” said the Lion, hanging his head in shame. “I’ve always\nknown it. But how can I help it?”\n\n“I don’t know, I’m sure. To think of your striking a stuffed man, like\nthe poor Scarecrow!”\n\n“Is he stuffed?” asked the Lion in surprise, as he watched her pick up\nthe Scarecrow and set him upon his feet, while she patted him into\nshape again.\n\n“Of course he’s stuffed,” replied Dorothy, who was still angry.\n\n“That’s why he went over so easily,” remarked the Lion. “It astonished\nme to see him whirl around so. Is the other one stuffed also?”\n\n“No,” said Dorothy, “he’s made of tin.” And she helped the Woodman up\nagain.\n\n“That’s why he nearly blunted my claws,” said the Lion. “When they\nscratched against the tin it made a cold shiver run down my back. What\nis that little animal you are so tender of?”\n\n“He is my dog, Toto,” answered Dorothy.\n\n“Is he made of tin, or stuffed?” asked the Lion.\n\n“Neither. He’s a—a—a meat dog,” said the girl.\n\n“Oh! He’s a curious animal and seems remarkably small, now that I look\nat him. No one would think of biting such a little thing, except a\ncoward like me,” continued the Lion sadly.\n\n“What makes you a coward?” asked Dorothy, looking at the great beast in\nwonder, for he was as big as a small horse.\n\n“It’s a mystery,” replied the Lion. “I suppose I was born that way. All\nthe other animals in the forest naturally expect me to be brave, for\nthe Lion is everywhere thought to be the King of Beasts. I learned that\nif I roared very loudly every living thing was frightened and got out\nof my way. Whenever I’ve met a man I’ve been awfully scared; but I just\nroared at him, and he has always run away as fast as he could go. If\nthe elephants and the tigers and the bears had ever tried to fight me,\nI should have run myself—I’m such a coward; but just as soon as they\nhear me roar they all try to get away from me, and of course I let them\ngo.”\n\n“But that isn’t right. The King of Beasts shouldn’t be a coward,” said\nthe Scarecrow.\n\n“I know it,” returned the Lion, wiping a tear from his eye with the tip\nof his tail. “It is my great sorrow, and makes my life very unhappy.\nBut whenever there is danger, my heart begins to beat fast.”\n\n“Perhaps you have heart disease,” said the Tin Woodman.\n\n“It may be,” said the Lion.\n\n“If you have,” continued the Tin Woodman, “you ought to be glad, for it\nproves you have a heart. For my part, I have no heart; so I cannot have\nheart disease.”\n\n“Perhaps,” said the Lion thoughtfully, “if I had no heart I should not\nbe a coward.”\n\n“Have you brains?” asked the Scarecrow.\n\n“I suppose so. I’ve never looked to see,” replied the Lion.\n\n“I am going to the Great Oz to ask him to give me some,” remarked the\nScarecrow, “for my head is stuffed with straw.”\n\n“And I am going to ask him to give me a heart,” said the Woodman.\n\n“And I am going to ask him to send Toto and me back to Kansas,” added\nDorothy.\n\n“Do you think Oz could give me courage?” asked the Cowardly Lion.\n\n“Just as easily as he could give me brains,” said the Scarecrow.\n\n“Or give me a heart,” said the Tin Woodman.\n\n“Or send me back to Kansas,” said Dorothy.\n\n“Then, if you don’t mind, I’ll go with you,” said the Lion, “for my\nlife is simply unbearable without a bit of courage.”\n\n“You will be very welcome,” answered Dorothy, “for you will help to\nkeep away the other wild beasts. It seems to me they must be more\ncowardly than you are if they allow you to scare them so easily.”\n\n“They really are,” said the Lion, “but that doesn’t make me any braver,\nand as long as I know myself to be a coward I shall be unhappy.”\n\nSo once more the little company set off upon the journey, the Lion\nwalking with stately strides at Dorothy’s side. Toto did not approve of\nthis new comrade at first, for he could not forget how nearly he had\nbeen crushed between the Lion’s great jaws. But after a time he became\nmore at ease, and presently Toto and the Cowardly Lion had grown to be\ngood friends.\n\nDuring the rest of that day there was no other adventure to mar the\npeace of their journey. Once, indeed, the Tin Woodman stepped upon a\nbeetle that was crawling along the road, and killed the poor little\nthing. This made the Tin Woodman very unhappy, for he was always\ncareful not to hurt any living creature; and as he walked along he wept\nseveral tears of sorrow and regret. These tears ran slowly down his\nface and over the hinges of his jaw, and there they rusted. When\nDorothy presently asked him a question the Tin Woodman could not open\nhis mouth, for his jaws were tightly rusted together. He became greatly\nfrightened at this and made many motions to Dorothy to relieve him, but\nshe could not understand. The Lion was also puzzled to know what was\nwrong. But the Scarecrow seized the oil-can from Dorothy’s basket and\noiled the Woodman’s jaws, so that after a few moments he could talk as\nwell as before.\n\n“This will serve me a lesson,” said he, “to look where I step. For if I\nshould kill another bug or beetle I should surely cry again, and crying\nrusts my jaws so that I cannot speak.”\n\nThereafter he walked very carefully, with his eyes on the road, and\nwhen he saw a tiny ant toiling by he would step over it, so as not to\nharm it. The Tin Woodman knew very well he had no heart, and therefore\nhe took great care never to be cruel or unkind to anything.\n\n“You people with hearts,” he said, “have something to guide you, and\nneed never do wrong; but I have no heart, and so I must be very\ncareful. When Oz gives me a heart of course I needn’t mind so much.”\n\n\n\n\n\n\nThey were obliged to camp out that night under a large tree in the\nforest, for there were no houses near. The tree made a good, thick\ncovering to protect them from the dew, and the Tin Woodman chopped a\ngreat pile of wood with his axe and Dorothy built a splendid fire that\nwarmed her and made her feel less lonely. She and Toto ate the last of\ntheir bread, and now she did not know what they would do for breakfast.\n\n“If you wish,” said the Lion, “I will go into the forest and kill a\ndeer for you. You can roast it by the fire, since your tastes are so\npeculiar that you prefer cooked food, and then you will have a very\ngood breakfast.”\n\n“Don’t! Please don’t,” begged the Tin Woodman. “I should certainly weep\nif you killed a poor deer, and then my jaws would rust again.”\n\nBut the Lion went away into the forest and found his own supper, and no\none ever knew what it was, for he didn’t mention it. And the Scarecrow\nfound a tree full of nuts and filled Dorothy’s basket with them, so\nthat she would not be hungry for a long time. She thought this was very\nkind and thoughtful of the Scarecrow, but she laughed heartily at the\nawkward way in which the poor creature picked up the nuts. His padded\nhands were so clumsy and the nuts were so small that he dropped almost\nas many as he put in the basket. But the Scarecrow did not mind how\nlong it took him to fill the basket, for it enabled him to keep away\nfrom the fire, as he feared a spark might get into his straw and burn\nhim up. So he kept a good distance away from the flames, and only came\nnear to cover Dorothy with dry leaves when she lay down to sleep. These\nkept her very snug and warm, and she slept soundly until morning.\n\nWhen it was daylight, the girl bathed her face in a little rippling\nbrook, and soon after they all started toward the Emerald City.\n\nThis was to be an eventful day for the travelers. They had hardly been\nwalking an hour when they saw before them a great ditch that crossed\nthe road and divided the forest as far as they could see on either\nside. It was a very wide ditch, and when they crept up to the edge and\nlooked into it they could see it was also very deep, and there were\nmany big, jagged rocks at the bottom. The sides were so steep that none\nof them could climb down, and for a moment it seemed that their journey\nmust end.\n\n“What shall we do?” asked Dorothy despairingly.\n\n“I haven’t the faintest idea,” said the Tin Woodman, and the Lion shook\nhis shaggy mane and looked thoughtful.\n\nBut the Scarecrow said, “We cannot fly, that is certain. Neither can we\nclimb down into this great ditch. Therefore, if we cannot jump over it,\nwe must stop where we are.”\n\n“I think I could jump over it,” said the Cowardly Lion, after measuring\nthe distance carefully in his mind.\n\n“Then we are all right,” answered the Scarecrow, “for you can carry us\nall over on your back, one at a time.”\n\n“Well, I’ll try it,” said the Lion. “Who will go first?”\n\n“I will,” declared the Scarecrow, “for, if you found that you could not\njump over the gulf, Dorothy would be killed, or the Tin Woodman badly\ndented on the rocks below. But if I am on your back it will not matter\nso much, for the fall would not hurt me at all.”\n\n“I am terribly afraid of falling, myself,” said the Cowardly Lion, “but\nI suppose there is nothing to do but try it. So get on my back and we\nwill make the attempt.”\n\nThe Scarecrow sat upon the Lion’s back, and the big beast walked to the\nedge of the gulf and crouched down.\n\n“Why don’t you run and jump?” asked the Scarecrow.\n\n“Because that isn’t the way we Lions do these things,” he replied. Then\ngiving a great spring, he shot through the air and landed safely on the\nother side. They were all greatly pleased to see how easily he did it,\nand after the Scarecrow had got down from his back the Lion sprang\nacross the ditch again.\n\nDorothy thought she would go next; so she took Toto in her arms and\nclimbed on the Lion’s back, holding tightly to his mane with one hand.\nThe next moment it seemed as if she were flying through the air; and\nthen, before she had time to think about it, she was safe on the other\nside. The Lion went back a third time and got the Tin Woodman, and then\nthey all sat down for a few moments to give the beast a chance to rest,\nfor his great leaps had made his breath short, and he panted like a big\ndog that has been running too long.\n\nThey found the forest very thick on this side, and it looked dark and\ngloomy. After the Lion had rested they started along the road of yellow\nbrick, silently wondering, each in his own mind, if ever they would\ncome to the end of the woods and reach the bright sunshine again. To\nadd to their discomfort, they soon heard strange noises in the depths\nof the forest, and the Lion whispered to them that it was in this part\nof the country that the Kalidahs lived.\n\n“What are the Kalidahs?” asked the girl.\n\n“They are monstrous beasts with bodies like bears and heads like\ntigers,” replied the Lion, “and with claws so long and sharp that they\ncould tear me in two as easily as I could kill Toto. I’m terribly\nafraid of the Kalidahs.”\n\n“I’m not surprised that you are,” returned Dorothy. “They must be\ndreadful beasts.”\n\nThe Lion was about to reply when suddenly they came to another gulf\nacross the road. But this one was so broad and deep that the Lion knew\nat once he could not leap across it.\n\nSo they sat down to consider what they should do, and after serious\nthought the Scarecrow said:\n\n“Here is a great tree, standing close to the ditch. If the Tin Woodman\ncan chop it down, so that it will fall to the other side, we can walk\nacross it easily.”\n\n“That is a first-rate idea,” said the Lion. “One would almost suspect\nyou had brains in your head, instead of straw.”\n\nThe Woodman set to work at once, and so sharp was his axe that the tree\nwas soon chopped nearly through. Then the Lion put his strong front\nlegs against the tree and pushed with all his might, and slowly the big\ntree tipped and fell with a crash across the ditch, with its top\nbranches on the other side.\n\nThey had just started to cross this queer bridge when a sharp growl\nmade them all look up, and to their horror they saw running toward them\ntwo great beasts with bodies like bears and heads like tigers.\n\n“They are the Kalidahs!” said the Cowardly Lion, beginning to tremble.\n\n“Quick!” cried the Scarecrow. “Let us cross over.”\n\nSo Dorothy went first, holding Toto in her arms, the Tin Woodman\nfollowed, and the Scarecrow came next. The Lion, although he was\ncertainly afraid, turned to face the Kalidahs, and then he gave so loud\nand terrible a roar that Dorothy screamed and the Scarecrow fell over\nbackward, while even the fierce beasts stopped short and looked at him\nin surprise.\n\nBut, seeing they were bigger than the Lion, and remembering that there\nwere two of them and only one of him, the Kalidahs again rushed\nforward, and the Lion crossed over the tree and turned to see what they\nwould do next. Without stopping an instant the fierce beasts also began\nto cross the tree. And the Lion said to Dorothy:\n\n“We are lost, for they will surely tear us to pieces with their sharp\nclaws. But stand close behind me, and I will fight them as long as I am\nalive.”\n\n“Wait a minute!” called the Scarecrow. He had been thinking what was\nbest to be done, and now he asked the Woodman to chop away the end of\nthe tree that rested on their side of the ditch. The Tin Woodman began\nto use his axe at once, and, just as the two Kalidahs were nearly\nacross, the tree fell with a crash into the gulf, carrying the ugly,\nsnarling brutes with it, and both were dashed to pieces on the sharp\nrocks at the bottom.\n\n“Well,” said the Cowardly Lion, drawing a long breath of relief, “I see\nwe are going to live a little while longer, and I am glad of it, for it\nmust be a very uncomfortable thing not to be alive. Those creatures\nfrightened me so badly that my heart is beating yet.”\n\n“Ah,” said the Tin Woodman sadly, “I wish I had a heart to beat.”\n\nThis adventure made the travelers more anxious than ever to get out of\nthe forest, and they walked so fast that Dorothy became tired, and had\nto ride on the Lion’s back. To their great joy the trees became thinner\nthe farther they advanced, and in the afternoon they suddenly came upon\na broad river, flowing swiftly just before them. On the other side of\nthe water they could see the road of yellow brick running through a\nbeautiful country, with green meadows dotted with bright flowers and\nall the road bordered with trees hanging full of delicious fruits. They\nwere greatly pleased to see this delightful country before them.\n\n“How shall we cross the river?” asked Dorothy.\n\n“That is easily done,” replied the Scarecrow. “The Tin Woodman must\nbuild us a raft, so we can float to the other side.”\n\nSo the Woodman took his axe and began to chop down small trees to make\na raft, and while he was busy at this the Scarecrow found on the\nriverbank a tree full of fine fruit. This pleased Dorothy, who had\neaten nothing but nuts all day, and she made a hearty meal of the ripe\nfruit.\n\nBut it takes time to make a raft, even when one is as industrious and\nuntiring as the Tin Woodman, and when night came the work was not done.\nSo they found a cozy place under the trees where they slept well until\nthe morning; and Dorothy dreamed of the Emerald City, and of the good\nWizard Oz, who would soon send her back to her own home again.\n\n\n\n\n\n\nOur little party of travelers awakened the next morning refreshed and\nfull of hope, and Dorothy breakfasted like a princess off peaches and\nplums from the trees beside the river. Behind them was the dark forest\nthey had passed safely through, although they had suffered many\ndiscouragements; but before them was a lovely, sunny country that\nseemed to beckon them on to the Emerald City.\n\nTo be sure, the broad river now cut them off from this beautiful land.\nBut the raft was nearly done, and after the Tin Woodman had cut a few\nmore logs and fastened them together with wooden pins, they were ready\nto start. Dorothy sat down in the middle of the raft and held Toto in\nher arms. When the Cowardly Lion stepped upon the raft it tipped badly,\nfor he was big and heavy; but the Scarecrow and the Tin Woodman stood\nupon the other end to steady it, and they had long poles in their hands\nto push the raft through the water.\n\nThey got along quite well at first, but when they reached the middle of\nthe river the swift current swept the raft downstream, farther and\nfarther away from the road of yellow brick. And the water grew so deep\nthat the long poles would not touch the bottom.\n\n“This is bad,” said the Tin Woodman, “for if we cannot get to the land\nwe shall be carried into the country of the Wicked Witch of the West,\nand she will enchant us and make us her slaves.”\n\n“And then I should get no brains,” said the Scarecrow.\n\n“And I should get no courage,” said the Cowardly Lion.\n\n“And I should get no heart,” said the Tin Woodman.\n\n“And I should never get back to Kansas,” said Dorothy.\n\n“We must certainly get to the Emerald City if we can,” the Scarecrow\ncontinued, and he pushed so hard on his long pole that it stuck fast in\nthe mud at the bottom of the river. Then, before he could pull it out\nagain—or let go—the raft was swept away, and the poor Scarecrow was\nleft clinging to the pole in the middle of the river.\n\n“Good-bye!” he called after them, and they were very sorry to leave\nhim. Indeed, the Tin Woodman began to cry, but fortunately remembered\nthat he might rust, and so dried his tears on Dorothy’s apron.\n\nOf course this was a bad thing for the Scarecrow.\n\n“I am now worse off than when I first met Dorothy,” he thought. “Then,\nI was stuck on a pole in a cornfield, where I could make-believe scare\nthe crows, at any rate. But surely there is no use for a Scarecrow\nstuck on a pole in the middle of a river. I am afraid I shall never\nhave any brains, after all!”\n\nDown the stream the raft floated, and the poor Scarecrow was left far\nbehind. Then the Lion said:\n\n“Something must be done to save us. I think I can swim to the shore and\npull the raft after me, if you will only hold fast to the tip of my\ntail.”\n\nSo he sprang into the water, and the Tin Woodman caught fast hold of\nhis tail. Then the Lion began to swim with all his might toward the\nshore. It was hard work, although he was so big; but by and by they\nwere drawn out of the current, and then Dorothy took the Tin Woodman’s\nlong pole and helped push the raft to the land.\n\nThey were all tired out when they reached the shore at last and stepped\noff upon the pretty green grass, and they also knew that the stream had\ncarried them a long way past the road of yellow brick that led to the\nEmerald City.\n\n“What shall we do now?” asked the Tin Woodman, as the Lion lay down on\nthe grass to let the sun dry him.\n\n“We must get back to the road, in some way,” said Dorothy.\n\n“The best plan will be to walk along the riverbank until we come to the\nroad again,” remarked the Lion.\n\nSo, when they were rested, Dorothy picked up her basket and they\nstarted along the grassy bank, to the road from which the river had\ncarried them. It was a lovely country, with plenty of flowers and fruit\ntrees and sunshine to cheer them, and had they not felt so sorry for\nthe poor Scarecrow, they could have been very happy.\n\nThey walked along as fast as they could, Dorothy only stopping once to\npick a beautiful flower; and after a time the Tin Woodman cried out:\n“Look!”\n\nThen they all looked at the river and saw the Scarecrow perched upon\nhis pole in the middle of the water, looking very lonely and sad.\n\n“What can we do to save him?” asked Dorothy.\n\nThe Lion and the Woodman both shook their heads, for they did not know.\nSo they sat down upon the bank and gazed wistfully at the Scarecrow\nuntil a Stork flew by, who, upon seeing them, stopped to rest at the\nwater’s edge.\n\n“Who are you and where are you going?” asked the Stork.\n\n“I am Dorothy,” answered the girl, “and these are my friends, the Tin\nWoodman and the Cowardly Lion; and we are going to the Emerald City.”\n\n“This isn’t the road,” said the Stork, as she twisted her long neck and\nlooked sharply at the queer party.\n\n“I know it,” returned Dorothy, “but we have lost the Scarecrow, and are\nwondering how we shall get him again.”\n\n“Where is he?” asked the Stork.\n\n“Over there in the river,” answered the little girl.\n\n“If he wasn’t so big and heavy I would get him for you,” remarked the\nStork.\n\n“He isn’t heavy a bit,” said Dorothy eagerly, “for he is stuffed with\nstraw; and if you will bring him back to us, we shall thank you ever\nand ever so much.”\n\n“Well, I’ll try,” said the Stork, “but if I find he is too heavy to\ncarry I shall have to drop him in the river again.”\n\nSo the big bird flew into the air and over the water till she came to\nwhere the Scarecrow was perched upon his pole. Then the Stork with her\ngreat claws grabbed the Scarecrow by the arm and carried him up into\nthe air and back to the bank, where Dorothy and the Lion and the Tin\nWoodman and Toto were sitting.\n\nWhen the Scarecrow found himself among his friends again, he was so\nhappy that he hugged them all, even the Lion and Toto; and as they\nwalked along he sang “Tol-de-ri-de-oh!” at every step, he felt so gay.\n\n“I was afraid I should have to stay in the river forever,” he said,\n“but the kind Stork saved me, and if I ever get any brains I shall find\nthe Stork again and do her some kindness in return.”\n\n“That’s all right,” said the Stork, who was flying along beside them.\n“I always like to help anyone in trouble. But I must go now, for my\nbabies are waiting in the nest for me. I hope you will find the Emerald\nCity and that Oz will help you.”\n\n“Thank you,” replied Dorothy, and then the kind Stork flew into the air\nand was soon out of sight.\n\nThey walked along listening to the singing of the brightly colored\nbirds and looking at the lovely flowers which now became so thick that\nthe ground was carpeted with them. There were big yellow and white and\nblue and purple blossoms, besides great clusters of scarlet poppies,\nwhich were so brilliant in color they almost dazzled Dorothy’s eyes.\n\n“Aren’t they beautiful?” the girl asked, as she breathed in the spicy\nscent of the bright flowers.\n\n“I suppose so,” answered the Scarecrow. “When I have brains, I shall\nprobably like them better.”\n\n“If I only had a heart, I should love them,” added the Tin Woodman.\n\n“I always did like flowers,” said the Lion. “They seem so helpless and\nfrail. But there are none in the forest so bright as these.”\n\nThey now came upon more and more of the big scarlet poppies, and fewer\nand fewer of the other flowers; and soon they found themselves in the\nmidst of a great meadow of poppies. Now it is well known that when\nthere are many of these flowers together their odor is so powerful that\nanyone who breathes it falls asleep, and if the sleeper is not carried\naway from the scent of the flowers, he sleeps on and on forever. But\nDorothy did not know this, nor could she get away from the bright red\nflowers that were everywhere about; so presently her eyes grew heavy\nand she felt she must sit down to rest and to sleep.\n\nBut the Tin Woodman would not let her do this.\n\n“We must hurry and get back to the road of yellow brick before dark,”\nhe said; and the Scarecrow agreed with him. So they kept walking until\nDorothy could stand no longer. Her eyes closed in spite of herself and\nshe forgot where she was and fell among the poppies, fast asleep.\n\n“What shall we do?” asked the Tin Woodman.\n\n“If we leave her here she will die,” said the Lion. “The smell of the\nflowers is killing us all. I myself can scarcely keep my eyes open, and\nthe dog is asleep already.”\n\nIt was true; Toto had fallen down beside his little mistress. But the\nScarecrow and the Tin Woodman, not being made of flesh, were not\ntroubled by the scent of the flowers.\n\n“Run fast,” said the Scarecrow to the Lion, “and get out of this deadly\nflower bed as soon as you can. We will bring the little girl with us,\nbut if you should fall asleep you are too big to be carried.”\n\nSo the Lion aroused himself and bounded forward as fast as he could go.\nIn a moment he was out of sight.\n\n“Let us make a chair with our hands and carry her,” said the Scarecrow.\nSo they picked up Toto and put the dog in Dorothy’s lap, and then they\nmade a chair with their hands for the seat and their arms for the arms\nand carried the sleeping girl between them through the flowers.\n\nOn and on they walked, and it seemed that the great carpet of deadly\nflowers that surrounded them would never end. They followed the bend of\nthe river, and at last came upon their friend the Lion, lying fast\nasleep among the poppies. The flowers had been too strong for the huge\nbeast and he had given up at last, and fallen only a short distance\nfrom the end of the poppy bed, where the sweet grass spread in\nbeautiful green fields before them.\n\n“We can do nothing for him,” said the Tin Woodman, sadly; “for he is\nmuch too heavy to lift. We must leave him here to sleep on forever, and\nperhaps he will dream that he has found courage at last.”\n\n“I’m sorry,” said the Scarecrow. “The Lion was a very good comrade for\none so cowardly. But let us go on.”\n\nThey carried the sleeping girl to a pretty spot beside the river, far\nenough from the poppy field to prevent her breathing any more of the\npoison of the flowers, and here they laid her gently on the soft grass\nand waited for the fresh breeze to waken her.\n\n\n\n\n\n\n“We cannot be far from the road of yellow brick, now,” remarked the\nScarecrow, as he stood beside the girl, “for we have come nearly as far\nas the river carried us away.”\n\nThe Tin Woodman was about to reply when he heard a low growl, and\nturning his head (which worked beautifully on hinges) he saw a strange\nbeast come bounding over the grass toward them. It was, indeed, a great\nyellow Wildcat, and the Woodman thought it must be chasing something,\nfor its ears were lying close to its head and its mouth was wide open,\nshowing two rows of ugly teeth, while its red eyes glowed like balls of\nfire. As it came nearer the Tin Woodman saw that running before the\nbeast was a little gray field mouse, and although he had no heart he\nknew it was wrong for the Wildcat to try to kill such a pretty,\nharmless creature.\n\nSo the Woodman raised his axe, and as the Wildcat ran by he gave it a\nquick blow that cut the beast’s head clean off from its body, and it\nrolled over at his feet in two pieces.\n\nThe field mouse, now that it was freed from its enemy, stopped short;\nand coming slowly up to the Woodman it said, in a squeaky little voice:\n\n“Oh, thank you! Thank you ever so much for saving my life.”\n\n“Don’t speak of it, I beg of you,” replied the Woodman. “I have no\nheart, you know, so I am careful to help all those who may need a\nfriend, even if it happens to be only a mouse.”\n\n“Only a mouse!” cried the little animal, indignantly. “Why, I am a\nQueen—the Queen of all the Field Mice!”\n\n“Oh, indeed,” said the Woodman, making a bow.\n\n“Therefore you have done a great deed, as well as a brave one, in\nsaving my life,” added the Queen.\n\nAt that moment several mice were seen running up as fast as their\nlittle legs could carry them, and when they saw their Queen they\nexclaimed:\n\n“Oh, your Majesty, we thought you would be killed! How did you manage\nto escape the great Wildcat?” They all bowed so low to the little Queen\nthat they almost stood upon their heads.\n\n“This funny tin man,” she answered, “killed the Wildcat and saved my\nlife. So hereafter you must all serve him, and obey his slightest\nwish.”\n\n“We will!” cried all the mice, in a shrill chorus. And then they\nscampered in all directions, for Toto had awakened from his sleep, and\nseeing all these mice around him he gave one bark of delight and jumped\nright into the middle of the group. Toto had always loved to chase mice\nwhen he lived in Kansas, and he saw no harm in it.\n\nBut the Tin Woodman caught the dog in his arms and held him tight,\nwhile he called to the mice, “Come back! Come back! Toto shall not hurt\nyou.”\n\nAt this the Queen of the Mice stuck her head out from underneath a\nclump of grass and asked, in a timid voice, “Are you sure he will not\nbite us?”\n\n“I will not let him,” said the Woodman; “so do not be afraid.”\n\nOne by one the mice came creeping back, and Toto did not bark again,\nalthough he tried to get out of the Woodman’s arms, and would have\nbitten him had he not known very well he was made of tin. Finally one\nof the biggest mice spoke.\n\n“Is there anything we can do,” it asked, “to repay you for saving the\nlife of our Queen?”\n\n“Nothing that I know of,” answered the Woodman; but the Scarecrow, who\nhad been trying to think, but could not because his head was stuffed\nwith straw, said, quickly, “Oh, yes; you can save our friend, the\nCowardly Lion, who is asleep in the poppy bed.”\n\n“A Lion!” cried the little Queen. “Why, he would eat us all up.”\n\n“Oh, no,” declared the Scarecrow; “this Lion is a coward.”\n\n“Really?” asked the Mouse.\n\n“He says so himself,” answered the Scarecrow, “and he would never hurt\nanyone who is our friend. If you will help us to save him I promise\nthat he shall treat you all with kindness.”\n\n“Very well,” said the Queen, “we trust you. But what shall we do?”\n\n“Are there many of these mice which call you Queen and are willing to\nobey you?”\n\n“Oh, yes; there are thousands,” she replied.\n\n“Then send for them all to come here as soon as possible, and let each\none bring a long piece of string.”\n\nThe Queen turned to the mice that attended her and told them to go at\nonce and get all her people. As soon as they heard her orders they ran\naway in every direction as fast as possible.\n\n“Now,” said the Scarecrow to the Tin Woodman, “you must go to those\ntrees by the riverside and make a truck that will carry the Lion.”\n\nSo the Woodman went at once to the trees and began to work; and he soon\nmade a truck out of the limbs of trees, from which he chopped away all\nthe leaves and branches. He fastened it together with wooden pegs and\nmade the four wheels out of short pieces of a big tree trunk. So fast\nand so well did he work that by the time the mice began to arrive the\ntruck was all ready for them.\n\nThey came from all directions, and there were thousands of them: big\nmice and little mice and middle-sized mice; and each one brought a\npiece of string in his mouth. It was about this time that Dorothy woke\nfrom her long sleep and opened her eyes. She was greatly astonished to\nfind herself lying upon the grass, with thousands of mice standing\naround and looking at her timidly. But the Scarecrow told her about\neverything, and turning to the dignified little Mouse, he said:\n\n“Permit me to introduce to you her Majesty, the Queen.”\n\nDorothy nodded gravely and the Queen made a curtsy, after which she\nbecame quite friendly with the little girl.\n\nThe Scarecrow and the Woodman now began to fasten the mice to the\ntruck, using the strings they had brought. One end of a string was tied\naround the neck of each mouse and the other end to the truck. Of course\nthe truck was a thousand times bigger than any of the mice who were to\ndraw it; but when all the mice had been harnessed, they were able to\npull it quite easily. Even the Scarecrow and the Tin Woodman could sit\non it, and were drawn swiftly by their queer little horses to the place\nwhere the Lion lay asleep.\n\nAfter a great deal of hard work, for the Lion was heavy, they managed\nto get him up on the truck. Then the Queen hurriedly gave her people\nthe order to start, for she feared if the mice stayed among the poppies\ntoo long they also would fall asleep.\n\nAt first the little creatures, many though they were, could hardly stir\nthe heavily loaded truck; but the Woodman and the Scarecrow both pushed\nfrom behind, and they got along better. Soon they rolled the Lion out\nof the poppy bed to the green fields, where he could breathe the sweet,\nfresh air again, instead of the poisonous scent of the flowers.\n\nDorothy came to meet them and thanked the little mice warmly for saving\nher companion from death. She had grown so fond of the big Lion she was\nglad he had been rescued.\n\nThen the mice were unharnessed from the truck and scampered away\nthrough the grass to their homes. The Queen of the Mice was the last to\nleave.\n\n“If ever you need us again,” she said, “come out into the field and\ncall, and we shall hear you and come to your assistance. Good-bye!”\n\n“Good-bye!” they all answered, and away the Queen ran, while Dorothy\nheld Toto tightly lest he should run after her and frighten her.\n\nAfter this they sat down beside the Lion until he should awaken; and\nthe Scarecrow brought Dorothy some fruit from a tree near by, which she\nate for her dinner.\n\n\n\n\n\n\nIt was some time before the Cowardly Lion awakened, for he had lain\namong the poppies a long while, breathing in their deadly fragrance;\nbut when he did open his eyes and roll off the truck he was very glad\nto find himself still alive.\n\n“I ran as fast as I could,” he said, sitting down and yawning, “but the\nflowers were too strong for me. How did you get me out?”\n\nThen they told him of the field mice, and how they had generously saved\nhim from death; and the Cowardly Lion laughed, and said:\n\n“I have always thought myself very big and terrible; yet such little\nthings as flowers came near to killing me, and such small animals as\nmice have saved my life. How strange it all is! But, comrades, what\nshall we do now?”\n\n“We must journey on until we find the road of yellow brick again,” said\nDorothy, “and then we can keep on to the Emerald City.”\n\nSo, the Lion being fully refreshed, and feeling quite himself again,\nthey all started upon the journey, greatly enjoying the walk through\nthe soft, fresh grass; and it was not long before they reached the road\nof yellow brick and turned again toward the Emerald City where the\nGreat Oz dwelt.\n\nThe road was smooth and well paved, now, and the country about was\nbeautiful, so that the travelers rejoiced in leaving the forest far\nbehind, and with it the many dangers they had met in its gloomy shades.\nOnce more they could see fences built beside the road; but these were\npainted green, and when they came to a small house, in which a farmer\nevidently lived, that also was painted green. They passed by several of\nthese houses during the afternoon, and sometimes people came to the\ndoors and looked at them as if they would like to ask questions; but no\none came near them nor spoke to them because of the great Lion, of\nwhich they were very much afraid. The people were all dressed in\nclothing of a lovely emerald-green color and wore peaked hats like\nthose of the Munchkins.\n\n“This must be the Land of Oz,” said Dorothy, “and we are surely getting\nnear the Emerald City.”\n\n“Yes,” answered the Scarecrow. “Everything is green here, while in the\ncountry of the Munchkins blue was the favorite color. But the people do\nnot seem to be as friendly as the Munchkins, and I’m afraid we shall be\nunable to find a place to pass the night.”\n\n“I should like something to eat besides fruit,” said the girl, “and I’m\nsure Toto is nearly starved. Let us stop at the next house and talk to\nthe people.”\n\nSo, when they came to a good-sized farmhouse, Dorothy walked boldly up\nto the door and knocked.\n\nA woman opened it just far enough to look out, and said, “What do you\nwant, child, and why is that great Lion with you?”\n\n“We wish to pass the night with you, if you will allow us,” answered\nDorothy; “and the Lion is my friend and comrade, and would not hurt you\nfor the world.”\n\n“Is he tame?” asked the woman, opening the door a little wider.\n\n“Oh, yes,” said the girl, “and he is a great coward, too. He will be\nmore afraid of you than you are of him.”\n\n“Well,” said the woman, after thinking it over and taking another peep\nat the Lion, “if that is the case you may come in, and I will give you\nsome supper and a place to sleep.”\n\nSo they all entered the house, where there were, besides the woman, two\nchildren and a man. The man had hurt his leg, and was lying on the\ncouch in a corner. They seemed greatly surprised to see so strange a\ncompany, and while the woman was busy laying the table the man asked:\n\n“Where are you all going?”\n\n“To the Emerald City,” said Dorothy, “to see the Great Oz.”\n\n“Oh, indeed!” exclaimed the man. “Are you sure that Oz will see you?”\n\n“Why not?” she replied.\n\n“Why, it is said that he never lets anyone come into his presence. I\nhave been to the Emerald City many times, and it is a beautiful and\nwonderful place; but I have never been permitted to see the Great Oz,\nnor do I know of any living person who has seen him.”\n\n“Does he never go out?” asked the Scarecrow.\n\n“Never. He sits day after day in the great Throne Room of his Palace,\nand even those who wait upon him do not see him face to face.”\n\n“What is he like?” asked the girl.\n\n“That is hard to tell,” said the man thoughtfully. “You see, Oz is a\nGreat Wizard, and can take on any form he wishes. So that some say he\nlooks like a bird; and some say he looks like an elephant; and some say\nhe looks like a cat. To others he appears as a beautiful fairy, or a\nbrownie, or in any other form that pleases him. But who the real Oz is,\nwhen he is in his own form, no living person can tell.”\n\n“That is very strange,” said Dorothy, “but we must try, in some way, to\nsee him, or we shall have made our journey for nothing.”\n\n“Why do you wish to see the terrible Oz?” asked the man.\n\n“I want him to give me some brains,” said the Scarecrow eagerly.\n\n“Oh, Oz could do that easily enough,” declared the man. “He has more\nbrains than he needs.”\n\n“And I want him to give me a heart,” said the Tin Woodman.\n\n“That will not trouble him,” continued the man, “for Oz has a large\ncollection of hearts, of all sizes and shapes.”\n\n“And I want him to give me courage,” said the Cowardly Lion.\n\n“Oz keeps a great pot of courage in his Throne Room,” said the man,\n“which he has covered with a golden plate, to keep it from running\nover. He will be glad to give you some.”\n\n“And I want him to send me back to Kansas,” said Dorothy.\n\n“Where is Kansas?” asked the man, with surprise.\n\n“I don’t know,” replied Dorothy sorrowfully, “but it is my home, and\nI’m sure it’s somewhere.”\n\n“Very likely. Well, Oz can do anything; so I suppose he will find\nKansas for you. But first you must get to see him, and that will be a\nhard task; for the Great Wizard does not like to see anyone, and he\nusually has his own way. But what do YOU want?” he continued, speaking\nto Toto. Toto only wagged his tail; for, strange to say, he could not\nspeak.\n\nThe woman now called to them that supper was ready, so they gathered\naround the table and Dorothy ate some delicious porridge and a dish of\nscrambled eggs and a plate of nice white bread, and enjoyed her meal.\nThe Lion ate some of the porridge, but did not care for it, saying it\nwas made from oats and oats were food for horses, not for lions. The\nScarecrow and the Tin Woodman ate nothing at all. Toto ate a little of\neverything, and was glad to get a good supper again.\n\nThe woman now gave Dorothy a bed to sleep in, and Toto lay down beside\nher, while the Lion guarded the door of her room so she might not be\ndisturbed. The Scarecrow and the Tin Woodman stood up in a corner and\nkept quiet all night, although of course they could not sleep.\n\nThe next morning, as soon as the sun was up, they started on their way,\nand soon saw a beautiful green glow in the sky just before them.\n\n“That must be the Emerald City,” said Dorothy.\n\nAs they walked on, the green glow became brighter and brighter, and it\nseemed that at last they were nearing the end of their travels. Yet it\nwas afternoon before they came to the great wall that surrounded the\nCity. It was high and thick and of a bright green color.\n\nIn front of them, and at the end of the road of yellow brick, was a big\ngate, all studded with emeralds that glittered so in the sun that even\nthe painted eyes of the Scarecrow were dazzled by their brilliancy.\n\nThere was a bell beside the gate, and Dorothy pushed the button and\nheard a silvery tinkle sound within. Then the big gate swung slowly\nopen, and they all passed through and found themselves in a high arched\nroom, the walls of which glistened with countless emeralds.\n\nBefore them stood a little man about the same size as the Munchkins. He\nwas clothed all in green, from his head to his feet, and even his skin\nwas of a greenish tint. At his side was a large green box.\n\nWhen he saw Dorothy and her companions the man asked, “What do you wish\nin the Emerald City?”\n\n“We came here to see the Great Oz,” said Dorothy.\n\nThe man was so surprised at this answer that he sat down to think it\nover.\n\n“It has been many years since anyone asked me to see Oz,” he said,\nshaking his head in perplexity. “He is powerful and terrible, and if\nyou come on an idle or foolish errand to bother the wise reflections of\nthe Great Wizard, he might be angry and destroy you all in an instant.”\n\n“But it is not a foolish errand, nor an idle one,” replied the\nScarecrow; “it is important. And we have been told that Oz is a good\nWizard.”\n\n“So he is,” said the green man, “and he rules the Emerald City wisely\nand well. But to those who are not honest, or who approach him from\ncuriosity, he is most terrible, and few have ever dared ask to see his\nface. I am the Guardian of the Gates, and since you demand to see the\nGreat Oz I must take you to his Palace. But first you must put on the\nspectacles.”\n\n“Why?” asked Dorothy.\n\n“Because if you did not wear spectacles the brightness and glory of the\nEmerald City would blind you. Even those who live in the City must wear\nspectacles night and day. They are all locked on, for Oz so ordered it\nwhen the City was first built, and I have the only key that will unlock\nthem.”\n\nHe opened the big box, and Dorothy saw that it was filled with\nspectacles of every size and shape. All of them had green glasses in\nthem. The Guardian of the Gates found a pair that would just fit\nDorothy and put them over her eyes. There were two golden bands\nfastened to them that passed around the back of her head, where they\nwere locked together by a little key that was at the end of a chain the\nGuardian of the Gates wore around his neck. When they were on, Dorothy\ncould not take them off had she wished, but of course she did not wish\nto be blinded by the glare of the Emerald City, so she said nothing.\n\nThen the green man fitted spectacles for the Scarecrow and the Tin\nWoodman and the Lion, and even on little Toto; and all were locked fast\nwith the key.\n\nThen the Guardian of the Gates put on his own glasses and told them he\nwas ready to show them to the Palace. Taking a big golden key from a\npeg on the wall, he opened another gate, and they all followed him\nthrough the portal into the streets of the Emerald City.\n\n\n\n\n\n\nEven with eyes protected by the green spectacles, Dorothy and her\nfriends were at first dazzled by the brilliancy of the wonderful City.\nThe streets were lined with beautiful houses all built of green marble\nand studded everywhere with sparkling emeralds. They walked over a\npavement of the same green marble, and where the blocks were joined\ntogether were rows of emeralds, set closely, and glittering in the\nbrightness of the sun. The window panes were of green glass; even the\nsky above the City had a green tint, and the rays of the sun were\ngreen.\n\nThere were many people—men, women, and children—walking about, and\nthese were all dressed in green clothes and had greenish skins. They\nlooked at Dorothy and her strangely assorted company with wondering\neyes, and the children all ran away and hid behind their mothers when\nthey saw the Lion; but no one spoke to them. Many shops stood in the\nstreet, and Dorothy saw that everything in them was green. Green candy\nand green pop corn were offered for sale, as well as green shoes, green\nhats, and green clothes of all sorts. At one place a man was selling\ngreen lemonade, and when the children bought it Dorothy could see that\nthey paid for it with green pennies.\n\nThere seemed to be no horses nor animals of any kind; the men carried\nthings around in little green carts, which they pushed before them.\nEveryone seemed happy and contented and prosperous.\n\nThe Guardian of the Gates led them through the streets until they came\nto a big building, exactly in the middle of the City, which was the\nPalace of Oz, the Great Wizard. There was a soldier before the door,\ndressed in a green uniform and wearing a long green beard.\n\n“Here are strangers,” said the Guardian of the Gates to him, “and they\ndemand to see the Great Oz.”\n\n“Step inside,” answered the soldier, “and I will carry your message to\nhim.”\n\nSo they passed through the Palace Gates and were led into a big room\nwith a green carpet and lovely green furniture set with emeralds. The\nsoldier made them all wipe their feet upon a green mat before entering\nthis room, and when they were seated he said politely:\n\n“Please make yourselves comfortable while I go to the door of the\nThrone Room and tell Oz you are here.”\n\nThey had to wait a long time before the soldier returned. When, at\nlast, he came back, Dorothy asked:\n\n“Have you seen Oz?”\n\n“Oh, no,” returned the soldier; “I have never seen him. But I spoke to\nhim as he sat behind his screen and gave him your message. He said he\nwill grant you an audience, if you so desire; but each one of you must\nenter his presence alone, and he will admit but one each day.\nTherefore, as you must remain in the Palace for several days, I will\nhave you shown to rooms where you may rest in comfort after your\njourney.”\n\n“Thank you,” replied the girl; “that is very kind of Oz.”\n\nThe soldier now blew upon a green whistle, and at once a young girl,\ndressed in a pretty green silk gown, entered the room. She had lovely\ngreen hair and green eyes, and she bowed low before Dorothy as she\nsaid, “Follow me and I will show you your room.”\n\nSo Dorothy said good-bye to all her friends except Toto, and taking the\ndog in her arms followed the green girl through seven passages and up\nthree flights of stairs until they came to a room at the front of the\nPalace. It was the sweetest little room in the world, with a soft\ncomfortable bed that had sheets of green silk and a green velvet\ncounterpane. There was a tiny fountain in the middle of the room, that\nshot a spray of green perfume into the air, to fall back into a\nbeautifully carved green marble basin. Beautiful green flowers stood in\nthe windows, and there was a shelf with a row of little green books.\nWhen Dorothy had time to open these books she found them full of queer\ngreen pictures that made her laugh, they were so funny.\n\nIn a wardrobe were many green dresses, made of silk and satin and\nvelvet; and all of them fitted Dorothy exactly.\n\n“Make yourself perfectly at home,” said the green girl, “and if you\nwish for anything ring the bell. Oz will send for you tomorrow\nmorning.”\n\nShe left Dorothy alone and went back to the others. These she also led\nto rooms, and each one of them found himself lodged in a very pleasant\npart of the Palace. Of course this politeness was wasted on the\nScarecrow; for when he found himself alone in his room he stood\nstupidly in one spot, just within the doorway, to wait till morning. It\nwould not rest him to lie down, and he could not close his eyes; so he\nremained all night staring at a little spider which was weaving its web\nin a corner of the room, just as if it were not one of the most\nwonderful rooms in the world. The Tin Woodman lay down on his bed from\nforce of habit, for he remembered when he was made of flesh; but not\nbeing able to sleep, he passed the night moving his joints up and down\nto make sure they kept in good working order. The Lion would have\npreferred a bed of dried leaves in the forest, and did not like being\nshut up in a room; but he had too much sense to let this worry him, so\nhe sprang upon the bed and rolled himself up like a cat and purred\nhimself asleep in a minute.\n\nThe next morning, after breakfast, the green maiden came to fetch\nDorothy, and she dressed her in one of the prettiest gowns, made of\ngreen brocaded satin. Dorothy put on a green silk apron and tied a\ngreen ribbon around Toto’s neck, and they started for the Throne Room\nof the Great Oz.\n\nFirst they came to a great hall in which were many ladies and gentlemen\nof the court, all dressed in rich costumes. These people had nothing to\ndo but talk to each other, but they always came to wait outside the\nThrone Room every morning, although they were never permitted to see\nOz. As Dorothy entered they looked at her curiously, and one of them\nwhispered:\n\n“Are you really going to look upon the face of Oz the Terrible?”\n\n“Of course,” answered the girl, “if he will see me.”\n\n“Oh, he will see you,” said the soldier who had taken her message to\nthe Wizard, “although he does not like to have people ask to see him.\nIndeed, at first he was angry and said I should send you back where you\ncame from. Then he asked me what you looked like, and when I mentioned\nyour silver shoes he was very much interested. At last I told him about\nthe mark upon your forehead, and he decided he would admit you to his\npresence.”\n\nJust then a bell rang, and the green girl said to Dorothy, “That is the\nsignal. You must go into the Throne Room alone.”\n\nShe opened a little door and Dorothy walked boldly through and found\nherself in a wonderful place. It was a big, round room with a high\narched roof, and the walls and ceiling and floor were covered with\nlarge emeralds set closely together. In the center of the roof was a\ngreat light, as bright as the sun, which made the emeralds sparkle in a\nwonderful manner.\n\nBut what interested Dorothy most was the big throne of green marble\nthat stood in the middle of the room. It was shaped like a chair and\nsparkled with gems, as did everything else. In the center of the chair\nwas an enormous Head, without a body to support it or any arms or legs\nwhatever. There was no hair upon this head, but it had eyes and a nose\nand mouth, and was much bigger than the head of the biggest giant.\n\nAs Dorothy gazed upon this in wonder and fear, the eyes turned slowly\nand looked at her sharply and steadily. Then the mouth moved, and\nDorothy heard a voice say:\n\n“I am Oz, the Great and Terrible. Who are you, and why do you seek me?”\n\nIt was not such an awful voice as she had expected to come from the big\nHead; so she took courage and answered:\n\n“I am Dorothy, the Small and Meek. I have come to you for help.”\n\nThe eyes looked at her thoughtfully for a full minute. Then said the\nvoice:\n\n“Where did you get the silver shoes?”\n\n“I got them from the Wicked Witch of the East, when my house fell on\nher and killed her,” she replied.\n\n“Where did you get the mark upon your forehead?” continued the voice.\n\n“That is where the Good Witch of the North kissed me when she bade me\ngood-bye and sent me to you,” said the girl.\n\nAgain the eyes looked at her sharply, and they saw she was telling the\ntruth. Then Oz asked, “What do you wish me to do?”\n\n“Send me back to Kansas, where my Aunt Em and Uncle Henry are,” she\nanswered earnestly. “I don’t like your country, although it is so\nbeautiful. And I am sure Aunt Em will be dreadfully worried over my\nbeing away so long.”\n\nThe eyes winked three times, and then they turned up to the ceiling and\ndown to the floor and rolled around so queerly that they seemed to see\nevery part of the room. And at last they looked at Dorothy again.\n\n“Why should I do this for you?” asked Oz.\n\n“Because you are strong and I am weak; because you are a Great Wizard\nand I am only a little girl.”\n\n“But you were strong enough to kill the Wicked Witch of the East,” said\nOz.\n\n“That just happened,” returned Dorothy simply; “I could not help it.”\n\n“Well,” said the Head, “I will give you my answer. You have no right to\nexpect me to send you back to Kansas unless you do something for me in\nreturn. In this country everyone must pay for everything he gets. If\nyou wish me to use my magic power to send you home again you must do\nsomething for me first. Help me and I will help you.”\n\n“What must I do?” asked the girl.\n\n“Kill the Wicked Witch of the West,” answered Oz.\n\n“But I cannot!” exclaimed Dorothy, greatly surprised.\n\n“You killed the Witch of the East and you wear the silver shoes, which\nbear a powerful charm. There is now but one Wicked Witch left in all\nthis land, and when you can tell me she is dead I will send you back to\nKansas—but not before.”\n\nThe little girl began to weep, she was so much disappointed; and the\neyes winked again and looked upon her anxiously, as if the Great Oz\nfelt that she could help him if she would.\n\n“I never killed anything, willingly,” she sobbed. “Even if I wanted to,\nhow could I kill the Wicked Witch? If you, who are Great and Terrible,\ncannot kill her yourself, how do you expect me to do it?”\n\n“I do not know,” said the Head; “but that is my answer, and until the\nWicked Witch dies you will not see your uncle and aunt again. Remember\nthat the Witch is Wicked—tremendously Wicked—and ought to be killed.\nNow go, and do not ask to see me again until you have done your task.”\n\nSorrowfully Dorothy left the Throne Room and went back where the Lion\nand the Scarecrow and the Tin Woodman were waiting to hear what Oz had\nsaid to her. “There is no hope for me,” she said sadly, “for Oz will\nnot send me home until I have killed the Wicked Witch of the West; and\nthat I can never do.”\n\nHer friends were sorry, but could do nothing to help her; so Dorothy\nwent to her own room and lay down on the bed and cried herself to\nsleep.\n\nThe next morning the soldier with the green whiskers came to the\nScarecrow and said:\n\n“Come with me, for Oz has sent for you.”\n\nSo the Scarecrow followed him and was admitted into the great Throne\nRoom, where he saw, sitting in the emerald throne, a most lovely Lady.\nShe was dressed in green silk gauze and wore upon her flowing green\nlocks a crown of jewels. Growing from her shoulders were wings,\ngorgeous in color and so light that they fluttered if the slightest\nbreath of air reached them.\n\nWhen the Scarecrow had bowed, as prettily as his straw stuffing would\nlet him, before this beautiful creature, she looked upon him sweetly,\nand said:\n\n“I am Oz, the Great and Terrible. Who are you, and why do you seek me?”\n\nNow the Scarecrow, who had expected to see the great Head Dorothy had\ntold him of, was much astonished; but he answered her bravely.\n\n“I am only a Scarecrow, stuffed with straw. Therefore I have no brains,\nand I come to you praying that you will put brains in my head instead\nof straw, so that I may become as much a man as any other in your\ndominions.”\n\n“Why should I do this for you?” asked the Lady.\n\n“Because you are wise and powerful, and no one else can help me,”\nanswered the Scarecrow.\n\n“I never grant favors without some return,” said Oz; “but this much I\nwill promise. If you will kill for me the Wicked Witch of the West, I\nwill bestow upon you a great many brains, and such good brains that you\nwill be the wisest man in all the Land of Oz.”\n\n“I thought you asked Dorothy to kill the Witch,” said the Scarecrow, in\nsurprise.\n\n“So I did. I don’t care who kills her. But until she is dead I will not\ngrant your wish. Now go, and do not seek me again until you have earned\nthe brains you so greatly desire.”\n\nThe Scarecrow went sorrowfully back to his friends and told them what\nOz had said; and Dorothy was surprised to find that the Great Wizard\nwas not a Head, as she had seen him, but a lovely Lady.\n\n“All the same,” said the Scarecrow, “she needs a heart as much as the\nTin Woodman.”\n\nOn the next morning the soldier with the green whiskers came to the Tin\nWoodman and said:\n\n“Oz has sent for you. Follow me.”\n\nSo the Tin Woodman followed him and came to the great Throne Room. He\ndid not know whether he would find Oz a lovely Lady or a Head, but he\nhoped it would be the lovely Lady. “For,” he said to himself, “if it is\nthe head, I am sure I shall not be given a heart, since a head has no\nheart of its own and therefore cannot feel for me. But if it is the\nlovely Lady I shall beg hard for a heart, for all ladies are themselves\nsaid to be kindly hearted.”\n\nBut when the Woodman entered the great Throne Room he saw neither the\nHead nor the Lady, for Oz had taken the shape of a most terrible Beast.\nIt was nearly as big as an elephant, and the green throne seemed hardly\nstrong enough to hold its weight. The Beast had a head like that of a\nrhinoceros, only there were five eyes in its face. There were five long\narms growing out of its body, and it also had five long, slim legs.\nThick, woolly hair covered every part of it, and a more\ndreadful-looking monster could not be imagined. It was fortunate the\nTin Woodman had no heart at that moment, for it would have beat loud\nand fast from terror. But being only tin, the Woodman was not at all\nafraid, although he was much disappointed.\n\n“I am Oz, the Great and Terrible,” spoke the Beast, in a voice that was\none great roar. “Who are you, and why do you seek me?”\n\n“I am a Woodman, and made of tin. Therefore I have no heart, and cannot\nlove. I pray you to give me a heart that I may be as other men are.”\n\n“Why should I do this?” demanded the Beast.\n\n“Because I ask it, and you alone can grant my request,” answered the\nWoodman.\n\nOz gave a low growl at this, but said, gruffly: “If you indeed desire a\nheart, you must earn it.”\n\n“How?” asked the Woodman.\n\n“Help Dorothy to kill the Wicked Witch of the West,” replied the Beast.\n“When the Witch is dead, come to me, and I will then give you the\nbiggest and kindest and most loving heart in all the Land of Oz.”\n\nSo the Tin Woodman was forced to return sorrowfully to his friends and\ntell them of the terrible Beast he had seen. They all wondered greatly\nat the many forms the Great Wizard could take upon himself, and the\nLion said:\n\n“If he is a Beast when I go to see him, I shall roar my loudest, and so\nfrighten him that he will grant all I ask. And if he is the lovely\nLady, I shall pretend to spring upon her, and so compel her to do my\nbidding. And if he is the great Head, he will be at my mercy; for I\nwill roll this head all about the room until he promises to give us\nwhat we desire. So be of good cheer, my friends, for all will yet be\nwell.”\n\nThe next morning the soldier with the green whiskers led the Lion to\nthe great Throne Room and bade him enter the presence of Oz.\n\nThe Lion at once passed through the door, and glancing around saw, to\nhis surprise, that before the throne was a Ball of Fire, so fierce and\nglowing he could scarcely bear to gaze upon it. His first thought was\nthat Oz had by accident caught on fire and was burning up; but when he\ntried to go nearer, the heat was so intense that it singed his\nwhiskers, and he crept back tremblingly to a spot nearer the door.\n\nThen a low, quiet voice came from the Ball of Fire, and these were the\nwords it spoke:\n\n“I am Oz, the Great and Terrible. Who are you, and why do you seek me?”\n\nAnd the Lion answered, “I am a Cowardly Lion, afraid of everything. I\ncame to you to beg that you give me courage, so that in reality I may\nbecome the King of Beasts, as men call me.”\n\n“Why should I give you courage?” demanded Oz.\n\n“Because of all Wizards you are the greatest, and alone have power to\ngrant my request,” answered the Lion.\n\nThe Ball of Fire burned fiercely for a time, and the voice said, “Bring\nme proof that the Wicked Witch is dead, and that moment I will give you\ncourage. But as long as the Witch lives, you must remain a coward.”\n\nThe Lion was angry at this speech, but could say nothing in reply, and\nwhile he stood silently gazing at the Ball of Fire it became so\nfuriously hot that he turned tail and rushed from the room. He was glad\nto find his friends waiting for him, and told them of his terrible\ninterview with the Wizard.\n\n“What shall we do now?” asked Dorothy sadly.\n\n“There is only one thing we can do,” returned the Lion, “and that is to\ngo to the land of the Winkies, seek out the Wicked Witch, and destroy\nher.”\n\n“But suppose we cannot?” said the girl.\n\n“Then I shall never have courage,” declared the Lion.\n\n“And I shall never have brains,” added the Scarecrow.\n\n“And I shall never have a heart,” spoke the Tin Woodman.\n\n“And I shall never see Aunt Em and Uncle Henry,” said Dorothy,\nbeginning to cry.\n\n“Be careful!” cried the green girl. “The tears will fall on your green\nsilk gown and spot it.”\n\nSo Dorothy dried her eyes and said, “I suppose we must try it; but I am\nsure I do not want to kill anybody, even to see Aunt Em again.”\n\n“I will go with you; but I’m too much of a coward to kill the Witch,”\nsaid the Lion.\n\n“I will go too,” declared the Scarecrow; “but I shall not be of much\nhelp to you, I am such a fool.”\n\n“I haven’t the heart to harm even a Witch,” remarked the Tin Woodman;\n“but if you go I certainly shall go with you.”\n\nTherefore it was decided to start upon their journey the next morning,\nand the Woodman sharpened his axe on a green grindstone and had all his\njoints properly oiled. The Scarecrow stuffed himself with fresh straw\nand Dorothy put new paint on his eyes that he might see better. The\ngreen girl, who was very kind to them, filled Dorothy’s basket with\ngood things to eat, and fastened a little bell around Toto’s neck with\na green ribbon.\n\nThey went to bed quite early and slept soundly until daylight, when\nthey were awakened by the crowing of a green cock that lived in the\nback yard of the Palace, and the cackling of a hen that had laid a\ngreen egg.\n\n\n\n\n\n\nThe soldier with the green whiskers led them through the streets of the\nEmerald City until they reached the room where the Guardian of the\nGates lived. This officer unlocked their spectacles to put them back in\nhis great box, and then he politely opened the gate for our friends.\n\n“Which road leads to the Wicked Witch of the West?” asked Dorothy.\n\n“There is no road,” answered the Guardian of the Gates. “No one ever\nwishes to go that way.”\n\n“How, then, are we to find her?” inquired the girl.\n\n“That will be easy,” replied the man, “for when she knows you are in\nthe country of the Winkies she will find you, and make you all her\nslaves.”\n\n“Perhaps not,” said the Scarecrow, “for we mean to destroy her.”\n\n“Oh, that is different,” said the Guardian of the Gates. “No one has\never destroyed her before, so I naturally thought she would make slaves\nof you, as she has of the rest. But take care; for she is wicked and\nfierce, and may not allow you to destroy her. Keep to the West, where\nthe sun sets, and you cannot fail to find her.”\n\nThey thanked him and bade him good-bye, and turned toward the West,\nwalking over fields of soft grass dotted here and there with daisies\nand buttercups. Dorothy still wore the pretty silk dress she had put on\nin the palace, but now, to her surprise, she found it was no longer\ngreen, but pure white. The ribbon around Toto’s neck had also lost its\ngreen color and was as white as Dorothy’s dress.\n\nThe Emerald City was soon left far behind. As they advanced the ground\nbecame rougher and hillier, for there were no farms nor houses in this\ncountry of the West, and the ground was untilled.\n\nIn the afternoon the sun shone hot in their faces, for there were no\ntrees to offer them shade; so that before night Dorothy and Toto and\nthe Lion were tired, and lay down upon the grass and fell asleep, with\nthe Woodman and the Scarecrow keeping watch.\n\nNow the Wicked Witch of the West had but one eye, yet that was as\npowerful as a telescope, and could see everywhere. So, as she sat in\nthe door of her castle, she happened to look around and saw Dorothy\nlying asleep, with her friends all about her. They were a long distance\noff, but the Wicked Witch was angry to find them in her country; so she\nblew upon a silver whistle that hung around her neck.\n\nAt once there came running to her from all directions a pack of great\nwolves. They had long legs and fierce eyes and sharp teeth.\n\n“Go to those people,” said the Witch, “and tear them to pieces.”\n\n“Are you not going to make them your slaves?” asked the leader of the\nwolves.\n\n“No,” she answered, “one is of tin, and one of straw; one is a girl and\nanother a Lion. None of them is fit to work, so you may tear them into\nsmall pieces.”\n\n“Very well,” said the wolf, and he dashed away at full speed, followed\nby the others.\n\nIt was lucky the Scarecrow and the Woodman were wide awake and heard\nthe wolves coming.\n\n“This is my fight,” said the Woodman, “so get behind me and I will meet\nthem as they come.”\n\nHe seized his axe, which he had made very sharp, and as the leader of\nthe wolves came on the Tin Woodman swung his arm and chopped the wolf’s\nhead from its body, so that it immediately died. As soon as he could\nraise his axe another wolf came up, and he also fell under the sharp\nedge of the Tin Woodman’s weapon. There were forty wolves, and forty\ntimes a wolf was killed, so that at last they all lay dead in a heap\nbefore the Woodman.\n\nThen he put down his axe and sat beside the Scarecrow, who said, “It\nwas a good fight, friend.”\n\nThey waited until Dorothy awoke the next morning. The little girl was\nquite frightened when she saw the great pile of shaggy wolves, but the\nTin Woodman told her all. She thanked him for saving them and sat down\nto breakfast, after which they started again upon their journey.\n\nNow this same morning the Wicked Witch came to the door of her castle\nand looked out with her one eye that could see far off. She saw all her\nwolves lying dead, and the strangers still traveling through her\ncountry. This made her angrier than before, and she blew her silver\nwhistle twice.\n\nStraightway a great flock of wild crows came flying toward her, enough\nto darken the sky.\n\nAnd the Wicked Witch said to the King Crow, “Fly at once to the\nstrangers; peck out their eyes and tear them to pieces.”\n\nThe wild crows flew in one great flock toward Dorothy and her\ncompanions. When the little girl saw them coming she was afraid.\n\nBut the Scarecrow said, “This is my battle, so lie down beside me and\nyou will not be harmed.”\n\nSo they all lay upon the ground except the Scarecrow, and he stood up\nand stretched out his arms. And when the crows saw him they were\nfrightened, as these birds always are by scarecrows, and did not dare\nto come any nearer. But the King Crow said:\n\n“It is only a stuffed man. I will peck his eyes out.”\n\nThe King Crow flew at the Scarecrow, who caught it by the head and\ntwisted its neck until it died. And then another crow flew at him, and\nthe Scarecrow twisted its neck also. There were forty crows, and forty\ntimes the Scarecrow twisted a neck, until at last all were lying dead\nbeside him. Then he called to his companions to rise, and again they\nwent upon their journey.\n\nWhen the Wicked Witch looked out again and saw all her crows lying in a\nheap, she got into a terrible rage, and blew three times upon her\nsilver whistle.\n\nForthwith there was heard a great buzzing in the air, and a swarm of\nblack bees came flying toward her.\n\n“Go to the strangers and sting them to death!” commanded the Witch, and\nthe bees turned and flew rapidly until they came to where Dorothy and\nher friends were walking. But the Woodman had seen them coming, and the\nScarecrow had decided what to do.\n\n“Take out my straw and scatter it over the little girl and the dog and\nthe Lion,” he said to the Woodman, “and the bees cannot sting them.”\nThis the Woodman did, and as Dorothy lay close beside the Lion and held\nToto in her arms, the straw covered them entirely.\n\nThe bees came and found no one but the Woodman to sting, so they flew\nat him and broke off all their stings against the tin, without hurting\nthe Woodman at all. And as bees cannot live when their stings are\nbroken that was the end of the black bees, and they lay scattered thick\nabout the Woodman, like little heaps of fine coal.\n\nThen Dorothy and the Lion got up, and the girl helped the Tin Woodman\nput the straw back into the Scarecrow again, until he was as good as\never. So they started upon their journey once more.\n\nThe Wicked Witch was so angry when she saw her black bees in little\nheaps like fine coal that she stamped her foot and tore her hair and\ngnashed her teeth. And then she called a dozen of her slaves, who were\nthe Winkies, and gave them sharp spears, telling them to go to the\nstrangers and destroy them.\n\nThe Winkies were not a brave people, but they had to do as they were\ntold. So they marched away until they came near to Dorothy. Then the\nLion gave a great roar and sprang towards them, and the poor Winkies\nwere so frightened that they ran back as fast as they could.\n\nWhen they returned to the castle the Wicked Witch beat them well with a\nstrap, and sent them back to their work, after which she sat down to\nthink what she should do next. She could not understand how all her\nplans to destroy these strangers had failed; but she was a powerful\nWitch, as well as a wicked one, and she soon made up her mind how to\nact.\n\nThere was, in her cupboard, a Golden Cap, with a circle of diamonds and\nrubies running round it. This Golden Cap had a charm. Whoever owned it\ncould call three times upon the Winged Monkeys, who would obey any\norder they were given. But no person could command these strange\ncreatures more than three times. Twice already the Wicked Witch had\nused the charm of the Cap. Once was when she had made the Winkies her\nslaves, and set herself to rule over their country. The Winged Monkeys\nhad helped her do this. The second time was when she had fought against\nthe Great Oz himself, and driven him out of the land of the West. The\nWinged Monkeys had also helped her in doing this. Only once more could\nshe use this Golden Cap, for which reason she did not like to do so\nuntil all her other powers were exhausted. But now that her fierce\nwolves and her wild crows and her stinging bees were gone, and her\nslaves had been scared away by the Cowardly Lion, she saw there was\nonly one way left to destroy Dorothy and her friends.\n\nSo the Wicked Witch took the Golden Cap from her cupboard and placed it\nupon her head. Then she stood upon her left foot and said slowly:\n\n“Ep-pe, pep-pe, kak-ke!”\n\nNext she stood upon her right foot and said:\n\n“Hil-lo, hol-lo, hel-lo!”\n\nAfter this she stood upon both feet and cried in a loud voice:\n\n“Ziz-zy, zuz-zy, zik!”\n\nNow the charm began to work. The sky was darkened, and a low rumbling\nsound was heard in the air. There was a rushing of many wings, a great\nchattering and laughing, and the sun came out of the dark sky to show\nthe Wicked Witch surrounded by a crowd of monkeys, each with a pair of\nimmense and powerful wings on his shoulders.\n\nOne, much bigger than the others, seemed to be their leader. He flew\nclose to the Witch and said, “You have called us for the third and last\ntime. What do you command?”\n\n“Go to the strangers who are within my land and destroy them all except\nthe Lion,” said the Wicked Witch. “Bring that beast to me, for I have a\nmind to harness him like a horse, and make him work.”\n\n“Your commands shall be obeyed,” said the leader. Then, with a great\ndeal of chattering and noise, the Winged Monkeys flew away to the place\nwhere Dorothy and her friends were walking.\n\nSome of the Monkeys seized the Tin Woodman and carried him through the\nair until they were over a country thickly covered with sharp rocks.\nHere they dropped the poor Woodman, who fell a great distance to the\nrocks, where he lay so battered and dented that he could neither move\nnor groan.\n\nOthers of the Monkeys caught the Scarecrow, and with their long fingers\npulled all of the straw out of his clothes and head. They made his hat\nand boots and clothes into a small bundle and threw it into the top\nbranches of a tall tree.\n\nThe remaining Monkeys threw pieces of stout rope around the Lion and\nwound many coils about his body and head and legs, until he was unable\nto bite or scratch or struggle in any way. Then they lifted him up and\nflew away with him to the Witch’s castle, where he was placed in a\nsmall yard with a high iron fence around it, so that he could not\nescape.\n\nBut Dorothy they did not harm at all. She stood, with Toto in her arms,\nwatching the sad fate of her comrades and thinking it would soon be her\nturn. The leader of the Winged Monkeys flew up to her, his long, hairy\narms stretched out and his ugly face grinning terribly; but he saw the\nmark of the Good Witch’s kiss upon her forehead and stopped short,\nmotioning the others not to touch her.\n\n“We dare not harm this little girl,” he said to them, “for she is\nprotected by the Power of Good, and that is greater than the Power of\nEvil. All we can do is to carry her to the castle of the Wicked Witch\nand leave her there.”\n\nSo, carefully and gently, they lifted Dorothy in their arms and carried\nher swiftly through the air until they came to the castle, where they\nset her down upon the front doorstep. Then the leader said to the\nWitch:\n\n“We have obeyed you as far as we were able. The Tin Woodman and the\nScarecrow are destroyed, and the Lion is tied up in your yard. The\nlittle girl we dare not harm, nor the dog she carries in her arms. Your\npower over our band is now ended, and you will never see us again.”\n\nThen all the Winged Monkeys, with much laughing and chattering and\nnoise, flew into the air and were soon out of sight.\n\nThe Wicked Witch was both surprised and worried when she saw the mark\non Dorothy’s forehead, for she knew well that neither the Winged\nMonkeys nor she, herself, dare hurt the girl in any way. She looked\ndown at Dorothy’s feet, and seeing the Silver Shoes, began to tremble\nwith fear, for she knew what a powerful charm belonged to them. At\nfirst the Witch was tempted to run away from Dorothy; but she happened\nto look into the child’s eyes and saw how simple the soul behind them\nwas, and that the little girl did not know of the wonderful power the\nSilver Shoes gave her. So the Wicked Witch laughed to herself, and\nthought, “I can still make her my slave, for she does not know how to\nuse her power.” Then she said to Dorothy, harshly and severely:\n\n“Come with me; and see that you mind everything I tell you, for if you\ndo not I will make an end of you, as I did of the Tin Woodman and the\nScarecrow.”\n\nDorothy followed her through many of the beautiful rooms in her castle\nuntil they came to the kitchen, where the Witch bade her clean the pots\nand kettles and sweep the floor and keep the fire fed with wood.\n\nDorothy went to work meekly, with her mind made up to work as hard as\nshe could; for she was glad the Wicked Witch had decided not to kill\nher.\n\nWith Dorothy hard at work, the Witch thought she would go into the\ncourtyard and harness the Cowardly Lion like a horse; it would amuse\nher, she was sure, to make him draw her chariot whenever she wished to\ngo to drive. But as she opened the gate the Lion gave a loud roar and\nbounded at her so fiercely that the Witch was afraid, and ran out and\nshut the gate again.\n\n“If I cannot harness you,” said the Witch to the Lion, speaking through\nthe bars of the gate, “I can starve you. You shall have nothing to eat\nuntil you do as I wish.”\n\nSo after that she took no food to the imprisoned Lion; but every day\nshe came to the gate at noon and asked, “Are you ready to be harnessed\nlike a horse?”\n\nAnd the Lion would answer, “No. If you come in this yard, I will bite\nyou.”\n\nThe reason the Lion did not have to do as the Witch wished was that\nevery night, while the woman was asleep, Dorothy carried him food from\nthe cupboard. After he had eaten he would lie down on his bed of straw,\nand Dorothy would lie beside him and put her head on his soft, shaggy\nmane, while they talked of their troubles and tried to plan some way to\nescape. But they could find no way to get out of the castle, for it was\nconstantly guarded by the yellow Winkies, who were the slaves of the\nWicked Witch and too afraid of her not to do as she told them.\n\nThe girl had to work hard during the day, and often the Witch\nthreatened to beat her with the same old umbrella she always carried in\nher hand. But, in truth, she did not dare to strike Dorothy, because of\nthe mark upon her forehead. The child did not know this, and was full\nof fear for herself and Toto. Once the Witch struck Toto a blow with\nher umbrella and the brave little dog flew at her and bit her leg in\nreturn. The Witch did not bleed where she was bitten, for she was so\nwicked that the blood in her had dried up many years before.\n\nDorothy’s life became very sad as she grew to understand that it would\nbe harder than ever to get back to Kansas and Aunt Em again. Sometimes\nshe would cry bitterly for hours, with Toto sitting at her feet and\nlooking into her face, whining dismally to show how sorry he was for\nhis little mistress. Toto did not really care whether he was in Kansas\nor the Land of Oz so long as Dorothy was with him; but he knew the\nlittle girl was unhappy, and that made him unhappy too.\n\nNow the Wicked Witch had a great longing to have for her own the Silver\nShoes which the girl always wore. Her bees and her crows and her wolves\nwere lying in heaps and drying up, and she had used up all the power of\nthe Golden Cap; but if she could only get hold of the Silver Shoes,\nthey would give her more power than all the other things she had lost.\nShe watched Dorothy carefully, to see if she ever took off her shoes,\nthinking she might steal them. But the child was so proud of her pretty\nshoes that she never took them off except at night and when she took\nher bath. The Witch was too much afraid of the dark to dare go in\nDorothy’s room at night to take the shoes, and her dread of water was\ngreater than her fear of the dark, so she never came near when Dorothy\nwas bathing. Indeed, the old Witch never touched water, nor ever let\nwater touch her in any way.\n\nBut the wicked creature was very cunning, and she finally thought of a\ntrick that would give her what she wanted. She placed a bar of iron in\nthe middle of the kitchen floor, and then by her magic arts made the\niron invisible to human eyes. So that when Dorothy walked across the\nfloor she stumbled over the bar, not being able to see it, and fell at\nfull length. She was not much hurt, but in her fall one of the Silver\nShoes came off; and before she could reach it, the Witch had snatched\nit away and put it on her own skinny foot.\n\nThe wicked woman was greatly pleased with the success of her trick, for\nas long as she had one of the shoes she owned half the power of their\ncharm, and Dorothy could not use it against her, even had she known how\nto do so.\n\nThe little girl, seeing she had lost one of her pretty shoes, grew\nangry, and said to the Witch, “Give me back my shoe!”\n\n“I will not,” retorted the Witch, “for it is now my shoe, and not\nyours.”\n\n“You are a wicked creature!” cried Dorothy. “You have no right to take\nmy shoe from me.”\n\n“I shall keep it, just the same,” said the Witch, laughing at her, “and\nsomeday I shall get the other one from you, too.”\n\nThis made Dorothy so very angry that she picked up the bucket of water\nthat stood near and dashed it over the Witch, wetting her from head to\nfoot.\n\nInstantly the wicked woman gave a loud cry of fear, and then, as\nDorothy looked at her in wonder, the Witch began to shrink and fall\naway.\n\n“See what you have done!” she screamed. “In a minute I shall melt\naway.”\n\n“I’m very sorry, indeed,” said Dorothy, who was truly frightened to see\nthe Witch actually melting away like brown sugar before her very eyes.\n\n“Didn’t you know water would be the end of me?” asked the Witch, in a\nwailing, despairing voice.\n\n“Of course not,” answered Dorothy. “How should I?”\n\n“Well, in a few minutes I shall be all melted, and you will have the\ncastle to yourself. I have been wicked in my day, but I never thought a\nlittle girl like you would ever be able to melt me and end my wicked\ndeeds. Look out—here I go!”\n\nWith these words the Witch fell down in a brown, melted, shapeless mass\nand began to spread over the clean boards of the kitchen floor. Seeing\nthat she had really melted away to nothing, Dorothy drew another bucket\nof water and threw it over the mess. She then swept it all out the\ndoor. After picking out the silver shoe, which was all that was left of\nthe old woman, she cleaned and dried it with a cloth, and put it on her\nfoot again. Then, being at last free to do as she chose, she ran out to\nthe courtyard to tell the Lion that the Wicked Witch of the West had\ncome to an end, and that they were no longer prisoners in a strange\nland.\n\n\n\n\n\n\nThe Cowardly Lion was much pleased to hear that the Wicked Witch had\nbeen melted by a bucket of water, and Dorothy at once unlocked the gate\nof his prison and set him free. They went in together to the castle,\nwhere Dorothy’s first act was to call all the Winkies together and tell\nthem that they were no longer slaves.\n\nThere was great rejoicing among the yellow Winkies, for they had been\nmade to work hard during many years for the Wicked Witch, who had\nalways treated them with great cruelty. They kept this day as a\nholiday, then and ever after, and spent the time in feasting and\ndancing.\n\n“If our friends, the Scarecrow and the Tin Woodman, were only with us,”\nsaid the Lion, “I should be quite happy.”\n\n“Don’t you suppose we could rescue them?” asked the girl anxiously.\n\n“We can try,” answered the Lion.\n\nSo they called the yellow Winkies and asked them if they would help to\nrescue their friends, and the Winkies said that they would be delighted\nto do all in their power for Dorothy, who had set them free from\nbondage. So she chose a number of the Winkies who looked as if they\nknew the most, and they all started away. They traveled that day and\npart of the next until they came to the rocky plain where the Tin\nWoodman lay, all battered and bent. His axe was near him, but the blade\nwas rusted and the handle broken off short.\n\nThe Winkies lifted him tenderly in their arms, and carried him back to\nthe Yellow Castle again, Dorothy shedding a few tears by the way at the\nsad plight of her old friend, and the Lion looking sober and sorry.\nWhen they reached the castle Dorothy said to the Winkies:\n\n“Are any of your people tinsmiths?”\n\n“Oh, yes. Some of us are very good tinsmiths,” they told her.\n\n“Then bring them to me,” she said. And when the tinsmiths came,\nbringing with them all their tools in baskets, she inquired, “Can you\nstraighten out those dents in the Tin Woodman, and bend him back into\nshape again, and solder him together where he is broken?”\n\nThe tinsmiths looked the Woodman over carefully and then answered that\nthey thought they could mend him so he would be as good as ever. So\nthey set to work in one of the big yellow rooms of the castle and\nworked for three days and four nights, hammering and twisting and\nbending and soldering and polishing and pounding at the legs and body\nand head of the Tin Woodman, until at last he was straightened out into\nhis old form, and his joints worked as well as ever. To be sure, there\nwere several patches on him, but the tinsmiths did a good job, and as\nthe Woodman was not a vain man he did not mind the patches at all.\n\nWhen, at last, he walked into Dorothy’s room and thanked her for\nrescuing him, he was so pleased that he wept tears of joy, and Dorothy\nhad to wipe every tear carefully from his face with her apron, so his\njoints would not be rusted. At the same time her own tears fell thick\nand fast at the joy of meeting her old friend again, and these tears\ndid not need to be wiped away. As for the Lion, he wiped his eyes so\noften with the tip of his tail that it became quite wet, and he was\nobliged to go out into the courtyard and hold it in the sun till it\ndried.\n\n“If we only had the Scarecrow with us again,” said the Tin Woodman,\nwhen Dorothy had finished telling him everything that had happened, “I\nshould be quite happy.”\n\n“We must try to find him,” said the girl.\n\nSo she called the Winkies to help her, and they walked all that day and\npart of the next until they came to the tall tree in the branches of\nwhich the Winged Monkeys had tossed the Scarecrow’s clothes.\n\nIt was a very tall tree, and the trunk was so smooth that no one could\nclimb it; but the Woodman said at once, “I’ll chop it down, and then we\ncan get the Scarecrow’s clothes.”\n\nNow while the tinsmiths had been at work mending the Woodman himself,\nanother of the Winkies, who was a goldsmith, had made an axe-handle of\nsolid gold and fitted it to the Woodman’s axe, instead of the old\nbroken handle. Others polished the blade until all the rust was removed\nand it glistened like burnished silver.\n\nAs soon as he had spoken, the Tin Woodman began to chop, and in a short\ntime the tree fell over with a crash, whereupon the Scarecrow’s clothes\nfell out of the branches and rolled off on the ground.\n\nDorothy picked them up and had the Winkies carry them back to the\ncastle, where they were stuffed with nice, clean straw; and behold!\nhere was the Scarecrow, as good as ever, thanking them over and over\nagain for saving him.\n\nNow that they were reunited, Dorothy and her friends spent a few happy\ndays at the Yellow Castle, where they found everything they needed to\nmake them comfortable.\n\nBut one day the girl thought of Aunt Em, and said, “We must go back to\nOz, and claim his promise.”\n\n“Yes,” said the Woodman, “at last I shall get my heart.”\n\n“And I shall get my brains,” added the Scarecrow joyfully.\n\n“And I shall get my courage,” said the Lion thoughtfully.\n\n“And I shall get back to Kansas,” cried Dorothy, clapping her hands.\n“Oh, let us start for the Emerald City tomorrow!”\n\nThis they decided to do. The next day they called the Winkies together\nand bade them good-bye. The Winkies were sorry to have them go, and\nthey had grown so fond of the Tin Woodman that they begged him to stay\nand rule over them and the Yellow Land of the West. Finding they were\ndetermined to go, the Winkies gave Toto and the Lion each a golden\ncollar; and to Dorothy they presented a beautiful bracelet studded with\ndiamonds; and to the Scarecrow they gave a gold-headed walking stick,\nto keep him from stumbling; and to the Tin Woodman they offered a\nsilver oil-can, inlaid with gold and set with precious jewels.\n\nEvery one of the travelers made the Winkies a pretty speech in return,\nand all shook hands with them until their arms ached.\n\nDorothy went to the Witch’s cupboard to fill her basket with food for\nthe journey, and there she saw the Golden Cap. She tried it on her own\nhead and found that it fitted her exactly. She did not know anything\nabout the charm of the Golden Cap, but she saw that it was pretty, so\nshe made up her mind to wear it and carry her sunbonnet in the basket.\n\nThen, being prepared for the journey, they all started for the Emerald\nCity; and the Winkies gave them three cheers and many good wishes to\ncarry with them.\n\n\n\n\n\n\nYou will remember there was no road—not even a pathway—between the\ncastle of the Wicked Witch and the Emerald City. When the four\ntravelers went in search of the Witch she had seen them coming, and so\nsent the Winged Monkeys to bring them to her. It was much harder to\nfind their way back through the big fields of buttercups and yellow\ndaisies than it was being carried. They knew, of course, they must go\nstraight east, toward the rising sun; and they started off in the right\nway. But at noon, when the sun was over their heads, they did not know\nwhich was east and which was west, and that was the reason they were\nlost in the great fields. They kept on walking, however, and at night\nthe moon came out and shone brightly. So they lay down among the sweet\nsmelling yellow flowers and slept soundly until morning—all but the\nScarecrow and the Tin Woodman.\n\nThe next morning the sun was behind a cloud, but they started on, as if\nthey were quite sure which way they were going.\n\n“If we walk far enough,” said Dorothy, “I am sure we shall sometime\ncome to some place.”\n\nBut day by day passed away, and they still saw nothing before them but\nthe scarlet fields. The Scarecrow began to grumble a bit.\n\n“We have surely lost our way,” he said, “and unless we find it again in\ntime to reach the Emerald City, I shall never get my brains.”\n\n“Nor I my heart,” declared the Tin Woodman. “It seems to me I can\nscarcely wait till I get to Oz, and you must admit this is a very long\njourney.”\n\n“You see,” said the Cowardly Lion, with a whimper, “I haven’t the\ncourage to keep tramping forever, without getting anywhere at all.”\n\nThen Dorothy lost heart. She sat down on the grass and looked at her\ncompanions, and they sat down and looked at her, and Toto found that\nfor the first time in his life he was too tired to chase a butterfly\nthat flew past his head. So he put out his tongue and panted and looked\nat Dorothy as if to ask what they should do next.\n\n“Suppose we call the field mice,” she suggested. “They could probably\ntell us the way to the Emerald City.”\n\n“To be sure they could,” cried the Scarecrow. “Why didn’t we think of\nthat before?”\n\nDorothy blew the little whistle she had always carried about her neck\nsince the Queen of the Mice had given it to her. In a few minutes they\nheard the pattering of tiny feet, and many of the small gray mice came\nrunning up to her. Among them was the Queen herself, who asked, in her\nsqueaky little voice:\n\n“What can I do for my friends?”\n\n“We have lost our way,” said Dorothy. “Can you tell us where the\nEmerald City is?”\n\n“Certainly,” answered the Queen; “but it is a great way off, for you\nhave had it at your backs all this time.” Then she noticed Dorothy’s\nGolden Cap, and said, “Why don’t you use the charm of the Cap, and call\nthe Winged Monkeys to you? They will carry you to the City of Oz in\nless than an hour.”\n\n“I didn’t know there was a charm,” answered Dorothy, in surprise. “What\nis it?”\n\n“It is written inside the Golden Cap,” replied the Queen of the Mice.\n“But if you are going to call the Winged Monkeys we must run away, for\nthey are full of mischief and think it great fun to plague us.”\n\n“Won’t they hurt me?” asked the girl anxiously.\n\n“Oh, no. They must obey the wearer of the Cap. Good-bye!” And she\nscampered out of sight, with all the mice hurrying after her.\n\nDorothy looked inside the Golden Cap and saw some words written upon\nthe lining. These, she thought, must be the charm, so she read the\ndirections carefully and put the Cap upon her head.\n\n“Ep-pe, pep-pe, kak-ke!” she said, standing on her left foot.\n\n“What did you say?” asked the Scarecrow, who did not know what she was\ndoing.\n\n“Hil-lo, hol-lo, hel-lo!” Dorothy went on, standing this time on her\nright foot.\n\n“Hello!” replied the Tin Woodman calmly.\n\n“Ziz-zy, zuz-zy, zik!” said Dorothy, who was now standing on both feet.\nThis ended the saying of the charm, and they heard a great chattering\nand flapping of wings, as the band of Winged Monkeys flew up to them.\n\nThe King bowed low before Dorothy, and asked, “What is your command?”\n\n“We wish to go to the Emerald City,” said the child, “and we have lost\nour way.”\n\n“We will carry you,” replied the King, and no sooner had he spoken than\ntwo of the Monkeys caught Dorothy in their arms and flew away with her.\nOthers took the Scarecrow and the Woodman and the Lion, and one little\nMonkey seized Toto and flew after them, although the dog tried hard to\nbite him.\n\nThe Scarecrow and the Tin Woodman were rather frightened at first, for\nthey remembered how badly the Winged Monkeys had treated them before;\nbut they saw that no harm was intended, so they rode through the air\nquite cheerfully, and had a fine time looking at the pretty gardens and\nwoods far below them.\n\nDorothy found herself riding easily between two of the biggest Monkeys,\none of them the King himself. They had made a chair of their hands and\nwere careful not to hurt her.\n\n“Why do you have to obey the charm of the Golden Cap?” she asked.\n\n“That is a long story,” answered the King, with a winged laugh; “but as\nwe have a long journey before us, I will pass the time by telling you\nabout it, if you wish.”\n\n“I shall be glad to hear it,” she replied.\n\n“Once,” began the leader, “we were a free people, living happily in the\ngreat forest, flying from tree to tree, eating nuts and fruit, and\ndoing just as we pleased without calling anybody master. Perhaps some\nof us were rather too full of mischief at times, flying down to pull\nthe tails of the animals that had no wings, chasing birds, and throwing\nnuts at the people who walked in the forest. But we were careless and\nhappy and full of fun, and enjoyed every minute of the day. This was\nmany years ago, long before Oz came out of the clouds to rule over this\nland.\n\n“There lived here then, away at the North, a beautiful princess, who\nwas also a powerful sorceress. All her magic was used to help the\npeople, and she was never known to hurt anyone who was good. Her name\nwas Gayelette, and she lived in a handsome palace built from great\nblocks of ruby. Everyone loved her, but her greatest sorrow was that\nshe could find no one to love in return, since all the men were much\ntoo stupid and ugly to mate with one so beautiful and wise. At last,\nhowever, she found a boy who was handsome and manly and wise beyond his\nyears. Gayelette made up her mind that when he grew to be a man she\nwould make him her husband, so she took him to her ruby palace and used\nall her magic powers to make him as strong and good and lovely as any\nwoman could wish. When he grew to manhood, Quelala, as he was called,\nwas said to be the best and wisest man in all the land, while his manly\nbeauty was so great that Gayelette loved him dearly, and hastened to\nmake everything ready for the wedding.\n\n“My grandfather was at that time the King of the Winged Monkeys which\nlived in the forest near Gayelette’s palace, and the old fellow loved a\njoke better than a good dinner. One day, just before the wedding, my\ngrandfather was flying out with his band when he saw Quelala walking\nbeside the river. He was dressed in a rich costume of pink silk and\npurple velvet, and my grandfather thought he would see what he could\ndo. At his word the band flew down and seized Quelala, carried him in\ntheir arms until they were over the middle of the river, and then\ndropped him into the water.\n\n“‘Swim out, my fine fellow,’ cried my grandfather, ‘and see if the\nwater has spotted your clothes.’ Quelala was much too wise not to swim,\nand he was not in the least spoiled by all his good fortune. He\nlaughed, when he came to the top of the water, and swam in to shore.\nBut when Gayelette came running out to him she found his silks and\nvelvet all ruined by the river.\n\n“The princess was angry, and she knew, of course, who did it. She had\nall the Winged Monkeys brought before her, and she said at first that\ntheir wings should be tied and they should be treated as they had\ntreated Quelala, and dropped in the river. But my grandfather pleaded\nhard, for he knew the Monkeys would drown in the river with their wings\ntied, and Quelala said a kind word for them also; so that Gayelette\nfinally spared them, on condition that the Winged Monkeys should ever\nafter do three times the bidding of the owner of the Golden Cap. This\nCap had been made for a wedding present to Quelala, and it is said to\nhave cost the princess half her kingdom. Of course my grandfather and\nall the other Monkeys at once agreed to the condition, and that is how\nit happens that we are three times the slaves of the owner of the\nGolden Cap, whosoever he may be.”\n\n“And what became of them?” asked Dorothy, who had been greatly\ninterested in the story.\n\n“Quelala being the first owner of the Golden Cap,” replied the Monkey,\n“he was the first to lay his wishes upon us. As his bride could not\nbear the sight of us, he called us all to him in the forest after he\nhad married her and ordered us always to keep where she could never\nagain set eyes on a Winged Monkey, which we were glad to do, for we\nwere all afraid of her.\n\n“This was all we ever had to do until the Golden Cap fell into the\nhands of the Wicked Witch of the West, who made us enslave the Winkies,\nand afterward drive Oz himself out of the Land of the West. Now the\nGolden Cap is yours, and three times you have the right to lay your\nwishes upon us.”\n\nAs the Monkey King finished his story Dorothy looked down and saw the\ngreen, shining walls of the Emerald City before them. She wondered at\nthe rapid flight of the Monkeys, but was glad the journey was over. The\nstrange creatures set the travelers down carefully before the gate of\nthe City, the King bowed low to Dorothy, and then flew swiftly away,\nfollowed by all his band.\n\n“That was a good ride,” said the little girl.\n\n“Yes, and a quick way out of our troubles,” replied the Lion. “How\nlucky it was you brought away that wonderful Cap!”\n\n\n\n\n\n\nThe four travelers walked up to the great gate of Emerald City and rang\nthe bell. After ringing several times, it was opened by the same\nGuardian of the Gates they had met before.\n\n“What! are you back again?” he asked, in surprise.\n\n“Do you not see us?” answered the Scarecrow.\n\n“But I thought you had gone to visit the Wicked Witch of the West.”\n\n“We did visit her,” said the Scarecrow.\n\n“And she let you go again?” asked the man, in wonder.\n\n“She could not help it, for she is melted,” explained the Scarecrow.\n\n“Melted! Well, that is good news, indeed,” said the man. “Who melted\nher?”\n\n“It was Dorothy,” said the Lion gravely.\n\n“Good gracious!” exclaimed the man, and he bowed very low indeed before\nher.\n\nThen he led them into his little room and locked the spectacles from\nthe great box on all their eyes, just as he had done before. Afterward\nthey passed on through the gate into the Emerald City. When the people\nheard from the Guardian of the Gates that Dorothy had melted the Wicked\nWitch of the West, they all gathered around the travelers and followed\nthem in a great crowd to the Palace of Oz.\n\nThe soldier with the green whiskers was still on guard before the door,\nbut he let them in at once, and they were again met by the beautiful\ngreen girl, who showed each of them to their old rooms at once, so they\nmight rest until the Great Oz was ready to receive them.\n\nThe soldier had the news carried straight to Oz that Dorothy and the\nother travelers had come back again, after destroying the Wicked Witch;\nbut Oz made no reply. They thought the Great Wizard would send for them\nat once, but he did not. They had no word from him the next day, nor\nthe next, nor the next. The waiting was tiresome and wearing, and at\nlast they grew vexed that Oz should treat them in so poor a fashion,\nafter sending them to undergo hardships and slavery. So the Scarecrow\nat last asked the green girl to take another message to Oz, saying if\nhe did not let them in to see him at once they would call the Winged\nMonkeys to help them, and find out whether he kept his promises or not.\nWhen the Wizard was given this message he was so frightened that he\nsent word for them to come to the Throne Room at four minutes after\nnine o’clock the next morning. He had once met the Winged Monkeys in\nthe Land of the West, and he did not wish to meet them again.\n\nThe four travelers passed a sleepless night, each thinking of the gift\nOz had promised to bestow on him. Dorothy fell asleep only once, and\nthen she dreamed she was in Kansas, where Aunt Em was telling her how\nglad she was to have her little girl at home again.\n\nPromptly at nine o’clock the next morning the green-whiskered soldier\ncame to them, and four minutes later they all went into the Throne Room\nof the Great Oz.\n\nOf course each one of them expected to see the Wizard in the shape he\nhad taken before, and all were greatly surprised when they looked about\nand saw no one at all in the room. They kept close to the door and\ncloser to one another, for the stillness of the empty room was more\ndreadful than any of the forms they had seen Oz take.\n\nPresently they heard a solemn Voice, that seemed to come from somewhere\nnear the top of the great dome, and it said:\n\n“I am Oz, the Great and Terrible. Why do you seek me?”\n\nThey looked again in every part of the room, and then, seeing no one,\nDorothy asked, “Where are you?”\n\n“I am everywhere,” answered the Voice, “but to the eyes of common\nmortals I am invisible. I will now seat myself upon my throne, that you\nmay converse with me.” Indeed, the Voice seemed just then to come\nstraight from the throne itself; so they walked toward it and stood in\na row while Dorothy said:\n\n“We have come to claim our promise, O Oz.”\n\n“What promise?” asked Oz.\n\n“You promised to send me back to Kansas when the Wicked Witch was\ndestroyed,” said the girl.\n\n“And you promised to give me brains,” said the Scarecrow.\n\n“And you promised to give me a heart,” said the Tin Woodman.\n\n“And you promised to give me courage,” said the Cowardly Lion.\n\n“Is the Wicked Witch really destroyed?” asked the Voice, and Dorothy\nthought it trembled a little.\n\n“Yes,” she answered, “I melted her with a bucket of water.”\n\n“Dear me,” said the Voice, “how sudden! Well, come to me tomorrow, for\nI must have time to think it over.”\n\n“You’ve had plenty of time already,” said the Tin Woodman angrily.\n\n“We shan’t wait a day longer,” said the Scarecrow.\n\n“You must keep your promises to us!” exclaimed Dorothy.\n\nThe Lion thought it might be as well to frighten the Wizard, so he gave\na large, loud roar, which was so fierce and dreadful that Toto jumped\naway from him in alarm and tipped over the screen that stood in a\ncorner. As it fell with a crash they looked that way, and the next\nmoment all of them were filled with wonder. For they saw, standing in\njust the spot the screen had hidden, a little old man, with a bald head\nand a wrinkled face, who seemed to be as much surprised as they were.\nThe Tin Woodman, raising his axe, rushed toward the little man and\ncried out, “Who are you?”\n\n“I am Oz, the Great and Terrible,” said the little man, in a trembling\nvoice. “But don’t strike me—please don’t—and I’ll do anything you want\nme to.”\n\nOur friends looked at him in surprise and dismay.\n\n“I thought Oz was a great Head,” said Dorothy.\n\n“And I thought Oz was a lovely Lady,” said the Scarecrow.\n\n“And I thought Oz was a terrible Beast,” said the Tin Woodman.\n\n“And I thought Oz was a Ball of Fire,” exclaimed the Lion.\n\n“No, you are all wrong,” said the little man meekly. “I have been\nmaking believe.”\n\n“Making believe!” cried Dorothy. “Are you not a Great Wizard?”\n\n“Hush, my dear,” he said. “Don’t speak so loud, or you will be\noverheard—and I should be ruined. I’m supposed to be a Great Wizard.”\n\n“And aren’t you?” she asked.\n\n“Not a bit of it, my dear; I’m just a common man.”\n\n“You’re more than that,” said the Scarecrow, in a grieved tone; “you’re\na humbug.”\n\n“Exactly so!” declared the little man, rubbing his hands together as if\nit pleased him. “I am a humbug.”\n\n“But this is terrible,” said the Tin Woodman. “How shall I ever get my\nheart?”\n\n“Or I my courage?” asked the Lion.\n\n“Or I my brains?” wailed the Scarecrow, wiping the tears from his eyes\nwith his coat sleeve.\n\n“My dear friends,” said Oz, “I pray you not to speak of these little\nthings. Think of me, and the terrible trouble I’m in at being found\nout.”\n\n“Doesn’t anyone else know you’re a humbug?” asked Dorothy.\n\n“No one knows it but you four—and myself,” replied Oz. “I have fooled\neveryone so long that I thought I should never be found out. It was a\ngreat mistake my ever letting you into the Throne Room. Usually I will\nnot see even my subjects, and so they believe I am something terrible.”\n\n“But, I don’t understand,” said Dorothy, in bewilderment. “How was it\nthat you appeared to me as a great Head?”\n\n“That was one of my tricks,” answered Oz. “Step this way, please, and I\nwill tell you all about it.”\n\nHe led the way to a small chamber in the rear of the Throne Room, and\nthey all followed him. He pointed to one corner, in which lay the great\nHead, made out of many thicknesses of paper, and with a carefully\npainted face.\n\n“This I hung from the ceiling by a wire,” said Oz. “I stood behind the\nscreen and pulled a thread, to make the eyes move and the mouth open.”\n\n“But how about the voice?” she inquired.\n\n“Oh, I am a ventriloquist,” said the little man. “I can throw the sound\nof my voice wherever I wish, so that you thought it was coming out of\nthe Head. Here are the other things I used to deceive you.” He showed\nthe Scarecrow the dress and the mask he had worn when he seemed to be\nthe lovely Lady. And the Tin Woodman saw that his terrible Beast was\nnothing but a lot of skins, sewn together, with slats to keep their\nsides out. As for the Ball of Fire, the false Wizard had hung that also\nfrom the ceiling. It was really a ball of cotton, but when oil was\npoured upon it the ball burned fiercely.\n\n“Really,” said the Scarecrow, “you ought to be ashamed of yourself for\nbeing such a humbug.”\n\n“I am—I certainly am,” answered the little man sorrowfully; “but it was\nthe only thing I could do. Sit down, please, there are plenty of\nchairs; and I will tell you my story.”\n\nSo they sat down and listened while he told the following tale.\n\n“I was born in Omaha—”\n\n“Why, that isn’t very far from Kansas!” cried Dorothy.\n\n“No, but it’s farther from here,” he said, shaking his head at her\nsadly. “When I grew up I became a ventriloquist, and at that I was very\nwell trained by a great master. I can imitate any kind of a bird or\nbeast.” Here he mewed so like a kitten that Toto pricked up his ears\nand looked everywhere to see where she was. “After a time,” continued\nOz, “I tired of that, and became a balloonist.”\n\n“What is that?” asked Dorothy.\n\n“A man who goes up in a balloon on circus day, so as to draw a crowd of\npeople together and get them to pay to see the circus,” he explained.\n\n“Oh,” she said, “I know.”\n\n“Well, one day I went up in a balloon and the ropes got twisted, so\nthat I couldn’t come down again. It went way up above the clouds, so\nfar that a current of air struck it and carried it many, many miles\naway. For a day and a night I traveled through the air, and on the\nmorning of the second day I awoke and found the balloon floating over a\nstrange and beautiful country.\n\n“It came down gradually, and I was not hurt a bit. But I found myself\nin the midst of a strange people, who, seeing me come from the clouds,\nthought I was a great Wizard. Of course I let them think so, because\nthey were afraid of me, and promised to do anything I wished them to.\n\n“Just to amuse myself, and keep the good people busy, I ordered them to\nbuild this City, and my Palace; and they did it all willingly and well.\nThen I thought, as the country was so green and beautiful, I would call\nit the Emerald City; and to make the name fit better I put green\nspectacles on all the people, so that everything they saw was green.”\n\n“But isn’t everything here green?” asked Dorothy.\n\n“No more than in any other city,” replied Oz; “but when you wear green\nspectacles, why of course everything you see looks green to you. The\nEmerald City was built a great many years ago, for I was a young man\nwhen the balloon brought me here, and I am a very old man now. But my\npeople have worn green glasses on their eyes so long that most of them\nthink it really is an Emerald City, and it certainly is a beautiful\nplace, abounding in jewels and precious metals, and every good thing\nthat is needed to make one happy. I have been good to the people, and\nthey like me; but ever since this Palace was built, I have shut myself\nup and would not see any of them.\n\n“One of my greatest fears was the Witches, for while I had no magical\npowers at all I soon found out that the Witches were really able to do\nwonderful things. There were four of them in this country, and they\nruled the people who live in the North and South and East and West.\nFortunately, the Witches of the North and South were good, and I knew\nthey would do me no harm; but the Witches of the East and West were\nterribly wicked, and had they not thought I was more powerful than they\nthemselves, they would surely have destroyed me. As it was, I lived in\ndeadly fear of them for many years; so you can imagine how pleased I\nwas when I heard your house had fallen on the Wicked Witch of the East.\nWhen you came to me, I was willing to promise anything if you would\nonly do away with the other Witch; but, now that you have melted her, I\nam ashamed to say that I cannot keep my promises.”\n\n“I think you are a very bad man,” said Dorothy.\n\n“Oh, no, my dear; I’m really a very good man, but I’m a very bad\nWizard, I must admit.”\n\n“Can’t you give me brains?” asked the Scarecrow.\n\n“You don’t need them. You are learning something every day. A baby has\nbrains, but it doesn’t know much. Experience is the only thing that\nbrings knowledge, and the longer you are on earth the more experience\nyou are sure to get.”\n\n“That may all be true,” said the Scarecrow, “but I shall be very\nunhappy unless you give me brains.”\n\nThe false Wizard looked at him carefully.\n\n“Well,” he said with a sigh, “I’m not much of a magician, as I said;\nbut if you will come to me tomorrow morning, I will stuff your head\nwith brains. I cannot tell you how to use them, however; you must find\nthat out for yourself.”\n\n“Oh, thank you—thank you!” cried the Scarecrow. “I’ll find a way to use\nthem, never fear!”\n\n“But how about my courage?” asked the Lion anxiously.\n\n“You have plenty of courage, I am sure,” answered Oz. “All you need is\nconfidence in yourself. There is no living thing that is not afraid\nwhen it faces danger. The True courage is in facing danger when you are\nafraid, and that kind of courage you have in plenty.”\n\n“Perhaps I have, but I’m scared just the same,” said the Lion. “I shall\nreally be very unhappy unless you give me the sort of courage that\nmakes one forget he is afraid.”\n\n“Very well, I will give you that sort of courage tomorrow,” replied Oz.\n\n“How about my heart?” asked the Tin Woodman.\n\n“Why, as for that,” answered Oz, “I think you are wrong to want a\nheart. It makes most people unhappy. If you only knew it, you are in\nluck not to have a heart.”\n\n“That must be a matter of opinion,” said the Tin Woodman. “For my part,\nI will bear all the unhappiness without a murmur, if you will give me\nthe heart.”\n\n“Very well,” answered Oz meekly. “Come to me tomorrow and you shall\nhave a heart. I have played Wizard for so many years that I may as well\ncontinue the part a little longer.”\n\n“And now,” said Dorothy, “how am I to get back to Kansas?”\n\n“We shall have to think about that,” replied the little man. “Give me\ntwo or three days to consider the matter and I’ll try to find a way to\ncarry you over the desert. In the meantime you shall all be treated as\nmy guests, and while you live in the Palace my people will wait upon\nyou and obey your slightest wish. There is only one thing I ask in\nreturn for my help—such as it is. You must keep my secret and tell no\none I am a humbug.”\n\nThey agreed to say nothing of what they had learned, and went back to\ntheir rooms in high spirits. Even Dorothy had hope that “The Great and\nTerrible Humbug,” as she called him, would find a way to send her back\nto Kansas, and if he did she was willing to forgive him everything.\n\n\n\n\n\n\nNext morning the Scarecrow said to his friends:\n\n“Congratulate me. I am going to Oz to get my brains at last. When I\nreturn I shall be as other men are.”\n\n“I have always liked you as you were,” said Dorothy simply.\n\n“It is kind of you to like a Scarecrow,” he replied. “But surely you\nwill think more of me when you hear the splendid thoughts my new brain\nis going to turn out.” Then he said good-bye to them all in a cheerful\nvoice and went to the Throne Room, where he rapped upon the door.\n\n“Come in,” said Oz.\n\nThe Scarecrow went in and found the little man sitting down by the\nwindow, engaged in deep thought.\n\n“I have come for my brains,” remarked the Scarecrow, a little uneasily.\n\n“Oh, yes; sit down in that chair, please,” replied Oz. “You must excuse\nme for taking your head off, but I shall have to do it in order to put\nyour brains in their proper place.”\n\n“That’s all right,” said the Scarecrow. “You are quite welcome to take\nmy head off, as long as it will be a better one when you put it on\nagain.”\n\nSo the Wizard unfastened his head and emptied out the straw. Then he\nentered the back room and took up a measure of bran, which he mixed\nwith a great many pins and needles. Having shaken them together\nthoroughly, he filled the top of the Scarecrow’s head with the mixture\nand stuffed the rest of the space with straw, to hold it in place.\n\nWhen he had fastened the Scarecrow’s head on his body again he said to\nhim, “Hereafter you will be a great man, for I have given you a lot of\nbran-new brains.”\n\nThe Scarecrow was both pleased and proud at the fulfillment of his\ngreatest wish, and having thanked Oz warmly he went back to his\nfriends.\n\nDorothy looked at him curiously. His head was quite bulged out at the\ntop with brains.\n\n“How do you feel?” she asked.\n\n“I feel wise indeed,” he answered earnestly. “When I get used to my\nbrains I shall know everything.”\n\n“Why are those needles and pins sticking out of your head?” asked the\nTin Woodman.\n\n“That is proof that he is sharp,” remarked the Lion.\n\n“Well, I must go to Oz and get my heart,” said the Woodman. So he\nwalked to the Throne Room and knocked at the door.\n\n“Come in,” called Oz, and the Woodman entered and said, “I have come\nfor my heart.”\n\n“Very well,” answered the little man. “But I shall have to cut a hole\nin your breast, so I can put your heart in the right place. I hope it\nwon’t hurt you.”\n\n“Oh, no,” answered the Woodman. “I shall not feel it at all.”\n\nSo Oz brought a pair of tinsmith’s shears and cut a small, square hole\nin the left side of the Tin Woodman’s breast. Then, going to a chest of\ndrawers, he took out a pretty heart, made entirely of silk and stuffed\nwith sawdust.\n\n“Isn’t it a beauty?” he asked.\n\n“It is, indeed!” replied the Woodman, who was greatly pleased. “But is\nit a kind heart?”\n\n“Oh, very!” answered Oz. He put the heart in the Woodman’s breast and\nthen replaced the square of tin, soldering it neatly together where it\nhad been cut.\n\n“There,” said he; “now you have a heart that any man might be proud of.\nI’m sorry I had to put a patch on your breast, but it really couldn’t\nbe helped.”\n\n“Never mind the patch,” exclaimed the happy Woodman. “I am very\ngrateful to you, and shall never forget your kindness.”\n\n“Don’t speak of it,” replied Oz.\n\nThen the Tin Woodman went back to his friends, who wished him every joy\non account of his good fortune.\n\nThe Lion now walked to the Throne Room and knocked at the door.\n\n“Come in,” said Oz.\n\n“I have come for my courage,” announced the Lion, entering the room.\n\n“Very well,” answered the little man; “I will get it for you.”\n\nHe went to a cupboard and reaching up to a high shelf took down a\nsquare green bottle, the contents of which he poured into a green-gold\ndish, beautifully carved. Placing this before the Cowardly Lion, who\nsniffed at it as if he did not like it, the Wizard said:\n\n“Drink.”\n\n“What is it?” asked the Lion.\n\n“Well,” answered Oz, “if it were inside of you, it would be courage.\nYou know, of course, that courage is always inside one; so that this\nreally cannot be called courage until you have swallowed it. Therefore\nI advise you to drink it as soon as possible.”\n\nThe Lion hesitated no longer, but drank till the dish was empty.\n\n“How do you feel now?” asked Oz.\n\n“Full of courage,” replied the Lion, who went joyfully back to his\nfriends to tell them of his good fortune.\n\nOz, left to himself, smiled to think of his success in giving the\nScarecrow and the Tin Woodman and the Lion exactly what they thought\nthey wanted. “How can I help being a humbug,” he said, “when all these\npeople make me do things that everybody knows can’t be done? It was\neasy to make the Scarecrow and the Lion and the Woodman happy, because\nthey imagined I could do anything. But it will take more than\nimagination to carry Dorothy back to Kansas, and I’m sure I don’t know\nhow it can be done.”\n\n\n\n\n\n\nFor three days Dorothy heard nothing from Oz. These were sad days for\nthe little girl, although her friends were all quite happy and\ncontented. The Scarecrow told them there were wonderful thoughts in his\nhead; but he would not say what they were because he knew no one could\nunderstand them but himself. When the Tin Woodman walked about he felt\nhis heart rattling around in his breast; and he told Dorothy he had\ndiscovered it to be a kinder and more tender heart than the one he had\nowned when he was made of flesh. The Lion declared he was afraid of\nnothing on earth, and would gladly face an army or a dozen of the\nfierce Kalidahs.\n\nThus each of the little party was satisfied except Dorothy, who longed\nmore than ever to get back to Kansas.\n\nOn the fourth day, to her great joy, Oz sent for her, and when she\nentered the Throne Room he greeted her pleasantly:\n\n“Sit down, my dear; I think I have found the way to get you out of this\ncountry.”\n\n“And back to Kansas?” she asked eagerly.\n\n“Well, I’m not sure about Kansas,” said Oz, “for I haven’t the faintest\nnotion which way it lies. But the first thing to do is to cross the\ndesert, and then it should be easy to find your way home.”\n\n“How can I cross the desert?” she inquired.\n\n“Well, I’ll tell you what I think,” said the little man. “You see, when\nI came to this country it was in a balloon. You also came through the\nair, being carried by a cyclone. So I believe the best way to get\nacross the desert will be through the air. Now, it is quite beyond my\npowers to make a cyclone; but I’ve been thinking the matter over, and I\nbelieve I can make a balloon.”\n\n“How?” asked Dorothy.\n\n“A balloon,” said Oz, “is made of silk, which is coated with glue to\nkeep the gas in it. I have plenty of silk in the Palace, so it will be\nno trouble to make the balloon. But in all this country there is no gas\nto fill the balloon with, to make it float.”\n\n“If it won’t float,” remarked Dorothy, “it will be of no use to us.”\n\n“True,” answered Oz. “But there is another way to make it float, which\nis to fill it with hot air. Hot air isn’t as good as gas, for if the\nair should get cold the balloon would come down in the desert, and we\nshould be lost.”\n\n“We!” exclaimed the girl. “Are you going with me?”\n\n“Yes, of course,” replied Oz. “I am tired of being such a humbug. If I\nshould go out of this Palace my people would soon discover I am not a\nWizard, and then they would be vexed with me for having deceived them.\nSo I have to stay shut up in these rooms all day, and it gets tiresome.\nI’d much rather go back to Kansas with you and be in a circus again.”\n\n“I shall be glad to have your company,” said Dorothy.\n\n“Thank you,” he answered. “Now, if you will help me sew the silk\ntogether, we will begin to work on our balloon.”\n\nSo Dorothy took a needle and thread, and as fast as Oz cut the strips\nof silk into proper shape the girl sewed them neatly together. First\nthere was a strip of light green silk, then a strip of dark green and\nthen a strip of emerald green; for Oz had a fancy to make the balloon\nin different shades of the color about them. It took three days to sew\nall the strips together, but when it was finished they had a big bag of\ngreen silk more than twenty feet long.\n\nThen Oz painted it on the inside with a coat of thin glue, to make it\nairtight, after which he announced that the balloon was ready.\n\n“But we must have a basket to ride in,” he said. So he sent the soldier\nwith the green whiskers for a big clothes basket, which he fastened\nwith many ropes to the bottom of the balloon.\n\nWhen it was all ready, Oz sent word to his people that he was going to\nmake a visit to a great brother Wizard who lived in the clouds. The\nnews spread rapidly throughout the city and everyone came to see the\nwonderful sight.\n\nOz ordered the balloon carried out in front of the Palace, and the\npeople gazed upon it with much curiosity. The Tin Woodman had chopped a\nbig pile of wood, and now he made a fire of it, and Oz held the bottom\nof the balloon over the fire so that the hot air that arose from it\nwould be caught in the silken bag. Gradually the balloon swelled out\nand rose into the air, until finally the basket just touched the\nground.\n\nThen Oz got into the basket and said to all the people in a loud voice:\n\n“I am now going away to make a visit. While I am gone the Scarecrow\nwill rule over you. I command you to obey him as you would me.”\n\nThe balloon was by this time tugging hard at the rope that held it to\nthe ground, for the air within it was hot, and this made it so much\nlighter in weight than the air without that it pulled hard to rise into\nthe sky.\n\n“Come, Dorothy!” cried the Wizard. “Hurry up, or the balloon will fly\naway.”\n\n“I can’t find Toto anywhere,” replied Dorothy, who did not wish to\nleave her little dog behind. Toto had run into the crowd to bark at a\nkitten, and Dorothy at last found him. She picked him up and ran\ntowards the balloon.\n\nShe was within a few steps of it, and Oz was holding out his hands to\nhelp her into the basket, when, crack! went the ropes, and the balloon\nrose into the air without her.\n\n“Come back!” she screamed. “I want to go, too!”\n\n“I can’t come back, my dear,” called Oz from the basket. “Good-bye!”\n\n“Good-bye!” shouted everyone, and all eyes were turned upward to where\nthe Wizard was riding in the basket, rising every moment farther and\nfarther into the sky.\n\nAnd that was the last any of them ever saw of Oz, the Wonderful Wizard,\nthough he may have reached Omaha safely, and be there now, for all we\nknow. But the people remembered him lovingly, and said to one another:\n\n“Oz was always our friend. When he was here he built for us this\nbeautiful Emerald City, and now he is gone he has left the Wise\nScarecrow to rule over us.”\n\nStill, for many days they grieved over the loss of the Wonderful\nWizard, and would not be comforted.\n\n\n\n\n\n\nDorothy wept bitterly at the passing of her hope to get home to Kansas\nagain; but when she thought it all over she was glad she had not gone\nup in a balloon. And she also felt sorry at losing Oz, and so did her\ncompanions.\n\nThe Tin Woodman came to her and said:\n\n“Truly I should be ungrateful if I failed to mourn for the man who gave\nme my lovely heart. I should like to cry a little because Oz is gone,\nif you will kindly wipe away my tears, so that I shall not rust.”\n\n“With pleasure,” she answered, and brought a towel at once. Then the\nTin Woodman wept for several minutes, and she watched the tears\ncarefully and wiped them away with the towel. When he had finished, he\nthanked her kindly and oiled himself thoroughly with his jeweled\noil-can, to guard against mishap.\n\nThe Scarecrow was now the ruler of the Emerald City, and although he\nwas not a Wizard the people were proud of him. “For,” they said, “there\nis not another city in all the world that is ruled by a stuffed man.”\nAnd, so far as they knew, they were quite right.\n\nThe morning after the balloon had gone up with Oz, the four travelers\nmet in the Throne Room and talked matters over. The Scarecrow sat in\nthe big throne and the others stood respectfully before him.\n\n“We are not so unlucky,” said the new ruler, “for this Palace and the\nEmerald City belong to us, and we can do just as we please. When I\nremember that a short time ago I was up on a pole in a farmer’s\ncornfield, and that now I am the ruler of this beautiful City, I am\nquite satisfied with my lot.”\n\n“I also,” said the Tin Woodman, “am well-pleased with my new heart;\nand, really, that was the only thing I wished in all the world.”\n\n“For my part, I am content in knowing I am as brave as any beast that\never lived, if not braver,” said the Lion modestly.\n\n“If Dorothy would only be contented to live in the Emerald City,”\ncontinued the Scarecrow, “we might all be happy together.”\n\n“But I don’t want to live here,” cried Dorothy. “I want to go to\nKansas, and live with Aunt Em and Uncle Henry.”\n\n“Well, then, what can be done?” inquired the Woodman.\n\nThe Scarecrow decided to think, and he thought so hard that the pins\nand needles began to stick out of his brains. Finally he said:\n\n“Why not call the Winged Monkeys, and ask them to carry you over the\ndesert?”\n\n“I never thought of that!” said Dorothy joyfully. “It’s just the thing.\nI’ll go at once for the Golden Cap.”\n\nWhen she brought it into the Throne Room she spoke the magic words, and\nsoon the band of Winged Monkeys flew in through the open window and\nstood beside her.\n\n“This is the second time you have called us,” said the Monkey King,\nbowing before the little girl. “What do you wish?”\n\n“I want you to fly with me to Kansas,” said Dorothy.\n\nBut the Monkey King shook his head.\n\n“That cannot be done,” he said. “We belong to this country alone, and\ncannot leave it. There has never been a Winged Monkey in Kansas yet,\nand I suppose there never will be, for they don’t belong there. We\nshall be glad to serve you in any way in our power, but we cannot cross\nthe desert. Good-bye.”\n\nAnd with another bow, the Monkey King spread his wings and flew away\nthrough the window, followed by all his band.\n\nDorothy was ready to cry with disappointment. “I have wasted the charm\nof the Golden Cap to no purpose,” she said, “for the Winged Monkeys\ncannot help me.”\n\n“It is certainly too bad!” said the tender-hearted Woodman.\n\nThe Scarecrow was thinking again, and his head bulged out so horribly\nthat Dorothy feared it would burst.\n\n“Let us call in the soldier with the green whiskers,” he said, “and ask\nhis advice.”\n\nSo the soldier was summoned and entered the Throne Room timidly, for\nwhile Oz was alive he never was allowed to come farther than the door.\n\n“This little girl,” said the Scarecrow to the soldier, “wishes to cross\nthe desert. How can she do so?”\n\n“I cannot tell,” answered the soldier, “for nobody has ever crossed the\ndesert, unless it is Oz himself.”\n\n“Is there no one who can help me?” asked Dorothy earnestly.\n\n“Glinda might,” he suggested.\n\n“Who is Glinda?” inquired the Scarecrow.\n\n“The Witch of the South. She is the most powerful of all the Witches,\nand rules over the Quadlings. Besides, her castle stands on the edge of\nthe desert, so she may know a way to cross it.”\n\n“Glinda is a Good Witch, isn’t she?” asked the child.\n\n“The Quadlings think she is good,” said the soldier, “and she is kind\nto everyone. I have heard that Glinda is a beautiful woman, who knows\nhow to keep young in spite of the many years she has lived.”\n\n“How can I get to her castle?” asked Dorothy.\n\n“The road is straight to the South,” he answered, “but it is said to be\nfull of dangers to travelers. There are wild beasts in the woods, and a\nrace of queer men who do not like strangers to cross their country. For\nthis reason none of the Quadlings ever come to the Emerald City.”\n\nThe soldier then left them and the Scarecrow said:\n\n“It seems, in spite of dangers, that the best thing Dorothy can do is\nto travel to the Land of the South and ask Glinda to help her. For, of\ncourse, if Dorothy stays here she will never get back to Kansas.”\n\n“You must have been thinking again,” remarked the Tin Woodman.\n\n“I have,” said the Scarecrow.\n\n“I shall go with Dorothy,” declared the Lion, “for I am tired of your\ncity and long for the woods and the country again. I am really a wild\nbeast, you know. Besides, Dorothy will need someone to protect her.”\n\n“That is true,” agreed the Woodman. “My axe may be of service to her;\nso I also will go with her to the Land of the South.”\n\n“When shall we start?” asked the Scarecrow.\n\n“Are you going?” they asked, in surprise.\n\n“Certainly. If it wasn’t for Dorothy I should never have had brains.\nShe lifted me from the pole in the cornfield and brought me to the\nEmerald City. So my good luck is all due to her, and I shall never\nleave her until she starts back to Kansas for good and all.”\n\n“Thank you,” said Dorothy gratefully. “You are all very kind to me. But\nI should like to start as soon as possible.”\n\n“We shall go tomorrow morning,” returned the Scarecrow. “So now let us\nall get ready, for it will be a long journey.”\n\n\n\n\n\n\nThe next morning Dorothy kissed the pretty green girl good-bye, and\nthey all shook hands with the soldier with the green whiskers, who had\nwalked with them as far as the gate. When the Guardian of the Gate saw\nthem again he wondered greatly that they could leave the beautiful City\nto get into new trouble. But he at once unlocked their spectacles,\nwhich he put back into the green box, and gave them many good wishes to\ncarry with them.\n\n“You are now our ruler,” he said to the Scarecrow; “so you must come\nback to us as soon as possible.”\n\n“I certainly shall if I am able,” the Scarecrow replied; “but I must\nhelp Dorothy to get home, first.”\n\nAs Dorothy bade the good-natured Guardian a last farewell she said:\n\n“I have been very kindly treated in your lovely City, and everyone has\nbeen good to me. I cannot tell you how grateful I am.”\n\n“Don’t try, my dear,” he answered. “We should like to keep you with us,\nbut if it is your wish to return to Kansas, I hope you will find a\nway.” He then opened the gate of the outer wall, and they walked forth\nand started upon their journey.\n\nThe sun shone brightly as our friends turned their faces toward the\nLand of the South. They were all in the best of spirits, and laughed\nand chatted together. Dorothy was once more filled with the hope of\ngetting home, and the Scarecrow and the Tin Woodman were glad to be of\nuse to her. As for the Lion, he sniffed the fresh air with delight and\nwhisked his tail from side to side in pure joy at being in the country\nagain, while Toto ran around them and chased the moths and butterflies,\nbarking merrily all the time.\n\n“City life does not agree with me at all,” remarked the Lion, as they\nwalked along at a brisk pace. “I have lost much flesh since I lived\nthere, and now I am anxious for a chance to show the other beasts how\ncourageous I have grown.”\n\nThey now turned and took a last look at the Emerald City. All they\ncould see was a mass of towers and steeples behind the green walls, and\nhigh up above everything the spires and dome of the Palace of Oz.\n\n“Oz was not such a bad Wizard, after all,” said the Tin Woodman, as he\nfelt his heart rattling around in his breast.\n\n“He knew how to give me brains, and very good brains, too,” said the\nScarecrow.\n\n“If Oz had taken a dose of the same courage he gave me,” added the\nLion, “he would have been a brave man.”\n\nDorothy said nothing. Oz had not kept the promise he made her, but he\nhad done his best, so she forgave him. As he said, he was a good man,\neven if he was a bad Wizard.\n\nThe first day’s journey was through the green fields and bright flowers\nthat stretched about the Emerald City on every side. They slept that\nnight on the grass, with nothing but the stars over them; and they\nrested very well indeed.\n\nIn the morning they traveled on until they came to a thick wood. There\nwas no way of going around it, for it seemed to extend to the right and\nleft as far as they could see; and, besides, they did not dare change\nthe direction of their journey for fear of getting lost. So they looked\nfor the place where it would be easiest to get into the forest.\n\nThe Scarecrow, who was in the lead, finally discovered a big tree with\nsuch wide-spreading branches that there was room for the party to pass\nunderneath. So he walked forward to the tree, but just as he came under\nthe first branches they bent down and twined around him, and the next\nminute he was raised from the ground and flung headlong among his\nfellow travelers.\n\nThis did not hurt the Scarecrow, but it surprised him, and he looked\nrather dizzy when Dorothy picked him up.\n\n“Here is another space between the trees,” called the Lion.\n\n“Let me try it first,” said the Scarecrow, “for it doesn’t hurt me to\nget thrown about.” He walked up to another tree, as he spoke, but its\nbranches immediately seized him and tossed him back again.\n\n“This is strange,” exclaimed Dorothy. “What shall we do?”\n\n“The trees seem to have made up their minds to fight us, and stop our\njourney,” remarked the Lion.\n\n“I believe I will try it myself,” said the Woodman, and shouldering his\naxe, he marched up to the first tree that had handled the Scarecrow so\nroughly. When a big branch bent down to seize him the Woodman chopped\nat it so fiercely that he cut it in two. At once the tree began shaking\nall its branches as if in pain, and the Tin Woodman passed safely under\nit.\n\n“Come on!” he shouted to the others. “Be quick!” They all ran forward\nand passed under the tree without injury, except Toto, who was caught\nby a small branch and shaken until he howled. But the Woodman promptly\nchopped off the branch and set the little dog free.\n\nThe other trees of the forest did nothing to keep them back, so they\nmade up their minds that only the first row of trees could bend down\ntheir branches, and that probably these were the policemen of the\nforest, and given this wonderful power in order to keep strangers out\nof it.\n\nThe four travelers walked with ease through the trees until they came\nto the farther edge of the wood. Then, to their surprise, they found\nbefore them a high wall which seemed to be made of white china. It was\nsmooth, like the surface of a dish, and higher than their heads.\n\n“What shall we do now?” asked Dorothy.\n\n“I will make a ladder,” said the Tin Woodman, “for we certainly must\nclimb over the wall.”\n\n\n\n\n\n\nWhile the Woodman was making a ladder from wood which he found in the\nforest Dorothy lay down and slept, for she was tired by the long walk.\nThe Lion also curled himself up to sleep and Toto lay beside him.\n\nThe Scarecrow watched the Woodman while he worked, and said to him:\n\n“I cannot think why this wall is here, nor what it is made of.”\n\n“Rest your brains and do not worry about the wall,” replied the\nWoodman. “When we have climbed over it, we shall know what is on the\nother side.”\n\nAfter a time the ladder was finished. It looked clumsy, but the Tin\nWoodman was sure it was strong and would answer their purpose. The\nScarecrow waked Dorothy and the Lion and Toto, and told them that the\nladder was ready. The Scarecrow climbed up the ladder first, but he was\nso awkward that Dorothy had to follow close behind and keep him from\nfalling off. When he got his head over the top of the wall the\nScarecrow said, “Oh, my!”\n\n“Go on,” exclaimed Dorothy.\n\nSo the Scarecrow climbed farther up and sat down on the top of the\nwall, and Dorothy put her head over and cried, “Oh, my!” just as the\nScarecrow had done.\n\nThen Toto came up, and immediately began to bark, but Dorothy made him\nbe still.\n\nThe Lion climbed the ladder next, and the Tin Woodman came last; but\nboth of them cried, “Oh, my!” as soon as they looked over the wall.\nWhen they were all sitting in a row on the top of the wall, they looked\ndown and saw a strange sight.\n\nBefore them was a great stretch of country having a floor as smooth and\nshining and white as the bottom of a big platter. Scattered around were\nmany houses made entirely of china and painted in the brightest colors.\nThese houses were quite small, the biggest of them reaching only as\nhigh as Dorothy’s waist. There were also pretty little barns, with\nchina fences around them; and many cows and sheep and horses and pigs\nand chickens, all made of china, were standing about in groups.\n\nBut the strangest of all were the people who lived in this queer\ncountry. There were milkmaids and shepherdesses, with brightly colored\nbodices and golden spots all over their gowns; and princesses with most\ngorgeous frocks of silver and gold and purple; and shepherds dressed in\nknee breeches with pink and yellow and blue stripes down them, and\ngolden buckles on their shoes; and princes with jeweled crowns upon\ntheir heads, wearing ermine robes and satin doublets; and funny clowns\nin ruffled gowns, with round red spots upon their cheeks and tall,\npointed caps. And, strangest of all, these people were all made of\nchina, even to their clothes, and were so small that the tallest of\nthem was no higher than Dorothy’s knee.\n\nNo one did so much as look at the travelers at first, except one little\npurple china dog with an extra-large head, which came to the wall and\nbarked at them in a tiny voice, afterwards running away again.\n\n“How shall we get down?” asked Dorothy.\n\nThey found the ladder so heavy they could not pull it up, so the\nScarecrow fell off the wall and the others jumped down upon him so that\nthe hard floor would not hurt their feet. Of course they took pains not\nto light on his head and get the pins in their feet. When all were\nsafely down they picked up the Scarecrow, whose body was quite\nflattened out, and patted his straw into shape again.\n\n“We must cross this strange place in order to get to the other side,”\nsaid Dorothy, “for it would be unwise for us to go any other way except\ndue South.”\n\nThey began walking through the country of the china people, and the\nfirst thing they came to was a china milkmaid milking a china cow. As\nthey drew near, the cow suddenly gave a kick and kicked over the stool,\nthe pail, and even the milkmaid herself, and all fell on the china\nground with a great clatter.\n\nDorothy was shocked to see that the cow had broken her leg off, and\nthat the pail was lying in several small pieces, while the poor\nmilkmaid had a nick in her left elbow.\n\n“There!” cried the milkmaid angrily. “See what you have done! My cow\nhas broken her leg, and I must take her to the mender’s shop and have\nit glued on again. What do you mean by coming here and frightening my\ncow?”\n\n“I’m very sorry,” returned Dorothy. “Please forgive us.”\n\nBut the pretty milkmaid was much too vexed to make any answer. She\npicked up the leg sulkily and led her cow away, the poor animal limping\non three legs. As she left them the milkmaid cast many reproachful\nglances over her shoulder at the clumsy strangers, holding her nicked\nelbow close to her side.\n\nDorothy was quite grieved at this mishap.\n\n“We must be very careful here,” said the kind-hearted Woodman, “or we\nmay hurt these pretty little people so they will never get over it.”\n\nA little farther on Dorothy met a most beautifully dressed young\nPrincess, who stopped short as she saw the strangers and started to run\naway.\n\nDorothy wanted to see more of the Princess, so she ran after her. But\nthe china girl cried out:\n\n“Don’t chase me! Don’t chase me!”\n\nShe had such a frightened little voice that Dorothy stopped and said,\n“Why not?”\n\n“Because,” answered the Princess, also stopping, a safe distance away,\n“if I run I may fall down and break myself.”\n\n“But could you not be mended?” asked the girl.\n\n“Oh, yes; but one is never so pretty after being mended, you know,”\nreplied the Princess.\n\n“I suppose not,” said Dorothy.\n\n“Now there is Mr. Joker, one of our clowns,” continued the china lady,\n“who is always trying to stand upon his head. He has broken himself so\noften that he is mended in a hundred places, and doesn’t look at all\npretty. Here he comes now, so you can see for yourself.”\n\nIndeed, a jolly little clown came walking toward them, and Dorothy\ncould see that in spite of his pretty clothes of red and yellow and\ngreen he was completely covered with cracks, running every which way\nand showing plainly that he had been mended in many places.\n\nThe Clown put his hands in his pockets, and after puffing out his\ncheeks and nodding his head at them saucily, he said:\n\n    “My lady fair,\n   Why do you stare\nAt poor old Mr. Joker?\n    You’re quite as stiff\n    And prim as if\nYou’d eaten up a poker!”\n\n\n“Be quiet, sir!” said the Princess. “Can’t you see these are strangers,\nand should be treated with respect?”\n\n“Well, that’s respect, I expect,” declared the Clown, and immediately\nstood upon his head.\n\n“Don’t mind Mr. Joker,” said the Princess to Dorothy. “He is\nconsiderably cracked in his head, and that makes him foolish.”\n\n“Oh, I don’t mind him a bit,” said Dorothy. “But you are so beautiful,”\nshe continued, “that I am sure I could love you dearly. Won’t you let\nme carry you back to Kansas, and stand you on Aunt Em’s mantel? I could\ncarry you in my basket.”\n\n“That would make me very unhappy,” answered the china Princess. “You\nsee, here in our country we live contentedly, and can talk and move\naround as we please. But whenever any of us are taken away our joints\nat once stiffen, and we can only stand straight and look pretty. Of\ncourse that is all that is expected of us when we are on mantels and\ncabinets and drawing-room tables, but our lives are much pleasanter\nhere in our own country.”\n\n“I would not make you unhappy for all the world!” exclaimed Dorothy.\n“So I’ll just say good-bye.”\n\n“Good-bye,” replied the Princess.\n\nThey walked carefully through the china country. The little animals and\nall the people scampered out of their way, fearing the strangers would\nbreak them, and after an hour or so the travelers reached the other\nside of the country and came to another china wall.\n\nIt was not so high as the first, however, and by standing upon the\nLion’s back they all managed to scramble to the top. Then the Lion\ngathered his legs under him and jumped on the wall; but just as he\njumped, he upset a china church with his tail and smashed it all to\npieces.\n\n“That was too bad,” said Dorothy, “but really I think we were lucky in\nnot doing these little people more harm than breaking a cow’s leg and a\nchurch. They are all so brittle!”\n\n“They are, indeed,” said the Scarecrow, “and I am thankful I am made of\nstraw and cannot be easily damaged. There are worse things in the world\nthan being a Scarecrow.”\n\n\n\n\n\n\nAfter climbing down from the china wall the travelers found themselves\nin a disagreeable country, full of bogs and marshes and covered with\ntall, rank grass. It was difficult to walk without falling into muddy\nholes, for the grass was so thick that it hid them from sight. However,\nby carefully picking their way, they got safely along until they\nreached solid ground. But here the country seemed wilder than ever, and\nafter a long and tiresome walk through the underbrush they entered\nanother forest, where the trees were bigger and older than any they had\never seen.\n\n“This forest is perfectly delightful,” declared the Lion, looking\naround him with joy. “Never have I seen a more beautiful place.”\n\n“It seems gloomy,” said the Scarecrow.\n\n“Not a bit of it,” answered the Lion. “I should like to live here all\nmy life. See how soft the dried leaves are under your feet and how rich\nand green the moss is that clings to these old trees. Surely no wild\nbeast could wish a pleasanter home.”\n\n“Perhaps there are wild beasts in the forest now,” said Dorothy.\n\n“I suppose there are,” returned the Lion, “but I do not see any of them\nabout.”\n\nThey walked through the forest until it became too dark to go any\nfarther. Dorothy and Toto and the Lion lay down to sleep, while the\nWoodman and the Scarecrow kept watch over them as usual.\n\nWhen morning came, they started again. Before they had gone far they\nheard a low rumble, as of the growling of many wild animals. Toto\nwhimpered a little, but none of the others was frightened, and they\nkept along the well-trodden path until they came to an opening in the\nwood, in which were gathered hundreds of beasts of every variety. There\nwere tigers and elephants and bears and wolves and foxes and all the\nothers in the natural history, and for a moment Dorothy was afraid. But\nthe Lion explained that the animals were holding a meeting, and he\njudged by their snarling and growling that they were in great trouble.\n\nAs he spoke several of the beasts caught sight of him, and at once the\ngreat assemblage hushed as if by magic. The biggest of the tigers came\nup to the Lion and bowed, saying:\n\n“Welcome, O King of Beasts! You have come in good time to fight our\nenemy and bring peace to all the animals of the forest once more.”\n\n“What is your trouble?” asked the Lion quietly.\n\n“We are all threatened,” answered the tiger, “by a fierce enemy which\nhas lately come into this forest. It is a most tremendous monster, like\na great spider, with a body as big as an elephant and legs as long as a\ntree trunk. It has eight of these long legs, and as the monster crawls\nthrough the forest he seizes an animal with a leg and drags it to his\nmouth, where he eats it as a spider does a fly. Not one of us is safe\nwhile this fierce creature is alive, and we had called a meeting to\ndecide how to take care of ourselves when you came among us.”\n\nThe Lion thought for a moment.\n\n“Are there any other lions in this forest?” he asked.\n\n“No; there were some, but the monster has eaten them all. And, besides,\nthey were none of them nearly so large and brave as you.”\n\n“If I put an end to your enemy, will you bow down to me and obey me as\nKing of the Forest?” inquired the Lion.\n\n“We will do that gladly,” returned the tiger; and all the other beasts\nroared with a mighty roar: “We will!”\n\n“Where is this great spider of yours now?” asked the Lion.\n\n“Yonder, among the oak trees,” said the tiger, pointing with his\nforefoot.\n\n“Take good care of these friends of mine,” said the Lion, “and I will\ngo at once to fight the monster.”\n\nHe bade his comrades good-bye and marched proudly away to do battle\nwith the enemy.\n\nThe great spider was lying asleep when the Lion found him, and it\nlooked so ugly that its foe turned up his nose in disgust. Its legs\nwere quite as long as the tiger had said, and its body covered with\ncoarse black hair. It had a great mouth, with a row of sharp teeth a\nfoot long; but its head was joined to the pudgy body by a neck as\nslender as a wasp’s waist. This gave the Lion a hint of the best way to\nattack the creature, and as he knew it was easier to fight it asleep\nthan awake, he gave a great spring and landed directly upon the\nmonster’s back. Then, with one blow of his heavy paw, all armed with\nsharp claws, he knocked the spider’s head from its body. Jumping down,\nhe watched it until the long legs stopped wiggling, when he knew it was\nquite dead.\n\nThe Lion went back to the opening where the beasts of the forest were\nwaiting for him and said proudly:\n\n“You need fear your enemy no longer.”\n\nThen the beasts bowed down to the Lion as their King, and he promised\nto come back and rule over them as soon as Dorothy was safely on her\nway to Kansas.\n\n\n\n\n\n\nThe four travelers passed through the rest of the forest in safety, and\nwhen they came out from its gloom saw before them a steep hill, covered\nfrom top to bottom with great pieces of rock.\n\n“That will be a hard climb,” said the Scarecrow, “but we must get over\nthe hill, nevertheless.”\n\nSo he led the way and the others followed. They had nearly reached the\nfirst rock when they heard a rough voice cry out, “Keep back!”\n\n“Who are you?” asked the Scarecrow.\n\nThen a head showed itself over the rock and the same voice said, “This\nhill belongs to us, and we don’t allow anyone to cross it.”\n\n“But we must cross it,” said the Scarecrow. “We’re going to the country\nof the Quadlings.”\n\n“But you shall not!” replied the voice, and there stepped from behind\nthe rock the strangest man the travelers had ever seen.\n\nHe was quite short and stout and had a big head, which was flat at the\ntop and supported by a thick neck full of wrinkles. But he had no arms\nat all, and, seeing this, the Scarecrow did not fear that so helpless a\ncreature could prevent them from climbing the hill. So he said, “I’m\nsorry not to do as you wish, but we must pass over your hill whether\nyou like it or not,” and he walked boldly forward.\n\nAs quick as lightning the man’s head shot forward and his neck\nstretched out until the top of the head, where it was flat, struck the\nScarecrow in the middle and sent him tumbling, over and over, down the\nhill. Almost as quickly as it came the head went back to the body, and\nthe man laughed harshly as he said, “It isn’t as easy as you think!”\n\nA chorus of boisterous laughter came from the other rocks, and Dorothy\nsaw hundreds of the armless Hammer-Heads upon the hillside, one behind\nevery rock.\n\nThe Lion became quite angry at the laughter caused by the Scarecrow’s\nmishap, and giving a loud roar that echoed like thunder, he dashed up\nthe hill.\n\nAgain a head shot swiftly out, and the great Lion went rolling down the\nhill as if he had been struck by a cannon ball.\n\nDorothy ran down and helped the Scarecrow to his feet, and the Lion\ncame up to her, feeling rather bruised and sore, and said, “It is\nuseless to fight people with shooting heads; no one can withstand\nthem.”\n\n“What can we do, then?” she asked.\n\n“Call the Winged Monkeys,” suggested the Tin Woodman. “You have still\nthe right to command them once more.”\n\n“Very well,” she answered, and putting on the Golden Cap she uttered\nthe magic words. The Monkeys were as prompt as ever, and in a few\nmoments the entire band stood before her.\n\n“What are your commands?” inquired the King of the Monkeys, bowing low.\n\n“Carry us over the hill to the country of the Quadlings,” answered the\ngirl.\n\n“It shall be done,” said the King, and at once the Winged Monkeys\ncaught the four travelers and Toto up in their arms and flew away with\nthem. As they passed over the hill the Hammer-Heads yelled with\nvexation, and shot their heads high in the air, but they could not\nreach the Winged Monkeys, which carried Dorothy and her comrades safely\nover the hill and set them down in the beautiful country of the\nQuadlings.\n\n“This is the last time you can summon us,” said the leader to Dorothy;\n“so good-bye and good luck to you.”\n\n“Good-bye, and thank you very much,” returned the girl; and the Monkeys\nrose into the air and were out of sight in a twinkling.\n\nThe country of the Quadlings seemed rich and happy. There was field\nupon field of ripening grain, with well-paved roads running between,\nand pretty rippling brooks with strong bridges across them. The fences\nand houses and bridges were all painted bright red, just as they had\nbeen painted yellow in the country of the Winkies and blue in the\ncountry of the Munchkins. The Quadlings themselves, who were short and\nfat and looked chubby and good-natured, were dressed all in red, which\nshowed bright against the green grass and the yellowing grain.\n\nThe Monkeys had set them down near a farmhouse, and the four travelers\nwalked up to it and knocked at the door. It was opened by the farmer’s\nwife, and when Dorothy asked for something to eat the woman gave them\nall a good dinner, with three kinds of cake and four kinds of cookies,\nand a bowl of milk for Toto.\n\n“How far is it to the Castle of Glinda?” asked the child.\n\n“It is not a great way,” answered the farmer’s wife. “Take the road to\nthe South and you will soon reach it.”\n\nThanking the good woman, they started afresh and walked by the fields\nand across the pretty bridges until they saw before them a very\nbeautiful Castle. Before the gates were three young girls, dressed in\nhandsome red uniforms trimmed with gold braid; and as Dorothy\napproached, one of them said to her:\n\n“Why have you come to the South Country?”\n\n“To see the Good Witch who rules here,” she answered. “Will you take me\nto her?”\n\n“Let me have your name, and I will ask Glinda if she will receive you.”\nThey told who they were, and the girl soldier went into the Castle.\nAfter a few moments she came back to say that Dorothy and the others\nwere to be admitted at once.\n\n\n\n\n\n\nBefore they went to see Glinda, however, they were taken to a room of\nthe Castle, where Dorothy washed her face and combed her hair, and the\nLion shook the dust out of his mane, and the Scarecrow patted himself\ninto his best shape, and the Woodman polished his tin and oiled his\njoints.\n\nWhen they were all quite presentable they followed the soldier girl\ninto a big room where the Witch Glinda sat upon a throne of rubies.\n\nShe was both beautiful and young to their eyes. Her hair was a rich red\nin color and fell in flowing ringlets over her shoulders. Her dress was\npure white but her eyes were blue, and they looked kindly upon the\nlittle girl.\n\n“What can I do for you, my child?” she asked.\n\nDorothy told the Witch all her story: how the cyclone had brought her\nto the Land of Oz, how she had found her companions, and of the\nwonderful adventures they had met with.\n\n“My greatest wish now,” she added, “is to get back to Kansas, for Aunt\nEm will surely think something dreadful has happened to me, and that\nwill make her put on mourning; and unless the crops are better this\nyear than they were last, I am sure Uncle Henry cannot afford it.”\n\nGlinda leaned forward and kissed the sweet, upturned face of the loving\nlittle girl.\n\n“Bless your dear heart,” she said, “I am sure I can tell you of a way\nto get back to Kansas.” Then she added, “But, if I do, you must give me\nthe Golden Cap.”\n\n“Willingly!” exclaimed Dorothy; “indeed, it is of no use to me now, and\nwhen you have it you can command the Winged Monkeys three times.”\n\n“And I think I shall need their service just those three times,”\nanswered Glinda, smiling.\n\nDorothy then gave her the Golden Cap, and the Witch said to the\nScarecrow, “What will you do when Dorothy has left us?”\n\n“I will return to the Emerald City,” he replied, “for Oz has made me\nits ruler and the people like me. The only thing that worries me is how\nto cross the hill of the Hammer-Heads.”\n\n“By means of the Golden Cap I shall command the Winged Monkeys to carry\nyou to the gates of the Emerald City,” said Glinda, “for it would be a\nshame to deprive the people of so wonderful a ruler.”\n\n“Am I really wonderful?” asked the Scarecrow.\n\n“You are unusual,” replied Glinda.\n\nTurning to the Tin Woodman, she asked, “What will become of you when\nDorothy leaves this country?”\n\nHe leaned on his axe and thought a moment. Then he said, “The Winkies\nwere very kind to me, and wanted me to rule over them after the Wicked\nWitch died. I am fond of the Winkies, and if I could get back again to\nthe Country of the West, I should like nothing better than to rule over\nthem forever.”\n\n“My second command to the Winged Monkeys,” said Glinda “will be that\nthey carry you safely to the land of the Winkies. Your brain may not be\nso large to look at as those of the Scarecrow, but you are really\nbrighter than he is—when you are well polished—and I am sure you will\nrule the Winkies wisely and well.”\n\nThen the Witch looked at the big, shaggy Lion and asked, “When Dorothy\nhas returned to her own home, what will become of you?”\n\n“Over the hill of the Hammer-Heads,” he answered, “lies a grand old\nforest, and all the beasts that live there have made me their King. If\nI could only get back to this forest, I would pass my life very happily\nthere.”\n\n“My third command to the Winged Monkeys,” said Glinda, “shall be to\ncarry you to your forest. Then, having used up the powers of the Golden\nCap, I shall give it to the King of the Monkeys, that he and his band\nmay thereafter be free for evermore.”\n\nThe Scarecrow and the Tin Woodman and the Lion now thanked the Good\nWitch earnestly for her kindness; and Dorothy exclaimed:\n\n“You are certainly as good as you are beautiful! But you have not yet\ntold me how to get back to Kansas.”\n\n“Your Silver Shoes will carry you over the desert,” replied Glinda. “If\nyou had known their power you could have gone back to your Aunt Em the\nvery first day you came to this country.”\n\n“But then I should not have had my wonderful brains!” cried the\nScarecrow. “I might have passed my whole life in the farmer’s\ncornfield.”\n\n“And I should not have had my lovely heart,” said the Tin Woodman. “I\nmight have stood and rusted in the forest till the end of the world.”\n\n“And I should have lived a coward forever,” declared the Lion, “and no\nbeast in all the forest would have had a good word to say to me.”\n\n“This is all true,” said Dorothy, “and I am glad I was of use to these\ngood friends. But now that each of them has had what he most desired,\nand each is happy in having a kingdom to rule besides, I think I should\nlike to go back to Kansas.”\n\n“The Silver Shoes,” said the Good Witch, “have wonderful powers. And\none of the most curious things about them is that they can carry you to\nany place in the world in three steps, and each step will be made in\nthe wink of an eye. All you have to do is to knock the heels together\nthree times and command the shoes to carry you wherever you wish to\ngo.”\n\n“If that is so,” said the child joyfully, “I will ask them to carry me\nback to Kansas at once.”\n\nShe threw her arms around the Lion’s neck and kissed him, patting his\nbig head tenderly. Then she kissed the Tin Woodman, who was weeping in\na way most dangerous to his joints. But she hugged the soft, stuffed\nbody of the Scarecrow in her arms instead of kissing his painted face,\nand found she was crying herself at this sorrowful parting from her\nloving comrades.\n\nGlinda the Good stepped down from her ruby throne to give the little\ngirl a good-bye kiss, and Dorothy thanked her for all the kindness she\nhad shown to her friends and herself.\n\nDorothy now took Toto up solemnly in her arms, and having said one last\ngood-bye she clapped the heels of her shoes together three times,\nsaying:\n\n“Take me home to Aunt Em!”\n\n\nInstantly she was whirling through the air, so swiftly that all she\ncould see or feel was the wind whistling past her ears.\n\nThe Silver Shoes took but three steps, and then she stopped so suddenly\nthat she rolled over upon the grass several times before she knew where\nshe was.\n\nAt length, however, she sat up and looked about her.\n\n“Good gracious!” she cried.\n\nFor she was sitting on the broad Kansas prairie, and just before her\nwas the new farmhouse Uncle Henry built after the cyclone had carried\naway the old one. Uncle Henry was milking the cows in the barnyard, and\nToto had jumped out of her arms and was running toward the barn,\nbarking furiously.\n\nDorothy stood up and found she was in her stocking-feet. For the Silver\nShoes had fallen off in her flight through the air, and were lost\nforever in the desert.\n\n\n\n\n\n\nAunt Em had just come out of the house to water the cabbages when she\nlooked up and saw Dorothy running toward her.\n\n“My darling child!” she cried, folding the little girl in her arms and\ncovering her face with kisses. “Where in the world did you come from?”\n\n“From the Land of Oz,” said Dorothy gravely. “And here is Toto, too.\nAnd oh, Aunt Em! I’m so glad to be at home again!”\n';
var $author$project$HangmanModels$initRecord = {guessedChars: $elm$core$Set$empty, hangmanPhrase: ' ', inputField: '', selectedSourceText: $author$project$HangmanSourceTexts$sourceText, selectedWordCount: 1};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$HangmanModels$init = function (_v0) {
	return _Utils_Tuple2($author$project$HangmanModels$initRecord, $elm$core$Platform$Cmd$none);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_v0, styles) {
		var newStyles = _v0.b;
		var classname = _v0.c;
		return $elm$core$List$isEmpty(newStyles) ? styles : A3($elm$core$Dict$insert, classname, newStyles, styles);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = function (_v0) {
	var val = _v0.a;
	return val;
};
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_v6, _v7) {
		var key = _v6.a;
		var html = _v6.b;
		var pairs = _v7.a;
		var styles = _v7.b;
		switch (html.$) {
			case 'Unstyled':
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v9 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v9.a;
				var finalStyles = _v9.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v10 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v10.a;
				var finalStyles = _v10.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v11 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v11.a;
				var finalStyles = _v11.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v12 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v12.a;
				var finalStyles = _v12.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _v0) {
		var nodes = _v0.a;
		var styles = _v0.b;
		switch (html.$) {
			case 'Unstyled':
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v2 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v2.a;
				var finalStyles = _v2.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v3 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v3.a;
				var finalStyles = _v3.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v4 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v4.a;
				var finalStyles = _v4.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v5 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v5.a;
				var finalStyles = _v5.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp = F2(
	function (candidate, properties) {
		stylesFromPropertiesHelp:
		while (true) {
			if (!properties.b) {
				return candidate;
			} else {
				var _v1 = properties.a;
				var styles = _v1.b;
				var classname = _v1.c;
				var rest = properties.b;
				if ($elm$core$String$isEmpty(classname)) {
					var $temp$candidate = candidate,
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				} else {
					var $temp$candidate = $elm$core$Maybe$Just(
						_Utils_Tuple2(classname, styles)),
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties = function (properties) {
	var _v0 = A2($rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp, $elm$core$Maybe$Nothing, properties);
	if (_v0.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var _v1 = _v0.a;
		var classname = _v1.a;
		var styles = _v1.b;
		return A2($elm$core$Dict$singleton, classname, styles);
	}
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _v0) {
		var keyframesByName = _v0.a;
		var declarations = _v0.b;
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var _v2 = declaration.a;
				var properties = _v2.c;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'MediaRule':
				var styleBlocks = declaration.b;
				return A2(
					$elm$core$List$all,
					function (_v3) {
						var properties = _v3.c;
						return $elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'SupportsRule':
				var otherDeclarations = declaration.b;
				return $elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'DocumentRule':
				return _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'PageRule':
				var properties = declaration.b;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'FontFace':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'Keyframes':
				var record = declaration.a;
				return $elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3($elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
					declarations);
			case 'Viewport':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'CounterStyle':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					$elm$core$List$all,
					function (_v4) {
						var properties = _v4.b;
						return $elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
		}
	});
var $rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 'Keyframes', a: a};
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var decl = _v0.b;
					return $rtfeldman$elm_css$Css$Structure$Keyframes(
						{declaration: decl, name: name});
				},
				$elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var $rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	var _v1 = A3(
		$elm$core$List$foldr,
		$rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _v1.a;
	var compactedDeclarations = _v1.b;
	var finalDeclarations = A2($rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
	return {charset: charset, declarations: finalDeclarations, imports: imports, namespaces: namespaces};
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				$elm$core$String$join,
				' and ',
				A2(
					$elm$core$List$cons,
					$rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A2(
				$elm$core$String$join,
				' and ',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions));
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + ($rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var $rtfeldman$elm_css$Css$Structure$Output$importToString = function (_v0) {
	var name = _v0.a;
	var mediaQueries = _v0.b;
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
			mediaQueries));
};
var $rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_v0) {
	var prefix = _v0.a;
	var str = _v0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var $rtfeldman$elm_css$Css$Structure$Output$spaceIndent = '    ';
var $rtfeldman$elm_css$Css$Structure$Output$indent = function (str) {
	return _Utils_ap($rtfeldman$elm_css$Css$Structure$Output$spaceIndent, str);
};
var $rtfeldman$elm_css$Css$Structure$Output$noIndent = '';
var $rtfeldman$elm_css$Css$Structure$Output$emitProperty = function (str) {
	return str + ';';
};
var $rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			A2($elm$core$Basics$composeL, $rtfeldman$elm_css$Css$Structure$Output$indent, $rtfeldman$elm_css$Css$Structure$Output$emitProperty),
			properties));
};
var $elm$core$String$append = _String_append;
var $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0.a;
	return '::' + str;
};
var $rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 'PseudoClassSelector':
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$cons,
					str,
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return $elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A2(
				$elm$core$String$join,
				'',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors));
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$cons,
					str,
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_v0) {
	var combinator = _v0.a;
	var sequence = _v0.b;
	return A2(
		$elm$core$String$join,
		' ',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator),
				$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence)
			]));
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_v0) {
	var simpleSelectorSequence = _v0.a;
	var chain = _v0.b;
	var pseudoElement = _v0.c;
	var segments = A2(
		$elm$core$List$cons,
		$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			[
				A2(
				$elm$core$Maybe$withDefault,
				'',
				A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement))
			]));
	return A2(
		$elm$core$String$append,
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$filter,
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
				segments)),
		pseudoElementsString);
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = F2(
	function (indentLevel, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		var selectorStr = A2(
			$elm$core$String$join,
			', ',
			A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Structure$Output$selectorToString,
				A2($elm$core$List$cons, firstSelector, otherSelectors)));
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					selectorStr,
					' {\n',
					indentLevel,
					$rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties),
					'\n',
					indentLevel,
					'}'
				]));
	});
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = decl.a;
			return A2($rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, $rtfeldman$elm_css$Css$Structure$Output$noIndent, styleBlock);
		case 'MediaRule':
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A2(
				$elm$core$String$join,
				',\n',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, mediaQueries));
			var blocks = A2(
				$elm$core$String$join,
				'\n\n',
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeL,
						$rtfeldman$elm_css$Css$Structure$Output$indent,
						$rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock($rtfeldman$elm_css$Css$Structure$Output$spaceIndent)),
					styleBlocks));
			return '@media ' + (query + (' {\n' + (blocks + '\n}')));
		case 'SupportsRule':
			return 'TODO';
		case 'DocumentRule':
			return 'TODO';
		case 'PageRule':
			return 'TODO';
		case 'FontFace':
			return 'TODO';
		case 'Keyframes':
			var name = decl.a.name;
			var declaration = decl.a.declaration;
			return '@keyframes ' + (name + (' {\n' + (declaration + '\n}')));
		case 'Viewport':
			return 'TODO';
		case 'CounterStyle':
			return 'TODO';
		default:
			return 'TODO';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset),
					A2(
					$elm$core$String$join,
					'\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$importToString, imports)),
					A2(
					$elm$core$String$join,
					'\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$namespaceToString, namespaces)),
					A2(
					$elm$core$String$join,
					'\n\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, declarations))
				])));
};
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 'CounterStyle', a: a};
};
var $rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var $rtfeldman$elm_css$Css$Structure$PageRule = F2(
	function (a, b) {
		return {$: 'PageRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var $rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		return A3(
			$rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var $rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2($rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _v1 = declarations.a;
						var mediaQueries = _v1.a;
						var styleBlocks = _v1.b;
						return _List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									$rtfeldman$elm_css$Css$Structure$mapLast,
									$rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					$rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2($elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var $rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _v0) {
		var sequence = _v0.a;
		var selectors = _v0.b;
		return A3(
			$rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			$elm$core$Maybe$Just(pseudo));
	});
var $rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var $rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _v1 = list.a;
				var combinator = _v1.a;
				var sequence = _v1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _v1 = declarations.a.a;
				var firstSelector = _v1.a;
				var otherSelectors = _v1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2($elm$core$List$cons, firstSelector, otherSelectors),
					$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var $rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_v0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _v1 = declarations.a;
									var mediaQueries = _v1.a;
									var _v2 = _v1.b;
									var styleBlock = _v2.a;
									return _List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _v3 = declarations.a;
									var mediaQueries = _v3.a;
									var _v4 = _v3.b;
									var first = _v4.a;
									var rest = _v4.b;
									var _v5 = A2(
										$rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_v5.b && (_v5.a.$ === 'MediaRule')) && (!_v5.b.b)) {
										var _v6 = _v5.a;
										var newMediaQueries = _v6.a;
										var newStyleBlocks = _v6.b;
										return _List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2($elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _v5;
										return newDeclarations;
									}
								}
							} else {
								break _v0$12;
							}
						case 'SupportsRule':
							var _v7 = declarations.a;
							var str = _v7.a;
							var nestedDeclarations = _v7.b;
							return _List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _v8 = declarations.a;
							var str1 = _v8.a;
							var str2 = _v8.b;
							var str3 = _v8.c;
							var str4 = _v8.d;
							var styleBlock = _v8.e;
							return A2(
								$elm$core$List$map,
								A4($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							var _v9 = declarations.a;
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _v0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			$elm$core$List$cons,
			first,
			A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var $elm$core$String$cons = _String_cons;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
	});
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$c1 = 3432918353;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$c2 = 461845907;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Bitwise$or = _Bitwise_or;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$finalize = function (data) {
	var acc = (!(!data.hash)) ? (data.seed ^ A2(
		$rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy,
		$rtfeldman$elm_css$ElmCssVendor$Murmur3$c2,
		A2(
			$rtfeldman$elm_css$ElmCssVendor$Murmur3$rotlBy,
			15,
			A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy, $rtfeldman$elm_css$ElmCssVendor$Murmur3$c1, data.hash)))) : data.seed;
	var h0 = acc ^ data.charsProcessed;
	var h1 = A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var $elm$core$String$foldl = _String_foldl;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			$rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy,
			5,
			A2(
				$rtfeldman$elm_css$ElmCssVendor$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					$rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy,
					$rtfeldman$elm_css$ElmCssVendor$Murmur3$c2,
					A2(
						$rtfeldman$elm_css$ElmCssVendor$Murmur3$rotlBy,
						15,
						A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy, $rtfeldman$elm_css$ElmCssVendor$Murmur3$c1, k1))))) + 3864292196;
	});
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.hash | ((255 & $elm$core$Char$toCode(c)) << data.shift);
		var _v0 = data.shift;
		if (_v0 === 24) {
			return {
				charsProcessed: data.charsProcessed + 1,
				hash: 0,
				seed: A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$mix, data.seed, res),
				shift: 0
			};
		} else {
			return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
		}
	});
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$hashString = F2(
	function (seed, str) {
		return $rtfeldman$elm_css$ElmCssVendor$Murmur3$finalize(
			A3(
				$elm$core$String$foldl,
				$rtfeldman$elm_css$ElmCssVendor$Murmur3$hashFold,
				A4($rtfeldman$elm_css$ElmCssVendor$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var $rtfeldman$elm_css$Hash$murmurSeed = 15739;
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			_Utils_chr('-'),
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$hashString, $rtfeldman$elm_css$Hash$murmurSeed, str)));
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return $elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return $elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				$elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var $rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var styleBlock = declaration.a;
			return A2(
				$rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0.a;
	return declarations;
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(decls));
		};
		var nextResult = A2(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _v14 = _Utils_Tuple2(
				$elm$core$List$head(nextResult),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((_v14.a.$ === 'Just') && (_v14.b.$ === 'Just')) {
				var nextResultParent = _v14.a.a;
				var originalParent = _v14.b.a;
				return _Utils_ap(
					A2(
						$elm$core$List$take,
						$elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return $elm$core$List$concat(
				A2(
					$rtfeldman$elm_css$Css$Structure$mapLast,
					$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						$elm$core$List$map,
						$elm$core$List$singleton,
						A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				insertStylesToNestedDecl,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 'ExtendSelector':
					var _v4 = styles.a;
					var selector = _v4.a;
					var nestedStyles = _v4.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _v5 = styles.a;
					var selectorCombinator = _v5.a;
					var snippets = _v5.b;
					var rest = styles.b;
					var chain = F2(
						function (_v9, _v10) {
							var originalSequence = _v9.a;
							var originalTuples = _v9.b;
							var originalPseudoElement = _v9.c;
							var newSequence = _v10.a;
							var newTuples = _v10.b;
							var newPseudoElement = _v10.c;
							return A3(
								$rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								$rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _v7 = declaration.a;
								var firstSelector = _v7.a;
								var otherSelectors = _v7.b;
								var nestedStyles = _v7.c;
								var newSelectors = A2(
									$elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											$elm$core$List$map,
											chain(originalSelector),
											A2($elm$core$List$cons, firstSelector, otherSelectors));
									},
									$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									$elm$core$List$map,
									A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 'PageRule':
								var str = declaration.a;
								var properties = declaration.b;
								return _List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
									]);
							case 'FontFace':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 'Viewport':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 'CounterStyle':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return $elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								$elm$core$List$map,
								expandDeclaration,
								A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 'WithPseudoElement':
					var _v11 = styles.a;
					var pseudoElement = _v11.a;
					var nestedStyles = _v11.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithKeyframes':
					var str = styles.a.a;
					var rest = styles.b;
					var name = $rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = 'animation-name:' + name;
					var newDeclarations = A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						$elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$Keyframes(
								{declaration: str, name: name})
							]));
				case 'WithMedia':
					var _v12 = styles.a;
					var mediaQueries = _v12.a;
					var nestedStyles = _v12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _v13 = $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_v13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _v13.a;
							var otherSelectors = _v13.b;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									$elm$core$List$singleton(
										$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_v2) {
	var firstSelector = _v2.a;
	var otherSelectors = _v2.b;
	var styles = _v2.c;
	return A2(
		$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			$rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2($elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				$elm$core$List$map,
				A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 'PageRule':
			var str = snippetDeclaration.a;
			var properties = snippetDeclaration.b;
			return _List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
				]);
		case 'FontFace':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 'Viewport':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 'CounterStyle':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var snippets = _v0.snippets;
	var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp = function (sheet) {
	return $rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		$rtfeldman$elm_css$Css$Structure$compactStylesheet(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (styles) {
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp, styles));
};
var $rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return $rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
				]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair = function (_v0) {
	var classname = _v0.a;
	var styles = _v0.b;
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
		styles,
		$rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$ClassSelector(classname)
				])));
};
var $rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: $elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return $rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
		$elm$core$List$singleton(
			$rtfeldman$elm_css$Css$Preprocess$stylesheet(
				A2(
					$elm$core$List$map,
					$rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair,
					$elm$core$Dict$toList(dict)))));
};
var $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = function (styles) {
	return A3(
		$elm$virtual_dom$VirtualDom$node,
		'style',
		_List_Nil,
		$elm$core$List$singleton(
			$elm$virtual_dom$VirtualDom$text(
				$rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(styles))));
};
var $rtfeldman$elm_css$VirtualDom$Styled$unstyle = F3(
	function (elemType, properties, children) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _v1 = pairs.a;
				var str = _v1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _v1 = pairs.a;
				var firstKey = _v1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2($rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F2(
	function (allStyles, keyedChildNodes) {
		var styleNodeKey = A2($rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(allStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F3(
	function (elemType, properties, keyedChildren) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A3(
			$elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F4(
	function (ns, elemType, properties, keyedChildren) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A4(
			$elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F4(
	function (ns, elemType, properties, children) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 'Unstyled':
			var plainNode = vdom.a;
			return plainNode;
		case 'Node':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3($rtfeldman$elm_css$VirtualDom$Styled$unstyle, elemType, properties, children);
		case 'NodeNS':
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, ns, elemType, properties, children);
		case 'KeyedNode':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, ns, elemType, properties, children);
	}
};
var $rtfeldman$elm_css$Html$Styled$toUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $author$project$HangmanModels$alterCharacterSet = F2(
	function (model, _char) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					guessedChars: A2($elm$core$Set$insert, _char, model.guessedChars)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$HangmanModels$alterInputField = F2(
	function (model, inputText) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{inputField: inputText}),
			$elm$core$Platform$Cmd$none);
	});
var $elm$core$String$filter = _String_filter;
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$String$words = _String_words;
var $author$project$HangmanHelpers$alphabeticWordsFromText = function (text) {
	return $elm$core$Array$fromList(
		A2(
			$elm$core$List$map,
			$elm$core$String$filter($elm$core$Char$isAlpha),
			$elm$core$String$words(text)));
};
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$HangmanHelpers$getRandomPhrase3 = F2(
	function (rndIndex, text) {
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					function () {
					var _v0 = A2(
						$elm$core$Array$get,
						rndIndex,
						$author$project$HangmanHelpers$alphabeticWordsFromText(text));
					if (_v0.$ === 'Nothing') {
						return 'default';
					} else {
						var string = _v0.a;
						return string;
					}
				}(),
					function () {
					var _v1 = A2(
						$elm$core$Array$get,
						rndIndex + 1,
						$author$project$HangmanHelpers$alphabeticWordsFromText(text));
					if (_v1.$ === 'Nothing') {
						return 'default';
					} else {
						var string = _v1.a;
						return string;
					}
				}(),
					function () {
					var _v2 = A2(
						$elm$core$Array$get,
						rndIndex + 2,
						$author$project$HangmanHelpers$alphabeticWordsFromText(text));
					if (_v2.$ === 'Nothing') {
						return 'default';
					} else {
						var string = _v2.a;
						return string;
					}
				}()
				]));
	});
var $author$project$HangmanHelpers$getRandomPhrase5 = F2(
	function (rndIndex, text) {
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					function () {
					var _v0 = A2(
						$elm$core$Array$get,
						rndIndex,
						$author$project$HangmanHelpers$alphabeticWordsFromText(text));
					if (_v0.$ === 'Nothing') {
						return 'default';
					} else {
						var string = _v0.a;
						return string;
					}
				}(),
					function () {
					var _v1 = A2(
						$elm$core$Array$get,
						rndIndex + 1,
						$author$project$HangmanHelpers$alphabeticWordsFromText(text));
					if (_v1.$ === 'Nothing') {
						return 'default';
					} else {
						var string = _v1.a;
						return string;
					}
				}(),
					function () {
					var _v2 = A2(
						$elm$core$Array$get,
						rndIndex + 2,
						$author$project$HangmanHelpers$alphabeticWordsFromText(text));
					if (_v2.$ === 'Nothing') {
						return 'default';
					} else {
						var string = _v2.a;
						return string;
					}
				}(),
					function () {
					var _v3 = A2(
						$elm$core$Array$get,
						rndIndex + 3,
						$author$project$HangmanHelpers$alphabeticWordsFromText(text));
					if (_v3.$ === 'Nothing') {
						return 'default';
					} else {
						var string = _v3.a;
						return string;
					}
				}(),
					function () {
					var _v4 = A2(
						$elm$core$Array$get,
						rndIndex + 4,
						$author$project$HangmanHelpers$alphabeticWordsFromText(text));
					if (_v4.$ === 'Nothing') {
						return 'default';
					} else {
						var string = _v4.a;
						return string;
					}
				}()
				]));
	});
var $author$project$HangmanHelpers$getRandomWord = F2(
	function (rndIndex, text) {
		var _v0 = A2(
			$elm$core$Array$get,
			rndIndex,
			$author$project$HangmanHelpers$alphabeticWordsFromText(text));
		if (_v0.$ === 'Nothing') {
			return 'default';
		} else {
			var string = _v0.a;
			return string;
		}
	});
var $author$project$HangmanHelpers$getRandomPhrase = F3(
	function (rndIndex, count, text) {
		return (count === 1) ? A2($author$project$HangmanHelpers$getRandomWord, rndIndex, text) : ((count === 3) ? A2($author$project$HangmanHelpers$getRandomPhrase3, rndIndex, text) : ((count === 5) ? A2($author$project$HangmanHelpers$getRandomPhrase5, rndIndex, text) : A2($author$project$HangmanHelpers$getRandomWord, rndIndex, text)));
	});
var $author$project$HangmanModels$initWithHangmanPhrase = function (phrase) {
	return (phrase === '') ? $author$project$HangmanModels$init(_Utils_Tuple0) : _Utils_Tuple2(
		_Utils_update(
			$author$project$HangmanModels$initRecord,
			{hangmanPhrase: phrase}),
		$elm$core$Platform$Cmd$none);
};
var $author$project$HangmanTypes$NewRandomTextIndex = function (a) {
	return {$: 'NewRandomTextIndex', a: a};
};
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $author$project$HangmanHelpers$randomTextIndex = function (text) {
	return A2(
		$elm$random$Random$generate,
		$author$project$HangmanTypes$NewRandomTextIndex,
		A2(
			$elm$random$Random$int,
			0,
			$elm$core$Array$length(
				$author$project$HangmanHelpers$alphabeticWordsFromText(text))));
};
var $author$project$HangmanModels$querryRandomTextIndex = F3(
	function (model, text, count) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{selectedSourceText: text, selectedWordCount: count}),
			$author$project$HangmanHelpers$randomTextIndex(text));
	});
var $author$project$HangmanSourceTexts$alphabet = A2($elm$core$String$split, '', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $elm$core$String$toLower = _String_toLower;
var $author$project$HangmanModels$revealPhrase = function (model) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				guessedChars: $elm$core$Set$fromList(
					A2($elm$core$List$map, $elm$core$String$toLower, $author$project$HangmanSourceTexts$alphabet))
			}),
		$elm$core$Platform$Cmd$none);
};
var $author$project$Hangman$update = F2(
	function (message, model) {
		switch (message.$) {
			case 'SaveInputSoFar':
				var inputText = message.a;
				return A2($author$project$HangmanModels$alterInputField, model, inputText);
			case 'SaveHangmanPhrase':
				return $author$project$HangmanModels$initWithHangmanPhrase(model.inputField);
			case 'GuessButton':
				var _char = message.a;
				return A2($author$project$HangmanModels$alterCharacterSet, model, _char);
			case 'GenerateRandomTextIndex':
				var text = message.a;
				var count = message.b;
				return A3($author$project$HangmanModels$querryRandomTextIndex, model, text, count);
			case 'NewRandomTextIndex':
				var index = message.a;
				return $author$project$HangmanModels$initWithHangmanPhrase(
					A3($author$project$HangmanHelpers$getRandomPhrase, index, model.selectedWordCount, model.selectedSourceText));
			case 'RevealPhrase':
				return $author$project$HangmanModels$revealPhrase(model);
			default:
				return $author$project$HangmanModels$init(_Utils_Tuple0);
		}
	});
var $author$project$HangmanTypes$SaveHangmanPhrase = {$: 'SaveHangmanPhrase'};
var $rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 'ApplyStyles', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var $rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 'AppendProperty':
					var str = style.a;
					var key = A2(
						$elm$core$Maybe$withDefault,
						'',
						$elm$core$List$head(
							A2($elm$core$String$split, ':', str)));
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 'ExtendSelector':
					var selector = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 'NestSnippet':
					var combinator = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 'WithPseudoElement':
					var pseudoElement = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 'WithMedia':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 'WithKeyframes':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _v1 = style.a;
							var only = _v1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _v2 = style.a;
							var first = _v2.a;
							var rest = _v2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var $rtfeldman$elm_css$Css$Internal$IncompatibleUnits = {$: 'IncompatibleUnits'};
var $rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
var $elm$core$String$fromFloat = _String_fromNumber;
var $rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: $rtfeldman$elm_css$Css$Structure$Compatible,
			calc: $rtfeldman$elm_css$Css$Structure$Compatible,
			flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible,
			fontSize: $rtfeldman$elm_css$Css$Structure$Compatible,
			length: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: $rtfeldman$elm_css$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$Internal$IncompatibleUnits, '', 0);
var $rtfeldman$elm_css$Css$alignItems = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignItems',
		'align-items',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2($rtfeldman$elm_css$Css$property, key, arg.value);
	});
var $rtfeldman$elm_css$Css$center = $rtfeldman$elm_css$Css$prop1('center');
var $author$project$HangmanTypes$GuessButton = function (a) {
	return {$: 'GuessButton', a: a};
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 'Attribute', a: a, b: b, c: c};
	});
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$on, eventName, handler),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'background-color', c.value);
};
var $rtfeldman$elm_css$Css$border = $rtfeldman$elm_css$Css$prop1('border');
var $rtfeldman$elm_css$Css$borderRadius = $rtfeldman$elm_css$Css$prop1('border-radius');
var $rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$Node;
var $rtfeldman$elm_css$Html$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$node;
var $rtfeldman$elm_css$Html$Styled$button = $rtfeldman$elm_css$Html$Styled$node('button');
var $rtfeldman$elm_css$Css$color = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'color', c.value);
};
var $author$project$HangmanColors$correctColor = '#395c35';
var $rtfeldman$elm_css$Css$fontSize = $rtfeldman$elm_css$Css$prop1('font-size');
var $rtfeldman$elm_css$Css$withPrecedingHash = function (str) {
	return A2($elm$core$String$startsWith, '#', str) ? str : A2(
		$elm$core$String$cons,
		_Utils_chr('#'),
		str);
};
var $rtfeldman$elm_css$Css$erroneousHex = function (str) {
	return {
		alpha: 1,
		blue: 0,
		color: $rtfeldman$elm_css$Css$Structure$Compatible,
		green: 0,
		red: 0,
		value: $rtfeldman$elm_css$Css$withPrecedingHash(str)
	};
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Basics$pow = _Basics_pow;
var $rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return $elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2($elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return $elm$core$Result$Err(
							$elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $rtfeldman$elm_hex$Hex$fromString = function (str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2($elm$core$String$startsWith, '-', str)) {
				var list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(
						$elm$core$String$toList(str)));
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$negate,
					A3(
						$rtfeldman$elm_hex$Hex$fromStringHelp,
						$elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					$rtfeldman$elm_hex$Hex$fromStringHelp,
					$elm$core$String$length(str) - 1,
					$elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2($elm$core$Result$mapError, formatError, result);
	}
};
var $rtfeldman$elm_css$Css$validHex = F5(
	function (str, _v0, _v1, _v2, _v3) {
		var r1 = _v0.a;
		var r2 = _v0.b;
		var g1 = _v1.a;
		var g2 = _v1.b;
		var b1 = _v2.a;
		var b2 = _v2.b;
		var a1 = _v3.a;
		var a2 = _v3.b;
		var toResult = A2(
			$elm$core$Basics$composeR,
			$elm$core$String$fromList,
			A2($elm$core$Basics$composeR, $elm$core$String$toLower, $rtfeldman$elm_hex$Hex$fromString));
		var results = _Utils_Tuple2(
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[r1, r2])),
				toResult(
					_List_fromArray(
						[g1, g2]))),
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[b1, b2])),
				toResult(
					_List_fromArray(
						[a1, a2]))));
		if ((((results.a.a.$ === 'Ok') && (results.a.b.$ === 'Ok')) && (results.b.a.$ === 'Ok')) && (results.b.b.$ === 'Ok')) {
			var _v5 = results.a;
			var red = _v5.a.a;
			var green = _v5.b.a;
			var _v6 = results.b;
			var blue = _v6.a.a;
			var alpha = _v6.b.a;
			return {
				alpha: alpha / 255,
				blue: blue,
				color: $rtfeldman$elm_css$Css$Structure$Compatible,
				green: green,
				red: red,
				value: $rtfeldman$elm_css$Css$withPrecedingHash(str)
			};
		} else {
			return $rtfeldman$elm_css$Css$erroneousHex(str);
		}
	});
var $rtfeldman$elm_css$Css$hex = function (str) {
	var withoutHash = A2($elm$core$String$startsWith, '#', str) ? A2($elm$core$String$dropLeft, 1, str) : str;
	var _v0 = $elm$core$String$toList(withoutHash);
	_v0$4:
	while (true) {
		if ((_v0.b && _v0.b.b) && _v0.b.b.b) {
			if (!_v0.b.b.b.b) {
				var r = _v0.a;
				var _v1 = _v0.b;
				var g = _v1.a;
				var _v2 = _v1.b;
				var b = _v2.a;
				return A5(
					$rtfeldman$elm_css$Css$validHex,
					str,
					_Utils_Tuple2(r, r),
					_Utils_Tuple2(g, g),
					_Utils_Tuple2(b, b),
					_Utils_Tuple2(
						_Utils_chr('f'),
						_Utils_chr('f')));
			} else {
				if (!_v0.b.b.b.b.b) {
					var r = _v0.a;
					var _v3 = _v0.b;
					var g = _v3.a;
					var _v4 = _v3.b;
					var b = _v4.a;
					var _v5 = _v4.b;
					var a = _v5.a;
					return A5(
						$rtfeldman$elm_css$Css$validHex,
						str,
						_Utils_Tuple2(r, r),
						_Utils_Tuple2(g, g),
						_Utils_Tuple2(b, b),
						_Utils_Tuple2(a, a));
				} else {
					if (_v0.b.b.b.b.b.b) {
						if (!_v0.b.b.b.b.b.b.b) {
							var r1 = _v0.a;
							var _v6 = _v0.b;
							var r2 = _v6.a;
							var _v7 = _v6.b;
							var g1 = _v7.a;
							var _v8 = _v7.b;
							var g2 = _v8.a;
							var _v9 = _v8.b;
							var b1 = _v9.a;
							var _v10 = _v9.b;
							var b2 = _v10.a;
							return A5(
								$rtfeldman$elm_css$Css$validHex,
								str,
								_Utils_Tuple2(r1, r2),
								_Utils_Tuple2(g1, g2),
								_Utils_Tuple2(b1, b2),
								_Utils_Tuple2(
									_Utils_chr('f'),
									_Utils_chr('f')));
						} else {
							if (_v0.b.b.b.b.b.b.b.b && (!_v0.b.b.b.b.b.b.b.b.b)) {
								var r1 = _v0.a;
								var _v11 = _v0.b;
								var r2 = _v11.a;
								var _v12 = _v11.b;
								var g1 = _v12.a;
								var _v13 = _v12.b;
								var g2 = _v13.a;
								var _v14 = _v13.b;
								var b1 = _v14.a;
								var _v15 = _v14.b;
								var b2 = _v15.a;
								var _v16 = _v15.b;
								var a1 = _v16.a;
								var _v17 = _v16.b;
								var a2 = _v17.a;
								return A5(
									$rtfeldman$elm_css$Css$validHex,
									str,
									_Utils_Tuple2(r1, r2),
									_Utils_Tuple2(g1, g2),
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(a1, a2));
							} else {
								break _v0$4;
							}
						}
					} else {
						break _v0$4;
					}
				}
			}
		} else {
			break _v0$4;
		}
	}
	return $rtfeldman$elm_css$Css$erroneousHex(str);
};
var $rtfeldman$elm_css$Css$marginBottom = $rtfeldman$elm_css$Css$prop1('margin-bottom');
var $rtfeldman$elm_css$Css$marginLeft = $rtfeldman$elm_css$Css$prop1('margin-left');
var $rtfeldman$elm_css$Css$marginRight = $rtfeldman$elm_css$Css$prop1('margin-right');
var $rtfeldman$elm_css$Css$marginTop = $rtfeldman$elm_css$Css$prop1('margin-top');
var $rtfeldman$elm_css$Css$prop4 = F5(
	function (key, argA, argB, argC, argD) {
		return A2(
			$rtfeldman$elm_css$Css$property,
			key,
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value, argC.value, argD.value])));
	});
var $rtfeldman$elm_css$Css$padding4 = $rtfeldman$elm_css$Css$prop4('padding');
var $rtfeldman$elm_css$Css$PercentageUnits = {$: 'PercentageUnits'};
var $rtfeldman$elm_css$Css$pct = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PercentageUnits, '%');
var $rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
var $rtfeldman$elm_css$Css$px = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PxUnits, 'px');
var $rtfeldman$elm_css$VirtualDom$Styled$murmurSeed = 15739;
var $rtfeldman$elm_css$VirtualDom$Styled$getClassname = function (styles) {
	return $elm$core$List$isEmpty(styles) ? 'unstyled' : A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2(
				$rtfeldman$elm_css$ElmCssVendor$Murmur3$hashString,
				$rtfeldman$elm_css$VirtualDom$Styled$murmurSeed,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
					$elm$core$List$singleton(
						$rtfeldman$elm_css$Css$Preprocess$stylesheet(
							$elm$core$List$singleton(
								A2(
									$rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
									styles,
									$rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(_List_Nil)))))))));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var classname = $rtfeldman$elm_css$VirtualDom$Styled$getClassname(styles);
	var classProperty = A2(
		$elm$virtual_dom$VirtualDom$property,
		'className',
		$elm$json$Json$Encode$string(classname));
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, styles, classname);
};
var $rtfeldman$elm_css$Html$Styled$styled = F4(
	function (fn, styles, attrs, children) {
		return A2(
			fn,
			A2(
				$elm$core$List$cons,
				$rtfeldman$elm_css$Html$Styled$Internal$css(styles),
				attrs),
			children);
	});
var $author$project$HangmanColors$textColor = '#d7d8da';
var $rtfeldman$elm_css$Css$width = $rtfeldman$elm_css$Css$prop1('width');
var $author$project$HangmanStyles$styledButtonGuessedCorrect = A2(
	$rtfeldman$elm_css$Html$Styled$styled,
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(8)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$correctColor)),
			$rtfeldman$elm_css$Css$color(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
			A4(
			$rtfeldman$elm_css$Css$padding4,
			$rtfeldman$elm_css$Css$pct(1),
			$rtfeldman$elm_css$Css$px(0),
			$rtfeldman$elm_css$Css$pct(1),
			$rtfeldman$elm_css$Css$px(0)),
			$rtfeldman$elm_css$Css$marginTop(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$marginBottom(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$marginLeft(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$marginRight(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$border(
			$rtfeldman$elm_css$Css$px(0)),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$px(20)),
			$rtfeldman$elm_css$Css$fontSize(
			$rtfeldman$elm_css$Css$px(24))
		]));
var $author$project$HangmanColors$wrongColor = '#b04f21';
var $author$project$HangmanStyles$styledButtonGuessedWrong = A2(
	$rtfeldman$elm_css$Html$Styled$styled,
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(8)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$wrongColor)),
			$rtfeldman$elm_css$Css$color(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
			A4(
			$rtfeldman$elm_css$Css$padding4,
			$rtfeldman$elm_css$Css$pct(1),
			$rtfeldman$elm_css$Css$px(0),
			$rtfeldman$elm_css$Css$pct(1),
			$rtfeldman$elm_css$Css$px(0)),
			$rtfeldman$elm_css$Css$marginTop(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$marginBottom(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$marginLeft(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$marginRight(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$border(
			$rtfeldman$elm_css$Css$px(0)),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$px(20)),
			$rtfeldman$elm_css$Css$fontSize(
			$rtfeldman$elm_css$Css$px(24))
		]));
var $author$project$HangmanColors$unGuessedColor = '#3b7277';
var $author$project$HangmanStyles$styledButtonUnguessed = A2(
	$rtfeldman$elm_css$Html$Styled$styled,
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(8)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$unGuessedColor)),
			$rtfeldman$elm_css$Css$color(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
			A4(
			$rtfeldman$elm_css$Css$padding4,
			$rtfeldman$elm_css$Css$pct(1),
			$rtfeldman$elm_css$Css$px(0),
			$rtfeldman$elm_css$Css$pct(1),
			$rtfeldman$elm_css$Css$px(0)),
			$rtfeldman$elm_css$Css$marginTop(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$marginBottom(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$marginLeft(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$marginRight(
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$border(
			$rtfeldman$elm_css$Css$px(0)),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$px(20)),
			$rtfeldman$elm_css$Css$fontSize(
			$rtfeldman$elm_css$Css$px(24))
		]));
var $rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		$elm$virtual_dom$VirtualDom$text(str));
};
var $rtfeldman$elm_css$Html$Styled$text = $rtfeldman$elm_css$VirtualDom$Styled$text;
var $rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$property, key, value),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$type_ = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('type');
var $author$project$HangmanHelpers$coloredCharacterButton = F2(
	function (model, _char) {
		return A2(
			$elm$core$Set$member,
			$elm$core$String$toLower(_char),
			model.guessedChars) ? (A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(_char),
			$elm$core$String$toLower(model.hangmanPhrase)) ? A2(
			$author$project$HangmanStyles$styledButtonGuessedCorrect,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					$author$project$HangmanTypes$GuessButton(
						$elm$core$String$toLower(_char)))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(_char)
				])) : A2(
			$author$project$HangmanStyles$styledButtonGuessedWrong,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					$author$project$HangmanTypes$GuessButton(
						$elm$core$String$toLower(_char)))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(_char)
				]))) : A2(
			$author$project$HangmanStyles$styledButtonUnguessed,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					$author$project$HangmanTypes$GuessButton(
						$elm$core$String$toLower(_char)))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(_char)
				]));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$css = $rtfeldman$elm_css$Html$Styled$Internal$css;
var $rtfeldman$elm_css$Html$Styled$div = $rtfeldman$elm_css$Html$Styled$node('div');
var $author$project$HangmanSourceTexts$firstKeyRow = A2($elm$core$String$split, '', 'QWERTYUIOP');
var $author$project$HangmanSourceTexts$secondKeyRow = A2($elm$core$String$split, '', 'ASDFGHJKL');
var $rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $author$project$HangmanSourceTexts$thirdKeyRow = A2($elm$core$String$split, '', 'ZXCVBNM');
var $author$project$HangmanViews$characterButtonsView = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
								$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center)
							]))
					]),
				A2(
					$elm$core$List$map,
					$author$project$HangmanHelpers$coloredCharacterButton(model),
					$author$project$HangmanSourceTexts$firstKeyRow)),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
								$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center)
							]))
					]),
				A2(
					$elm$core$List$map,
					$author$project$HangmanHelpers$coloredCharacterButton(model),
					$author$project$HangmanSourceTexts$secondKeyRow)),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
								$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center)
							]))
					]),
				A2(
					$elm$core$List$map,
					$author$project$HangmanHelpers$coloredCharacterButton(model),
					$author$project$HangmanSourceTexts$thirdKeyRow))
			]));
};
var $rtfeldman$elm_css$Css$fontFamily = $rtfeldman$elm_css$Css$prop1('font-family');
var $author$project$HangmanTypes$Reset = {$: 'Reset'};
var $author$project$HangmanTypes$RevealPhrase = {$: 'RevealPhrase'};
var $author$project$HangmanColors$buttonMainColor = '#3b7277';
var $rtfeldman$elm_css$Css$margin4 = $rtfeldman$elm_css$Css$prop4('margin');
var $author$project$HangmanStyles$styledButtonMain = A2(
	$rtfeldman$elm_css$Html$Styled$styled,
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(30)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$buttonMainColor)),
			$rtfeldman$elm_css$Css$color(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
			A4(
			$rtfeldman$elm_css$Css$padding4,
			$rtfeldman$elm_css$Css$pct(1),
			$rtfeldman$elm_css$Css$px(0),
			$rtfeldman$elm_css$Css$pct(1),
			$rtfeldman$elm_css$Css$px(0)),
			$rtfeldman$elm_css$Css$border(
			$rtfeldman$elm_css$Css$px(0)),
			A4(
			$rtfeldman$elm_css$Css$margin4,
			$rtfeldman$elm_css$Css$px(5),
			$rtfeldman$elm_css$Css$px(5),
			$rtfeldman$elm_css$Css$px(5),
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$px(20)),
			$rtfeldman$elm_css$Css$fontSize(
			$rtfeldman$elm_css$Css$px(24))
		]));
var $author$project$HangmanViews$gameButtonsView = A2(
	$rtfeldman$elm_css$Html$Styled$div,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
					$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
					A4(
					$rtfeldman$elm_css$Css$padding4,
					$rtfeldman$elm_css$Css$px(2),
					$rtfeldman$elm_css$Css$px(2),
					$rtfeldman$elm_css$Css$px(2),
					$rtfeldman$elm_css$Css$px(2))
				]))
		]),
	_List_fromArray(
		[
			A2(
			$author$project$HangmanStyles$styledButtonMain,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$HangmanTypes$Reset)
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Reset Game')
				])),
			A2(
			$author$project$HangmanStyles$styledButtonMain,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$HangmanTypes$SaveHangmanPhrase)
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Submit Phrase')
				])),
			A2(
			$author$project$HangmanStyles$styledButtonMain,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$HangmanTypes$RevealPhrase)
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Reveal Phrase')
				]))
		]));
var $author$project$HangmanSourceTexts$hangmanArtDead = '\n+---+---+\n\n|   ≣   |\n\n|   0   |\n\n|  /|\\  |\n\n|  / \\  |\n\n|       |\n\n=========\n';
var $rtfeldman$elm_css$Css$lineHeight = $rtfeldman$elm_css$Css$prop1('line-height');
var $rtfeldman$elm_css$Html$Styled$pre = $rtfeldman$elm_css$Html$Styled$node('pre');
var $author$project$HangmanViews$deadHangmanHtml = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Html$Styled$pre,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
						$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
						$rtfeldman$elm_css$Css$fontSize(
						$rtfeldman$elm_css$Css$px(32)),
						$rtfeldman$elm_css$Css$lineHeight(
						$rtfeldman$elm_css$Css$pct(50))
					]))
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text($author$project$HangmanSourceTexts$hangmanArtDead)
			])),
		A2(
		$rtfeldman$elm_css$Html$Styled$pre,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
						$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
						$rtfeldman$elm_css$Css$fontSize(
						$rtfeldman$elm_css$Css$px(32)),
						$rtfeldman$elm_css$Css$lineHeight(
						$rtfeldman$elm_css$Css$pct(50))
					]))
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text('You Lose!')
			]))
	]);
var $author$project$HangmanSourceTexts$hangmanArtAlive = $elm$core$Array$fromList(
	_List_fromArray(
		['\n+---+---+\n\n|   ≣   |\n\n|       |\n\n|       |\n\n|       |\n\n|       |\n\n=========', '\n+---+---+\n\n|   ≣   |\n\n|   0   |\n\n|       |\n\n|       |\n\n|       |\n\n=========', '\n+---+---+\n\n|   ≣   |\n\n|   0   |\n\n|   |   |\n\n|       |\n\n|       |\n\n=========', '\n+---+---+\n\n|   ≣   |\n\n|   0   |\n\n|  /|   |\n\n|       |\n\n|       |\n\n=========', '\n+---+---+\n\n|   ≣   |\n\n|   0   |\n\n|  /|\\  |\n\n|       |\n\n|       |\n\n=========', '\n+---+---+\n\n|   ≣   |\n\n|   0   |\n\n|  /|\\  |\n\n|  /    |\n\n|       |\n\n=========']));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $author$project$HangmanHelpers$hidePhraseCharacters = F2(
	function (model, _char) {
		return (_char === ' ') ? '\u00A0\u00A0\u00A0' : (A2(
			$elm$core$Set$member,
			$elm$core$String$toLower(_char),
			model.guessedChars) ? _char : '_');
	});
var $author$project$HangmanHelpers$hiddenPhraseString = function (model) {
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			$author$project$HangmanHelpers$hidePhraseCharacters(model),
			A2($elm$core$String$split, '', model.hangmanPhrase)));
};
var $author$project$HangmanViews$initialHangmanHtml = function (asciiArt) {
	return _List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$pre,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(32)),
							$rtfeldman$elm_css$Css$lineHeight(
							$rtfeldman$elm_css$Css$pct(50))
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(asciiArt)
				])),
			A2(
			$rtfeldman$elm_css$Html$Styled$pre,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(32)),
							$rtfeldman$elm_css$Css$lineHeight(
							$rtfeldman$elm_css$Css$pct(50))
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Choose Phrase')
				]))
		]);
};
var $author$project$HangmanViews$livingHangmanHtml = function (asciiArt) {
	return _List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$pre,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(32)),
							$rtfeldman$elm_css$Css$lineHeight(
							$rtfeldman$elm_css$Css$pct(50))
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(asciiArt)
				])),
			A2(
			$rtfeldman$elm_css$Html$Styled$pre,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(32)),
							$rtfeldman$elm_css$Css$lineHeight(
							$rtfeldman$elm_css$Css$pct(50))
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Keep Playing')
				]))
		]);
};
var $author$project$HangmanHelpers$inCorrectCharacterFilter = F2(
	function (model, _char) {
		return !A2($elm$core$String$contains, _char, model.hangmanPhrase);
	});
var $author$project$HangmanHelpers$listGuessedChars = function (model) {
	return $elm$core$Set$toList(model.guessedChars);
};
var $author$project$HangmanHelpers$listIncorrectGuesses = function (model) {
	return A2(
		$elm$core$List$filter,
		$author$project$HangmanHelpers$inCorrectCharacterFilter(model),
		$author$project$HangmanHelpers$listGuessedChars(model));
};
var $author$project$HangmanHelpers$numIncorrectGuesses = function (model) {
	return $elm$core$List$length(
		$author$project$HangmanHelpers$listIncorrectGuesses(model));
};
var $author$project$HangmanViews$winningHangmanHtml = function (asciiArt) {
	return _List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$pre,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(32)),
							$rtfeldman$elm_css$Css$lineHeight(
							$rtfeldman$elm_css$Css$pct(50))
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(asciiArt)
				])),
			A2(
			$rtfeldman$elm_css$Html$Styled$pre,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(32)),
							$rtfeldman$elm_css$Css$lineHeight(
							$rtfeldman$elm_css$Css$pct(50))
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('You Win!')
				]))
		]);
};
var $author$project$HangmanViews$hangmanArtView = function (model) {
	var _v0 = A2(
		$elm$core$Array$get,
		$author$project$HangmanHelpers$numIncorrectGuesses(model),
		$author$project$HangmanSourceTexts$hangmanArtAlive);
	if (_v0.$ === 'Nothing') {
		return A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, $author$project$HangmanViews$deadHangmanHtml);
	} else {
		var hangmanAscii = _v0.a;
		return A2(
			$elm$core$String$contains,
			'_',
			$author$project$HangmanHelpers$hiddenPhraseString(model)) ? A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			$author$project$HangmanViews$livingHangmanHtml(hangmanAscii)) : (('\u00A0\u00A0\u00A0' === $author$project$HangmanHelpers$hiddenPhraseString(model)) ? A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			$author$project$HangmanViews$initialHangmanHtml(hangmanAscii)) : A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			$author$project$HangmanViews$winningHangmanHtml(hangmanAscii)));
	}
};
var $rtfeldman$elm_css$Css$padding = $rtfeldman$elm_css$Css$prop1('padding');
var $rtfeldman$elm_css$Html$Styled$span = $rtfeldman$elm_css$Html$Styled$node('span');
var $author$project$HangmanHelpers$addCharactersToSpan = function (_char) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$span,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$padding(
						$rtfeldman$elm_css$Css$px(2)),
						$rtfeldman$elm_css$Css$fontSize(
						$rtfeldman$elm_css$Css$px(32))
					]))
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(_char)
			]));
};
var $author$project$HangmanViews$hangmanPhraseView = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
						$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center)
					]))
			]),
		A2(
			$elm$core$List$map,
			$author$project$HangmanHelpers$addCharactersToSpan,
			A2(
				$elm$core$List$map,
				$author$project$HangmanHelpers$hidePhraseCharacters(model),
				A2($elm$core$String$split, '', model.hangmanPhrase))));
};
var $rtfeldman$elm_css$Html$Styled$Events$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Events$onSubmit = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
		'submit',
		A2(
			$elm$json$Json$Decode$map,
			$rtfeldman$elm_css$Html$Styled$Events$alwaysPreventDefault,
			$elm$json$Json$Decode$succeed(msg)));
};
var $author$project$HangmanTypes$GenerateRandomTextIndex = F2(
	function (a, b) {
		return {$: 'GenerateRandomTextIndex', a: a, b: b};
	});
var $author$project$HangmanSourceTexts$longWords = '\ninformation\navailable\ncopyright\nuniversity\nmanagement\ninternational\ndevelopment\neducation\ncommunity\ntechnology\nfollowing\nresources\nincluding\ndirectory\ngovernment\ndepartment\ndescription\ninsurance\ndifferent\ncategories\nconditions\naccessories\nseptember\nquestions\napplication\nfinancial\nequipment\nperformance\nexperience\nimportant\nactivities\nadditional\nsomething\nprofessional\ncommittee\nwashington\ncalifornia\nreference\ncompanies\ncomputers\npresident\naustralia\ndiscussion\nentertainment\nagreement\nmarketing\nassociation\ncollection\nsolutions\nelectronics\ntechnical\nmicrosoft\nconference\nenvironment\nstatement\ndownloads\napplications\nrequirements\nindividual\nsubscribe\neverything\nproduction\ncommercial\nadvertising\ntreatment\nnewsletter\nknowledge\ncurrently\nconstruction\nregistered\nprotection\nengineering\npublished\ncorporate\ncustomers\nmaterials\ncountries\nstandards\npolitical\nadvertise\nenvironmental\navailability\nemployment\ncommission\nadministration\ninstitute\nsponsored\nelectronic\ncondition\neffective\norganization\nselection\ncorporation\nexecutive\nnecessary\naccording\nparticular\nfacilities\nopportunities\nappropriate\nstatistics\ninvestment\nchristmas\nregistration\nfurniture\nwednesday\nstructure\ndistribution\nindustrial\npotential\nresponsible\ncommunications\nassociated\nfoundation\ndocuments\ncommunication\nindependent\noperating\ndeveloped\ntelephone\npopulation\nnavigation\noperations\ntherefore\nchristian\nunderstand\npublications\nworldwide\nconnection\npublisher\nintroduction\nproperties\naccommodation\nexcellent\nopportunity\nassessment\nespecially\ninterface\noperation\nrestaurants\nbeautiful\nlocations\nsignificant\ntechnologies\nmanufacturer\nproviding\nauthority\nconsidered\nprogramme\nenterprise\neducational\nemployees\nalternative\nprocessing\nresponsibility\nresolution\npublication\nrelations\nphotography\ncomponents\nassistance\ncompleted\norganizations\notherwise\ntransportation\ndisclaimer\nmembership\nrecommended\nbackground\ncharacter\nmaintenance\nfunctions\ntrademarks\nphentermine\nsubmitted\ntelevision\ninterested\nthroughout\nestablished\nprogramming\nregarding\ninstructions\nincreased\nunderstanding\nbeginning\nassociates\ninstruments\nbusinesses\nspecified\nrestaurant\nprocedures\nrelationship\ntraditional\nsometimes\nthemselves\ntransport\ninteresting\nevaluation\nimplementation\ngalleries\nreferences\npresented\nliterature\nrespective\ndefinition\nsecretary\nnetworking\naustralian\nmagazines\nfrancisco\nindividuals\nguidelines\ninstallation\ndescribed\nattention\ndifference\nregulations\ncertificate\ndirections\ndocumentation\nautomotive\nsuccessful\ncommunities\nsituation\npublishing\nemergency\ndeveloping\ndetermine\ntemperature\nannouncements\nhistorical\nringtones\ndifficult\nscientific\nsatellite\nparticularly\nfunctional\nmonitoring\narchitecture\nrecommend\ndictionary\naccounting\nmanufacturing\nprofessor\ngenerally\ncontinued\ntechniques\npermission\ngeneration\ncomponent\nguarantee\nprocesses\ninterests\npaperback\nclassifieds\nsupported\ncompetition\nproviders\ncharacters\nthousands\napartments\ngenerated\nadministrative\npractices\nreporting\nessential\naffiliate\nimmediately\ndesignated\nintegrated\nconfiguration\ncomprehensive\nuniversal\npresentation\nlanguages\ncompliance\nimprovement\npennsylvania\nchallenge\nacceptance\nstrategies\naffiliates\nmultimedia\ncertified\ncomputing\ninteractive\nprocedure\nleadership\nreligious\nbreakfast\ndeveloper\napproximately\nrecommendations\ncomparison\nautomatically\nminnesota\nadventure\ninstitutions\nassistant\nadvertisement\nheadlines\nyesterday\ndetermined\nwholesale\nextension\nstatements\ncompletely\nelectrical\napplicable\nmanufacturers\nclassical\ndedicated\ndirection\nbasketball\nwisconsin\npersonnel\nidentified\nprofessionals\nadvantage\nnewsletters\nestimated\nanonymous\nmiscellaneous\nintegration\ninterview\nframework\ninstalled\nmassachusetts\nassociate\nfrequently\ndiscussions\nlaboratory\ndestination\nintelligence\nspecifications\ntripadvisor\nresidential\ndecisions\nindustries\npartnership\neditorial\nexpression\nprovisions\nprinciples\nsuggestions\nreplacement\nstrategic\neconomics\ncompatible\napartment\nnetherlands\nconsulting\nrecreation\nparticipants\nfavorites\ntranslation\nestimates\nprotected\nphiladelphia\nofficials\ncontained\nlegislation\nparameters\nrelationships\ntennessee\nrepresentative\nfrequency\nintroduced\ndepartments\nresidents\ndisplayed\nperformed\nadministrator\naddresses\npermanent\nagriculture\nconstitutes\nportfolio\npractical\ndelivered\ncollectibles\ninfrastructure\nexclusive\noriginally\nutilities\nphilosophy\nregulation\nreduction\nnutrition\nrecording\nsecondary\nwonderful\nannounced\nprevention\nmentioned\nautomatic\nhealthcare\nmaintained\nincreasing\nconnected\ndirectors\nparticipation\ncontaining\ncombination\namendment\nguaranteed\nlibraries\ndistributed\nsingapore\nenterprises\nconvention\nprincipal\ncertification\npreviously\nbuildings\nhousehold\nbatteries\npositions\nsubscription\ncontemporary\npanasonic\npermalink\nsignature\nprovision\ncertainly\nnewspaper\nliability\ntrademark\ntrackback\namericans\npromotion\nconversion\nreasonable\nbroadband\ninfluence\nimportance\nwebmaster\nprescription\nspecifically\nrepresent\nconservation\nlouisiana\njavascript\nmarketplace\nevolution\ncertificates\nobjectives\nsuggested\nconcerned\nstructures\nencyclopedia\ncontinuing\ninterracial\ncompetitive\nsuppliers\npreparation\nreceiving\naccordance\ndiscussed\nelizabeth\nreservations\nplaystation\ninstruction\nannotation\ndifferences\nestablish\nexpressed\nparagraph\nmathematics\ncompensation\nconducted\npercentage\nmississippi\nrequested\nconnecticut\npersonals\nimmediate\nagricultural\nsupporting\ncollections\nparticipate\nspecialist\nexperienced\ninvestigation\ninstitution\nsearching\nproceedings\ntransmission\ncharacteristics\nexperiences\nextremely\nverzeichnis\ncontracts\nconcerning\ndevelopers\nequivalent\nchemistry\nneighborhood\nvariables\ncontinues\ncurriculum\npsychology\nresponses\ncircumstances\nidentification\nappliances\nelementary\nunlimited\nprintable\nenforcement\nhardcover\ncelebrity\nchocolate\nhampshire\nbluetooth\ncontrolled\nrequirement\nauthorities\nrepresentatives\npregnancy\nbiography\nattractions\ntransactions\nauthorized\nretirement\nfinancing\nefficiency\nefficient\ncommitment\nspecialty\ninterviews\nqualified\ndiscovery\nclassified\nconfidence\nlifestyle\nconsistent\nclearance\nconnections\ninventory\nconverter\norganisation\nobjective\nindicated\nsecurities\nvolunteer\ndemocratic\nswitzerland\nparameter\nprocessor\ndimensions\ncontribute\nchallenges\nrecognition\nsubmission\nencourage\nregulatory\ninspection\nconsumers\nterritory\ntransaction\nmanchester\ncontributions\ncontinuous\nresulting\ncambridge\ninitiative\nexecution\ndisability\nincreases\ncontractor\nexamination\nindicates\ncommitted\nextensive\naffordable\ncandidate\ndatabases\noutstanding\nperspective\nmessenger\ntournament\nconsideration\ndiscounts\ncatalogue\npublishers\ncaribbean\nreservation\nremaining\ndepending\nexpansion\npurchased\nperforming\ncollected\nabsolutely\nfeaturing\nimplement\nscheduled\ncalculator\nsignificantly\ntemporary\nsufficient\nawareness\nvancouver\ncontribution\nmeasurement\nconstitution\npackaging\nconsultation\nnorthwest\nclassroom\ndemocracy\nwallpaper\nmerchandise\nresistance\nbaltimore\ncandidates\ncharlotte\nbiological\ntransition\npreferences\ninstrument\nclassification\nphysician\nhollywood\nwikipedia\nspiritual\nphotographs\nrelatively\nsatisfaction\nrepresents\npittsburgh\npreferred\nintellectual\ncomfortable\ninteraction\nlistening\neffectively\nexperimental\nrevolution\nconsolidation\nlandscape\ndependent\nmechanical\nconsultants\napplicant\ncooperation\nacquisition\nimplemented\ndirectories\nrecognized\nnotification\nlicensing\ntextbooks\ndiversity\ncleveland\ninvestments\naccessibility\nsensitive\ntemplates\ncompletion\nuniversities\ntechnique\ncontractors\nsubscriptions\ncalculate\nalexander\nbroadcast\nconverted\nanniversary\nimprovements\nspecification\naccessible\naccessory\ntypically\nrepresentation\narrangements\nconferences\nuniprotkb\nconsumption\nbirmingham\nafternoon\nconsultant\ncontroller\nownership\ncommittees\nlegislative\nresearchers\nunsubscribe\nmolecular\nresidence\nattorneys\noperators\nsustainable\nphilippines\nstatistical\ninnovation\nemployers\ndefinitions\nelections\nstainless\nnewspapers\nhospitals\nexception\nsuccessfully\nindonesia\nprimarily\ncapabilities\nrecommendation\nrecruitment\norganized\nimproving\nexpensive\norganisations\nexplained\nprogrammes\nexpertise\nmechanism\njewellery\neventually\nagreements\nconsidering\ninnovative\nconclusion\ndisorders\ncollaboration\ndetection\nformation\nengineers\nproposals\nmoderator\ntutorials\nsettlement\ncollectables\nfantastic\ngovernments\npurchasing\nappointed\noperational\ncorresponding\ndescriptions\ndetermination\nanimation\nproductions\ntelecommunications\ninstructor\napproaches\nhighlights\ndesigners\nmelbourne\nscientists\nblackjack\nargentina\npossibility\ncommissioner\ndangerous\nreliability\nunfortunately\nrespectively\nvolunteers\nattachment\nappointment\nworkshops\nhurricane\nrepresented\nmortgages\nresponsibilities\ncarefully\nproductivity\ninvestors\nunderground\ndiagnosis\nprinciple\nvacations\ncalculated\nappearance\nincorporated\nnotebooks\nalgorithm\nvalentine\ninvolving\ninvesting\nchristopher\nadmission\nterrorism\nparliament\nsituations\nallocated\ncorrections\nstructural\nmunicipal\ndescribes\ndisabilities\nsubstance\nprohibited\naddressed\nsimulation\ninitiatives\nconcentration\ninterpretation\nbankruptcy\noptimization\nsubstances\ndiscovered\nrestrictions\nparticipating\nexhibition\ncomposition\nnationwide\ndefinitely\nexistence\ncommentary\nlimousines\ndevelopments\nimmigration\ndestinations\nnecessarily\nattribute\napparently\nsurrounding\nmountains\npopularity\npostposted\ncoordinator\nobviously\nfundamental\nsubstantial\nprogressive\nchampionship\nsacramento\nimpossible\ndepression\ntestimonials\nmemorabilia\ncartridge\nexplanation\ncincinnati\nsubsection\nelectricity\npermitted\nworkplace\nconfirmed\nwallpapers\ninfection\neligibility\ninvolvement\nplacement\nobservations\nvbulletin\nsubsequent\nmotorcycle\ndisclosure\nestablishment\npresentations\nundergraduate\noccupation\ndonations\nassociations\ncitysearch\nradiation\nseriously\nelsewhere\npollution\nconservative\nguestbook\neffectiveness\ndemonstrate\natmosphere\nexperiment\npurchases\nfederation\nassignment\nchemicals\neverybody\nnashville\ncounseling\nacceptable\nsatisfied\nmeasurements\nmilwaukee\nmedication\nwarehouse\nshareware\nviolation\nconfigure\nstability\nsouthwest\ninstitutional\nexpectations\nindependence\nmetabolism\npersonally\nexcellence\nsomewhere\nattributes\nrecognize\nscreening\nthumbnail\nforgotten\nintelligent\nedinburgh\nobligation\nregardless\nrestricted\nrepublican\nmerchants\nattendance\narguments\namsterdam\nadventures\nannouncement\nappreciate\nregularly\nmechanisms\ncustomize\ntradition\nindicators\nemissions\nphysicians\ncomplaint\nexperiments\nafghanistan\nscholarship\ngovernance\nsupplements\ncamcorder\nimplementing\nourselves\nconversation\ncapability\nproducing\nprecision\ncontributed\nreproduction\ningredients\nfranchise\ncomplaints\npromotions\nrehabilitation\nmaintaining\nenvironments\nreception\ncorrectly\nconsequences\ngeography\nappearing\nintegrity\ndiscrimination\nprocessed\nimplications\nfunctionality\nintermediate\nemotional\nplatforms\novernight\ngeographic\npreliminary\ndistricts\nintroduce\npromotional\nchevrolet\nspecialists\ngenerator\nsuspension\ncorrection\nauthentication\ncommunicate\nsupplement\nshowtimes\npromoting\nmachinery\nbandwidth\nprobability\ndimension\nschedules\nadmissions\nquarterly\nillustrated\ncontinental\nalternate\nachievement\nlimitations\nautomated\npassenger\nconvenient\norientation\nchildhood\nflexibility\njurisdiction\ndisplaying\nencouraged\ncartridges\ndeclaration\nautomation\nadvantages\npreparing\nrecipient\nextensions\nathletics\nsoutheast\nalternatives\ndetermining\npersonalized\nconditioning\npartnerships\ndestruction\nincreasingly\nmigration\nbasically\nconventional\napplicants\noccupational\nadjustment\ntreatments\ncamcorders\ndifficulty\ncollective\ncoalition\nenrollment\nproducers\ncollector\ninterfaces\nadvertisers\nrepresenting\nobservation\nrestoration\nconvenience\nreturning\nopposition\ncontainer\ndefendant\nconfirmation\nsupervisor\nperipherals\nbestsellers\ndeparture\nminneapolis\ninteractions\nintervention\nattraction\nmodification\ncustomized\nunderstood\nassurance\nhappening\namendments\nmetropolitan\ncompilation\nverification\nattractive\nrecordings\njefferson\ngardening\nobligations\norchestra\npolyphonic\noutsourcing\nadjustable\nallocation\ndiscipline\ndemonstrated\nidentifying\nalphabetical\ndispatched\ninstalling\nvoluntary\nphotographer\nmessaging\nconstructed\nadditions\nrequiring\nengagement\nrefinance\ncalendars\narrangement\nconclusions\nbibliography\ncompatibility\nfurthermore\ncooperative\nmeasuring\njacksonville\nheadquarters\ntransfers\ntransformation\nattachments\nadministrators\npersonality\nfacilitate\nsubscriber\npriorities\nbookstore\nparenting\nincredible\ncommonwealth\npharmaceutical\nmanhattan\nworkforce\norganizational\nportuguese\neverywhere\ndischarge\nhalloween\nhazardous\nmethodology\nhousewares\nreputation\nresistant\ndemocrats\nrecycling\nqualifications\nslideshow\nvariation\ntransferred\nphotograph\ndistributor\nunderlying\nwrestling\nphotoshop\ngathering\nprojection\nmathematical\nspecialized\ndiagnostic\nindianapolis\ncorporations\ncriticism\nautomobile\nconfidential\nstatutory\naccommodations\nnortheast\ndownloaded\npaintings\ninjection\nyorkshire\npopulations\nprotective\ninitially\nindicator\neliminate\nsunglasses\npreference\nthreshold\nvenezuela\nexploration\nsequences\nastronomy\ntranslate\nannounces\ncompression\nestablishing\nconstitutional\nperfectly\ninstantly\nlitigation\nsubmissions\nbroadcasting\nhorizontal\nterrorist\ninformational\necommerce\nsuffering\nprospective\nultimately\nartificial\nspectacular\ncoordination\nconnector\naffiliated\nactivation\nnaturally\nsubscribers\nmitsubishi\nunderwear\npotentially\nconstraints\ninclusive\ndimensional\nconsiderable\nselecting\nprocessors\npantyhose\ndifficulties\ncomplexity\nconstantly\nbarcelona\npresidential\ndocumentary\nterritories\npalestinian\nlegislature\nhospitality\nprocurement\ntheoretical\nexercises\nsurveillance\nprotocols\nhighlight\nsubstitute\ninclusion\nhopefully\nbrilliant\nevaluated\nassignments\ntermination\nhouseholds\nauthentic\nmontgomery\narchitectural\nlouisville\nmacintosh\nmovements\namenities\nvirtually\nauthorization\nprojector\ncomparative\npsychological\nsurprised\ngenealogy\nexpenditure\nliverpool\nconnectivity\nalgorithms\nsimilarly\ncollaborative\nexcluding\ncommander\nsuggestion\nspotlight\ninvestigate\nconnecting\nlogistics\nproportion\nsignificance\nsymposium\nessentials\nprotecting\ntransmitted\nscreenshots\nintensive\nswitching\ncorrespondence\nsupervision\nexpenditures\nseparation\ntestimony\ncelebrities\nmandatory\nboundaries\nsyndication\ncelebration\nfiltering\nluxembourg\noffensive\ndeployment\ncolleagues\nseparated\ndirective\ngoverning\nretailers\noccasionally\nattending\nrecruiting\ninstructional\ntraveling\npermissions\nbiotechnology\nprescribed\ncatherine\nreproduced\ncalculation\nconsolidated\noccasions\nequations\nexceptional\nrespondents\nconsiderations\nqueensland\nmusicians\ncomposite\nunavailable\nessentially\ndesigning\nassessments\nbrunswick\nsensitivity\npreservation\nstreaming\nintensity\ntechnological\nsyndicate\nantivirus\naddressing\ndiscounted\nbangladesh\nconstitute\nconcluded\ndesperate\ndemonstration\ngovernmental\nmanufactured\ngraduation\nvariations\naddiction\nspringfield\nsynthesis\nundefined\nunemployment\nenhancement\nnewcastle\nperformances\nsocieties\nbrazilian\nidentical\npetroleum\nnorwegian\nretention\nexchanges\nsoundtrack\nwondering\nprofession\nseparately\nphysiology\ncollecting\nparticipant\nscholarships\nrecreational\ndominican\nfriendship\nexpanding\nprovincial\ninvestigations\nmedications\nrochester\nadvertiser\nencryption\ndownloadable\nsophisticated\npossession\nlaboratories\nvegetables\nthumbnails\nstockings\nrespondent\ndestroyed\nmanufacture\nwordpress\nvulnerability\naccountability\ncelebrate\naccredited\nappliance\ncompressed\nscheduling\nperspectives\nmortality\nchristians\ntherapeutic\nimpressive\naccordingly\narchitect\nchallenging\nmicrowave\naccidents\nrelocation\ncontributors\nviolations\ntemperatures\ncompetitions\ndiscretion\ncosmetics\nrepository\nconcentrations\nchristianity\nnegotiations\nrealistic\ngenerating\nchristina\ncongressional\nphotographic\nmodifications\nmillennium\nachieving\nfisheries\nexceptions\nreactions\nmacromedia\ncompanion\ndivisions\nadditionally\nfellowship\nvictorian\ncopyrights\nlithuania\nmastercard\nchronicles\nobtaining\ndistribute\ndecorative\nenlargement\ncampaigns\nconjunction\ninstances\nindigenous\nvalidation\ncorruption\nincentives\ncholesterol\ndifferential\nscientist\nstarsmerchant\narthritis\nnevertheless\npractitioners\ntranscript\ninflation\ncompounds\ncontracting\nstructured\nreasonably\ngraduates\nrecommends\ncontrolling\ndistributors\narlington\nparticles\nextraordinary\nindicating\ncoordinate\nexclusively\nlimitation\nwidescreen\nillustration\nconstruct\ninquiries\ninspiration\naffecting\ndownloading\naggregate\nforecasts\ncomplicated\nshopzilla\ndecorating\nexpressions\nshakespeare\nconnectors\nconflicts\ntravelers\nofferings\nincorrect\nfurnishings\nguatemala\nperception\nrenaissance\npathology\nordinance\nphotographers\ninfections\nconfigured\nfestivals\npossibilities\ncontributing\nanalytical\ncirculation\nassumption\njerusalem\ntransexuales\ninvention\ntechnician\nexecutives\nenquiries\ncognitive\nexploring\nregistrar\nsupporters\nwithdrawal\npredicted\nsaskatchewan\ncancellation\nministers\nveterinary\nprostores\nrelevance\nincentive\nbutterfly\nmechanics\nnumerical\nreflection\naccompanied\ninvitation\nprinceton\nspirituality\nmeanwhile\nproprietary\nchildrens\nthumbzilla\nporcelain\npichunter\ntranslated\ncolumnists\nconsensus\ndelivering\njournalism\nintention\nundertaken\nstatewide\nsemiconductor\nillustrations\nhappiness\nsubstantially\nidentifier\ncalculations\nconducting\naccomplished\ncalculators\nimpression\ncorrelation\nfragrance\nneighbors\ntransparent\ncharleston\nchampions\nselections\nprojectors\ninappropriate\ncomparing\nvocational\npharmacies\nintroducing\nappreciated\nalbuquerque\ndistinguished\nprojected\nassumptions\nshareholders\ndevelopmental\nregulated\nanticipated\ncompleting\ncomparable\nconfusion\ncopyrighted\nwarranties\ndocumented\npaperbacks\nkeyboards\nvulnerable\nreflected\nrespiratory\nnotifications\ntransexual\nmainstream\nevaluating\nsubcommittee\nmaternity\njournalists\nfoundations\nvolleyball\nliabilities\ndecreased\ntolerance\ncreativity\ndescribing\nlightning\nquotations\ninspector\nbookmarks\nbehavioral\nriverside\nbathrooms\nabilities\ninitiated\nnonprofit\nlancaster\nsuspended\ncontainers\nattitudes\nsimultaneously\nintegrate\nsociology\nscreenshot\nexhibitions\nconfident\nretrieved\nofficially\nconsortium\nrecipients\ndelicious\ntraditions\nperiodically\nhungarian\nreferring\ntransform\neducators\nvegetable\nhumanities\nindependently\nalignment\nhenderson\nbritannica\ncompetitors\nvisibility\nconsciousness\nencounter\nresolutions\naccessing\nattempted\nwitnesses\nadministered\nstrengthen\nfrederick\naggressive\nadvertisements\nsublimedirectory\ndisturbed\ndetermines\nsculpture\nmotivation\npharmacology\npassengers\nquantities\npetersburg\nconsistently\npowerpoint\nobituaries\npunishment\nappreciation\nsubsequently\nprovidence\nrestriction\nincorporate\nbackgrounds\ntreasurer\nlightweight\ntranscription\ncomplications\nscripting\nremembered\nsynthetic\ntestament\nspecifics\npartially\nwilderness\ngenerations\ntournaments\nsponsorship\nheadphones\nproceeding\nvolkswagen\nuncertainty\nbreakdown\nreconstruction\nsubsidiary\nstrengths\nencouraging\nfurnished\nterrorists\ncomparisons\nbeneficial\ndistributions\nviewpicture\nthreatened\nrepublicans\ndiscusses\nresponded\nabstracts\nprediction\npharmaceuticals\nthesaurus\nindividually\nbattlefield\nliterally\necological\nappraisal\nconsisting\nsubmitting\ncitations\ngeographical\nmozambique\ndisclaimers\nchampionships\nsheffield\nfinishing\nwellington\nprospects\nbulgarian\naboriginal\nremarkable\npreventing\nproductive\nboulevard\ncompliant\npenalties\nimagination\nrefurbished\nactivated\nconferencing\narmstrong\npoliticians\ntrackbacks\naccommodate\nchristine\naccepting\nprecipitation\nisolation\nsustained\napproximate\nprogrammer\ngreetings\ninherited\nincomplete\nchronicle\nlegitimate\nbiographies\ninvestigator\nplaintiff\nprisoners\nmediterranean\nnightlife\narchitects\nentrepreneur\nfreelance\nexcessive\nscreensaver\nvaluation\nunexpected\ncigarette\ncharacteristic\nmetallica\nconsequently\nappointments\nnarrative\nacademics\nquantitative\nscreensavers\nsubdivision\ndistinction\nlivestock\nexemption\nsustainability\nformatting\nnutritional\nnicaragua\naffiliation\nrelatives\nsatisfactory\nrevolutionary\nbracelets\ntelephony\nbreathing\nthickness\nadjustments\ngraphical\ndiscussing\naerospace\nmeaningful\nmaintains\nshortcuts\nvoyeurweb\nextending\nspecifies\naccreditation\nblackberry\nmeditation\nmicrophone\nmacedonia\ncombining\ninstrumental\norganizing\nmoderators\nkazakhstan\nstandings\npartition\ninvisible\ntranslations\ncommodity\nkilometers\nthanksgiving\nguarantees\nindication\ncongratulations\ncigarettes\ncontrollers\nconsultancy\nconventions\ncoordinates\nresponding\nphysically\nstakeholders\nhydrocodone\nconsecutive\nattempting\nrepresentations\ncompeting\npeninsula\naccurately\nconsiders\nministries\nvacancies\nparliamentary\nacknowledge\nthoroughly\nnottingham\nidentifies\nquestionnaire\nqualification\nmodelling\nminiature\ninterstate\nconsequence\nsystematic\nperceived\nmadagascar\npresenting\ntroubleshooting\nuzbekistan\ncenturies\nmagnitude\nrichardson\nfragrances\nvocabulary\nearthquake\nfundraising\ngeological\nassessing\nintroduces\nwebmasters\ncomputational\nacdbentity\nparticipated\nhandhelds\nanswering\nimpressed\nconspiracy\norganizer\ncombinations\npreceding\ncumulative\namplifier\narbitrary\nprominent\nlexington\ncontacted\nrecorders\noccasional\ninnovations\npostcards\nreviewing\nexplicitly\ntranssexual\ncitizenship\ninformative\ngirlfriend\nbloomberg\nhierarchy\ninfluenced\nabandoned\ncomplement\nmauritius\nchecklist\nrequesting\nlauderdale\nscenarios\nextraction\nelevation\nutilization\nbeverages\ncalibration\nefficiently\nentertaining\nprerequisite\nhypothesis\nmedicines\nregression\nenhancements\nrenewable\nintersection\npasswords\nconsistency\ncollectors\nazerbaijan\nastrology\noccurring\nsupplemental\ntravelling\ninduction\nprecisely\nspreading\nprovinces\nwidespread\nincidence\nincidents\nenhancing\ninterference\npalestine\nlistprice\natmospheric\nknowledgestorm\nreferenced\npublicity\nproposition\nallowance\ndesignation\nduplicate\ncriterion\ncivilization\nvietnamese\ntremendous\ncorrected\nencountered\ninternationally\nsurrounded\ncreatures\ncommented\naccomplish\nvegetarian\nnewfoundland\ninvestigated\nambassador\nstephanie\ncontacting\nvegetation\nfindarticles\nspecially\ninfectious\ncontinuity\nphenomenon\nconscious\nreferrals\ndifferently\nintegrating\nrevisions\nreasoning\ncharitable\nannotated\nconvinced\nburlington\nreplacing\nresearcher\nwatershed\noccupations\nacknowledged\nequilibrium\ncharacterized\nprivilege\nqualifying\nestimation\npediatric\ntechrepublic\ninstitutes\nbrochures\ntraveller\nappropriations\nsuspected\nbenchmark\nbeginners\ninstructors\nhighlighted\nstationery\nunauthorized\ncompetent\ncontributor\ndemonstrates\ngradually\ndesirable\njournalist\nafterwards\nreligions\nexplosion\nsignatures\ndisciplines\ndaughters\nconversations\nsimplified\nmotherboard\nbibliographic\nchampagne\ndeviation\nsuperintendent\nhousewives\ninfluences\ninspections\nirrigation\nhydraulic\nrobertson\npenetration\nconviction\nomissions\nretrieval\nqualities\nprototype\nimportantly\napparatus\nexplaining\nnomination\nempirical\ndependence\nsexuality\npolyester\ncommitments\nsuggesting\nremainder\nprivileges\ntelevisions\nspecializing\ncommodities\nmotorcycles\nconcentrate\nreproductive\nmolecules\nrefrigerator\nintervals\nsentences\nexclusion\nworkstation\nholocaust\nreceivers\ndisposition\nnavigator\ninvestigators\nmarijuana\ncathedral\nfairfield\nfascinating\nlandscapes\nlafayette\ncomputation\ncardiovascular\nsalvation\npredictions\naccompanying\nselective\narbitration\nconfiguring\neditorials\nsacrifice\nremovable\nconvergence\ngibraltar\nanthropology\nmalpractice\nreporters\nnecessity\nrendering\nhepatitis\nnationally\nwaterproof\nspecialties\nhumanitarian\ninvitations\nfunctioning\neconomies\nalexandria\nbacterial\nundertake\ncontinuously\nachievements\nconvertible\nsecretariat\nparagraphs\nadolescent\nnominations\ncancelled\nintroductory\nreservoir\noccurrence\nworcester\ndemographic\ndisciplinary\nrespected\nportraits\ninterpreted\nevaluations\nelimination\nhypothetical\nimmigrants\ncomplimentary\nhelicopter\nperformer\ncommissions\npowerseller\ngraduated\nsurprising\nunnecessary\ndramatically\nyugoslavia\ncharacterization\nlikelihood\nfundamentals\ncontamination\nendangered\ncompromise\nexpiration\nnamespace\nperipheral\nnegotiation\nopponents\nnominated\nconfidentiality\nelectoral\nchangelog\nalternatively\ngreensboro\ncontroversial\nrecovered\nupgrading\nfrontpage\ndemanding\ndefensive\nforbidden\nprogrammers\nmonitored\ninstallations\ndeutschland\npractitioner\nmotivated\nsmithsonian\nexamining\nrevelation\ndelegation\ndictionaries\ngreenhouse\ntransparency\ncurrencies\nsurvivors\npositioning\ndescending\ntemporarily\nfrequencies\nreflections\nmunicipality\ndetective\nexperiencing\nfireplace\nendorsement\npsychiatry\npersistent\nsummaries\nlooksmart\nmagnificent\ncolleague\nadaptation\npaintball\nenclosure\nsupervisors\nwestminster\ndistances\nabsorption\ntreasures\ntranscripts\ndisappointed\ncontinually\ncommunist\ncollectible\nentrepreneurs\ncreations\nacquisitions\nbiodiversity\nexcitement\npresently\nmysterious\nlibrarian\nsubsidiaries\nstockholm\nindonesian\ntherapist\npromising\nrelaxation\nthereafter\ncommissioners\nforwarding\nnightmare\nreductions\nsouthampton\norganisms\ntelescope\nportsmouth\nadvancement\nharassment\ngenerators\ngenerates\nreplication\ninexpensive\nreceptors\ninterventions\nhuntington\ninternship\naluminium\nsnowboard\nbeastality\nevanescence\ncoordinated\nshipments\nantarctica\nchancellor\ncontroversy\nlegendary\nbeautifully\nantibodies\nexaminations\nimmunology\ndepartmental\nterminology\ngentleman\nreproduce\nconvicted\nroommates\nthreatening\nspokesman\nactivists\nfrankfurt\nencourages\nassembled\nrestructuring\nterminals\nsimulations\nsufficiently\nconditional\ncrossword\nconceptual\nliechtenstein\ntranslator\nautomobiles\ncontinent\nlongitude\nchallenged\ntelecharger\ninsertion\ninstrumentation\nconstraint\ngroundwater\nstrengthening\ninsulation\ninfringement\nsubjective\nswaziland\nvarieties\nmediawiki\nconfigurations\n';
var $author$project$HangmanSourceTexts$mediumWords = '\nabout\nsearch\nother\nwhich\ntheir\nthere\ncontact\nbusiness\nonline\nfirst\nwould\nservices\nthese\nclick\nservice\nprice\npeople\nstate\nemail\nhealth\nworld\nproducts\nmusic\nshould\nproduct\nsystem\npolicy\nnumber\nplease\nsupport\nmessage\nafter\nsoftware\nvideo\nwhere\nrights\npublic\nbooks\nschool\nthrough\nlinks\nreview\nyears\norder\nprivacy\nitems\ncompany\ngroup\nunder\ngeneral\nresearch\njanuary\nreviews\nprogram\ngames\ncould\ngreat\nunited\nhotel\ncenter\nstore\ntravel\ncomments\nreport\nmember\ndetails\nterms\nbefore\nhotels\nright\nbecause\nlocal\nthose\nusing\nresults\noffice\nnational\ndesign\nposted\ninternet\naddress\nwithin\nstates\nphone\nshipping\nreserved\nsubject\nbetween\nforum\nfamily\nbased\nblack\ncheck\nspecial\nprices\nwebsite\nindex\nbeing\nwomen\ntoday\nsouth\nproject\npages\nversion\nsection\nfound\nsports\nhouse\nrelated\nsecurity\ncounty\namerican\nphoto\nmembers\npower\nwhile\nnetwork\ncomputer\nsystems\nthree\ntotal\nplace\ndownload\nwithout\naccess\nthink\nnorth\ncurrent\nposts\nmedia\ncontrol\nwater\nhistory\npictures\npersonal\nsince\nguide\nboard\nlocation\nchange\nwhite\nsmall\nrating\nchildren\nduring\nreturn\nstudents\nshopping\naccount\ntimes\nsites\nlevel\ndigital\nprofile\nprevious\nevents\nhours\nimage\ntitle\nanother\nshall\nproperty\nclass\nstill\nmoney\nquality\nevery\nlisting\ncontent\ncountry\nprivate\nlittle\nvisit\ntools\nreply\ncustomer\ndecember\ncompare\nmovies\ninclude\ncollege\nvalue\narticle\nprovide\nsource\nauthor\npress\nlearn\naround\nprint\ncourse\ncanada\nprocess\nstock\ntraining\ncredit\npoint\nscience\nadvanced\nsales\nenglish\nestate\nselect\nwindows\nphotos\nthread\ncategory\nlarge\ngallery\ntable\nregister\nhowever\noctober\nnovember\nmarket\nlibrary\nreally\naction\nstart\nseries\nmodel\nfeatures\nindustry\nhuman\nprovided\nrequired\nsecond\nmovie\nforums\nmarch\nbetter\nyahoo\ngoing\nmedical\nfriend\nserver\nstudy\nstaff\narticles\nfeedback\nagain\nlooking\nissues\napril\nnever\nusers\ncomplete\nstreet\ntopic\ncomment\nthings\nworking\nagainst\nstandard\nperson\nbelow\nmobile\nparty\npayment\nlogin\nstudent\nprograms\noffers\nlegal\nabove\nrecent\nstores\nproblem\nmemory\nsocial\naugust\nquote\nlanguage\nstory\noptions\nrates\ncreate\nyoung\namerica\nfield\npaper\nsingle\nexample\ngirls\npassword\nlatest\nquestion\nchanges\nnight\ntexas\npoker\nstatus\nbrowse\nissue\nrange\nbuilding\nseller\ncourt\nfebruary\nalways\nresult\naudio\nlight\nwrite\noffer\ngroups\ngiven\nfiles\nevent\nrelease\nanalysis\nrequest\nchina\nmaking\npicture\nneeds\npossible\nmight\nmonth\nmajor\nareas\nfuture\nspace\ncards\nproblems\nlondon\nmeeting\nbecome\ninterest\nchild\nenter\nshare\nsimilar\ngarden\nschools\nmillion\nadded\nlisted\nlearning\nenergy\ndelivery\npopular\nstories\njournal\nreports\nwelcome\ncentral\nimages\nnotice\noriginal\nradio\nuntil\ncolor\ncouncil\nincludes\ntrack\narchive\nothers\nformat\nleast\nsociety\nmonths\nsafety\nfriends\ntrade\nedition\nmessages\nfurther\nupdated\nhaving\nprovides\ndavid\nalready\ngreen\nstudies\nclose\ncommon\ndrive\nspecific\nseveral\nliving\ncalled\nshort\ndisplay\nlimited\npowered\nmeans\ndirector\ndaily\nbeach\nnatural\nwhether\nperiod\nplanning\ndatabase\nofficial\nweather\naverage\nwindow\nfrance\nregion\nisland\nrecord\ndirect\nrecords\ndistrict\ncalendar\ncosts\nstyle\nfront\nupdate\nparts\nearly\nmiles\nsound\nresource\npresent\neither\ndocument\nworks\nmaterial\nwritten\nfederal\nhosting\nrules\nfinal\nadult\ntickets\nthing\ncentre\ncheap\nfinance\nminutes\nthird\ngifts\neurope\nreading\ntopics\ncover\nusually\ntogether\nvideos\npercent\nfunction\ngetting\nglobal\neconomic\nplayer\nprojects\nlyrics\noften\nsubmit\ngermany\namount\nwatch\nincluded\nthough\nthanks\ndeals\nvarious\nwords\nlinux\njames\nweight\nheart\nreceived\nchoose\narchives\npoints\nmagazine\nerror\ncamera\nclear\nreceive\ndomain\nmethods\nchapter\nmakes\npolicies\nbeauty\nmanager\nindia\nposition\ntaken\nlistings\nmodels\nmichael\nknown\ncases\nflorida\nsimple\nquick\nwireless\nlicense\nfriday\nwhole\nannual\nlater\nbasic\nshows\ngoogle\nchurch\nmethod\npurchase\nactive\nresponse\npractice\nhardware\nfigure\nholiday\nenough\ndesigned\nalong\namong\ndeath\nwriting\nspeed\nbrand\ndiscount\nhigher\neffects\ncreated\nremember\nyellow\nincrease\nkingdom\nthought\nstuff\nfrench\nstorage\njapan\ndoing\nloans\nshoes\nentry\nnature\norders\nafrica\nsummary\ngrowth\nnotes\nagency\nmonday\neuropean\nactivity\nalthough\nwestern\nincome\nforce\noverall\nriver\npackage\ncontents\nplayers\nengine\nalbum\nregional\nsupplies\nstarted\nviews\nplans\ndouble\nbuild\nscreen\nexchange\ntypes\nlines\ncontinue\nacross\nbenefits\nneeded\nseason\napply\nsomeone\nanything\nprinter\nbelieve\neffect\nasked\nsunday\ncasino\nvolume\ncross\nanyone\nmortgage\nsilver\ninside\nsolution\nmature\nrather\nweeks\naddition\nsupply\nnothing\ncertain\nrunning\nlower\nunion\njewelry\nclothing\nnames\nrobert\nhomepage\nskills\nislands\nadvice\ncareer\nmilitary\nrental\ndecision\nleave\nbritish\nteens\nwoman\nsellers\nmiddle\ncable\ntaking\nvalues\ndivision\ncoming\ntuesday\nobject\nlesbian\nmachine\nlength\nactually\nscore\nclient\nreturns\ncapital\nfollow\nsample\nshown\nsaturday\nengland\nculture\nflash\ngeorge\nchoice\nstarting\nthursday\ncourses\nconsumer\nairport\nforeign\nartist\noutside\nlevels\nchannel\nletter\nphones\nideas\nsummer\nallow\ndegree\ncontract\nbutton\nreleases\nhomes\nsuper\nmatter\ncustom\nvirginia\nalmost\nlocated\nmultiple\nasian\neditor\ncause\nfocus\nfeatured\nrooms\nfemale\nthomas\nprimary\ncancer\nnumbers\nreason\nbrowser\nspring\nanswer\nvoice\nfriendly\nschedule\npurpose\nfeature\ncomes\npolice\neveryone\napproach\ncameras\nbrown\nphysical\nmedicine\nratings\nchicago\nforms\nglass\nhappy\nsmith\nwanted\nthank\nunique\nsurvey\nprior\nsport\nready\nanimal\nsources\nmexico\nregular\nsecure\nsimply\nevidence\nstation\nround\npaypal\nfavorite\noption\nmaster\nvalley\nrecently\nprobably\nrentals\nbuilt\nblood\nimprove\nlarger\nnetworks\nearth\nparents\nnokia\nimpact\ntransfer\nkitchen\nstrong\ncarolina\nwedding\nhospital\nground\noverview\nowners\ndisease\nitaly\nperfect\nclassic\nbasis\ncommand\ncities\nwilliam\nexpress\naward\ndistance\npeter\nensure\ninvolved\nextra\npartners\nbudget\nrated\nguides\nsuccess\nmaximum\nexisting\nquite\nselected\namazon\npatients\nwarning\nhorse\nforward\nflowers\nstars\nlists\nowner\nretail\nanimals\nuseful\ndirectly\nhousing\ntakes\nbring\ncatalog\nsearches\ntrying\nmother\ntraffic\njoined\ninput\nstrategy\nagent\nvalid\nmodern\nsenior\nireland\nteaching\ngrand\ntesting\ntrial\ncharge\nunits\ninstead\ncanadian\nnormal\nwrote\nships\nentire\nleading\nmetal\npositive\nfitness\nchinese\nopinion\nfootball\nabstract\noutput\nfunds\ngreater\nlikely\ndevelop\nartists\nguest\nseems\ntrust\ncontains\nsession\nmulti\nrepublic\nvacation\ncentury\nacademic\ngraphics\nindian\nexpected\ngrade\ndating\npacific\nmountain\nfilter\nmailing\nvehicle\nlonger\nconsider\nnorthern\nbehind\npanel\nfloor\ngerman\nbuying\nmatch\nproposed\ndefault\nrequire\noutdoor\nmorning\nallows\nprotein\nplant\nreported\npolitics\npartner\nauthors\nboards\nfaculty\nparties\nmission\nstring\nsense\nmodified\nreleased\nstage\ninternal\ngoods\nunless\nrichard\ndetailed\njapanese\napproved\ntarget\nexcept\nability\nmaybe\nmoving\nbrands\nplaces\npretty\nspain\nsouthern\nyourself\nwinter\nbattery\nyouth\npressure\nboston\nkeywords\nmedium\nbreak\npurposes\ndance\nitself\ndefined\npapers\nplaying\nawards\nstudio\nreader\nvirtual\ndevice\nanswers\nremote\nexternal\napple\noffered\ntheory\nenjoy\nremove\nsurface\nminimum\nvisual\nvariety\nteachers\nmartin\nmanual\nblock\nsubjects\nagents\nrepair\ncivil\nsteel\nsongs\nfixed\nwrong\nhands\nfinally\nupdates\ndesktop\nclasses\nparis\nsector\ncapacity\nrequires\njersey\nfully\nfather\nelectric\nquotes\nofficer\ndriver\nrespect\nunknown\nworth\nteacher\nworkers\ngeorgia\npeace\ncampus\nshowing\ncreative\ncoast\nbenefit\nprogress\nfunding\ndevices\ngrant\nagree\nfiction\nwatches\ncareers\nbeyond\nfamilies\nmuseum\nblogs\naccepted\nformer\ncomplex\nagencies\nparent\nspanish\nmichigan\ncolumbia\nsetting\nscale\nstand\neconomy\nhighest\nhelpful\nmonthly\ncritical\nframe\nmusical\nangeles\nemployee\nchief\ngives\nbottom\npackages\ndetail\nchanged\nheard\nbegin\ncolorado\nroyal\nclean\nswitch\nrussian\nlargest\nafrican\ntitles\nrelevant\njustice\nconnect\nbible\nbasket\napplied\nweekly\ndemand\nsuite\nvegas\nsquare\nchris\nadvance\nauction\nallowed\ncorrect\ncharles\nnation\nselling\npiece\nsheet\nseven\nolder\nillinois\nelements\nspecies\ncells\nmodule\nresort\nfacility\nrandom\npricing\nminister\nmotion\nlooks\nfashion\nvisitors\nmonitor\ntrading\nforest\ncalls\nwhose\ncoverage\ncouple\ngiving\nchance\nvision\nending\nclients\nactions\nlisten\ndiscuss\naccept\nnaked\nclinical\nsciences\nmarkets\nlowest\nhighly\nappear\nlives\ncurrency\nleather\npatient\nactual\nstone\ncommerce\nperhaps\npersons\ntests\nvillage\naccounts\namateur\nfactors\ncoffee\nsettings\nbuyer\ncultural\nsteve\neasily\nposter\nclosed\nholidays\nzealand\nbalance\ngraduate\nreplies\ninitial\nlabel\nthinking\nscott\ncanon\nleague\nwaste\nminute\nprovider\noptional\nsections\nchair\nfishing\neffort\nphase\nfields\nfantasy\nletters\nmotor\ncontext\ninstall\nshirt\napparel\ncrime\ncount\nbreast\njohnson\nquickly\ndollars\nwebsites\nreligion\nclaim\ndriving\nsurgery\npatch\nmeasures\nkansas\nchemical\ndoctor\nreduce\nbrought\nhimself\nenable\nexercise\nsanta\nleader\ndiamond\nisrael\nservers\nalone\nmeetings\nseconds\njones\narizona\nkeyword\nflight\ncongress\nusername\nproduced\nitalian\npocket\nsaint\nfreedom\nargument\ncreating\ndrugs\njoint\npremium\nfresh\nattorney\nupgrade\nfactor\ngrowing\nstream\nhearing\neastern\nauctions\ntherapy\nentries\ndates\nsigned\nupper\nserious\nprime\nsamsung\nlimit\nbegan\nlouis\nsteps\nerrors\nshops\nefforts\ninformed\nthoughts\ncreek\nworked\nquantity\nurban\nsorted\nmyself\ntours\nplatform\nlabor\nadmin\nnursing\ndefense\nmachines\nheavy\ncovered\nrecovery\nmerchant\nexpert\nprotect\nsolid\nbecame\norange\nvehicles\nprevent\ntheme\ncampaign\nmarine\nguitar\nfinding\nexamples\nsaying\nspirit\nclaims\nmotorola\naffairs\ntouch\nintended\ntowards\ngoals\nelection\nsuggest\nbranch\ncharges\nserve\nreasons\nmagic\nmount\nsmart\ntalking\nlatin\navoid\nmanage\ncorner\noregon\nelement\nbirth\nvirus\nabuse\nrequests\nseparate\nquarter\ntables\ndefine\nracing\nfacts\ncolumn\nplants\nfaith\nchain\nidentify\navenue\nmissing\ndomestic\nsitemap\nmoved\nhouston\nreach\nmental\nviewed\nmoment\nextended\nsequence\nattack\nsorry\ncenters\nopening\ndamage\nreserve\nrecipes\ngamma\nplastic\nproduce\nplaced\ntruth\ncounter\nfailure\nfollows\nweekend\ndollar\nontario\nfilms\nbridge\nnative\nwilliams\nmovement\nprinting\nbaseball\nowned\napproval\ndraft\nchart\nplayed\ncontacts\njesus\nreaders\nclubs\njackson\nequal\nmatching\noffering\nshirts\nprofit\nleaders\nposters\nvariable\nexpect\nparking\ncompared\nworkshop\nrussia\ncodes\nkinds\nseattle\ngolden\nteams\nlighting\nsenate\nforces\nfunny\nbrother\nturned\nportable\ntried\nreturned\npattern\nnamed\ntheatre\nlaser\nearlier\nsponsor\nwarranty\nindiana\nharry\nobjects\ndelete\nevening\nassembly\nnuclear\ntaxes\nmouse\nsignal\ncriminal\nissued\nbrain\nsexual\npowerful\ndream\nobtained\nfalse\nflower\npassed\nsupplied\nfalls\nopinions\npromote\nstated\nstats\nhawaii\nappears\ncarry\ndecided\ncovers\nhello\ndesigns\nmaintain\ntourism\npriority\nadults\nclips\nsavings\ngraphic\npayments\nbinding\nbrief\nended\nwinning\neight\nstraight\nscript\nserved\nwants\nprepared\ndining\nalert\natlanta\ndakota\nqueen\ncredits\nclearly\nhandle\nsweet\ncriteria\npubmed\ndiego\ntruck\nbehavior\nenlarge\nrevenue\nmeasure\nchanging\nvotes\nlooked\nfestival\nocean\nflights\nexperts\nsigns\ndepth\nwhatever\nlogged\nlaptop\nvintage\ntrain\nexactly\nexplore\nmaryland\nconcept\nnearly\neligible\ncheckout\nreality\nforgot\nhandling\norigin\ngaming\nfeeds\nbillion\nscotland\nfaster\ndallas\nbought\nnations\nroute\nfollowed\nbroken\nfrank\nalaska\nbattle\nanime\nspeak\nprotocol\nquery\nequity\nspeech\nrural\nshared\nsounds\njudge\nbytes\nforced\nfight\nheight\nspeaker\nfiled\nobtain\noffices\ndesigner\nremain\nmanaged\nfailed\nmarriage\nkorea\nbanks\nsecret\nkelly\nleads\nnegative\naustin\ntoronto\ntheater\nsprings\nmissouri\nandrew\nperform\nhealthy\nassets\ninjury\njoseph\nministry\ndrivers\nlawyer\nfigures\nmarried\nproposal\nsharing\nportal\nwaiting\nbirthday\ngratis\nbanking\nbrian\ntoward\nslightly\nassist\nconduct\nlingerie\ncalling\nserving\nprofiles\nmiami\ncomics\nmatters\nhouses\npostal\ncontrols\nbreaking\ncombined\nultimate\nwales\nminor\nfinish\nnoted\nreduced\nphysics\nspent\nextreme\nsamples\ndavis\ndaniel\nreviewed\nforecast\nremoved\nhelps\nsingles\ncycle\namounts\ncontain\naccuracy\nsleep\npharmacy\nbrazil\ncreation\nstatic\nscene\nhunter\ncrystal\nfamous\nwriter\nchairman\nviolence\noklahoma\nspeakers\ndrink\nacademy\ndynamic\ngender\ncleaning\nconcerns\nvendor\nintel\nofficers\nreferred\nsupports\nregions\njunior\nrings\nmeaning\nladies\nhenry\nticket\nguess\nagreed\nsoccer\nimport\nposting\npresence\ninstant\nviewing\nmajority\nchrist\naspects\naustria\nahead\nscheme\nutility\npreview\nmanner\nmatrix\ndevel\ndespite\nstrength\nturkey\nproper\ndegrees\ndelta\nseeking\ninches\nphoenix\nshares\ndaughter\nstanding\ncomfort\ncolors\ncisco\nordering\nalpha\nappeal\ncruise\nbonus\nbookmark\nspecials\ndisney\nadobe\nsmoking\nbecomes\ndrives\nalabama\nimproved\ntrees\nachieve\ndress\ndealer\nnearby\ncarried\nhappen\nexposure\ngambling\nrefer\nmiller\noutdoors\nclothes\ncaused\nluxury\nbabes\nframes\nindeed\ncircuit\nlayer\nprinted\nremoval\neasier\nprinters\nadding\nkentucky\nmostly\ntaylor\nprints\nspend\nfactory\ninterior\nrevised\noptical\nrelative\namazing\nclock\nidentity\nsuites\nfeeling\nhidden\nvictoria\nserial\nrelief\nrevision\nratio\nplanet\ncopies\nrecipe\npermit\nseeing\nproof\ntennis\nbedroom\nempty\ninstance\nlicensed\norlando\nbureau\nmaine\nideal\nspecs\nrecorded\npieces\nfinished\nparks\ndinner\nlawyers\nsydney\nstress\ncream\ntrends\ndiscover\npatterns\nboxes\nhills\nfourth\nadvisor\naware\nwilson\nshape\nirish\nstations\nremains\ngreatest\nfirms\noperator\ngeneric\nusage\ncharts\nmixed\ncensus\nexist\nwheel\ntransit\ncompact\npoetry\nlights\ntracking\nangel\nkeeping\nattempt\nmatches\nwidth\nnoise\nengines\nforget\narray\naccurate\nstephen\nclimate\nalcohol\ngreek\nmanaging\nsister\nwalking\nexplain\nsmaller\nnewest\nhappened\nextent\nsharp\nlesbians\nexport\nmanagers\naircraft\nmodules\nsweden\nconflict\nversions\nemployer\noccur\nknows\ndescribe\nconcern\nbackup\ncitizens\nheritage\nholding\ntrouble\nspread\ncoach\nkevin\nexpand\naudience\nassigned\njordan\naffect\nvirgin\nraised\ndirected\ndealers\nsporting\nhelping\naffected\ntotally\nplate\nexpenses\nindicate\nblonde\nanderson\norganic\nalbums\ncheats\nguests\nhosted\ndiseases\nnevada\nthailand\nagenda\nanyway\ntracks\nadvisory\nlogic\ntemplate\nprince\ncircle\ngrants\nanywhere\natlantic\nedward\ninvestor\nleaving\nwildlife\ncooking\nspeaking\nsponsors\nrespond\nsizes\nplain\nentered\nlaunch\nchecking\ncosta\nbelgium\nguidance\ntrail\nsymbol\ncrafts\nhighway\nbuddy\nobserved\nsetup\nbooking\nglossary\nfiscal\nstyles\ndenver\nfilled\nchannels\nericsson\nappendix\nnotify\nblues\nportion\nscope\nsupplier\ncables\ncotton\nbiology\ndental\nkilled\nborder\nancient\ndebate\nstarts\ncauses\narkansas\nleisure\nlearned\nnotebook\nexplorer\nhistoric\nattached\nopened\nhusband\ndisabled\ncrazy\nupcoming\nbritain\nconcert\nscores\ncomedy\nadopted\nweblog\nlinear\nbears\ncarrier\nedited\nconstant\nmouth\njewish\nmeter\nlinked\nportland\nconcepts\nreflect\ndeliver\nwonder\nlessons\nfruit\nbegins\nreform\nalerts\ntreated\nmysql\nrelating\nassume\nalliance\nconfirm\nneither\nlewis\nhoward\noffline\nleaves\nengineer\nreplace\nchecks\nreached\nbecoming\nsafari\nsugar\nstick\nallen\nrelation\nenabled\ngenre\nslide\nmontana\ntested\nenhance\nexact\nbound\nadapter\nformal\nhockey\nstorm\nmicro\ncolleges\nlaptops\nshowed\neditors\nthreads\nsupreme\nbrothers\npresents\ndolls\nestimate\ncancel\nlimits\nweapons\npaint\ndelay\npilot\noutlet\nczech\nnovel\nultra\nwinner\nidaho\nepisode\npotter\nplays\nbulletin\nmodify\noxford\ntruly\nepinions\npainting\nuniverse\npatent\neating\nplanned\nwatching\nlodge\nmirror\nsterling\nsessions\nkernel\nstocks\nbuyers\njournals\njennifer\nantonio\ncharged\nbroad\ntaiwan\nchosen\ngreece\nswiss\nsarah\nclark\nterminal\nnights\nbehalf\nliquid\nnebraska\nsalary\nfoods\ngourmet\nguard\nproperly\norleans\nsaving\nempire\nresume\ntwenty\nnewly\nraise\nprepare\navatar\nillegal\nhundreds\nlincoln\nhelped\npremier\ntomorrow\ndecide\nconsent\ndrama\nvisiting\ndowntown\nkeyboard\ncontest\nbands\nsuitable\nmillions\nlunch\naudit\nchamber\nguinea\nfindings\nmuscle\nclicking\npolls\ntypical\ntower\nyours\nchicken\nattend\nshower\nsending\njason\ntonight\nholdem\nshell\nprovince\ncatholic\ngovernor\nseemed\nswimming\nspyware\nformula\nsolar\ncatch\npakistan\nreliable\ndoubt\nfinder\nunable\nperiods\ntasks\nattacks\nconst\ndoors\nsymptoms\nresorts\nbiggest\nmemorial\nvisitor\nforth\ninsert\ngateway\nalumni\ndrawing\nordered\nfighting\nhappens\nromance\nbruce\nsplit\nthemes\npowers\nheaven\npregnant\ntwice\nfocused\negypt\nbargain\ncellular\nnorway\nvermont\nasking\nblocks\nnormally\nhunting\ndiabetes\nshift\nbodies\ncutting\nsimon\nwriters\nmarks\nflexible\nloved\nmapping\nnumerous\nbirds\nindexed\nsuperior\nsaved\npaying\ncartoon\nshots\nmoore\ngranted\nchoices\ncarbon\nspending\nmagnetic\nregistry\ncrisis\noutlook\nmassive\ndenmark\nemployed\nbright\ntreat\nheader\npoverty\nformed\npiano\nsheets\npatrick\npuerto\ndisplays\nplasma\nallowing\nearnings\nmystery\njourney\ndelaware\nbidding\nrisks\nbanner\ncharter\nbarbara\ncounties\nports\ndreams\nblogger\nstands\nteach\noccurred\nrapid\nhairy\nreverse\ndeposit\nseminar\nlatina\nwheels\nspecify\ndutch\nformats\ndepends\nboots\nholds\nrouter\nconcrete\nediting\npoland\nfolder\nwomens\nupload\npulse\nvoting\ncourts\nnotices\ndetroit\nmetro\ntoshiba\nstrip\npearl\naccident\nresident\npossibly\nairline\nregard\nexists\nsmooth\nstrike\nflashing\nnarrow\nthreat\nsurveys\nsitting\nputting\nvietnam\ntrailer\ncastle\ngardens\nmissed\nmalaysia\nantique\nlabels\nwilling\nacting\nheads\nstored\nlogos\nantiques\ndensity\nhundred\nstrange\nmention\nparallel\nhonda\namended\noperate\nbills\nbathroom\nstable\nopera\ndoctors\nlesson\ncinema\nasset\ndrinking\nreaction\nblank\nenhanced\nentitled\nsevere\ngenerate\ndeluxe\nhumor\nmonitors\nlived\nduration\npursuant\nfabric\nvisits\ntight\ndomains\ncontrast\nflying\nberlin\nsiemens\nadoption\nmeant\ncapture\npounds\nbuffalo\nplane\ndesire\ncamping\nmeets\nwelfare\ncaught\nmarked\ndriven\nmeasured\nmedline\nbottle\nmarshall\nmassage\nrubber\nclosing\ntampa\nthousand\nlegend\ngrace\nsusan\nadams\npython\nmonster\nvilla\ncolumns\nhamilton\ncookies\ninner\ntutorial\nentity\ncruises\nholder\nportugal\nlawrence\nroman\nduties\nvaluable\nethics\nforever\ndragon\ncaptain\nimagine\nbrings\nheating\nscripts\nstereo\ntaste\ndealing\ncommit\nairlines\nliberal\nlivecam\ntrips\nsides\nturns\ncache\njacket\noracle\nmatthew\nlease\naviation\nhobbies\nproud\nexcess\ndisaster\nconsole\ncommands\ngiant\nachieved\ninjuries\nshipped\nseats\nalarm\nvoltage\nanthony\nnintendo\nusual\nloading\nstamps\nappeared\nfranklin\nangle\nvinyl\nmining\nongoing\nworst\nimaging\nbetting\nliberty\nwyoming\nconvert\nanalyst\ngarage\nexciting\nthongs\nringtone\nfinland\nmorgan\nderived\npleasure\nhonor\noriented\neagle\ndesktops\npants\ncolumbus\nnurse\nprayer\nquiet\npostage\nproducer\ncheese\ncomic\ncrown\nmaker\ncrack\npicks\nsemester\nfetish\napplies\ncasinos\nsmoke\napache\nfilters\ncraft\napart\nfellow\nblind\nlounge\ncoins\ngross\nstrongly\nhilton\nproteins\nhorror\nfamiliar\ncapable\ndouglas\ndebian\nepson\nelected\ncarrying\nvictory\nmadison\neditions\nmainly\nethnic\nactor\nfinds\nfifth\ncitizen\nvertical\nprize\noccurs\nabsolute\nconsists\nanytime\nsoldiers\nguardian\nlecture\nlayout\nclassics\nhorses\ndirty\nwayne\ndonate\ntaught\nworker\nalive\ntemple\nprove\nwings\nbreaks\ngenetic\nwaters\npromise\nprefer\nridge\ncabinet\nmodem\nharris\nbringing\nevaluate\ntiffany\ntropical\ncollect\ntoyota\nstreets\nvector\nshaved\nturning\nbuffer\npurple\nlarry\nmutual\npipeline\nsyntax\nprison\nskill\nchairs\neveryday\nmoves\ninquiry\nethernet\nchecked\nexhibit\nthrow\ntrend\nsierra\nvisible\ndesert\noldest\nrhode\nmercury\nsteven\nhandbook\nnavigate\nworse\nsummit\nvictims\nspaces\nburning\nescape\ncoupons\nsomewhat\nreceiver\ncialis\nboats\nglance\nscottish\narcade\nrichmond\nrussell\ntells\nobvious\nfiber\ngraph\ncovering\nplatinum\njudgment\nbedrooms\ntalks\nfiling\nfoster\nmodeling\npassing\nawarded\ntrials\ntissue\nclinton\nmasters\nbonds\nalberta\ncommons\nfraud\nspectrum\narrival\npottery\nemphasis\nroger\naspect\nawesome\nmexican\ncounts\npriced\ncrash\ndesired\ninter\ncloser\nassumes\nheights\nshadow\nriding\nfirefox\nexpense\ngrove\nventure\nclinic\nkorean\nhealing\nprincess\nentering\npacket\nspray\nstudios\nbuttons\nfunded\nthompson\nwinners\nextend\nroads\ndublin\nrolling\nmemories\nnelson\narrived\ncreates\nfaces\ntourist\nmayor\nmurder\nadequate\nsenator\nyield\ngrades\ncartoons\ndigest\nlodging\nhence\nentirely\nreplaced\nradar\nrescue\nlosses\ncombat\nreducing\nstopped\nlakes\nclosely\ndiary\nkings\nshooting\nflags\nbaker\nlaunched\nshock\nwalls\nabroad\nebony\ndrawn\narthur\nvisited\nwalker\nsuggests\nbeast\noperated\ntargets\noverseas\ndodge\ncounsel\npizza\ninvited\nyards\ngordon\nfarmers\nqueries\nukraine\nabsence\nnearest\ncluster\nvendors\nwhereas\nserves\nwoods\nsurprise\npartial\nshoppers\ncouples\nranking\njokes\nsimpson\ntwiki\nsublime\npalace\nverify\nglobe\ntrusted\ncopper\ndicke\nkerry\nreceipt\nsupposed\nordinary\nnobody\nghost\napplying\npride\nknowing\nreporter\nkeith\nchampion\ncloudy\nlinda\nchile\nplenty\nsentence\nthroat\nignore\nmaria\nuniform\nwealth\nvacuum\ndancing\nbrass\nwrites\nplaza\noutcomes\nsurvival\nquest\npublish\ntrans\njonathan\nwhenever\nlifetime\npioneer\nbooty\nacrobat\nplates\nacres\nvenue\nathletic\nthermal\nessays\nvital\ntelling\nfairly\ncoastal\nconfig\ncharity\nexcel\nmodes\ncampbell\nstupid\nharbor\nhungary\ntraveler\nsegment\nrealize\nenemy\npuzzle\nrising\naluminum\nwells\nwishlist\nopens\ninsight\nsecrets\nlucky\nlatter\nthick\ntrailers\nrepeat\nsyndrome\nphilips\npenalty\nglasses\nenables\niraqi\nbuilder\nvista\njessica\nchips\nterry\nflood\narena\npupils\nstewart\noutcome\nexpanded\ncasual\ngrown\npolish\nlovely\nextras\ncentres\njerry\nclause\nsmile\nlands\ntroops\nindoor\nbulgaria\narmed\nbroker\ncharger\nbelieved\ncooling\ntrucks\ndivorce\nlaura\nshopper\ntokyo\npartly\nnikon\ncandy\npills\ntiger\ndonald\nfolks\nsensor\nexposed\ntelecom\nangels\ndeputy\nsealed\nloaded\nscenes\nboost\nspanking\nfounded\nchronic\nicons\nmoral\ncatering\nfinger\nkeeps\npound\nlocate\ntrained\nroses\nbread\ntobacco\nwooden\nmotors\ntough\nroberts\nincident\ngonna\ndynamics\ndecrease\nchest\npension\nbilly\nrevenues\nemerging\nworship\ncraig\nherself\nchurches\ndamages\nreserves\nsolve\nshorts\nminority\ndiverse\njohnny\nrecorder\nfacing\nnancy\ntones\npassion\nsight\ndefence\npatches\nrefund\ntowns\ntrembl\ndivided\nemails\ncyprus\ninsider\nseminars\nmakers\nhearts\nworry\ncarter\nlegacy\npleased\ndanger\nvitamin\nwidely\nphrase\ngenuine\nraising\nparadise\nhybrid\nreads\nroles\nglory\nbigger\nbilling\ndiesel\nversus\ncombine\nexceed\nsaudi\nfault\nbabies\nkaren\ncompiled\nromantic\nrevealed\nalbert\nexamine\njimmy\ngraham\nbristol\nmargaret\ncompaq\nslowly\nrugby\nportions\ninfant\nsectors\nsamuel\nfluid\ngrounds\nregards\nunlike\nequation\nbaskets\nwright\nbarry\nproven\ncached\nwarren\nstudied\nreviewer\ninvolves\nprofits\ndevil\ngrass\ncomply\nmarie\nflorist\ncherry\ndeutsch\nkenya\nwebcam\nfuneral\nnutten\nearrings\nenjoyed\nchapters\ncharlie\nquebec\ndennis\nfrancis\nsized\nmanga\nnoticed\nsocket\nsilent\nliterary\nsignals\ntheft\nswing\nsymbols\nhumans\nanalog\nfacial\nchoosing\ntalent\ndated\nseeker\nwisdom\nshoot\nboundary\npackard\noffset\npayday\nphilip\nelite\nholders\nbelieves\nswedish\npoems\ndeadline\nrobot\nwitness\ncollins\nequipped\nstages\nwinds\npowder\nbroadway\nacquired\nassess\nstones\nentrance\ngnome\nroots\nlosing\nattempts\ngadgets\nnoble\nglasgow\nimpacts\ngospel\nshore\nloves\ninduced\nknight\nloose\nlinking\nappeals\nearned\nillness\nislamic\npending\nparker\nlebanon\nkennedy\nteenage\ntriple\ncooper\nvincent\nsecured\nunusual\nanswered\nslots\ndisorder\nroutine\ntoolbar\nrocks\ntitans\nwearing\nsought\ngenes\nmounted\nhabitat\nfirewall\nmedian\nscanner\nherein\nanimated\njudicial\ninteger\nbachelor\nattitude\nengaged\nfalling\nbasics\nmontreal\ncarpet\nstruct\nlenses\nbinary\ngenetics\nattended\ndropped\nwalter\nbesides\nhosts\nmoments\natlas\nstrings\nfeels\ntorture\ndeleted\nmitchell\nralph\nwarner\nembedded\ninkjet\nwizard\ncorps\nactors\nliver\nliable\nbrochure\nmorris\npetition\neminem\nrecall\nantenna\npicked\nassumed\nbelief\nkilling\nbikini\nmemphis\nshoulder\ndecor\nlookup\ntexts\nharvard\nbrokers\ndiameter\nottawa\npodcast\nseasons\nrefine\nbidder\nsinger\nevans\nherald\nliteracy\nfails\naging\nplugin\ndiving\ninvite\nalice\nlatinas\nsuppose\ninvolve\nmoderate\nterror\nyounger\nthirty\nopposite\nrapidly\ndealtime\nintro\nmercedes\nclerk\nmills\noutline\ntramadol\nholland\nreceives\njeans\nfonts\nrefers\nfavor\nveterans\nsigma\nxhtml\noccasion\nvictim\ndemands\nsleeping\ncareful\narrive\nsunset\ntracked\nmoreover\nminimal\nlottery\nframed\naside\nlicence\nmichelle\nessay\ndialogue\ncamps\ndeclared\naaron\nhandheld\ntrace\ndisposal\nflorists\npacks\nswitches\nromania\nconsult\ngreatly\nblogging\ncycling\nmidnight\ncommonly\ninform\nturkish\npentium\nquantum\nmurray\nintent\nlargely\npleasant\nannounce\nspoke\narrow\nsampling\nrough\nweird\ninspired\nholes\nweddings\nblade\nsuddenly\noxygen\ncookie\nmeals\ncanyon\nmeters\nmerely\npasses\npointer\nstretch\ndurham\npermits\nmuslim\nsleeve\nnetscape\ncleaner\ncricket\nfeeding\nstroke\ntownship\nrankings\nrobin\nrobinson\nstrap\nsharon\ncrowd\nolympic\nremained\nentities\ncustoms\nrainbow\nroulette\ndecline\ngloves\nisraeli\nmedicare\nskiing\ncloud\nvalve\nhewlett\nexplains\nproceed\nflickr\nfeelings\nknife\njamaica\nshelf\ntiming\nliked\nadopt\ndenied\nfotos\nbritney\nfreeware\ndonation\nouter\ndeaths\nrivers\ntales\nkatrina\nislam\nnodes\nthumbs\nseeds\ncited\ntargeted\nskype\nrealized\ntwelve\nfounder\ndecade\ngamecube\ndispute\ntired\ntitten\nadverse\nexcerpt\nsteam\ndrinks\nvoices\nacute\nclimbing\nstood\nperfume\ncarol\nhonest\nalbany\nrestore\nstack\nsomebody\ncurve\ncreator\namber\nmuseums\ncoding\ntracker\npassage\ntrunk\nhiking\npierre\njelsoft\nheadset\noakland\ncolombia\nwaves\ncamel\nlamps\nsuicide\narchived\narabia\njuice\nchase\nlogical\nsauce\nextract\npanama\npayable\ncourtesy\nathens\njudges\nretired\nremarks\ndetected\ndecades\nwalked\narising\nnissan\nbracelet\njuvenile\nafraid\nacoustic\nrailway\ncassette\npointed\ncausing\nmistake\nnorton\nlocked\nfusion\nmineral\nsteering\nbeads\nfortune\ncanvas\nparish\nclaimed\nscreens\ncemetery\nplanner\ncroatia\nflows\nstadium\nfewer\ncoupon\nnurses\nproxy\nlanka\nedwards\ncontests\ncostume\ntagged\nberkeley\nvoted\nkiller\nbikes\ngates\nadjusted\nbishop\npulled\nshaped\nseasonal\nfarmer\ncounters\nslave\ncultures\nnorfolk\ncoaching\nexamined\nencoding\nheroes\npainted\nlycos\nzdnet\nartwork\ncosmetic\nresulted\nportrait\nethical\ncarriers\nmobility\nfloral\nbuilders\nstruggle\nschemes\nneutral\nfisher\nspears\nbedding\njoining\nheading\nequally\nbearing\ncombo\nseniors\nworlds\nguilty\nhaven\ntablet\ncharm\nviolent\nbasin\nranch\ncrossing\ncottage\ndrunk\ncrimes\nresolved\nmozilla\ntoner\nlatex\nbranches\nanymore\ndelhi\nholdings\nalien\nlocator\nbroke\nnepal\nzimbabwe\nbrowsing\nresolve\nmelissa\nmoscow\nthesis\nnylon\ndiscs\nrocky\nbargains\nfrequent\nnigeria\nceiling\npixels\nensuring\nhispanic\nanybody\ndiamonds\nfleet\nuntitled\nbunch\ntotals\nmarriott\nsinging\nafford\nstarring\nreferral\noptimal\ndistinct\nturner\nsucking\ncents\nreuters\nspoken\nomega\nstayed\ncivic\nmanuals\nwatched\nsaver\nthereof\ngrill\nredeem\nrogers\ngrain\nregime\nwanna\nwishes\ndepend\ndiffer\nranging\nmonica\nrepairs\nbreath\ncandle\nhanging\ncolored\nverified\nformerly\nsituated\nseeks\nherbal\nloving\nstrictly\nrouting\nstanley\nretailer\nvitamins\nelegant\ngains\nrenewal\nopposed\ndeemed\nscoring\nbrooklyn\nsisters\ncritics\nspots\nhacker\nmadrid\nmargin\nsolely\nsalon\nnorman\nturbo\nheaded\nvoters\nmadonna\nmurphy\nthinks\nthats\nsoldier\nphillips\naimed\njustin\ninterval\nmirrors\ntricks\nreset\nbrush\nexpansys\npanels\nrepeated\nassault\nspare\nkodak\ntongue\nbowling\ndanish\nmonkey\nfilename\nskirt\nflorence\ninvest\nhoney\nanalyzes\ndrawings\nscenario\nlovers\natomic\napprox\narabic\ngauge\njunction\nfaced\nrachel\nsolving\nweekends\nproduces\nchains\nkingston\nsixth\nengage\ndeviant\nquoted\nadapters\nfarms\nimports\ncheat\nbronze\nsandy\nsuspect\nmacro\nsender\ncrucial\nadjacent\ntuition\nspouse\nexotic\nviewer\nsignup\nthreats\npuzzles\nreaching\ndamaged\nreceptor\nlaugh\nsurgical\ndestroy\ncitation\npitch\nautos\npremises\nperry\nproved\nimperial\ndozen\nbenjamin\nteeth\ncloth\nstudying\nstamp\nlotus\nsalmon\nolympus\ncargo\nsalem\nstarter\nupgrades\nlikes\nbutter\npepper\nweapon\nluggage\nburden\ntapes\nzones\nraces\nstylish\nmaple\ngrocery\noffshore\ndepot\nkenneth\nblend\nharrison\njulie\nemission\nfinest\nrealty\njanet\napparent\nphpbb\nautumn\nprobe\ntoilet\nranked\njackets\nroutes\npacked\nexcited\noutreach\nhelen\nmounting\nrecover\nlopez\nbalanced\ntimely\ntalked\ndebug\ndelayed\nchuck\nexplicit\nvillas\nebook\nexclude\npeeing\nbrooks\nnewton\nanxiety\nbingo\nwhilst\nspatial\nceramic\nprompt\nprecious\nminds\nannually\nscanners\nxanax\nfingers\nsunny\nebooks\ndelivers\nnecklace\nleeds\ncedar\narranged\ntheaters\nadvocacy\nraleigh\nthreaded\nqualify\nblair\nhopes\nmason\ndiagram\nburns\npumps\nfootwear\nbeijing\npeoples\nvictor\nmario\nattach\nlicenses\nutils\nremoving\nadvised\nspider\nranges\npairs\ntrails\nhudson\nisolated\ncalgary\ninterim\nassisted\ndivine\napprove\nchose\ncompound\nabortion\ndialog\nvenues\nblast\nwellness\ncalcium\nnewport\nindians\nshield\nharvest\nmembrane\nprague\npreviews\nlocally\npickup\nmothers\nnascar\niceland\ncandles\nsailing\nsacred\nmorocco\nchrome\ntommy\nrefused\nbrake\nexterior\ngreeting\necology\noliver\ncongo\nbotswana\ndelays\nolive\ncyber\nverizon\nscored\nclone\nvelocity\nlambda\nrelay\ncomposed\ntears\noasis\nbaseline\nangry\nsilicon\ncompete\nlover\nbelong\nhonolulu\nbeatles\nrolls\nthomson\nbarnes\nmalta\ndaddy\nferry\nrabbit\nseating\nexports\nomaha\nelectron\nloads\nheather\npassport\nmotel\nunions\ntreasury\nwarrant\nsolaris\nfrozen\noccupied\nroyalty\nscales\nrally\nobserver\nsunshine\nstrain\nceremony\nsomehow\narrested\nyamaha\nhebrew\ngained\ndying\nlaundry\nstuck\nsolomon\nplacing\nstops\nhomework\nadjust\nassessed\nenabling\nfilling\nimposed\nsilence\nfocuses\nsoviet\ntreaty\nvocal\ntrainer\norgan\nstronger\nvolumes\nadvances\nlemon\ntoxic\ndarkness\nbizrate\nvienna\nimplied\nstanford\npacking\nstatute\nrejected\nsatisfy\nshelter\nchapel\ngamespot\nlayers\nguided\nbahamas\npowell\nmixture\nbench\nrider\nradius\nlogging\nhampton\nborders\nbutts\nbobby\nsheep\nrailroad\nlectures\nwines\nnursery\nharder\ncheapest\ntravesti\nstuart\nsalvador\nsalad\nmonroe\ntender\npaste\nclouds\ntanzania\npreserve\nunsigned\nstaying\neaster\ntheories\npraise\njeremy\nvenice\nestonia\nveteran\nstreams\nlanding\nsigning\nexecuted\nkatie\nshowcase\nintegral\nrelax\nnamibia\nsynopsis\nhardly\nprairie\nreunion\ncomposer\nsword\nabsent\nsells\necuador\nhoping\naccessed\nspirits\ncoral\npixel\nfloat\ncolin\nimported\npaths\nbubble\nacquire\ncontrary\ntribune\nvessel\nacids\nfocusing\nviruses\ncheaper\nadmitted\ndairy\nadmit\nfancy\nequality\nsamoa\nstickers\nleasing\nlauren\nbeliefs\nsquad\nanalyze\nashley\nscroll\nrelate\nwages\nsuffer\nforests\ninvalid\nconcerts\nmartial\nmales\nretain\nexecute\ntunnel\ngenres\ncambodia\npatents\nchaos\nwheat\nbeaver\nupdating\nreadings\nkijiji\nconfused\ncompiler\neagles\nbases\naccused\nunity\nbride\ndefines\nairports\nbegun\nbrunette\npackets\nanchor\nsocks\nparade\ntrigger\ngathered\nessex\nslovenia\nnotified\nbeaches\nfolders\ndramatic\nsurfaces\nterrible\nrouters\npendant\ndresses\nbaptist\nhiring\nclocks\nfemales\nwallace\nreflects\ntaxation\nfever\ncuisine\nsurely\nmyspace\ntheorem\nstylus\ndrums\narnold\nchicks\ncattle\nradical\nrover\ntreasure\nreload\nflame\nlevitra\ntanks\nassuming\nmonetary\nelderly\nfloating\nbolivia\nspell\nhottest\nstevens\nkuwait\nemily\nalleged\ncompile\nwebster\nstruck\nplymouth\nwarnings\nbridal\nannex\ntribal\ncurious\nfreight\nrebate\nmeetup\neclipse\nsudan\nshuttle\nstunning\ncycles\naffects\ndetect\nactively\nampland\nfastest\nbutler\ninjured\npayroll\ncookbook\ncourier\nuploaded\nhints\ncollapse\namericas\nunlikely\ntechno\nbeverage\ntribute\nwired\nelvis\nimmune\nlatvia\nforestry\nbarriers\nrarely\ninfected\nmartha\ngenesis\nbarrier\nargue\ntrains\nmetals\nbicycle\nletting\narise\nceltic\nthereby\njamie\nparticle\nminerals\nadvise\nhumidity\nbottles\nboxing\nbangkok\nhughes\njeffrey\nchess\noperates\nbrisbane\nsurvive\noscar\nmenus\nreveal\ncanal\namino\nherbs\nclinics\nmanitoba\nmissions\nwatson\nlying\ncostumes\nstrict\nsaddam\ndrill\noffense\nbryan\nprotest\nhobby\ntries\nnickname\ninline\nwashing\nstaffing\ntrick\nenquiry\nclosure\ntimber\nintense\nplaylist\nshowers\nruling\nsteady\nstatutes\nmyers\ndrops\nwider\nplugins\nenrolled\nsensors\nscrew\npublicly\nhourly\nblame\ngeneva\nfreebsd\nreseller\nhanded\nsuffered\nintake\ninformal\ntucson\nheavily\nswingers\nfifty\nheaders\nmistakes\nuncle\ndefining\ncounting\nassure\ndevoted\njacob\nsodium\nrandy\nhormone\ntimothy\nbrick\nnaval\nmedieval\nbridges\ncaptured\nthehun\ndecent\ncasting\ndayton\nshortly\ncameron\ncarlos\ndonna\nandreas\nwarrior\ndiploma\ncabin\ninnocent\nscanning\nvalium\ncopying\ncordless\npatricia\neddie\nuganda\nfired\ntrivia\nadidas\nperth\ngrammar\nsyria\ndisagree\nklein\nharvey\ntires\nhazard\nretro\ngregory\nepisodes\nboolean\ncircular\nanger\nmainland\nsuits\nchances\ninteract\nbizarre\nglenn\nauckland\nolympics\nfruits\nribbon\nstartup\nsuzuki\ntrinidad\nkissing\nhandy\nexempt\ncrops\nreduces\ngeometry\nslovakia\nguild\ngorgeous\ncapitol\ndishes\nbarbados\nchrysler\nnervous\nrefuse\nextends\nmcdonald\nreplica\nplumbing\nbrussels\ntribe\ntrades\nsuperb\ntrinity\nhandled\nlegends\nfloors\nexhaust\nshanghai\nspeaks\nburton\ndavidson\ncopied\nscotia\nfarming\ngibson\nroller\nbatch\norganize\nalter\nnicole\nlatino\nghana\nedges\nmixing\nhandles\nskilled\nfitted\nharmony\nasthma\ntwins\ntriangle\namend\noriental\nreward\nwindsor\nzambia\nhydrogen\nwebshots\nsprint\nchick\nadvocate\ninputs\ngenome\nescorts\nthong\nmedal\ncoaches\nvessels\nwalks\nknives\narrange\nartistic\nhonors\nbooth\nindie\nunified\nbones\nbreed\ndetector\nignored\npolar\nfallen\nprecise\nsussex\nmsgid\ninvoice\ngather\nbacked\nalfred\ncolonial\ncarey\nmotels\nforming\nembassy\ndanny\nrebecca\nslight\nproceeds\nindirect\namongst\nmsgstr\narrest\nadipex\nhorizon\ndeeply\ntoolbox\nmarina\nprizes\nbosnia\nbrowsers\npatio\nsurfing\nlloyd\noptics\npursue\novercome\nattract\nbrighton\nbeans\nellis\ndisable\nsnake\nsucceed\nleonard\nlending\nreminder\nsearched\nplains\nraymond\ninsights\nsullivan\nmidwest\nkaraoke\nlonely\nhereby\nobserve\njulia\nberry\ncollar\nracial\nbermuda\namanda\nmobiles\nkelkoo\nexhibits\nterrace\nbacteria\nreplied\nseafood\nnovels\nought\nsafely\nfinite\nkidney\nfixes\nsends\ndurable\nmazda\nallied\nthrows\nmoisture\nroster\nsymantec\nspencer\nwichita\nnasdaq\nuruguay\ntimer\ntablets\ntuning\ngotten\ntyler\nfutures\nverse\nhighs\nwanting\ncustody\nscratch\nlaunches\nellen\nrocket\nbullet\ntowers\nracks\nnasty\nlatitude\ntumor\ndeposits\nbeverly\nmistress\ntrustees\nwatts\nduncan\nreprints\nbernard\nforty\ntubes\nmidlands\npriest\nfloyd\nronald\nanalysts\nqueue\ntrance\nlocale\nnicholas\nbundle\nhammer\ninvasion\nrunner\nnotion\nskins\nmailed\nfujitsu\nspelling\narctic\nexams\nrewards\nbeneath\ndefend\nmedicaid\ninfrared\nseventh\nwelsh\nbelly\nquarters\nstolen\nsoonest\nhaiti\nnaturals\nlenders\nfitting\nfixtures\nbloggers\nagrees\nsurplus\nelder\nsonic\ncheers\nbelarus\nzoning\ngravity\nthumb\nguitars\nessence\nflooring\nethiopia\nmighty\nathletes\nhumanity\nholmes\nscholars\ngalaxy\nchester\nsnapshot\ncaring\nsegments\ndominant\ntwist\nitunes\nstomach\nburied\nnewbie\nminimize\ndarwin\nranks\ndebut\nbradley\nanatomy\nfraction\ndefects\nmilton\nmarker\nclarity\nsandra\nadelaide\nmonaco\nsettled\nfolding\nemirates\nairfare\nvaccine\nbelize\npromised\nvolvo\npenny\nrobust\nbookings\nminolta\nporter\njungle\nivory\nalpine\nandale\nfabulous\nremix\nalias\nnewer\nspice\nimplies\ncooler\nmaritime\nperiodic\noverhead\nascii\nprospect\nshipment\nbreeding\ndonor\ntension\ntrash\nshapes\nmanor\nenvelope\ndiane\nhomeland\nexcluded\nandrea\nbreeds\nrapids\ndisco\nbailey\nendif\nemotions\nincoming\nlexmark\ncleaners\neternal\ncashiers\nrotation\neugene\nmetric\nminus\nbennett\nhotmail\njoshua\narmenia\nvaried\ngrande\nclosest\nactress\nassign\ntigers\naurora\nslides\nmilan\npremiere\nlender\nvillages\nshade\nchorus\nrhythm\ndigit\nargued\ndietary\nsymphony\nclarke\nsudden\nmarilyn\nlions\nfindlaw\npools\nlyric\nclaire\nspeeds\nmatched\ncarroll\nrational\nfighters\nchambers\nwarming\nvocals\nfountain\nchubby\ngrave\nburner\nfinnish\ngentle\ndeeper\nmuslims\nfootage\nhowto\nworthy\nreveals\nsaints\ncarries\ndevon\nhelena\nsaves\nregarded\nmarion\nlobby\negyptian\ntunisia\noutlined\nheadline\ntreating\npunch\ngotta\ncowboy\nbahrain\nenormous\nkarma\nconsist\nbetty\nqueens\nlucas\ntribes\ndefeat\nclicks\nhonduras\nnaughty\nhazards\ninsured\nharper\nmardi\ntenant\ncabinets\ntattoo\nshake\nalgebra\nshadows\nholly\nsilly\nmercy\nhartford\nfreely\nmarcus\nsunrise\nwrapping\nweblogs\ntimeline\nbelongs\nreadily\nfence\nnudist\ninfinite\ndiana\nensures\nlindsay\nlegally\nshame\ncivilian\nfatal\nremedy\nrealtors\nbriefly\ngenius\nfighter\nflesh\nretreat\nadapted\nbarely\nwherever\nestates\ndemocrat\nborough\nfailing\nretained\npamela\nandrews\nmarble\njesse\nlogitech\nsurrey\nbriefing\nbelkin\nhighland\nmodular\nbrandon\ngiants\nballoon\nwinston\nsolved\nhawaiian\ngratuit\nconsoles\nqatar\nmagnet\nporsche\ncayman\njaguar\nsheer\nposing\nhopkins\nurgent\ninfants\ngothic\ncylinder\nwitch\ncohen\npuppy\nkathy\ngraphs\nsurround\nrevenge\nexpires\nenemies\nfinances\naccepts\nenjoying\npatrol\nsmell\nitaliano\ncarnival\nroughly\nsticker\npromises\ndivide\ncornell\nsatin\ndeserve\nmailto\npromo\nworried\ntunes\ngarbage\ncombines\nbradford\nphrases\nchelsea\nboring\nreynolds\nspeeches\nreaches\nschema\ncatalogs\nquizzes\nprefix\nlucia\nsavannah\nbarrel\ntyping\nnerve\nplanets\ndeficit\nboulder\npointing\nrenew\ncoupled\nmyanmar\nmetadata\nharold\ncircuits\nfloppy\ntexture\nhandbags\nsomerset\nincurred\nantigua\nthunder\ncaution\nlocks\nnamely\neuros\npirates\naerial\nrebel\norigins\nhired\nmakeup\ntextile\nnathan\ntobago\nindexes\nhindu\nlicking\nmarkers\nweights\nalbania\nlasting\nwicked\nkills\nroommate\nwebcams\npushed\nslope\nreggae\nfailures\nsurname\ntheology\nnails\nevident\nwhats\nrides\nrehab\nsaturn\nallergy\ntwisted\nmerit\nenzyme\nzshops\nplanes\nedmonton\ntackle\ndisks\ncondo\npokemon\nambien\nretrieve\nvernon\nworldcat\ntitanium\nfairy\nbuilds\nshaft\nleslie\ncasio\ndeutsche\npostings\nkitty\ndrain\nmonte\nfires\nalgeria\nblessed\ncardiff\ncornwall\nfavors\npotato\npanic\nsticks\nleone\nexcuse\nreforms\nbasement\nonion\nstrand\nsandwich\nlawsuit\ncheque\nbanners\nreject\ncircles\nitalic\nbeats\nmerry\nscuba\npassive\nvalued\ncourage\nverde\ngazette\nhitachi\nbatman\nhearings\ncoleman\nanaheim\ntextbook\ndried\nluther\nfrontier\nsettle\nstopping\nrefugees\nknights\npalmer\nderby\npeaceful\naltered\npontiac\ndoctrine\nscenic\ntrainers\nsewing\nconclude\nmunich\ncelebs\npropose\nlighter\nadvisors\npavilion\ntactics\ntrusts\ntalented\nannie\npillow\nderek\nshorter\nharley\nrelying\nfinals\nparaguay\nsteal\nparcel\nrefined\nfifteen\nfears\npredict\nboutique\nacrylic\nrolled\ntuner\npeterson\nshannon\ntoddler\nflavor\nalike\nhomeless\nhorrible\nhungry\nmetallic\nblocked\nwarriors\ncadillac\nmalawi\nsagem\ncurtis\nparental\nstrikes\nlesser\nmarathon\npressing\ngasoline\ndressed\nscout\nbelfast\ndealt\nniagara\nwarcraft\ncharms\ncatalyst\ntrader\nbucks\ndenial\nthrown\nprepaid\nraises\nelectro\nbadge\nwrist\nanalyzed\nheath\nballot\nlexus\nvarying\nremedies\nvalidity\ntrustee\nweighted\nangola\nperforms\nplastics\nrealm\njenny\nhelmet\nsalaries\npostcard\nelephant\nyemen\ntsunami\nscholar\nnickel\nbuses\nexpedia\ngeology\ncoating\nwallet\ncleared\nsmilies\nboating\ndrainage\nshakira\ncorners\nbroader\nrouge\nyeast\nclearing\ncoated\nintend\nlouise\nkenny\nroutines\nhitting\nyukon\nbeings\naquatic\nreliance\nhabits\nstriking\npodcasts\nsingh\ngilbert\nferrari\nbrook\noutputs\nensemble\ninsulin\nassured\nbiblical\naccent\nmysimon\neleven\nwives\nambient\nutilize\nmileage\nprostate\nadaptor\nauburn\nunlock\nhyundai\npledge\nvampire\nangela\nrelates\nnitrogen\nxerox\nmerger\nsoftball\nfirewire\nnextel\nframing\nmusician\nblocking\nrwanda\nsorts\nvsnet\nlimiting\ndispatch\npapua\nrestored\narmor\nriders\nchargers\nremark\ndozens\nvaries\nrendered\npicking\nguards\nopenings\ncouncils\nkruger\npockets\ngranny\nviral\ninquire\npipes\nladen\naruba\ncottages\nrealtor\nmerge\nedgar\ndevelops\nchassis\ndubai\npushing\nfleece\npierce\nallan\ndressing\nsperm\nfilme\ncraps\nfrost\nsally\nyacht\ntracy\nprefers\ndrilling\nbreach\nwhale\ntomatoes\nbedford\nmustang\nclusters\nantibody\nmomentum\nwiring\npastor\ncalvin\nshark\nphases\ngrateful\nemerald\nlaughing\ngrows\ncliff\ntract\nballet\nabraham\nbumper\nwebpage\ngarlic\nhostels\nshine\nsenegal\nbanned\nwendy\nbriefs\ndiffs\nmumbai\nozone\nradios\ntariff\nnvidia\nopponent\npasta\nmuscles\nserum\nwrapped\nswift\nruntime\ninbox\nfocal\ndistant\ndecimal\npropecia\nsamba\nhostel\nemploy\nmongolia\npenguin\nmagical\nmiracle\nmanually\nreprint\ncentered\nyearly\nwound\nbelle\nwritings\nhamburg\ncindy\nfathers\ncharging\nmarvel\nlined\npetite\nterrain\nstrips\ngossip\nrangers\nrotary\ndiscrete\nbeginner\nboxed\ncubic\nsapphire\nkinase\nskirts\ncrawford\nlabeled\nmarking\nserbia\nsheriff\ngriffin\ndeclined\nguyana\nspies\nneighbor\nelect\nhighways\nthinkpad\nintimate\npreston\ndeadly\nbunny\nchevy\nrounds\nlongest\ntions\ndentists\nflyer\ndosage\nvariance\ncameroon\nbaking\nadaptive\ncomputed\nneedle\nbaths\nbrakes\nnirvana\ninvision\nsticky\ndestiny\ngenerous\nmadness\nemacs\nclimb\nblowing\nheated\njackie\nsparc\ncardiac\ndover\nadrian\nvatican\nbrutal\nlearners\ntoken\nseekers\nyields\nsuited\nnumeric\nskating\nkinda\naberdeen\nemperor\ndylan\nbelts\nblacks\neducated\nrebates\nburke\nproudly\ninserted\npulling\nbasename\nobesity\ncurves\nsuburban\ntouring\nclara\nvertex\ntomato\nandorra\nexpired\ntravels\nflush\nwaiver\nhayes\ndelight\nsurvivor\ngarcia\ncingular\nmoses\ncounted\ndeclare\njohns\nvalves\nimpaired\ndonors\njewel\nteddy\nteaches\nventures\nbufing\nstranger\ntragedy\njulian\ndryer\npainful\nvelvet\ntribunal\nruled\npensions\nprayers\nfunky\nnowhere\njoins\nwesley\nlately\nscary\nmattress\nmpegs\nbrunei\nlikewise\nbanana\nslovak\ncakes\nmixer\nremind\nsbjct\ncharming\ntooth\nannoying\nstays\ndisclose\naffair\ndrove\nwasher\nupset\nrestrict\nspringer\nbeside\nmines\nrebound\nlogan\nmentor\nfought\nbaghdad\nmetres\npencil\nfreeze\ntitled\nsphere\nratios\nconcord\nendorsed\nwalnut\nlance\nladder\nitalia\nliberia\nsherman\nmaximize\nhansen\nsenators\nworkout\nbleeding\ncolon\nlanes\npurse\noptimize\nstating\ncaroline\nalign\nbless\nengaging\ncrest\ntriumph\nwelding\ndeferred\nalloy\ncondos\nplots\npolished\ngently\ntulsa\nlocking\ncasey\ndraws\nfridge\nblanket\nbloom\nsimpsons\nelliott\nfraser\njustify\nblades\nloops\nsurge\ntrauma\ntahoe\nadvert\npossess\nflashers\nsubaru\nvanilla\npicnic\nsouls\narrivals\nspank\nhollow\nvault\nsecurely\nfioricet\ngroove\npursuit\nwires\nmails\nbacking\nsleeps\nblake\ntravis\nendless\nfigured\norbit\nniger\nbacon\nheater\ncolony\ncannon\ncircus\npromoted\nforbes\nmoldova\npaxil\nspine\ntrout\nenclosed\ncooked\nthriller\ntransmit\napnic\nfatty\ngerald\npressed\nscanned\nhunger\nmariah\njoyce\nsurgeon\ncement\nplanners\ndisputes\ntextiles\nmissile\nintranet\ncloses\ndeborah\nmarco\nassists\ngabriel\nauditor\naquarium\nviolin\nprophet\nbracket\nisaac\noxide\nnaples\npromptly\nmodems\nharmful\nprozac\nsexually\ndividend\nnewark\nglucose\nphantom\nplayback\nturtle\nwarned\nneural\nfossil\nhometown\nbadly\napollo\npersian\nhandmade\ngreene\nrobots\ngrenada\nscoop\nearning\nmailman\nsanyo\nnested\nsomalia\nmovers\nverbal\nblink\ncarlo\nworkflow\nnovelty\nbryant\ntiles\nvoyuer\nswitched\ntamil\ngarmin\nfuzzy\ngrams\nrichards\nbudgets\ntoolkit\nrender\ncarmen\nhardwood\nerotica\ntemporal\nforge\ndense\nbrave\nawful\nairplane\nistanbul\nimpose\nviewers\nasbestos\nmeyer\nenters\nsavage\nwillow\nresumes\nthrowing\nexisted\nwagon\nbarbie\nknock\npotatoes\nthorough\npeers\nroland\noptimum\nquilt\ncreature\nmounts\nsyracuse\nrefresh\nwebcast\nmichel\nsubtle\nnotre\nmaldives\nstripes\nfirmware\nshepherd\ncanberra\ncradle\nmambo\nflour\nsympathy\nchoir\navoiding\nblond\nexpects\njumping\nfabrics\npolymer\nhygiene\npoultry\nvirtue\nburst\nsurgeons\nbouquet\npromotes\nmandate\nwiley\ncorpus\njohnston\nfibre\nshades\nindices\nadware\nzoloft\nprisoner\ndaisy\nhalifax\nultram\ncursor\nearliest\ndonated\nstuffed\ninsects\ncrude\nmorrison\nmaiden\nexamines\nviking\nmyrtle\nbored\ncleanup\nbother\nbudapest\nknitting\nattacked\nbhutan\nmating\ncompute\nredhead\narrives\ntractor\nallah\nunwrap\nfares\nresist\nhoped\nsafer\nwagner\ntouched\ncologne\nwishing\nranger\nsmallest\nnewman\nmarsh\nricky\nscared\ntheta\nmonsters\nasylum\nlightbox\nrobbie\nstake\ncocktail\noutlets\narbor\npoison\n';
var $author$project$HangmanStyles$styledGenerateButton = A2(
	$rtfeldman$elm_css$Html$Styled$styled,
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(40)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$buttonMainColor)),
			$rtfeldman$elm_css$Css$color(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
			A4(
			$rtfeldman$elm_css$Css$padding4,
			$rtfeldman$elm_css$Css$pct(1),
			$rtfeldman$elm_css$Css$px(0),
			$rtfeldman$elm_css$Css$pct(1),
			$rtfeldman$elm_css$Css$px(0)),
			$rtfeldman$elm_css$Css$border(
			$rtfeldman$elm_css$Css$px(0)),
			A4(
			$rtfeldman$elm_css$Css$margin4,
			$rtfeldman$elm_css$Css$px(5),
			$rtfeldman$elm_css$Css$px(5),
			$rtfeldman$elm_css$Css$px(5),
			$rtfeldman$elm_css$Css$px(5)),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$px(20)),
			$rtfeldman$elm_css$Css$fontSize(
			$rtfeldman$elm_css$Css$px(24))
		]));
var $author$project$HangmanViews$phraseButtonsView = A2(
	$rtfeldman$elm_css$Html$Styled$div,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
					$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
					A4(
					$rtfeldman$elm_css$Css$padding4,
					$rtfeldman$elm_css$Css$px(2),
					$rtfeldman$elm_css$Css$px(2),
					$rtfeldman$elm_css$Css$px(2),
					$rtfeldman$elm_css$Css$px(2))
				]))
		]),
	_List_fromArray(
		[
			A2(
			$author$project$HangmanStyles$styledGenerateButton,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					A2($author$project$HangmanTypes$GenerateRandomTextIndex, $author$project$HangmanSourceTexts$sourceText, 5))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Randomly Generate Easy')
				])),
			A2(
			$author$project$HangmanStyles$styledGenerateButton,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					A2($author$project$HangmanTypes$GenerateRandomTextIndex, $author$project$HangmanSourceTexts$sourceText, 3))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Randomly Generate Medium')
				])),
			A2(
			$author$project$HangmanStyles$styledGenerateButton,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					A2($author$project$HangmanTypes$GenerateRandomTextIndex, $author$project$HangmanSourceTexts$longWords, 1))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Randomly Generate Hard')
				])),
			A2(
			$author$project$HangmanStyles$styledGenerateButton,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					A2($author$project$HangmanTypes$GenerateRandomTextIndex, $author$project$HangmanSourceTexts$mediumWords, 1))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Randomly Generate Very Hard')
				]))
		]));
var $author$project$HangmanTypes$SaveInputSoFar = function (a) {
	return {$: 'SaveInputSoFar', a: a};
};
var $rtfeldman$elm_css$Html$Styled$Attributes$id = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('id');
var $rtfeldman$elm_css$Html$Styled$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $rtfeldman$elm_css$Html$Styled$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $rtfeldman$elm_css$Html$Styled$Events$onInput = function (tagger) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$rtfeldman$elm_css$Html$Styled$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $rtfeldman$elm_css$Html$Styled$Events$targetValue)));
};
var $rtfeldman$elm_css$Html$Styled$input = $rtfeldman$elm_css$Html$Styled$node('input');
var $rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2(
			$rtfeldman$elm_css$Css$property,
			key,
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value])));
	});
var $rtfeldman$elm_css$Css$margin2 = $rtfeldman$elm_css$Css$prop2('margin');
var $rtfeldman$elm_css$Css$padding2 = $rtfeldman$elm_css$Css$prop2('padding');
var $author$project$HangmanStyles$styledInput = A2(
	$rtfeldman$elm_css$Html$Styled$styled,
	$rtfeldman$elm_css$Html$Styled$input,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(25)),
			A2(
			$rtfeldman$elm_css$Css$padding2,
			$rtfeldman$elm_css$Css$px(12),
			$rtfeldman$elm_css$Css$px(20)),
			A2(
			$rtfeldman$elm_css$Css$margin2,
			$rtfeldman$elm_css$Css$px(8),
			$rtfeldman$elm_css$Css$px(0)),
			$rtfeldman$elm_css$Css$border(
			$rtfeldman$elm_css$Css$px(0)),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$px(10)),
			$rtfeldman$elm_css$Css$color(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$buttonMainColor))
		]));
var $rtfeldman$elm_css$Html$Styled$Attributes$value = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('value');
var $author$project$HangmanViews$phraseInputView = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
						$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$px(24))
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Input Phrase')
					])),
				A2(
				$author$project$HangmanStyles$styledInput,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$id('input'),
						$rtfeldman$elm_css$Html$Styled$Attributes$type_('text'),
						$rtfeldman$elm_css$Html$Styled$Events$onInput($author$project$HangmanTypes$SaveInputSoFar),
						$rtfeldman$elm_css$Html$Styled$Attributes$value(model.inputField)
					]),
				_List_Nil)
			]));
};
var $rtfeldman$elm_css$Css$sansSerif = {fontFamily: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'sans-serif'};
var $rtfeldman$elm_css$Css$alignSelf = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignSelf',
		'align-self',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Html$Styled$form = $rtfeldman$elm_css$Html$Styled$node('form');
var $rtfeldman$elm_css$Css$height = $rtfeldman$elm_css$Css$prop1('height');
var $rtfeldman$elm_css$Css$paddingBottom = $rtfeldman$elm_css$Css$prop1('padding-bottom');
var $author$project$HangmanColors$wallpaperColor = '#05272d';
var $author$project$HangmanStyles$styledForm = A2(
	$rtfeldman$elm_css$Html$Styled$styled,
	$rtfeldman$elm_css$Html$Styled$form,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$px(25)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$wallpaperColor)),
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(100)),
			$rtfeldman$elm_css$Css$height(
			$rtfeldman$elm_css$Css$pct(100)),
			$rtfeldman$elm_css$Css$alignSelf($rtfeldman$elm_css$Css$center),
			$rtfeldman$elm_css$Css$paddingBottom(
			$rtfeldman$elm_css$Css$pct(2))
		]));
var $rtfeldman$elm_css$Html$Styled$h1 = $rtfeldman$elm_css$Html$Styled$node('h1');
var $author$project$HangmanViews$titleView = A2(
	$rtfeldman$elm_css$Html$Styled$div,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
					$rtfeldman$elm_css$Css$fontSize(
					$rtfeldman$elm_css$Css$px(18))
				]))
		]),
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$h1,
			_List_Nil,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Hangman Game')
				]))
		]));
var $author$project$Hangman$view = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$color(
						$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
						$rtfeldman$elm_css$Css$fontFamily($rtfeldman$elm_css$Css$sansSerif)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$author$project$HangmanStyles$styledForm,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onSubmit($author$project$HangmanTypes$SaveHangmanPhrase)
					]),
				_List_fromArray(
					[
						$author$project$HangmanViews$titleView,
						$author$project$HangmanViews$phraseInputView(model),
						$author$project$HangmanViews$gameButtonsView,
						$author$project$HangmanViews$phraseButtonsView,
						$author$project$HangmanViews$characterButtonsView(model),
						$author$project$HangmanViews$hangmanPhraseView(model),
						$author$project$HangmanViews$hangmanArtView(model)
					]))
			]));
};
var $author$project$Hangman$main = $elm$browser$Browser$element(
	{
		init: $author$project$HangmanModels$init,
		subscriptions: function (_v0) {
			return $elm$core$Platform$Sub$none;
		},
		update: $author$project$Hangman$update,
		view: A2($elm$core$Basics$composeR, $author$project$Hangman$view, $rtfeldman$elm_css$Html$Styled$toUnstyled)
	});
_Platform_export({'Hangman':{'init':$author$project$Hangman$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));