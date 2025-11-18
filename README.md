🌱 EnergySense — Monitoramento Inteligente de Energia com ESP32, MQTT e Node.js

O EnergySense é um sistema completo de telemetria de energia projetado para monitorar consumo elétrico em tempo real, gerar alertas e oferecer uma visão clara do uso energético em residências e empresas.

Este projeto combina ESP32, Node.js, MQTT, WebSockets, InfluxDB e Grafana, entregando uma solução moderna, escalável e pronta para produção.

🚀 Funcionalidades
🔌 Dispositivo ESP32

Leitura de corrente via sensor (ex: SCT-013).

Cálculo de potência instantânea.

Envio dos dados para o broker MQTT.

Reconexão automática em caso de perda de rede.

Versão 2.0: controle de carga via relé (liga/desliga remoto).

🌐 Backend Node.js

Recebe telemetria via MQTT.

Armazena dados no InfluxDB.

Envia dados em tempo real para o dashboard via WebSockets.

API REST para listar leituras históricas.

Endpoint para comando remoto (relé).

📊 Dashboard (Grafana)

Consumo instantâneo.

Histórico de 1h / 24h / semanal.

Alertas de sobrecarga.

Exibição de status da carga (ON/OFF).

📡 Arquitetura do Sistema
ESP32 → MQTT Broker → Backend Node.js → InfluxDB → Grafana
                                   ↘→ WebSockets → Dashboard Web/App

🧱 Tecnologias Utilizadas
Hardware

ESP32

Sensor de Corrente (SCT-013)

Módulo Relé 5V (versão 2.0)

Software

Node.js

Express.js

MQTT.js

InfluxDB 2.x

Grafana

WebSockets (Socket.IO)

📁 Estrutura do Projeto
EnergySense/
<br/>│
<br/>├── backend/
<br/>│   ├── src/
<br/>│   │   ├── mqtt/
<br/>│   │   ├── api/
<br/>│   │   ├── ws/
<br/>│   │   └── db/
<br/>│   ├── package.json
<br/>│   └── README.md
<br/>│
<br/>├── esp32/
<br/>│   └── energy_sense.ino
<br/>│
<br/>├── diagrams/
<br/>│   └── architecture.png
<br/>│
<br/>└── README.md

⚙️ Como Executar o Projeto
🔧 1. Configurar o ESP32

Instale a biblioteca PubSubClient.

Atualize o WiFi, o MQTT e defina o pino do relé.

Envie o firmware para o ESP32.

🖥️ 2. Configurar o Backend
cd backend
npm install
npm start

📊 3. Configurar Grafana

Adicione o InfluxDB como datasource.

Importe o dashboard incluso no projeto.

🔥 Versão 2.0 – Controle Inteligente via Relé

A nova versão traz:

Ligar/desligar cargas remotamente.

Automação por regras (ex: desligar quando ultrapassar limite).

API dedicada:

POST /relay/on
POST /relay/off

🧩 Utilização Real

O EnergySense pode ser usado para:

Monitorar consumo de residências, escritórios e racks.

Detectar picos elétricos.

Controlar cargas de forma remota.

Analisar tendências de energia com gráficos.

📬 Contato

Criado por Leandro Chagas
📧 leandrosrs2012@gmail.com

🔗 GitHub: chagasleandro
🔗 LinkedIn: leandro-chagas-
