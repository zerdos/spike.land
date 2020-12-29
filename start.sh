
BCID=$(docker-compose exec ipfs ipfs add -r /export/packages/zed-vision-site/public -Q)
echo $DATA
 (curl -X PUT "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/7545e99c94fd6ff43cc0591bab13cbe1" \
     -H "Authorization: Bearer $BBTOKEN" \
     -H "Content-Type: application/json" \
     --data  $(CID=$BCID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink","content": "dnslink=/ipfs/"+process.env["CID"],"ttl":1,"proxied":false})') &)


CID=$(docker-compose exec ipfs ipfs add -r /export/packages -Q) && firefox https://ipfs.io/ipfs/$CID &
echo $DATA &&
 curl -X PUT "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/7545e99c94fd6ff43cc0591bab13cbe1" \
     -H "Authorization: Bearer $BBTOKEN" \
     -H "Content-Type: application/json" \
     --data  $(CID=$CID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink.x","content": "dnslink=/ipfs/"+process.env["CID"],"ttl":1,"proxied":false})')

