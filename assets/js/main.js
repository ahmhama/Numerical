var iter = 0;
var error = 100;
var xr = 0;
var xp1 = 0;

/*===================== compensation for values => X  =====================*/
const f = (x) => {
	var Compensation = document.getElementById('Compensation')
	var valueOfEquation = document.getElementById('hidden').innerText.toLowerCase();
	var scope = {
		x: x
	};
	var eqn = math.compile(valueOfEquation);
	var result = eqn.eval(scope);
	return result;
}
/*===================== compensation for values => X  =====================*/

/*===================== clear Table =====================*/
const clearTable = () => {
	document.getElementById('disp').getElementsByTagName('tbody')[0].innerHTML = '';
	var Compensation = document.getElementById('Compensation');
	Compensation.innerHTML = '';
}
/*===================== clear Table =====================*/

/*===================== bisection =====================*/
const bisection = (xl, xu, eps) => {
	var maxiter = document.getElementById('maxiter');
	error = 100;
	if (error >= eps && iter < maxiter.value) {
		xold = xr
		xr = (xl + xu) / 2;
		error = Math.abs((xr - xold) / xr) * 100;
		output_bisection(iter, xl, f(xl), xu, f(xu), xr, f(xr), error);
		iter++;
		if (f(xr) * f(xl) > 0) xl = xr;
		else if (f(xr) * f(xl) < 0) xu = xr;
		return bisection(xl, xu, eps);
	} else {
		var root = document.getElementById('root');
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(xr).toFixed(3) * 1 + '</span>';
		iter = 0;
		error = 100;
	}
}
/*===================== bisection =====================*/

/*===================== output_bisection =====================*/
const output_bisection = (iter, xl, fxl, xu, fxu, xr, fxr, error) => {
	var xlf = parseFloat(xl).toFixed(3) * 1;
	var xuf = parseFloat(xu).toFixed(3) * 1;
	var fxlf = parseFloat(f(xl)).toFixed(3) * 1;
	var fxuf = parseFloat(f(xu)).toFixed(3) * 1;
	var xrf = parseFloat(xr).toFixed(3) * 1;
	var fxrf = parseFloat(f(xr)).toFixed(3) * 1;
	var errorf = parseFloat(error).toFixed(3) * 1;
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0];
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + xlf + "</th><th>" + fxlf + "</th><th>" + xuf + "</th><th>"
		+ fxuf + "</th><th>" + xrf + "</th><th>" + fxrf + "</th><th>" + errorf + "</th></tr>";
}
/*===================== output_bisection =====================*/

/*===================== falseMethod =====================*/
const falseMethod = (xl, xu, eps) => {
	var maxiter = document.getElementById('maxiter');
	if (error >= eps && iter < maxiter.value) {
		xold = xr
		xr = xu - ((f(xu) * (xl - xu)) / (f(xl) - f(xu)));
		error = Math.abs((xr - xold) / xr) * 100;
		output_falseMethod(iter, xl, f(xl), xu, f(xu), xr, f(xr), error);
		iter++;
		if (f(xr) * f(xl) > 0) xl = xr;
		else if (f(xr) * f(xl) < 0) xu = xr;
		return falseMethod(xl, xu, eps);
	} else {
		var root = document.getElementById('root');
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(xr).toPrecision(5) * 1 + '</span>';
		iter = 0;
		error = 100;
	}

}
/*===================== falseMethod =====================*/

/*===================== output_falseMethod =====================*/
const output_falseMethod = (iter, xl, fxl, xu, fxu, xr, fxr, error) => {
	var xlf = parseFloat(xl).toFixed(3) * 1;
	var xuf = parseFloat(xu).toFixed(3) * 1;
	var fxlf = parseFloat(f(xl)).toFixed(3) * 1;
	var fxuf = parseFloat(f(xu)).toFixed(3) * 1;
	var xrf = parseFloat(xr).toFixed(3) * 1;
	var fxrf = parseFloat(f(xr)).toFixed(3) * 1;
	var errorf = parseFloat(error).toFixed(3) * 1;
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0];
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + xlf + "</th><th>" + fxlf + "</th><th>" + xuf + "</th><th>"
		+ fxuf + "</th><th>" + xrf + "</th><th>" + fxrf + "</th><th>" + errorf + "</th></tr>";
}
/*===================== output_falseMethod =====================*/

