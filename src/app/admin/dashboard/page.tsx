'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const VENTAS_HOY = [
  { id:'V-001', cliente:'Rancho La Esperanza',  total:4850, items:10, hora:'10:23', metodo:'Efectivo',     sucursal:'Tototlán' },
  { id:'V-002', cliente:'Granja Los Pinos',      total:2160, items:6,  hora:'09:45', metodo:'Transferencia',sucursal:'Guadalajara' },
  { id:'V-003', cliente:'Familia Rodríguez',     total:1440, items:4,  hora:'09:12', metodo:'Efectivo',     sucursal:'Tototlán' },
  { id:'V-004', cliente:'Engordadora El Pital',  total:8720, items:20, hora:'08:50', metodo:'Crédito',      sucursal:'Michoacán' },
]

const SUCURSALES = [
  { nombre:'Tototlán', ventas:12, total:28400, color:'#C62828' },
  { nombre:'Guadalajara', ventas:8, total:19200, color:'#1565C0' },
  { nombre:'Michoacán', ventas:5, total:11800, color:'#2E7D32' },
]

const PRODUCTOS_TOP = [
  { nombre:'Alimento Bovino Inicio', vendidos:45, ingreso:21825 },
  { nombre:'Alimento Avícola Postura', vendidos:38, ingreso:13680 },
  { nombre:'Maíz Rolado', vendidos:32, ingreso:9120 },
  { nombre:'Pasta de Soya', vendidos:12, ingreso:8640 },
]

const IGrid  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
const IBox   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
const IChart = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const IUsers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
const ICog   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06-.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>

const NAV = [
  {id:'dashboard',l:'Dashboard',I:IGrid},
  {id:'ventas',l:'Ventas',I:IChart},
  {id:'productos',l:'Productos',I:IBox},
  {id:'empleados',l:'Empleados',I:IUsers},
  {id:'config',l:'Config',I:ICog},
]

const ROJO = '#C62828'
const FI = ({children,d=0}:{children:React.ReactNode;d?:number}) => (
  <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.22,delay:d,ease:'easeOut'}}>
    {children}
  </motion.div>
)

