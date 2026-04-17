# API Especificações 

## Autenticação

### Login

**POST**:
```
http://localhost:5294/api/auth/login
```
**body**
```
{
    "email": "string",
    "password": "string"
}
```

### Subscribe

**POST**:
```
http://localhost:5294/api/auth/subscribe
```
**body**
```
{
    "username": "string",
    "email": "string",
    "phone": "string"
    "birthday": "string"
    "password": "string"
}
```

## Contatos

### GetAllContacts
Pega todos os contatos que o usuário tem
**GET**
```
http://localhost:5294/api/contacts
```
**HEADER**
```{"Authorization":"token"}```

**RETORNO**
```
[
    {
        "id":"string",
        "phone":"string",
        "username":"string"
    }
]
```

### AddContact
Pega todos os contatos que o usuário tem
**POST**
```
http://localhost:5294/api/contacts
```
**HEADER**
```{"Authorization":"token"}```

**RETORNO**
```
{
    "phone":"string",
    "username":"string"
}
```


## Messagens

### GetAllMessages
Recebe TODAS as mensagens que o usuário tem relação seja ele o que envia ou o que recebe em todos os chats
**Get**: 
```
http://localhost:5294/api/messages
```

**HEADER**
```{"Authorization":"token"}```

**RETORNO** 
```
[
    {
        "id": "string",
        "sender": {
            "id": "string",
            "username": "string"
        },
        "receiver": {
            "id": "string",
            "username": "string"
        },
        "messageContent": "string"
    },
]
```


### GetMessagesByChat
Recebe as mensagens que o usuário tem relação seja ele o que envia ou o que recebe em um chat com um unico usuário existente
**Get**: 
```
http://localhost:5294/api/messages/{ContatoID}
```
**HEADER**
```{"Authorization":"token"}```

**RETORNO** 
```
[
    {
        "id": "string",
        "sender": {
            "id": "string",
            "username": "string"
        },
        "receiver": {
            "id": "string",
            "username": "string"
        },
        "messageContent": "string"
    },
]
```

### SendMessage
Recebe as mensagens que o usuário tem relação seja ele o que envia ou o que recebe em um chat com um unico usuário existente
**POST**: 
```
http://localhost:5294/api/messages
```
**HEADER**
```{"Authorization":"token"}```

**body** 
```
{
  "Receiver": {
    "Id":"string",
    "Username":"string"
  },
  "Message":"string"
}
```