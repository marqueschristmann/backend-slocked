# Controle de acesso utilizando NodeMCU, RFID, MQTT e Banco de Dados MySQL


## Introdução

Este projeto possui como objetivo autenticar/autorizar usuários a partir de Tags RFID utilizando uma **SIMPLES** integração com Banco de Dados.

## Materiais utilizados

* NodeMCU;
* RFID: Rfid Mfrc522 Mifare;
* Jumpers;
* Tags RFID;
* Buzzer;
* Protoboard;

## Tecnologias utilizadas(bibliotecas, frameworks)

* Firmare NodeMCU
    * [rfid](https://github.com/miguelbalboa/rfid/);
    * [pubsubclient](https://github.com/knolleary/pubsubclient);
* Back-end Nodejs
    * [mqttjs](https://github.com/mqttjs/MQTT.js);
    * [promise](https://github.com/then/promise);
    * [request-promise](https://github.com/request/request-promise);
    * [express](https://github.com/expressjs/express);
    * [mysqljs](https://github.com/mysqljs/mysql);
    * [dotenv](https://github.com/motdotla/dotenv);

Basicamente as etapas abaixo serão feitas:

* 1º - Leitura do ID da tag rfid;
* 2º - Preparação da (payload)mensagem para envio;
* 3º - Envio da payload através do **protocolo MQTT**;
* 3º - O serviço do back-end estará na escuta do tópico referente;
* 4º - Recebida a payload(basicamente é o ID da tag), será efetuada uma consulta em nosso banco de dados;
* 5º - Depois da tag ser consultada, será feito uma verificação(condicional) se a mesma está **ativada** ou **desativada**;

## Como utilizar o projeto

* 1º - Não possui conta no Gihub? Então crie já a sua e comece partilhar seus projetos :) (opcional);
* 2º - Não deixe de me seguir no Github :p (opcional)
* 3º - Gostou do projeto? Deixe já seu **Star**;

## Organização do repositório

O repositório está organizado devido as responsabilidades que o mesmo oferece.

* database - script com a estrutura das tabelas do mysql;
* esp8266 - firmware para o nodemcu;
* server - referente ao back-end da aplicação. Neste caso terá 2 back-ends(poderá escolher 1 para seu uso);
    * nodejs

### Firmware NodeMCU

O firmware como dito, está localizado dentro da pasta *esp8266*, portanto, abra-o com a IDE do Arduino.

**OBS:** Lembre-se que você precisa ter 2 bibliotecas instaladas, ambas foram citadas no tópico *Tecnologias utilizadas*

Tendo o firmware já aberto, você terá que efetuar a mudança de algumas variáveis ao seu escopo. Como rede wifi, broker, tópicos.

Portanto se atente as seguintes variáveis:

```
SSID - nome de sua rede wifi
PASSWORD - senha de sua rede wifi
BROKER_MQTT - url do broker mqtt
BROKER_PORT - porta do broker mqtt
TOPIC_PING - topico utilizado para publicar o valor tag rfid
TOPIC_PONG - topico responsavel por receber o status da autenticação rfid
```

**OBS²** Um adendo ao broker utilizado. Este broker eu tenho implementado em minha VPS para uso pessoal. 
Você poderá utilizar, porém não garanto uma estabilidade 100% visto que toda hora estou testando algo novo :P.
A dica é ter seu próprio broker mosquitto em casa ou em alguma VPS.

#### NodeJS

Para começar, nada mais justo do que ter o NodeJS instalado, concorda? Para isso, entre no [site oficial](https://nodejs.org) e faça a instalação de acordo com seu Sistema Operacional. 

Num segundo momento, navegue até a pasta referente ao nodejs: **server/nodejs**.

Estando na pasta, você deverá efetuar alguns procedimentos iniciais, como instalar as dependências do projeto bem como configurar o acesso ao banco de dados, dentre outras configurações.

##### Instalando as dependências
 
Como gerenciador de dependências utilizei o [Yarn](https://yarnpkg.com/pt-BR/docs/install), caso ainda não o tenha, no link da citação terá os passos necessários.

Depois de instalado, basta rodar o comando **yarn**.

##### Configurando o arquivo .env

Para centralizar de uma forma bacana as variáveis de nosso ambiente, eu utilizei o **dotenv** para este fim.

Perceberás que na raiz do projeto, possui um arquivo **.env.example**, faça uma cópia dando o nome de **.env**.
Você verá esta estrutura:

```
APP_URL=http://127.0.0.1:3000/ // url base do webservice

DB_HOST=127.0.0.1 // ip/host do Mysql
DB_DATABASE=rfid // nome dado ao banco de dados
DB_USER=rfid // usuário do banco de dados
DB_PASS=rfid // senha do banco de dados

```

Depois de configurado, já está tudo pronto para subir nosso webservice.

Para isso, apenas rode o comando **yarn prod**(um alias do comando **node index**)

Se deu tudo certo, você terá acesso ao webservice rodando na url **127.0.0.1:3000/api**. No tópico **Endpoints**, será tratado de caso recurso disponível.


```

### Lista dos endpoints

* **users (/api/users)**
    * GET / - lista de usuários
    * GET /:id - busca de usuário por ID
    * POST / - cadastro de usuário
    * UPDATE /:id - atualização de usuário
    * DELETE /:id - remoção de usuário
* **tags (/api/tags)**
    * GET / - lista de tags
    * GET /:id - busca de tag por ID
    * GET /tag/:tag - busca de tag por nome
    * POST / - cadastro de tag
    * UPDATE /:id - atualização de tag
    * DELETE /:id - remoção de tag
* **access_log (/api/logs)**
    * GET / - lista de logs
    * GET /:id - busca de log por ID
    * POST / - cadastro de log
    * UPDATE /:id - atualização de log
    * DELETE /:id - remoção de log
    
   
## Referências


