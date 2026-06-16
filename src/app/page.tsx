'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── ICONS SVG INLINE ── */
const ICart    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
const IBox     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
const IChart   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const IUser    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IClose   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
const IPlus    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
const IMinus   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
const ICheck   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>

/* ── EMPRESAS (multiempresa) ── */
const EMPRESAS = [
  { id:'19h',   nombre:'Forrajera 19 Hermanos', ubicacion:'Tototlán, Jalisco',    color:'#C62828' },
  { id:'gdl',   nombre:'19H Guadalajara',       ubicacion:'Guadalajara, Jalisco', color:'#1565C0' },
  { id:'mich',  nombre:'19H Michoacán',         ubicacion:'Zamora, Michoacán',    color:'#2E7D32' },
]

/* ── PRODUCTOS (forrajes y alimentos) ── */
const PRODUCTOS = [
  { id:1, nombre:'Alimento Bovino Inicio', categoria:'Bovinos', unidad:'costal 40kg', precio:485, sku:'BOV-001', stock:240 },
  { id:2, nombre:'Alimento Bovino Desarrollo', categoria:'Bovinos', unidad:'costal 40kg', precio:465, sku:'BOV-002', stock:180 },
  { id:3, nombre:'Alimento Porcino Lechón', categoria:'Porcinos', unidad:'costal 25kg', precio:380, sku:'POR-001', stock:95 },
  { id:4, nombre:'Alimento Porcino Engorda', categoria:'Porcinos', unidad:'costal 40kg', precio:420, sku:'POR-002', stock:130 },
  { id:5, nombre:'Alimento Avícola Postura', categoria:'Aves', unidad:'costal 40kg', precio:360, sku:'AVI-001', stock:310 },
  { id:6, nombre:'Alimento Avícola Engorda', categoria:'Aves', unidad:'costal 40kg', precio:340, sku:'AVI-002', stock:275 },
  { id:7, nombre:'Alimento Caprino Lactación', categoria:'Caprinos', unidad:'costal 25kg', precio:395, sku:'CAP-001', stock:60 },
  { id:8, nombre:'Maíz Rolado', categoria:'Granos', unidad:'costal 50kg', precio:285, sku:'GRA-001', stock:450 },
  { id:9, nombre:'Sorgo Molido', categoria:'Granos', unidad:'costal 50kg', precio:260, sku:'GRA-002', stock:380 },
  { id:10, nombre:'Pasta de Soya', categoria:'Suplementos', unidad:'costal 40kg', precio:720, sku:'SUP-001', stock:90 },
  { id:11, nombre:'Melaza de Caña', categoria:'Suplementos', unidad:'cubeta 20L', precio:180, sku:'SUP-002', stock:75 },
  { id:12, nombre:'Sal Mineral Bovino', categoria:'Suplementos', unidad:'saco 25kg', precio:420, sku:'SUP-003', stock:120 },
]

const CATEGORIAS = ['Todos', 'Bovinos', 'Porcinos', 'Aves', 'Caprinos', 'Granos', 'Suplementos']

/* ── VENTAS RECIENTES ── */
const VENTAS_RECIENTES = [
  { id:'V-001', cliente:'Rancho La Esperanza', total:4850, items:10, hora:'10:23', metodo:'Efectivo' },
  { id:'V-002', cliente:'Granja Los Pinos', total:2160, items:6, hora:'09:45', metodo:'Transferencia' },
  { id:'V-003', cliente:'Familia Rodríguez', total:1440, items:4, hora:'09:12', metodo:'Efectivo' },
  { id:'V-004', cliente:'Engordadora El Pital', total:8720, items:20, hora:'08:50', metodo:'Crédito' },
]

type CartItem = { producto: typeof PRODUCTOS[0]; cantidad: number }

const FI = ({ children, d=0 }:{children:React.ReactNode;d?:number}) => (
  <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.22,delay:d,ease:'easeOut'}}>
    {children}
  </motion.div>
)

