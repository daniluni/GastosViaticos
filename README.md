# GastosViaticos — App de Control de Gastos de Viáticos

SPA para gestionar gastos de viáticos y salidas a terreno de trabajadores.
Clasificación por categorías, flujo de aprobación administrativa y panel gerencial con gráficos.

## Estructura

```
GastosViaticos/
  plan.md
  index.html
  css/   reset.css · variables.css · layout.css · components.css · responsive.css
  js/    utils.js · store.js · models.js · charts.js
         dashboard.js   — Panel gerencia (cards + gráficos)
         gastos.js      — CRUD gastos con filtros
         admin.js       — Aprobar/rechazar pendientes + CRUD trabajadores
         app.js         — Orquestación IIFE
```

## Modelo de datos

**Trabajador**: id (uuid), nombre, documento, departamento
**Categoría**: id (uuid), nombre, color
**Gasto**: id (uuid), idTrabajador, idCategoria, monto, descripcion, fecha, destino, tieneBoleta (boolean), estado (pendiente/aprobado/rechazado), fechaCreacion (ISO)

## Categorías (8)

Alojamiento (#8e44ad), Alimentación (#e67e22), Transporte (#3498db),
Combustible (#e74c3c), Peajes (#f39c12), Estacionamiento (#1abc9c),
Pasajes (#2980b9), Otros (#95a5a6)

## Vistas (3 tabs)

- **📊 Gerencia**: Dashboard con cards total/pendientes/activos/promedio, dona por categoría, barras tendencia, top 5 trabajadores
- **💰 Gastos**: Tabla con filtros (trabajador, categoría, estado, rango fechas) + modal CRUD
- **⚙️ Admin**: Lista pendientes con botones Aprobar/Rechazar + CRUD trabajadores inline

## Presets

- 6 trabajadores desde `empleados-preset.md`
- 8 categorías predefinidas
- 10 gastos ejemplo (4 aprobados, 4 pendientes, 2 rechazados)

## Flujo administrativo

1. Usuario registra gasto → estado `pendiente`
2. Admin revisa en ⚙️ Admin → Aprobar/Rechazar
3. Dashboard refleja cambios en tiempo real
