# order-service-as-producer

## Prérequis

### Outils

Installer les outils suivants :

* [Git](https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Installation-de-Git)
* [Node.js](https://nodejs.org/fr/download/package-manager/)
* [Yarn](https://yarnpkg.com/getting-started/install)

### Variables d'environnement

Créer un fichier `.env` à la racine du projet. Vous pouvez prendre exemple sur `.env.example`.

## Installation

```bash
yarn install --frozen-lockfile
```

## Lancement

```bash
yarn start
```

## API

#### GET /v0/orders

200

```
[
    {
        "id": 1,
        "clientId": "r4ch0",
        "itemId": "brow",
        "quantity": 123,
        "status": "validated"
    },
    {
        "id": 2,
        "clientId": "r4cl0",
        "itemId": "coke",
        "quantity": 12,
        "status": "canceled"
    }
]
```

#### GET /v0/orders/{orderId}

200

```
{
    "id": 3,
    "clientId": "c4ss0",
    "itemId": "acid",
    "quantity": 55,
    "status": "validated"
}
```

#### POST /v0/orders

request body

```
{
    "clientId": "r4cl0",
    "item_id": "ice",
    "quantity": 3
}
```

201

```
{
    "clientId": "r4cl0",
    "itemId": "ice",
    "quantity": 3,
    "status": "pending",
    "id": 5
}
```

#### DELETE /v0/orders/{id}

204