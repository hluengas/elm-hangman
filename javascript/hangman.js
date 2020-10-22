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
var $author$project$HangmanSourceTexts$sourceText = '\nIn a village of La Mancha, the name of which I have no desire to call\nto mind, there lived not long since one of those gentlemen that keep a\nlance in the lance-rack, an old buckler, a lean hack, and a greyhound\nfor coursing. An olla of rather more beef than mutton, a salad on most\nnights, scraps on Saturdays, lentils on Fridays, and a pigeon or so\nextra on Sundays, made away with three-quarters of his income. The rest\nof it went in a doublet of fine cloth and velvet breeches and shoes to\nmatch for holidays, while on week-days he made a brave figure in his\nbest homespun. He had in his house a housekeeper past forty, a niece\nunder twenty, and a lad for the field and market-place, who used to\nsaddle the hack as well as handle the bill-hook. The age of this\ngentleman of ours was bordering on fifty; he was of a hardy habit,\nspare, gaunt-featured, a very early riser and a great sportsman. They\nwill have it his surname was Quixada or Quesada (for here there is some\ndifference of opinion among the authors who write on the subject),\nalthough from reasonable conjectures it seems plain that he was called\nQuexana. This, however, is of but little importance to our tale; it\nwill be enough not to stray a hair’s breadth from the truth in the\ntelling of it.\n\nYou must know, then, that the above-named gentleman whenever he was at\nleisure (which was mostly all the year round) gave himself up to\nreading books of chivalry with such ardour and avidity that he almost\nentirely neglected the pursuit of his field-sports, and even the\nmanagement of his property; and to such a pitch did his eagerness and\ninfatuation go that he sold many an acre of tillageland to buy books of\nchivalry to read, and brought home as many of them as he could get. But\nof all there were none he liked so well as those of the famous\nFeliciano de Silva’s composition, for their lucidity of style and\ncomplicated conceits were as pearls in his sight, particularly when in\nhis reading he came upon courtships and cartels, where he often found\npassages like “_the reason of the unreason with which my reason is\nafflicted so weakens my reason that with reason I murmur at your\nbeauty;” or again, “the high heavens, that of your divinity divinely\nfortify you with the stars, render you deserving of the desert your\ngreatness deserves_.” Over conceits of this sort the poor gentleman\nlost his wits, and used to lie awake striving to understand them and\nworm the meaning out of them; what Aristotle himself could not have\nmade out or extracted had he come to life again for that special\npurpose. He was not at all easy about the wounds which Don Belianis\ngave and took, because it seemed to him that, great as were the\nsurgeons who had cured him, he must have had his face and body covered\nall over with seams and scars. He commended, however, the author’s way\nof ending his book with the promise of that interminable adventure, and\nmany a time was he tempted to take up his pen and finish it properly as\nis there proposed, which no doubt he would have done, and made a\nsuccessful piece of work of it too, had not greater and more absorbing\nthoughts prevented him.\n\nMany an argument did he have with the curate of his village (a learned\nman, and a graduate of Siguenza) as to which had been the better\nknight, Palmerin of England or Amadis of Gaul. Master Nicholas, the\nvillage barber, however, used to say that neither of them came up to\nthe Knight of Phœbus, and that if there was any that could compare with\n_him_ it was Don Galaor, the brother of Amadis of Gaul, because he had\na spirit that was equal to every occasion, and was no finikin knight,\nnor lachrymose like his brother, while in the matter of valour he was\nnot a whit behind him. In short, he became so absorbed in his books\nthat he spent his nights from sunset to sunrise, and his days from dawn\nto dark, poring over them; and what with little sleep and much reading\nhis brains got so dry that he lost his wits. His fancy grew full of\nwhat he used to read about in his books, enchantments, quarrels,\nbattles, challenges, wounds, wooings, loves, agonies, and all sorts of\nimpossible nonsense; and it so possessed his mind that the whole fabric\nof invention and fancy he read of was true, that to him no history in\nthe world had more reality in it. He used to say the Cid Ruy Diaz was a\nvery good knight, but that he was not to be compared with the Knight of\nthe Burning Sword who with one back-stroke cut in half two fierce and\nmonstrous giants. He thought more of Bernardo del Carpio because at\nRoncesvalles he slew Roland in spite of enchantments, availing himself\nof the artifice of Hercules when he strangled Antæus the son of Terra\nin his arms. He approved highly of the giant Morgante, because,\nalthough of the giant breed which is always arrogant and\nill-conditioned, he alone was affable and well-bred. But above all he\nadmired Reinaldos of Montalban, especially when he saw him sallying\nforth from his castle and robbing everyone he met, and when beyond the\nseas he stole that image of Mahomet which, as his history says, was\nentirely of gold. To have a bout of kicking at that traitor of a\nGanelon he would have given his housekeeper, and his niece into the\nbargain.\n\nIn short, his wits being quite gone, he hit upon the strangest notion\nthat ever madman in this world hit upon, and that was that he fancied\nit was right and requisite, as well for the support of his own honour\nas for the service of his country, that he should make a knight-errant\nof himself, roaming the world over in full armour and on horseback in\nquest of adventures, and putting in practice himself all that he had\nread of as being the usual practices of knights-errant; righting every\nkind of wrong, and exposing himself to peril and danger from which, in\nthe issue, he was to reap eternal renown and fame. Already the poor man\nsaw himself crowned by the might of his arm Emperor of Trebizond at\nleast; and so, led away by the intense enjoyment he found in these\npleasant fancies, he set himself forthwith to put his scheme into\nexecution.\n\nThe first thing he did was to clean up some armour that had belonged to\nhis great-grandfather, and had been for ages lying forgotten in a\ncorner eaten with rust and covered with mildew. He scoured and polished\nit as best he could, but he perceived one great defect in it, that it\nhad no closed helmet, nothing but a simple morion. This deficiency,\nhowever, his ingenuity supplied, for he contrived a kind of half-helmet\nof pasteboard which, fitted on to the morion, looked like a whole one.\nIt is true that, in order to see if it was strong and fit to stand a\ncut, he drew his sword and gave it a couple of slashes, the first of\nwhich undid in an instant what had taken him a week to do. The ease\nwith which he had knocked it to pieces disconcerted him somewhat, and\nto guard against that danger he set to work again, fixing bars of iron\non the inside until he was satisfied with its strength; and then, not\ncaring to try any more experiments with it, he passed it and adopted it\nas a helmet of the most perfect construction.\n\nHe next proceeded to inspect his hack, which, with more quartos than a\nreal and more blemishes than the steed of Gonela, that “_tantum pellis\net ossa fuit_,” surpassed in his eyes the Bucephalus of Alexander or\nthe Babieca of the Cid. Four days were spent in thinking what name to\ngive him, because (as he said to himself) it was not right that a horse\nbelonging to a knight so famous, and one with such merits of his own,\nshould be without some distinctive name, and he strove to adapt it so\nas to indicate what he had been before belonging to a knight-errant,\nand what he then was; for it was only reasonable that, his master\ntaking a new character, he should take a new name, and that it should\nbe a distinguished and full-sounding one, befitting the new order and\ncalling he was about to follow. And so, after having composed, struck\nout, rejected, added to, unmade, and remade a multitude of names out of\nhis memory and fancy, he decided upon calling him Rocinante, a name, to\nhis thinking, lofty, sonorous, and significant of his condition as a\nhack before he became what he now was, the first and foremost of all\nthe hacks in the world.\n\nHaving got a name for his horse so much to his taste, he was anxious to\nget one for himself, and he was eight days more pondering over this\npoint, till at last he made up his mind to call himself “Don Quixote,”\nwhence, as has been already said, the authors of this veracious history\nhave inferred that his name must have been beyond a doubt Quixada, and\nnot Quesada as others would have it. Recollecting, however, that the\nvaliant Amadis was not content to call himself curtly Amadis and\nnothing more, but added the name of his kingdom and country to make it\nfamous, and called himself Amadis of Gaul, he, like a good knight,\nresolved to add on the name of his, and to style himself Don Quixote of\nLa Mancha, whereby, he considered, he described accurately his origin\nand country, and did honour to it in taking his surname from it.\n\nSo then, his armour being furbished, his morion turned into a helmet,\nhis hack christened, and he himself confirmed, he came to the\nconclusion that nothing more was needed now but to look out for a lady\nto be in love with; for a knight-errant without love was like a tree\nwithout leaves or fruit, or a body without a soul. As he said to\nhimself, “If, for my sins, or by my good fortune, I come across some\ngiant hereabouts, a common occurrence with knights-errant, and\noverthrow him in one onslaught, or cleave him asunder to the waist, or,\nin short, vanquish and subdue him, will it not be well to have someone\nI may send him to as a present, that he may come in and fall on his\nknees before my sweet lady, and in a humble, submissive voice say, ‘I\nam the giant Caraculiambro, lord of the island of Malindrania,\nvanquished in single combat by the never sufficiently extolled knight\nDon Quixote of La Mancha, who has commanded me to present myself before\nyour Grace, that your Highness dispose of me at your pleasure’?” Oh,\nhow our good gentleman enjoyed the delivery of this speech, especially\nwhen he had thought of someone to call his Lady! There was, so the\nstory goes, in a village near his own a very good-looking farm-girl\nwith whom he had been at one time in love, though, so far as is known,\nshe never knew it nor gave a thought to the matter. Her name was\nAldonza Lorenzo, and upon her he thought fit to confer the title of\nLady of his Thoughts; and after some search for a name which should not\nbe out of harmony with her own, and should suggest and indicate that of\na princess and great lady, he decided upon calling her Dulcinea del\nToboso—she being of El Toboso—a name, to his mind, musical, uncommon,\nand significant, like all those he had already bestowed upon himself\nand the things belonging to him.\n';
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
var $rtfeldman$elm_css$Css$padding = $rtfeldman$elm_css$Css$prop1('padding');
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
			$rtfeldman$elm_css$Css$pct(10)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$correctColor)),
			$rtfeldman$elm_css$Css$color(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
			$rtfeldman$elm_css$Css$padding(
			$rtfeldman$elm_css$Css$px(15)),
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
			$rtfeldman$elm_css$Css$pct(10)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$wrongColor)),
			$rtfeldman$elm_css$Css$color(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
			$rtfeldman$elm_css$Css$padding(
			$rtfeldman$elm_css$Css$px(15)),
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
			$rtfeldman$elm_css$Css$pct(10)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$unGuessedColor)),
			$rtfeldman$elm_css$Css$color(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
			$rtfeldman$elm_css$Css$padding(
			$rtfeldman$elm_css$Css$px(15)),
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
var $rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $author$project$HangmanViews$characterButtonsView = function (model) {
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
			$author$project$HangmanHelpers$coloredCharacterButton(model),
			$author$project$HangmanSourceTexts$alphabet));
};
var $author$project$HangmanTypes$Reset = {$: 'Reset'};
var $author$project$HangmanTypes$RevealPhrase = {$: 'RevealPhrase'};
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
var $author$project$HangmanColors$buttonMainColor = '#3b7277';
var $rtfeldman$elm_css$Css$margin4 = $rtfeldman$elm_css$Css$prop4('margin');
var $author$project$HangmanStyles$styledButtonMain = A2(
	$rtfeldman$elm_css$Html$Styled$styled,
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(24)),
			$rtfeldman$elm_css$Css$backgroundColor(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$buttonMainColor)),
			$rtfeldman$elm_css$Css$color(
			$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor)),
			$rtfeldman$elm_css$Css$padding(
			$rtfeldman$elm_css$Css$px(15)),
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
			$author$project$HangmanStyles$styledButtonMain,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					A2($author$project$HangmanTypes$GenerateRandomTextIndex, $author$project$HangmanSourceTexts$sourceText, 5))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Generate Easy')
				])),
			A2(
			$author$project$HangmanStyles$styledButtonMain,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					A2($author$project$HangmanTypes$GenerateRandomTextIndex, $author$project$HangmanSourceTexts$sourceText, 3))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Generate Medium')
				])),
			A2(
			$author$project$HangmanStyles$styledButtonMain,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					A2($author$project$HangmanTypes$GenerateRandomTextIndex, $author$project$HangmanSourceTexts$longWords, 1))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Generate Hard')
				])),
			A2(
			$author$project$HangmanStyles$styledButtonMain,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					A2($author$project$HangmanTypes$GenerateRandomTextIndex, $author$project$HangmanSourceTexts$mediumWords, 1))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Generate Very Hard')
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
					$rtfeldman$elm_css$Css$px(32))
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
						$rtfeldman$elm_css$Css$hex($author$project$HangmanColors$textColor))
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