curl -X PUT "https://api.cloudflare.com/client/v4/zones/1f98921051196545ebe79a450d3c71ed/dns_records/372e67954025e0ba6aaa6d586b9e0b59" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Content-Type: application/json" \
     --data '{"type":"A","name":"example.com","content":"127.0.0.1","ttl":120,"proxied":false}'