export default function ForrajeraAdmin() {
  const [sec, setSec] = useState('dashboard')

  const totalHoy = VENTAS_HOY.reduce((a,v)=>a+v.total,0)

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A'}}>

      {/* SIDEBAR */}
      <aside style={{width:240,flexShrink:0,background:'#111',
        borderRight:'1px solid rgba(255,255,255,0.07)',
        position:'fixed',top:0,bottom:0,left:0,
        display:'flex',flexDirection:'column',zIndex:20}}
        className="desktop-only">
        <div style={{padding:'24px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:ROJO,
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:'Georgia,serif',fontSize:16,color:'#fff',fontWeight:700}}>19</div>
            <div>
              <div style={{color:'#fff',fontWeight:700,fontSize:14}}>19 Hermanos</div>
              <div style={{color:'#555',fontSize:11}}>Panel Admin</div>
            </div>
          </div>
        </div>
        <nav style={{flex:1,padding:'12px 0'}}>
          {NAV.map(({id,l,I})=>(
            <button key={id} onClick={()=>setSec(id)}
              style={{width:'100%',display:'flex',alignItems:'center',gap:12,
                padding:'11px 24px',border:'none',cursor:'pointer',
                background:sec===id?`${ROJO}15`:'transparent',
                color:sec===id?ROJO:'#555',
                borderLeft:`2px solid ${sec===id?ROJO:'transparent'}`,
                fontSize:13,fontFamily:'inherit',transition:'all 150ms',textAlign:'left'}}>
              <div style={{width:18,height:18,flexShrink:0}}><I/></div>{l}
            </button>
          ))}
        </nav>
        <div style={{padding:'16px 24px',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{color:'#fff',fontSize:13,fontWeight:600}}>Administrador</div>
          <div style={{color:'#555',fontSize:11}}>Todas las sucursales</div>
        </div>
      </aside>

      <main style={{flex:1,marginLeft:240,paddingBottom:80}} className="admin-main">
        <div style={{padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',
          borderBottom:'1px solid rgba(255,255,255,0.07)',
          background:'rgba(10,10,10,0.9)',backdropFilter:'blur(12px)',position:'sticky',top:0,zIndex:10}}>
          <div>
            <div style={{color:'#fff',fontWeight:600,fontSize:16}}>
              {NAV.find(n=>n.id===sec)?.l}
            </div>
            <div style={{color:'#555',fontSize:11}}>Todas las sucursales</div>
          </div>
          <button style={{padding:'8px 16px',borderRadius:999,border:'none',cursor:'pointer',
            background:ROJO,color:'#fff',fontSize:12,fontWeight:700}}>
            + Nueva venta
          </button>
        </div>

        <div style={{padding:24}}>
          {sec === 'dashboard' && (
            <>
              {/* KPIs */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:12,marginBottom:24}}>
                {[
                  {l:'Ventas hoy',    v:`$${totalHoy.toLocaleString()}`, c:ROJO,      i:'💰'},
                  {l:'Transacciones', v:'25',                            c:'#fff',    i:'🧾'},
                  {l:'Sucursales',    v:'3',                             c:'#4CAF50', i:'🏪'},
                  {l:'Productos',     v:'12',                            c:'#FF9800', i:'📦'},
                ].map((s,i)=>(
                  <FI key={i} d={i*0.07}>
                    <div style={{background:'#141414',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:20}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
                        <span style={{fontSize:10,color:'#555',textTransform:'uppercase',letterSpacing:'0.08em'}}>{s.l}</span>
                        <span style={{fontSize:18}}>{s.i}</span>
                      </div>
                      <div style={{fontFamily:'Georgia,serif',fontSize:26,color:s.c}}>{s.v}</div>
                    </div>
                  </FI>
                ))}
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
                <FI d={0.2}>
                  <div style={{background:'#141414',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:20}}>
                    <div style={{fontSize:10,color:'#555',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>
                      POR SUCURSAL HOY
                    </div>
                    {SUCURSALES.map((s,i)=>{
                      const maxTotal = Math.max(...SUCURSALES.map(x=>x.total))
                      const pct = (s.total/maxTotal)*100
                      return (
                        <div key={i} style={{marginBottom:14}}>
                          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                            <div style={{display:'flex',alignItems:'center',gap:8}}>
                              <div style={{width:8,height:8,borderRadius:'50%',background:s.color}}/>
                              <span style={{color:'#fff',fontSize:13}}>{s.nombre}</span>
                            </div>
                            <div style={{textAlign:'right'}}>
                              <span style={{color:s.color,fontWeight:600,fontSize:13}}>${s.total.toLocaleString()}</span>
                              <div style={{color:'#555',fontSize:11}}>{s.ventas} ventas</div>
                            </div>
                          </div>
                          <div style={{height:5,borderRadius:999,background:'#1A1A1A',overflow:'hidden'}}>
                            <motion.div initial={{width:0}} animate={{width:`${pct}%`}}
                              transition={{delay:0.4+i*0.1,duration:0.8}}
                              style={{height:'100%',borderRadius:999,background:s.color}}/>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </FI>

                <FI d={0.25}>
                  <div style={{background:'#141414',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:20}}>
                    <div style={{fontSize:10,color:'#555',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>
                      VENTAS RECIENTES
                    </div>
                    {VENTAS_HOY.map((v,i)=>(
                      <div key={i} style={{display:'flex',justifyContent:'space-between',
                        paddingBottom:12,marginBottom:12,
                        borderBottom:i<VENTAS_HOY.length-1?'1px solid rgba(255,255,255,0.04)':'none'}}>
                        <div>
                          <div style={{color:'#fff',fontSize:13}}>{v.cliente}</div>
                          <div style={{color:'#555',fontSize:11}}>{v.sucursal} · {v.metodo} · {v.hora}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                          <div style={{color:'#4CAF50',fontWeight:600}}>${v.total.toLocaleString()}</div>
                          <div style={{color:'#555',fontSize:10}}>{v.id}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </FI>
              </div>

              <FI d={0.35}>
                <div style={{background:'#141414',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:20,marginTop:20}}>
                  <div style={{fontSize:10,color:'#555',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>
                    PRODUCTOS MÁS VENDIDOS HOY
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                    {PRODUCTOS_TOP.map((p,i)=>(
                      <div key={i} style={{background:'#1A1A1A',borderRadius:12,padding:'12px 16px'}}>
                        <div style={{color:'#fff',fontSize:13,fontWeight:500,marginBottom:6}}>{p.nombre}</div>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                          <span style={{color:'#555',fontSize:12}}>{p.vendidos} costales</span>
                          <span style={{color:ROJO,fontWeight:600,fontSize:13}}>${p.ingreso.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FI>
            </>
          )}

          {['ventas','productos','empleados','config'].includes(sec) && (
            <FI>
              <div style={{background:'#141414',border:'1px solid rgba(255,255,255,0.07)',
                borderRadius:16,padding:60,textAlign:'center'}}>
                <div style={{fontSize:40,marginBottom:12}}>
                  {sec==='ventas'?'📊':sec==='productos'?'📦':sec==='empleados'?'👥':'⚙️'}
                </div>
                <div style={{color:'#fff',fontSize:18,fontWeight:700,marginBottom:8}}>
                  {sec==='ventas'?'Historial de ventas':sec==='productos'?'Gestión de productos':sec==='empleados'?'Empleados y accesos':'Configuración'}
                </div>
                <div style={{color:'#555',fontSize:13}}>Módulo en desarrollo · Fase 2</div>
              </div>
            </FI>
          )}
        </div>
      </main>

      <nav style={{position:'fixed',bottom:0,left:0,right:0,height:64,
        background:'rgba(10,10,10,0.95)',backdropFilter:'blur(20px)',
        borderTop:'1px solid rgba(255,255,255,0.07)',
        display:'none',alignItems:'center',zIndex:100}}
        className="mobile-only">
        {NAV.map(({id,l,I})=>(
          <motion.button key={id} onClick={()=>setSec(id)} whileTap={{scale:0.9}}
            style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,
              padding:'8px 0',border:'none',cursor:'pointer',background:'transparent',
              color:sec===id?ROJO:'#444',fontSize:9,textTransform:'uppercase',
              letterSpacing:'0.04em',minHeight:44}}>
            <I/><span>{l}</span>
          </motion.button>
        ))}
      </nav>

      <style>{`
        @media(max-width:768px){
          .desktop-only{display:none!important}
          .mobile-only{display:flex!important}
          .admin-main{margin-left:0!important}
        }
        @media(min-width:769px){.mobile-only{display:none!important}}
      `}</style>
    </div>
  )
}
