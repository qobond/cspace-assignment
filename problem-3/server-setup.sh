# Create droplet
SERVER_INFO=$(curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer API_TOKEN" -d '{"name":"cognitive-space-test","region":"nyc3","size":"s-1vcpu-1gb","image":"ubuntu-18-04-x64","ssh_keys":[SSH_ID],"backups":false,"ipv6":true,"user_data":null,"private_networking":null,"volumes": null,"tags":["cognitive-space"]}' "https://api.digitalocean.com/v2/droplets")
echo "Server created"

# Get droplet ID
SERVER_ID=$(jq -r ".droplet.id" <<< ${SERVER_INFO})

# Get droplet info and status
SERVER_RESPONSE=$(curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer API_TOKEN" "https://api.digitalocean.com/v2/droplets/${SERVER_ID}")
SERVER_STATUS=$(jq -r ".droplet.status" <<< ${SERVER_RESPONSE})

# Wait until droplet is active
while [[ ${SERVER_STATUS} != "active" ]]; do
    SERVER_RESPONSE=$(curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer API_TOKEN" "https://api.digitalocean.com/v2/droplets/${SERVER_ID}")

    SERVER_STATUS=$(jq -r ".droplet.status" <<< ${SERVER_RESPONSE})
    echo "Waiting for server to be active"
    sleep 5
done

# Connect to and run updates
SERVER_IP=$(jq -r ".droplet.networks.v4[1].ip_address" <<< ${SERVER_RESPONSE})
echo "Conntecting to server"
ssh root@${SERVER_IP} sudo apt update -y && sudo apt upgrade -y

# Add server.py to droplet and run
scp -r ~/Desktop/server.py root@${SERVER_IP}:
echo ${SERVER_IP}
ssh root@${SERVER_IP} python3 server.py
