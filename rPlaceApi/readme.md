Desafio RPlace
 
O objetivo é fazer um sistema similar ao RPlace famoso, para isso temos alguns requisitos:
- Autenticação
- Token JWT
 
Para a interatividade com os pixels teremos:
Ao todo uma matriz 300x300, portanto deve haver verificação para tentativa de input em um local inválido
Cada pixel terá:
- o último usuário a modificar o pixel
- cor
- posição em X
- posição em Y
- data da ultima modificação
 
Cada pixel so pode ser alterado no mínimo a cada 20 segundos
na tela principal fica amostra de todos os pixels em sequencia,
porem quando um pixel sofre um *hover* ele mostra os dados (owner e ultima modificação)
 
 
DATABASE:
user
	int id
	string username
	string password (hash) 
pixel
	int id
	int x
	int y
	string color
	int userId
 
 
API:
 
subscribe
	- username
	- password
login
updatePixel (futuramente WEBSOCKET)


Run command: 

dotnet run --urls "http://[IP]:5294"                        