# DSRPT21 - Animal Tracking

Sistema para monitoramento de informações de animais da Agropecuária.

Para melhor visualização do README.md recomendamos que acesse o github a seguir: https://github.com/GuHenrique/DSRPT21
### Dependencies and technologies used

#### Technologies
- nodeJS
- MongoDB

#### Dependencies
- express: ^4.17.1
- mongoose:^5.10.2
- jest: ^26.4.2
- eslint: ^7.7.0

#### What's in the project:
- Hermod-logger (for Express)
- EsLint
- Unit Tests with Jest




### How to execute

Instale o NodeJS v12.18.3 : https://nodejs.org/en/

abra a pasta DSRPT21 no terminal

Execute o comando abaixo para instalar as dependencias.
```
npm intall
```

Caso deseje executar teste pode ser executado os dois comandos abaixo separadamente.
```
npm run eslint //esse comando executa testes para erro de sintax

npm test //Esse comando executa TDD
```

Para iniciar o Servidor execute o comando abaixo:
 ```
 npm start
 ```


### To test the API

Instale o Insomnia : https://insomnia.rest/

Importe o arquivo "AnimalTracking API.json" no insomnia
Para importar seguir o Caminho abaixo:

Selecionar o menu APPLICATION (canto superior esquerdo) > PREFERENCES
Após abrir a janela selecionar a aba DATA e na sequencia IMPORT DATA e FROM FILE
Somente selecionar o arquivo "AnimalTracking API.json" que está na pasta DSRPT21 e confirmar.


Exemplos das APIs abaixo.


Criar um Animal na Lista: POST http://localhost:3333/animal
Enviar um Body do tipo JSON no formato abaixo.
```
{
	"code": 3,
	"notification": true,
	"type": "Bovino", 
	"infos": [
					{
						"weight": 900,
						"vaccines": [ 
													{
														"vaccines": "VAC122",
													 	"date": "10/11/2020"
													}
												]
					}
]
					 
} 
```

Pegar um animal pelo ID: GET http://localhost:3333/animal/CODIGO_DO_ANIMAL_AQUI
tras as informações de um animal especificamente.
para isso basta trocar o CODIGO_DO_ANIMAL_AQUI por um codigo que vc criou.
Ex:http://localhost:3333/animal/3

Pegar Todos os Animais: GET http://localhost:3333/animal
Retorna todos os annimais existentes no banco de dados.

Atualizar as informações de um animal: PATCH http://localhost:3333/animal
Enviar um Body do tipo JSON no formato abaixo.
```
{
	"code": 3,
	"infos": [
					{
						"weight": 955,
						"vaccines": [ 
													{
														"vaccines": "VAC122",
													 	"date": "10/11/2020"
													}
												]
					}
]					 
} 
```


Pegar todas as notificações disponíveis: GET http://localhost:3333/notifications
Retorna todas as Notificações de Todos os Animais.

Remover da lista de notificações: PATCH http://localhost:3333/notifications
Enviar um Body do tipo JSON no formato abaixo.
```
{"code": 3}
```

Status do Ambiente: GET http://localhost:3333/status
Retorna as informações basicas do ambiente.