/*===================== fixedMethod =====================*/
const fixedMethod = (x0, eps) => {
	output_fixedMethod(iter, x0, error, f(x0));
	var maxiter = document.getElementById('maxiter');
	if (error >= eps && iter < maxiter.value) {
		xold = x0;
		++iter;
		xr = f(xold)
		error = Math.abs((xr - xold) / xr) * 100;
		return fixedMethod(f(x0), eps);
	} else {
		var root = document.getElementById('root');
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(x0).toPrecision(5) * 1 + '</span>';
		iter = 0;
		error = 100;
	}

}
/*===================== fixedMethod =====================*/

/*===================== output_fixedMethod =====================*/
const output_fixedMethod = (iter, x0, error, fxo) => {
	var x0f = parseFloat(x0).toFixed(3) * 1;
	var errorf = parseFloat(error).toFixed(3) * 1;
	var fxof = parseFloat(fxo).toFixed(3) * 1;
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0];
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + x0f + "</th><th>" + fxof + "</th><th>" + errorf + " %</th></th>";
}
/*===================== output_fixedMethod =====================*/

/*===================== newton =====================*/
const newton = (x0, eps) => {
	var maxiter = document.getElementById('maxiter');
	xp1 = x0 - (f(x0) / fD(x0));
	output_newton(iter, x0, f(x0), fD(x0), xp1, error);
	++iter;
	if (error >= eps && iter < maxiter.value) {
		error = Math.abs((xp1 - x0) / xp1) * 100;
		newton(xp1, eps);
	} else {
		var root = document.getElementById('root');
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(x0).toPrecision(5) * 1 + '</span>';
		iter = 0;
		error = 100;
	}
}
/*===================== newton =====================*/


/*===================== Derivative =====================*/
const fD = (xin) => {
	var MQ = MathQuill.getInterface(2);
	var Derivative = document.getElementById('Derivative');
	var expr = document.getElementById('hidden').innerText.toLowerCase();

	const x = xin;
	var scope = {
		x: xin
	};

	var eqn = math.compile(expr);
	var derv = math.derivative(expr, 'x')

	Derivative.innerHTML = derv;
	MQ.StaticMath(Derivative);

	var result = derv.eval(scope);
	return result;
}
/*===================== Derivative =====================*/

const output_newton = (iter, x0, fx0, fdx0, xp1, error) => {
	var x0f = parseFloat(x0).toFixed(3) * 1;
	var errorf = parseFloat(error).toFixed(3) * 1;
	var fxof = parseFloat(fx0).toFixed(3) * 1;
	var fdox = parseFloat(fdx0).toFixed(3) * 1;
	var xp1f = parseFloat(xp1).toFixed(3) * 1;
	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0];
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + x0f + "</th><th>" + fxof + "</th><th>" + fdox + "</th><th>" + xp1f + "</th><th>" + errorf + " %</th></th>";
}




const seCant = (xold, x0, eps) => {
	var maxiter = document.getElementById('maxiter');
	output_seCant(iter, xold, f(xold), x0, f(x0), error);
	++iter;
	if (error >= eps && iter < maxiter.value) {
		xnew = x0 - ((f(x0) * (xold - x0)) / (f(xold) - f(x0)));
		xold = x0;
		error = Math.abs((xnew - xold) / xnew) * 100;

		seCant(xold, xnew, eps);
	} else {
		var root = document.getElementById('root');
		root.innerHTML = '<span style="color:green;font-weight:bold">' + parseFloat(x0).toPrecision(5) * 1 + '</span>';
		iter = 0;
		error = 100;
	}
}

const output_seCant = (iter, xold, fxold, xnew, fxnew, error) => {
	var xoldf = parseFloat(xold).toFixed(3) * 1;
	var fxoldf = parseFloat(fxold).toFixed(3) * 1;
	var xnewf = parseFloat(xnew).toFixed(3) * 1;
	var fxnewf = parseFloat(fxnew).toFixed(3) * 1;
	var errorf = parseFloat(error).toFixed(3) * 1;

	var tbody = document.getElementById('disp').getElementsByTagName('tbody')[0];
	tbody.innerHTML = tbody.innerHTML + "<tr><th>" + iter + "</th><th>" + xoldf + "</th><th>" + fxoldf + "</th><th>" + xnewf + "</th><th>" + fxnewf + "</th><th>" + errorf + " %</th></th>";
}


