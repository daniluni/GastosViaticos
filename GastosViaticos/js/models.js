const Models={
  defaultCategorias:[
    {id:'cat-1',nombre:'Alojamiento',color:'#8e44ad'},
    {id:'cat-2',nombre:'Alimentación',color:'#e67e22'},
    {id:'cat-3',nombre:'Transporte',color:'#3498db'},
    {id:'cat-4',nombre:'Combustible',color:'#e74c3c'},
    {id:'cat-5',nombre:'Peajes',color:'#f39c12'},
    {id:'cat-6',nombre:'Estacionamiento',color:'#1abc9c'},
    {id:'cat-7',nombre:'Pasajes',color:'#2980b9'},
    {id:'cat-8',nombre:'Otros',color:'#95a5a6'},
  ],
  PRESET_TRABAJADORES:[
    {id:'trab-1',nombre:'Sofía Hernández',documento:'25.456.789-1',departamento:'Ventas'},
    {id:'trab-2',nombre:'Benjamín Muñoz',documento:'27.123.456-2',departamento:'TI'},
    {id:'trab-3',nombre:'Valentina Soto',documento:'26.789.123-3',departamento:'RRHH'},
    {id:'trab-4',nombre:'Mateo González',documento:'24.567.890-4',departamento:'Ventas'},
    {id:'trab-5',nombre:'Isabella Rojas',documento:'28.345.678-5',departamento:'TI'},
    {id:'trab-6',nombre:'Sebastián López',documento:'23.901.234-6',departamento:'Operaciones'},
  ],
  PRESET_GASTOS:[
    {idTrabajador:'trab-1',idCategoria:'cat-3',monto:45000,descripcion:'Traslado a cliente RM',fecha:'2026-06-25',destino:'Santiago',tieneBoleta:true,estado:'aprobado'},
    {idTrabajador:'trab-2',idCategoria:'cat-1',monto:120000,descripcion:'Hotel 2 noches capacitación',fecha:'2026-06-20',destino:'Viña del Mar',tieneBoleta:true,estado:'aprobado'},
    {idTrabajador:'trab-3',idCategoria:'cat-2',monto:15000,descripcion:'Almuerzo reunión equipo',fecha:'2026-06-22',destino:'Santiago',tieneBoleta:true,estado:'aprobado'},
    {idTrabajador:'trab-4',idCategoria:'cat-4',monto:32000,descripcion:'Carga combustible vehículo empresa',fecha:'2026-06-24',destino:'Rancagua',tieneBoleta:true,estado:'pendiente'},
    {idTrabajador:'trab-1',idCategoria:'cat-5',monto:8500,descripcion:'Peajes ruta 5 sur',fecha:'2026-06-25',destino:'Rancagua',tieneBoleta:true,estado:'pendiente'},
    {idTrabajador:'trab-5',idCategoria:'cat-6',monto:12000,descripcion:'Estacionamiento centro',fecha:'2026-06-21',destino:'Santiago',tieneBoleta:false,estado:'rechazado'},
    {idTrabajador:'trab-6',idCategoria:'cat-7',monto:25000,descripcion:'Pasaje bus interurbano',fecha:'2026-06-18',destino:'Valparaíso',tieneBoleta:true,estado:'pendiente'},
    {idTrabajador:'trab-2',idCategoria:'cat-2',monto:18000,descripcion:'Cena con proveedor',fecha:'2026-06-23',destino:'Santiago',tieneBoleta:true,estado:'aprobado'},
    {idTrabajador:'trab-3',idCategoria:'cat-8',monto:7500,descripcion:'Útiles para terreno',fecha:'2026-06-19',destino:'Santiago',tieneBoleta:true,estado:'pendiente'},
    {idTrabajador:'trab-4',idCategoria:'cat-4',monto:28000,descripcion:'Combustible viaje cliente',fecha:'2026-06-15',destino:'Talca',tieneBoleta:true,estado:'aprobado'},
  ],
  initDefaults(){
    if(!Store.get('trabajadores')){
      Store.set('trabajadores',this.PRESET_TRABAJADORES);
    }
    if(!Store.get('categorias')){
      Store.set('categorias',this.defaultCategorias);
    }
    if(!Store.get('gastos')){
      const gastos=this.PRESET_GASTOS.map((g,i)=>({
        id:'gasto-'+(i+1),
        ...g,
        fechaCreacion:new Date().toISOString()
      }));
      Store.set('gastos',gastos);
    }
  },
  crearGasto(data){
    return{
      id:Utils.uuid(),
      idTrabajador:data.idTrabajador,
      idCategoria:data.idCategoria,
      monto:Number(data.monto),
      descripcion:data.descripcion.trim(),
      fecha:data.fecha,
      destino:data.destino.trim(),
      tieneBoleta:!!data.tieneBoleta,
      estado:'pendiente',
      fechaCreacion:new Date().toISOString()
    };
  },
  crearTrabajador(data){
    return{
      id:Utils.uuid(),
      nombre:data.nombre.trim(),
      documento:data.documento.trim(),
      departamento:data.departamento.trim()
    };
  }
};
