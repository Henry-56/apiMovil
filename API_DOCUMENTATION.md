# 📱 Documentación de API - AppMovil

Base URL: `https://apimovil-qubz.onrender.com`

## 📋 Tabla de Contenidos
- [Autenticación](#autenticación)
- [Diario Emocional](#diario-emocional)
- [Prácticas de Mindfulness](#prácticas-de-mindfulness)
- [Evaluaciones](#evaluaciones)
- [Sugerencias](#sugerencias)
- [Reportes](#reportes)
- [Códigos de Estado](#códigos-de-estado)
- [Formato de Respuestas](#formato-de-respuestas)

---

## 🔐 Autenticación

La mayoría de los endpoints requieren autenticación mediante **JWT Token**. El token debe incluirse en el header de las peticiones:

```
Authorization: Bearer <token>
```

### POST /auth/register
Registrar un nuevo usuario en la plataforma.

**Endpoint:** `/auth/register`  
**Método:** `POST`  
**Autenticación:** No requerida

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "correo": "juan@ejemplo.com",
  "password": "miPassword123",
  "genero": "masculino",
  "carrera": "Ingeniería de Sistemas",
  "ciclo": "VI",
  "consentimiento": true
}
```

**Campos requeridos:**
- `nombre` (string): Nombre completo del usuario
- `correo` (string): Email válido
- `password` (string): Mínimo 6 caracteres
- `consentimiento` (boolean): Debe ser `true`

**Campos opcionales:**
- `genero` (string)
- `carrera` (string)
- `ciclo` (string)

**Response exitoso (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@ejemplo.com",
    "genero": "masculino",
    "carrera": "Ingeniería de Sistemas",
    "ciclo": "VI",
    "fecha_registro": "2025-11-23T10:30:00.000Z"
  }
}
```

**Response error (409):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

---

### POST /auth/login
Iniciar sesión y obtener token de autenticación.

**Endpoint:** `/auth/login`  
**Método:** `POST`  
**Autenticación:** No requerida

**Request Body:**
```json
{
  "correo": "juan@ejemplo.com",
  "password": "miPassword123"
}
```

**Campos requeridos:**
- `correo` (string): Email válido
- `password` (string): Contraseña del usuario

**Response exitoso (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "nombre": "Juan Pérez",
      "correo": "juan@ejemplo.com",
      "genero": "masculino",
      "carrera": "Ingeniería de Sistemas",
      "ciclo": "VI"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

> [!IMPORTANT]
> Guarden el `token` recibido en el login para usarlo en las demás peticiones que requieren autenticación.

---

### GET /auth/me
Obtener información del usuario autenticado.

**Endpoint:** `/auth/me`  
**Método:** `GET`  
**Autenticación:** Requerida (JWT Token)

**Headers:**
```
Authorization: Bearer <token>
```

**Response exitoso (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@ejemplo.com",
    "genero": "masculino",
    "carrera": "Ingeniería de Sistemas",
    "ciclo": "VI",
    "fecha_registro": "2025-11-23T10:30:00.000Z"
  }
}
```

---

## 📓 Diario Emocional

Todos los endpoints de diario requieren autenticación.

### GET /diary
Obtener todas las entradas del diario del usuario autenticado.

**Endpoint:** `/diary`  
**Método:** `GET`  
**Autenticación:** Requerida

**Headers:**
```
Authorization: Bearer <token>
```

**Response exitoso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "emocion": "felicidad",
      "intensidad": 4,
      "contexto": "Aprobé mi examen final",
      "momento_dia": "tarde",
      "reflexion": "Me siento muy satisfecho con mi esfuerzo",
      "fecha": "2025-11-23T15:30:00.000Z",
      "id_usuario": 1
    },
    {
      "id": 2,
      "emocion": "ansiedad",
      "intensidad": 3,
      "contexto": "Tengo una presentación mañana",
      "momento_dia": "noche",
      "reflexion": "Necesito prepararme mejor",
      "fecha": "2025-11-22T20:00:00.000Z",
      "id_usuario": 1
    }
  ]
}
```

---

### POST /diary
Crear una nueva entrada en el diario emocional.

**Endpoint:** `/diary`  
**Método:** `POST`  
**Autenticación:** Requerida

**Request Body:**
```json
{
  "emocion": "alegría",
  "intensidad": 5,
  "contexto": "Celebración con amigos",
  "momento_dia": "noche",
  "reflexion": "Me sentí muy apoyado por mis compañeros",
  "fecha": "2025-11-23T18:00:00.000Z"
}
```

**Campos requeridos:**
- `emocion` (string): Tipo de emoción experimentada
- `intensidad` (number): Escala del 1 al 5

**Campos opcionales:**
- `contexto` (string): Descripción del contexto
- `momento_dia` (string): Valores válidos: `"manana"`, `"tarde"`, `"noche"`
- `reflexion` (string): Reflexión personal
- `fecha` (date): Fecha de la entrada (por defecto fecha actual)

**Response exitoso (201):**
```json
{
  "success": true,
  "message": "Entry created successfully",
  "data": {
    "id": 3,
    "emocion": "alegría",
    "intensidad": 5,
    "contexto": "Celebración con amigos",
    "momento_dia": "noche",
    "reflexion": "Me sentí muy apoyado por mis compañeros",
    "fecha": "2025-11-23T18:00:00.000Z",
    "id_usuario": 1
  }
}
```

---

### PUT /diary/:id
Actualizar una entrada existente del diario.

**Endpoint:** `/diary/:id`  
**Método:** `PUT`  
**Autenticación:** Requerida

**Parámetros URL:**
- `id` (number): ID de la entrada a actualizar

**Request Body:**
```json
{
  "intensidad": 4,
  "reflexion": "Actualizo mi reflexión después de meditar"
}
```

**Campos opcionales (todos):**
- `emocion` (string)
- `intensidad` (number): 1-5
- `contexto` (string)
- `momento_dia` (string): `"manana"`, `"tarde"`, `"noche"`
- `reflexion` (string)
- `fecha` (date)

**Response exitoso (200):**
```json
{
  "success": true,
  "message": "Entry updated successfully",
  "data": {
    "id": 3,
    "emocion": "alegría",
    "intensidad": 4,
    "contexto": "Celebración con amigos",
    "momento_dia": "noche",
    "reflexion": "Actualizo mi reflexión después de meditar",
    "fecha": "2025-11-23T18:00:00.000Z",
    "id_usuario": 1
  }
}
```

---

### DELETE /diary/:id
Eliminar una entrada del diario.

**Endpoint:** `/diary/:id`  
**Método:** `DELETE`  
**Autenticación:** Requerida

**Parámetros URL:**
- `id` (number): ID de la entrada a eliminar

**Response exitoso (200):**
```json
{
  "success": true,
  "message": "Entry deleted successfully"
}
```

**Response error (404):**
```json
{
  "success": false,
  "message": "Entry not found"
}
```

---

## 🧘 Prácticas de Mindfulness

Todos los endpoints requieren autenticación.

### GET /practices/library
Obtener la biblioteca de prácticas de mindfulness disponibles.

**Endpoint:** `/practices/library`  
**Método:** `GET`  
**Autenticación:** Requerida

**Response exitoso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "tipo": "Meditación guiada",
      "descripcion": "Meditación de 10 minutos para reducir ansiedad",
      "url_contenido": "https://example.com/meditation1.mp3",
      "duracion_min": 10,
      "categoria": "ansiedad"
    },
    {
      "id": 2,
      "tipo": "Respiración consciente",
      "descripcion": "Ejercicio de respiración para calmar la mente",
      "url_contenido": "https://example.com/breathing.mp3",
      "duracion_min": 5,
      "categoria": "estrés"
    }
  ]
}
```

---

### POST /practices/sessions
Registrar una nueva sesión de práctica de mindfulness.

**Endpoint:** `/practices/sessions`  
**Método:** `POST`  
**Autenticación:** Requerida

**Request Body:**
```json
{
  "tipo": "Meditación guiada",
  "descripcion": "Meditación matutina",
  "url_contenido": "https://example.com/meditation1.mp3",
  "duracion_min": 15,
  "intensidad_antes": 4,
  "intensidad_despues": 2,
  "id_emocion_relacionada": 5,
  "resultado": "Me sentí más tranquilo y enfocado",
  "estado": "completado"
}
```

**Campos requeridos:**
- `tipo` (string): Tipo de práctica
- `duracion_min` (number): Duración en minutos

**Campos opcionales:**
- `descripcion` (string)
- `url_contenido` (string): URL del contenido multimedia
- `intensidad_antes` (number): Nivel de intensidad emocional antes (1-5)
- `intensidad_despues` (number): Nivel después (1-5)
- `id_emocion_relacionada` (number): ID de la emoción relacionada
- `resultado` (string): Resultado o reflexión
- `estado` (string): Estado de la sesión

**Response exitoso (201):**
```json
{
  "success": true,
  "message": "Session created successfully",
  "data": {
    "id": 10,
    "tipo": "Meditación guiada",
    "duracion_min": 15,
    "intensidad_antes": 4,
    "intensidad_despues": 2,
    "resultado": "Me sentí más tranquilo y enfocado",
    "fecha_sesion": "2025-11-23T08:00:00.000Z",
    "id_usuario": 1
  }
}
```

---

### GET /practices/sessions
Obtener el historial de sesiones de práctica del usuario.

**Endpoint:** `/practices/sessions`  
**Método:** `GET`  
**Autenticación:** Requerida

**Response exitoso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 10,
      "tipo": "Meditación guiada",
      "descripcion": "Meditación matutina",
      "duracion_min": 15,
      "intensidad_antes": 4,
      "intensidad_despues": 2,
      "resultado": "Me sentí más tranquilo y enfocado",
      "fecha_sesion": "2025-11-23T08:00:00.000Z",
      "id_usuario": 1
    }
  ]
}
```

---

## 📊 Evaluaciones

Endpoints para gestionar evaluaciones PSS-10 (test de estrés percibido).

### POST /assessments/pretest
Registrar evaluación inicial (pretest).

**Endpoint:** `/assessments/pretest`  
**Método:** `POST`  
**Autenticación:** Requerida

**Request Body:**
```json
{
  "pss10_score": 28,
  "satisfaccion_score": 6,
  "respuestas_pss10": {
    "pregunta1": 3,
    "pregunta2": 4,
    "pregunta3": 3,
    "pregunta4": 2,
    "pregunta5": 4,
    "pregunta6": 3,
    "pregunta7": 2,
    "pregunta8": 3,
    "pregunta9": 2,
    "pregunta10": 2
  }
}
```

**Campos requeridos:**
- `pss10_score` (number): Puntaje total del test PSS-10
- `satisfaccion_score` (number): Puntaje de satisfacción

**Campos opcionales:**
- `respuestas_pss10` (object): Objeto con las respuestas individuales

**Response exitoso (201):**
```json
{
  "success": true,
  "message": "Pretest created successfully",
  "data": {
    "id": 1,
    "id_usuario": 1,
    "pss10_score": 28,
    "satisfaccion_score": 6,
    "tipo_evaluacion": "pretest",
    "fecha_evaluacion": "2025-11-23T10:00:00.000Z"
  }
}
```

---

### POST /assessments/posttest
Registrar evaluación final (posttest).

**Endpoint:** `/assessments/posttest`  
**Método:** `POST`  
**Autenticación:** Requerida

**Request Body:**
```json
{
  "pss10_score": 18,
  "satisfaccion_score": 8,
  "respuestas_pss10": {
    "pregunta1": 2,
    "pregunta2": 2,
    "pregunta3": 2,
    "pregunta4": 1,
    "pregunta5": 2,
    "pregunta6": 2,
    "pregunta7": 1,
    "pregunta8": 2,
    "pregunta9": 2,
    "pregunta10": 2
  }
}
```

**Campos:** Iguales que pretest

**Response exitoso (201):**
```json
{
  "success": true,
  "message": "Posttest created successfully",
  "data": {
    "id": 2,
    "id_usuario": 1,
    "pss10_score": 18,
    "satisfaccion_score": 8,
    "tipo_evaluacion": "posttest",
    "fecha_evaluacion": "2025-12-23T10:00:00.000Z"
  }
}
```

---

### GET /assessments/summary
Obtener resumen de evaluaciones del usuario.

**Endpoint:** `/assessments/summary`  
**Método:** `GET`  
**Autenticación:** Requerida

**Response exitoso (200):**
```json
{
  "success": true,
  "data": {
    "pretest": {
      "id": 1,
      "pss10_score": 28,
      "satisfaccion_score": 6,
      "fecha_evaluacion": "2025-11-23T10:00:00.000Z"
    },
    "posttest": {
      "id": 2,
      "pss10_score": 18,
      "satisfaccion_score": 8,
      "fecha_evaluacion": "2025-12-23T10:00:00.000Z"
    },
    "mejora": {
      "pss10_diferencia": -10,
      "satisfaccion_diferencia": 2,
      "porcentaje_mejora": 35.7
    }
  }
}
```

---

## 💡 Sugerencias

Endpoints para obtener y gestionar sugerencias personalizadas.

### GET /suggestions
Obtener sugerencias personalizadas para el usuario.

**Endpoint:** `/suggestions`  
**Método:** `GET`  
**Autenticación:** Requerida

**Response exitoso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "id_usuario": 1,
      "mensaje": "Notamos que has experimentado ansiedad frecuentemente. Te recomendamos la práctica 'Respiración 4-7-8'",
      "tipo": "practica_recomendada",
      "prioridad": "alta",
      "leida": false,
      "fecha_creacion": "2025-11-23T10:00:00.000Z"
    },
    {
      "id": 2,
      "id_usuario": 1,
      "mensaje": "¡Has completado 5 días seguidos de meditación! Sigue así.",
      "tipo": "motivacional",
      "prioridad": "media",
      "leida": false,
      "fecha_creacion": "2025-11-23T09:00:00.000Z"
    }
  ]
}
```

---

### PATCH /suggestions/:id/read
Marcar una sugerencia como leída.

**Endpoint:** `/suggestions/:id/read`  
**Método:** `PATCH`  
**Autenticación:** Requerida

**Parámetros URL:**
- `id` (number): ID de la sugerencia

**Response exitoso (200):**
```json
{
  "success": true,
  "message": "Suggestion marked as read",
  "data": {
    "id": 1,
    "leida": true
  }
}
```

---

## 📈 Reportes

Endpoints para obtener reportes y estadísticas de uso.

### GET /reports/overview
Obtener resumen general del progreso del usuario.

**Endpoint:** `/reports/overview`  
**Método:** `GET`  
**Autenticación:** Requerida

**Response exitoso (200):**
```json
{
  "success": true,
  "data": {
    "resumen_general": {
      "dias_activos": 45,
      "entradas_diario": 38,
      "sesiones_mindfulness": 32,
      "racha_actual": 7
    },
    "emociones_mas_frecuentes": [
      {
        "emocion": "ansiedad",
        "frecuencia": 15,
        "intensidad_promedio": 3.5
      },
      {
        "emocion": "alegría",
        "frecuencia": 12,
        "intensidad_promedio": 4.2
      }
    ],
    "progreso_semanal": {
      "semana_actual": {
        "entradas": 5,
        "practicas": 4,
        "intensidad_emocional_promedio": 3.2
      },
      "semana_anterior": {
        "entradas": 4,
        "practicas": 3,
        "intensidad_emocional_promedio": 3.8
      }
    },
    "evaluaciones": {
      "pretest_score": 28,
      "posttest_score": 18,
      "mejora_porcentual": 35.7
    }
  }
}
```

---

## 📋 Códigos de Estado

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Petición exitosa |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Error en los datos enviados (validación) |
| 401 | Unauthorized | Token inválido o no proporcionado |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto (ej: usuario ya existe) |
| 500 | Internal Server Error | Error del servidor |

---

## 📝 Formato de Respuestas

Todas las respuestas de la API siguen un formato consistente:

### Respuesta Exitosa
```json
{
  "success": true,
  "message": "Mensaje descriptivo (opcional)",
  "data": {
    // Datos de la respuesta
  }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos del error (opcional)"
}
```

---

## 🔒 Notas de Seguridad

> [!IMPORTANT]
> - Todos los endpoints excepto `/auth/register` y `/auth/login` requieren autenticación
> - El token JWT debe incluirse en el header `Authorization: Bearer <token>`
> - Los tokens tienen una duración configurada en el servidor
> - Almacenen el token de forma segura en la app móvil

> [!WARNING]
> - No compartan ni expongan los tokens de autenticación
> - Implementen manejo de sesión y renovación de tokens
> - Manejen adecuadamente los errores 401 (token expirado)

---

## 🚀 Ejemplo de Flujo Completo

### 1. Registro de usuario
```bash
POST https://apimovil-qubz.onrender.com/auth/register
Content-Type: application/json

{
  "nombre": "María García",
  "correo": "maria@ejemplo.com",
  "password": "segura123",
  "consentimiento": true
}
```

### 2. Login
```bash
POST https://apimovil-qubz.onrender.com/auth/login
Content-Type: application/json

{
  "correo": "maria@ejemplo.com",
  "password": "segura123"
}
```

**Guardar el token recibido**

### 3. Crear entrada en el diario
```bash
POST https://apimovil-qubz.onrender.com/diary
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "emocion": "felicidad",
  "intensidad": 4,
  "contexto": "Día productivo",
  "momento_dia": "tarde"
}
```

### 4. Obtener sugerencias
```bash
GET https://apimovil-qubz.onrender.com/suggestions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📧 Soporte

Si tienen problemas con la integración o encuentran algún endpoint que no funciona como se espera, contacten al equipo de backend.

**Última actualización:** 23 de noviembre de 2025
