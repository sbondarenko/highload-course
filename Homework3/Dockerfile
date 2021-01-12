FROM php:7.4-cli

RUN usermod -u 1001 www-data
RUN groupmod -g 1001 www-data

RUN apt-get update && apt-get install -y \
        git \
        unzip \
        wget \
        libpq-dev \
        zlib1g-dev \
        libzip-dev

#RUN docker-php-ext-install  zip bcmath sockets mysqli

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

CMD [ "php", "./monitor.php" ]

WORKDIR /var/www

COPY composer.json composer.json
COPY composer.lock composer.lock

COPY . /var/www

RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --prefer-dist \
    --no-interaction \
    --no-ansi \
    --no-scripts
