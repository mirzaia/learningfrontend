<?php

// class, blueprint / struktur / rangka 
class gitar {
	
	// property, data / ciri-ciri yang ada di class
	var $senar ; 
	var $warna ;
	var $bahan ;
	var $merk ;
	var $suara ; 
	
	// method, tindakan yang dapat dilakukan sebuah class
	function mainkan_gitar() {
		return "mainkan gitar" ;
	} 
	function ganti_senar() {
		return "ganti senar" ;
	} 
	function petik_senar1() {	
		return "petik senar" ;
	} 
	
} 

// instansiasi, proses mencetak objek dari class
$gitar_mirza = new gitar() ; 


?>