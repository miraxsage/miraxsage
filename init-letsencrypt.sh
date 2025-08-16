#!/bin/bash

#do 
#chmod +x init-letsencrypt.sh and sudo ./init-letsencrypt.sh
#to run this script at first deployment
#don't forget to change testing to 0

domains=(
    miraxsage.ru
    cosmic-front.miraxsage.ru
)
data_path="./data/certbot"
email="manin.maxim@mail.ru" # Adding a valid address is strongly recommended
testing=1 # Set to 1 if you're testing your setup to avoid hitting request limits and 0 otherwise to generate certs

rsa_key_size=4096

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Creating dummy certificates for all domains ..."
for domain in "${domains[@]}"; do
    echo "Creating dummy certificate for $domain ..."
    path="/etc/letsencrypt/live/$domain"
    mkdir -p "$data_path/conf/live/$domain"
    docker-compose run --rm --entrypoint "\
      openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
        -keyout '$path/privkey.pem' \
        -out '$path/fullchain.pem' \
        -subj '/CN=$domain'" certbot
done
echo

echo "### Starting nginx for certificate validation ..."
docker-compose up --force-recreate -d main
echo

echo "### Waiting for nginx to start ..."
sleep 10

echo "### Checking if nginx is accessible for Let's Encrypt ..."
for i in {1..30}; do
    if curl -s -f http://miraxsage.ru/ > /dev/null 2>&1; then
        echo "Nginx is accessible for certificate validation"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "Error: Nginx is not accessible after 30 attempts"
        echo "Checking nginx logs:"
        docker-compose logs main
        exit 1
    fi
    echo "Attempt $i/30: Nginx not ready yet, waiting..."
    sleep 2
done
echo

echo "### Deleting ALL previous old certificates for all domains ..."
for domain in "${domains[@]}"; do
    echo "Deleting ALL previous old certificates for $domain ..."
    rm -rf "$data_path/conf/live/$domain"
    rm -rf "$data_path/conf/archive/$domain"
    rm -f "$data_path/conf/renewal/$domain.conf"
    find "$data_path/conf/live" -name "$domain-*" -type d -exec rm -rf {} + 2>/dev/null || true
    find "$data_path/conf/archive" -name "$domain-*" -type d -exec rm -rf {} + 2>/dev/null || true
    find "$data_path/conf/renewal" -name "$domain-*.conf" -delete 2>/dev/null || true
done
echo

echo "### Requesting Let's Encrypt certificate for ${domains[*]} ..."
#Join $domains to -d args
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable testing mode if needed
if [ $testing != "0" ]; then staging_arg="--staging"; fi

docker-compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Starting all containers for production ..."
docker-compose up -d