# alias ipfs="ipfs || (docker-compose exec -T ipfs ipfs)"
rm -rf packages/code/js/workers/shaSums.json  packages/code/js/workers/fileCids.json
find ./packages/code -type f -exec sha256sum {} \; | grep -v node_modules | awk '{print "\"" substr($2,17) "\": \"" $1 "\","}' |  awk 'BEGIN{print "export const shasums = {"}{print $0}END{print " \"food\":\"bar\" }"}' > worker/src/shasums.ts;
deno fmt packages/code/js/workers/shaSums.json worker/src/shasums.ts;

#docker-compose exec -T ipfs 
ipfs add -r packages/code > ipfs.txt
cat ipfs.txt | awk '{print "\"" substr($3,6) "\": \"" $2 "\","}' | awk 'BEGIN{print "{"}{print $0}END{print " \"foo\":\"bar\" }"}' >  packages/code/js/workers/fileCids.json

CID=$(
    #docker-compose exec -T ipfs
    ipfs add -r packages/code -Q) 
URL="http://127.0.0.1:8080/ipfs/$CID"

#  curl -X GET "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/?type=TXT" \
#      -H "Authorization: Bearer $BBTOKEN" \
#      -H "Content-Type: application/json" 
#      --data  $(CID=$BCID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink","content": "dnslink=/ipfs/"+process.env["CID"],"ttl":1,"proxied":false})') &)

# rm -rf docs/code/$(cat code.CID)
# mkdir -p docs/code
# cp -ar packages/code docs/code/$CID
echo "export const cid = '$CID';" > worker/src/cid.ts
# echo  $(CID=$CID nocide -pe 'JSON.stringify({"cid": process.env["CID"]})') > worker/src/ipfs.json

#yarn jsipfs daemon &


echo $CID > code.CID
echo $URL

(xdg-open  $URL)&

# rm -rf cids/code
# mkdir -p cids
# ipfs add -r packages/code > files.txt

# | awk '{print "echo " $2 " > "$3 ";"}' >cids/commands.sh
cat ipfs.txt | awk '{print "\"" substr($3,6) "\": \"" $2 "\","}' | awk 'BEGIN{print "export const files = {"}{print $0}END{print " \"foo\":\"bar\" }"}' >  worker/src/files.ts
deno fmt worker/src/files.ts  worker/src/cid.ts


# cp -r packages/code cids/code
# cd cids && sh comma/nds.sh

#################################worker
# echo #################################### 
#  curl -X PUT "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/7545e99c94fd6ff43cc0591bab13cbe1" \
#      -H "Authorization: Bearer $BBTOKEN" \
#      -H "Content-Type: application/json" \
#      --data  $(CID=$CID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink.ipfs","content": "dnslink=/ipfs/"+process.env["CID"],"ttl":1,"proxied":false})')

# echo "----  https://spike.land -------" 
# echo "-------------------------------------------------------------" 
# echo "-------------------------------------------------------------" 


# curl -X PUT "https://api.cloudflare.com/client/v4/zones/ec8e903035c7b0fcd3e95f1e483ab68c/dns_records/82dce0cb0b0d63ed28bfc429e829c4e9" \
#      -H "Authorization: Bearer $BBTOKEN" \
#      -H "Content-Type: application/json" \
#      --data  $(CID=$CID node -pe 'JSON.stringify({"type":"TXT","name":"_dnslink.code","content": "dnslink=/ipfs/"+process.env["CID"],"ttl":1,"proxied":false})')


# echo "-------------------------------------------------------------" 
