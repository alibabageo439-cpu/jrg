<?php
// phishing_app/offer.php
$offer = file_get_contents('php://input');
file_put_contents('/tmp/offer.json', $offer);
?>