const getelement = (rows, cols) => {
	var array = new Array(rows);
	for (let i = 0; i < cols; i++) {
		array[i] = new Array(cols);
	}
	return array;
}

const getmatrix = () => {
	var mymatrix = getelement(3, 4);
	mymatrix[0][0] = document.getElementById('a1').value;
	mymatrix[0][1] = document.getElementById('a2').value;
	mymatrix[0][2] = document.getElementById('a3').value;
	mymatrix[0][3] = document.getElementById('x1').value;
	mymatrix[1][0] = document.getElementById('b1').value;
	mymatrix[1][1] = document.getElementById('b2').value;
	mymatrix[1][2] = document.getElementById('b3').value;
	mymatrix[1][3] = document.getElementById('x2').value;
	mymatrix[2][0] = document.getElementById('c1').value;
	mymatrix[2][1] = document.getElementById('c2').value;
	mymatrix[2][2] = document.getElementById('c3').value;
	mymatrix[2][3] = document.getElementById('x3').value;
	return mymatrix;
}


const gauss = () => {

	var copyOfMatrix = getmatrix();
	var augMat = copyOfMatrix;

	var m21 = augMat[1][0] / augMat[0][0];
	var m31 = augMat[2][0] / augMat[0][0];

	for (i = 0; i < 4; i++) {
		augMat[1][i] -= m21 * augMat[0][i];
		augMat[2][i] -= m31 * augMat[0][i];
	}
	document.getElementById('outresult').innerHTML += '<p style="font-size:120%; font-weight:bold; text-align:left"> m<sub>21</sub> =  ' + m21 + '<br> R<sub>2</sub> - (m<sub>21</sub> )R<sub>1</sub> --> R<sub>2</sub> </p>';
	printMatrix(augMat, 3, 4);

	var m32 = augMat[2][1] / augMat[1][1];
	for (i = 0; i < 4; i++) {
		augMat[2][i] -= m32 * augMat[1][i];
	}
	document.getElementById('outresult').innerHTML += '<br> <p style="font-size:120%; font-weight:bold; text-align:left"> m<sub>32</sub> =  ' + m32 + '<br> R<sub>3</sub> - (m<sub>22</sub>)R<sub>2</sub> --> R<sub>3</sub> </p>';
	printMatrix(augMat, 3, 4);

	var x3 = augMat[2][3] / augMat[2][2];
	var x2 = (augMat[1][3] - (augMat[1][2] * x3)) / augMat[1][1];
	var x1 = (augMat[0][3] - (augMat[0][2] * x3) - (augMat[0][1] * x2)) / augMat[0][0];
	document.getElementById('resultsec').innerHTML += '<p style="font-size:120%; font-weight:bold;"> X1 = ' + x1 + " &nbsp ,&nbsp  X2 = " + x2 + " &nbsp ,&nbsp  X3 = " + x3 + "</p>";

}



const printMatrix = (matrix, rows, cols) => {

	var out = '<table class="brackts">';
	for (var i = 0; i < rows; i++) {
		out += "<tr>";
		for (var j = 0; j < cols; j++) {
			if ((cols == 4) && (j == cols - 1)) {
				out += "<td style='border: 1px solid #555555;'>" + matrix[i][j]; + "</td>";
			}
			else {
				out += "<td>" + matrix[i][j]; + "</td>";
			}
		}
		out += "</tr>";
	}
	document.getElementById('outresult').innerHTML += out + "</table>" + "<br>";

}

const clearout = () => {
	document.getElementById('resultsec').innerHTML = '';
	document.getElementById('outresult').innerHTML = '';
}


