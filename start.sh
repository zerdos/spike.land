CID=$(ipfs add -r ./packages/code -Q) 

URL="https://ipfs.zed.vision/ipfs/$CID"

echo $URL  

(firefox  $URL)&
#################################
echo #################################### 
 curl -X PUT "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/7545e99c94fd6ff43cc0591bab13cbe1" \
     -H "Authorization: Bearer $BBTOKEN" \
     -H "Content-Type: application/json" \
     --data  $(CID=$CID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink.x","content": "dnslink=/ipfs/"+process.env["CID"],"ttl":1,"proxied":false})')

echo "----  https://x.zed.vision -------" 
echo "-------------------------------------------------------------" 
echo "-------------------------------------------------------------" 


# BCID=$(docker-compose exec ipfs ipfs add -r /export/packages/zed-vision-site/public -Q)

BCID=$(ipfs add -r ./packages/zed-vision-site/public -Q)

#  curl -X GET "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/?type=TXT" \
#      -H "Authorization: Bearer $BBTOKEN" \
#      -H "Content-Type: application/json" 
#      --data  $(CID=$BCID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink","content": "dnslink=/ipfs/"+process.env["CID"],"ttl":1,"proxied":false})') &)



echo "-------------------------------------------------------------" 
echo $BCID
echo "-------------------------------------------------------------" 

curl -X PUT "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/82dce0cb0b0d63ed28bfc429e829c4e9" \
     -H "Authorization: Bearer $BBTOKEN" \
     -H "Content-Type: application/json" \
     --data  $(BCID=$BCID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink","content": "dnslink=/ipfs/"+process.env["BCID"],"ttl":1,"proxied":false})')


echo "-------------------------------------------------------------" 



