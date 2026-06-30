const Admin={
  els:{},editTrabajadorId:null,
  init(){
    this.els.pendientesList=document.getElementById('admin-pendientes');
    this.els.trabajadoresList=document.getElementById('admin-trabajadores-list');
    this.els.trabajadorForm=document.getElementById('trabajador-form');
    this.els.trabajadorNombre=document.getElementById('trab-nombre');
    this.els.trabajadorDoc=document.getElementById('trab-documento');
    this.els.trabajadorDepto=document.getElementById('trab-departamento');
    this.els.trabajadorSubmit=document.getElementById('trab-submit');
    this.els.trabajadorCancel=document.getElementById('trab-cancel');
    this._bindEvents();
  },
  _bindEvents(){
    this.els.trabajadorForm.addEventListener('submit',e=>{e.preventDefault();this._saveTrabajador()});
    this.els.trabajadorCancel.addEventListener('click',()=>this._resetTrabajadorForm());
  },
  render(){
    this._renderPendientes();
    this._renderTrabajadores();
  },
  _renderPendientes(){
    const gastos=Store.getCollection('gastos');
    const trabajadores=Store.getCollection('trabajadores');
    const categorias=Store.getCollection('categorias');
    const pendientes=gastos.filter(g=>g.estado==='pendiente')
      .sort((a,b)=>b.fecha.localeCompare(a.fecha));
    if(pendientes.length===0){
      this.els.pendientesList.innerHTML='<div class="empty-state"><p>✅ No hay gastos pendientes</p></div>';
      return;
    }
    this.els.pendientesList.innerHTML=pendientes.map(g=>{
      const t=trabajadores.find(t=>t.id===g.idTrabajador);
      const c=categorias.find(c=>c.id===g.idCategoria);
      return '<div class="admin-item">'+
        '<div class="admin-item-info">'+
          '<div class="nombre">'+(t?Utils.escapeHtml(t.nombre):'?')+' · '+Utils.formatCurrency(g.monto)+'</div>'+
          '<div class="detalle">'+(c?Utils.escapeHtml(c.nombre):'?')+' · '+Utils.escapeHtml(g.descripcion)+' · '+Utils.formatDateShort(g.fecha)+' · '+Utils.escapeHtml(g.destino)+'</div>'+
          (g.tieneBoleta?'<div class="detalle">📎 Con boleta</div>':'')+
        '</div>'+
        '<div class="admin-item-actions">'+
          '<button class="btn btn--success btn--sm" data-aprobar="'+g.id+'">✅ Aprobar</button>'+
          '<button class="btn btn--danger btn--sm" data-rechazar="'+g.id+'">❌ Rechazar</button>'+
        '</div>'+
      '</div>';
    }).join('');
    this.els.pendientesList.querySelectorAll('[data-aprobar]').forEach(btn=>{
      btn.addEventListener('click',()=>this._cambiarEstado(btn.dataset.aprobar,'aprobado'));
    });
    this.els.pendientesList.querySelectorAll('[data-rechazar]').forEach(btn=>{
      btn.addEventListener('click',()=>this._cambiarEstado(btn.dataset.rechazar,'rechazado'));
    });
  },
  _cambiarEstado(id,estado){
    Store.updateInCollection('gastos',id,{estado});
    document.dispatchEvent(new CustomEvent('data:change'));
  },
  _renderTrabajadores(){
    const trabajadores=Store.getCollection('trabajadores');
    this.els.trabajadoresList.innerHTML=trabajadores.map(t=>
      '<div class="admin-item">'+
        '<div class="admin-item-info">'+
          '<div class="nombre">'+Utils.escapeHtml(t.nombre)+'</div>'+
          '<div class="detalle">'+Utils.escapeHtml(t.documento)+' · '+Utils.escapeHtml(t.departamento)+'</div>'+
        '</div>'+
        '<div class="admin-item-actions">'+
          '<button class="btn btn--ghost btn--sm" data-editt="'+t.id+'">✏️</button>'+
          '<button class="btn btn--ghost btn--sm" data-deletet="'+t.id+'">🗑️</button>'+
        '</div>'+
      '</div>'
    ).join('');
    this.els.trabajadoresList.querySelectorAll('[data-editt]').forEach(btn=>{
      btn.addEventListener('click',()=>this._editarTrabajador(btn.dataset.editt));
    });
    this.els.trabajadoresList.querySelectorAll('[data-deletet]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        if(confirm('¿Eliminar trabajador?')){
          Store.removeFromCollection('trabajadores',btn.dataset.deletet);
          document.dispatchEvent(new CustomEvent('data:change'));
        }
      });
    });
  },
  _editarTrabajador(id){
    const t=Store.getById('trabajadores',id);
    if(!t)return;
    this.editTrabajadorId=id;
    this.els.trabajadorNombre.value=t.nombre;
    this.els.trabajadorDoc.value=t.documento;
    this.els.trabajadorDepto.value=t.departamento;
    this.els.trabajadorSubmit.textContent='Actualizar';
    this.els.trabajadorCancel.style.display='inline-flex';
  },
  _saveTrabajador(){
    const nombre=this.els.trabajadorNombre.value.trim();
    const documento=this.els.trabajadorDoc.value.trim();
    const departamento=this.els.trabajadorDepto.value.trim();
    if(!nombre||!documento||!departamento){alert('Completa todos los campos.');return;}
    if(this.editTrabajadorId){
      Store.updateInCollection('trabajadores',this.editTrabajadorId,{nombre,documento,departamento});
    }else{
      Store.addToCollection('trabajadores',Models.crearTrabajador({nombre,documento,departamento}));
    }
    this._resetTrabajadorForm();
    document.dispatchEvent(new CustomEvent('data:change'));
  },
  _resetTrabajadorForm(){
    this.editTrabajadorId=null;
    this.els.trabajadorForm.reset();
    this.els.trabajadorSubmit.textContent='Agregar';
    this.els.trabajadorCancel.style.display='none';
  }
};
