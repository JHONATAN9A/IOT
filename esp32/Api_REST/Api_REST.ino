//Librerias API REST
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

//Librerias sensor  DHT
#include "DHT.h"
#define DHTPIN 15
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

//Credenciales para conexion a wifi
//const char *SSID = "DAGA";
//const char *PWD = "Paco*130721";
const char *SSID = "Esp32";
const char *PWD = "qwertyui";

//Asignar port al servidor
WebServer server(80);

//Inciciar conexion a la red wifi
void OnConexionWIFI(){
  Serial.print("Conectando a ");
  Serial.println(SSID);

  //Inciar conexion al wifi
  WiFi.begin(SSID, PWD);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.print("\n Conectado a la IP: ");
  Serial.println(WiFi.localIP());
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//DATA SENSORES
//////////////////////////////////////////////////////////////////////////////////////////////////

//Apagar y encender el sistema
void OnOffSistema(String estado){
  if(estado=="Encender"){
    digitalWrite (2, HIGH);
    Serial.print("\n Encendido ");
  }
  if(estado=="Apagar"){
    digitalWrite (2, LOW);
    Serial.print("\n Apagado");
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//DATOS SENSOR DE HUMEDAD Y TEMPERATURA
//////////////////////////////////////////////////////////////////////////////////////////////////
float DHTDataSensor(){
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  return t;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//INFO API REST 
//////////////////////////////////////////////////////////////////////////////////////////////////

//Variables estaticas
int temperatura = 20;

//Json buffer datos
StaticJsonDocument<250> jsonDocument;
char buffer[250];

//Crear Json con determinada info
void Json(char *variable, float valor, char *unidades) {  
  jsonDocument.clear();  
  jsonDocument["variable"] = variable;
  jsonDocument["valor"] = valor;
  jsonDocument["unidades"] = unidades;
  serializeJson(jsonDocument, buffer);
}

//Metodo GET para enviar la temperatura
void GetTemperatura() {
  Serial.println("Temperatura Solicitada:");
  temperatura = DHTDataSensor();
  Serial.print(temperatura);
  Json("Temperatura", temperatura, "°C");
  server.send(200, "application/json", buffer);
}

//Metodo POST para recibir datos
void PostOnOFF() {
  if (server.hasArg("plain") == false) {
    //
  }
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);

  String estado = jsonDocument["data"]; 
  OnOffSistema(estado);

  
  server.send(200, "application/json", "status:Ok");
}


void setup() {
  Serial.begin(9600);
  OnConexionWIFI(); // Iniciar conexion a wifi
  dht.begin(); // Inicializar sensor de temperatura

  pinMode (2, OUTPUT);

  //END POINTS API REST
  //Metodo GET
  server.on("/temperatura", GetTemperatura);
  //Metodos POST
  server.on("/OnOff", HTTP_POST, PostOnOFF);

  //Inciar servidor
  server.begin();
}

void loop() {     
     server.handleClient(); 
}
