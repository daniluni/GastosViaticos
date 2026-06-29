const Dashboard={
  els:{},
  init(){
    this.els.totalCard=document.getElementById('dash-total');
    this.els.pendientesCard=document.getElementById('dash-pendientes');
    this.els.activosCard=document.getElementById('dash-activos');
    this.els.promedioCard=document.getElementById('dash-promedio');
  },
  render(){
    const gastos=Store.getCollection('gastos');
    const trabajadores=Store.getCollection('trabajadores');
    const categorias=Store.getCollection('categorias');
    const currentMonth=Utils.getCurrentMonth();
    const gastosMes=gastos.filter(g=>g.fecha.startsWith(currentMonth));
    const totalMes=gastosMes.reduce((s,g)=>s+g.monto,0);
    const pendientes=gastos.filter(g=>g.estado==='pendiente').length;
    const pendientesMonto=gastosMes.filter(g=>g.estado==='pendiente').reduce((s,g)=>s+g.monto,0);
    const activos=new Set(gastosMes.map(g=>g.idTrabajador)).size;
    const promedio=activos>0?Math.round(totalMes/activos):0;
    this.els.totalCard.innerHTML='<div class="card-label">Total del Mes</div><div class="card-value">'+Utils.formatCurrency(totalMes)+'</div>';
    this.els.pendientesCard.innerHTML='<div class="card-label">Pendientes</div><div class="card-value">'+pendientes+' · '+Utils.formatCurrency(pendientesMonto)+'</div>';
    this.els.activosCard.innerHTML='<div class="card-label">Trabajadores con Gastos</div><div class="card-value">'+activos+' de '+trabajadores.length+'</div>';
    this.els.promedioCard.innerHTML='<div class="card-label">Gasto Promedio x Trabajador</div><div class="card-value">'+Utils.formatCurrency(promedio)+'</div>';
    this._renderCharts(gastos,categorias,trabajadores);
  },
  _renderCharts(gastos,categorias,trabajadores){
    const gastosMes=gastos.filter(g=>g.fecha.startsWith(Utils.getCurrentMonth()));
    const porCategoria=categorias.map(c=>{
      const total=gastosMes.filter(g=>g.idCategoria===c.id).reduce((s,g)=>s+g.monto,0);
      return{label:c.nombre,valor:total,color:c.color};
    }).filter(d=>d.valor>0);
    Charts.renderDona('chart-dona',porCategoria);
    const meses=[];
    for(let i=5;i>=0;i--){
      const d=new Date();d.setMonth(d.getMonth()-i);
      const m=d.toISOString().slice(0,7);
      const total=gastos.filter(g=>g.fecha.startsWith(m)).reduce((s,g)=>s+g.monto,0);
      meses.push({label:Utils.getMonthName(m),valor:total});
    }
    Charts.renderBarras('chart-barras',meses);
    const gastosTrabajador=trabajadores.map(t=>{
      const total=gastosMes.filter(g=>g.idTrabajador===t.id).reduce((s,g)=>s+g.monto,0);
      return{label:t.nombre,valor:total};
    }).filter(d=>d.valor>0).sort((a,b)=>b.valor-a.valor).slice(0,5);
    Charts.renderTopTrabajadores('chart-top',gastosTrabajador);
  }
};
