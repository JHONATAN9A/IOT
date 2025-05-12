# 🌱 Internet de las Cosas (IoT) para la Agricultura Colombiana

Este proyecto tiene como objetivo aplicar tecnologías de Internet de las Cosas (IoT) para mejorar procesos agrícolas en Colombia. Se centra en el monitoreo y control de temperatura mediante un sensor DHT11 y una placa ESP32, permitiendo la automatización de dispositivos (como una bombilla) con base en las lecturas de temperatura.

## 🔧 Descripción del Proyecto

El sistema está compuesto por los siguientes elementos:

- **Sensor DHT11**: Mide temperatura y humedad en tiempo real.
- **ESP32**: Funciona como un servidor web local en la misma red, expone una API REST para el envío y consulta de datos.
- **API REST (en la ESP32)**: Permite registrar los datos del sensor y controlar la bombilla mediante peticiones HTTP desde el dashboard web.
- **Base de datos**: El dashboard puede almacenar los datos obtenidos de la ESP32 en una base de datos para su análisis histórico.
- **Dashboard Web**: 
  - Consulta y visualiza los datos en tiempo real desde la ESP32.
  - Permite encender o apagar el sistema remotamente desde la interfaz.
  - Controla manualmente la bombilla (actuador) desde el portal web.
  - Grafica los datos registrados (en caso de estar conectada a una base de datos).
 
![Interfaz Web](https://github.com/JHONATAN9A/IOT/blob/main/web/src/img/App.png?raw=true)

## 🧠 Tecnologías Utilizadas

- ESP32 (Microcontrolador, servidor local con API REST)
- Sensor DHT11 (Temperatura y Humedad)
- HTML/CSS + JavaScript + React.js (Frontend/Dashboard)
- Chart.js o similar (Visualización de datos)
- MongoDB (opcional, para almacenamiento persistente)
- Node.js + Express (opcional, si se quiere conectar a una API centralizada)

## 🎯 Objetivo

Automatizar procesos en la agricultura mediante sensores y controladores, permitiendo la supervisión remota de condiciones ambientales y el control de sistemas eléctricos (como iluminación o riego), contribuyendo a una agricultura más eficiente y sostenible.