/* ── SPLASH ── */
function SplashScreen() {
  const [v, setV] = useState(true)
  useEffect(()=>{const t=setTimeout(()=>setV(false),2000);return()=>clearTimeout(t)},[])
  return (
    <AnimatePresence>
      {v && (
        <motion.div initial={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}
          style={{position:'fixed',inset:0,zIndex:9999,display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',gap:20,background:'#B71C1C'}}>
          <motion.div initial={{opacity:0,scale:0.92}} animate={{opacity:1,scale:1}}
            transition={{duration:0.8,ease:'easeOut'}}
            style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
            <div style={{width:80,height:80,borderRadius:20,overflow:'hidden',
              border:'3px solid rgba(255,255,255,0.3)',flexShrink:0}}>
              <img src="/images/logo_forrajera.png" alt="Logo"
                style={{width:'100%',height:'100%',objectFit:'cover'}}
                onError={(e:any)=>{e.target.style.display='none'}}/>
              <div style={{width:80,height:80,display:'flex',alignItems:'center',justifyContent:'center',
                background:'rgba(255,255,255,0.15)',fontFamily:'Georgia,serif',fontSize:28,color:'#fff',
                fontWeight:700}}>19</div>
            </div>
            <div style={{fontFamily:'Georgia,serif',fontSize:22,color:'#fff',letterSpacing:'0.05em',textAlign:'center'}}>
              19 Hermanos
            </div>
            <div style={{fontSize:10,color:'rgba(255,255,255,0.6)',textTransform:'uppercase',letterSpacing:'0.2em'}}>
              Sistema de Ventas
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── SELECTOR DE EMPRESA ── */
function SelectorEmpresa({ onSelect }: { onSelect: (e: typeof EMPRESAS[0]) => void }) {
  return (
    <div style={{minHeight:'100vh',background:'#0A0A0A',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',padding:24}}>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{width:'100%',maxWidth:400}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontFamily:'Georgia,serif',fontSize:22,color:'#fff',marginBottom:6}}>
            Forrajera 19 Hermanos
          </div>
          <div style={{fontSize:12,color:'#666',textTransform:'uppercase',letterSpacing:'0.1em'}}>
            Selecciona tu sucursal
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {EMPRESAS.map((e,i)=>(
            <motion.button key={e.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
              transition={{delay:2.1+i*0.1}}
              onClick={()=>onSelect(e)}
              style={{padding:'16px 20px',borderRadius:16,border:`1px solid ${e.color}44`,
                background:`${e.color}11`,cursor:'pointer',textAlign:'left',
                display:'flex',alignItems:'center',justifyContent:'space-between'}}
              whileHover={{background:`${e.color}1a`}} whileTap={{scale:0.98}}>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:44,height:44,borderRadius:12,background:e.color,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontFamily:'Georgia,serif',fontSize:16,color:'#fff',fontWeight:700}}>19</div>
                <div>
                  <div style={{color:'#fff',fontWeight:600,fontSize:14}}>{e.nombre}</div>
                  <div style={{color:'#666',fontSize:12}}>{e.ubicacion}</div>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/* ── POS PRINCIPAL ── */
function POS({ empresa }: { empresa: typeof EMPRESAS[0] }) {
  const [tab, setTab] = useState<'pos'|'productos'|'ventas'|'perfil'>('pos')
  const [categoria, setCategoria] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [carrito, setCarrito] = useState<CartItem[]>([])
  const [showCarrito, setShowCarrito] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [ventaOk, setVentaOk] = useState(false)
  const [metodo, setMetodo] = useState('efectivo')
  const [cliente, setCliente] = useState('')

  const productosFiltrados = PRODUCTOS.filter(p => {
    const catOk = categoria === 'Todos' || p.categoria === categoria
    const busOk = !busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return catOk && busOk
  })

  const totalCarrito = carrito.reduce((a,i)=>a+i.producto.precio*i.cantidad, 0)
  const itemsCarrito = carrito.reduce((a,i)=>a+i.cantidad, 0)

  const addToCart = (p: typeof PRODUCTOS[0]) => {
    setCarrito(prev => {
      const ex = prev.find(i=>i.producto.id===p.id)
      if (ex) return prev.map(i=>i.producto.id===p.id ? {...i,cantidad:i.cantidad+1} : i)
      return [...prev, {producto:p, cantidad:1}]
    })
  }

  const updateQty = (id:number, delta:number) => {
    setCarrito(prev => prev.map(i=>i.producto.id===id ? {...i,cantidad:Math.max(0,i.cantidad+delta)} : i)
      .filter(i=>i.cantidad>0))
  }

  const confirmarVenta = () => {
    setShowConfirm(false)
    setVentaOk(true)
    setTimeout(()=>{
      setVentaOk(false)
      setCarrito([])
      setShowCarrito(false)
      setCliente('')
    }, 2500)
  }

  return (
    <>
      {/* HEADER */}
      <div style={{position:'fixed',top:0,left:0,right:0,zIndex:50,
        padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',
        background:'rgba(10,10,10,0.9)',backdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:empresa.color}}/>
          <div>
            <div style={{color:'#fff',fontSize:13,fontWeight:600}}>{empresa.nombre}</div>
            <div style={{color:'#555',fontSize:10}}>{empresa.ubicacion}</div>
          </div>
        </div>
        {itemsCarrito > 0 && tab === 'pos' && (
          <motion.button initial={{scale:0}} animate={{scale:1}} whileTap={{scale:0.95}}
            onClick={()=>setShowCarrito(true)}
            style={{position:'relative',padding:'8px 16px',borderRadius:999,border:'none',cursor:'pointer',
              background:empresa.color,color:'#fff',fontSize:13,fontWeight:600,
              display:'flex',alignItems:'center',gap:6}}>
            <ICart/>
            <span>$ {totalCarrito.toLocaleString()}</span>
            <div style={{position:'absolute',top:-4,right:-4,width:18,height:18,borderRadius:'50%',
              background:'#fff',color:empresa.color,fontSize:10,fontWeight:800,
              display:'flex',alignItems:'center',justifyContent:'center'}}>{itemsCarrito}</div>
          </motion.button>
        )}
      </div>

      {/* MODAL CARRITO */}
      <AnimatePresence>
        {showCarrito && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.8)',backdropFilter:'blur(4px)',display:'flex',alignItems:'flex-end'}}
            onClick={()=>setShowCarrito(false)}>
            <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}}
              transition={{type:'spring',damping:28,stiffness:280}}
              style={{width:'100%',maxWidth:480,margin:'0 auto',background:'#141414',
                borderRadius:'24px 24px 0 0',maxHeight:'85vh',overflow:'hidden',
                display:'flex',flexDirection:'column'}}
              onClick={e=>e.stopPropagation()}>
              
              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',
                display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
                <div>
                  <div style={{color:'#fff',fontWeight:600,fontSize:16}}>Ticket de venta</div>
                  <div style={{color:'#555',fontSize:12}}>{itemsCarrito} productos</div>
                </div>
                <button onClick={()=>setShowCarrito(false)} style={{background:'rgba(255,255,255,0.08)',border:'none',
                  cursor:'pointer',width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>
                  <IClose/>
                </button>
              </div>

              {/* Cliente */}
              <div style={{padding:'12px 20px',borderBottom:'1px solid rgba(255,255,255,0.05)',flexShrink:0}}>
                <input style={{width:'100%',padding:'10px 14px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',
                  background:'rgba(255,255,255,0.05)',color:'#fff',fontSize:13,outline:'none'}}
                  placeholder="Nombre del cliente (opcional)"
                  value={cliente} onChange={e=>setCliente(e.target.value)}/>
              </div>

              {/* Items */}
              <div style={{overflowY:'auto',flex:1,padding:'8px 0'}}>
                {carrito.map(item=>(
                  <div key={item.producto.id} style={{padding:'10px 20px',display:'flex',
                    alignItems:'center',justifyContent:'space-between',
                    borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{color:'#fff',fontSize:13,fontWeight:500,
                        overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                        {item.producto.nombre}</div>
                      <div style={{color:'#555',fontSize:11}}>{item.producto.unidad} · $ {item.producto.precio.toLocaleString()} c/u</div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
                      <button onClick={()=>updateQty(item.producto.id,-1)}
                        style={{width:28,height:28,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.15)',
                          background:'transparent',cursor:'pointer',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <IMinus/>
                      </button>
                      <span style={{color:'#fff',fontWeight:600,width:24,textAlign:'center'}}>{item.cantidad}</span>
                      <button onClick={()=>updateQty(item.producto.id,1)}
                        style={{width:28,height:28,borderRadius:'50%',border:'none',
                          background:empresa.color,cursor:'pointer',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <IPlus/>
                      </button>
                      <span style={{color:'#fff',fontWeight:600,fontSize:13,minWidth:60,textAlign:'right'}}>
                        $ {(item.producto.precio*item.cantidad).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total y cobrar */}
              <div style={{padding:20,borderTop:'1px solid rgba(255,255,255,0.1)',flexShrink:0}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
                  <span style={{color:'#888',fontSize:14}}>Total</span>
                  <span style={{color:'#fff',fontSize:24,fontFamily:'Georgia,serif',fontWeight:700}}>
                    $ {totalCarrito.toLocaleString()}
                  </span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:14}}>
                  {['efectivo','transferencia','credito'].map(m=>(
                    <button key={m} onClick={()=>setMetodo(m)}
                      style={{padding:'8px 4px',borderRadius:10,fontSize:11,fontWeight:600,cursor:'pointer',
                        border:`1px solid ${metodo===m?empresa.color:'rgba(255,255,255,0.1)'}`,
                        background:metodo===m?`${empresa.color}22`:'transparent',
                        color:metodo===m?empresa.color:'#666'}}>
                      {m==='efectivo'?'💵 Efectivo':m==='transferencia'?'🏦 Transfer.':'📋 Crédito'}
                    </button>
                  ))}
                </div>
                <button onClick={()=>setShowConfirm(true)}
                  style={{width:'100%',padding:'14px',borderRadius:14,border:'none',cursor:'pointer',
                    background:empresa.color,color:'#fff',fontSize:15,fontWeight:700}}>
                  Cobrar $ {totalCarrito.toLocaleString()}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL CONFIRMACIÓN */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.9)',
              display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
            <motion.div initial={{scale:0.9}} animate={{scale:1}}
              style={{background:'#1A1A1A',borderRadius:24,padding:32,maxWidth:360,width:'100%',textAlign:'center'}}>
              <div style={{fontSize:40,marginBottom:16}}>📋</div>
              <div style={{color:'#fff',fontSize:18,fontWeight:700,marginBottom:8}}>Confirmar venta</div>
              <div style={{color:'#888',fontSize:14,marginBottom:4}}>{cliente || 'Cliente mostrador'}</div>
              <div style={{color:empresa.color,fontSize:32,fontFamily:'Georgia,serif',fontWeight:700,marginBottom:24}}>
                $ {totalCarrito.toLocaleString()}
              </div>
              <div style={{display:'flex',gap:12}}>
                <button onClick={()=>setShowConfirm(false)}
                  style={{flex:1,padding:14,borderRadius:12,border:'1px solid rgba(255,255,255,0.15)',
                    background:'transparent',color:'#fff',cursor:'pointer',fontSize:14}}>
                  Cancelar
                </button>
                <button onClick={confirmarVenta}
                  style={{flex:2,padding:14,borderRadius:12,border:'none',
                    background:empresa.color,color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700}}>
                  ✓ Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VENTA OK */}
      <AnimatePresence>
        {ventaOk && (
          <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.8}}
            style={{position:'fixed',inset:0,zIndex:400,background:'rgba(0,0,0,0.95)',
              display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
            <motion.div animate={{rotate:[0,360]}} transition={{duration:0.5}}>
              <div style={{width:80,height:80,borderRadius:'50%',background:empresa.color,
                display:'flex',alignItems:'center',justifyContent:'center'}}>
                <ICheck/>
              </div>
            </motion.div>
            <div style={{color:'#fff',fontSize:22,fontWeight:700}}>¡Venta registrada!</div>
            <div style={{color:empresa.color,fontSize:28,fontFamily:'Georgia,serif'}}>$ {totalCarrito.toLocaleString()}</div>
            <div style={{color:'#555',fontSize:13}}>Folio: V-{String(Date.now()).slice(-4)}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT */}
      <div style={{paddingTop:64,paddingBottom:80,minHeight:'100vh',background:'#0A0A0A'}}>

        {/* ── POS / PRODUCTOS ── */}
        {tab === 'pos' && (
          <div style={{padding:'12px 16px'}}>

            {/* Search */}
            <FI>
              <div style={{position:'relative',marginBottom:12}}>
                <svg style={{position:'absolute',left:12,top:12,opacity:0.4}} width="16" height="16"
                  viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input style={{width:'100%',padding:'10px 10px 10px 36px',borderRadius:12,
                  border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.05)',
                  color:'#fff',fontSize:13,outline:'none'}}
                  placeholder="Buscar producto, SKU..."
                  value={busqueda} onChange={e=>setBusqueda(e.target.value)}/>
              </div>
            </FI>

            {/* Categorías */}
            <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:8,marginBottom:12,
              scrollbarWidth:'none',WebkitOverflowScrolling:'touch'}}>
              {CATEGORIAS.map(cat=>(
                <button key={cat} onClick={()=>setCategoria(cat)}
                  style={{flexShrink:0,padding:'6px 14px',borderRadius:999,fontSize:12,fontWeight:600,cursor:'pointer',
                    border:`1px solid ${categoria===cat?empresa.color:'rgba(255,255,255,0.1)'}`,
                    background:categoria===cat?`${empresa.color}22`:'transparent',
                    color:categoria===cat?empresa.color:'#666',whiteSpace:'nowrap'}}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Productos grid */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {productosFiltrados.map((p,i)=>{
                const enCarrito = carrito.find(c=>c.producto.id===p.id)
                return (
                  <FI key={p.id} d={i*0.04}>
                    <motion.div
                      style={{background:enCarrito?`${empresa.color}15`:'#141414',
                        border:`1px solid ${enCarrito?empresa.color+'44':'rgba(255,255,255,0.07)'}`,
                        borderRadius:16,padding:14,cursor:'pointer'}}
                      whileTap={{scale:0.96}}
                      onClick={()=>addToCart(p)}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                        <span style={{fontSize:9,color:'#555',textTransform:'uppercase',letterSpacing:'0.08em'}}>{p.sku}</span>
                        {enCarrito && (
                          <div style={{width:20,height:20,borderRadius:'50%',background:empresa.color,
                            display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#fff',fontWeight:700}}>
                            {enCarrito.cantidad}
                          </div>
                        )}
                      </div>
                      <div style={{color:'#fff',fontSize:13,fontWeight:600,lineHeight:1.3,marginBottom:6,
                        display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                        {p.nombre}
                      </div>
                      <div style={{color:'#555',fontSize:10,marginBottom:8}}>{p.unidad}</div>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <span style={{color:empresa.color,fontWeight:700,fontSize:16,fontFamily:'Georgia,serif'}}>
                          $ {p.precio.toLocaleString()}
                        </span>
                        <div style={{width:28,height:28,borderRadius:'50%',background:empresa.color,
                          display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <IPlus/>
                        </div>
                      </div>
                    </motion.div>
                  </FI>
                )
              })}
            </div>
          </div>
        )}

        {/* ── VENTAS DEL DÍA ── */}
        {tab === 'ventas' && (
          <div style={{padding:'12px 16px'}}>
            <FI>
              <div style={{color:'#888',fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:4}}>
                HOY</div>
              <div style={{color:'#fff',fontSize:18,fontWeight:700,marginBottom:4}}>Ventas del día</div>
              <div style={{color:empresa.color,fontSize:28,fontFamily:'Georgia,serif',fontWeight:700,marginBottom:20}}>
                $ {VENTAS_RECIENTES.reduce((a,v)=>a+v.total,0).toLocaleString()}
              </div>
            </FI>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {VENTAS_RECIENTES.map((v,i)=>(
                <FI key={v.id} d={i*0.07}>
                  <div style={{background:'#141414',border:'1px solid rgba(255,255,255,0.07)',
                    borderRadius:14,padding:'14px 16px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                      <div>
                        <div style={{color:'#fff',fontWeight:600,fontSize:14}}>{v.cliente}</div>
                        <div style={{color:'#555',fontSize:11}}>{v.id} · {v.items} productos · {v.hora} hrs</div>
                        <div style={{color:'#666',fontSize:11}}>{v.metodo}</div>
                      </div>
                      <div style={{color:empresa.color,fontWeight:700,fontSize:16,fontFamily:'Georgia,serif'}}>
                        $ {v.total.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        )}

        {/* ── PRODUCTOS (inventario) ── */}
        {tab === 'productos' && (
          <div style={{padding:'12px 16px'}}>
            <FI><div style={{color:'#888',fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:4}}>INVENTARIO</div>
              <div style={{color:'#fff',fontSize:18,fontWeight:700,marginBottom:16}}>{PRODUCTOS.length} productos</div>
            </FI>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {PRODUCTOS.map((p,i)=>(
                <FI key={p.id} d={i*0.04}>
                  <div style={{background:'#141414',border:'1px solid rgba(255,255,255,0.07)',
                    borderRadius:12,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <div style={{color:'#fff',fontSize:13,fontWeight:500}}>{p.nombre}</div>
                      <div style={{color:'#555',fontSize:11}}>{p.sku} · {p.unidad}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{color:empresa.color,fontWeight:700,fontSize:14}}>$ {p.precio.toLocaleString()}</div>
                      <div style={{color:p.stock<100?'#FF9800':'#4CAF50',fontSize:11}}>{p.stock} disponibles</div>
                    </div>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        )}

        {/* ── PERFIL ── */}
        {tab === 'perfil' && (
          <div style={{padding:'12px 16px'}}>
            <FI>
              <div style={{textAlign:'center',marginBottom:24}}>
                <div style={{width:64,height:64,borderRadius:'50%',margin:'0 auto 12px',
                  background:`${empresa.color}22`,border:`2px solid ${empresa.color}44`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  color:empresa.color,fontSize:24,fontFamily:'Georgia,serif'}}>J</div>
                <div style={{color:'#fff',fontSize:17,fontWeight:700}}>Juan García</div>
                <div style={{color:'#666',fontSize:12}}>Empleado · {empresa.nombre}</div>
              </div>
            </FI>
            <FI d={0.1}>
              <div style={{background:'#141414',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,overflow:'hidden'}}>
                {[
                  {l:'Empresa activa',v:empresa.nombre},
                  {l:'Sucursal',v:empresa.ubicacion},
                  {l:'Ventas hoy',v:'4 ventas'},
                  {l:'Total hoy',v:'$ 17,170'},
                ].map((r,i)=>(
                  <div key={i} style={{padding:'13px 16px',display:'flex',justifyContent:'space-between',
                    borderBottom:i<3?'1px solid rgba(255,255,255,0.04)':'none'}}>
                    <span style={{color:'#666',fontSize:13}}>{r.l}</span>
                    <span style={{color:'#fff',fontSize:13}}>{r.v}</span>
                  </div>
                ))}
              </div>
            </FI>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <nav style={{position:'fixed',bottom:0,left:0,right:0,height:64,
        background:'rgba(10,10,10,0.95)',backdropFilter:'blur(20px)',
        borderTop:'1px solid rgba(255,255,255,0.07)',
        display:'flex',alignItems:'center',zIndex:100}}>
        {[
          {id:'pos',l:'Venta',I:ICart},
          {id:'ventas',l:'Historial',I:IChart},
          {id:'productos',l:'Productos',I:IBox},
          {id:'perfil',l:'Perfil',I:IUser},
        ].map(({id,l,I})=>(
          <motion.button key={id} onClick={()=>setTab(id as typeof tab)} whileTap={{scale:0.9}}
            style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,
              padding:'8px 0',border:'none',cursor:'pointer',background:'transparent',
              color:tab===id?empresa.color:'#444',fontSize:10,textTransform:'uppercase',letterSpacing:'0.04em',
              minHeight:44}}>
            <I/>
            <span>{l}</span>
          </motion.button>
        ))}
      </nav>
    </>
  )
}

/* ── ROOT ── */
export default function ForrajeraApp() {
  const [empresa, setEmpresa] = useState<typeof EMPRESAS[0]|null>(null)

  return (
    <>
      <SplashScreen/>
      {!empresa
        ? <SelectorEmpresa onSelect={setEmpresa}/>
        : <POS empresa={empresa}/>
      }
    </>
  )
}
