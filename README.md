## Установка и запуск

### 1. Клонируйте репозиторий

```
git clone https://github.com/ReniX99/giga-cosmic.git
```

### 2. Создайте файл .env в корневой директории проекта
```ini
POSTGRES_DB='giga-cosmic'
POSTGRES_USER='postgres'
POSTGRES_PASSWORD='12345678'

REDIS_PASSWORD='12345678'
```

### 3. Создайте файл .env в директории apps/backend
```ini
PORT=3000
RATE_LIMIT_TTL=60000
RATE_LIMIT=10

DATABASE_URL="postgresql://postgres:12345678@postgres:5432/giga-cosmic?schema=public"

REDIS_URL="redis://:12345678@redis:6379"
CACHE_TTL=60000

ISS_URL="https://api.wheretheiss.at/v1/satellites/25544"
ISS_FETCH_INTERVAL=120000

OSDR_URL="https://visualization.osdr.nasa.gov/biodata/api/v2/datasets/?format=json"
OSDR_FETCH_INTERVAL=600000
OSDR_LIST_LIMIT=100

NASA_API_KEY="your_nas_api_key"
APOD_URL="https://api.nasa.gov/planetary/apod"
APOD_FETCH_INTERVAL=43200000

NEO_URL="https://api.nasa.gov/neo/rest/v1/feed"
NEO_FETCH_INTERVAL=7200000

DONKI_FLR_URL="https://api.nasa.gov/DONKI/FLR"
DONKI_CME_URL="https://api.nasa.gov/DONKI/CME"
DONKI_FETCH_INTERVAL=3600000

SPACEX_URL="https://api.spacexdata.com/v4/launches/next"
SPACEX_FETCH_INTERVAL=3600000

ASTRO_URL="https://api.astronomyapi.com/api/v2/bodies/events"
ASTRO_APP_ID="your_astro_app_id"
ASTRO_API_KEY="your_astro_api_key"
```

### 4. Создайте файл .env в директории apps/frontend
```ini
VITE_JWST_API_KEY='your_jwst_api_key'
```

### 6. Убедитесь, что у вас установлен Docker и Docker Compose

### 7. Запустите Docker Compose
```
docker compose up -d
```

Шлюз будет доступен по адресу: http://localhost:3000  

