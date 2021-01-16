CID=$(ipfs add -r -H ./packages -Q) 
URL="http://[::1]:8080/ipfs/$CID"


#  curl -X GET "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/?type=TXT" \
#      -H "Authorization: Bearer $BBTOKEN" \
#      -H "Content-Type: application/json" 
#      --data  $(CID=$BCID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink","content": "dnslink=/ipfs/"+process.env["CID"],"ttl":1,"proxied":false})') &)

#rm -rf docs/code/$(cat code.CID)
#mkdir -p docs/code
#cp -ar packages/code docs/code/$CID
#echo  $(CID=$CID node -pe 'JSON.stringify({"cid": process.env["CID"]})') >packages/code/ipfs.json

echo $CID >code.CID

echo $URL  

(firefox  $URL)&
#################################
echo #################################### 
 curl -X PUT "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/7545e99c94fd6ff43cc0591bab13cbe1" \
     -H "Authorization: Bearer $BBTOKEN" \
     -H "Content-Type: application/json" \
     --data  $(CID=$CID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink.ipfs","content": "dnslink=/ipfs/"+process.env["CID"],"ttl":1,"proxied":false})')

# echo "----  https://zed.vision -------" 
# echo "-------------------------------------------------------------" 
# echo "-------------------------------------------------------------" 


# curl -X PUT "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/82dce0cb0b0d63ed28bfc429e829c4e9" \
#      -H "Authorization: Bearer $BBTOKEN" \
#      -H "Content-Type: application/json" \
#      --data  $(CID=$CID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink.code","content": "dnslink=/ipfs/"+process.env["CID"],"ttl":1,"proxied":false})')


# echo "-------------------------------------------------------------" 