const LU = () => {

	var X = getmatrix();
	var augMat = X;

	var b = [augMat[0][3], augMat[1][3], augMat[2][3]];

	var m21 = augMat[1][0] / augMat[0][0];
	var m31 = augMat[2][0] / augMat[0][0];

	for (i = 0; i < 4; i++) {
		augMat[1][i] -= m21 * augMat[0][i];
		augMat[2][i] -= m31 * augMat[0][i];
	}

	var m32 = augMat[2][1] / augMat[1][1];
	for (i = 0; i < 4; i++) {
		augMat[2][i] -= m32 * augMat[1][i];
	}


	var x3 = augMat[2][3] / augMat[2][2];
	var x2 = (augMat[1][3] - (augMat[1][2] * x3)) / augMat[1][1];
	var x1 = (augMat[0][3] - (augMat[0][2] * x3) - (augMat[0][1] * x2)) / augMat[0][0];


	var U = getelement(3, 4);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			U[i][j] = augMat[i][j];
		}
	}


	U[1][0] = U[2][0] = U[2][1] = 0;
	var L = getelement(3, 4);
	L = [
		[1, 0, 0, 0],
		[m21, 1, 0, 0],
		[m31, m32, 1, 0]
	];

	document.getElementById('outresult').innerHTML += '<b>L = </b> <br>'; printMatrix(L, 3, 3);

	document.getElementById('outresult').innerHTML += '<b>U = </b> <br>'; printMatrix(U, 3, 3);


	var C = [[augMat[0][3]], [augMat[1][3]], [augMat[2][3]]];

	x3 = C[2] / U[2][2];
	x2 = (C[1] - (U[1][2] * x3)) / U[1][1];
	x1 = (C[0] - (U[0][1] * x2) - (U[0][2] * x3)) / U[0][0];
	document.getElementById('outresult').innerHTML += '<b>C = </b> <br>'; printMatrix(C, 3, 1);
	document.getElementById('resultsec').innerHTML += '<p style="font-size:120%; font-weight:bold;" > X1 = ' + x1 + " &nbsp ,&nbsp X2 = " + x2 + " &nbsp ,&nbsp X3 = " + x3 + "</p>";

}










function cramer() {
	function matrixDet() {
		return in_matrix[0][0] * (in_matrix[1][1] * in_matrix[2][2] - in_matrix[2][1] * in_matrix[1][2])
			- in_matrix[0][1] * (in_matrix[1][0] * in_matrix[2][2] - in_matrix[2][0] * in_matrix[1][2])
			+ in_matrix[0][2] * (in_matrix[1][0] * in_matrix[2][1] - in_matrix[2][0] * in_matrix[1][1]);
	}

	var X = getmatrix();
	var AA = getelement(3, 4);
	var in_matrix = getelement(3, 4);
	AA = in_matrix = X;

	document.getElementById('outresult').innerHTML += '<p style="font-size:120%; font-weight:bold;"> |A| = </p>';
	printMatrix(AA, 3, 3);

	var Adet = matrixDet(AA);
	console.log("A = " + Adet);
	for (let i = 0; i < 3; i++) {
		[AA[i][0], AA[i][3]] = [AA[i][3], AA[i][0]];
	}

	var A1det = matrixDet(AA);
	document.getElementById('outresult').innerHTML += '<p style="font-size:120%; font-weight:bold;"> |A1| = ' + A1det + '</p>';
	printMatrix(AA, 3, 3);
	console.log("A1 = " + A1det);
	for (let i = 0; i < 3; i++) {
		[AA[i][0], AA[i][3]] = [AA[i][3], AA[i][0]];
		[AA[i][1], AA[i][3]] = [AA[i][3], AA[i][1]];
	}


	var A2det = matrixDet(AA);

	document.getElementById('outresult').innerHTML += '<br> <p style="font-size:120%; font-weight:bold;"> |A2| = ' + A2det + '</p>';
	printMatrix(AA, 3, 3);
	console.log("A2 = " + A2det);
	for (let i = 0; i < 3; i++) {
		[AA[i][1], AA[i][3]] = [AA[i][3], AA[i][1]];
		[AA[i][2], AA[i][3]] = [AA[i][3], AA[i][2]];
	}


	var A3det = matrixDet(AA);

	document.getElementById('outresult').innerHTML += '<p style="font-size:120%; font-weight:bold;"> |A3| = ' + A3det + '</p>';
	printMatrix(AA, 3, 3);
	console.log("A3 = " + A3det);

	var x1 = (A1det / Adet);
	var x2 = (A2det / Adet);
	var x3 = (A3det / Adet);

	document.getElementById('resultsec').innerHTML += '<br> <p style="font-size:120%; font-weight:bold;" > X1 = ' + x1 + " &nbsp ,&nbsp X2 = " + x2 + " &nbsp ,&nbsp X3 = " + x3 + "</p>";


}











