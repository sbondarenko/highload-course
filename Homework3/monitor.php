<?php
declare(strict_types=1);

require_once "vendor/autoload.php";

use GuzzleHttp\Client;
use TheIconic\Tracking\GoogleAnalytics\Analytics;

while (true){
    sleep(1);
    sendToGa(getLastIrreversibleBlockId());
}

function sendToGa(string $blockId): void {
    $analytics = new Analytics(true);

    $analytics
        ->setProtocolVersion('1')
        ->setTrackingId('UA-187106689-1')
        ->setEventCategory('Last irreversible block')
        ->setEventAction($blockId)
        ->setEventValue(1)
        ->setClientId(random_int(1,1000))
        ;

    $analytics->sendEvent();
}

function getLastIrreversibleBlockId(): string{
    $response = (new Client())->get('https://wax.cryptolions.io/v1/chain/get_info');

    return json_decode($response->getBody()->getContents(), true)['last_irreversible_block_id'];
}