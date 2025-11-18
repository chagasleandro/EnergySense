# 🔋 EnergySense — IoT Energy Monitoring  
**Economia verde ao alcance de todos.**

EnergySense é uma plataforma IoT que coleta medições de energia em tempo real usando ESP32 e envia para um backend Java Spring Boot. O objetivo é ajudar famílias e comércios a economizar energia e reduzir desperdícios.

---

## 🚀 Tecnologias

- ESP32 (sensor de tensão e corrente)
- Java 17
- Spring Boot 3
- REST API
- MQTT opcional
- H2 Database

---

## 📡 Rotas Principais

### ➤ POST `/api/readings`
Envia leitura do ESP32:

```json
{
  "voltage": 127,
  "current": 2.3
}
