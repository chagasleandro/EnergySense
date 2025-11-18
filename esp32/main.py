# main.py - EnergySense (MicroPython)
import machine
import time
import ubinascii
from umqtt.simple import MQTTClient

# ----- Config -----
MQTT_BROKER = '192.168.1.100'  # alterar para seu broker
MQTT_PORT = 1883
DEVICE_ID = ubinascii.hexlify(machine.unique_id()).decode()
MQTT_TOPIC = 'energysense/{}/power'.format(DEVICE_ID)
SENSOR_PIN = 34  # ADC pin
CALIBRATION = 1.0  # ajustar conforme sensor / burden
PUBLISH_INTERVAL = 5  # segundos

adc = machine.ADC(machine.Pin(SENSOR_PIN))
adc.atten(machine.ADC.ATTN_11DB)
adc.width(machine.ADC.WIDTH_12BIT)

client = MQTTClient(DEVICE_ID, MQTT_BROKER, port=MQTT_PORT)

def read_current():
    raw = adc.read()
    voltage = (raw / 4095.0) * 3.3
    # EXEMPLO: circuito com offset ~1.65V; ajuste para seu circuito
    current = (voltage - 1.65) * CALIBRATION
    return abs(current)

def main():
    try:
        client.connect()
    except Exception as e:
        print('MQTT connect error:', e)
        time.sleep(5)

    while True:
        current = read_current()
        payload = '{{"device_id":"{}","current":{:.4f},"timestamp":{}}}'.format(DEVICE_ID, current, int(time.time()))
        try:
            client.publish(MQTT_TOPIC, payload)
            print('Published', payload)
        except Exception as e:
            print('Publish error', e)
        time.sleep(PUBLISH_INTERVAL)

if __name__ == '__main__':
    main()
