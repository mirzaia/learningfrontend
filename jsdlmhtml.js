<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>																																	
<title>Belajar Javascript</title>
	<script>
		var nilai="epiphone";
		function test() {
			var nilai = "fender";
			var nilai_lokal = "gibson";
			tanpa_var = "no scope"; // karena gak pake var jd global variabel
			console.log(nilai);
		}

		test(); // untuk print var yg lokal (fender & gibson)
		console.log(nilai); // untuk print var yg global (epiphone)
		console.log(tanpa_var); // bisa diakses langsung karena bukan variabel function, dia variabel global (no scope)
		console.log(nilai_lokal); // akan menghasilkan error. karena console.log(variabel) hanya untuk menampilkan variabel yg sifatnya global, bukan lokal
	</script>
</head>
<body>
<h1> Belajar JAVASCRIPT</h1>
<p> Sedang belajar JAVASCRIPT</p>

</body>
</html>