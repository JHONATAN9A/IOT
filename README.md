# 🌱 Internet de las Cosas (IoT) para la Agricultura Colombiana

Este proyecto tiene como objetivo aplicar tecnologías de Internet de las Cosas (IoT) para mejorar procesos agrícolas en Colombia. Se centra en el monitoreo y control de temperatura mediante un sensor DHT11 y una placa ESP32, permitiendo la automatización de dispositivos (como una bombilla) con base en las lecturas de temperatura.

## 🔧 Descripción del Proyecto

El sistema está compuesto por los siguientes elementos:

- **Sensor DHT11**: Mide temperatura y humedad en tiempo real.
- **ESP32**: Recibe los datos del sensor y los transmite vía WiFi.
- **API REST**: Los datos se envían a una base de datos a través de un servicio RESTful.
- **Base de datos**: Almacena el histórico de temperaturas y estados del sistema.
- **Dashboard Web**: 
  - Visualiza gráficas con los datos registrados.
  - Permite encender o apagar el sistema remotamente desde la interfaz.
  - Controla manualmente la bombilla (actuador) desde el portal web.
 
## 🖼️ Interfaz de la Aplicación

![Interfaz Web](https://github.com/JHONATAN9A/IOT/blob/main/web/src/img/App.png?raw=true)

## 🧠 Tecnologías Utilizadas

- ESP32 (Microcontrolador)
- Sensor DHT11 (Temperatura y Humedad)
- Python (Backend/API REST)
- Chart.js (Visualización de datos)

## 🎯 Objetivo

Automatizar procesos en la agricultura mediante sensores y controladores, permitiendo la supervisión remota de condiciones ambientales y el control de sistemas eléctricos (como iluminación o riego), contribuyendo a una agricultura más eficiente y sostenible.
