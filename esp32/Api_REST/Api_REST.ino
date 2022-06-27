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
const char *SSID = "T104";
const char *PWD = "J123456789";

//Asignar port al servidor
WebServer server(80);

//Iniciar conexión a la red wifi
void OnConexionWIFI(){
  Serial.print("Conectando a ");
  Serial.println(SSID);

  //Iniciar conexión al wifi
  WiFi.begin(SSID, PWD);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.print("\n Conectado a la IP: ");
  Serial.println(WiFi.localIP());
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//DATOS SENSOR DE HUMEDAD Y TEMPERATURA
//////////////////////////////////////////////////////////////////////////////////////////////////
float DHTDataSensor(String type){
  if(type == "temperatura"){
    float t = dht.readTemperature();
    return t;
  }
  if(type == "humedad"){
    float h = dht.readHumidity();
    return h;
  }
  
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//ENCENDIDO Y APAGADO DEL SISTEMA
//////////////////////////////////////////////////////////////////////////////////////////////////

String stadoSystem = "Apagar";

//Apagar y encender el sistema
void OnOffSistema(String estado){
  if(estado=="Encender"){
    digitalWrite (2, HIGH);
    stadoSystem = "Encender";
    Serial.print("\n Encendido ");
  }
  if(estado=="Apagar"){
    digitalWrite (2, LOW);
    stadoSystem = "Apagar";
    Serial.print("\n Apagado");
  }
}

void AjustSystem(){
  if(stadoSystem == "Encender"){
    float temperature = DHTDataSensor("temperatura");
    if(temperature < 26){
      dacWrite(25,255);
    }
    else{
      dacWrite(25,0);
    }
  }
  else{
    dacWrite(25,0);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//INFO API REST 
//////////////////////////////////////////////////////////////////////////////////////////////////

//Variables estáticas
float temperatura;
float humedad;

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

//Método GET para enviar la temperatura y humedad
void GetTemperatura() {
  Serial.println("\n Temperatura Solicitada:");
  temperatura = DHTDataSensor("temperatura");
  Serial.print(temperatura);
  Json("Temperatura", temperatura, "°C");
  server.send(200, "application/json", buffer);
}

//Método GET para enviar la humedad
void GetHumedad() {
  Serial.println("\n Humedad Solicitada:");
  humedad = DHTDataSensor("humedad");
  Serial.print(humedad);
  Json("Humedad", humedad, "%");
  server.send(200, "application/json", buffer);
}

//Método POST para recibir datos
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
  OnConexionWIFI(); // Iniciar conexión a wifi
  dht.begin(); // Inicializar sensor de temperatura

  pinMode (2, OUTPUT);

  //END POINTS API REST
  //Método GET
  server.on("/temperatura", GetTemperatura);
  server.on("/humedad", GetHumedad);
  //Métodos POST
  server.on("/OnOff", HTTP_POST, PostOnOFF);

  //Iniciar servidor
  server.begin();
}

void loop() {
  AjustSystem();     
  server.handleClient();
      
}
