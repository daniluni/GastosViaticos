;(function(){
  const init=()=>{
    Models.initDefaults();
    const tabs=document.querySelectorAll('.tab-btn');
    const views=document.querySelectorAll('.view');
    const setActiveTab=(idx)=>{
      tabs.forEach(t=>t.classList.remove('active'));
      views.forEach(v=>v.classList.remove('active'));
      tabs[idx].classList.add('active');
      views[idx].classList.add('active');
    };
    tabs.forEach((tab,i)=>{
      tab.addEventListener('click',()=>{
        setActiveTab(i);
        if(i===1)Gastos.render();
        if(i===2)Admin.render();
      });
    });
    Dashboard.init();
    Gastos.init();
    Admin.init();
    const refreshAll=()=>{
      Dashboard.render();
      const activeIdx=[...tabs].findIndex(t=>t.classList.contains('active'));
      if(activeIdx===0)Dashboard.render();
      else if(activeIdx===1)Gastos.render();
      else if(activeIdx===2)Admin.render();
    };
    document.addEventListener('data:change',refreshAll);
    setActiveTab(0);
    Dashboard.render();
    Gastos.render();
    Admin.render();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
